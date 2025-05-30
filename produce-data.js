// add all the data about produce and seasons here   


export {seasonThemes, seasonMapping, produceData};


// ALPHABETICAL ORDERING!!!!!!!!!!!! 
// NO SPACES BETWEEN ACTIVE PERIODS!!!!!!!!!!!!!!!!!!!!!!!!
// Produce data with detailed information
// lower case use _ for space for example butternut_squash

const produceData = {
  asparagus: {
    name: "Asparagus",
    image: "./images/asparagus.png",
    season: "Late February through Late May",
    activeperiods: "Late February,Early March,Late March,Early April,Late April,Early May,Late May", 
    benefits: "Asparagus spears deliver a remarkable nutrient density, providing folate for cellular health and prebiotic fiber that nourishes beneficial gut bacteria for improved digestion. Their unique combination of antioxidants and anti-inflammatory compounds supports detoxification while their distinctive flavor adds sophisticated elegance to any meal.",
    recipes: [
      "Sheet pan asparagus with salmon and lemon", 
      "Orzo with asparagus and peas", 
      "Frittata with leek and asparagus and prosciutto"
    ],
  },

  apricot: {
    name: "Apricot",
    image: "./images/apricot.png",
    season: "Early May through Late July",
    activeperiods: "Early May,Late May,Early June,Late June,Early July,Late July", 
    benefits: "Apricots pack impressive amounts of vitamin A for eye health and beta-carotene for skin protection, all within their sun-kissed, velvety exterior. Round and yellow, they look like a smaller version of a peach but share the tartness of purple plums. They're a perfectly cute size and a great way to get your daily serving of fruit and veggies. ",
    recipes: [
      "Apricot chicken with orzo", 
      "Grilled apricot and blueberry goat cheese salad", 
      "Apricot clafoutis", 
      "Apricot jam"
    ],
  },

  avocado: {
    name: "Avocado",
    image: "./images/avocado.png",
    season: "Early April through Early September",
    activeperiods: "Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September",
    benefits: "Rich in heart-healthy monounsaturated fats, avocados provide a creamy satisfaction while supporting brain function and nutrient absorption. They're packed with potassium, fiber, and various vitamins and minerals, and their versatility makes them perfect for everything from breakfast to dessert.",
    recipes: [
      "Avocado toast with egg", 
      "Guacamole", 
      "Avocado salad with cucumber, tomato, red onion, and lime", 
      "Avocado brownies"
    ]
  },
  apple: {
    name: "Apple",
    image: "./images/apple.png",
    season: "Early September through Early November",
    activeperiods: "Early September,Late September,Early October,Late October,Early November",
    benefits: "Apples contain pectin, a soluble fiber that lowers cholesterol and feeds beneficial gut bacteria and supports a healthy gut microbiome. They also contain various phytochemicals that benefit the immune system, support bone density, and may reduce the risk of chronic disease.", 
    recipes: [
      "Roasted apples with savory companions like chicken or pork",
      "Apple with yogurt and nut butter", 
      "Apple pie!!", 
    ],
    notes: "Although apples are harvested in the fall, they are available year-round due to controlled atmosphere storage techniques."
  },

  blackberry: {
    name: "Blackberry",
    image: "./images/blackberry.png",
    season: "Early June through Late August",
    activeperiods: "Early June,Late June,Early July,Late July,Early August,Late August",
    benefits: "Blackberries contain one of the highest antioxidant contents of any fruit, with their deep purple-black color signaling powerful compounds that fight inflammation and support brain health. Their unique balance of sweetness and tartness comes with impressive fiber content that supports digestive health and blood sugar regulation, making these juicy berries as beneficial for your body as they are delightful to your taste buds.",
    recipes: [
      "Blackberry pie", 
      "Blackberry jam (eat with yogurt or in PB&J)", 
      "Blackberry grilled cheese"
    ],
  },

  blueberry: {
    name: "Blueberry",
    image: "./images/blueberry.png",
    season: "Early April through Late June",
    activeperiods: "Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August",
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
    activeperiods: "Early January,Late January,Early October,Late October,Early November,Late November,Early December,Late December",
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
    activeperiods: "Early May,Late May,Early June,Late June,Early July",
    benefits: "Cherries contain natural melatonin that may improve sleep quality, while their potent antioxidants have been shown to reduce inflammation and speed recovery after exercise. Their deep crimson color signals abundant anthocyanins that fight oxidative stress, making these sweet little gems as beneficial for your health as they are delightful to your taste buds.",
    recipes: [
      "Cherries paired with dark chocolate", 
      "Cherry, banana, and almond butter smoothie", 

    ],
  },


  chives: {
    name: "Chives",
    image: "./images/chives.png",
    season: "Early March through Late October",
    activeperiods: "Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September,Late September,Early October,Late October",
    benefits: "Chives deliver surprisingly potent antioxidants and immune-supporting vitamin K, while their delicate onion flavor enhances dishes without overwhelming them. The are the perfect low-effort, high-impact addition to transform everyday meals into more nutritious and flavorful experiences.",
    recipes: [
      "Scrambled eggs with chives", 
      "Chive pancakes", 
      "Chive and parsley pesto"
    ],
    notes: "Large chives can be hard to find. The best bet is probably going to Asian grocery stores like Ranch 99 or Hmart."
  },

  eggplant: {
    name: "Eggplant",
    image: "./images/eggplant.png",
    season: "Early June through Late October",
    activeperiods: "Early June,Late June,Early July,Late July,Early August,Late August,Early September,Late September,Early October,Late October",
    benefits: "Eggplant's deep purple skin contains nasunin, a powerful antioxidant that specifically protects brain cell membranes from damage while supporting healthy circulation. Its meaty texture absorbs flavors beautifully while providing satisfying bulk with minimal calories, making it the perfect centerpiece for meals that keep you feeling full without weighing you down.",
    recipes: [
      "Eggplant parmesean", 
      "Chinese eggplant with garlic sauce 鱼香茄子", 
      "baba ganoush", 
      "ratatouille"
    ],
  },
  
  frisee: {
    name: "Frisée",
    image: "./images/frisee.png",
    season: "Late December to Late February",
    activeperiods: "Early January,Late January,Early February,Late February,Late December",
    benefits: "Frisée's distinctive bitter edge stimulates digestion while its feathery, pale green leaves provide folate and vitamin A that support cellular health and immune function. This elegant chicory adds sophisticated texture and flavor complexity to salads, balancing sweeter ingredients while delivering prebiotic compounds that nourish beneficial gut bacteria, making it the perfect ingredient to elevate ordinary greens into restaurant-quality dishes.",
    recipes: [
      "Warm frisée with mushroom salad", 
      "Frisée and citrus salad "
    ],
    notes: "Frisée is grown year-round in California. Shown is the peak harvest season."
  },


  kale: {
    name: "Kale",
    image: "./images/kale.png",
    season: "All year",
    activeperiods: "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September,Late September,Early October,Late October,Early November,Late November,Early December,Late December",
    benefits: "Kale delivers more nutrients per calorie than almost any other food, providing exceptional amounts of vitamins A, C, and K along with powerful antioxidants that support eye health and may help prevent chronic diseases.",
    recipes: [
      "Kale chips", 
      "Kale slaw with cabbage, carrots, and other seasonal veggies",
      "Tuscan bean and kale soup"
    ],
    notes: "Frisée is grown year-round in California. Shown is the peak harvest season."
  },

  lemon: {
    name: "Lemon",
    image: "./images/lemon.png",
    season: "Early December through Late March",
    activeperiods: "Early January,Late January,Early February,Late February,Early March,Late March,Early December,Late December",
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
    activeperiods: "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April,Early May,Late May",
    benefits: "Leeks offer a range of health benefits due to their rich nutrient profile. They are a good source of vitamins A, C, and K, and minerals like iron and magnesium. Leeks also contain dietary fiber, which supports digestive health and helps prevent constipation. Furthermore, they are rich in antioxidants like lutein and zeaxanthin, which are beneficial for eye health.", 
    recipes: [
      "Potato leek soup", 
      "Frittata with leek and asparagus and prosciutto", 
      "Caramelized leek pasta"
    ],
  },


  lychee: {
    name: "Lychee",
    image: "./images/lychee.png",
    season: "Late June through Early September",
    activeperiods: "Late June,Early July,Late July,Early August,Late August,Early September",
    benefits: "Lychees deliver an impressive amount of vitamin C wrapped in a sweet, floral flavor profile that feels truly indulgent. Their unique combination of antioxidants supports immune function and skin health, while their juicy texture and exotic taste transform ordinary moments into special treats.", 
    notes: "Although some lychee is grown in Southern California, most lychee is imported from China."
  },


  orange: {
    name: "Orange",
    image: "./images/orange.png",
    season: "Early January through Late April",
    activeperiods: "Early January,Late January,Early February,Late February,Early March,Late March,Early April,Late April",
    benefits: "Although oranges are known for their high vitamin C content, they also have other nutrients beneficial for hydration, digestion, and immune health. Additionally, they help boost collgen production, which is important for skin elasticity. In Chinese culture oranges represent properity and financial prosperity because they are brightly colored and round.", 
    recipes: [
      "Fennel orange salad",
      "Chinese chicken salad",
      "Orange, carrot, and ginger juice",
      "Orange creamsicle overnight oats",
      "Orange cardamom olive oil cake"
    ],
  },

  pea_shoot: {
    name: "Pea Shoot",
    image: "./images/pea_shoot.png",
    season: "Late February through Late April",
    activeperiods: "Late February,Early March,Late March,Early April,Late April",
    benefits: "Pea shoots deliver the concentrated nutrition of mature peas in a delicate, tender green that contains more vitamin C than blueberries and more folate than spinach. Their sweet, fresh flavor carries hints of both peas and spring itself, providing a versatile ingredient that adds both nutrition and visual elegance to everything from salads to stir-fries with minimal effort.", 
    recipes: [
      "Sir fry pea shoots with garlic", 
      "Pea shoot lemon pasta"
    ],
    notes: "Pea shoot season is frightening short. If you see them being sold, definitely take advantage of it and get yourself a bag!"
  },

  pear: {
    name: "Pear",
    image: "./images/pear.png",
    season: "Early September through Late December",
    activeperiods: "Early September,Late September,Early October,Late October,Early November,Late November,Late November,Early December,Late December",
    benefits: "With their honey-sweet flavor and uniquely satisfying texture, pears deliver soluble fiber that supports digestive health while helping manage cholesterol levels. Their high water content promotes hydration and skin health, while their portable nature makes them the perfect grab-and-go fruit for sustained energy without the crash.", 
    recipes: [
      "Pear with yogurt and nut butter", 
      "Pear and gorgonzola salad", 
      "Goat cheese and pear pizza with caramelized onion",
      "Grilled brie and pear sandwich"
    ],
    notes: "Although pears are harvested in the fall, they are available year-round due to controlled atmosphere storage techniques."
  },

  persimmon: {
    name: "Persimmon",
    image: "./images/persimmon.png",
    season: "Late September through Early December",
    activeperiods: "Late September,Early October,Late October,Early November,Late November,Early December",
    benefits: "Persimmons contain exceptional levels of antioxidants and tannins that support heart health while their natural sweetness rivals candy when fully ripened. Rich in beta-carotene that promotes eye health and healthy skin, these golden fruits deliver a unique honey-cinnamon flavor experience that changes throughout the ripening process, making them one of nature's most intriguing seasonal treasures.", 
    recipes: [
      "Persimmon bread", 
      "Salad with leafy greens, pomegranate, persimmon, and almonds"
    ],
    notes: "The most common varities are fuyu and hachiya. The fuyu (pictured) has a flat end and can be eaten when hard or soft. The hachiya has a pointy end and must be eaten when soft and ripe."
  },

  pomelo: {
    name: "Pomelo",
    image: "./images/pomelo.png",
    season: "Early January through Early April",
    activeperiods: "Early January,Late January,Early February,Late February,Early March,Late March,Early April",
    benefits: "This giant citrus fruit delivers an explosion of sweet-tart flavor while providing vitamin C, boosting immunity and collagen production for healthier skin. Pomelos contain powerful antioxidants that fight inflammation and may help reduce blood pressure, all while promoting feelings of fullness. It is very fun hold a large, round fruit and to peel off each segment and eat the juicy contents!", 
    notes: [
      "Try an oro blanco, which is a hybrid of a pomelo and grapefruit." 
    ]
  },

  pomegranate: {
    name: "Pomegranate",
    image: "./images/pomegranate.png",
    season: "Late September through Late December",
    activeperiods:  "Late September,Early October,Late October,Early November,Late November,Early December,Late December",
    benefits: "Bursting with jewel-like seeds, pomegranates deliver potent antioxidants that fight cellular damage while reducing inflammation throughout your body. Their unique combination of sweet-tart flavor and satisfying crunch makes them nature's perfect snack, while studies suggest they may improve heart health and exercise performance.", 
    recipes: [
      "Pomegranate chicken", 
      "Salad with spinach, kale, pomegranate, blue cheese, walnuts, and sweet potato", 
      "Pomegranate molasses for use in salad dressings or as a marinade for meat or tofu"
    ],
  },

  pumpkin: {
    name: "Pumpkin",
    image: "./images/pumpkin.png",
    season: "Early October through Late November",
    activeperiods:  "Early October,Late October,Early November,Late November",
    benefits: "Pumpkins are a nutritional powerhouse, particularly rich in vitamin A, vitamin C, and potassium. They also contain fiber, iron, and other beneficial nutrients. Their fun shapes, sizes, and bold colors make them very pleasing to keep around as festive decorations. And then when you're done with having them around as decorations you an eat them! How fun!", 
    recipes: [
      "Pumpkin purée that can then be made into pumpkin pie, pumpkin bread, or even pumpkin overnight oats", 
      "Roasted pumpkin with cinnamon and spices", 
      "Savory stuffed pumpkin"
    ],
    notes: "All halloween pumpkins are edible, but the sugar pie pumpkin (pictured) is the tastiest."
  },

  strawberry: {
    name: "Strawberry",
    image: "./images/strawberry.png",
    season: "Late April throgh Early July",
    activeperiods: "Early April,Late April,Early May,Late May,Early June,Late June,Early July",
    benefits: "Strawberries deliver a perfect balance of sweetness and subtle acidity that satisfies cravings naturally. Their abundant antioxidants and polyphenols support skin health, help manage blood sugar, lower inflamation, and delay age-related memory loss. Plus they're delicious and low-calorie!", 
    recipes: [
      "Strawberry banana smoothie", 
      "Salad with spinach, strawberry, feta cheese, shaved almonds", 
      "Strawberry rhubarb crisp"
    ],
  },
  tomato: {
    name: "Tomato",
    image: "./images/tomato.png",
    season: "Late May through Late September",
    activeperiods: "Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September,Late September",
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
    activeperiods: "Late May,Early June,Late June,Early July,Late July,Early August,Late August",
    benefits: "Watermelon's juicy sweetness delivers hydration and electrolytes that quench thirst more effectively than water alone, making it nature's perfect summer refresher. With its high lycopene content protecting your skin from sun damage and its natural sugars providing quick energy, this low-calorie treat satisfies sweet cravings while supporting overall health.",
    recipes: [
      "Watermelon juice with lime", 
      "Watermelon, feta, cucumuber, and mint salad", 
      "Watermelon sorbet"
    ],
  },

  yam_leaf: {
    name: "Yam Leaves",
    image: "./images/yam_leaf.png",
    season: "Early April through Late September",
    activeperiods: "Early April,Late April,Early May,Late May,Early June,Late June,Early July,Late July,Early August,Late August,Early September,Late September",
    benefits: "Yam leaves offer numerous health benefits due to their rich nutrient content, including vitamins A, B6, C, and E, as well as minerals like potassium, phosphorus, and magnesium, and even protein! Additionally, the chorophyll in green leaves boost red blood cells, help with weight loss, heal damaged skin, neutralize toxins, and so much more.",
    recipes: [
      "Stir fry yam leaves with garlic"
    ],
    notes: "Try going to farmers markets, specialty grocery stores, or Asian grocery stores to find yam leaves."
  },


  zucchini: {
    name: "Zucchini",
    image: "./images/zucchini.png",
    season: "Early June through Late August",
    activeperiods: "Early June,Late June,Early July,Late July,Early August,Late August",
    benefits: "Zucchini's high water content keeps you hydrated while its fiber promotes digestive health and sustained energy without weighing you down. This versatile summer squash absorbs flavors brilliantly while providing essential minerals like potassium and manganese that support muscle function and metabolism, all with minimal calories that fit perfectly into any healthy eating plan.",
    recipes: [
      "Baked zucchini crusted with breadcrumbs", 
       "Ratatouille", 
       "Zucchini noodles"
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
    primary: "#CB720B",      
    secondary: "#E7D5D9",    
    background: "#FFF3F0",  
    text: "#E7D5D9"          
  },
  "Winter": {
    primary: "#707BC4",      
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
  "Early March": "Winter",
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
  "Early December": "Fall",
  "Late December": "Winter"
};
