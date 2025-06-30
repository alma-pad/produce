
import { seasonThemes, seasonMapping, produceData } from "./produce-data.js";

document.addEventListener('DOMContentLoaded', function() {
  // Get the current page based on document title or URL
  const isAboutPage = document.title === 'Seasonal Produce - About';
  
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

   // commented out for datetime button
  if (document.getElementById("datetime")) {
    document.getElementById("datetime").innerHTML = "Today's date: " + datetime;
  }



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

  // Only execute the following code if we're not on the about page
  if (!isAboutPage) {
    // touch screen tracking
    // adjust touch sensitivity here 
    let touchStartY = 0;
    let touchEndY = 0;
    const touchThreshold = 5; 

    // assign active state to list item based on month and day 
    var activePeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') + 
    now.toLocaleDateString('en-US', { month: 'long' });

   
    // Check if these elements exist before trying to work with them
    const select = document.querySelector('.select');
    const caret = document.querySelector('.caret');
    const menu = document.querySelector('.menu');
    const options = document.querySelectorAll('.menu li');
    const selected = document.querySelector('.selected'); 
    const dropdown = document.querySelector('.dropdown');
    const cardsContainer = document.getElementById('cards-container');

    // Only run this code if the required elements exist
    if (select && caret && menu && options.length && selected && dropdown && cardsContainer) {
      // Make sure the container has the correct classes for styling
      cardsContainer.classList.add('container');
        
      // Clear any existing cards in the container
      cardsContainer.innerHTML = '';

      // Create cards dynamically based on produceData object directly
      for (const produceKey in produceData) {
        const produceItem = produceData[produceKey];
        
        // Create the card element
        const card = document.createElement('div');
        card.className = 'card';
        
        // Use activeperiods directly from produceData
        card.dataset.activeperiod = produceItem.activeperiods;
        // Get classificaiton 
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

      // Get the stored period or use the active period
      const storedPeriod = sessionStorage.getItem('selectedPeriod');
      const periodToUse = storedPeriod || activePeriod;

      // Set active class on the appropriate menu item
      options.forEach(option => {
        if (option.textContent.trim() === periodToUse) {
          // Remove active class from all options
          options.forEach(opt => {
            opt.classList.remove('active');
          });

          // Add active class to this option
          option.classList.add('active');

          // Update the selected text
          selected.textContent = periodToUse;
        }
      });  

     
      setupFilterButtons();
  
     
      applySeasonTheme(periodToUse);
      filterCardsByPeriod(periodToUse);

      //toggle drop down when the user clicks on it 
      select.addEventListener('click', () => {
        select.classList.toggle('select-clicked'); 
        caret.classList.toggle('caret-rotate'); 
        menu.classList.toggle('menu-open');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        // Check if the click was outside the dropdown
        if (dropdown && !dropdown.contains(e.target)) {
          select.classList.remove('select-clicked');
          caret.classList.remove('caret-rotate');
          menu.classList.remove('menu-open');
        }
      });

      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      select.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
      });

      select.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;

        if (Math.abs(touchEndY - touchStartY) < touchThreshold) {
          e.preventDefault();
          select.click();
        }
      });
      
      options.forEach(option => {
        option.addEventListener('click', () => {
          selected.innerText = option.innerText; 
          select.classList.remove('select-clicked'); 
          caret.classList.remove('caret-rotate'); 
          menu.classList.remove('menu-open');
      
          // remove active class from all option elements
          options.forEach(option => {
            option.classList.remove('active'); 
          });
          // add active class to clicked option element
          option.classList.add('active'); 
        
          // Get the selected period
          const selectedPeriod = option.textContent.trim();
          sessionStorage.setItem('selectedPeriod', selectedPeriod);
            
          // Filter cards
          filterCardsByPeriod(selectedPeriod);

          // Change the season theme 
          applySeasonTheme(selectedPeriod);
        });

        // for mobile 
        option.addEventListener('touchstart', (e) => {
          touchStartY = e.touches[0].clientY;
        });

        option.addEventListener('touchend', (e) => {
          touchEndY = e.changedTouches[0].clientY;
          
          if (Math.abs(touchEndY - touchStartY) < touchThreshold) {
            e.preventDefault();
            option.click();
          }
        });
      });
    }
  } else {
    // For about page, apply seasonal theme based on stored period or current date
    // apply seasonal theme based on current date only, commented out the stored period 
    const storedPeriod = sessionStorage.getItem('selectedPeriod');
    
    // if (storedPeriod) {
    //   applySeasonTheme(storedPeriod);
    // } 
    //else {
      // Get current month and day
      const month = now.getMonth() + 1;
      const day = now.getDate();
      let currentPeriod;
      
      // Determine period based on date
      if (day < 16) {
        currentPeriod = `Early ${now.toLocaleDateString('en-US', { month: 'long' })}`;
      } else {
        currentPeriod = `Late ${now.toLocaleDateString('en-US', { month: 'long' })}`;
      }
      
      applySeasonTheme(currentPeriod);
    //}
  }



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
    if (document.getElementById('cards-container')) {
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


function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Check if this button is already active
      const isCurrentlyActive = this.classList.contains('button-active');
      
      if (isCurrentlyActive) {
        // If clicked button is active, deactivate it (toggle off)
        this.classList.remove('button-active');
      } else {
        // Remove active class from all buttons first (only one can be active)
        filterButtons.forEach(btn => {
          btn.classList.remove('button-active');
        });
        
        // Add active class to clicked button
        this.classList.add('button-active');
      }
      
      // Apply filters based on current button states
      applyFilters();
    });
  });
}

function filterCardsByPeriod(period) {
  // Get all cards
  const cards = document.querySelectorAll('.card');
  
  // Check if we have cards before proceeding
  if (cards.length === 0) return;
  
  // Loop through each card
  cards.forEach(card => {
    if (!card.dataset.activeperiod) {
      return;
    }



    // Get the seasons data for this card
    const activeperiods = card.dataset.activeperiod.split(',');
    
    // Check if card should be visible for this period
    // Add fade in and fade out effects for cards
    if (activeperiods.includes(period)) {
      // Card should be visible
      if (card.classList.contains('hidden')) {
        // Card is currently hidden, fade it in
        
        
        card.classList.add('fade-in');
        
 
        
        // Small delay to ensure the hidden class is removed before adding fade-in
        setTimeout(() => {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          card.classList.remove('fade-out');
          //card.classList.add('visible');
          
        }, 10);
      }
    } else {
      // Card should be hidden
      if (!card.classList.contains('hidden')) {
        // Card is currently visible, fade it out
        card.classList.add('fade-out');
        //card.classList.remove('fade-in');
        
        // Wait for fade-out animation to complete before hiding
        setTimeout(() => {
          card.classList.add('hidden');
          //card.classList.remove('visible');
          card.classList.remove('fade-out');
        }, 10); // Adjust this timing to match your CSS transition duration
      }
    }
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
