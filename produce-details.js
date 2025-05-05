// produce detail page  

import { seasonThemes, seasonMapping, produceData} from "./produce-data.js";

document.addEventListener('DOMContentLoaded', () => {
  // Get the produce ID from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const produceId = urlParams.get('id');
  
  // If no ID was provided, redirect to home page
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
  document.title = `${produce.name} - Seasonal Produce`;
  
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

  // Apply appropriate season theme based on current produce's peak season
  const peakSeason = determinePeakSeason(produce.season);
  applySeasonTheme(peakSeason);

  // Get current date for the header
  const now = new Date();
  var datetime = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  if (document.getElementById("datetime")) {
    document.getElementById("datetime").innerHTML = "Today's date: " + datetime;
  }
});

// Function to determine the peak season period based on the season text
function determinePeakSeason(seasonText) {
  const peakMatch = seasonText.match(/Peak season: ([\w\s]+)/);
  if (peakMatch && peakMatch[1]) {
    // Extract the first period mentioned as the peak
    const periods = peakMatch[1].split(' through ');
    if (periods[0]) {
      return periods[0].trim();
    }
  }
  // Default to current period if we can't determine
  return getCurrentPeriod();
}

// Function to get the current period based on date
function getCurrentPeriod() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  if (month == 1 && day < 16) return 'Early January';
  if (month == 1 && day >= 16) return 'Late January';
  if (month == 2 && day < 16) return 'Early February';
  if (month == 2 && day >= 16) return 'Late February';
  if (month == 3 && day < 16) return 'Early March';
  if (month == 3 && day >= 16) return 'Late March';
  if (month == 4 && day < 16) return 'Early April';
  if (month == 4 && day >= 16) return 'Late April';
  if (month == 5 && day < 16) return 'Early May';
  if (month == 5 && day >= 16) return 'Late May';
  if (month == 6 && day < 16) return 'Early June';
  if (month == 6 && day >= 16) return 'Late June';
  if (month == 7 && day < 16) return 'Early July';
  if (month == 7 && day >= 16) return 'Late July';
  if (month == 8 && day < 16) return 'Early August';
  if (month == 8 && day >= 16) return 'Late August';
  if (month == 9 && day < 16) return 'Early September';
  if (month == 9 && day >= 16) return 'Late September';
  if (month == 10 && day < 16) return 'Early October';
  if (month == 10 && day >= 16) return 'Late October';
  if (month == 11 && day < 16) return 'Early November';
  if (month == 11 && day >= 16) return 'Late November';
  if (month == 12 && day < 16) return 'Early December';
  if (month == 12 && day >= 16) return 'Late December';
  
  return 'Late April'; // Default fallback
}

// Apply the seasonal theme styling
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

