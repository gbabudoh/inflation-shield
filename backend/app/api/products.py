from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.core.database import get_db
from app.models.product import Product

router = APIRouter()

# Pydantic Schemas
class ProductBase(BaseModel):
    name: str
    description: str | None = None
    category: str
    retail_price: float
    group_buy_price: float
    target_quantity: int = 100
    image_url: str | None = None
    sourced_from: str | None = "manual"
    is_approved: bool = True

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    current_preorders: int
    savings_percentage: float
    tariff_impact: float
    is_active: bool
    is_approved: bool
    sourced_from: str | None
    deadline: datetime | None
    created_at: datetime
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[ProductResponse])
async def get_products(
    skip: int = 0,
    limit: int = 20,
    category: str | None = None,
    db: Session = Depends(get_db)
):
    """Get all active products with optional filtering"""
    query = db.query(Product).filter(Product.is_active == True)
    
    if category:
        query = query.filter(Product.category == category)
    
    products = query.offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get single product by ID"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductResponse)
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """Create new product"""
    savings = ((product.retail_price - product.group_buy_price) / product.retail_price) * 100
    
    db_product = Product(
        **product.dict(),
        savings_percentage=round(savings, 2)
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/categories/list")
async def get_categories(db: Session = Depends(get_db)):
    """Get all product categories"""
    categories = db.query(Product.category).distinct().all()
    return {"categories": [cat[0] for cat in categories if cat[0]]}