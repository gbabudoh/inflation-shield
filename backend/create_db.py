import sys
import os
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from dotenv import load_dotenv

def create_database():
    load_dotenv()
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("Error: DATABASE_URL not found in .env")
        return

    # Parse the database name and connection string for the main 'postgres' DB
    # Example: postgresql://user:pass@host:port/dbname
    base_url, db_name = db_url.rsplit('/', 1)
    postgres_url = f"{base_url}/postgres"

    print(f"Connecting to {postgres_url} to create database '{db_name}'...")
    
    try:
        # Connect to the default 'postgres' database
        conn = psycopg2.connect(postgres_url)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()

        # Check if database exists
        cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{db_name}'")
        exists = cursor.fetchone()
        
        if not exists:
            print(f"Database '{db_name}' does not exist. Creating...")
            cursor.execute(f"CREATE DATABASE {db_name}")
            print("Database created successfully!")
        else:
            print(f"Database '{db_name}' already exists.")

        cursor.close()
        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")
        print("\nNote: You may need to create the database manually if your user lacks permissions to CREATE DATABASE.")

if __name__ == "__main__":
    create_database()
