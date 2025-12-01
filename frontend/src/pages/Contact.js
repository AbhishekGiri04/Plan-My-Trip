import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users, Star, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create email content
    const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ACategory: ${categories.find(c => c.value === formData.category)?.label}%0D%0ASubject: ${formData.subject}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    
    // Open email client
    window.open(`mailto:abhishekgiri1978@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${emailBody}`);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 1000);
  };

  const handleEmailClick = () => {
    window.open('mailto:abhishekgiri1978@gmail.com?subject=Travel Planning Inquiry');
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/abhishekgiri04', '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'abhishekgiri1978@gmail.com',
      description: 'Get in touch for any queries or support',
      color: '#3b82f6'
    },
    {
      icon: MessageCircle,
      title: 'Telegram',
      details: 'Abhishek Giri',
      description: 'Quick support via Telegram',
      color: '#10b981'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Haridwar, Uttarakhand, India',
      description: 'Available for collaboration',
      color: '#f59e0b'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'partnership', label: 'Partnership Opportunities' }
  ];

  const faqs = [
    {
      question: 'How accurate are the AI-generated itineraries?',
      answer: 'Our AI has a 95% accuracy rate based on user feedback. It considers real-time data, weather, local events, and student preferences to create personalized itineraries.'
    },
    {
      question: 'Is the service really free for students?',
      answer: 'Yes! Our core AI itinerary generation is completely free for students. We only charge for premium features like advanced customization and booking services.'
    },
    {
      question: 'How do you ensure budget accuracy?',
      answer: 'We use machine learning models trained on thousands of student travel data points, combined with real-time pricing from our partner APIs to provide accurate budget estimates.'
    },
    {
      question: 'Can I modify the generated itinerary?',
      answer: 'Absolutely! You can customize any part of your itinerary, and our AI will automatically adjust the rest of the plan to maintain budget and time constraints.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Students', icon: Users, color: '#3b82f6' },
    { number: '4.8★', label: 'Average Rating', icon: Star, color: '#f59e0b' },
    { number: '24/7', label: 'Support Available', icon: Clock, color: '#10b981' },
    { number: '500+', label: 'Destinations Covered', icon: MapPin, color: '#ef4444' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', paddingTop: '120px' }}>
      {/* Hero Section */}
      <section style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
            Have questions about AI travel planning? Need help with your itinerary? We're here to help you plan the perfect student trip!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
                    padding: '2rem',
                    borderRadius: '20px',
                    textAlign: 'center',
                    boxShadow: `0 10px 40px ${stat.color}20`,
                    border: `2px solid ${stat.color}30`
                  }}
                >
                  <IconComponent size={32} style={{ color: stat.color, margin: '0 auto 1rem' }} />
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: stat.color, marginBottom: '0.5rem' }}>
                    {stat.number}
                  </div>
                  <div style={{ color: '#64748b', fontWeight: '600' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Contact Form */}
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
              Send us a Message
            </h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981', marginBottom: '0.5rem' }}>
                  Email Client Opened!
                </h3>
                <p style={{ color: '#64748b' }}>
                  Your email client should have opened with the message. Please send it to complete your inquiry.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.5rem',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
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
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
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

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
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

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{ width: '20px', height: '20px', border: '2px solid #ffffff40', borderTop: '2px solid #ffffff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                      Opening Email...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & FAQs */}
          <div>
            {/* Contact Information */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem' }}>
                Contact Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const isClickable = info.title === 'Email Us' || info.title === 'Telegram';
                  const handleClick = info.title === 'Email Us' ? handleEmailClick : info.title === 'Telegram' ? handleTelegramClick : null;
                  
                  return (
                    <div
                      key={index}
                      onClick={handleClick}
                      style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: isClickable ? 'pointer' : 'default',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (isClickable) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isClickable) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                        }
                      }}
                    >
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: `${info.color}20`,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent size={24} style={{ color: info.color }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                          {info.title}
                        </h3>
                        <p style={{ fontSize: '1rem', fontWeight: '600', color: info.color, margin: '0.25rem 0' }}>
                          {info.details}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '16px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                      {faq.question}
                    </h3>
                    <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Support Section */}
      <section style={{ padding: '4rem 2rem', marginTop: '4rem', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <MessageCircle size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Need Immediate Help?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join our student community on Discord for instant support and travel tips from fellow students
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/abhishekgiri04"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '1rem 2rem',
                background: 'white',
                color: '#3b82f6',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              GitHub Profile
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-giri04/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '1rem 2rem',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                textDecoration: 'none',
                border: '2px solid white',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;