import sys
import os
from datetime import datetime, timedelta

# Add the current directory to sys.path to allow imports from 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal
from app.models.product import Product

def seed_data():
    db = SessionLocal()
    
    # Check if products already exist
    if db.query(Product).count() > 0:
        print("Database already seeded.")
        db.close()
        return

    print("Seeding sample products...")
    
    sample_products = [
        {
            "name": "EcoSmart Smart Thermostat",
            "description": "Next-gen energy saving thermostat with AI learning capabilities.",
            "category": "Electronics",
            "retail_price": 249.99,
            "group_buy_price": 189.99,
            "target_quantity": 50,
            "current_preorders": 34,
            "tariff_impact": 15.0,
            "savings_percentage": 24.0,
            "image_url": "https://images.unsplash.com/photo-1567924675637-283a6742993e?w=800",
            "deadline": datetime.now() + timedelta(days=7)
        },
        {
            "name": "SolarCharge Pro Power Bank",
            "description": "Heavy-duty 50,000mAh solar charging bank for off-grid usage.",
            "category": "Outdoors",
            "retail_price": 89.99,
            "group_buy_price": 64.99,
            "target_quantity": 100,
            "current_preorders": 78,
            "tariff_impact": 10.0,
            "savings_percentage": 28.0,
            "image_url": "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?w=800",
            "deadline": datetime.now() + timedelta(days=12)
        },
        {
            "name": "PureFlow Air Purifier",
            "description": "HEPA H13 medical grade air filtration for home and office.",
            "category": "Home",
            "retail_price": 159.99,
            "group_buy_price": 119.99,
            "target_quantity": 75,
            "current_preorders": 42,
            "tariff_impact": 12.0,
            "savings_percentage": 25.0,
            "image_url": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800",
            "deadline": datetime.now() + timedelta(days=5)
        },
        {
            "name": "Zenith Noise Cancelling Headphones",
            "description": "Premium wireless audio with advanced 40dB active noise cancellation.",
            "category": "Electronics",
            "retail_price": 329.99,
            "group_buy_price": 249.99,
            "target_quantity": 40,
            "current_preorders": 29,
            "tariff_impact": 18.0,
            "savings_percentage": 24.0,
            "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
            "deadline": datetime.now() + timedelta(days=10)
        },
        {
            "name": "KitchenMaster Multi-Cooker",
            "description": "12-in-1 professional grade pressure cooker and air fryer.",
            "category": "Home",
            "retail_price": 199.99,
            "group_buy_price": 149.99,
            "target_quantity": 60,
            "current_preorders": 55,
            "tariff_impact": 10.0,
            "savings_percentage": 25.0,
            "image_url": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800",
            "deadline": datetime.now() + timedelta(days=3)
        },
        {
            "name": "SwiftRide Electric Scooter",
            "description": "Folding commuter scooter with 30-mile range and shock absorption.",
            "category": "Transportation",
            "retail_price": 599.99,
            "group_buy_price": 449.99,
            "target_quantity": 25,
            "current_preorders": 18,
            "tariff_impact": 20.0,
            "savings_percentage": 25.0,
            "image_url": "https://images.unsplash.com/photo-1597075095304-747657922d4f?w=800",
            "deadline": datetime.now() + timedelta(days=15)
        }
    ]

    for p in sample_products:
        product = Product(**p)
        db.add(product)
    
    db.commit()
    db.close()
    print("Seeding complete!")

if __name__ == "__main__":
    seed_data()
