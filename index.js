import { seasonThemes, seasonMapping, produceData } from "./produce-data.js";

document.addEventListener('DOMContentLoaded', function() {
  // Get the current page based on document title or URL
  const isAboutPage = document.title === 'Seasonal Produce - About' || 
   document.title === 'Seasonal Produce - Mission';
  
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

        // Apply season theme
        applySeasonTheme(currentPeriod);


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

     
      applySeasonTheme(periodToUse);
      filterCardsByPeriod(periodToUse);

       // Set up filter buttons and used the stored filter if any
      setupFilterButtons();
      const storedFilter = sessionStorage.getItem('selectedFilter');
      console.log("Applying Filter:", storedFilter);

      if (storedFilter) {
          const matchingButton = document.querySelector(`.filter-button[data-filter="${storedFilter}"]`);
          if (matchingButton) {
            // Remove active from all first
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('button-active'));
            matchingButton.classList.add('button-active');
            applyFilters();
          }
        }
        
      
      //toggle drop down when the user clicks on it 
      select.addEventListener('click', () => {
        select.classList.toggle('select-clicked'); 
        caret.classList.toggle('caret-rotate'); 
        menu.classList.toggle('menu-open');

        if (menu.classList.contains('menu-open')) {
          const selectedItem = menu.querySelector('li.active');
          if (selectedItem) {
            const menuHeight = menu.clientHeight;
            const itemOffsetTop = selectedItem.offsetTop;
            const itemHeight = selectedItem.offsetHeight;
            const scrollTarget = itemOffsetTop - (menuHeight / 2) + (itemHeight / 2);

            // Clamp the scroll value between 0 and max scroll
            const maxScroll = menu.scrollHeight - menu.clientHeight;
            menu.scrollTop = Math.max(0, Math.min(scrollTarget, maxScroll));
          }
        }

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

          applySeasonTheme(selectedPeriod);
          applyFilters(); // this also filters cards by activePeriod
          

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

     //reset filters 
      const filterButtons = document.querySelectorAll('.filter-button');
      filterButtons.forEach(btn => btn.classList.remove('button-active'));

      const allButton = document.querySelector('.filter-button[data-filter="all"]');
      if (allButton) {
        allButton.classList.add('button-active');
      }

     
      sessionStorage.removeItem('selectedFilter');
      applyFilters();
    
 
    // Optionally redirect to index.html if not already there
    if (!window.location.href.includes('index.html')) {
      window.location.href = 'index.html';
    }

    // scroll to top of page 
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    
    // Start fade-out transition
    overlay.classList.remove('active');

    // Start slide-out transition
    nav.style.left = '-100vw';

    // Restore body scroll
    document.body.style.overflow = '';

    // Wait for transition to finish, then remove 'active' class
    setTimeout(() => {
        nav.classList.remove('active');
        nav.style.left = ''; // clear inline style
    }, 300); // match your CSS transition duration (0.3s = 300ms)
}
