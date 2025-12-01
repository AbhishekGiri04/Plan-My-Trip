import React from 'react';
import { Bot, DollarSign, Thermometer, Shield, Car, Smartphone, Zap, Target, Clock, Newspaper, AlertTriangle, MapPin, Calendar, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: Bot,
      title: 'AI-Powered Itineraries',
      description: 'Get personalized travel plans created by advanced AI that understands student needs and budget constraints.',
      benefits: ['Personalized recommendations', 'Budget-optimized planning', 'Real-time adjustments', 'Smart activity suggestions'],
      color: '#3b82f6'
    },
    {
      icon: DollarSign,
      title: 'Budget-Friendly Options',
      description: 'Find the best deals on accommodation, transport, and activities that fit your student budget perfectly.',
      benefits: ['Cost breakdown analysis', 'Student discounts', 'Budget tracking', 'Money-saving tips'],
      color: '#10b981'
    },
    {
      icon: Thermometer,
      title: 'Real-Time Weather',
      description: 'Stay updated with live weather forecasts to pack right and plan your activities accordingly.',
      benefits: ['5-day forecasts', 'Packing suggestions', 'Activity recommendations', 'Weather alerts'],
      color: '#f59e0b'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Get latest safety updates and travel advisories for your destination to ensure worry-free travel.',
      benefits: ['Travel advisories', 'Safety ratings', 'Emergency contacts', 'Local guidelines'],
      color: '#ef4444'
    },
    {
      icon: Car,
      title: 'Multi-Modal Transport',
      description: 'Choose from buses, trains, flights, or road trips - we\'ll find the best option for your journey.',
      benefits: ['Route optimization', 'Cost comparison', 'Time efficiency', 'Comfort preferences'],
      color: '#8b5cf6'
    },
    {
      icon: Smartphone,
      title: 'Instant Planning',
      description: 'Generate complete itineraries in seconds with our lightning-fast AI travel assistant.',
      benefits: ['Quick generation', 'Mobile optimized', 'Offline access', 'Easy sharing'],
      color: '#06b6d4'
    }
  ];

  const aiFeatures = [
    {
      icon: Target,
      title: 'Smart Personalization',
      description: 'AI learns your preferences to suggest destinations and activities you\'ll love',
      stats: '95% accuracy rate'
    },
    {
      icon: Clock,
      title: 'Instant Generation',
      description: 'Complete itineraries generated in under 30 seconds',
      stats: 'Average 15 seconds'
    },
    {
      icon: Zap,
      title: 'Dynamic Updates',
      description: 'Real-time adjustments based on weather, events, and availability',
      stats: 'Live updates'
    }
  ];

  const integrations = [
    {
      icon: Thermometer,
      title: 'Weather Integration',
      description: 'OpenWeather API for accurate forecasts',
      features: ['5-day forecasts', 'Hourly updates', 'Weather alerts', 'Packing tips']
    },
    {
      icon: MapPin,
      title: 'Maps & Navigation',
      description: 'OpenStreetMap for routes and locations',
      features: ['Route planning', 'Distance calculation', 'Open source maps', 'Location search']
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Engineering Student',
      rating: 5,
      comment: 'The AI itinerary was spot-on! Saved me hours of planning and stayed within my ₹8000 budget for Goa.',
      avatar: '👩‍🎓'
    },
    {
      name: 'Rahul Kumar',
      role: 'MBA Student',
      rating: 5,
      comment: 'Weather updates helped me pack perfectly for Manali. The budget breakdown was incredibly accurate!',
      avatar: '👨‍🎓'
    },
    {
      name: 'Ananya Patel',
      role: 'Medical Student',
      rating: 5,
      comment: 'Found amazing student discounts I never knew existed. The safety updates gave me peace of mind.',
      avatar: '👩‍⚕️'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', paddingTop: '100px' }}>
      {/* Hero Section */}
      <section style={{ padding: '2rem 2rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            AI-Powered Travel Features
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
            Experience the future of travel planning with our advanced AI features designed specifically for student travelers
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section style={{ padding: '2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', color: '#0f172a', marginBottom: '3rem' }}>
            Core Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid #f1f5f9'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <IconComponent size={28} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    {feature.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ width: '6px', height: '6px', background: feature.color, borderRadius: '50%' }}></div>
                        <span style={{ color: '#374151', fontSize: '0.9rem' }}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Features Highlight */}
      <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Advanced AI Capabilities
            </h2>
            <p style={{ fontSize: '1.2rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
              Powered by GPT-4 and machine learning algorithms trained specifically for student travel patterns
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {aiFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '2rem',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}>
                    <IconComponent size={28} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ opacity: '0.9', marginBottom: '1rem', lineHeight: '1.6' }}>
                    {feature.description}
                  </p>
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#93c5fd'
                  }}>
                    {feature.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* API Integrations */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
              Real-Time Data Integration
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Connected to leading APIs for the most accurate and up-to-date travel information
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {integrations.map((integration, index) => {
              const IconComponent = integration.icon;
              return (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    textAlign: 'center',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}>
                    <IconComponent size={28} style={{ color: '#3b82f6' }} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
                    {integration.title}
                  </h3>
                  <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    {integration.description}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {integration.features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#f1f5f9',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#374151'
                        }}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '4rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
              What Students Say
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
              Real feedback from students who've used our AI travel planner
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '20px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>{testimonial.avatar}</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                      {testimonial.name}
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{testimonial.role}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  ))}
                </div>
                <p style={{ color: '#374151', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Ready to Experience AI Travel Planning?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
            Join thousands of students who've discovered smarter, budget-friendly travel planning
          </p>
          <Link
            to="/plan"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1.2rem 2.5rem',
              background: 'white',
              color: '#3b82f6',
              textDecoration: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              fontSize: '1.1rem',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <Zap size={20} />
            Start Planning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;