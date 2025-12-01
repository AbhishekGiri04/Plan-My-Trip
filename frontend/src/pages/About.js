import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', paddingTop: '100px'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
        
        {/* Hero Section */}
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <h1 style={{fontSize: '3.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', fontFamily: 'Inter, sans-serif'}}>
            About Plan My Trip
          </h1>
          <p style={{fontSize: '1.3rem', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6'}}>
            Revolutionizing student travel with AI-powered planning
          </p>
        </div>

        {/* Mission Section */}
        <div style={{background: 'white', borderRadius: '24px', padding: '3rem', marginBottom: '3rem', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#0f172a', textAlign: 'center'}}>Our Mission</h2>
          <p style={{fontSize: '1.2rem', color: '#64748b', marginBottom: '3rem', lineHeight: '1.7', textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem'}}>
            Plan My Trip was created to solve the unique challenges students face when planning travel. 
            We understand that students have limited budgets, tight schedules, and need reliable, 
            safe travel options. Our AI-powered platform combines machine learning models with real-time data 
            and intelligent recommendations to create personalized travel experiences that don't break the bank.
          </p>
          
          {/* Features Grid */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s ease'}}>
              <Brain size={48} style={{color: '#3b82f6', margin: '0 auto 1rem'}} />
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a'}}>AI-Powered Intelligence</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Our advanced AI analyzes thousands of data points to create the perfect itinerary 
                tailored to your preferences, budget, and travel style.
              </p>
            </div>
            
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s ease'}}>
              <Target size={48} style={{color: '#10b981', margin: '0 auto 1rem'}} />
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a'}}>Student-Focused</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Every feature is designed with students in mind - from budget optimization 
                to group travel planning and safety considerations.
              </p>
            </div>
            
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s ease'}}>
              <Users size={48} style={{color: '#8b5cf6', margin: '0 auto 1rem'}} />
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a'}}>Community Driven</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Built by students, for students. We continuously improve based on feedback 
                from our community of student travelers.
              </p>
            </div>
            
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s ease'}}>
              <Zap size={48} style={{color: '#f59e0b', margin: '0 auto 1rem'}} />
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a'}}>Real-Time Updates</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Stay informed with live weather updates, safety news, and travel advisories 
                to make informed decisions about your trip.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{background: 'white', borderRadius: '24px', padding: '3rem', marginBottom: '3rem', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem', color: '#0f172a', textAlign: 'center'}}>How It Works</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px'}}>
              <div style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.2rem',
                flexShrink: 0
              }}>
                1
              </div>
              <div>
                <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f172a'}}>Tell Us Your Preferences</h3>
                <p style={{color: '#64748b', lineHeight: '1.6'}}>
                  Input your destination, dates, budget, travel mode, and interests. Our form 
                  is designed to capture everything needed for personalized recommendations.
                </p>
              </div>
            </div>
            
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px'}}>
              <div style={{
                backgroundColor: '#10b981',
                color: 'white',
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.2rem',
                flexShrink: 0
              }}>
                2
              </div>
              <div>
                <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f172a'}}>ML Analysis & Data Gathering</h3>
                <p style={{color: '#64748b', lineHeight: '1.6'}}>
                  Our machine learning models analyze your preferences against historical travel data, 
                  while fetching real-time weather, safety news, and costs to ensure accurate recommendations.
                </p>
              </div>
            </div>
            
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px'}}>
              <div style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.2rem',
                flexShrink: 0
              }}>
                3
              </div>
              <div>
                <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f172a'}}>AI-Enhanced Itinerary Generation</h3>
                <p style={{color: '#64748b', lineHeight: '1.6'}}>
                  Combining ML destination recommendations with advanced language models, we create 
                  detailed day-by-day itineraries with smart budget allocation and personalized activities.
                </p>
              </div>
            </div>
            
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px'}}>
              <div style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.2rem',
                flexShrink: 0
              }}>
                4
              </div>
              <div>
                <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f172a'}}>Interactive Results & Planning</h3>
                <p style={{color: '#64748b', lineHeight: '1.6'}}>
                  Review your complete itinerary with weather forecasts, safety updates, 
                  and smart recommendations. Download or modify as needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{textAlign: 'center', padding: '3rem 0'}}>
          <h3 style={{fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a'}}>Ready to Plan Your Next Adventure?</h3>
          <p style={{fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem'}}>Join thousands of students who've discovered amazing destinations with our AI-powered planner</p>
          <button
            onClick={() => navigate('/plan')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Start Planning Now <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;