import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const HOME_PATH = '/';

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = sessionStorage.getItem('previousPath');
    
    // Save scroll position continuously when on home page
    const saveHomeScrollPosition = () => {
      if (currentPath === HOME_PATH) {
        const scrollPosition = window.scrollY || window.pageYOffset;
        sessionStorage.setItem('homeScrollPosition', scrollPosition.toString());
      }
    };
    
    // Set up scroll listener for home page
    if (currentPath === HOME_PATH) {
      window.addEventListener('scroll', saveHomeScrollPosition);
    }
    
    // Restore scroll position when returning to home page
    if (currentPath === HOME_PATH && previousPath && previousPath !== HOME_PATH) {
      const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
      if (savedScrollPosition) {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition, 10));
        }, 100);
      } else {
        // If no saved position, scroll to top
        window.scrollTo(0, 0);
      }
    } 
    // Scroll to top for all other pages (All Items, About, Mission, Produce Details)
    else if (currentPath !== HOME_PATH) {
      window.scrollTo(0, 0);
    }
    
    // Update previous path
    sessionStorage.setItem('previousPath', currentPath);
    
    // Cleanup scroll listener
    return () => {
      if (currentPath === HOME_PATH) {
        window.removeEventListener('scroll', saveHomeScrollPosition);
      }
    };
  }, [location]);

  return null;
};

export default ScrollToTop;

