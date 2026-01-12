from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.core.database import get_db
from app.models.user import User

router = APIRouter()

class UserRegister(BaseModel):
    email: EmailStr
    full_name: str = None
    phone_number: str = None

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str | None
    is_protocol_activated: bool
    
    class Config:
        from_attributes = True

@router.post("/register", response_model=UserResponse)
async def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    """Issue a new Registered Network Identity"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        return existing_user
    
    # Create new user
    db_user = User(
        email=user_data.email,
        full_name=user_data.full_name,
        phone_number=user_data.phone_number,
        is_protocol_activated=True # Auto-activate for now in this v1
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/check/{email}", response_model=UserResponse)
async def check_identity(email: str, db: Session = Depends(get_db)):
    """Verify if an identity is registered in the protocol"""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Identity not registered")
    return user
