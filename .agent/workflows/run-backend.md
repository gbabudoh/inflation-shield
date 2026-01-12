---
description: How to run the backend for Inflation Shield
---

To run the backend, follow these steps:

1. **Prerequisites**:

   - Ensure you have **PostgreSQL** installed and running.
   - Create a database named `inflation_shield`.
   - Update the `.env` file in the `backend` directory if your credentials differ from the defaults:
     ```env
     DATABASE_URL=postgresql://postgres:postgres@localhost:5432/inflation_shield
     ```

2. **Setup Virtual Environment** (if not already done):

   ```bash
   cd backend
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize and Seed Database**:

   ```bash
   python init_db.py
   python seed_data.py
   ```

5. **Start the Server**:
   ```bash
   uvicorn app.main:app --reload
   ```

The API documentation will be available at [http://localhost:8000/api/docs](http://localhost:8000/api/docs).
