import requests
import os
from typing import Dict, Any

class WeatherService:
    def __init__(self):
        self.api_key = os.getenv("WEATHER_API_KEY", "HGBVXJ73SNUMKYLE57YG77JE8")
        self.base_url = "http://api.weatherapi.com/v1"
    
    def get_weather(self, city: str) -> Dict[str, Any]:
        try:
            url = f"{self.base_url}/current.json"
            params = {
                "key": self.api_key,
                "q": city,
                "aqi": "no"
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            return {
                "current": {
                    "temp_c": data["current"]["temp_c"],
                    "condition": {
                        "text": data["current"]["condition"]["text"]
                    },
                    "humidity": data["current"]["humidity"],
                    "feelslike_c": data["current"]["feelslike_c"],
                    "wind_kph": data["current"]["wind_kph"]
                },
                "location": {
                    "name": data["location"]["name"],
                    "region": data["location"]["region"],
                    "country": data["location"]["country"]
                }
            }
            
        except requests.RequestException as e:
            return {"error": f"Weather API error: {str(e)}"}
        except KeyError as e:
            return {"error": f"Unexpected weather data format: {str(e)}"}
    
    def get_forecast(self, city: str, days: int = 5) -> Dict[str, Any]:
        try:
            url = f"{self.base_url}/forecast.json"
            params = {
                "key": self.api_key,
                "q": city,
                "days": min(days, 10),  # WeatherAPI supports up to 10 days
                "aqi": "no",
                "alerts": "no"
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            daily_forecast = []
            for day in data["forecast"]["forecastday"]:
                daily_forecast.append({
                    "date": day["date"],
                    "temp_c": day["day"]["avgtemp_c"],
                    "condition": day["day"]["condition"]["text"],
                    "humidity": day["day"]["avghumidity"]
                })
            
            return {
                "location": data["location"]["name"],
                "forecast": daily_forecast
            }
            
        except requests.RequestException as e:
            return {"error": f"Forecast API error: {str(e)}"}
        except (KeyError, IndexError) as e:
            return {"error": f"Unexpected forecast data format: {str(e)}"}