import { createContext, useContext, useState, useEffect } from 'react';
import { seasonThemes, seasonMapping } from '../data/produce-data';

const SeasonContext = createContext();

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
};

export const SeasonProvider = ({ children }) => {
  // Get current period based on today's date
  const getCurrentPeriod = () => {
    const now = new Date();
    return (now.getDate() < 16 ? 'Early ' : 'Late ') + 
           now.toLocaleDateString('en-US', { month: 'long' });
  };

  const [selectedPeriod, setSelectedPeriod] = useState(() => {
    // Try to get from sessionStorage, otherwise use current period
    return sessionStorage.getItem('selectedPeriod') || getCurrentPeriod();
  });

  // Get season from period
  const getSeason = (period) => {
    return seasonMapping[period] || 'Summer';
  };

  // Apply theme to document root
  const applyTheme = (period) => {
    const season = getSeason(period);
    const theme = seasonThemes[season];
    
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.secondary);
    document.documentElement.style.setProperty('--color-background', theme.background);
    document.documentElement.style.setProperty('--color-text', theme.text);
    
    // Add transition class to body for smooth transitions
    document.body.className = season.toLowerCase();
  };

  // Update theme when period changes
  useEffect(() => {
    applyTheme(selectedPeriod);
    sessionStorage.setItem('selectedPeriod', selectedPeriod);
  }, [selectedPeriod]);

  // Apply theme on mount
  useEffect(() => {
    applyTheme(selectedPeriod);
  }, []);

  const value = {
    selectedPeriod,
    setSelectedPeriod,
    getCurrentPeriod,
    getSeason,
    currentSeason: getSeason(selectedPeriod)
  };

  return (
    <SeasonContext.Provider value={value}>
      {children}
    </SeasonContext.Provider>
  );
};

