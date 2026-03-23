from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.db import get_db
from ..models.user_model import User
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/profile")

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    blood_group: Optional[str] = None
    weight: Optional[str] = None
    height: Optional[str] = None
    age: Optional[str] = None
    primary_condition: Optional[str] = None

@router.get("/{userId}")
async def get_profile(userId: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
        
    return {
        "status": "success",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "profile": {
                "bio": user.bio,
                "blood_group": user.blood_group,
                "weight": user.weight,
                "height": user.height,
                "age": user.age,
                "primary_condition": user.primary_condition
            }
        }
    }

@router.put("/{userId}")
async def update_profile(userId: str, data: ProfileUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
        
    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
        
    db.commit()
    db.refresh(user)
    
    return {
        "status": "success",
        "user": {
            "id": user.id,
            "name": user.name,
            "profile": {
                "bio": user.bio,
                "blood_group": user.blood_group,
                "weight": user.weight,
                "height": user.height,
                "age": user.age,
                "primary_condition": user.primary_condition
            }
        }
    }
