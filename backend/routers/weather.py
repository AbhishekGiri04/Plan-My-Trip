from fastapi import APIRouter, HTTPException
from services.weather_service import WeatherService

router = APIRouter()

@router.get("/weather/{city}")
async def get_weather(city: str):
    try:
        weather_service = WeatherService()
        weather_data = weather_service.get_weather(city)
        
        if "error" in weather_data:
            raise HTTPException(status_code=400, detail=weather_data["error"])
        
        return weather_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather service error: {str(e)}")

@router.get("/weather/{city}/forecast")
async def get_weather_forecast(city: str, days: int = 5):
    try:
        weather_service = WeatherService()
        forecast_data = weather_service.get_forecast(city, days)
        
        if "error" in forecast_data:
            raise HTTPException(status_code=400, detail=forecast_data["error"])
        
        return forecast_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Forecast service error: {str(e)}")