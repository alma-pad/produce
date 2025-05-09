// import { seasonThemes, seasonMapping, produceData } from "./produce-data.js";
import { seasonThemes, seasonMapping, produceData } from "./produce-data.js";

document.addEventListener('DOMContentLoaded', function() {
  // Get the current page based on document title or URL
  const isAboutPage = document.title === 'Seasonal Produce - About';
  
  // Insert date and time into HTML for all pages
  var now = new Date(); 
  // test other dates
  // var now = new Date('2025-07-22');

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
    var month = now.getMonth()+1;
    var day = now.getDate();
    var activePeriod = '';

    // Set active period based on date
    if (month == 1 && day < 16) {
      activePeriod = 'Early January';
    } else if (month == 1 && day >= 16) {
      activePeriod = 'Late January';
    } else if (month == 2 && day < 16) {
      activePeriod = 'Early February';
    } else if (month == 2 && day >= 16) {
      activePeriod = 'Late February';
    } else if (month == 3 && day < 16) {
      activePeriod = 'Early March';
    } else if (month == 3 && day >= 16) {
      activePeriod = 'Late March';
    } else if (month == 4 && day < 16) {
      activePeriod = 'Early April';
    } else if (month == 4 && day >= 16) {
      activePeriod = 'Late April';
    } else if (month == 5 && day < 16) {
      activePeriod = 'Early May';
    } else if (month == 5 && day >= 16) {
      activePeriod = 'Late May';
    } else if (month == 6 && day < 16) {
      activePeriod = 'Early June';
    } else if (month == 6 && day >= 16) {
      activePeriod = 'Late June';
    } else if (month == 7 && day < 16) {
      activePeriod = 'Early July';
    } else if (month == 7 && day >= 16) {
      activePeriod = 'Late July';
    } else if (month == 8 && day < 16) {
      activePeriod = 'Early August';
    } else if (month == 8 && day >= 16) {
      activePeriod = 'Late August';
    } else if (month == 9 && day < 16) {
      activePeriod = 'Early September';
    } else if (month == 9 && day >= 16) {
      activePeriod = 'Late September';
    }else if (month == 10 && day < 16) {
      activePeriod = 'Early October';
    } else if (month == 10 && day >= 16) {
      activePeriod = 'Late October';
    } else if (month == 11 && day < 16) {
      activePeriod = 'Early November';
    } else if (month == 11 && day >= 16) {
      activePeriod = 'Late November';
    } else if (month == 12 && day < 16) {
      activePeriod = 'Early December';
    } else if (month == 12 && day >= 16) {
      activePeriod = 'Late December';
    } 

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
        `<a href="index.html" class="date-link" data-period="${currentPeriod}">Today's date: ${datetime}</a>`;
        
        applySeasonTheme(currentPeriod);
      
      // Add click event to store the period in sessionStorage
      document.getElementById("datetime").querySelector('a').addEventListener('click', function(e) {
        sessionStorage.setItem('selectedPeriod', this.getAttribute('data-period'));
      });
    
  }



});
// DOM function ends 

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
    
    // Show the card if it's in season, hide it if not
    if (activeperiods.includes(period)) {
      card.classList.remove('hidden');
      card.classList.add('visible');
    } else {
      card.classList.add('hidden');
      setTimeout(() => {
        card.classList.remove('visible');
      }, 300);
    }
  });
}

function applySeasonTheme(activePeriod) {
  const season = seasonMapping[activePeriod] || "Summer";
  
  // Get the theme colors
  const theme = seasonThemes[season];
  document.documentElement.style.setProperty('--color-primary', theme.primary);
  document.documentElement.style.setProperty('--color-secondary', theme.secondary);
  document.documentElement.style.setProperty('--color-background', theme.background);
  document.documentElement.style.setProperty('--color-text', theme.text);
  
  // Add season class to body
  document.body.className = season.toLowerCase();
}
