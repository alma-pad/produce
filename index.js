
// import { producePeriods } from './produce-data.js';
import {producePeriods, seasonThemes, seasonMapping} from "./produce-data.js";

document.addEventListener('DOMContentLoaded', function() {
  var now = new Date(); 
  // change date for testing purposes 
  //var now = new Date('2025-07-22');

  // Insert date and time into HTML
  var datetime = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  document.getElementById("datetime").innerHTML = "Today's date: " + datetime;


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

  const select = document.querySelector('.select');
  const caret = document.querySelector('.caret');
  const menu = document.querySelector('.menu');
  const options = document.querySelectorAll('.menu li');
  const selected = document.querySelector('.selected'); 
  const dropdown = document.querySelector('.dropdown');  

  // touch screen tracking
  let touchStartY = 0;
  let touchEndY = 0;
  const touchThreshold = 20; //adjust this pixel size to liking


   // Apply data attributes to cards based on their content
   const cards = document.querySelectorAll('.card');
   cards.forEach(card => {
     // Get the produce name from the card's paragraph text
     const produceName = card.querySelector('p').textContent.trim();
     
     // If we have season data for this produce, apply it
     if (producePeriods[produceName]) {
       card.dataset.activeperiod = producePeriods[produceName];
     }
   });

  // Set active class on the appropriate menu item
  options.forEach(option => {
    if (option.textContent.trim() === activePeriod) {
      // Remove active class from all options
      options.forEach(opt => {
        opt.classList.remove('active');
      });

      // Add active class to this option
      option.classList.add('active');

      // Update the selected text
      selected.textContent = activePeriod;
    }
  });  


  applySeasonTheme(activePeriod);
 
  filterCardsByPeriod(activePeriod);

 


  //toggle drop down when the user clicks on it 
  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked'); 
    caret.classList.toggle('caret-rotate'); 
    menu.classList.toggle('menu-open');
  });

   // Close dropdown when clicking outside
   document.addEventListener('click', (e) => {
    // Check if the click was outside the dropdown
    if (!dropdown.contains(e.target)) {
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
        
      // Filter cards
      filterCardsByPeriod(selectedPeriod);

      // Change the season theme 
      applySeasonTheme(selectedPeriod);
   });

   // for mobile 
    option.addEventListener('touchend', (e) => {
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




});
// DOM function ends 








function filterCardsByPeriod(period) {
  // Get all cards
  const cards = document.querySelectorAll('.card');
  
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
};




// map activePeriod to season
// const seasonMapping is defined in produce-data.js 


// Set season color themes  
// const seasonThemes is defined in produce-data.js

// define which produce item is in season during which activePeriod
// const producePeriods is defined in produce-data.js


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
};
