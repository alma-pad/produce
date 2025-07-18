// produce detail page  

import { seasonThemes, seasonMapping, produceData} from "./produce-data.js";

document.addEventListener('DOMContentLoaded', () => {
  // Get the produce ID from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const produceId = urlParams.get('id');
  
  // If no ID was provided, redirect to home page
  // for placeholders only
  if (!produceId) {
    window.location.href = 'index.html';
    return;
  }
  
  const produce = produceData[produceId];

  // If the produce doesn't exist in our data, redirect home
  if (!produce) {
    window.location.href = 'index.html';
    return;
  }
  
  // Update page title
  document.title = `Seasonal Produce - ${produce.name}`;
  
  // Populate the HTML with produce data
  document.getElementById('produce-title').textContent = produce.name;
  document.getElementById('produce-img').src = produce.image;
  document.getElementById('produce-img').alt = produce.name;

  const sections = [
    { id: 'produce-season', property: 'season', label: 'Season' },
    { id: 'produce-benefits', property: 'benefits', label: 'Benefits' },
    { id: 'produce-recipes', property: 'recipes', label: 'Recipes' },
    { id: 'produce-notes', property: 'notes', label: 'Notes' }, 
    { id: 'produce-joke', property: 'joke', label: 'Notes' }
  ];

  sections.forEach(section => {
    const element = document.getElementById(section.id);
    const parentSection = element.closest('.info-section');
    
    if (produce[section.property]) {
      // If the property exists, show the section and set the content
      element.textContent = produce[section.property];
      parentSection.style.display = 'block'; // Make sure it's visible
    } else {
      // If the property doesn't exist, hide the entire section
      parentSection.style.display = 'none';
    }
  });

  if (produce.recipes && Array.isArray(produce.recipes)) {
    const recipeListHTML = `<ul class="recipe-list">
      ${produce.recipes.map(recipe => `<li>${recipe}</li>`).join('')}
    </ul>`;
    
    document.getElementById('produce-recipes').innerHTML = recipeListHTML;
  }

  // Apply appropriate season theme based on current produce's peak season
  const peakSeason = determinePeakSeason(produce.activeperiods);
  applySeasonTheme(peakSeason);

  // Get current date for the header
  const now = new Date();
  
  //const now = new Date('2025-01-22');
  var datetime = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  if (document.getElementById("datetime")) {
    document.getElementById("datetime").innerHTML = "Today's date: " + datetime;
  }

  document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
       // If there's browser history, go back
       if (document.referrer && document.referrer.includes(window.location.hostname)) {
        window.history.back();
      } else {
        // Fallback to index.html if there's no history or came from external site
        window.location.href = 'index.html';
      }
    });
  });

  // Mobile nav stuff
  // Close nav menu when clicking outside or pressing escape
   document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileNav();
            }
        });

  // Add click event to mobile menu toggle button
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Add click event to close button
    const mobileClose = document.querySelector('.mobile-nav-close');
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileNav);
    }
    
    // Add click event to overlay
    const overlay = document.querySelector('.mobile-nav-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeMobileNav);
    }
    
    // Add click events to mobile nav links to close menu
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    const nav = document.querySelector(".nav-container");
    const navMobile = document.querySelector(".nav-container-mobile");
    const header = document.querySelector(".header") ||
    document.querySelector(".header-details");

    window.addEventListener("scroll", () => {
      const headerBottom = header.getBoundingClientRect().bottom;

      if (headerBottom <= 0) {
        nav.classList.add("scalloped-bottom");
        navMobile.classList.add("scalloped-bottom");
      } else {
        nav.classList.remove("scalloped-bottom");
        navMobile.classList.remove("scalloped-bottom");
      }
    });


     // create active state for mobile nav links
    const links = document.querySelectorAll('.mobile-nav-links a, .nav a');

    const currentPage = window.location.pathname.split('/').pop();
    //highlight nav-left if on the home page
      if (currentPage === 'index.html') {
       const navLeft = document.querySelector('.mobile-nav .nav-left');
      if (navLeft) {
        navLeft.classList.add('nav-active');
      }
    }

    //highlight other links
    links.forEach(link => {
      const linkPage = link.getAttribute('href');

      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('nav-active');
      }
    });

    const delayedLinks = document.querySelectorAll('.mobile-nav-links a.delayed-nav');

    delayedLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // prevent immediate navigation

        const href = this.getAttribute('href'); // get target URL

        closeMobileNav(); // trigger slide-out

        // Wait for animation to finish, then navigate
        setTimeout(() => {
          window.location.href = href;
        }, 300); // match your transition duration
      });
    });

    // make home link 
    document.querySelectorAll('a.home-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        // Determine current period
        const now = new Date();
        const currentPeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') +
          now.toLocaleDateString('en-US', { month: 'long' });

        // Store the period
        sessionStorage.setItem('selectedPeriod', currentPeriod);

        // Apply season theme after a delay
          setTimeout(() => {
             applySeasonTheme(currentPeriod);
          }, 300);


        // make sure appropriate activePeriod is selected 
         const selected = document.querySelector('.selected');
        const options = document.querySelectorAll('.menu li');

          if (selected && options.length) {
            selected.textContent = currentPeriod;

            options.forEach(option => {
              option.classList.remove('active');
              if (option.textContent.trim() === currentPeriod) {
                option.classList.add('active');
              }
            });
          }

        // Reset filter buttons to "all"
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(btn => btn.classList.remove('button-active'));

        const allButton = document.querySelector('.filter-button[data-filter="all"]');
        if (allButton) {
          allButton.classList.add('button-active');
        }

        // Clear stored filter
        sessionStorage.removeItem('selectedFilter');

        // Apply filters
        applyFilters();


        // Redirect if needed
        if (!window.location.href.includes('index.html')) {
          window.location.href = 'index.html';
        } else {
          // Optional: scroll to top and refresh UI if already on index
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
     });


  // Trigger fade-in animation after content is loaded
  // Small delay ensures all content is rendered before animation starts
  setTimeout(() => {
    const produceContent = document.querySelector('.produce-content');
    if (produceContent) {
      produceContent.classList.add('fade-in');
    }
  }, 100);

});
// DOM function ends 

// Function to determine the peak season by finding the midpoint of the the activeperiods list
// If the item is available year-round the function will style based on today's date
// I will ensure no empty arrays

function determinePeakSeason(activeperiodsStr) {
  const periods = activeperiodsStr.split(',').map(period => period.trim());

  const now = new Date(); 
  //const now = new Date('2025-01-22');

  const activePeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') + 
                   now.toLocaleDateString('en-US', { month: 'long' });

  if (periods.length==24){
    return activePeriod;
  } else {
  
  const middleIndex = Math.floor(periods.length/2)-1;
    return periods[middleIndex];
  }
 
}



// Apply the seasonal theme styling
function applySeasonTheme(activePeriod) {
  const season = seasonMapping[activePeriod] || "Summer";
  console.log(`Applying theme for period: ${activePeriod}, Season: ${season}`);

  const theme = seasonThemes[season];
  document.documentElement.style.setProperty('--color-primary', theme.primary);
  document.documentElement.style.setProperty('--color-secondary', theme.secondary);
  document.documentElement.style.setProperty('--color-background', theme.background);
  document.documentElement.style.setProperty('--color-text', theme.text);
  
  document.body.className = season.toLowerCase();
}


// mobile nav functions 

function toggleMobileNav() {
   const overlay = document.querySelector('.mobile-nav-overlay');
   const nav = document.querySelector('.mobile-nav');
            
   overlay.classList.add('active');
   nav.classList.add('active');
            
   // Prevent body scrolling when menu is open
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    const nav = document.querySelector('.mobile-nav');
            
    overlay.classList.remove('active');
    nav.classList.remove('active');
            
  // Restore body scrolling
  document.body.style.overflow = '';
}


function applyFilters() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const cards = document.querySelectorAll('.card');
  
  const emptyState = document.getElementById('empty-state');
  const cardsContainer = document.getElementById('cards-container');

  if (!cardsContainer) {
    return;
  }
  
  let activeFilter = 'all';
  // Get which filter is active (only one can be active at a time)
  filterButtons.forEach(button => {
  if (button.classList.contains('button-active')) {
    activeFilter = button.dataset.filter;
  }
});
  
  // Check if any specific filter (not "all") is active
  const anySpecificFilterActive =
  activeFilter === 'fruits' ||
  activeFilter === 'vegetables' ||
  activeFilter === 'nuts' ||
  activeFilter === 'yearRound';
  
// If no specific filters are active and "all" is not active, activate "all" by default
  if (!anySpecificFilterActive && activeFilter !== 'all') {
    const allButton = document.querySelector('.filter-button[data-filter="all"]');
    if (allButton) {
      allButton.classList.add('button-active');
      activeFilter = 'all';
    }
  }
  
  // Get current selected period for period filtering
  const selectedElement = document.querySelector('.selected');
  const currentPeriod = selectedElement ? selectedElement.textContent.trim() : null;
  
  let visibleCardCount = 0;
  
  cards.forEach(card => {
    const classification = card.dataset.classification;
    const activeperiods = card.dataset.activeperiod;
    
    let shouldShowByFilter = false;
    let shouldShowByPeriod = true;
    
    // Check filter criteria
      if (activeFilter === 'all') {
        shouldShowByFilter = true;
    } else if (classification === 'fruit' && activeFilter === 'fruits') {
        shouldShowByFilter = true;
    } else if (classification === 'vegetable' && activeFilter === 'vegetables') {
       shouldShowByFilter = true;
    } else if (classification === 'nut' && activeFilter === 'nuts') {
       shouldShowByFilter = true;
    } else if (activeFilter === 'yearRound' && activeperiods) {
      const periods = activeperiods.split(',');
      if (periods.length >= 24) {
        shouldShowByFilter = true;
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
      visibleCardCount++;
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
  
  // Show/hide empty state based on visible cards
  if (visibleCardCount === 0) {
    // No cards visible, remove padding and show empty state
    emptyState.classList.remove('hidden');
    cardsContainer.classList.add('no-padding');
    } else {
    // Cards visible, restore padding and hide empty state
    emptyState.classList.add('hidden');
    cardsContainer.classList.remove('no-padding');
  }
}


function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-button');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      this.blur(); 
      const filterType = this.dataset.filter;

      // Save selected filter type in sessionStorage
      sessionStorage.setItem('selectedFilter', filterType);
    

      const isCurrentlyActive = this.classList.contains('button-active');
      if (isCurrentlyActive) {
      // Deactivate the button
      this.classList.remove('button-active');
      sessionStorage.removeItem('selectedFilter');

      // Set all filter active by default
      const allButton = document.querySelector('.filter-button[data-filter="all"]');
      if (allButton) {
        allButton.classList.add('button-active');
      }
    } else {
      // Deactivate all, then activate this one
      filterButtons.forEach(btn => btn.classList.remove('button-active'));
      this.classList.add('button-active');
    }


      applyFilters();
  
    });
  });
   
}
