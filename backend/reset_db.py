import sys
import os

# Add the current directory to sys.path to allow imports from 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import Base, engine
from app.models.product import Product, Preorder
from app.models.user import User

def reset_db():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Database reset complete!")

if __name__ == "__main__":
    reset_db()
