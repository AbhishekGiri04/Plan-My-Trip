import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr 1fr 1fr', 
            gap: '3rem',
            alignItems: 'flex-start',
            padding: '2rem 0'
          }}>
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="brand-header">
                <div className="brand-logo">
                  <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/09/travel-logo-design.jpg" alt="Plan My Trip Logo" className="footer-logo" />
                  <div className="brand-text">
                    <h3>Plan My Trip</h3>
                    <p>Smart Budget Travel Planner for Students</p>
                  </div>
                </div>
              </div>
              <p className="brand-description">
                Empowering students with AI-driven travel planning, intelligent budget optimization, real-time weather insights, and personalized itineraries for unforgettable adventures within budget.
              </p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/abhishek-giri04/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <Linkedin size={22} />
                </a>
                <a href="https://github.com/abhishekgiri04" target="_blank" rel="noopener noreferrer" className="social-link github">
                  <Github size={22} />
                </a>
                <a href="https://t.me/AbhishekGiri7" target="_blank" rel="noopener noreferrer" className="social-link telegram">
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/plan">Plan Trip</Link></li>
                <li><Link to="/destinations">Destinations</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Features */}
            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li><Link to="/features">AI Planning</Link></li>
                <li><Link to="/features">Budget Tools</Link></li>
                <li><Link to="/features">Weather Info</Link></li>
                <li><Link to="/features">Safety Tips</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><Link to="/contact">Help Center</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="bottom-content">
            <div className="copyright">
              <p>© 2025 Plan My Trip. Empowering student adventures worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;