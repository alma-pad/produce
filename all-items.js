
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
  
  // Remove the immediate call to applySeasonTheme here
  // and only call it when button is clicked
  
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
  // Small delay ensures all content is rendered before animation starts
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
