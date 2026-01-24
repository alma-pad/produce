import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../contexts/SeasonContext';
import { produceData } from '../data/produce-data';
import Header from '../components/Header';
import { getImagePath } from '../utils/imagePath';
import '../styles/Home.css';

const Home = () => {
  const { selectedPeriod } = useSeason();
  const [activeFilter, setActiveFilter] = useState(() => {
    return sessionStorage.getItem('selectedFilter') || 'all';
  });
  const navigate = useNavigate();


  const filteredCards = useMemo(() => {
    const cards = Object.entries(produceData).map(([key, item]) => ({
      key,
      ...item,
      activeperiods: item.activeperiods.split(',').map(p => p.trim())
    }));

    return cards.filter((card) => {
      // Period filter - trim selectedPeriod for comparison
      const matchesPeriod = card.activeperiods.includes(selectedPeriod.trim());

      // Category filter
      let matchesFilter = false;
      if (activeFilter === 'all') {
        matchesFilter = true;
      } else if (activeFilter === 'fruits' && card.classification === 'fruit') {
        matchesFilter = true;
      } else if (activeFilter === 'vegetables' && card.classification === 'vegetable') {
        matchesFilter = true;
      } else if (activeFilter === 'nuts' && card.classification === 'nut') {
        matchesFilter = true;
      } else if (activeFilter === 'yearRound' && card.activeperiods.length >= 24) {
        matchesFilter = true;
      }

      return matchesPeriod && matchesFilter;
    });
  }, [selectedPeriod, activeFilter]);

  const handleFilterClick = (filterType) => {
    if (activeFilter === filterType) {
      setActiveFilter('all');
      sessionStorage.removeItem('selectedFilter');
    } else {
      setActiveFilter(filterType);
      sessionStorage.setItem('selectedFilter', filterType);
    }
  };

  const handleCardClick = (produceKey) => {
    navigate(`/produce/${produceKey}`);
  };

  useEffect(() => {
    // Trigger fade-in animation after content is loaded
    setTimeout(() => {
      const containerWrapper = document.querySelector('.container-wrapper');
      if (containerWrapper) {
        containerWrapper.classList.add('fade-in');
      }
    }, 100);
  }, [filteredCards]);

  return (
    <>
      <Header
        title="What's in Season?"
        showDate={true}
        showDropdown={true}
      />
      
      <div className="button-wrapper">
        <div className="button-container">
          <button
            className={`filter-button ${activeFilter === 'all' ? 'button-active' : ''}`}
            onClick={() => handleFilterClick('all')}
            data-filter="all"
          >
            All
          </button>
          <button
            className={`filter-button ${activeFilter === 'fruits' ? 'button-active' : ''}`}
            onClick={() => handleFilterClick('fruits')}
            data-filter="fruits"
          >
            Fruits
          </button>
          <button
            className={`filter-button ${activeFilter === 'vegetables' ? 'button-active' : ''}`}
            onClick={() => handleFilterClick('vegetables')}
            data-filter="vegetables"
          >
            Vegetables
          </button>
          <button
            className={`filter-button ${activeFilter === 'nuts' ? 'button-active' : ''}`}
            onClick={() => handleFilterClick('nuts')}
            data-filter="nuts"
          >
            Nuts
          </button>
          <button
            className={`filter-button ${activeFilter === 'yearRound' ? 'button-active' : ''}`}
            onClick={() => handleFilterClick('yearRound')}
            data-filter="yearRound"
          >
            Year Round
          </button>
        </div>
      </div>

      <div className="container-wrapper fade-in">
        {filteredCards.length > 0 ? (
          <div className="container scallop" id="cards-container">
            {filteredCards.map((card) => (
              <div
                key={card.key}
                className="card"
                onClick={() => handleCardClick(card.key)}
              >
                <img src={card.image} alt={card.name} />
                <p>{card.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="container-empty-state">
            <div className="empty-state" id="empty-state">
              <img
                src={getImagePath("/images/empty_state.png")}
                alt="No items found"
                className="empty-state-image"
              />
              <p className="empty-state-text">No items to show</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

