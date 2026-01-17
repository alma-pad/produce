import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../contexts/SeasonContext';
import { produceData } from '../data/produce-data';
import Header from '../components/Header';
import '../styles/AllItems.css';

const AllItems = () => {
  const { selectedPeriod } = useSeason();
  const [activeFilter, setActiveFilter] = useState(() => {
    return sessionStorage.getItem('selectedFilter') || 'all';
  });
  const navigate = useNavigate();

  const filteredCards = useMemo(() => {
    const cards = Object.entries(produceData).map(([key, item]) => ({
      key,
      ...item,
      activeperiods: item.activeperiods.split(',')
    }));

    return cards.filter((card) => {
      // Only category filter (no period filter on all-items page)
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

      return matchesFilter;
    });
  }, [activeFilter]);

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
      <Header title="What's in Season?" subtitle="All Produce Items" />
      
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
        <div className="container scallop" id="container-all-items">
          {filteredCards.map((card) => (
            <div
              key={card.key}
              className="card"
              id="all-items"
              onClick={() => handleCardClick(card.key)}
            >
              <img src={card.image} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllItems;

