from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import List
from app.core.database import get_db
from app.models.product import Product, Preorder
from datetime import datetime

router = APIRouter()

# Schemas
class PreorderCreate(BaseModel):
    product_id: int
    user_email: EmailStr
    quantity: int = 1

class PreorderResponse(BaseModel):
    id: int
    product_id: int
    user_email: str
    quantity: int
    price_locked: float
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

@router.post("/", response_model=PreorderResponse)
async def create_preorder(
    preorder: PreorderCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Create a new preorder"""
    # Check if product exists
    product = db.query(Product).filter(Product.id == preorder.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if not product.is_active:
        raise HTTPException(status_code=400, detail="Product is not available for preorder")
    
    # Create preorder
    db_preorder = Preorder(
        product_id=preorder.product_id,
        user_email=preorder.user_email,
        quantity=preorder.quantity,
        price_locked=product.group_buy_price
    )
    
    # Update product preorder count
    product.current_preorders += preorder.quantity
    
    db.add(db_preorder)
    db.commit()
    db.refresh(db_preorder)
    
    # TODO: Add background task for email notification
    # background_tasks.add_task(send_preorder_confirmation, preorder.user_email)
    
    return db_preorder

@router.get("/user/{email}", response_model=List[PreorderResponse])
async def get_user_preorders(email: str, db: Session = Depends(get_db)):
    """Get all preorders for a user"""
    preorders = db.query(Preorder).filter(Preorder.user_email == email).all()
    return preorders

@router.get("/{preorder_id}", response_model=PreorderResponse)
async def get_preorder(preorder_id: int, db: Session = Depends(get_db)):
    """Get single preorder by ID"""
    preorder = db.query(Preorder).filter(Preorder.id == preorder_id).first()
    if not preorder:
        raise HTTPException(status_code=404, detail="Preorder not found")
    return preorder