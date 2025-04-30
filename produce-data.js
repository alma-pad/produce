  
export {producePeriods, seasonThemes, seasonMapping}; 


const seasonThemes = {
  "Spring": {
    primary: "#F06668",      
    secondary: "#E2F0B2",    
    background: "#FBFEEB",   
    text: "#333333"          
  },
  "Summer": {
    primary: "#5F8E45",      
    secondary: "#FFDA75",    
    background: "#FFF9E7",   
    text: "#333333"          
  },
  "Fall": {
    primary: "#D86703",      
    secondary: "#D6D5E7",    
    background: "#FFF3F0",  
    text: "#4A3C31"          
  },
  "Winter": {
    primary: "#588AB6",      
    secondary: "#DBDBDB",             
    background: "#EFF2F5",   
    text: "#2C3E50"        
  }
};z


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
    "Placeholder": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December"
  
  };



