import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSeason } from '../contexts/SeasonContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setSelectedPeriod, getCurrentPeriod } = useSeason();

  const currentPath = location.pathname;

  const handleHomeClick = (e) => {
    e.preventDefault();
    const currentPeriod = getCurrentPeriod();
    setSelectedPeriod(currentPeriod);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileNav = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileNav = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMobileNav();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const nav = document.querySelector('.nav-container');
    const navMobile = document.querySelector('.nav-container-mobile');
    const header = document.querySelector('.header') || document.querySelector('.header-details');

    if (!header) return;

    const handleScroll = () => {
      const headerBottom = header.getBoundingClientRect().bottom;
      
      if (!nav && !navMobile) return;
      
      // Get nav bar's bottom position directly from getBoundingClientRect
      // This gives us the actual bottom edge of the nav bar container
      const navRect = nav?.getBoundingClientRect();
      const navBottom = navRect?.bottom;
      
      const navMobileRect = navMobile?.getBoundingClientRect();
      const navMobileBottom = navMobileRect?.bottom;
      
      // Show scallop when header's bottom reaches nav bar's bottom
      // This freezes the scallop at the bottom of the nav bar
      if (navBottom !== undefined) {
        if (headerBottom <= navBottom) {
          nav?.classList.add('scalloped-bottom');
        } else {
          nav?.classList.remove('scalloped-bottom');
        }
      }
      
      if (navMobileBottom !== undefined) {
        if (headerBottom <= navMobileBottom) {
          navMobile?.classList.add('scalloped-bottom');
        } else {
          navMobile?.classList.remove('scalloped-bottom');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Nav */}
      <div className="nav-container-mobile">
        <div className="mobile-nav-bar">
          <button className="mobile-menu-toggle" onClick={toggleMobileNav}>
            ☰
          </button>
          <h1 id="header-title-mobile">What's in Season?</h1>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="nav-container">
        <div className="nav">
          <div className="nav-left">
            <img src="/images/favicon.png" alt="Logo" id="favicon" />
            <h3>
              <Link to="/" className="home-link" onClick={handleHomeClick}>
                Home
              </Link>
            </h3>
          </div>
          <h3>
            <Link to="/all-items" className={currentPath === '/all-items' ? 'nav-active' : ''}>
              All Items
            </Link>
          </h3>
          <h3>
            <Link to="/about" className={currentPath === '/about' ? 'nav-active' : ''}>
              About
            </Link>
          </h3>
          <h3>
            <Link to="/mission" className={currentPath === '/mission' ? 'nav-active' : ''}>
              Mission
            </Link>
          </h3>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileNav}
      />

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <button className="mobile-nav-close" onClick={closeMobileNav}>
          ×
        </button>
        <div className="mobile-nav-links">
          <div className="nav-left">
            <img src="/images/favicon.png" alt="Logo" id="favicon" />
            <h2>
              <Link to="/" className="delayed-nav home-link" onClick={handleHomeClick}>
                Home
              </Link>
            </h2>
          </div>
          <h2>
            <Link to="/all-items" className="delayed-nav" onClick={handleLinkClick}>
              All Items
            </Link>
          </h2>
          <h2>
            <Link to="/about" className="delayed-nav" onClick={handleLinkClick}>
              About
            </Link>
          </h2>
          <h2>
            <Link to="/mission" className="delayed-nav" onClick={handleLinkClick}>
              Mission
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default NavBar;

