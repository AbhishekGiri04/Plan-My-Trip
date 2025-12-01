import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for better error handling
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 500) {
      console.error('Server error - check backend logs');
    }
    return Promise.reject(error);
  }
);

// Itinerary API
export const generateItinerary = async (travelData) => {
  try {
    console.log('Sending travel data to backend:', travelData);
    const response = await api.post('/generate-itinerary', travelData);
    console.log('Received response from backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    // Return structured error for better handling
    throw {
      message: error.response?.data?.detail || error.message || 'Failed to generate itinerary',
      status: error.response?.status || 500,
      data: error.response?.data
    };
  }
};

export const getPopularDestinations = async () => {
  try {
    // Add cache-busting parameter
    const timestamp = new Date().getTime();
    const response = await api.get(`/destinations/popular?_t=${timestamp}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Weather API
export const getWeather = async (city) => {
  try {
    const response = await api.get(`/weather/${city}`);
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

// ML Recommendations API
export const getRecommendations = async (preferences) => {
  try {
    const response = await api.post('/recommendations', preferences);
    return response.data;
  } catch (error) {
    console.error('Recommendations API Error:', error);
    throw error;
  }
};

export const getBudgetBreakdown = async (destination, budget, duration) => {
  try {
    const response = await api.get(`/budget-breakdown/${destination}?budget=${budget}&duration=${duration}`);
    return response.data;
  } catch (error) {
    console.error('Budget Breakdown API Error:', error);
    throw error;
  }
};

export default api;