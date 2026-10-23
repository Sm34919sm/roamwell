/* Destination facts and approximate INR unit costs used by the planner. */
window.ROAMWELL_DESTINATIONS = [
  {
    id: "goa", name: "Goa", state: "Goa", region: "Coast", style: "beach", theme: "coast",
    styles: ["beach", "adventure", "city"], icon: "☼", color: "goa",
    summary: "Choose a quieter stretch of shoreline, then follow the day wherever it takes you.",
    highlights: ["South Goa beaches", "Portuguese-era lanes", "Fresh seafood"],
    bestSeason: "November–February", idealDuration: "3–4 days", area: "South Goa & Panaji",
    meals: ["Goan fish curry rice", "Prawn balchão", "Bebinca"],
    costs: {
      budget: { transport: 2600, local: 450, stay: 1800, food: 700, activities: 350 },
      standard: { transport: 4800, local: 800, stay: 4600, food: 1500, activities: 900 },
      premium: { transport: 9200, local: 1500, stay: 10500, food: 2900, activities: 1900 }
    }
  },
  {
    id: "gokarna", name: "Gokarna", state: "Karnataka", region: "Coast", style: "beach", theme: "coast",
    styles: ["beach", "spiritual", "adventure"], icon: "⌁", color: "gokarna",
    summary: "A gentle coastal escape with temple-town charm and scenic footpaths between beaches.",
    highlights: ["Om Beach", "Kudle sunset", "Mahabaleshwar Temple"],
    bestSeason: "October–March", idealDuration: "3 days", area: "Gokarna town & Kudle",
    meals: ["Karnataka-style meals", "Neer dosa", "Coconut fish curry"],
    costs: {
      budget: { transport: 2200, local: 350, stay: 1400, food: 550, activities: 250 },
      standard: { transport: 4200, local: 650, stay: 3600, food: 1150, activities: 700 },
      premium: { transport: 7800, local: 1200, stay: 8200, food: 2300, activities: 1500 }
    }
  },
  {
    id: "varkala", name: "Varkala", state: "Kerala", region: "Coast", style: "beach", theme: "coast",
    styles: ["beach", "spiritual", "relaxation"], icon: "◡", color: "varkala",
    summary: "Clifftop cafés, a long Arabian Sea horizon, and enough space to slow right down.",
    highlights: ["Varkala Cliff", "Papanasam Beach", "Janardanaswamy Temple"],
    bestSeason: "October–March", idealDuration: "3–4 days", area: "North Cliff & Varkala town",
    meals: ["Kerala sadya", "Appam with stew", "Karimeen pollichathu"],
    costs: {
      budget: { transport: 3000, local: 350, stay: 1600, food: 600, activities: 250 },
      standard: { transport: 5200, local: 700, stay: 4200, food: 1300, activities: 750 },
      premium: { transport: 9800, local: 1300, stay: 9200, food: 2500, activities: 1600 }
    }
  },
  {
    id: "manali", name: "Manali", state: "Himachal Pradesh", region: "Himalayas", style: "hills", theme: "hills",
    styles: ["hills", "adventure", "wildlife"], icon: "△", color: "manali",
    summary: "Pine-scented walks, old-town cafés, and mountain views at every turn.",
    highlights: ["Old Manali", "Solang Valley", "Hadimba Temple"],
    bestSeason: "March–June & September–November", idealDuration: "4 days", area: "Old Manali & central Manali",
    meals: ["Siddu with ghee", "Himachali dham", "Trout when available"],
    costs: {
      budget: { transport: 3600, local: 500, stay: 1700, food: 650, activities: 450 },
      standard: { transport: 6800, local: 900, stay: 4800, food: 1450, activities: 1200 },
      premium: { transport: 12500, local: 1800, stay: 11800, food: 3100, activities: 2800 }
    }
  },
  {
    id: "munnar", name: "Munnar", state: "Kerala", region: "Western Ghats", style: "hills", theme: "hills",
    styles: ["hills", "wildlife", "relaxation"], icon: "♧", color: "munnar",
    summary: "Tea country mornings, cool air, and green hills made for taking the long way.",
    highlights: ["Tea gardens", "Eravikulam National Park", "Mattupetty Dam"],
    bestSeason: "September–March", idealDuration: "3–4 days", area: "Munnar town & tea country",
    meals: ["Appam and vegetable stew", "Kerala parotta", "Cardamom tea"],
    costs: {
      budget: { transport: 3200, local: 500, stay: 1800, food: 650, activities: 400 },
      standard: { transport: 5900, local: 950, stay: 5100, food: 1450, activities: 1000 },
      premium: { transport: 10800, local: 1700, stay: 12200, food: 3000, activities: 2300 }
    }
  },
  {
    id: "rishikesh", name: "Rishikesh", state: "Uttarakhand", region: "Himalayas", style: "hills", theme: "hills",
    styles: ["hills", "adventure", "spiritual"], icon: "⌁", color: "rishikesh",
    summary: "Riverside mornings, forested foothills, and a town that invites you to find your own pace.",
    highlights: ["Ganga aarti", "Ram Jhula", "Riverside trails"],
    bestSeason: "February–April & September–November", idealDuration: "3–4 days", area: "Tapovan & central Rishikesh",
    meals: ["Aloo puri", "Pahadi thali", "Fresh lassi"],
    costs: {
      budget: { transport: 2400, local: 400, stay: 1500, food: 550, activities: 500 },
      standard: { transport: 4800, local: 750, stay: 4300, food: 1250, activities: 1400 },
      premium: { transport: 9200, local: 1400, stay: 10200, food: 2700, activities: 3200 }
    }
  },
  {
    id: "jaipur", name: "Jaipur", state: "Rajasthan", region: "Rajasthan", style: "heritage", theme: "heritage",
    styles: ["heritage", "city", "shopping"], icon: "▤", color: "jaipur",
    summary: "Pink-hued streets, beautiful courtyards, and a lively craft and food scene.",
    highlights: ["Amber Fort", "Hawa Mahal", "Old City bazaars"],
    bestSeason: "October–March", idealDuration: "3–4 days", area: "Pink City & Bani Park",
    meals: ["Dal baati churma", "Pyaaz kachori", "Ghewar"],
    costs: {
      budget: { transport: 2400, local: 450, stay: 1600, food: 600, activities: 400 },
      standard: { transport: 4500, local: 850, stay: 4400, food: 1350, activities: 950 },
      premium: { transport: 8500, local: 1600, stay: 11000, food: 2900, activities: 2200 }
    }
  },
  {
    id: "kaziranga", name: "Kaziranga", state: "Assam", region: "Brahmaputra Valley", style: "wildlife", theme: "wildlife",
    styles: ["wildlife", "adventure", "nature"], icon: "♧", color: "kaziranga",
    summary: "Wide grasslands, river country, and a memorable chance to experience Assam’s wildlife.",
    highlights: ["Kaziranga National Park", "Brahmaputra landscapes", "Assam tea"],
    bestSeason: "November–April", idealDuration: "3–4 days", area: "Kohora (Central Range)",
    meals: ["Assamese thali", "Masor tenga", "Pitha"],
    costs: {
      budget: { transport: 4200, local: 550, stay: 1900, food: 700, activities: 1100 },
      standard: { transport: 7800, local: 1000, stay: 5400, food: 1500, activities: 2300 },
      premium: { transport: 14500, local: 1900, stay: 12800, food: 3200, activities: 4600 }
    }
  },
  {
    id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", region: "Ganges Plain", style: "spiritual", theme: "spiritual",
    styles: ["spiritual", "heritage", "food"], icon: "☼", color: "varanasi",
    summary: "A city of riverfront mornings, living traditions, and lanes layered with history.",
    highlights: ["Ganga ghats", "Sarnath", "Old City lanes"],
    bestSeason: "October–March", idealDuration: "3 days", area: "Assi Ghat & central Varanasi",
    meals: ["Kachori sabzi", "Tamatar chaat", "Malaiyyo (in season)"],
    costs: {
      budget: { transport: 2600, local: 400, stay: 1500, food: 550, activities: 350 },
      standard: { transport: 4800, local: 750, stay: 4100, food: 1250, activities: 850 },
      premium: { transport: 9000, local: 1400, stay: 9900, food: 2700, activities: 1900 }
    }
  },
  {
    id: "mumbai", name: "Mumbai", state: "Maharashtra", region: "Konkan Coast", style: "city", theme: "city",
    styles: ["city", "heritage", "food", "shopping"], icon: "⌂", color: "mumbai",
    photo: { src: "./assets/destinations/mumbai.jpg", alt: "Marine Drive and Mumbai's waterfront at dusk", credit: "A. Savin", source: "https://commons.wikimedia.org/wiki/File:Mumbai_03-2016_46_evening_at_Marine_Drive.jpg", license: "Free Art License" },
    summary: "Sea-facing promenades, Art Deco streets, neighborhood cafés, and late-night energy.",
    highlights: ["Marine Drive", "Kala Ghoda", "Colaba Causeway"],
    bestSeason: "November–February", idealDuration: "3 days", area: "Fort, Colaba & South Mumbai",
    meals: ["Vada pav", "Pav bhaji", "Bombay sandwich"],
    dayTitles: ["Fort & Colaba heritage loop", "CSMT to Churchgate", "A relaxed Juhu day"],
    dayAreas: ["Fort and Colaba", "CSMT, Dhobi Talao and Churchgate", "Juhu"],
    dayTravel: ["Mostly walkable; allow 15–25 minutes between stops", "Short city transfers; check live traffic", "Short local transfers within Juhu"],
    dayModes: ["walking", "driving", "driving"],
    mealOptions: {
      breakfast: { veg: "Poha, idli or vada pav", nonveg: "Egg bhurji pav or an omelette" },
      lunch: { veg: "Pav bhaji or a Maharashtrian veg thali", nonveg: "Bombay fish thali or chicken thali" },
      dinner: { veg: "Veg pulao or paneer curry", nonveg: "Bombay duck fry or chicken curry" }
    },
    hotels: [
      ["The Taj Mahal Palace", "Apollo Bunder, Colaba"],
      ["The Oberoi Mumbai", "Nariman Point"],
      ["Trident, Nariman Point", "Nariman Point"],
      ["Taj Lands End", "Bandra West"],
      ["ITC Maratha", "Sahar, Andheri East"]
    ],
    stops: [
      ["Gateway of India", "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001", "1–1.5 hours", ["Heritage", "Photography"], 0],
      ["Chhatrapati Shivaji Maharaj Vastu Sangrahalaya", "159–161 Mahatma Gandhi Road, Fort, Mumbai, Maharashtra 400023", "2–3 hours", ["Heritage"], 0],
      ["Kala Ghoda Art Precinct", "Kala Ghoda, Fort, Mumbai, Maharashtra 400001", "1–2 hours", ["Heritage", "Shopping"], 0],
      ["Chhatrapati Shivaji Maharaj Terminus", "DN Road, Fort, Mumbai, Maharashtra 400001", "45–60 minutes", ["Heritage", "Photography"], 1],
      ["Crawford Market", "Mohammed Ali Road, Dhobi Talao, Mumbai, Maharashtra 400001", "1–1.5 hours", ["Shopping", "Food"], 1],
      ["Marine Drive promenade", "Netaji Subhash Chandra Bose Road, Churchgate, Mumbai, Maharashtra 400020", "1–1.5 hours", ["Relaxation", "Photography"], 1],
      ["Juhu Beach", "Juhu Tara Road, Juhu, Mumbai, Maharashtra 400049", "1–1.5 hours", ["Food", "Relaxation"], 2],
      ["Prithvi Theatre", "20 Janki Kutir, Juhu, Mumbai, Maharashtra 400049", "1–1.5 hours", ["Heritage", "Food"], 2],
      ["ISKCON Temple Juhu", "Hare Krishna Land, Juhu, Mumbai, Maharashtra 400049", "1–1.5 hours", ["Spiritual", "Heritage"], 2]
    ],
    costs: {
      budget: { transport: 1800, local: 450, stay: 2200, food: 700, activities: 400 },
      standard: { transport: 3500, local: 850, stay: 6200, food: 1600, activities: 1000 },
      premium: { transport: 6800, local: 1700, stay: 14800, food: 3400, activities: 2400 }
    }
  },
  {
    id: "pune", name: "Pune", state: "Maharashtra", region: "Western Maharashtra", style: "heritage", theme: "city",
    styles: ["city", "heritage", "spiritual"], icon: "▤", color: "mumbai",
    photo: { src: "./assets/destinations/pune.jpg", alt: "Stone gateway and facade of Shaniwar Wada in Pune", credit: "Samrudhi shelagaonkar", source: "https://commons.wikimedia.org/wiki/File:Shaniwar_wada_(pune).jpg", license: "CC BY-SA 4.0" },
    summary: "A compact heritage escape through old peths, hilltop views, and Pune’s lively food streets.",
    highlights: ["Shaniwar Wada", "Aga Khan Palace", "Raja Dinkar Kelkar Museum"],
    bestSeason: "October–February", idealDuration: "1–3 days", area: "Shivajinagar & central Pune",
    meals: ["Misal pav", "Mastani", "Bhakri thali"],
    dayTitles: ["Pune’s old-city walking loop", "Sinhagad road & southern Pune", "Koregaon Park & the river"],
    dayAreas: ["Shaniwar Wada and the old peths", "Sinhagad road and Parvati", "Koregaon Park and Bund Garden"],
    dayTravel: ["Short walks between old-city stops", "Start early for the fort; return toward central Pune", "Short local transfers in east Pune"],
    dayModes: ["walking", "driving", "driving"],
    mealOptions: {
      breakfast: { veg: "Kanda poha or misal pav", nonveg: "Egg bhurji pav or an omelette" },
      lunch: { veg: "Pithla-bhakri or a Maharashtrian veg thali", nonveg: "Chicken thali or mutton thali" },
      dinner: { veg: "Bharli vangi with bhakri", nonveg: "Kolhapuri-style chicken or mutton" }
    },
    hotels: [
      ["Conrad Pune", "Mangaldas Road, Koregaon Park"],
      ["The Ritz-Carlton, Pune", "Yerawada"],
      ["JW Marriott Pune", "Senapati Bapat Road"],
      ["Sheraton Grand Pune Bund Garden Hotel", "Bund Garden Road"],
      ["Hyatt Regency Pune", "Nagar Road, Viman Nagar"]
    ],
    stops: [
      ["Shaniwar Wada", "Shaniwar Peth, Pune, Maharashtra 411030", "1.5–2 hours", ["Heritage", "Photography"], 0],
      ["Dagdusheth Halwai Ganpati Temple", "Budhwar Peth, Pune, Maharashtra 411002", "45–60 minutes", ["Heritage", "Spiritual"], 0],
      ["Raja Dinkar Kelkar Museum", "Bajirao Road, Shukrawar Peth, Pune, Maharashtra 411002", "1.5–2 hours", ["Heritage"], 0],
      ["Sinhagad Fort", "Sinhagad Ghat Road, Thoptewadi, Pune district, Maharashtra 411025", "3–4 hours", ["Adventure", "Photography"], 1],
      ["Parvati Hill", "Parvati Paytha, Pune, Maharashtra 411009", "1.5–2 hours", ["Photography", "Spiritual"], 1],
      ["Saras Baug", "Saras Baug Road, Pune, Maharashtra 411030", "1–1.5 hours", ["Relaxation"], 1],
      ["Aga Khan Palace", "Nagar Road, Kalyani Nagar, Pune, Maharashtra 411006", "1.5–2 hours", ["Heritage", "Photography"], 2],
      ["Osho Garden", "Lane 1, Koregaon Park, Pune, Maharashtra 411001", "45–60 minutes", ["Relaxation", "Photography"], 2],
      ["Bund Garden", "Bund Garden Road, Sangamvadi, Pune, Maharashtra 411001", "45–60 minutes", ["Relaxation", "Photography"], 2]
    ],
    costs: {
      budget: { transport: 900, local: 350, stay: 1500, food: 550, activities: 250 },
      standard: { transport: 1800, local: 650, stay: 4200, food: 1200, activities: 650 },
      premium: { transport: 3600, local: 1300, stay: 9800, food: 2600, activities: 1600 }
    }
  },
  {
    id: "lonavala", name: "Lonavala", state: "Maharashtra", region: "Sahyadri Hills", style: "hills", theme: "hills",
    styles: ["hills", "adventure"], icon: "△", color: "munnar",
    photo: { src: "./assets/destinations/lonavala.jpg", alt: "Green hills and a valley along the road to Lonavala", credit: "Neerajks7690", source: "https://commons.wikimedia.org/wiki/File:Pune_to_lonavala_scenic_beauty.jpg", license: "CC BY-SA 4.0" },
    summary: "Waterfalls, hill forts, and big Sahyadri views on an easy-paced hill-country break.",
    highlights: ["Karla Caves", "Lohagad Fort", "Tiger’s Leap"],
    bestSeason: "June–February", idealDuration: "1–3 days", area: "Lonavala town & Malavli",
    meals: ["Chikki", "Misal pav", "Corn bhutta"],
    dayTitles: ["Karla caves & temple", "Malavli caves & fort trail", "Khandala viewpoints loop"],
    dayAreas: ["Karla", "Bhaja and Lohagadwadi, Malavli", "Khandala and the western viewpoints"],
    dayTravel: ["Karla Caves and the temple share the same access road", "Short transfers around Malavli; allow extra time for the fort hike", "Follow the same Khandala-Lonavala ridge road; check weather and traffic"],
    dayModes: ["walking", "driving", "driving"],
    mealOptions: {
      breakfast: { veg: "Poha, upma or misal pav", nonveg: "Omelette pav or egg bhurji" },
      lunch: { veg: "Maharashtrian veg thali", nonveg: "Chicken thali with bhakri" },
      dinner: { veg: "Pithla-bhakri or seasonal vegetables", nonveg: "Chicken curry with bhakri" }
    },
    hotels: [
      ["Fariyas Resort Lonavala", "Frichley Hill Road"],
      ["Della Resorts", "Kunegaon"],
      ["Rhythm Lonavala", "Tungarli"],
      ["The Machan", "Atvan, near Lonavala"],
      ["Upper Deck Resort", "Kune Village"]
    ],
    stops: [
      ["Karla Caves", "Karla, Lonavala, Pune district, Maharashtra 410405", "1.5–2 hours", ["Heritage", "Photography"], 0],
      ["Ekvira Devi Temple", "Karla Caves Road, Karla, Pune district, Maharashtra 410405", "45–60 minutes", ["Spiritual", "Heritage"], 0],
      ["Bhaja Caves", "Bhaja village, Malavli, Pune district, Maharashtra 410405", "1.5–2 hours", ["Heritage", "Photography"], 1],
      ["Lohagad Fort", "Lohagadwadi, Malavli, Pune district, Maharashtra 410406", "3–4 hours", ["Adventure", "Photography"], 1],
      ["Tiger’s Leap viewpoint", "Khandala, Lonavala, Pune district, Maharashtra 410301", "45–60 minutes", ["Photography"], 2],
      ["Lion’s Point", "Aamby Valley Road, Lonavala, Pune district, Maharashtra 410401", "1–1.5 hours", ["Photography"], 2],
      ["Bhushi Dam", "I.N.S. Shivaji Road, Lonavala, Pune district, Maharashtra 410401", "1–1.5 hours", ["Relaxation", "Photography"], 2]
    ],
    costs: {
      budget: { transport: 1100, local: 400, stay: 1600, food: 550, activities: 300 },
      standard: { transport: 2300, local: 750, stay: 4500, food: 1250, activities: 800 },
      premium: { transport: 4800, local: 1500, stay: 10500, food: 2800, activities: 1900 }
    }
  },
  {
    id: "mahabaleshwar", name: "Mahabaleshwar", state: "Maharashtra", region: "Sahyadri Hills", style: "hills", theme: "hills",
    styles: ["hills", "adventure"], icon: "♧", color: "munnar",
    photo: { src: "./assets/destinations/mahabaleshwar.jpg", alt: "A broad view across the Mahabaleshwar valley", credit: "Aalokmjoshi", source: "https://commons.wikimedia.org/wiki/File:Mahabaleshwar_valley.jpg", license: "CC BY-SA 4.0" },
    summary: "Forest roads, strawberry country, and breezy viewpoints above the Krishna valley.",
    highlights: ["Venna Lake", "Arthur’s Seat", "Pratapgad Fort"],
    bestSeason: "October–June", idealDuration: "1–3 days", area: "Mahabaleshwar market & old town",
    meals: ["Strawberries and cream", "Maharashtrian thali", "Corn patties"],
    dayTitles: ["Lake, sunrise point & old town", "Arthur’s Seat & the southern fort road", "Panchgani viewpoints & market"],
    dayAreas: ["Venna Lake, Wilson Point and old Mahabaleshwar", "Arthur’s Seat and Pratapgad road", "Gureghar and Panchgani"],
    dayTravel: ["Short local transfers around Mahabaleshwar town", "A single southbound scenic drive; allow extra time for Pratapgad", "Follow the same Panchgani road corridor"],
    dayModes: ["driving", "driving", "driving"],
    mealOptions: {
      breakfast: { veg: "Poha, upma or sabudana khichdi", nonveg: "Egg bhurji or an omelette" },
      lunch: { veg: "Maharashtrian veg thali", nonveg: "Chicken thali with bhakri" },
      dinner: { veg: "Bhakri with seasonal vegetables", nonveg: "Mutton thali or chicken curry" }
    },
    hotels: [
      ["Le Méridien Mahabaleshwar Resort & Spa", "Panchgani-Mahabaleshwar Road"],
      ["Evershine Resort & Spa", "C.T.S. No. 182, Mahabaleshwar"],
      ["Brightland Resort & Spa", "Kates Point Road"],
      ["Ramsukh Resorts & Spa", "Old Mahabaleshwar Road"],
      ["Regenta MPG Club", "Mahabaleshwar market area"]
    ],
    stops: [
      ["Wilson Point (Sunrise Point)", "Mahabaleshwar, Satara district, Maharashtra 412806", "45–60 minutes", ["Photography"], 0],
      ["Venna Lake", "Panchgani–Mahabaleshwar Road, Mahabaleshwar, Maharashtra 412806", "1.5–2 hours", ["Relaxation", "Kids-friendly"], 0],
      ["Old Mahabaleshwar temples", "Old Mahabaleshwar, Satara district, Maharashtra 412806", "1–1.5 hours", ["Heritage", "Spiritual"], 0],
      ["Arthur’s Seat", "Arthur’s Seat Road, Mahabaleshwar, Maharashtra 412806", "1–1.5 hours", ["Adventure", "Photography"], 1],
      ["Pratapgad Fort", "Pratapgad, Mahabaleshwar, Satara district, Maharashtra 412806", "2.5–3.5 hours", ["Heritage", "Adventure"], 1],
      ["Mapro Garden", "Panchgani–Mahabaleshwar Road, Gureghar, Maharashtra 412805", "1–1.5 hours", ["Food", "Shopping"], 2],
      ["Table Land", "Table Land Road, Panchgani, Satara district, Maharashtra 412805", "1.5–2 hours", ["Photography", "Relaxation"], 2],
      ["Panchgani market", "Main Road, Panchgani, Satara district, Maharashtra 412805", "1–1.5 hours", ["Food", "Shopping"], 2]
    ],
    costs: {
      budget: { transport: 1800, local: 500, stay: 1800, food: 600, activities: 350 },
      standard: { transport: 3400, local: 900, stay: 5200, food: 1400, activities: 900 },
      premium: { transport: 6500, local: 1800, stay: 12500, food: 3000, activities: 2200 }
    }
  },
  {
    id: "nashik", name: "Nashik", state: "Maharashtra", region: "North Maharashtra", style: "heritage", theme: "heritage",
    styles: ["heritage", "spiritual"], icon: "☼", color: "goa",
    photo: { src: "./assets/destinations/nashik.jpg", alt: "Rows of green vines at Sula Vineyards near Nashik", credit: "Wikieditor11221", source: "https://commons.wikimedia.org/wiki/File:Sula_Vineyards_in_Nashik.jpg", license: "CC BY-SA 4.0" },
    summary: "Sacred riverfronts, cave-carved history, and vineyards set among the hills.",
    highlights: ["Panchavati & Ramkund", "Pandavleni Caves", "Sula Vineyards"],
    bestSeason: "October–February", idealDuration: "1–3 days", area: "Panchavati & central Nashik",
    meals: ["Misal pav", "Maharashtrian thali", "Sabudana khichdi"],
    dayTitles: ["Panchavati heritage walk", "Caves to Trimbakeshwar", "Someshwar & vineyard country"],
    dayAreas: ["Panchavati and the Godavari riverfront", "Pandavleni and the Nashik-Trimbak road", "Gangapur Road and the vineyards"],
    dayTravel: ["Walk between the Panchavati stops", "A westbound drive; confirm traffic and temple queues", "Short local transfers around Gangapur Road"],
    dayModes: ["walking", "driving", "driving"],
    mealOptions: {
      breakfast: { veg: "Misal pav or poha", nonveg: "Egg bhurji pav or an omelette" },
      lunch: { veg: "Maharashtrian veg thali", nonveg: "Chicken or mutton thali" },
      dinner: { veg: "Varan-bhaat with seasonal vegetables", nonveg: "Khandeshi chicken curry" }
    },
    hotels: [
      ["Radisson Blu Hotel & Spa, Nashik", "Pathardi Phata"],
      ["Courtyard by Marriott Nashik", "Mumbai-Agra Road"],
      ["The Source at Sula", "Gat 36/2, Govardhan village"],
      ["Beyond by Sula", "Gangapur-Savargaon Road"],
      ["Express Inn Nashik", "Pathardi Phata"]
    ],
    stops: [
      ["Ramkund", "Panchavati, Nashik, Maharashtra 422003", "1–1.5 hours", ["Spiritual", "Photography"], 0],
      ["Kalaram Temple", "Panchavati, Nashik, Maharashtra 422003", "45–60 minutes", ["Spiritual", "Heritage"], 0],
      ["Sita Gufa", "Panchavati, Nashik, Maharashtra 422003", "30–45 minutes", ["Spiritual", "Heritage"], 0],
      ["Pandavleni Caves", "Mumbai–Agra Road, Pathardi Phata, Nashik, Maharashtra 422010", "1.5–2 hours", ["Heritage", "Adventure"], 1],
      ["Coin Museum", "Anjaneri, Nashik–Trimbak Road, Nashik, Maharashtra 422213", "1–1.5 hours", ["Heritage"], 1],
      ["Trimbakeshwar Shiva Temple", "Trimbak, Nashik district, Maharashtra 422212", "1.5–2 hours", ["Spiritual", "Heritage"], 1],
      ["Someshwar Waterfall & temple", "Gangapur Road, Someshwar, Nashik, Maharashtra 422222", "1–1.5 hours", ["Relaxation", "Spiritual"], 2],
      ["Sula Vineyards", "Gat 36/2, Govardhan village, Nashik, Maharashtra 422222", "2–3 hours", ["Food", "Photography"], 2],
      ["Gangapur Dam", "Gangapur Dam Road, Nashik, Maharashtra 422222", "45–60 minutes", ["Relaxation", "Photography"], 2]
    ],
    costs: {
      budget: { transport: 1500, local: 400, stay: 1600, food: 550, activities: 350 },
      standard: { transport: 2800, local: 800, stay: 4600, food: 1250, activities: 950 },
      premium: { transport: 5600, local: 1600, stay: 11000, food: 2800, activities: 2300 }
    }
  },
  {
    id: "alibaug", name: "Alibaug", state: "Maharashtra", region: "Konkan Coast", style: "beach", theme: "coast",
    styles: ["beach", "heritage"], icon: "⌁", color: "goa",
    photo: { src: "./assets/destinations/alibaug.jpg", alt: "Sunset over Alibaug Beach on the Konkan coast", credit: "Rishi Darak", source: "https://commons.wikimedia.org/wiki/File:Alibaug_Beach.jpg", license: "CC BY-SA 4.0" },
    summary: "A breezy Konkan break with a sea fort, coconut-lined beaches, and coastal food.",
    highlights: ["Kolaba Fort", "Alibaug Beach", "Kihim Beach"],
    bestSeason: "November–February", idealDuration: "1–3 days", area: "Alibaug town & nearby beaches",
    meals: ["Konkani fish thali", "Sol kadhi", "Ukadiche modak"],
    dayTitles: ["Alibaug town & the sea fort", "Kihim and the north-coast loop", "Southbound Konkan coast"],
    dayAreas: ["Alibaug Beach and the town centre", "Kihim, Kanakeshwar and Varsoli", "Nagaon, Revdanda and Kashid"],
    dayTravel: ["Walkable town loop; check Kolaba Fort tide and ferry access", "A compact north-coast drive; check the temple trail conditions", "Follow the coast south and allow extra drive time between beaches"],
    dayModes: ["walking", "driving", "driving"],
    mealOptions: {
      breakfast: { veg: "Ghavan, poha or upma", nonveg: "Egg bhurji pav or an omelette" },
      lunch: { veg: "Konkani veg thali with sol kadhi", nonveg: "Local fish thali with rice" },
      dinner: { veg: "Seasonal veg thali or ukadiche modak", nonveg: "Konkani fish curry with rice" }
    },
    hotels: [
      ["Radisson Blu Resort & Spa Alibaug", "Gondhalpada, Alibaug"],
      ["U Tropicana Alibaug", "Chondi, Nagaon"],
      ["Outpost Alibaug", "Zirad, Alibaug"],
      ["SaffronStays Amolee", "Awas, Alibaug"],
      ["Mango Beach House", "Alibaug"]
    ],
    stops: [
      ["Kolaba Fort", "Off Alibaug Beach, Alibaug, Raigad district, Maharashtra 402201", "1.5–2 hours", ["Heritage", "Photography"], 0],
      ["Alibaug Beach", "Alibaug Beach Road, Alibaug, Raigad district, Maharashtra 402201", "1–1.5 hours", ["Relaxation", "Photography"], 0],
      ["Alibaug local market", "Main Road, Alibaug, Raigad district, Maharashtra 402201", "1–1.5 hours", ["Food", "Shopping"], 0],
      ["Kihim Beach", "Kihim, Alibaug, Raigad district, Maharashtra 402201", "1.5–2 hours", ["Relaxation", "Photography"], 1],
      ["Kanakeshwar Forest & Temple", "Mapgaon, Alibaug, Raigad district, Maharashtra 402201", "2.5–3.5 hours", ["Adventure", "Spiritual"], 1],
      ["Varsoli Beach", "Varsoli, Alibaug, Raigad district, Maharashtra 402201", "1–1.5 hours", ["Relaxation"], 1],
      ["Nagaon Beach", "Nagaon, Alibaug, Raigad district, Maharashtra 402204", "1.5–2 hours", ["Relaxation", "Kids-friendly"], 2],
      ["Revdanda Fort", "Revdanda, Alibaug, Raigad district, Maharashtra 402202", "1–1.5 hours", ["Heritage", "Photography"], 2],
      ["Kashid Beach", "Kashid, Murud, Raigad district, Maharashtra 402401", "2–3 hours", ["Relaxation", "Photography"], 2]
    ],
    costs: {
      budget: { transport: 1300, local: 400, stay: 1700, food: 600, activities: 300 },
      standard: { transport: 2600, local: 750, stay: 4700, food: 1350, activities: 800 },
      premium: { transport: 5200, local: 1500, stay: 11200, food: 2900, activities: 1900 }
    }
  }
].filter((destination) => destination.state === "Maharashtra");
