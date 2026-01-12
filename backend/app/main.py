from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import products, preorders, analytics, auth, sourcing, admin_registry
from app.core.config import settings

app = FastAPI(
    title="Inflation Shield API",
    description="AI-Driven Marketplace API for Group-Buy Price Optimization",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(preorders.router, prefix="/api/preorders", tags=["Preorders"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(sourcing.router, prefix="/api/sourcing", tags=["Sourcing"])
app.include_router(admin_registry.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
async def root():
    return {
        "message": "Inflation Shield API",
        "version": "1.0.0",
        "docs": "/api/docs"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "inflation-shield-api"}