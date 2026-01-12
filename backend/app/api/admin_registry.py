from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.models.product import Preorder
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import func

router = APIRouter()

class UserStats(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    phone_number: Optional[str]
    is_active: bool
    order_count: int
    total_spent: float

@router.get("/users", response_model=List[UserStats])
async def get_user_registry(db: Session = Depends(get_db)):
    """Retrieve all protocol-activated identities with procurement stats"""
    
    users = db.query(User).all()
    registry = []
    
    for user in users:
        # Get procurement stats for this user
        stats = db.query(
            func.count(Preorder.id).label('count'),
            func.sum(Preorder.price_locked * Preorder.quantity).label('total')
        ).filter(Preorder.user_email == user.email).first()
        
        registry.append({
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "phone_number": user.phone_number,
            "is_active": user.is_active,
            "order_count": stats[0] or 0,
            "total_spent": float(stats[1] or 0)
        })
        
    return registry

@router.patch("/users/{user_id}/toggle-status")
async def toggle_user_status(user_id: int, db: Session = Depends(get_db)):
    """Deactivate or Reactivate a protocol identity"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Identity not found")
    
    user.is_active = not user.is_active
    db.commit()
    return {"status": "Updated", "is_active": user.is_active}
