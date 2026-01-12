from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.product import Product
from pydantic import BaseModel
import random

router = APIRouter()

class SourcingStatus(BaseModel):
    deals_found: int
    status: str

async def simulate_ai_sourcing(db: Session):
    """
    Simulates AI crawling for inflation arbitrage.
    In a real app, this would use the search_web tool and LLM.
    """
    categories = ["Electronics", "Home", "Outdoors", "Healthcare", "Food"]
    products = [
        {"name": "Industrial Grade Solar Inverter", "retail": 1200, "group": 850, "cat": "Electronics"},
        {"name": "Bulk HEPA Filter Nodes", "retail": 45, "group": 22, "cat": "Home"},
        {"name": "Autonomous Irrigation Node", "retail": 850, "group": 600, "cat": "Outdoors"},
        {"name": "Protocol-Grade Medical Supplies", "retail": 250, "group": 140, "cat": "Healthcare"},
        {"name": "Preserved Strategic Grain Cluster", "retail": 500, "group": 300, "cat": "Food"}
    ]
    
    # Pick 2-3 random products to 'find'
    found_deals = random.sample(products, random.randint(2, 3))
    
    for deal in found_deals:
        savings = ((deal["retail"] - deal["group"]) / deal["retail"]) * 100
        new_deal = Product(
            name=deal["name"],
            description=f"AI Sourced: Arbitrage opportunity found in the {deal['cat']} sector.",
            category=deal["cat"],
            retail_price=deal["retail"],
            group_buy_price=deal["group"],
            savings_percentage=round(savings, 2),
            sourced_from="ai_finder",
            is_approved=False, # Requires Admin Review
            is_active=False    # Inactive until approved
        )
        db.add(new_deal)
    
    db.commit()
    print(f"AI Sourcing Complete: Found {len(found_deals)} clusters.")

@router.post("/find-deals", response_model=SourcingStatus)
async def trigger_sourcing(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Trigger the AI Deal Finder protocol"""
    background_tasks.add_task(simulate_ai_sourcing, db)
    return {"deals_found": 0, "status": "AI Sourcing Protocol Initiated"}

@router.patch("/approve/{product_id}")
async def approve_deal(product_id: int, db: Session = Depends(get_db)):
    """Approve and activate an AI-found deal"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Node not found")
    
    product.is_approved = True
    product.is_active = True
    db.commit()
    return {"message": f"Deal '{product.name}' activated on live marketplace."}
