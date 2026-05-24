// Curated destinations for WanderWise (exactly 16 places, 4 per category)
const destinations = [
  // CATEGORY: Mountains (🏔️)
  {
    id: 1,
    name: "Gulmarg",
    state: "Jammu & Kashmir",
    category: "Mountains",
    description: "Snow lovers ka jannat! Yahaan ki gondola ride is world-famous, yaara! ❄️🏔️",
    cost: 18000,
    adventureLevel: 4,
    bestSeason: "December to March",
    thingsToDo: ["Skiing on powdery slopes", "Gondola cable car ride"],
    idealDays: 4,
    isTarasPick: true
  },
  {
    id: 2,
    name: "Manali",
    state: "Himachal Pradesh",
    category: "Mountains",
    description: "Dosto ke saath road trip aur Solang Valley me paragliding. Full adventure feel! 🏔️🪂",
    cost: 12000,
    adventureLevel: 4,
    bestSeason: "October to June",
    thingsToDo: ["Paragliding in Solang", "Explore Jogini Waterfalls"],
    idealDays: 5,
    isTarasPick: false
  },
  {
    id: 3,
    name: "Munnar",
    state: "Kerala",
    category: "Mountains",
    description: "Greenery aisi ki aankhein thak na jayein. Tea gardens aur badalon ka kamaal! 🍃🏔️",
    cost: 10000,
    adventureLevel: 2,
    bestSeason: "September to May",
    thingsToDo: ["Tea museum tour", "Trek to Anamudi Peak"],
    idealDays: 3,
    isTarasPick: false
  },
  {
    id: 4,
    name: "Leh-Ladakh",
    state: "Ladakh",
    category: "Mountains",
    description: "Bullet chalao aur Pangong Lake ki neeli rangat me kho jao. Dream destination! 🏍️💙",
    cost: 25000,
    adventureLevel: 5,
    bestSeason: "May to September",
    thingsToDo: ["Ride through Khardung La", "Camp near Pangong Lake"],
    idealDays: 7,
    isTarasPick: false
  },

  // CATEGORY: Beaches (🏖️)
  {
    id: 5,
    name: "Goa",
    state: "Goa",
    category: "Beaches",
    description: "Sun, sand aur shanti! Water sports se lekar night parties tak, Goa is love! 🏖️🍹",
    cost: 15000,
    adventureLevel: 3,
    bestSeason: "November to February",
    thingsToDo: ["Scuba diving in Grand Island", "Chill at Palolem Beach"],
    idealDays: 4,
    isTarasPick: true
  },
  {
    id: 6,
    name: "Havelock Island",
    state: "Andaman & Nicobar",
    category: "Beaches",
    description: "Radhanagar beach ka safed ret aur turquoise pani dekh kar khush ho jaoge! 🏝️🌊",
    cost: 30000,
    adventureLevel: 3,
    bestSeason: "October to May",
    thingsToDo: ["Snorkeling at Elephant Beach", "Kayaking in mangroves"],
    idealDays: 5,
    isTarasPick: false
  },
  {
    id: 7,
    name: "Varkala",
    state: "Kerala",
    category: "Beaches",
    description: "Unche cliffs aur beach ka aisa combination pure India me kahin nahi milega! 🌊🧗‍♂️",
    cost: 12000,
    adventureLevel: 2,
    bestSeason: "October to March",
    thingsToDo: ["Watch sunset from Cliff edge", "Try surfing at beach"],
    idealDays: 3,
    isTarasPick: false
  },
  {
    id: 8,
    name: "Gokarna",
    state: "Karnataka",
    category: "Beaches",
    description: "Goa se thoda shant, Om Beach aur beach trekking ke liye perfect spot! 🐚🏖️",
    cost: 8000,
    adventureLevel: 3,
    bestSeason: "October to March",
    thingsToDo: ["Half-moon beach trek", "Stargazing on Paradise Beach"],
    idealDays: 3,
    isTarasPick: false
  },

  // CATEGORY: Heritage Cities (🕌)
  {
    id: 9,
    name: "Jaipur",
    state: "Rajasthan",
    category: "Heritage Cities",
    description: "Hawa Mahal se lekar Amer Fort tak, Rajputana shaan aur swadist pyaaz kachori! 🕌👑",
    cost: 9000,
    adventureLevel: 1,
    bestSeason: "October to March",
    thingsToDo: ["Explore Amer Fort", "Shop in Johari Bazaar"],
    idealDays: 3,
    isTarasPick: true
  },
  {
    id: 10,
    name: "Hampi",
    state: "Karnataka",
    category: "Heritage Cities",
    description: "Patharon me chhupa itihaas aur Tungabhadra river ka suhana kinara! 🕌🧗‍♂️",
    cost: 7000,
    adventureLevel: 3,
    bestSeason: "October to February",
    thingsToDo: ["Bouldering among ruins", "Coracle ride in river"],
    idealDays: 3,
    isTarasPick: false
  },
  {
    id: 11,
    name: "Varanasi",
    state: "Uttar Pradesh",
    category: "Heritage Cities",
    description: "Ganga Aarti ki shaan aur galion ka jaadu. Sukoon aur sanskriti ek sath! 🪔🛶",
    cost: 6000,
    adventureLevel: 1,
    bestSeason: "October to March",
    thingsToDo: ["Subah-e-Banaras boat ride", "Attend Ganga Aarti at Dashashwamedh"],
    idealDays: 2,
    isTarasPick: false
  },
  {
    id: 12,
    name: "Udaipur",
    state: "Rajasthan",
    category: "Heritage Cities",
    description: "Lake Pichola ki boat ride aur palaces ki khubsoorat lights. Romanchak shehar! 🏰⛵",
    cost: 14000,
    adventureLevel: 2,
    bestSeason: "September to March",
    thingsToDo: ["Sunset cruise in Pichola", "Visit City Palace"],
    idealDays: 3,
    isTarasPick: false
  },

  // CATEGORY: Hidden Gems (💎)
  {
    id: 13,
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    category: "Hidden Gems",
    description: "Dharti ka aakhri kona! Kaza ke monasteries aur bilkul alag hi dunya! 🏔️🏜️",
    cost: 20000,
    adventureLevel: 5,
    bestSeason: "June to September",
    thingsToDo: ["Visit Key Monastery", "Drive to Hikkim post office"],
    idealDays: 6,
    isTarasPick: true
  },
  {
    id: 14,
    name: "Ziro Valley",
    state: "Arunachal Pradesh",
    category: "Hidden Gems",
    description: "Paddy fields, pine forests aur music festival. Sukoon aur sur ka milan! 🌾🎶",
    cost: 16000,
    adventureLevel: 3,
    bestSeason: "October to April",
    thingsToDo: ["Trek to Dolo Mando", "Interact with Apatani tribe"],
    idealDays: 4,
    isTarasPick: false
  },
  {
    id: 15,
    name: "Mawlynnong",
    state: "Meghalaya",
    category: "Hidden Gems",
    description: "Asia's cleanest village! Living Root Bridges aur Meghalaya ki barish! 🌳💧",
    cost: 11000,
    adventureLevel: 3,
    bestSeason: "September to May",
    thingsToDo: ["Walk on Living Root Bridge", "Climb Sky View bamboo tower"],
    idealDays: 3,
    isTarasPick: false
  },
  {
    id: 16,
    name: "Gandikota",
    state: "Andhra Pradesh",
    category: "Hidden Gems",
    description: "Grand Canyon of India! Penna River Gorge ke unche unche lal pathar! 🏜️🧗‍♂️",
    cost: 6500,
    adventureLevel: 3,
    bestSeason: "September to February",
    thingsToDo: ["Camp on Gorge edge", "Explore Gandikota Fort"],
    idealDays: 2,
    isTarasPick: false
  }
];

module.exports = destinations;
