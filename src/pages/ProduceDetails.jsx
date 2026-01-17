import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSeason } from '../contexts/SeasonContext';
import { produceData } from '../data/produce-data';
import Header from '../components/Header';
import '../styles/ProduceDetails.css';

const ProduceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedPeriod, getCurrentPeriod } = useSeason();

  const produce = produceData[id];

  useEffect(() => {
    if (!produce) {
      navigate('/');
      return;
    }

    // Determine peak season for this produce item
    const determinePeakSeason = (activeperiodsStr) => {
      const periods = activeperiodsStr.split(',').map(period => period.trim());
      const now = new Date();
      const activePeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') + 
                           now.toLocaleDateString('en-US', { month: 'long' });

      if (periods.length === 24) {
        return activePeriod;
      } else {
        const middleIndex = Math.floor(periods.length / 2) - 1;
        return periods[middleIndex];
      }
    };

    // Apply the produce item's peak season theme
    const peakSeason = determinePeakSeason(produce.activeperiods);
    setSelectedPeriod(peakSeason);
  }, [id, produce, setSelectedPeriod, navigate]);

  if (!produce) {
    return null;
  }

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
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
    // Trigger fade-in animation after content is loaded
    setTimeout(() => {
      const produceContent = document.querySelector('.produce-content');
      if (produceContent) {
        produceContent.classList.add('fade-in');
      }
    }, 100);
  }, [produce]);

  return (
    <>
      <Header title="What's in Season?" showDate={true}>
        <nav>
          <a href="#" className="back-button" onClick={handleBackClick}>
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
        </nav>
      </Header>

      <div className="produce-content fade-in">
        <div className="produce-card">
          <div className="produce-image">
            <img id="produce-img" src={produce.image} alt={produce.name} />
            <h2 id="produce-title">{produce.name}</h2>
          </div>
        </div>
        <div className="produce-info">
          {produce.season && (
            <div className="info-section">
              <h3>Season</h3>
              <p id="produce-season">{produce.season}</p>
            </div>
          )}

          {produce.benefits && (
            <div className="info-section">
              <h3>Benefits</h3>
              <p id="produce-benefits">{produce.benefits}</p>
            </div>
          )}

          {produce.recipes && produce.recipes.length > 0 && (
            <div className="info-section">
              <h3>Recipe Suggestions</h3>
              <ul className="recipe-list">
                {produce.recipes.map((recipe, index) => (
                  <li key={index}>{recipe}</li>
                ))}
              </ul>
            </div>
          )}

          {produce.notes && (
            <div className="info-section">
              <h3>Notes</h3>
              <p id="produce-notes">
                {Array.isArray(produce.notes) ? produce.notes.join(' ') : produce.notes}
              </p>
            </div>
          )}

          {produce.joke && (
            <div className="info-section">
              <h3>Pick Up Line</h3>
              <p id="produce-joke">{produce.joke}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProduceDetails;

