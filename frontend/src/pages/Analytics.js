import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, MapPin, DollarSign, Calendar, Star, Clock, Plane, Train, Bus, Car, Hotel, Camera, Award, Target, Zap } from 'lucide-react';

const Analytics = () => {
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    trips: 0,
    savings: 0,
    rating: 0
  });

  useEffect(() => {
    const targets = { users: 15247, trips: 8934, savings: 24000000, rating: 4.8 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        users: Math.floor(targets.users * progress),
        trips: Math.floor(targets.trips * progress),
        savings: Math.floor(targets.savings * progress),
        rating: Math.min(targets.rating * progress, 4.8)
      });
      
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, #f8fafc 100%)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '300px', background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '0.75rem 1.5rem', borderRadius: '25px', marginBottom: '1.5rem' }}>
              <span style={{ color: 'white', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Analytics Hub</span>
            </div>
            <h1 style={{ fontSize: '4rem', fontWeight: '900', color: '#0f172a', margin: 0, marginBottom: '1rem', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
              Student Travel Intelligence
            </h1>
            <div style={{ width: '80px', height: '4px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', margin: '0 auto 1.5rem', borderRadius: '2px' }}></div>
          </div>
          <p style={{ fontSize: '1.4rem', color: '#64748b', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7', fontWeight: '400' }}>
            Comprehensive insights and real-time analytics powering smarter student travel decisions across India
          </p>
        </div>

        {/* Animated Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(59, 130, 246, 0.1)', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.05))', borderRadius: '0 24px 0 100px' }}></div>
            <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', padding: '1rem', borderRadius: '16px', display: 'inline-flex', marginBottom: '1.5rem' }}>
              <Users size={28} style={{ color: 'white' }} />
            </div>
            <h3 style={{ fontSize: '3.2rem', fontWeight: '900', margin: 0, marginBottom: '0.5rem', color: '#0f172a' }}>{animatedStats.users.toLocaleString()}</h3>
            <p style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.2rem', color: '#64748b', fontWeight: '600' }}>Active Students</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
              <TrendingUp size={16} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: '600' }}>+12% this month</span>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <MapPin size={32} style={{ marginBottom: '1rem', opacity: 0.9 }} />
            <h3 style={{ fontSize: '3rem', fontWeight: '900', margin: 0, marginBottom: '0.5rem' }}>{animatedStats.trips.toLocaleString()}</h3>
            <p style={{ opacity: 0.9, margin: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Trips Planned</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} />
              <span style={{ fontSize: '0.9rem' }}>+18% more adventures</span>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <DollarSign size={32} style={{ marginBottom: '1rem', opacity: 0.9 }} />
            <h3 style={{ fontSize: '3rem', fontWeight: '900', margin: 0, marginBottom: '0.5rem' }}>₹{(animatedStats.savings / 10000000).toFixed(1)}Cr</h3>
            <p style={{ opacity: 0.9, margin: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Student Savings</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} />
              <span style={{ fontSize: '0.9rem' }}>+25% money saved</span>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <Star size={32} style={{ marginBottom: '1rem', opacity: 0.9 }} />
            <h3 style={{ fontSize: '3rem', fontWeight: '900', margin: 0, marginBottom: '0.5rem' }}>{animatedStats.rating.toFixed(1)}★</h3>
            <p style={{ opacity: 0.9, margin: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>User Rating</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} />
              <span style={{ fontSize: '0.9rem' }}>+0.3 improvement</span>
            </div>
          </div>

        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Popular Destinations */}
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '0.75rem', borderRadius: '12px', color: 'white' }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Top Student Destinations</h3>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { name: 'Goa', visits: 2847, percentage: 85, emoji: '🏖️', growth: '+15%' },
                { name: 'Manali', visits: 2134, percentage: 70, emoji: '🏔️', growth: '+22%' },
                { name: 'Rishikesh', visits: 1923, percentage: 65, emoji: '🦚', growth: '+18%' },
                { name: 'Udaipur', visits: 1654, percentage: 55, emoji: '🏰', growth: '+12%' },
                { name: 'Jaipur', visits: 1432, percentage: 48, emoji: '🕌', growth: '+8%' }
              ].map((dest, index) => (
                <div key={index} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{dest.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '1.1rem' }}>{dest.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>{dest.growth}</span>
                          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{dest.visits.toLocaleString()} visits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#e2e8f0', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ 
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
                      height: '100%', 
                      borderRadius: '8px', 
                      width: `${dest.percentage}%`,
                      transition: 'width 1s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Modes */}
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '0.75rem', borderRadius: '12px', color: 'white' }}>
                <Plane size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Preferred Travel Modes</h3>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { mode: 'Bus', percentage: 45, icon: Bus, color: '#3b82f6', count: '4,020' },
                { mode: 'Train', percentage: 30, icon: Train, color: '#8b5cf6', count: '2,680' },
                { mode: 'Flight', percentage: 15, icon: Plane, color: '#f59e0b', count: '1,340' },
                { mode: 'Car/Cab', percentage: 10, icon: Car, color: '#ef4444', count: '894' }
              ].map((travel, index) => {
                const IconComponent = travel.icon;
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: travel.color, padding: '0.75rem', borderRadius: '10px', color: 'white' }}>
                      <IconComponent size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{travel.mode}</span>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{travel.count} trips</span>
                      </div>
                      <div style={{ background: '#f1f5f9', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                        <div style={{ 
                          background: travel.color, 
                          height: '100%', 
                          borderRadius: '8px', 
                          width: `${travel.percentage}%`,
                          transition: 'width 1s ease'
                        }}></div>
                      </div>
                    </div>
                    <span style={{ fontWeight: '600', color: travel.color, minWidth: '40px', textAlign: 'right' }}>{travel.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Monthly Trends */}
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '0.75rem', borderRadius: '12px', color: 'white' }}>
                <Calendar size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Monthly Growth</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                { month: 'Jan', trips: 1200, growth: '+5%' },
                { month: 'Feb', trips: 1450, growth: '+21%' },
                { month: 'Mar', trips: 1800, growth: '+24%' },
                { month: 'Apr', trips: 2100, growth: '+17%' },
                { month: 'May', trips: 2400, growth: '+14%' },
                { month: 'Jun', trips: 1900, growth: '-21%' }
              ].map((data, index) => (
                <div key={index} style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
                    {data.trips.toLocaleString()}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{data.month} 2024</div>
                  <div style={{ color: data.growth.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '0.8rem', fontWeight: '600' }}>
                    {data.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', padding: '0.75rem', borderRadius: '12px', color: 'white' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Platform Insights</h3>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { label: 'Avg Trip Duration', value: '4.2 days', icon: Clock, color: '#3b82f6' },
                { label: 'Most Booked Month', value: 'May 2024', icon: Calendar, color: '#8b5cf6' },
                { label: 'Avg Group Size', value: '2.8 people', icon: Users, color: '#10b981' },
                { label: 'Top Activity', value: 'Adventure', icon: Target, color: '#f59e0b' },
                { label: 'Repeat Customers', value: '68%', icon: Award, color: '#ef4444' }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                    <div style={{ background: stat.color, padding: '0.75rem', borderRadius: '10px', color: 'white' }}>
                      <IconComponent size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>{stat.label}</div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Current metric</div>
                    </div>
                    <div style={{ fontWeight: '700', color: stat.color, fontSize: '1.1rem' }}>{stat.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievement Banner */}
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', padding: '3rem', borderRadius: '24px', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)' }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <Award size={48} style={{ marginBottom: '1rem', color: '#fbbf24' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', margin: 0 }}>Empowering Student Adventures</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
              Our AI-powered platform has helped thousands of students explore India affordably and safely. Join the community of smart travelers!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fbbf24' }}>500+</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Cities Covered</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399' }}>24/7</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Support Available</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#60a5fa' }}>AI</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Powered Planning</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;