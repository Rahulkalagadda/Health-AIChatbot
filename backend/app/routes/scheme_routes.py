from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..config.db import get_db
from ..models.scheme_model import SchemeCache
from ..services.rag_service import rag_service
from pydantic import BaseModel
from typing import List, Optional, Dict

router = APIRouter()

class SchemeResponse(BaseModel):
    name: str
    eligibility: Optional[str]
    benefits: Optional[str]
    steps: List[str] = []
    documents: List[str] = []
    timeline: Optional[str]

class EligibilityRequest(BaseModel):
    age: int
    income: float
    state: str
    category: str

class PMJAYStatusRequest(BaseModel):
    id_number: str # Could be Aadhaar or Ration Card
    id_type: str # 'aadhaar' or 'ration'

@router.get("/schemes")
async def get_schemes(query: str, db: Session = Depends(get_db)):
    # 1. Search in RAG index
    results = rag_service.search_schemes(query)
    
    # Format according to contract
    return {"schemes": results}

@router.post("/schemes/eligibility")
async def scheme_eligibility_endpoint(request: EligibilityRequest, db: Session = Depends(get_db)):
    # 1. Broadly fetch schemes for that state
    # 2. Use AI to filter eligibility based on income, age, and category
    schemes = db.query(SchemeCache).filter(SchemeCache.state == request.state).all()
    
    # Constructing a simple rule-based or AI-based filter
    eligible = []
    for s in schemes:
        # Simple logical check if possible, or pass to AI
        eligible.append({
            "name": s.name,
            "eligibility": s.eligibility,
            "benefits": s.benefits
        })
    
    # In a real scenario, use AI here as eligibility logic can be complex
    return {"eligible_schemes": eligible}

@router.post("/pmjay/check-status")
async def check_pmjay_status(request: PMJAYStatusRequest):
    # Mocking status check
    # In a real scenario, this would call government APIs or check a database
    
    # Simple logic for demo: If last digit is even, it's active
    try:
        last_digit = int(request.id_number[-1])
        is_active = last_digit % 2 == 0
    except ValueError:
        is_active = True # Default to active for demo string IDs
        
    if is_active:
        return {
            "status": "Active",
            "name": "Ayushman Bharat Cardholder",
            "card_number": f"P{'X' * (len(request.id_number) - 4)}{request.id_number[-4:]}",
            "benefits": "Eligible for ₹5 Lakh health cover per family per year."
        }
    else:
        return {
            "status": "Not Found",
            "message": "We could not find a PMJAY record for the provided ID. Please visit your nearest Taluka office."
        }
