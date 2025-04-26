  
export {producePeriods, seasonThemes, seasonMapping}; 


const seasonThemes = {
  "Spring": {
    primary: "#DE688B",      // pink
    secondary: "#D6B9FF",    // light purple
    background: "#FEFAFF",   // very light purple
    text: "#333333"          // Dark text
  },
  "Summer": {
    primary: "#5F8E45",      // moss green
    secondary: "#C6EAFF",    // light blue
    background: "#FFF9E7",   // cream
    text: "#333333"          // Dark text
  },
  "Fall": {
    primary: "#A52A10",      // Firebrick red (header)
    secondary: "#FFB73B",    // gold
    background: "#FCE7E1",   // Light orange/tan
    text: "#4A3C31"          // Dark brown text
  },
  "Winter": {
    primary: "#5C8DB8",      // Steel blue (header)  
    secondary: "#C1B9C8",    // Slate gray (footer)
    background: "#EBF4EB",   // Very light blue
    text: "#2C3E50"          // Dark blue text
  }
};


const seasonMapping = {
  "Early January": "Winter",
  "Late January": "Winter",
  "Early February": "Winter",
  "Late February": "Winter",
  "Early March": "Spring",
  "Late March": "Spring",
  "Early April": "Spring",
  "Late April": "Spring",
  "Early May": "Spring",
  "Late May": "Spring",
  "Early June": "Spring",
  "Late June": "Summer",
  "Early July": "Summer",
  "Late July": "Summer",
  "Early August": "Summer",
  "Late August": "Summer",
  "Early September": "Summer",
  "Late September": "Fall",
  "Early October": "Fall",
  "Late October": "Fall",
  "Early November": "Fall",
  "Late November": "Fall",
  "Early December": "Winter",
  "Late December": "Winter"
};


  // ALPHABETICAL ORDERING!!!!!!!!!!!! 
  // NO SPACES BETWEEN ACTIVE PERIODS!!!!!!!!!!!!!!!!!!!!!!!!
const producePeriods = {
    "Avocado" : "Early June,Late June,Early July,Late July,Early August,Late August",
    "Blueberry": "Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August",

    "Strawberry": "Early April,Late April,Early May,Late May,Early June,Late June,Early July",
    "Tomato": "Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September,Late September",
    "Pear": "Early September,Late September,Early October,Late October,Early November,Late November,Late November,Late December",

    // placeholder fruit 
    "Placeholder": "Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December"
  
  };



