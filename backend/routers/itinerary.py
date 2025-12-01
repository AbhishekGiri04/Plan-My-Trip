from fastapi import APIRouter, HTTPException
from models.schemas import TravelRequest, ItineraryResponse
from services.weather_service import WeatherService
from services.ml_service import ml_service
from datetime import datetime, timedelta
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/generate-itinerary", response_model=dict)
async def generate_itinerary(request: TravelRequest):
    try:
        # Initialize services
        weather_service = WeatherService()
        
        # Calculate duration
        duration = (request.end_date - request.start_date).days + 1
        
        # Get ML recommendations
        user_preferences = {
            'budget': request.budget,
            'preferences': request.preferences,
            'duration_days': duration,
            'month': request.start_date.strftime('%B')
        }
        
        try:
            ml_recommendations = ml_service.get_recommendations(user_preferences)
            budget_breakdown = ml_service.predict_budget_breakdown(request.budget, request.destination, duration)
        except Exception as e:
            logger.warning(f"ML service error, using fallback: {e}")
            budget_breakdown = {
                'accommodation': int(request.budget * 0.35),
                'food': int(request.budget * 0.30),
                'transport': int(request.budget * 0.20),
                'activities': int(request.budget * 0.15)
            }
            ml_recommendations = []
        
        # Get weather data
        try:
            weather_data = weather_service.get_weather(request.destination)
        except Exception as e:
            logger.warning(f"Weather service error: {e}")
            weather_data = {"temperature": 25, "description": "Pleasant weather expected"}
        
        # Generate simple itinerary based on preferences and ML data
        itinerary = generate_simple_itinerary(request, duration, budget_breakdown, weather_data)
        
        # Prepare response
        response = {
            "itinerary": itinerary,
            "weather": weather_data,
            "ml_recommendations": ml_recommendations,
            "budget_breakdown": budget_breakdown,
            "request_details": {
                "destination": request.destination,
                "duration": duration,
                "budget": request.budget,
                "travel_mode": request.travel_mode,
                "preferences": request.preferences
            }
        }
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating itinerary: {str(e)}")

def generate_simple_itinerary(request: TravelRequest, duration: int, budget_breakdown: dict, weather_data: dict):
    """Generate a simple rule-based itinerary"""
    daily_budget = request.budget // duration
    
    # Activity templates based on preferences
    activity_templates = {
        'beach': ['Beach visit and water sports', 'Sunset beach walk', 'Beach cafe dining'],
        'adventure': ['Trekking/hiking', 'Adventure sports', 'Nature exploration'],
        'culture': ['Historical site visit', 'Local museum tour', 'Cultural performance'],
        'food': ['Street food tour', 'Local restaurant dining', 'Cooking class'],
        'nature': ['Nature walk', 'Wildlife spotting', 'Scenic viewpoints'],
        'photography': ['Photo walk', 'Sunrise/sunset photography', 'Local markets'],
        'nightlife': ['Local nightlife exploration', 'Live music venues', 'Night markets'],
        'shopping': ['Local markets', 'Souvenir shopping', 'Handicraft stores']
    }
    
    daily_plans = []
    for day in range(1, duration + 1):
        activities = []
        
        # Morning activity
        if 'adventure' in request.preferences:
            activities.append('Morning: Adventure activity or trekking')
        elif 'culture' in request.preferences:
            activities.append('Morning: Historical site or museum visit')
        else:
            activities.append('Morning: Local sightseeing and exploration')
        
        # Afternoon activity
        if 'food' in request.preferences:
            activities.append('Afternoon: Local food tour and dining')
        elif 'beach' in request.preferences:
            activities.append('Afternoon: Beach activities and relaxation')
        else:
            activities.append('Afternoon: Main attraction visit')
        
        # Evening activity
        if 'nightlife' in request.preferences:
            activities.append('Evening: Local nightlife and entertainment')
        elif 'shopping' in request.preferences:
            activities.append('Evening: Shopping and local markets')
        else:
            activities.append('Evening: Leisure time and local exploration')
        
        daily_plans.append({
            'day': day,
            'date': (request.start_date + timedelta(days=day-1)).strftime('%Y-%m-%d'),
            'activities': activities,
            'accommodation': f'Budget-friendly accommodation in {request.destination}',
            'meals': ['Breakfast: Local cafe', 'Lunch: Popular restaurant', 'Dinner: Local cuisine'],
            'transport': request.travel_mode,
            'cost': daily_budget
        })
    
    return {
        'daily_plans': daily_plans,
        'total_cost': request.budget,
        'recommendations': [
            f'Pack according to {weather_data.get("description", "local weather")}',
            'Carry a power bank and portable charger',
            'Try local street food for authentic experience',
            'Book accommodations in advance for better rates',
            'Keep emergency contacts and important documents handy',
            f'Best travel mode for your budget: {request.travel_mode}'
        ]
    }

@router.get("/destinations/popular")
async def get_popular_destinations():
    try:
        popular_destinations = ml_service.get_popular_destinations(limit=10)
        return {"destinations": popular_destinations}
    except Exception as e:
        logger.error(f"Error getting popular destinations: {e}")
        # Fallback data
        popular_destinations = [
            {"Destination": "Goa", "Category": "beach", "Cost_Level": 8000, "Best_Time": "November-February"},
            {"Destination": "Manali", "Category": "mountain", "Cost_Level": 9000, "Best_Time": "October-December"},
            {"Destination": "Rishikesh", "Category": "adventure", "Cost_Level": 6000, "Best_Time": "September-November"}
        ]
        return {"destinations": popular_destinations}

@router.post("/recommendations")
async def get_destination_recommendations(preferences: Dict[str, Any]):
    try:
        recommendations = ml_service.get_recommendations(preferences)
        return {"recommendations": recommendations}
    except Exception as e:
        logger.error(f"Error getting recommendations: {e}")
        # Fallback recommendations
        recommendations = [
            {"Destination": "Goa", "Category": "beach", "Cost_Level": 8000, "Best_Time": "November-February"},
            {"Destination": "Manali", "Category": "mountain", "Cost_Level": 9000, "Best_Time": "October-December"}
        ]
        return {"recommendations": recommendations}

@router.get("/budget-breakdown/{destination}")
async def get_budget_breakdown(destination: str, budget: int, duration: int):
    try:
        breakdown = ml_service.predict_budget_breakdown(budget, destination, duration)
        return {"budget_breakdown": breakdown}
    except Exception as e:
        logger.error(f"Error getting budget breakdown: {e}")
        # Fallback breakdown
        breakdown = {
            'accommodation': int(budget * 0.35),
            'food': int(budget * 0.30),
            'transport': int(budget * 0.20),
            'activities': int(budget * 0.15)
        }
        return {"budget_breakdown": breakdown}