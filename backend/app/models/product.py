from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, JSON
from sqlalchemy.sql import func
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text)
    category = Column(String, index=True)
    
    # Pricing
    retail_price = Column(Float, nullable=False)
    group_buy_price = Column(Float, nullable=False)
    target_quantity = Column(Integer, default=100)
    current_preorders = Column(Integer, default=0)
    
    # AI Analysis
    price_trend = Column(JSON)  # Store AI-predicted price movements
    tariff_impact = Column(Float, default=0.0)
    savings_percentage = Column(Float)
    
    # Metadata
    image_url = Column(String)
    supplier_info = Column(JSON)
    is_active = Column(Boolean, default=True)
    is_approved = Column(Boolean, default=True) # AI deals start as false
    sourced_from = Column(String, default="manual") # manual, ai_finder
    deadline = Column(DateTime)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Preorder(Base):
    __tablename__ = "preorders"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, index=True)
    user_email = Column(String, index=True)
    quantity = Column(Integer, default=1)
    price_locked = Column(Float)
    status = Column(String, default="pending")  # pending, confirmed, completed, cancelled
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())