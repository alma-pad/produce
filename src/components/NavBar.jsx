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
    closeMobileNav();
    navigate('/');
  };

  const handleLinkClick = () => {
    closeMobileNav();
  };

  const toggleMobileNav = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const closeMobileNav = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
    let resizeObserver = null;
    let timeoutId = null;
    let observedNav = null;

    const getActiveNav = () => {
      const isMobile = window.innerWidth <= 767;
      return isMobile
        ? document.querySelector('.nav-container-mobile')
        : document.querySelector('.nav-container');
    };

    const updateScallopStickyTop = () => {
      const isMobile = window.innerWidth <= 767;
      const nav = getActiveNav();
      if (!nav) return;

      const navStickyTop = isMobile ? 5 : 10;
      document.documentElement.style.setProperty(
        '--scallop-sticky-top',
        `${navStickyTop + nav.offsetHeight}px`
      );

      document.querySelectorAll('.scallop-container').forEach((el) => {
        el.classList.remove('frozen');
        el.style.top = '';
      });
    };

    const setup = () => {
      const nav = getActiveNav();
      if (!nav) {
        timeoutId = setTimeout(setup, 100);
        return;
      }

      if (observedNav !== nav) {
        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(updateScallopStickyTop);
        resizeObserver.observe(nav);
        observedNav = nav;
      }

      updateScallopStickyTop();
    };

    const handleResize = () => {
      observedNav = null;
      setup();
    };

    timeoutId = setTimeout(setup, 100);
    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [location]);

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

