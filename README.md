# ✈️ WanderWise — Your AI-Powered Travel Discovery Guide

> *Duniya Dekhni Hai? Chalo Shuru Karte Hain!*

**WanderWise** is a beautifully crafted Indian travel discovery platform powered by an AI travel companion named **Tara**. Speak in Hinglish, get personalized travel recommendations, and explore 16 stunning destinations across India with an intelligent conversational guide.

---

## 🌟 Key Features

- 🤖 **Tara AI Guide** — A warm, friendly conversational travel assistant speaking natural Hinglish (Roman script)
- 🗺️ **16 Curated Destinations** — Handpicked across 4 categories with adventure levels, costs, and seasonal guides
- 📱 **Fully Responsive Design** — Beautiful single-page application optimized for desktop, tablet, and mobile
- 💬 **Real-time Streaming Chat** — Word-by-word AI responses powered by Google Gemini 2.5 Flash Lite with conversation memory
- 🎨 **Premium UI/UX** — Magazine-style layouts with CSS animations, floating paper planes, spinning compass, and smooth transitions
- 🎵 **Ambient Audio** — Synthesized ocean waves with Web Audio API, mute/unmute toggle
- 🚀 **Modern Cloud Architecture** — Frontend on GitHub Pages, Backend on Render, powered by Google Gemini AI
- ⚡ **No Build Tools** — Vanilla HTML5, CSS3, and JavaScript — pure simplicity and speed

---

## 🚀 Live Demo

| Component | URL |
|-----------|-----|
| **🌐 Frontend Website** | [WanderWise Live](https://cdasadiya.github.io/wanderwise/) |
| **📡 Backend API** | [API Server](https://ai-engineering-ieau.onrender.com) |
| **📦 GitHub Repository** | [cdasadiya/wanderwise](https://github.com/cdasadiya/wanderwise) |

> **Note:** The backend runs on Render's free tier and may take 30 seconds to wake up after inactivity.

---

## 📋 Tech Stack

### Frontend
- **HTML5** — Semantic markup with accessibility best practices
- **CSS3** — Custom properties (CSS variables), animations, flexbox, CSS Grid
- **Vanilla JavaScript (ES6+)** — No frameworks, lightweight and blazing fast
- **Web Audio API** — Synthesized ambient ocean sounds (no external audio files)
- **Deployed on** — GitHub Pages (free, instant updates)

### Backend
- **Node.js + Express.js** — Lightweight REST API with minimal dependencies
- **Google Gemini 2.5 Flash Lite API** — Advanced conversational AI with streaming support
- **CORS & dotenv** — Secure configuration and cross-origin requests
- **Deployed on** — Render (automatic CI/CD from GitHub)

### Design & Architecture
- **Premium UI** — Custom color palette (sky blue, sunset orange, sand beige, ocean teal)
- **Responsive Grid System** — Auto-fill grid for destination cards
- **Smooth Animations** — Keyframe animations, transitions, and interactive effects
- **Image CDN** — Unsplash API for high-quality destination photography

---

## 🎯 Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **npm** package manager
- **Google Gemini API Key** (free from [AI Studio](https://aistudio.google.com/app/apikey))
- A code editor (VS Code recommended)

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/cdasadiya/wanderwise.git
cd wanderwise
```

#### 2. Setup Backend Server

```bash
cd wanderwise/server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your GEMINI_API_KEY
# GEMINI_API_KEY=your_actual_key_here

# Start backend server
npm start
# Server runs on http://localhost:3001
```

#### 3. Open Frontend in Browser

```bash
# In a new terminal, from the project root
cd wanderwise/website

# Option 1: Open index.html directly in your browser
# Just double-click wanderwise/website/index.html

# Option 2: Start a local HTTP server (recommended for testing)
npx http-server
# Visit http://localhost:8080
```

#### 4. Test the Application
- Visit the frontend URL in your browser
- Click "START EXPLORING" to see paper planes animation
- Browse destinations and filter by category
- Click the floating "Talk to Tara" button and ask travel questions in English or Hinglish
- Try quick-reply chips: "Best place for monsoon?", "Budget-friendly trips?", "Honeymoon destinations?", "Adventure spots?"

---

## 🗂️ Project Structure

```
wanderwise/
│
├── wanderwise/
│   │
│   ├── website/                          ← Frontend (Static HTML/CSS/JS)
│   │   ├── index.html                    ← Main page (semantic HTML5)
│   │   ├── style.css                     ← All styling (CSS custom properties, animations)
│   │   ├── script.js                     ← Client-side logic (19KB, modular functions)
│   │   └── [Unsplash images]             ← Dynamically loaded via CDN
│   │
│   ├── server/                           ← Backend (Node.js + Express)
│   │   ├── server.js                     ← Express app, API routes, Gemini streaming
│   │   ├── destinations.js               ← 16 curated destinations (exact data structure)
│   │   ├── tara.js                       ← [Planned] Chatbot orchestration layer
│   │   ├── test-tara.js                  ← CLI testing script for Tara responses
│   │   ├── .env.example                  ← Environment variables template
│   │   ├── .env                          ← Secrets (gitignored)
│   │   ├── package.json                  ← Dependencies (express, cors, dotenv)
│   │   └── package-lock.json             ← Locked dependency versions
│   │
│   ├── website-rules.md                  ← Frontend architecture & design guidelines
│   ├── server-rules.md                   ← Backend API shape & error handling rules
│   ├── chatbot-rules.md                  ← Tara's personality, style, and boundaries
│   │
│   └── render.yaml                       ← Render deployment blueprint
│
├── .gitignore                            ← Git ignore rules (excludes .env, node_modules)
└── README.md                             ← This file
```

---

## 📱 Website Sections

### 🎯 Welcome Hero Section
Full-viewport hero with the iconic Hinglish tagline *"Duniya Dekhni Hai? Chalo Shuru Karte Hain"* and a **START EXPLORING** call-to-action button. Clicking it triggers a whoosh sound effect and animated paper planes flying across the screen.

### 🏔️ Destinations Showcase
Browse 16 handpicked Indian destinations with intelligent category filtering:
- **🏔️ Mountains** — High-altitude adventures (Gulmarg, Manali, Munnar, Leh-Ladakh)
- **🏖️ Beaches** — Coastal relaxation and water sports (Goa, Havelock Island, Varkala, Gokarna)
- **🕌 Heritage Cities** — Cultural immersion and history (Jaipur, Hampi, Varanasi, Udaipur)
- **💎 Hidden Gems** — Off-the-beaten-path wonders (Spiti Valley, Ziro Valley, Mawlynnong, Gandikota)

Each destination card displays:
- Premium Unsplash photography
- Adventure level (1–5 stars)
- Estimated cost per person in ₹
- Best season to visit
- Top 2 things to do
- Ideal number of days
- "Tara's Choice" badge (for recommended destinations)

### 💬 Tara Chatbot Widget
Click the floating chat button in the bottom-right to interact with Tara:
- **Ask destination recommendations** in English or Hinglish
- **Get personalized suggestions** based on your preferences and conversation history
- **Inquire about costs, seasons, weather, food, transport, and itineraries**
- **Express booking intent** to add trips to your wishlist
- **Use quick-reply chips** for common queries (monsoon travel, budget trips, honeymoon spots, adventure destinations)

### 🧭 About Section
Learn the WanderWise story with:
- **Animated spinning compass** (pure CSS rotation animation)
- **Live counters** animating to "50,000+ happy travellers" and "16 curated spots" (triggered on scroll)
- **Mission statement** celebrating India's travel spirit

### 📢 Footer Ticker
Infinitely scrolling Hinglish messages like "Powered by wanderlust", "Tara ne khud explore kiya", "Made with chai and curiosity" celebrating the travel spirit.

---

## 💬 Tara — Your AI Travel Companion

### Personality
- **Warm & Friendly** — A well-travelled Indian guide who loves sharing travel stories
- **Hinglish Master** — Speaks natural Roman-script Hinglish (e.g., "Arre wah!", "Bilkul mast!", "Zaroor jaana!")
- **Concise & Conversational** — Short replies (2–5 sentences, no markdown)
- **Context-Aware** — Remembers last 12 conversation turns for personalized recommendations

### Key Response Phrases
- **Destination Sign-off** — "Bilkul mast jagah hai, zaroor jaana!" (Always ends recommendations with this)
- **Off-Topic Refusal** — "Arre, main toh sirf travel ki baatein karti hoon!" (Only talks about travel)
- **Booking Intent** — Appends `[BOOKING: Destination Name]` to trigger trip cards in the UI

### Capabilities
- ✅ Recommends only from the 16 WanderWise destinations
- ✅ Answers follow-ups on cost, season, food, transport, itineraries
- ✅ Detects booking intent and guides users to save trips
- ✅ Maintains conversation context for better recommendations
- ✅ Handles both English and Hinglish input naturally

### Knowledge Boundaries
- ❌ Won't discuss coding, math, recipes, or non-travel topics
- ❌ Won't recommend places outside the 16-destination list
- ❌ Won't use markdown, bullet points, or excessive emojis (unless user starts with emoji)

---

## 🔌 API Endpoints

### Health Check Endpoint
```bash
GET /api/health
```
**Response:**
```json
{
  "success": true,
  "message": "Tara is ready to explore!",
  "data": null
}
```

### Get All Destinations
```bash
GET /api/destinations
```
**Response:**
```json
{
  "success": true,
  "message": "Destinations fetched successfully.",
  "data": [
    {
      "id": 1,
      "name": "Gulmarg",
      "state": "Jammu & Kashmir",
      "category": "Mountains",
      "description": "Snow lovers ka jannat!...",
      "cost": 18000,
      "adventureLevel": 4,
      "bestSeason": "December to March",
      "thingsToDo": ["Skiing on powdery slopes", "Gondola cable car ride"],
      "idealDays": 4,
      "isTarasPick": true
    }
    // ... 15 more destinations
  ]
}
```

### Chat with Tara (Streaming)
```bash
POST /api/chat
Content-Type: application/json

{
  "message": "Kya acha destination hai budget-friendly?",
  "history": [
    { "role": "user", "content": "Hi Tara!" },
    { "role": "model", "content": "Namaste! Main Tara hoon..." }
  ]
}
```

**Response:** Newline-Delimited JSON (NDJSON) stream
```json
{ "success": true, "message": "chunk", "data": { "chunk": "Bilkul, " } }
{ "success": true, "message": "chunk", "data": { "chunk": "budget " } }
{ "success": true, "message": "chunk", "data": { "chunk": "mein..." } }
...
{ "success": true, "message": "Stream complete.", "data": { "done": true } }
```

---

## 🧪 Testing & Verification

### CLI Test for Tara Responses
```bash
cd wanderwise/server
node test-tara.js
```

Expected output shows Tara responding to a test message with streaming chunks.

### Manual Testing Checklist
- [ ] Frontend loads at GitHub Pages URL without errors
- [ ] Welcome hero displays with smooth fade-in animations
- [ ] **START EXPLORING** button triggers whoosh sound and paper planes
- [ ] Paper planes animate smoothly across the viewport
- [ ] Destination filters work (All Places, Mountains, Beaches, Heritage, Hidden Gems)
- [ ] Destination cards load with images and metadata
- [ ] Chat widget opens via floating "Talk to Tara" button
- [ ] Quick-reply chips trigger Tara responses immediately
- [ ] Chat messages stream word-by-word in real-time
- [ ] Follow-up messages include conversation history (context-aware)
- [ ] Booking intent shows trip card with "Plan This Trip" button
- [ ] Clicking booking button opens wishlist modal
- [ ] About section counter animates when scrolled into view
- [ ] Footer ticker scrolls infinitely without gaps
- [ ] Audio toggle successfully mutes/unmutes ambient waves
- [ ] Mobile responsiveness works (viewport width 320px–2560px)
- [ ] No console errors in browser DevTools

---

## 🔐 Security & Environment

### Secrets Management
- **All API keys** stored in `.env` file (gitignored)
- **`.env.example`** provides template with required variables
- **Zero hardcoding** of secrets in source code
- **CORS configured** to accept requests from both localhost and production frontend

### Required Environment Variables
```env
# Google Gemini API Key (get free from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_actual_api_key_here

# Server port (optional, defaults to 3001)
PORT=3001
```

### Best Practices
- Never commit `.env` to Git
- Always use `.env.example` for documentation
- Rotate API keys regularly
- Monitor API usage in Google Cloud Console

---

## 🚀 Deployment Guide

### Frontend → GitHub Pages

The `wanderwise/website` folder is deployed to GitHub Pages at:
```
https://cdasadiya.github.io/wanderwise/
```

**How it works:**
1. Use GitHub Actions or manual `git subtree` to create `gh-pages` branch
2. Configure repo settings: Settings → Pages → Source = `gh-pages` branch
3. Every push to `main` auto-deploys (with GitHub Actions)
4. Updates are live within seconds

**Manual deployment (without Actions):**
```bash
git subtree push --prefix wanderwise/website origin gh-pages
```

### Backend → Render

The Node.js backend is deployed on Render at:
```
https://ai-engineering-ieau.onrender.com
```

**Deployment steps:**
1. Create Render account and connect GitHub
2. Create new Web Service from `wanderwise/server/` directory
3. Add environment variable: `GEMINI_API_KEY` in Render dashboard
4. Set build command: `npm install`
5. Set start command: `npm start` or `node server.js`
6. Render auto-redeploys on every `main` branch push

**Monitoring:**
- Check logs: Render Dashboard → Service → Logs
- Test API: `curl https://ai-engineering-ieau.onrender.com/api/health`
- Free tier includes 30-second cold starts after inactivity

---

## 📝 Architecture & Guidelines

We follow three concise rule files for code consistency:

- **[website-rules.md](./wanderwise/website-rules.md)** — Frontend architecture, design system, response handling
- **[server-rules.md](./wanderwise/server-rules.md)** — Backend API shape, routing, error handling
- **[chatbot-rules.md](./wanderwise/chatbot-rules.md)** — Tara's personality, response style, topic boundaries

---

## 🐛 Troubleshooting

### Chat not loading or API errors
**Problem:** Chat widget shows error or no responses from Tara  
**Solution:**
- Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
- Check `PRODUCTION_API_BASE` in `wanderwise/website/script.js` matches your backend URL
- Open browser DevTools → Network tab to inspect API calls
- Verify backend is running: `curl http://localhost:3001/api/health`

### Tara not responding (backend issue)
**Problem:** API returns errors or responses are slow  
**Solution:**
- Confirm `GEMINI_API_KEY` is set in `.env` and valid
- Check Render service logs for errors
- Restart backend: `npm start` in `wanderwise/server/`
- Free tier Render may have rate limits; wait 30 seconds and retry
- Test with mock mode: Leave `GEMINI_API_KEY` blank for local testing

### Backend won't start locally
**Problem:** `Error: Cannot find module` or port already in use  
**Solution:**
- Ensure Node.js v16+: `node -v`
- Install dependencies: `rm -rf node_modules && npm install`
- Copy `.env.example` to `.env`: `cp .env.example .env`
- Check port availability: `lsof -i :3001` (macOS/Linux) or `netstat -ano | findstr :3001` (Windows)
- Use different port: Set `PORT=3002` in `.env`

### Paper planes or animations not showing
**Problem:** Hero section looks broken or animations missing  
**Solution:**
- Hard refresh to clear CSS cache
- Check CSS file is loaded: DevTools → Network tab
- Verify browser supports CSS animations (all modern browsers do)
- Check console for JavaScript errors

### Images not loading
**Problem:** Destination cards show broken image placeholders  
**Solution:**
- Unsplash might be rate-limited; check their status page
- Verify internet connection is stable
- Clear browser cache and retry
- Check DevTools Network tab for 403/429 errors from Unsplash

---

## 📚 Learning Resources

Perfect for learning from this project:

- **[Google Gemini API Docs](https://ai.google.dev/docs)** — Understand streaming, model parameters, safety filters
- **[Express.js Guide](https://expressjs.com)** — Learn routing, middleware, error handling
- **[MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** — Synthesize sounds programmatically
- **[CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)** — Design systems with CSS variables
- **[Fetch API & Streaming](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)** — Stream text generation
- **[GitHub Pages Deployment](https://docs.github.com/en/pages)** — Free static site hosting
- **[Render Deployment](https://render.com/docs)** — Deploy Node.js apps

---

## 👨‍💻 Author & Credits

**Created by:** [Chaitanya Dasadiya](https://linkedin.com/in/chaitanya-dasadiya)  
**LinkedIn:** [linkedin.com/in/chaitanya-dasadiya](https://www.linkedin.com/in/chaitanya-dasadiya)

**Built with:** ☕ chai and 🧠 curiosity

**Tech Stack:**
- Google Gemini 2.5 Flash Lite (AI)
- Express.js (Backend)
- Vanilla JavaScript (Frontend)
- CSS3 & HTML5 (Styling)
- Node.js (Runtime)
- GitHub Pages (Hosting)
- Render (Backend Hosting)

**Special Thanks:**
- Unsplash for stunning destination photography
- Google for the Gemini API
- The open-source community for tools and inspiration

---

## 📄 License

This project is open source and available for educational and personal use. Feel free to:
- Fork the repository
- Modify the code for your own travel app
- Deploy on your own infrastructure
- Share with friends and family

---

## 🎯 Project Goals & Vision

**WanderWise** was created to:
1. ✅ Showcase AI integration with a real-world use case (travel recommendations)
2. ✅ Demonstrate modern full-stack web development (frontend + backend)
3. ✅ Celebrate Indian tourism through an intelligent, culturally-aware chatbot
4. ✅ Provide a learning resource for developers interested in AI, APIs, and web design
5. ✅ Create a fun, interactive experience for travel enthusiasts

---

## 🗺️ Roadmap & Future Features

Potential enhancements:
- [ ] User accounts and wishlist persistence (Firebase/MongoDB)
- [ ] Booking integration with real travel platforms
- [ ] Weather API integration for real-time conditions
- [ ] User reviews and ratings for destinations
- [ ] Multi-language support (Hindi, Tamil, Telugu, Marathi)
- [ ] Photo gallery with user-submitted travel photos
- [ ] Trip itinerary builder with packing checklist
- [ ] Mobile app (React Native or Flutter)
- [ ] Video guides for each destination
- [ ] Recommendation engine based on user preferences

---

## 📞 Support & Feedback

Have questions or found a bug?
- Open an issue on [GitHub Issues](https://github.com/cdasadiya/wanderwise/issues)
- Email: (Contact via LinkedIn)
- Follow for updates: [LinkedIn](https://www.linkedin.com/in/chaitanya-dasadiya)

---

## 🎊 Next Steps

Ready to explore India?

1. **🌐 Visit the live site:** [WanderWise](https://cdasadiya.github.io/wanderwise/)
2. **💬 Chat with Tara** — Ask about destinations, costs, seasons, and travel tips
3. **⭐ Star the repo** if you love the project — it means a lot!
4. **📢 Share with friends** — Help them discover their next Indian adventure
5. **🍴 Fork & customize** — Build your own travel discovery platform

---

<div align="center">

### *Made with 🌍 wanderlust and powered by the spirit of exploration*

**Tara says:** *"Duniya bohot badi hai, aur har jagah mein ek kahani hai. Chalo, apni kahani likhe!"* 🌏✈️

---

**Happy Travels!** 🎒🧳

*WanderWise — Where every journey begins with a conversation.*

</div>
