import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PlanTrip.css';

const PlanTrip = ({ setHideFooter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelMode: '',
    preferences: [],
    groupSize: 1,
    accommodation: 'budget'
  });

  // Pre-fill data if coming from home page or URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const destinationFromUrl = urlParams.get('destination');
    
    // Calculate budget based on destination (matching destination cards)
    const getDestinationBudget = (dest) => {
      if (!dest) return ''; // No default budget when no destination
      const destination = dest.toLowerCase();
      
      // Budget for each destination (exact match with cards)
      if (destination.includes('goa')) return '8000';
      if (destination.includes('manali')) return '12000';
      if (destination.includes('rishikesh')) return '6000';
      if (destination.includes('udaipur')) return '15000';
      if (destination.includes('varanasi')) return '5000';
      if (destination.includes('spiti')) return '18000';
      if (destination.includes('munnar')) return '9000';
      if (destination.includes('amritsar')) return '7000';
      if (destination.includes('jaipur')) return '10000';
      if (destination.includes('andaman')) return '25000';
      
      return ''; // No default budget
    };
    
    // Determine destination and get its budget
    let destinationName = '';
    if (destinationFromUrl) {
      destinationName = destinationFromUrl;
    } else if (location.state?.destination) {
      destinationName = location.state.destination;
    }
    
    const budget = getDestinationBudget(destinationName);
    
    // Only set budget if destination is provided
    const updates = {};
    if (budget) {
      updates.budget = budget;
    }
    
    if (destinationFromUrl) {
      updates.destination = destinationFromUrl;
    } else if (location.state?.destination) {
      updates.destination = location.state.destination;
      Object.assign(updates, location.state);
    }
    
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, [location.search, location.state]);

  const travelModes = [
    { value: 'bus', label: '🚌 Bus', desc: 'Most economical option' },
    { value: 'train', label: '🚂 Train', desc: 'Comfortable & affordable' },
    { value: 'flight', label: '✈️ Flight', desc: 'Fastest travel option' },
    { value: 'car', label: '🚗 Car/Cab', desc: 'Flexible & convenient' },
    { value: 'bike', label: '🏍️ Bike/Scooty', desc: 'Adventure & freedom' }
  ];

  const preferenceOptions = [
    { value: 'adventure', label: '🏔️ Adventure', color: '#ff6b35' },
    { value: 'beach', label: '🏖️ Beach', color: '#4ecdc4' },
    { value: 'culture', label: '🏵️ Culture', color: '#45b7d1' },
    { value: 'nature', label: '🌳 Nature', color: '#96ceb4' },
    { value: 'food', label: '🥗 Food', color: '#feca57' },
    { value: 'photography', label: '📸 Photography', color: '#ff9ff3' },
    { value: 'nightlife', label: '🌃 Nightlife', color: '#54a0ff' },
    { value: 'shopping', label: '🛍️ Shopping', color: '#5f27cd' }
  ];

  const accommodationTypes = [
    { value: 'budget', label: 'Budget Hostels', desc: '₹500-1000/night' },
    { value: 'mid', label: 'Mid-range Hotels', desc: '₹1500-3000/night' },
    { value: 'luxury', label: 'Luxury Resorts', desc: '₹5000+/night' }
  ];

  const handlePreferenceToggle = (preference) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.destination || !formData.startDate || !formData.endDate || !formData.budget || !formData.travelMode) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    if (setHideFooter) setHideFooter(true);
    
    try {
      // Prepare request data
      const requestData = {
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        budget: parseInt(formData.budget),
        travel_mode: formData.travelMode,
        preferences: formData.preferences,
        group_size: formData.groupSize
      };
      
      // Call the actual API
      const { generateItinerary } = await import('../services/api');
      const results = await generateItinerary(requestData);
      
      // Store user input data with results
      const userInputData = {
        destination: formData.destination,
        duration: Math.max(1, Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))),
        budget: parseInt(formData.budget),
        travel_mode: formData.travelMode,
        ...results
      };
      sessionStorage.setItem('tripResults', JSON.stringify(userInputData));
      setLoading(false);
      navigate('/results');
      
    } catch (error) {
      console.error('Error generating itinerary:', error);
      
      // Fallback to mock data if API fails
      const duration = Math.max(1, Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)));
      const mockResults = {
        destination: formData.destination,
        duration: duration,
        budget: parseInt(formData.budget),
        travel_mode: formData.travelMode,
        preferences: formData.preferences,
        itinerary: {
          daily_plans: Array.from({length: duration}, (_, i) => ({
            day: i + 1,
            date: new Date(new Date(formData.startDate).getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            activities: [
              `Morning: ${formData.preferences.includes('adventure') ? 'Adventure activity' : 'Local sightseeing'}`,
              `Afternoon: ${formData.preferences.includes('food') ? 'Food tour' : 'Cultural exploration'}`,
              `Evening: ${formData.preferences.includes('nightlife') ? 'Local nightlife' : 'Relaxation time'}`
            ],
            accommodation: `${formData.accommodation === 'budget' ? 'Budget hostel' : formData.accommodation === 'mid' ? 'Mid-range hotel' : 'Luxury resort'}`,
            meals: ['Breakfast: Local cafe', 'Lunch: Popular restaurant', 'Dinner: Street food'],
            transport: formData.travelMode,
            cost: Math.floor(formData.budget / duration)
          })),
          total_cost: formData.budget,
          recommendations: [
            "Pack light and comfortable clothes for the weather",
            "Carry a power bank and portable charger",
            "Try local street food for authentic experience",
            "Book accommodations in advance for better rates",
            "Keep emergency contacts and important documents handy"
          ],
          budget_breakdown: {
            accommodation: Math.floor(formData.budget * 0.4),
            food: Math.floor(formData.budget * 0.3),
            transport: Math.floor(formData.budget * 0.2),
            activities: Math.floor(formData.budget * 0.1)
          }
        },
        weather: {
          temperature: 25 + Math.floor(Math.random() * 10),
          description: "Pleasant weather expected",
          feels_like: 27 + Math.floor(Math.random() * 8),
          humidity: 60 + Math.floor(Math.random() * 20)
        },
        news: {
          safety_level: "Generally Safe",
          summary: "No major travel advisories. Normal precautions recommended.",
          articles: [
            {
              title: `${formData.destination} welcomes tourists with new safety measures`,
              source: "Travel News India"
            }
          ]
        }
      };
      
      sessionStorage.setItem('tripResults', JSON.stringify(mockResults));
      setLoading(false);
      navigate('/results');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (loading) {
    return null;
  }

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', paddingTop: '120px', paddingBottom: '100px'}}>
      <div style={{maxWidth: '900px', margin: '0 auto', padding: '0 2rem'}}>
        
        {/* Progress Bar */}
        <div style={{marginBottom: '3rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <h1 style={{fontSize: '3rem', fontWeight: '800', color: '#0f172a', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Plan Your Trip</h1>
            <div style={{background: 'white', padding: '0.75rem 1.5rem', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', color: '#64748b', fontSize: '0.9rem', fontWeight: '600'}}>Step {currentStep} of 3</div>
          </div>
          <div style={{background: 'rgba(255,255,255,0.8)', height: '8px', borderRadius: '20px', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'}}>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              height: '100%',
              width: `${(currentStep / 3) * 100}%`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '20px',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#333'}}>
                  📍 Where & When?
                </h2>
                
                <div className="search-form">
                  <div className="form-field">
                    <label>DESTINATION</label>
                    <input
                      type="text"
                      placeholder="Enter destination (e.g., Goa, Manali, Rishikesh)"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label>START DATE</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label>END DATE</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label>BUDGET (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g., 15000"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label>TRAVELERS</label>
                    <select
                      value={formData.groupSize}
                      onChange={(e) => setFormData({...formData, groupSize: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div style={{textAlign: 'right', marginTop: '2rem'}}>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="search-btn"
                    disabled={!formData.destination || !formData.startDate || !formData.endDate || !formData.budget}
                  >
                    Next: Travel Mode →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Travel & Stay */}
            {currentStep === 2 && (
              <div>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#333'}}>
                  🚙 How do you want to travel?
                </h2>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
                  {travelModes.map(mode => (
                    <div
                      key={mode.value}
                      onClick={() => setFormData({...formData, travelMode: mode.value})}
                      style={{
                        padding: '1.5rem',
                        border: `2px solid ${formData.travelMode === mode.value ? '#f97316' : '#e5e7eb'}`,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: formData.travelMode === mode.value ? 'linear-gradient(135deg, #fff7ed, #fed7aa)' : '#f8fafc',
                        textAlign: 'center',
                        boxShadow: formData.travelMode === mode.value ? '0 8px 25px rgba(249, 115, 22, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transform: formData.travelMode === mode.value ? 'translateY(-2px)' : 'translateY(0)'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.travelMode !== mode.value) {
                          e.currentTarget.style.background = '#f1f5f9';
                          e.currentTarget.style.borderColor = '#94a3b8';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formData.travelMode !== mode.value) {
                          e.currentTarget.style.background = '#f8fafc';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{mode.label.split(' ')[0]}</div>
                      <div style={{fontWeight: '600', marginBottom: '0.25rem', color: formData.travelMode === mode.value ? '#c2410c' : '#374151'}}>{mode.label.substring(2)}</div>
                      <div style={{fontSize: '0.875rem', color: formData.travelMode === mode.value ? '#9a3412' : '#6b7280'}}>{mode.desc}</div>
                    </div>
                  ))}
                </div>

                <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#333'}}>
                  🏬 Accommodation Preference
                </h3>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
                  {accommodationTypes.map(acc => (
                    <div
                      key={acc.value}
                      onClick={() => setFormData({...formData, accommodation: acc.value})}
                      style={{
                        padding: '1rem',
                        border: `2px solid ${formData.accommodation === acc.value ? '#10b981' : '#e5e7eb'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: formData.accommodation === acc.value ? 'linear-gradient(135deg, #ecfdf5, #d1fae5)' : '#f8fafc',
                        boxShadow: formData.accommodation === acc.value ? '0 4px 15px rgba(16, 185, 129, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <div style={{fontWeight: '600', marginBottom: '0.25rem', color: formData.accommodation === acc.value ? '#047857' : '#374151'}}>{acc.label}</div>
                      <div style={{fontSize: '0.875rem', color: formData.accommodation === acc.value ? '#065f46' : '#6b7280'}}>{acc.desc}</div>
                    </div>
                  ))}
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      background: 'none',
                      border: '2px solid #008cff',
                      color: '#008cff',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="search-btn"
                    disabled={!formData.travelMode}
                  >
                    Next: Preferences →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#333'}}>
                  ✨ What interests you?
                </h2>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
                  {preferenceOptions.map(pref => (
                    <div
                      key={pref.value}
                      onClick={() => handlePreferenceToggle(pref.value)}
                      style={{
                        padding: '1rem',
                        border: `2px solid ${formData.preferences.includes(pref.value) ? pref.color : '#e5e7eb'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: formData.preferences.includes(pref.value) ? `${pref.color}20` : '#f8fafc',
                        textAlign: 'center',
                        boxShadow: formData.preferences.includes(pref.value) ? `0 4px 15px ${pref.color}25` : '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transform: formData.preferences.includes(pref.value) ? 'translateY(-1px)' : 'translateY(0)'
                      }}
                    >
                      <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>{pref.label.split(' ')[0]}</div>
                      <div style={{fontWeight: '600', fontSize: '0.9rem', color: formData.preferences.includes(pref.value) ? pref.color : '#374151'}}>{pref.label.substring(2)}</div>
                    </div>
                  ))}
                </div>
                
                <div style={{background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '2rem'}}>
                  <h4 style={{marginBottom: '0.5rem', color: '#333'}}>📋 Trip Summary</h4>
                  <div style={{fontSize: '0.9rem', color: '#666'}}>
                    <strong>{formData.destination}</strong> • {formData.startDate} to {formData.endDate} • 
                    ₹{formData.budget} • {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'} • 
                    {formData.travelMode} • {formData.preferences.length} interests selected
                  </div>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      background: 'none',
                      border: '2px solid #008cff',
                      color: '#008cff',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="search-btn"
                    style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}
                  >
                    Generate My Trip
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanTrip;