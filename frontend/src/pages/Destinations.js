import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, DollarSign, Users, Search, Filter } from 'lucide-react';
import { getPopularDestinations } from '../services/api';

const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [budgetRange, setBudgetRange] = useState('all');

  const destinationsData = [
    {
      id: 1,
      name: 'Goa',
      category: 'beach',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVZJg-fjIIoosAyOj9NEdTChs71XG29_Kpzw&s',
      rating: 4.8,
      cost: 8000,
      bestTime: 'Nov-Feb',
      description: 'Perfect beaches, vibrant nightlife, and budget-friendly stays for students.',
      highlights: ['Beaches', 'Nightlife', 'Water Sports'],
      duration: '3-5 days'
    },
    {
      id: 2,
      name: 'Manali',
      category: 'adventure',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2f4bGKdMSGrNDWyLioPEHsrGF1aqC26FulQ&s',
      rating: 4.7,
      cost: 12000,
      bestTime: 'May-Oct',
      description: 'Adventure sports, scenic mountains, and affordable hostels in Himachal.',
      highlights: ['Trekking', 'Paragliding', 'Snow Activities'],
      duration: '4-6 days'
    },
    {
      id: 3,
      name: 'Rishikesh',
      category: 'nature',
      image: 'https://etripto.in/uploads/0000/1/2025/06/09/rishikesh-tour.jpeg',
      rating: 4.6,
      cost: 6000,
      bestTime: 'Sep-Nov',
      description: 'Yoga capital with river rafting and spiritual experiences on a budget.',
      highlights: ['River Rafting', 'Yoga', 'Temples'],
      duration: '3-4 days'
    },
    {
      id: 4,
      name: 'Udaipur',
      category: 'heritage',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/77/ea/4b/royalty-meets-fairy-tale.jpg?w=900&h=500&s=1',
      rating: 4.9,
      cost: 15000,
      bestTime: 'Oct-Mar',
      description: 'City of lakes with magnificent palaces and rich Rajasthani heritage.',
      highlights: ['Palaces', 'Lakes', 'Architecture'],
      duration: '3-4 days'
    },
    {
      id: 5,
      name: 'Varanasi',
      category: 'religious',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Varanasi_on_sunset.jpg',
      rating: 4.3,
      cost: 5000,
      bestTime: 'Oct-Mar',
      description: 'Ancient spiritual city with ghats, temples, and cultural immersion.',
      highlights: ['Ghats', 'Temples', 'Spirituality'],
      duration: '2-3 days'
    },
    {
      id: 6,
      name: 'Spiti Valley',
      category: 'adventure',
      image: 'https://www.tripstorz.com/assets/images/ogImage/key-monastery-in-spiti-valley-during-winter.jpg',
      rating: 4.8,
      cost: 18000,
      bestTime: 'Jun-Sep',
      description: 'High-altitude desert with monasteries and breathtaking landscapes.',
      highlights: ['Monasteries', 'High Altitude', 'Landscapes'],
      duration: '7-10 days'
    },
    {
      id: 7,
      name: 'Munnar',
      category: 'nature',
      image: 'https://luxeglamp.com/wp-content/uploads/2025/07/image-1024x576.png',
      rating: 4.5,
      cost: 9000,
      bestTime: 'Sep-Mar',
      description: 'Tea plantations, misty hills, and cool climate in Kerala hills.',
      highlights: ['Tea Gardens', 'Hill Station', 'Wildlife'],
      duration: '3-4 days'
    },
    {
      id: 8,
      name: 'Amritsar',
      category: 'religious',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoC-cO7hBWbixlpc2Mj3QBP_2B58i0hdlJ2Q&s',
      rating: 4.4,
      cost: 7000,
      bestTime: 'Oct-Mar',
      description: 'Golden Temple, rich Sikh heritage, and delicious Punjabi cuisine.',
      highlights: ['Golden Temple', 'History', 'Food'],
      duration: '2-3 days'
    },
    {
      id: 9,
      name: 'Jaipur',
      category: 'heritage',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7tzd1QLqe2rshbE-gbAN7i1zs4d1BtDlJA&s',
      rating: 4.6,
      cost: 10000,
      bestTime: 'Oct-Mar',
      description: 'Pink city with royal palaces, vibrant markets, and Rajasthani culture.',
      highlights: ['Palaces', 'Forts', 'Markets'],
      duration: '3-4 days'
    },
    {
      id: 10,
      name: 'Andaman Islands',
      category: 'beach',
      image: 'https://deih43ym53wif.cloudfront.net/large_elephant-walking-on-beach-andaman-islands-india-shutterstock_774152350.jpg_ebe87e3377.jpg',
      rating: 4.7,
      cost: 25000,
      bestTime: 'Oct-May',
      description: 'Pristine beaches, crystal clear waters, and amazing marine life.',
      highlights: ['Beaches', 'Scuba Diving', 'Marine Life'],
      duration: '5-7 days'
    }
  ];

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true);
        // Use static destination data for consistent experience
        setDestinations(destinationsData);
        setFilteredDestinations(destinationsData);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  useEffect(() => {
    let filtered = destinations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dest =>
        dest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.Destination?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dest =>
        dest.category === selectedCategory || dest.Category === selectedCategory
      );
    }

    // Filter by budget
    if (budgetRange !== 'all') {
      filtered = filtered.filter(dest => {
        const cost = dest.cost || dest.Cost_Level || 0;
        switch (budgetRange) {
          case 'low': return cost < 7000;
          case 'medium': return cost >= 7000 && cost <= 10000;
          case 'high': return cost > 10000;
          default: return true;
        }
      });
    }

    setFilteredDestinations(filtered);
  }, [searchTerm, selectedCategory, budgetRange, destinations]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'beach', label: 'Beach' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'nature', label: 'Nature' },
    { value: 'heritage', label: 'Heritage' },
    { value: 'religious', label: 'Religious' }
  ];

  const budgetRanges = [
    { value: 'all', label: 'All Budgets' },
    { value: 'low', label: 'Under ₹7,000' },
    { value: 'medium', label: '₹7,000 - ₹10,000' },
    { value: 'high', label: 'Above ₹10,000' }
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '120px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: '3px solid #e2e8f0', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', paddingTop: '120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>
            Student Destinations
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Discover amazing destinations perfect for student travelers with budget-friendly options and unforgettable experiences
          </p>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', alignItems: 'end' }}>
            {/* Search */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Search Destinations
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'white'
                }}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Budget Range
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'white'
                }}
              >
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Found {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Destinations Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {filteredDestinations.map((destination, index) => {
            const name = destination.name || destination.Destination;
            const category = destination.category || destination.Category;
            const cost = destination.cost || destination.Cost_Level;
            const bestTime = destination.bestTime || destination.Best_Time;
            
            return (
              <div
                key={destination.id || index}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
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
                {/* Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={destination.image || `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop`}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {category || 'Travel'}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.3))'
                  }}></div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                      {name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                      <span style={{ fontWeight: '600', color: '#374151' }}>{destination.rating || 4.5}</span>
                    </div>
                  </div>

                  <p style={{ color: '#64748b', marginBottom: '1rem', lineHeight: '1.5', fontSize: '0.95rem' }}>
                    {destination.description || destination.Description || 'Amazing destination perfect for student travelers with great experiences.'}
                  </p>

                  {/* Price and Duration */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>₹{cost?.toLocaleString() || '8,000'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>per person</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>{destination.duration || '3-4 days'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>duration</div>
                    </div>
                  </div>

                  {/* Best Time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Calendar size={16} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '0.9rem', color: '#374151' }}>Best time: {bestTime || 'Oct-Mar'}</span>
                  </div>

                  {/* Highlights */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {(destination.highlights || ['Culture', 'Adventure', 'Nature']).slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#eff6ff',
                            color: '#1d4ed8',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    onClick={() => navigate(`/plan?destination=${encodeURIComponent(name)}`)}
                  >
                    Plan Trip to {name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDestinations.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <MapPin size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No destinations found</h3>
            <p>Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;