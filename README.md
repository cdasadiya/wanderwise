# ✈️ WanderWise — Your AI-Powered Travel Discovery Guide

> *Duniya Dekhni Hai? Chalo Shuru Karte Hain!*

**WanderWise** is a beautifully crafted Indian travel discovery platform powered by an AI travel companion named **Tara**. Speak in Hinglish, get personalized travel recommendations, and explore 16 stunning Indian destinations across mountains, beaches, heritage cities, and hidden gems.

---

## 🌟 Features

- 🤖 **Tara AI Guide** — Conversational travel assistant speaking warm, friendly Hinglish
- 🗺️ **16 Curated Destinations** — Handpicked across 4 categories with adventure levels, costs, and seasonal guides
- 📱 **Responsive Design** — Beautiful single-page site optimized for desktop, tablet, and mobile
- 💬 **Real-time Streaming Chat** — Word-by-word AI responses with conversation memory
- 🎨 **Dreamy UI** — Magazine-style layouts with CSS animations, floating planes, spinning compass
- 🎵 **Ambient Audio** — Soothing ocean waves with mute/unmute toggle
- 🚀 **Modern Architecture** — Frontend on GitHub Pages, Backend on Render, powered by Google Gemini

---

## 🚀 Live Demo

| Component | URL |
|-----------|-----|
| **Frontend (Website)** | [🌐 https://cdasadiya.github.io/wanderwise/](https://cdasadiya.github.io/wanderwise/) |
| **Backend API** | [📡 https://wanderwise-api.onrender.com](https://wanderwise-api.onrender.com) |
| **GitHub Repository** | [📦 https://github.com/cdasadiya/wanderwise](https://github.com/cdasadiya/wanderwise) |

> **Note:** The backend runs on Render's free tier and may take 30 seconds to wake up after inactivity.

---

## 📋 Tech Stack

### Frontend
- **HTML5** — Semantic markup
- **CSS3** — Variables, animations, flexbox, grid
- **Vanilla JavaScript** — No frameworks, lightweight and fast
- **Deployed on** — GitHub Pages

### Backend
- **Node.js + Express** — Lightweight REST API
- **Google Gemini API** — AI-powered travel recommendations (streaming)
- **CORS & dotenv** — Security and environment management
- **Deployed on** — Render

---

## 🎯 Getting Started

### Local Development

#### Prerequisites
- **Node.js** v16+ and npm
- **Google Gemini API Key** (get it free at [AI Studio](https://aistudio.google.com/app/apikey))

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cdasadiya/wanderwise.git
   cd wanderwise
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   npm start
   # Backend runs on http://localhost:3001
   ```

3. **Open Frontend**
   ```bash
   # In a new terminal
   cd wanderwise/website
   # Open index.html in your browser or run a simple server:
   npx http-server
   # Visit http://localhost:8080
   ```

---

## 🗂️ Project Structure

```
wanderwise/
├── website/                     ← Frontend (HTML, CSS, JS)
│   ├── index.html              ← Main page
│   ├── style.css               ← All styling with CSS variables
│   └── script.js               ← All client-side logic
├── server/                      ← Backend (Node.js + Express)
│   ├── server.js               ← Express server & API routes
│   ├── destinations.js         ← 16 curated destinations data
│   ├── tara.js                 ← Gemini integration & streaming
│   ├── test-tara.js            ← CLI test script for Tara
│   ├── .env.example            ← Environment template
│   ├── .env                     ← Secrets (gitignored)
│   └── package.json            ← Dependencies
├── website-rules.md             ← Frontend design guidelines
├── server-rules.md              ← Backend architecture rules
├── chatbot-rules.md             ← Tara AI personality & behavior
├── render.yaml                  ← Render deployment config
├── .gitignore                   ← Git ignore rules
└── README.md                    ← This file
```

---

## 📱 Site Sections

### 🎯 Welcome Screen
Full-viewport hero with the tagline *"Duniya Dekhni Hai? Chalo Shuru Karte Hain"* and a **START EXPLORING** button that triggers a whoosh sound and floating paper planes.

### 🏔️ Destinations
Browse 16 handpicked Indian destinations filtered by:
- **Mountains** — High-altitude adventures
- **Beaches** — Coastal relaxation
- **Heritage Cities** — Cultural immersion
- **Hidden Gems** — Off-the-beaten-path wonders

Each card displays:
- Adventure level (1–5 stars)
- Estimated cost per person (₹)
- Top 2 things to do
- Best season to visit
- Ideal number of days

### 💬 Tara Chatbot
Click the floating chat button in the bottom-right to chat with Tara:
- Ask destination recommendations
- Inquire about costs, seasons, and itineraries
- Get personalized suggestions based on conversation history
- Express booking intent and save trips to your wishlist

**Quick reply chips:**
- "Best place for monsoon?"
- "Budget-friendly trips?"
- "Honeymoon destinations?"
- "Adventure spots?"

### 🧭 About Section
Learn about WanderWise with:
- Animated spinning compass (pure CSS)
- Counter animating to "50,000+ happy travellers"
- Mission and values

### 📢 Footer Ticker
Infinitely scrolling Hinglish messages celebrating the travel spirit.

---

## 💬 Tara — Your AI Travel Companion

### Personality
- Warm, friendly, well-travelled
- Speaks natural Hinglish in Roman script
- Short, conversational replies (2–5 sentences)
- No markdown, no bullet lists, no unsolicited emojis

### Key Phrases
- **Destination recommendation sign-off:** *"Bilkul mast jagah hai, zaroor jaana!"*
- **Off-topic refusal:** *"Arre, main toh sirf travel ki baatein karti hoon!"*

### Capabilities
- Recommends from the 16 WanderWise destinations
- Remembers last 12 conversation turns
- Answers follow-ups on cost, season, food, transport, itineraries
- Detects booking intent and guides you to save a trip

---

## ��� API Endpoints

### Health Check
```bash
GET /api/health
```
Response:
```json
{
  "success": true,
  "message": "Tara is ready to explore!"
}
```

### Get Destinations
```bash
GET /api/destinations
```
Response:
```json
{
  "success": true,
  "message": "Destinations loaded",
  "data": [
    {
      "id": 1,
      "name": "Manali",
      "state": "Himachal Pradesh",
      "category": "Mountains",
      "description": "Snow-capped peaks aur adventure... 🏔️",
      "costPerPerson": 15000,
      "adventureLevel": 4,
      "bestSeason": "May-July",
      "thingsToDoArray": ["Paragliding", "Trekking"],
      "idealDays": 4,
      "tarasPick": true
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
    { "role": "assistant", "content": "Namaste! Main Tara hoon..." }
  ]
}
```

**Response:** Newline-delimited JSON stream
```
{ "success": true, "message": "chunk", "data": { "chunk": "Bilkul, " } }
{ "success": true, "message": "chunk", "data": { "chunk": "budget " } }
{ "success": true, "message": "chunk", "data": { "chunk": "mein..." } }
...
{ "success": true, "message": "Stream complete.", "data": { "done": true } }
```

---

## 🧪 Testing

### Test Tara via CLI
```bash
cd server
node test-tara.js
```

Expected output:
```
Testing Tara with: "I want an adventure trip in the mountains, kuch suggest karo!"
Streaming response:
Manali ...
❄️ ekdum ...
...
Stream complete — Tara ne plan bana diya!
```

### Manual Testing Checklist
- [ ] Frontend loads at GitHub Pages URL
- [ ] Welcome screen displays with START EXPLORING button
- [ ] Clicking START EXPLORING plays whoosh and animates planes
- [ ] Destination filters work (Mountains, Beaches, Heritage, Hidden Gems)
- [ ] Chat opens via floating button
- [ ] Quick-reply chips trigger Tara responses
- [ ] Follow-up messages use conversation history
- [ ] Booking intent shows trip card with Plan button
- [ ] About section counter animates on scroll
- [ ] Footer ticker scrolls smoothly
- [ ] Audio toggle mutes/unmutes ambient waves

---

## 🔐 Security

- **Secrets:** All API keys in `.env` (gitignored)
- **.env Template:** `.env.example` shows required variables
- **No hardcoding:** Zero secrets in source code
- **CORS:** Backend configured to accept requests from both localhost and production frontend

### Required Environment Variables
```env
GEMINI_API_KEY=your_api_key_here
```

---

## 🚀 Deployment

### Frontend → GitHub Pages
The `website` folder is deployed to GitHub Pages at:
```
https://cdasadiya.github.io/wanderwise/
```

**How it works:**
- GitHub Actions or manual `git subtree split` creates a `gh-pages` branch
- GitHub Pages reads from that branch
- Updates are instant after pushing

### Backend → Render
The Node.js backend is deployed on Render at:
```
https://wanderwise-api.onrender.com
```

**Configuration:**
- `render.yaml` Blueprint defines the service
- `GEMINI_API_KEY` is set in Render dashboard (not committed)
- Free tier may have 30-second cold starts after inactivity

**Deploy Updates:**
1. Push changes to the `main` branch
2. Render auto-redeploys on every commit
3. Monitor logs: Render Dashboard → Service → Logs

---

## 📝 Rules & Guidelines

We follow three concise rule files for consistency:

- **[website-rules.md](./website-rules.md)** — Frontend architecture, design system, response handling
- **[server-rules.md](./server-rules.md)** — Backend API shape, routing, error handling
- **[chatbot-rules.md](./chatbot-rules.md)** — Tara's personality, response style, topic boundaries

---

## 🐛 Troubleshooting

### Chat not loading?
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)
- Check if `PRODUCTION_API_BASE` in `script.js` matches your actual backend URL
- Open browser DevTools → Network tab to see API calls

### Tara not responding?
- Confirm `GEMINI_API_KEY` is set in Render dashboard
- Check Render service logs for errors
- Free tier may be rate-limited; wait a few seconds and retry

### Backend won't start locally?
- Ensure `.env` has `GEMINI_API_KEY`
- Check Node version: `node -v` (v16+ required)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Paper planes not showing?
- Browser cache issue — hard refresh
- CSS animations require CSS3 support (all modern browsers)

---

## 📚 Learning Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Express.js Guide](https://expressjs.com)
- [CSS Variables & Animations](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Fetch API & Streaming](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 👥 Credits

**Built with:** ☕ chai and 🧠 curiosity

**Technologies:**
- Google Gemini 2.5 Flash Lite
- Express.js
- Vanilla JavaScript
- CSS3 Animations
- Node.js

---

## 📄 License

This project is open source. Feel free to fork, modify, and deploy for your own travel adventures!

---

## 🎯 Next Steps

1. **Visit the live site:** [🌐 https://cdasadiya.github.io/wanderwise/](https://cdasadiya.github.io/wanderwise/)
2. **Chat with Tara** — Ask about destinations, costs, and seasonal tips
3. **Star the repo** if you love travel and AI! ⭐
4. **Share with friends** — Help them discover their next adventure

---

*Made with 🌍 wanderlust and powered by the spirit of exploration.*

**Tara says:** *"Duniya bohot badi hai, aur har jagah mein ek kahani hai. Chalo, apni kahani likhe!"* 🌏✈️
