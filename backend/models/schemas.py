from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class TravelRequest(BaseModel):
    destination: str
    start_date: date
    end_date: date
    budget: int
    travel_mode: str
    preferences: List[str]
    group_size: int = 1

class DayPlan(BaseModel):
    day: int
    date: str
    activities: List[str]
    accommodation: str
    meals: List[str]
    transport: str
    cost: int

class ItineraryResponse(BaseModel):
    destination: str
    duration: int
    total_cost: int
    daily_plans: List[DayPlan]
    weather_summary: str
    safety_notes: str
    recommendations: List[str]

class WeatherData(BaseModel):
    temperature: float
    condition: str
    humidity: int
    description: str

class NewsData(BaseModel):
    headline: str
    summary: str
    safety_level: str