// add all the data about produce and seasons here   


export {producePeriods, seasonThemes, seasonMapping, produceData};


// ALPHABETICAL ORDERING!!!!!!!!!!!! 
// NO SPACES BETWEEN ACTIVE PERIODS!!!!!!!!!!!!!!!!!!!!!!!!
const producePeriods = {
    "Avocado" : "Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September",
    "Apple": "Early September,Late September,Early October,Late October,Early November",
    "Blueberry": "Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August",
    "Lemon": "Early January,Late January,Early February,Late February,Early March,Late March,Early December,Late December",
    "Pomegranate": "Late September,Early October,Late October,Early November,Late November,Early December,Late December",
    "Strawberry": "Early April,Late April,Early May,Late May,Early June,Late June,Early July",
    "Tomato": "Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September,Late September",
    "Pear": "Early September,Late September,Early October,Late October,Early November,Late November,Late November,Late December",

    // placeholder fruit 
    "Placeholder": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December"
  
  };



// Produce data with detailed information
const produceData = {
  avocado: {
    name: "Avocado",
    image: "./images/avocado.png",
    season: "Early April through Early September",
    benefits: "Rich in heart-healthy monounsaturated fats, avocados provide a creamy satisfaction while supporting brain function and nutrient absorption. They're packed with potassium, fiber, and various vitamins and minerals, and their versatility makes them perfect for everything from breakfast to dessert.",
    recipes: [
      "Avocado toast is always a classic", 
      "Guacamole", 
      "Avocado salad with cucumber", 
      "Avocado brownies"
    ],
    notes: "Fun fact: Alma has an avocado hair clip"
  },
  apple: {
    name: "Apple",
    image: "./images/apple.png",
    season: "Early September through Early November",
    benefits: "Apples contain pectin, a soluble fiber that lowers cholesterol and feeds beneficial gut bacteria and supports a healthy gut microbiome. They also contain various phytochemicals that benefit the immune system, support bone density, and may reduce the risk of chronic disease.", 
    recipes: "pie!!"
  },
  blueberry: {
    name: "Blueberry",
    image: "./images/blueberry.png",
    season: "Late April through Early August",
    benefits: "Benefits information will be added soon."
  },

  lemon: {
    name: "Lemon",
    image: "./images/lemon.png",
    season: "Early December through Late March",
    benefits: "Benefits information will be added soon."
  },

  pomegranate: {
    name: "Pomegranate",
    image: "./images/pomegranate.png",
    season: "Late September through Late December",
    benefits: "Benefits information will be added soon."
  },

  strawberry: {
    name: "Strawberry",
    image: "./images/strawberry.png",
    season: "Late April through Early July",
    // benefits: "benefits of strawberries"
  },
  tomato: {
    name: "Tomato",
    image: "./images/tomato.png",
    season: "Late May through Late September",
    benefits: "Benefits information will be added soon."
  },
  pear: {
    name: "Pear",
    image: "./images/pear.png",
    season: "Peak season: Late August through Early November",
    benefits: "Benefits information will be added soon."
  },
  placeholder: {
    name: "Placeholder",
    image: "./images/strawberry_placeholder.jpg",
    season: "Season information will be added soon",
    benefits: "Benefits information will be added soon."
  }
};


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
