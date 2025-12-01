import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plane, Hotel, Home as HomeIcon, Package, Train, Bus, Car, Camera, FileText, Ship, CreditCard, Shield, MapPin, Calendar, Users, ArrowLeftRight, Search, Globe, Map, Building, Gift, Bot, Clock, Target, DollarSign, Thermometer, Newspaper, AlertTriangle, Zap, Umbrella, Car as CarIcon, Smartphone } from 'lucide-react';
import '../assets/styles/Home.css';


const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');
  const [activeTripType, setActiveTripType] = useState('oneWay');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Itineraries",
      description: "Get personalized travel plans created by advanced AI that understands student needs and budget constraints."
    },
    {
      icon: "💰",
      title: "Budget-Friendly Options",
      description: "Find the best deals on accommodation, transport, and activities that fit your student budget perfectly."
    },
    {
      icon: "🌤️",
      title: "Real-Time Weather",
      description: "Stay updated with live weather forecasts to pack right and plan your activities accordingly."
    },
    {
      icon: "🛡️",
      title: "Safety First",
      description: "Get latest safety updates and travel advisories for your destination to ensure worry-free travel."
    },
    {
      icon: "🚌",
      title: "Multi-Modal Transport",
      description: "Choose from buses, trains, flights, or road trips - we'll find the best option for your journey."
    },
    {
      icon: "📱",
      title: "Instant Planning",
      description: "Generate complete itineraries in seconds with our lightning-fast AI travel assistant."
    }
  ];

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Journey to explore world with AI</h1>
            <p className="hero-subtitle">
              Smart budget travel planning for students. Get personalized itineraries, 
              real-time updates, and budget-friendly recommendations powered by AI.
            </p>
            <div className="hero-buttons">
              <Link to="/plan" className="btn btn-primary">Start Planning</Link>
              <Link to="/features" className="btn btn-secondary">Watch Demo</Link>
            </div>
          </div>
        </div>
      </section>



      {/* Popular Destinations */}
      <section className="popular animate-on-scroll" id="destinations">
        <div className="container">
          <p className="section-subtitle">Discover Places</p>
          <h2 className="section-title">Popular Student Destinations</h2>
          <p className="section-text">
            Explore the most loved destinations by students worldwide. Budget-friendly places with amazing experiences.
          </p>

          <ul className="popular-list">
            <li>
              <div className="popular-card">
                <figure className="card-img">
                  <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg?w=1200&h=700&s=1" alt="Goa, India" loading="lazy" />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                  </div>
                  <p className="card-subtitle">
                    <span>India</span>
                  </p>
                  <h3 className="h3 card-title">
                    <span>Goa</span>
                  </h3>
                  <p className="card-text">
                    Perfect beaches, vibrant nightlife, and budget-friendly stays for students.
                  </p>
                  <button
                    onClick={() => navigate('/plan?destination=Goa')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '1rem'
                    }}
                  >
                    Plan Trip to Goa
                  </button>
                </div>
              </div>
            </li>

            <li>
              <div className="popular-card">
                <figure className="card-img">
                  <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400" alt="Manali, India" loading="lazy" />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                  </div>
                  <p className="card-subtitle">
                    <span>India</span>
                  </p>
                  <h3 className="h3 card-title">
                    <span>Manali</span>
                  </h3>
                  <p className="card-text">
                    Adventure sports, scenic mountains, and affordable hostels.
                  </p>
                  <button
                    onClick={() => navigate('/plan?destination=Manali')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '1rem'
                    }}
                  >
                    Plan Trip to Manali
                  </button>
                </div>
              </div>
            </li>

            <li>
              <div className="popular-card">
                <figure className="card-img">
                  <img src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS0uUHqs03sEjt2aQK0Iw56aKUuT8dfqVd-Omn1LthZeOT-j3uuhjLyHNWMoZbt6Ck-FqW46HvXkxIAQfN_bhLDX698ffAZqNt5B7Fi4Q" alt="Rishikesh, India" loading="lazy" />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                  </div>
                  <p className="card-subtitle">
                    <span>India</span>
                  </p>
                  <h3 className="h3 card-title">
                    <span>Rishikesh</span>
                  </h3>
                  <p className="card-text">
                    Yoga capital, river rafting, and spiritual experiences on a budget.
                  </p>
                  <button
                    onClick={() => navigate('/plan?destination=Rishikesh')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '1rem'
                    }}
                  >
                    Plan Trip to Rishikesh
                  </button>
                </div>
              </div>
            </li>
          </ul>

          <Link to="/destinations" className="btn btn-primary">Explore More Destinations</Link>
        </div>
      </section>

      {/* AI Features Package Section */}
      <section className="package animate-on-scroll" id="packages">
        <div className="container">
          <p className="section-subtitle">AI-Powered Features</p>
          <h2 className="section-title">Smart Travel Planning</h2>
          <p className="section-text">
            Experience the future of travel planning with our advanced AI features designed for student travelers.
          </p>

          <ul className="package-list">
            <li>
              <div className="package-card">
                <figure className="card-banner">
                  <div className="ai-feature-icon">
                    <Bot size={64} className="feature-main-icon" />
                  </div>
                </figure>
                <div className="card-content">
                  <h3 className="card-title">AI Itinerary Generator</h3>
                  <p className="card-text">
                    Get personalized day-by-day itineraries created by advanced AI that understands student preferences and budget constraints.
                  </p>
                  <ul className="card-meta-list">
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <Clock size={16} />
                        <p className="text">Instant</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <Target size={16} />
                        <p className="text">Personalized</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <DollarSign size={16} />
                        <p className="text">Budget-Smart</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-price">
                  <div className="wrapper">
                    <p className="reviews">(500+ users)</p>
                    <div className="card-rating">
                      <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                    </div>
                  </div>
                  <p className="price">
                    Free
                    <span>/ always</span>
                  </p>
                  <Link to="/plan" className="btn btn-secondary">Try Now</Link>
                </div>
              </div>
            </li>

            <li>
              <div className="package-card">
                <figure className="card-banner">
                  <div className="ai-feature-icon weather-icon">
                    <Thermometer size={64} className="feature-main-icon" />
                  </div>
                </figure>
                <div className="card-content">
                  <h3 className="card-title">Real-time Weather & News</h3>
                  <p className="card-text">
                    Stay updated with live weather forecasts and local news to make informed decisions about your travel plans.
                  </p>
                  <ul className="card-meta-list">
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <Thermometer size={16} />
                        <p className="text">Live Weather</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <Newspaper size={16} />
                        <p className="text">Local News</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <AlertTriangle size={16} />
                        <p className="text">Safety Alerts</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-price">
                  <div className="wrapper">
                    <p className="reviews">(300+ users)</p>
                    <div className="card-rating">
                      <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                    </div>
                  </div>
                  <p className="price">
                    Free
                    <span>/ included</span>
                  </p>
                  <Link to="/features" className="btn btn-secondary">Get Updates</Link>
                </div>
              </div>
            </li>
          </ul>

          <div className="cta-button-container">
            <Link to="/plan" className="btn btn-primary cta-button">Start Planning Your Trip</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section animate-on-scroll">
        <div className="features-container">
          <h2 className="features-title">Why Choose Plan My Trip?</h2>
          <p className="features-subtitle">
            We understand student travel needs and create personalized experiences that don't break the bank
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <Bot size={56} className="feature-icon" />
              <h3 className="feature-title">AI-Powered Itineraries</h3>
              <p className="feature-desc">Get personalized travel plans created by advanced AI that understands student needs and budget constraints.</p>
            </div>
            <div className="feature-card">
              <DollarSign size={56} className="feature-icon" />
              <h3 className="feature-title">Budget-Friendly Options</h3>
              <p className="feature-desc">Find the best deals on accommodation, transport, and activities that fit your student budget perfectly.</p>
            </div>
            <div className="feature-card">
              <Umbrella size={56} className="feature-icon" />
              <h3 className="feature-title">Real-Time Weather</h3>
              <p className="feature-desc">Stay updated with live weather forecasts to pack right and plan your activities accordingly.</p>
            </div>
            <div className="feature-card">
              <Shield size={56} className="feature-icon" />
              <h3 className="feature-title">Safety First</h3>
              <p className="feature-desc">Get latest safety updates and travel advisories for your destination to ensure worry-free travel.</p>
            </div>
            <div className="feature-card">
              <CarIcon size={56} className="feature-icon" />
              <h3 className="feature-title">Multi-Modal Transport</h3>
              <p className="feature-desc">Choose from buses, trains, flights, or road trips - we'll find the best option for your journey.</p>
            </div>
            <div className="feature-card">
              <Smartphone size={56} className="feature-icon" />
              <h3 className="feature-title">Instant Planning</h3>
              <p className="feature-desc">Generate complete itineraries in seconds with our lightning-fast AI travel assistant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="animate-on-scroll" style={{padding: '5rem 2rem', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', position: 'relative'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '3rem', fontWeight: '800', marginBottom: '4rem', color: '#0f172a', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.025em'}}>
            Trusted by Students Across India
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem'}}>
            <div style={{padding: '2rem', background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)', border: '1px solid #f1f5f9', transition: 'transform 0.3s ease'}} className="stat-card">
              <div style={{fontSize: '4rem', fontWeight: '800', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', fontFamily: 'Manrope, sans-serif'}}>10K+</div>
              <div style={{color: '#64748b', fontSize: '1.2rem', fontWeight: '600'}}>Happy Travelers</div>
            </div>
            <div style={{padding: '2rem', background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)', border: '1px solid #f1f5f9', transition: 'transform 0.3s ease'}} className="stat-card">
              <div style={{fontSize: '4rem', fontWeight: '800', background: 'linear-gradient(135deg, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', fontFamily: 'Manrope, sans-serif'}}>500+</div>
              <div style={{color: '#64748b', fontSize: '1.2rem', fontWeight: '600'}}>Destinations Covered</div>
            </div>
            <div style={{padding: '2rem', background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)', border: '1px solid #f1f5f9', transition: 'transform 0.3s ease'}} className="stat-card">
              <div style={{fontSize: '4rem', fontWeight: '800', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', fontFamily: 'Manrope, sans-serif'}}>₹5K+</div>
              <div style={{color: '#64748b', fontSize: '1.2rem', fontWeight: '600'}}>Average Savings</div>
            </div>
            <div style={{padding: '2rem', background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)', border: '1px solid #f1f5f9', transition: 'transform 0.3s ease'}} className="stat-card">
              <div style={{fontSize: '4rem', fontWeight: '800', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', fontFamily: 'Manrope, sans-serif'}}>4.8★</div>
              <div style={{color: '#64748b', fontSize: '1.2rem', fontWeight: '600'}}>User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="animate-on-scroll" style={{padding: '6rem 2rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'}}></div>
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2}}>
          <h2 style={{fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.025em'}}>
            Ready for Your Next Adventure?
          </h2>
          <p style={{fontSize: '1.3rem', marginBottom: '3rem', opacity: '0.9', lineHeight: '1.6', color: '#cbd5e1'}}>
            Join thousands of students who've discovered amazing destinations with our AI-powered travel planner
          </p>
          <button
            onClick={() => navigate('/plan')}
            style={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
              color: 'white',
              border: 'none',
              padding: '1.5rem 4rem',
              borderRadius: '16px',
              fontSize: '1.3rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: 'Manrope, sans-serif',
              boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 53, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
            }}
          >
            Start Planning Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;