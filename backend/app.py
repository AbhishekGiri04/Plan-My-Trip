from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import itinerary, weather
from config import settings
from dotenv import load_dotenv
import logging
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO if settings.DEBUG else logging.WARNING,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="🎓 EduTrip AI API",
    description="Smart Budget Travel Planner for Students - AI-powered travel itinerary generation with real-time weather, news, and maps integration",
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None
)

# CORS middleware
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://edutrip-ai.vercel.app",
    "*" if settings.DEBUG else ""
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc) if settings.DEBUG else "Something went wrong"}
    )

# Include routers
app.include_router(itinerary.router, prefix="/api/v1", tags=["Itinerary"])
app.include_router(weather.router, prefix="/api/v1", tags=["Weather"])

# Root endpoints
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "🎓 EduTrip AI API is running!",
        "version": "1.0.0",
        "description": "Smart Budget Travel Planner for Students",
        "timestamp": datetime.now().isoformat(),
        "environment": settings.ENVIRONMENT,
        "docs": "/docs" if settings.DEBUG else "Contact admin for API documentation"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }

@app.get("/api/v1/status", tags=["Status"])
async def api_status():
    return {
        "api_status": "operational",
        "services": {
            "weather": bool(settings.WEATHER_API_KEY)
        },
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info" if settings.DEBUG else "warning"
    )