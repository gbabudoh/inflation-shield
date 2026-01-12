import sys
import os

# Add the current directory to sys.path to allow imports from 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import Base, engine
from app.models.product import Product, Preorder
from app.models.user import User

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Done!")

if __name__ == "__main__":
    init_db()
