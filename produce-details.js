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
    { id: 'produce-notes', property: 'notes', label: 'Notes' }
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
  
  // const now = new Date('2025-01-22');
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
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback to index.html if there's no history
        window.location.href = 'index.html';
      }
    });
  });

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
