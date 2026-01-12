from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.models.product import Product, Preorder

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get overall platform statistics"""
    
    total_products = db.query(Product).filter(Product.is_active == True).count()
    total_preorders = db.query(func.sum(Preorder.quantity)).scalar() or 0
    
    # Calculate total savings
    savings_data = db.query(
        func.sum((Product.retail_price - Product.group_buy_price) * Product.current_preorders)
    ).scalar() or 0
    
    # Active campaigns
    active_campaigns = db.query(Product).filter(
        Product.is_active == True,
        Product.current_preorders > 0
    ).count()
    
    # Top categories
    top_categories = db.query(
        Product.category,
        func.count(Product.id).label('count'),
        func.sum(Product.current_preorders).label('total_preorders')
    ).filter(
        Product.is_active == True
    ).group_by(Product.category).order_by(func.sum(Product.current_preorders).desc()).limit(5).all()
    
    return {
        "total_products": total_products,
        "total_preorders": int(total_preorders),
        "total_savings": round(float(savings_data), 2),
        "active_campaigns": active_campaigns,
        "top_categories": [
            {
                "category": cat[0],
                "products": cat[1],
                "preorders": int(cat[2] or 0)
            }
            for cat in top_categories
        ]
    }

@router.get("/trending")
async def get_trending_products(limit: int = 10, db: Session = Depends(get_db)):
    """Get trending products based on preorder velocity"""
    
    products = db.query(Product).filter(
        Product.is_active == True
    ).order_by(Product.current_preorders.desc()).limit(limit).all()
    
    return {
        "trending": [
            {
                "id": p.id,
                "name": p.name,
                "current_preorders": p.current_preorders,
                "target_quantity": p.target_quantity,
                "progress_percentage": round((p.current_preorders / p.target_quantity) * 100, 1),
                "savings_percentage": p.savings_percentage
            }
            for p in products
        ]
    }

@router.get("/price-impact")
async def get_price_impact_analysis(db: Session = Depends(get_db)):
    """Analyze tariff impact across categories"""
    
    impact_data = db.query(
        Product.category,
        func.avg(Product.tariff_impact).label('avg_tariff'),
        func.avg(Product.savings_percentage).label('avg_savings')
    ).filter(
        Product.is_active == True
    ).group_by(Product.category).all()
    
    return {
        "categories": [
            {
                "category": data[0],
                "avg_tariff_impact": round(float(data[1] or 0), 2),
                "avg_savings": round(float(data[2] or 0), 2)
            }
            for data in impact_data
        ]
    }