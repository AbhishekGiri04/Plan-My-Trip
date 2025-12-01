import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PlanTrip from './pages/PlanTrip';
import Results from './pages/Results';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Analytics from './pages/Analytics';
import LoadingPage from './components/LoadingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import './assets/styles/Footer.css';
import './assets/styles/Navbar.css';
import './assets/styles/Global.css';

function AppContent() {
  const location = useLocation();
  const [hideFooterOnPlan, setHideFooterOnPlan] = useState(false);
  
  const hideFooter = location.pathname === '/results' || 
                    (location.pathname === '/plan' && hideFooterOnPlan);
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/plan" element={<PlanTrip setHideFooter={setHideFooterOnPlan} />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;