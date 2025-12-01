import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Keys
    WEATHER_API_KEY: str = os.environ.get("WEATHER_API_KEY", "")
    
    # App Configuration
    DEFAULT_CURRENCY: str = os.environ.get("DEFAULT_CURRENCY", "INR")
    DEBUG: bool = os.environ.get("DEBUG", "True").lower() == "true"
    ENVIRONMENT: str = os.environ.get("ENVIRONMENT", "development")
    
    # API URLs
    WEATHER_BASE_URL: str = "https://api.openweathermap.org/data/2.5"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()