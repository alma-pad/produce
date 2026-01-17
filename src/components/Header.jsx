import { useState, useEffect } from 'react';
import { useSeason } from '../contexts/SeasonContext';
import '../styles/Header.css';

const Header = ({ title, subtitle, showDate = false, showDropdown = false, children }) => {
  const { selectedPeriod, setSelectedPeriod, getCurrentPeriod } = useSeason();

  const periods = [
    'Early January', 'Late January',
    'Early February', 'Late February',
    'Early March', 'Late March',
    'Early April', 'Late April',
    'Early May', 'Late May',
    'Early June', 'Late June',
    'Early July', 'Late July',
    'Early August', 'Late August',
    'Early September', 'Late September',
    'Early October', 'Late October',
    'Early November', 'Late November',
    'Early December', 'Late December'
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setIsDropdownOpen(false);
  };

  const handleDateClick = (e) => {
    e.preventDefault();
    const currentPeriod = getCurrentPeriod();
    setSelectedPeriod(currentPeriod);
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className={showDropdown ? 'header' : 'header-details'}>
      {title && (
        <div className="header-content">
          <div className="header-container">
            <h1 id="header-title">{title}</h1>
            {subtitle && <h2 id="header-title-h2">{subtitle}</h2>}
            {showDate && (
              <h2 id="datetime">
                <a href="#" className="date-link" onClick={handleDateClick}>
                  Today's date: {formatDate()}
                </a>
              </h2>
            )}
            {showDropdown && (
              <div className="dropdown-container">
                <div className="dropdown">
                  <div
                    className={`select ${isDropdownOpen ? 'select-clicked' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="selected">{selectedPeriod}</span>
                    <div className={`caret ${isDropdownOpen ? 'caret-rotate' : ''}`} />
                  </div>
                  <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    {periods.map((period) => (
                      <li
                        key={period}
                        className={period === selectedPeriod ? 'active' : ''}
                        onClick={() => handlePeriodSelect(period)}
                      >
                        {period}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

