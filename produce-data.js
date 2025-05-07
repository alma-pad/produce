// add all the data about produce and seasons here   


export {producePeriods, seasonThemes, seasonMapping, produceData};


// ALPHABETICAL ORDERING!!!!!!!!!!!! 
// NO SPACES BETWEEN ACTIVE PERIODS!!!!!!!!!!!!!!!!!!!!!!!!
const producePeriods = {
    "Asparagus": "Late February,Early March,Late March,Early April,Late April,Early May,Late May",   
    "Avocado" : "Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September",
  
    "Apple": "Early September,Late September,Early October,Late October,Early November",
    "Blueberry": "Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August",
    "Butternut Squash": "Early January,Late January,Early October,Late October,Early November,Late November,Early December,Late December",
    "Cherry": "Early May,Late May,Early June,Late June,Early July",
    "Leek": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May",
    "Lemon": "Early January,Late January,Early February,Late February,Early March,Late March,Early December,Late December",
    "Orange":"Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April",
    "Pear": "Early September,Late September,Early October,Late October,Early November,Late November,Late November,Early December,Late December",
    "Pomegranate": "Late September,Early October,Late October,Early November,Late November,Early December,Late December",
    "Pomelo": "Early January,Late January,Early February,Late February,Early March,Late March,Early April",

    "Strawberry": "Early April,Late April,Early May,Late May,Early June,Late June,Early July",
    "Tomato": "Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September,Late September",
    "Watermelon": "Late May,Early June,Late June,Early July ,Late July,Early August,Late August",
    
    

    // placeholder fruit 
    // "Placeholder": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December", 
    //"Placeholder1": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December", 
    //"Placeholder2": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December", 
    //"Placeholder3": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December", 
    //"Placeholder4": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December", 
    //"Placeholder5": "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December"




  
  };



// Produce data with detailed information
// lower case, use _ for space for example butternut_squash
const produceData = {
  asparagus: {
    name: "Asparagus",
    image: "./images/asparagus.png",
    season: "Late February through Late May",
    benefits: "Asparagus spears deliver a remarkable nutrient density, providing folate for cellular health and prebiotic fiber that nourishes beneficial gut bacteria for improved digestion. Their unique combination of antioxidants and anti-inflammatory compounds supports detoxification while their distinctive flavor adds sophisticated elegance to any meal.",
    recipes: [
      "Sheet pan asparagus with salmon and lemon", 
      "Orzo with asparagus and peas", 
      "Frittata with asparagus"
    ],
  },

  avocado: {
    name: "Avocado",
    image: "./images/avocado.png",
    season: "Early April through Early September",
    benefits: "Rich in heart-healthy monounsaturated fats, avocados provide a creamy satisfaction while supporting brain function and nutrient absorption. They're packed with potassium, fiber, and various vitamins and minerals, and their versatility makes them perfect for everything from breakfast to dessert.",
    recipes: [
      "Avocado toast with egg", 
      "Guacamole", 
      "Avocado salad with cucumber, tomato, red onion, and lime", 
      "Avocado brownies"
    ],
    notes: "Fun fact: Alma has an avocado hair clip"
  },
  apple: {
    name: "Apple",
    image: "./images/apple.png",
    season: "Early September through Early November",
    benefits: "Apples contain pectin, a soluble fiber that lowers cholesterol and feeds beneficial gut bacteria and supports a healthy gut microbiome. They also contain various phytochemicals that benefit the immune system, support bone density, and may reduce the risk of chronic disease.", 
    recipes: [
      "Roasted apples with savory companions like chicken or pork",
      "Apple with yogurt and nut butter", 
      "Apple pie!!", 
    ],
  },
  blueberry: {
    name: "Blueberry",
    image: "./images/blueberry.png",
    season: "Early April through Late June",
    benefits: "These tiny powerhouses pack more antioxidants than almost any other food, protecting your cells from damage while supporting brain function and memory. Just a handful of blueberries delivers essential nutrients that promote eye health, reduce inflammation, and may even help slow aging.",
    recipes: [
      "Blueberry broccoli spinach salad", 
      "Blueberry banana pancakes", 
      "Blueberry mint matcha latte"
    ],
  },

  butternut_squash: {
    name: "Butternut Squash",
    image: "./images/butternut_squash.png",
    season: "Early October through Late January",
    benefits: "Butternut squash is a nutritional powerhouse, particularly rich in vitamin A, vitamin C, and fiber. It's also a good source of potassium, magnesium, and manganese. Butternut squash is relatively low in calories and carbs, making it a healthy and versatile addition to many diets.",
    recipes: [
      "Roasted butternut squash with olive oil and herbs", 
      "Butternut squash soup with sage and rosemary", 
      "Mashed butternut squash"
    ],
  },

  cherry: {
    name: "Cherry",
    image: "./images/cherry.png",
    season: "Early May through Early July",
    benefits: "Cherries contain natural melatonin that may improve sleep quality, while their potent antioxidants have been shown to reduce inflammation and speed recovery after exercise. Their deep crimson color signals abundant anthocyanins that fight oxidative stress, making these sweet little gems as beneficial for your health as they are delightful to your taste buds.",
    recipes: [
      "Cherries paired with dark chocolate", 
      "Cherry compote", 
      "Cherry cobbler"
    ],
  },

  lemon: {
    name: "Lemon",
    image: "./images/lemon.png",
    season: "Early December through Late March",
    benefits: "Bursting with vitamin C, lemons boost your immune system while adding bright, vibrant flavor to any dish without extra calories. Their citric acid aids digestion and their alkalizing effect helps balance your body's pH levels. ", 
    recipes: [
      "Add a squeeze to cold water, hot water, or sparking water for an elevated drink", 
      "Avgolemono", 
      "Classic lemon tart"
    ],
  },

  leek: {
    name: "Leek",
    image: "./images/leek.png",
    season: "Early January through Late May",
    benefits: "Leeks offer a range of health benefits due to their rich nutrient profile. They are a good source of vitamins A, C, and K, and minerals like iron and magnesium. Leeks also contain dietary fiber, which supports digestive health and helps prevent constipation. Furthermore, they are rich in antioxidants like lutein and zeaxanthin, which are beneficial for eye health.", 
    recipes: [
      "Potato leek soup", 
      "Frittata with leek and asparagus and prosciutto", 
      "Caramelized leek pasta"
    ],
  },


  orange: {
    name: "Orange",
    image: "./images/orange.png",
    season: "Early January through Late April",
    benefits: "Although oranges are known for their high vitamin C content, they also have other nutrients beneficial for hydration, digestion, and immune health. Additionally, they help boost collgen production, which is important for skin elasticity. In Chinese culture oranges represent properity and financial prosperity because they are brightly colored and round.", 
    recipes: [
      "Fennel orange salad",
      "Chinese chicken salad",
      "Orange, carrot, and ginger juice",
      "Orange creamsicle overnight oats",
      "Orange cardamom olive oil cake"
    ],
  },
  pear: {
    name: "Pear",
    image: "./images/pear.png",
    season: "Early September through Late December",
    benefits: "With their honey-sweet flavor and uniquely satisfying texture, pears deliver soluble fiber that supports digestive health while helping manage cholesterol levels. Their high water content promotes hydration and skin health, while their portable nature makes them the perfect grab-and-go fruit for sustained energy without the crash.", 
    recipes: [
      "Pear with yogurt and nut butter", 
      "Pear and gorgonzola salad", 
      "Goat cheese and pear pizza with caramelized onion",
      "Grilled brie and pear sandwich"
    ],
  },

  pomelo: {
    name: "Pomelo",
    image: "./images/pomelo.png",
    season: "Early January through Early April",
    benefits: "This giant citrus fruit delivers an explosion of sweet-tart flavor while providing vitamin C, boosting immunity and collagen production for healthier skin. Pomelos contain powerful antioxidants that fight inflammation and may help reduce blood pressure, all while promoting feelings of fullness. It is very fun hold a large, round fruit and to peel off each segment and eat the juicy contents!", 
    notes: [
      "Try an oro blanco, which is a hybrid of a pomelo and grapefruit." 
    ]
  },

  pomegranate: {
    name: "Pomegranate",
    image: "./images/pomegranate.png",
    season: "Late September through Late December",
    benefits: "Bursting with jewel-like seeds, pomegranates deliver potent antioxidants that fight cellular damage while reducing inflammation throughout your body. Their unique combination of sweet-tart flavor and satisfying crunch makes them nature's perfect snack, while studies suggest they may improve heart health and exercise performance.", 
    recipes: [
      "Pomegranate chicken", 
      "Salad with spinach, kale, pomegranate, blue cheese, walnuts, and sweet potato", 
      "Pomegranate molasses for use in salad dressings or as a marinade for meat or tofu"
    ],
  },

  strawberry: {
    name: "Strawberry",
    image: "./images/strawberry.png",
    season: "Late April throgh Early July",
    benefits: "Strawberries deliver a perfect balance of sweetness and subtle acidity that satisfies cravings naturally. Their abundant antioxidants and polyphenols support skin health, help manage blood sugar, lower inflamation, and delay age-related memory loss. Plus they're delicious and low-calorie!", 
    recipes: [
      "They're delicious on their own", 
      "Strawberry banana smoothie", 
      "Salad with spinach, strawberry, feta cheese, shaved almonds", 
      "Strawberry rhubarb crisp"
    ],
  },
  tomato: {
    name: "Tomato",
    image: "./images/tomato.png",
    season: "Late May through Late September",
    benefits: "Tomatoes contain lycopene, a powerful antioxidant that becomes more bioavailable when cooked, protecting your skin and heart while potentially reducing cancer risk. Their versatility shines in countless cuisines, providing essential vitamins and minerals with a perfect balance of acidity and umami that enhances almost any savory dish.",
    recipes: [
      "Gazpacho", 
      "Shakshuka", 
      "Chinese tomato egg stir-fry 番茄炒鸡蛋",
      "Hierloom tomato galette"
    ],
  },

  watermelon: {
    name: "Watermelon",
    image: "./images/watermelon.png",
    season: "Late May through Late August",
    benefits: "Watermelon's juicy sweetness delivers hydration and electrolytes that quench thirst more effectively than water alone, making it nature's perfect summer refresher. With its high lycopene content protecting your skin from sun damage and its natural sugars providing quick energy, this low-calorie treat satisfies sweet cravings while supporting overall health.",
    recipes: [
      "Watermelon juice with lime", 
      "Watermelon, feta, cucumuber, and mint salad", 
      "Watermelon sorbet"
    ],
  },

  placeholder: {
    name: "Placeholder",
    image: "./images/placeholder.png",
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
