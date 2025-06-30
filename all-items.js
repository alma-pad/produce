import { seasonThemes, seasonMapping, produceData } from "./produce-data.js";

document.addEventListener('DOMContentLoaded', function() {

  // Insert date and time into HTML for all pages
  var now = new Date(); 
  // test other dates
  //var now = new Date('2025-10-22');

  // Insert date and time into HTML
  var datetime = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Set up global back button for ALL pages
  document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the stored period from session storage
      const storedPeriod = sessionStorage.getItem('selectedPeriod');
      
      // If there's browser history, go back
      if (document.referrer && document.referrer.includes(window.location.hostname)) {
        window.history.back();
      } else {
        // Fallback to index.html if there's no history or came from external site
        window.location.href = 'index.html';
      }
    });
  });

  // touch screen tracking
  // adjust touch sensitivity here 
  let touchStartY = 0;
  let touchEndY = 0;
  const touchThreshold = 5; 

  // assign active state to list item based on month and day 
  var activePeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') + 
  now.toLocaleDateString('en-US', { month: 'long' });

  const options = document.querySelectorAll('.menu li');
  const cardsContainer = document.getElementById('container-all-items');

  cardsContainer.classList.add('container');
        
  // Clear any existing cards in the container
  cardsContainer.innerHTML = '';

  // Create cards dynamically based on produceData object directly
  for (const produceKey in produceData) {
    const produceItem = produceData[produceKey];
    
    // Create the card element
    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'all-items';
    
    // Use activeperiods directly from produceData
    card.dataset.activeperiod = produceItem.activeperiods;
    card.dataset.classification = produceItem.classification;
    
    // Create image element
    const img = document.createElement('img');
    
    // Use image path from produceData if available, otherwise fallback to conventional path
    if (produceItem.image) {
      img.src = produceItem.image;
    } else {
      img.src = `./images/${produceKey}.png`;
    }
    img.alt = produceItem.name;
    
    // Create text element
    const p = document.createElement('p');
    p.textContent = produceItem.name;
    
    // Add elements to card
    card.appendChild(img);
    card.appendChild(p);
    
    // Add click event listener
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      // Navigate to the produce detail page
      window.location.href = `produce-details.html?id=${produceKey}`;
    });
    
    // Add card to container
    cardsContainer.appendChild(card);
  }

  // Set up filter button functionality
  setupFilterButtons();

  applySeasonTheme(activePeriod);

  // make datetime button
  if (document.getElementById("datetime")) {
    const month = now.getMonth() + 1;
    const day = now.getDate();
    let currentPeriod;
    
    // Determine period based on date
    if (day < 16) {
      currentPeriod = `Early ${now.toLocaleDateString('en-US', { month: 'long' })}`;
    } else {
      currentPeriod = `Late ${now.toLocaleDateString('en-US', { month: 'long' })}`;
    }

    document.getElementById("datetime").innerHTML = 
      `<a href="#" class="date-link" data-period="${currentPeriod}">Today's date: ${datetime}</a>`;
    
    // Add click event to store the period in sessionStorage and apply theme
    document.getElementById("datetime").querySelector('a').addEventListener('click', function(e) {
      e.preventDefault(); // Prevent the default anchor behavior
      const selectedPeriod = this.getAttribute('data-period');
      sessionStorage.setItem('selectedPeriod', selectedPeriod);
      
      // Apply the season theme when clicked
      applySeasonTheme(selectedPeriod);
      
      // Update dropdown selection if we're on a page with the dropdown
      const selected = document.querySelector('.selected');
      const options = document.querySelectorAll('.menu li');
      
      if (selected && options.length) {
        // Update the selected text
        selected.textContent = selectedPeriod;
        
        // Update the active class on menu items
        options.forEach(option => {
          option.classList.remove('active');
          if (option.textContent.trim() === selectedPeriod) {
            option.classList.add('active');
          }
        });
      }
      
      // Filter cards if on the main page
      if (document.getElementById('container-all-items')) {
        filterCardsByPeriod(selectedPeriod);
      }
      
      // Optionally redirect to index.html if not already there
      if (!window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
      }
    });
  }

  // Trigger fade-in animation after content is loaded
  setTimeout(() => {
    const aboutContent = document.querySelector('.about-content');
    const containerWrapper = document.querySelector('.container-wrapper');
    if (aboutContent) {
      aboutContent.classList.add('fade-in');
    }

    if (containerWrapper) {
      containerWrapper.classList.add('fade-in');
    }
  }, 100);

});
// DOM function ends 

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Check if this button is already active
      const isCurrentlyActive = this.classList.contains('button-active');
      
      // Remove active class from all buttons first
      filterButtons.forEach(btn => {
        btn.classList.remove('button-active');
      });
      
      // If the button wasn't active, make it active
      // If it was active, leave it inactive (deselect)
      if (!isCurrentlyActive) {
        this.classList.add('button-active');
      }
      
      // Apply filters based on current button states
      applyFilters();
    });
  });
}


function applyFilters() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const cards = document.querySelectorAll('.card');
  
  // Get which filter is active (only one can be active at a time)
  const activeFilter = {
    all: document.querySelector('.filter-button:nth-child(1)').classList.contains('button-active'),
    fruits: document.querySelector('.filter-button:nth-child(2)').classList.contains('button-active'),
    vegetables: document.querySelector('.filter-button:nth-child(3)').classList.contains('button-active'),
    nuts: document.querySelector('.filter-button:nth-child(4)').classList.contains('button-active'),
    yearRound: document.querySelector('.filter-button:nth-child(5)').classList.contains('button-active')
  };
  
  // Check if any specific filter (not "all") is active
  const anySpecificFilterActive = activeFilter.fruits || activeFilter.vegetables || activeFilter.nuts || activeFilter.yearRound;
  
  // If no specific filters are active and "all" is not active, activate "all" by default
  if (!anySpecificFilterActive && !activeFilter.all) {
    const allButton = document.querySelector('.filter-button:nth-child(1)');
    allButton.classList.add('button-active');
    activeFilter.all = true;
  }
  
  // Get current selected period for period filtering
  const selectedElement = document.querySelector('.selected');
  const currentPeriod = selectedElement ? selectedElement.textContent.trim() : null;
  
  cards.forEach(card => {
    const classification = card.dataset.classification;
    const activeperiods = card.dataset.activeperiod;
    
    let shouldShowByFilter = false;
    let shouldShowByPeriod = true;
    
    // Check filter criteria
    if (activeFilter.all) {
      // If "all" filter is active, show all cards (regardless of classification)
      shouldShowByFilter = true;
    } else {
      // Check which specific filter is active
      if (classification === 'fruit' && activeFilter.fruits) {
        shouldShowByFilter = true;
      } else if (classification === 'vegetable' && activeFilter.vegetables) {
        shouldShowByFilter = true;
      } else if (classification === 'nut' && activeFilter.nuts) {
        shouldShowByFilter = true;
      } else if (activeFilter.yearRound && activeperiods) {
        // Check if item is available year-round
        const periods = activeperiods.split(',');
        if (periods.length >= 24) {
          shouldShowByFilter = true;
        }
      }
    }
    
    // Check period criteria if a period is selected
    if (currentPeriod && activeperiods) {
      const periods = activeperiods.split(',');
      shouldShowByPeriod = periods.includes(currentPeriod);
    }
    
    // Card should be visible if it passes both filter and period checks
    const shouldShow = shouldShowByFilter && shouldShowByPeriod;
    
    // Show or hide the card using the same method as filterCardsByPeriod
    if (shouldShow) {
      // Card should be visible
      if (card.classList.contains('hidden')) {
        // Card is currently hidden, fade it in
        card.classList.add('fade-in');
        
        // Small delay to ensure the hidden class is removed before adding fade-in
        setTimeout(() => {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          card.classList.remove('fade-out');
        }, 10);
      }
    } else {
      // Card should be hidden
      if (!card.classList.contains('hidden')) {
        // Card is currently visible, fade it out
        card.classList.add('fade-out');
        
        // Wait for fade-out animation to complete before hiding
        setTimeout(() => {
          card.classList.add('hidden');
          card.classList.remove('fade-out');
        }, 10);
      }
    }
  });
}

function applySeasonTheme(activePeriod) {
  const season = seasonMapping[activePeriod] || "Summer";

  console.log(`Applying theme for period: ${activePeriod}, Season: ${season}`);

  // Get the theme colors
  const theme = seasonThemes[season];
  document.documentElement.style.setProperty('--color-primary', theme.primary);
  document.documentElement.style.setProperty('--color-secondary', theme.secondary);
  document.documentElement.style.setProperty('--color-background', theme.background);
  document.documentElement.style.setProperty('--color-text', theme.text);
  
  setTimeout(() => {
    // Remove all season classes first
    document.body.classList.remove('spring', 'summer', 'autumn', 'winter', 'fall');
    
    // Add the new season class
    document.body.className = season.toLowerCase();
  }, 0);
}
