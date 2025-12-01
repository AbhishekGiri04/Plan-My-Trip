import pickle
import pandas as pd
import numpy as np
import json
import os
from typing import List, Dict, Any, Optional
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler, LabelEncoder
import logging

logger = logging.getLogger(__name__)

class MLRecommendationService:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.label_encoders = {}
        self.destinations_data = None
        self.feature_columns = ['Region_encoded', 'Category_encoded', 'Accessibility_encoded']
        self.load_data()
        self.prepare_encoders()
        self.load_model()
    
    def load_model(self):
        """Load the trained ML model"""
        try:
            model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'model.pkl')
            if os.path.exists(model_path):
                with open(model_path, 'rb') as f:
                    model_data = pickle.load(f)
                    
                # Check if it's a proper ML model package
                if isinstance(model_data, dict) and 'model' in model_data:
                    self.model = model_data.get('model')
                    self.scaler = model_data.get('scaler')
                    self.label_encoders = model_data.get('encoders', {})
                    logger.info(f"ML model loaded successfully (v{model_data.get('version', '1.0')})")
                elif hasattr(model_data, 'predict'):
                    self.model = model_data
                    logger.info("Direct ML model loaded successfully")
                else:
                    logger.warning(f"Invalid model format: {type(model_data)}, creating new model")
                    self._create_simple_model()
            else:
                logger.warning("ML model file not found, creating new model")
                self._create_simple_model()
        except Exception as e:
            logger.error(f"Error loading ML model: {e}")
            self._create_simple_model()
    
    def _create_simple_model(self):
        """Create a simple recommendation model"""
        try:
            from sklearn.ensemble import RandomForestRegressor
            from sklearn.preprocessing import StandardScaler
            
            # Create a simple model for demonstration
            self.model = RandomForestRegressor(n_estimators=10, random_state=42)
            self.scaler = StandardScaler()
            
            # Train on dummy data if destinations_data is available
            if self.destinations_data is not None:
                self._train_simple_model()
            
            logger.info("Created simple ML model")
        except Exception as e:
            logger.error(f"Error creating simple model: {e}")
            self.model = None
    
    def _train_simple_model(self):
        """Train the simple model on available data"""
        try:
            # Prepare training data
            X = []
            y = []
            
            for _, dest in self.destinations_data.iterrows():
                # Create features
                features = []
                
                # Encode categorical features
                region_map = {'North': 0, 'South': 1, 'East': 2, 'West': 3}
                category_map = {'Heritage': 0, 'Beach': 1, 'Nature': 2, 'Adventure': 3, 'Religious': 4}
                access_map = {'Easy': 0, 'Moderate': 1, 'Difficult': 2}
                
                features.append(region_map.get(dest['Region'], 0))
                features.append(category_map.get(dest['Category'], 0))
                features.append(access_map.get(dest['Accessibility'], 1))
                
                # Add cost as feature
                estimated_cost = self._estimate_cost(dest['Category'], dest['Region'], dest['Accessibility'])
                features.append(estimated_cost / 10000)  # Normalize
                
                X.append(features)
                
                # Create target (popularity score based on category and accessibility)
                popularity = 0.5
                if dest['Category'] in ['Beach', 'Heritage', 'Adventure']:
                    popularity += 0.3
                if dest['Accessibility'] == 'Easy':
                    popularity += 0.2
                
                y.append(popularity)
            
            if len(X) > 0:
                X = np.array(X)
                y = np.array(y)
                
                # Fit scaler and model
                X_scaled = self.scaler.fit_transform(X)
                self.model.fit(X_scaled, y)
                
                logger.info(f"Trained simple model on {len(X)} destinations")
            
        except Exception as e:
            logger.error(f"Error training simple model: {e}")
    
    def load_data(self):
        """Load destinations dataset"""
        try:
            data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'Dataset.csv')
            if os.path.exists(data_path):
                self.destinations_data = pd.read_csv(data_path)
                # Remove duplicates and clean data
                self.destinations_data = self.destinations_data.drop_duplicates(subset=['Destination Name'])
                logger.info(f"Loaded {len(self.destinations_data)} unique destinations")
            else:
                self.destinations_data = self._get_fallback_data()
                logger.warning("Using fallback destination data")
        except Exception as e:
            logger.error(f"Error loading destinations data: {e}")
            self.destinations_data = self._get_fallback_data()
    
    def prepare_encoders(self):
        """Prepare label encoders for categorical data"""
        if self.destinations_data is not None and not self.label_encoders:
            try:
                for col in ['Region', 'Category', 'Accessibility']:
                    if col in self.destinations_data.columns:
                        le = LabelEncoder()
                        self.destinations_data[f'{col}_encoded'] = le.fit_transform(self.destinations_data[col])
                        self.label_encoders[col] = le
            except Exception as e:
                logger.error(f"Error preparing encoders: {e}")
    
    def _get_fallback_data(self) -> pd.DataFrame:
        """Convert CSV data to ML format with cost predictions"""
        csv_destinations = [
            {"Destination": "Goa", "Category": "beach", "Cost_Level": 8000, "Best_Time": "November-February", "Region": "West", "Accessibility": "Easy"},
            {"Destination": "Jaipur", "Category": "heritage", "Cost_Level": 10000, "Best_Time": "October-March", "Region": "West", "Accessibility": "Easy"},
            {"Destination": "Manali", "Category": "adventure", "Cost_Level": 12000, "Best_Time": "May-October", "Region": "North", "Accessibility": "Difficult"},
            {"Destination": "Kerala Backwaters", "Category": "nature", "Cost_Level": 15000, "Best_Time": "October-March", "Region": "South", "Accessibility": "Moderate"},
            {"Destination": "Varanasi", "Category": "religious", "Cost_Level": 5000, "Best_Time": "October-March", "Region": "North", "Accessibility": "Moderate"},
            {"Destination": "Rishikesh", "Category": "adventure", "Cost_Level": 6000, "Best_Time": "September-November", "Region": "North", "Accessibility": "Difficult"},
            {"Destination": "Amritsar", "Category": "religious", "Cost_Level": 7000, "Best_Time": "October-March", "Region": "North", "Accessibility": "Easy"},
            {"Destination": "Andaman Islands", "Category": "beach", "Cost_Level": 25000, "Best_Time": "October-May", "Region": "East", "Accessibility": "Moderate"},
            {"Destination": "Udaipur", "Category": "heritage", "Cost_Level": 15000, "Best_Time": "October-March", "Region": "West", "Accessibility": "Easy"},
            {"Destination": "Munnar", "Category": "nature", "Cost_Level": 9000, "Best_Time": "September-March", "Region": "South", "Accessibility": "Moderate"}
        ]
        return pd.DataFrame(csv_destinations)
    
    def get_recommendations(self, user_preferences: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Get destination recommendations using trained ML model"""
        try:
            budget = user_preferences.get('budget', 10000)
            interests = user_preferences.get('preferences', [])
            duration = user_preferences.get('duration_days', 3)
            
            if self.model is not None and self.destinations_data is not None:
                # Use ML model for predictions
                recommendations = self._get_ml_recommendations(user_preferences)
                if recommendations:
                    return recommendations
            
            # Fallback to rule-based recommendations
            return self._get_rule_based_recommendations(user_preferences)
            
        except Exception as e:
            logger.error(f"Error getting recommendations: {e}")
            return self._get_default_recommendations()
    
    def _get_ml_recommendations(self, user_preferences: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Get recommendations using trained ML model"""
        try:
            budget = user_preferences.get('budget', 10000)
            interests = user_preferences.get('preferences', [])
            
            predictions = []
            
            # Encoding maps
            region_map = {'North': 0, 'South': 1, 'East': 2, 'West': 3}
            category_map = {'Heritage': 0, 'Beach': 1, 'Nature': 2, 'Adventure': 3, 'Religious': 4}
            access_map = {'Easy': 0, 'Moderate': 1, 'Difficult': 2}
            
            for _, dest in self.destinations_data.iterrows():
                try:
                    # Create feature vector
                    features = [
                        region_map.get(dest['Region'], 0),
                        category_map.get(dest['Category'], 0),
                        access_map.get(dest['Accessibility'], 1)
                    ]
                    
                    # Add budget compatibility
                    estimated_cost = self._estimate_cost(dest['Category'], dest['Region'], dest['Accessibility'])
                    features.append(estimated_cost / 10000)  # Normalize
                    
                    # Make prediction
                    feature_array = np.array(features).reshape(1, -1)
                    
                    if self.scaler:
                        feature_array = self.scaler.transform(feature_array)
                    
                    prediction = self.model.predict(feature_array)[0]
                    
                    # Add interest bonus
                    interest_bonus = 0
                    for interest in interests:
                        if interest.lower() in dest['Category'].lower():
                            interest_bonus += 0.2
                    
                    # Add budget bonus
                    budget_bonus = 0
                    if estimated_cost <= budget:
                        budget_bonus = 0.1
                    
                    final_score = prediction + interest_bonus + budget_bonus
                    
                    predictions.append({
                        'destination': dest['Destination Name'],
                        'category': dest['Category'],
                        'region': dest['Region'],
                        'accessibility': dest['Accessibility'],
                        'prediction_score': float(final_score),
                        'estimated_cost': estimated_cost
                    })
                    
                except Exception as e:
                    logger.warning(f"Prediction failed for {dest['Destination Name']}: {e}")
            
            # Sort by prediction score and return top 5
            predictions.sort(key=lambda x: x['prediction_score'], reverse=True)
            
            recommendations = []
            for pred in predictions[:5]:
                recommendations.append({
                    "Destination": pred['destination'],
                    "Category": pred['category'],
                    "Cost_Level": pred['estimated_cost'],
                    "Region": pred['region'],
                    "Accessibility": pred['accessibility'],
                    "ml_score": round(pred['prediction_score'], 3)
                })
            
            return recommendations
            
        except Exception as e:
            logger.error(f"ML prediction error: {e}")
            return []
    
    def _estimate_cost(self, category: str, region: str, accessibility: str) -> int:
        """Estimate cost based on destination characteristics"""
        base_costs = {
            'Heritage': 12000, 'Beach': 15000, 'Nature': 10000,
            'Adventure': 14000, 'Religious': 8000
        }
        
        region_multipliers = {
            'North': 1.0, 'South': 1.2, 'East': 1.1, 'West': 1.1
        }
        
        accessibility_multipliers = {
            'Easy': 1.0, 'Moderate': 1.2, 'Difficult': 1.4
        }
        
        base_cost = base_costs.get(category, 10000)
        region_mult = region_multipliers.get(region, 1.0)
        access_mult = accessibility_multipliers.get(accessibility, 1.0)
        
        return int(base_cost * region_mult * access_mult)
    
    def _get_rule_based_recommendations(self, user_preferences: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Fallback rule-based recommendations"""
        budget = user_preferences.get('budget', 10000)
        interests = user_preferences.get('preferences', [])
        
        # Score destinations based on preferences
        scored_destinations = []
        
        for _, dest in self.destinations_data.iterrows():
            score = 0
            estimated_cost = self._estimate_cost(dest['Category'], dest['Region'], dest['Accessibility'])
            
            # Budget compatibility
            if estimated_cost <= budget * 1.2:
                score += 3
            
            # Interest matching
            for interest in interests:
                if interest.lower() in dest['Category'].lower():
                    score += 2
            
            # Accessibility bonus
            if dest['Accessibility'] == 'Easy':
                score += 1
            
            scored_destinations.append({
                'destination': dest['Destination Name'],
                'category': dest['Category'],
                'region': dest['Region'],
                'accessibility': dest['Accessibility'],
                'score': score,
                'estimated_cost': estimated_cost
            })
        
        # Sort by score and return top 5
        scored_destinations.sort(key=lambda x: x['score'], reverse=True)
        
        recommendations = []
        for dest in scored_destinations[:5]:
            recommendations.append({
                "Destination": dest['destination'],
                "Category": dest['category'],
                "Cost_Level": dest['estimated_cost'],
                "Region": dest['region'],
                "Accessibility": dest['accessibility'],
                "rule_score": dest['score']
            })
        
        return recommendations
    
    def _get_default_recommendations(self) -> List[Dict[str, Any]]:
        """Default recommendations if ML fails"""
        return [
            {"Destination": "Goa", "Category": "beach", "Cost_Level": 8000, "Best_Time": "November-February"},
            {"Destination": "Manali", "Category": "mountain adventure", "Cost_Level": 9000, "Best_Time": "October-December"},
            {"Destination": "Rishikesh", "Category": "adventure", "Cost_Level": 6000, "Best_Time": "September-November"}
        ]
    
    def predict_budget_breakdown(self, total_budget: int, destination: str, duration: int) -> Dict[str, int]:
        """Predict budget breakdown using ML model and destination data"""
        try:
            # Find destination in dataset
            dest_info = self.destinations_data[
                self.destinations_data['Destination Name'].str.contains(destination, case=False, na=False)
            ]
            
            if not dest_info.empty:
                dest_row = dest_info.iloc[0]
                category = dest_row.get('Category', '').lower()
                accessibility = dest_row.get('Accessibility', 'Moderate')
                region = dest_row.get('Region', 'North')
                
                # ML-enhanced budget allocation
                if self.model is not None:
                    try:
                        # Encoding maps
                        region_map = {'North': 0, 'South': 1, 'East': 2, 'West': 3}
                        category_map = {'Heritage': 0, 'Beach': 1, 'Nature': 2, 'Adventure': 3, 'Religious': 4}
                        access_map = {'Easy': 0, 'Moderate': 1, 'Difficult': 2}
                        
                        # Create features for budget prediction
                        features = [
                            region_map.get(dest_row['Region'], 0),
                            category_map.get(dest_row['Category'], 0),
                            access_map.get(dest_row['Accessibility'], 1),
                            total_budget / 10000  # Normalized budget
                        ]
                        
                        feature_array = np.array(features).reshape(1, -1)
                        if self.scaler:
                            feature_array = self.scaler.transform(feature_array)
                        
                        # Use model prediction to adjust breakdown
                        ml_score = self.model.predict(feature_array)[0]
                        
                        # Adjust breakdown based on ML score
                        if ml_score > 0.7:  # High recommendation score
                            breakdown = {'accommodation': 0.30, 'food': 0.30, 'transport': 0.25, 'activities': 0.15}
                        elif ml_score > 0.5:
                            breakdown = {'accommodation': 0.35, 'food': 0.30, 'transport': 0.20, 'activities': 0.15}
                        else:
                            breakdown = {'accommodation': 0.40, 'food': 0.35, 'transport': 0.15, 'activities': 0.10}
                    except Exception as e:
                        logger.warning(f"ML budget prediction failed: {e}")
                        breakdown = self._get_category_breakdown(category)
                else:
                    breakdown = self._get_category_breakdown(category)
                
                # Regional and accessibility adjustments
                if region in ['South', 'East']:
                    breakdown['transport'] += 0.05
                    breakdown['accommodation'] -= 0.05
                
                if accessibility == 'Difficult':
                    breakdown['transport'] += 0.05
                    breakdown['food'] -= 0.05
                
                # Duration adjustments
                if duration > 5:
                    breakdown['accommodation'] += 0.05
                    breakdown['activities'] -= 0.05
                    
            else:
                breakdown = {'accommodation': 0.35, 'food': 0.30, 'transport': 0.20, 'activities': 0.15}
            
            # Convert to actual amounts
            budget_breakdown = {}
            for category, percentage in breakdown.items():
                budget_breakdown[category] = int(total_budget * percentage)
            
            return budget_breakdown
            
        except Exception as e:
            logger.error(f"Error predicting budget breakdown: {e}")
            return {
                'accommodation': int(total_budget * 0.35),
                'food': int(total_budget * 0.30),
                'transport': int(total_budget * 0.20),
                'activities': int(total_budget * 0.15)
            }
    
    def _get_category_breakdown(self, category: str) -> Dict[str, float]:
        """Get budget breakdown based on destination category"""
        category_breakdowns = {
            'beach': {'accommodation': 0.30, 'food': 0.35, 'transport': 0.20, 'activities': 0.15},
            'adventure': {'accommodation': 0.25, 'food': 0.25, 'transport': 0.30, 'activities': 0.20},
            'heritage': {'accommodation': 0.40, 'food': 0.30, 'transport': 0.20, 'activities': 0.10},
            'religious': {'accommodation': 0.35, 'food': 0.35, 'transport': 0.20, 'activities': 0.10},
            'nature': {'accommodation': 0.30, 'food': 0.30, 'transport': 0.25, 'activities': 0.15}
        }
        return category_breakdowns.get(category, {'accommodation': 0.35, 'food': 0.30, 'transport': 0.20, 'activities': 0.15})
    
    def get_popular_destinations(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get popular destinations using ML model predictions"""
        try:
            if self.model is not None and self.destinations_data is not None:
                # Use ML model to score all destinations
                scored_destinations = []
                
                # Encoding maps
                region_map = {'North': 0, 'South': 1, 'East': 2, 'West': 3}
                category_map = {'Heritage': 0, 'Beach': 1, 'Nature': 2, 'Adventure': 3, 'Religious': 4}
                access_map = {'Easy': 0, 'Moderate': 1, 'Difficult': 2}
                
                for _, dest in self.destinations_data.iterrows():
                    try:
                        # Create feature vector for popularity prediction
                        estimated_cost = self._estimate_cost(dest['Category'], dest['Region'], dest['Accessibility'])
                        
                        features = [
                            region_map.get(dest['Region'], 0),
                            category_map.get(dest['Category'], 0),
                            access_map.get(dest['Accessibility'], 1),
                            estimated_cost / 10000  # Normalized cost
                        ]
                        
                        feature_array = np.array(features).reshape(1, -1)
                        if self.scaler:
                            feature_array = self.scaler.transform(feature_array)
                        
                        popularity_score = self.model.predict(feature_array)[0]
                        
                        dest_info = self._get_destination_info(dest['Destination Name'], dest['Category'])
                        scored_destinations.append({
                            "Destination": dest['Destination Name'],
                            "Category": dest['Category'],
                            "Cost_Level": estimated_cost,
                            "Region": dest['Region'],
                            "Accessibility": dest['Accessibility'],
                            "ml_popularity_score": float(popularity_score),
                            "rating": min(5.0, 3.5 + popularity_score * 1.5),
                            "duration": self._get_recommended_duration(dest['Category']),
                            "description": dest_info["description"],
                            "highlights": dest_info["highlights"],
                            "best_time": dest_info["best_time"]
                        })
                    except Exception as e:
                        logger.warning(f"Failed to score {dest['Destination Name']}: {e}")
                
                # Sort by ML popularity score
                scored_destinations.sort(key=lambda x: x['ml_popularity_score'], reverse=True)
                return scored_destinations[:limit]
            
            # Fallback to static popular destinations
            return self._get_static_popular_destinations()[:limit]
            
        except Exception as e:
            logger.error(f"Error getting popular destinations: {e}")
            return self._get_static_popular_destinations()[:limit]
    
    def _get_recommended_duration(self, category: str) -> str:
        """Get recommended duration based on category"""
        duration_map = {
            'Heritage': '3-4 days',
            'Beach': '4-6 days', 
            'Nature': '3-5 days',
            'Adventure': '5-7 days',
            'Religious': '2-3 days'
        }
        return duration_map.get(category, '3-4 days')
    
    def _get_category_highlights(self, category: str) -> List[str]:
        """Get highlights based on category"""
        highlights_map = {
            'Heritage': ['Historical Sites', 'Architecture', 'Culture'],
            'Beach': ['Beaches', 'Water Sports', 'Nightlife'],
            'Nature': ['Scenic Views', 'Wildlife', 'Trekking'],
            'Adventure': ['Adventure Sports', 'Trekking', 'Outdoor Activities'],
            'Religious': ['Temples', 'Spirituality', 'Cultural Heritage']
        }
        return highlights_map.get(category, ['Sightseeing', 'Local Culture', 'Photography'])
    
    def _get_destination_info(self, destination: str, category: str) -> Dict[str, Any]:
        """Get proper destination-specific information"""
        destination_data = {
            "Taj Mahal": {
                "description": "Iconic marble mausoleum and UNESCO World Heritage Site in Agra.",
                "highlights": ["Marble Architecture", "Mughal History", "Photography"],
                "best_time": "Oct-Mar"
            },
            "Jaipur": {
                "description": "Pink city with royal palaces, vibrant markets, and Rajasthani culture.",
                "highlights": ["Palaces", "Forts", "Markets"],
                "best_time": "Oct-Mar"
            },
            "Goa": {
                "description": "Perfect beaches, vibrant nightlife, and budget-friendly stays for students.",
                "highlights": ["Beaches", "Nightlife", "Water Sports"],
                "best_time": "Nov-Feb"
            },
            "Manali": {
                "description": "Adventure sports, scenic mountains, and affordable hostels in Himachal.",
                "highlights": ["Trekking", "Paragliding", "Snow Activities"],
                "best_time": "May-Oct"
            },
            "Rishikesh": {
                "description": "Yoga capital with river rafting and spiritual experiences on a budget.",
                "highlights": ["River Rafting", "Yoga", "Temples"],
                "best_time": "Sep-Nov"
            },
            "Udaipur": {
                "description": "City of lakes with magnificent palaces and rich Rajasthani heritage.",
                "highlights": ["Palaces", "Lakes", "Architecture"],
                "best_time": "Oct-Mar"
            },
            "Varanasi": {
                "description": "Ancient spiritual city with ghats, temples, and cultural immersion.",
                "highlights": ["Ghats", "Temples", "Spirituality"],
                "best_time": "Oct-Mar"
            },
            "Amritsar": {
                "description": "Golden Temple, rich Sikh heritage, and delicious Punjabi cuisine.",
                "highlights": ["Golden Temple", "History", "Food"],
                "best_time": "Oct-Mar"
            },
            "Shimla": {
                "description": "Hill station with colonial architecture and scenic mountain views.",
                "highlights": ["Hill Station", "Colonial Architecture", "Mountain Views"],
                "best_time": "Mar-Jun"
            },
            "Munnar": {
                "description": "Tea plantations, misty hills, and cool climate in Kerala hills.",
                "highlights": ["Tea Gardens", "Hill Station", "Wildlife"],
                "best_time": "Sep-Mar"
            },
            "Andaman Islands": {
                "description": "Pristine beaches, crystal clear waters, and amazing marine life.",
                "highlights": ["Beaches", "Scuba Diving", "Marine Life"],
                "best_time": "Oct-May"
            },
            "Jaisalmer": {
                "description": "Golden city with desert safaris, forts, and Rajasthani culture.",
                "highlights": ["Desert Safari", "Golden Fort", "Camel Rides"],
                "best_time": "Oct-Mar"
            },
            "Mysore": {
                "description": "Royal heritage city with magnificent palaces and gardens.",
                "highlights": ["Mysore Palace", "Gardens", "Royal Heritage"],
                "best_time": "Oct-Mar"
            },
            "Mahabalipuram": {
                "description": "Ancient port city with rock-cut temples and beach attractions.",
                "highlights": ["Rock Temples", "Shore Temple", "Beach"],
                "best_time": "Nov-Feb"
            },
            "Ajanta and Ellora Caves": {
                "description": "UNESCO World Heritage caves with ancient Buddhist and Hindu art.",
                "highlights": ["Ancient Caves", "Buddhist Art", "Rock Architecture"],
                "best_time": "Nov-Mar"
            }
        }
        
        # Get destination-specific info or use category-based fallback
        if destination in destination_data:
            return destination_data[destination]
        else:
            # Category-based fallback
            category_info = {
                "Heritage": {
                    "description": f"Explore rich heritage and historical attractions in {destination}.",
                    "highlights": ["Historical Sites", "Architecture", "Culture"],
                    "best_time": "Oct-Mar"
                },
                "Beach": {
                    "description": f"Enjoy beautiful beaches and coastal activities in {destination}.",
                    "highlights": ["Beaches", "Water Sports", "Coastal Life"],
                    "best_time": "Nov-Apr"
                },
                "Nature": {
                    "description": f"Experience natural beauty and wildlife in {destination}.",
                    "highlights": ["Nature", "Wildlife", "Scenic Views"],
                    "best_time": "Oct-Mar"
                },
                "Adventure": {
                    "description": f"Adventure activities and outdoor sports in {destination}.",
                    "highlights": ["Adventure Sports", "Trekking", "Outdoor Activities"],
                    "best_time": "Oct-Apr"
                },
                "Religious": {
                    "description": f"Spiritual journey and religious sites in {destination}.",
                    "highlights": ["Temples", "Spirituality", "Religious Sites"],
                    "best_time": "Oct-Mar"
                }
            }
            return category_info.get(category, {
                "description": f"Discover the beauty and attractions of {destination}.",
                "highlights": ["Sightseeing", "Local Culture", "Photography"],
                "best_time": "Oct-Mar"
            })
    
    def _get_static_popular_destinations(self) -> List[Dict[str, Any]]:
        """Fallback static popular destinations"""
        destinations = [
            {"Destination": "Goa", "Category": "Beach", "Cost_Level": 8000},
            {"Destination": "Manali", "Category": "Adventure", "Cost_Level": 12000},
            {"Destination": "Rishikesh", "Category": "Adventure", "Cost_Level": 6000}
        ]
        
        result = []
        for dest in destinations:
            info = self._get_destination_info(dest["Destination"], dest["Category"])
            result.append({
                "Destination": dest["Destination"],
                "Category": dest["Category"],
                "Cost_Level": dest["Cost_Level"],
                "rating": 4.5,
                "duration": self._get_recommended_duration(dest["Category"]),
                "description": info["description"],
                "highlights": info["highlights"],
                "best_time": info["best_time"]
            })
        return result

# Global instance
ml_service = MLRecommendationService()