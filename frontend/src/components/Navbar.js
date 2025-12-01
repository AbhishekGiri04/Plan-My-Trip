import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${isScrolled ? 'active' : ''} ${!isVisible ? 'hidden' : ''}`}>
      <div className="header-top">
        <div className="container">
          <Link to="/home" className="logo">
            <div className="logo-content">
              <div className="logo-icon">
                <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/09/travel-logo-design.jpg" alt="Plan My Trip Logo" />
              </div>
              <div className="logo-text">
                <h2>Plan My Trip</h2>
              </div>
            </div>
          </Link>

          <div className="top-nav-links">
            <Link to="/home" className="navbar-link">Home</Link>
            <Link to="/about" className="navbar-link">About Us</Link>
            <Link to="/plan" className="navbar-link">Plan Trip</Link>
            <Link to="/destinations" className="navbar-link">Destinations</Link>
            <Link to="/features" className="navbar-link">Features</Link>
            <Link to="/analytics" className="navbar-link">Analytics</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
          </div>
          
          <div className="header-btn-group">

            <button 
              className="nav-open-btn" 
              aria-label="Open Menu" 
              onClick={() => setIsMenuOpen(true)}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>


    </header>
  );
};

export default Navbar;