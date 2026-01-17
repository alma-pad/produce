import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="small">
            Seasonal Produce is created for Northern California. Not all items shown are local to Northern California.
          </p>
          <p className="small">
            Seasonality and selection are determined using an imprecise science. They are based on Alma's experience and opinions and subject to unpredictable events like weather, supply chain, etc.
          </p>
          <p className="small">
            This website can act as an approximate guide for produce seasonality for other places in the continental U.S. Please use at your own discretion.
          </p>
          <p className="small">Copyright © 2026, Made by Alma</p>
        </div>
        <div className="footer-right">
          <p className="small">Resources:</p>
          <p className="small-link">
            <a href="https://www.seasonalfoodguide.org/" target="_blank" rel="noopener noreferrer">
              Seasonal Food Guide
            </a>
          </p>
          <p className="small-link">
            <a
              href="https://www.sfenvironment.org/vegetables-fruits-in-season-bay-area"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bay Area Seasonal Fruit Guide
            </a>
          </p>
          <p className="small">Bay Area Farmers Markets:</p>
          <p className="small-link">
            <a
              href="https://www.sfenvironment.org/farmers-markets-in-sf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Farmers Markets in San Francisco
            </a>
          </p>
          <p className="small-link">
            <a
              href="https://sf.funcheap.com/city-guide/funcheaps-guide-farmers-markets/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Farmers Markets in the Bay Area
            </a>
          </p>
          <p className="small-link">
            <a
              href="https://edibleeastbay.com/east-bay-farmers-markets/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Farmers Markets in the East Bay
            </a>
          </p>
          <p className="small-link">
            <a
              href="https://www.thesanfranciscopeninsula.com/fresh-as-it-gets/buy-fresh/farmers-markets/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Farmers Markets on the Peninsula
            </a>
          </p>
          <p className="small-link">
            <a
              href="https://ag.santaclaracounty.gov/farmers-market/list-farmers-markets"
              target="_blank"
              rel="noopener noreferrer"
            >
              Farmers Markets in Santa Clara County
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

