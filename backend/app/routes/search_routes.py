from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from ..config.db import get_db
from ..models.search_model import Provider, MedicalTerm
from ..models.scheme_model import SchemeCache
from ..services.external_api_service import ExternalGovService
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class SearchResponse(BaseModel):
    providers: List[dict] = []
    terms: List[dict] = []
    schemes: List[dict] = []

@router.get("/search", response_model=SearchResponse)
async def global_search_endpoint(query: str = Query(..., min_length=2), db: Session = Depends(get_db)):
    q = f"%{query}%"
    
    # 1. Search Providers in DB and OSM (Real Govt Data source)
    # We look for the district in the query or assume a default for Odisha
    # In a real app, we'd get the user's geolocation
    district_query = query.title() # Simplistic check
    
    osm_providers = await ExternalGovService.get_nearby_hospitals(district_query, "Odisha")
    
    db_providers = db.query(Provider).filter(
        or_(
            Provider.name.ilike(q),
            Provider.specialty.ilike(q)
        )
    ).limit(10).all()
    
    # Combine results
    all_providers = []
    # Add OSM results first (actual live data)
    for p in osm_providers:
        all_providers.append(p)
        
    # Add unique DB results
    for p in db_providers:
        if not any(ap['name'].lower() == p.name.lower() for ap in all_providers):
            all_providers.append({
                "id": p.id,
                "name": p.name,
                "specialty": p.specialty,
                "type": p.type,
                "district": p.district,
                "contact": p.contact
            })

    # 2. Search Medical Terms
    found_terms = db.query(MedicalTerm).filter(
        or_(
            MedicalTerm.term.ilike(q),
            MedicalTerm.description.ilike(q)
        )
    ).limit(10).all()
    
    # 3. Search Schemes in DB (representing real schemes from BSKY/PMJAY)
    found_schemes = db.query(SchemeCache).filter(
        or_(
            SchemeCache.name.ilike(q),
            SchemeCache.eligibility.ilike(q),
            SchemeCache.benefits.ilike(q)
        )
    ).limit(10).all()

    return SearchResponse(
        providers=all_providers[:15],
        terms=[{"term": t.term, "description": t.description} for t in found_terms],
        schemes=[{"name": s.name, "desc": s.benefits[:120] + "..."} for s in found_schemes]
    )

@router.get("/directory")
async def get_directory_endpoint(district: str, state: str = "Odisha"):
    """
    Dedicated endpoint for the Health Directory page to get real-time 
    hospital and clinic data for any district in India.
    """
    providers = await ExternalGovService.get_nearby_hospitals(district, state)
    return providers
