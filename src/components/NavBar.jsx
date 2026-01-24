import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSeason } from '../contexts/SeasonContext';
import { getImagePath } from '../utils/imagePath';
import '../styles/NavBar.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedPeriod, getCurrentPeriod } = useSeason();

  const currentPath = location.pathname;

  const handleHomeClick = (e) => {
    e.preventDefault();
    const currentPeriod = getCurrentPeriod();
    setSelectedPeriod(currentPeriod);
    setIsMobileMenuOpen(false);
    navigate('/');
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
    let scrollHandler = null;
    let timeoutId = null;

    // Wait a bit for Header to render, then set up scroll handler
    const setupScrollHandler = () => {
      const nav = document.querySelector('.nav-container');
      const navMobile = document.querySelector('.nav-container-mobile');
      const scallopContainer = document.querySelector('.scallop-container');

      if (!scallopContainer) {
        // If scallop-container doesn't exist yet, try again after a short delay
        timeoutId = setTimeout(setupScrollHandler, 100);
        return;
      }

      const handleScroll = () => {
        // Re-query elements in case they were re-rendered
        const currentNav = document.querySelector('.nav-container');
        const currentNavMobile = document.querySelector('.nav-container-mobile');
        const currentScallopContainer = document.querySelector('.scallop-container');
        
        if (!currentScallopContainer) return;
        
        // Get positions
        const navRect = currentNav?.getBoundingClientRect();
        const navMobileRect = currentNavMobile?.getBoundingClientRect();
        const scallopRect = currentScallopContainer.getBoundingClientRect();
        
        // Determine if we're on mobile
        const isMobile = window.innerWidth <= 767;
        
        // Use desktop nav if available, otherwise mobile nav
        const activeNav = isMobile ? currentNavMobile : currentNav;
        const activeNavRect = isMobile ? navMobileRect : navRect;
        
        if (!activeNavRect) return;
        
        // Get the actual bottom position of the nav in the viewport
        // When sticky, getBoundingClientRect() gives us the actual viewport position
        const navBottom = activeNavRect.bottom;
        const scallopTop = scallopRect.top;
        
        // Freeze when the top of scallop-container reaches the bottom of nav-container
        if (scallopTop <= navBottom) {
          currentScallopContainer.classList.add('frozen');
          // Set the top position to be right below the nav-container
          // Use the actual bottom position from getBoundingClientRect()
          currentScallopContainer.style.top = `${navBottom}px`;
        } else {
          currentScallopContainer.classList.remove('frozen');
          currentScallopContainer.style.top = '';
        }
      };

      scrollHandler = handleScroll;
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check on mount
    };

    // Set up handler after a short delay to ensure Header is rendered
    timeoutId = setTimeout(setupScrollHandler, 100);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [location]); // Re-run when route changes

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
          <div className="nav-left" onClick={handleHomeClick}>
            <img src={getImagePath("/images/favicon.png")} alt="Logo" id="favicon" />
            <h3>
              <span className="home-link">Home</span>
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
          <div className="nav-left" onClick={handleHomeClick}>
            <img src={getImagePath("/images/favicon.png")} alt="Logo" id="favicon" />
            <h2>
              <span className="delayed-nav home-link">Home</span>
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

