# WanderWise 🧭

Welcome to **WanderWise**, a complete travel discovery website featuring a warm, friendly AI travel guide named **Tara** who speaks Hinglish!

## Project Structure

```
wanderwise/
├── website/                  ← Frontend (index.html, style.css, script.js)
├── website-server/           ← Tiny static HTTP server for the frontend
├── server/                   ← Backend (Express + Gemini chatbot)
│   ├── destinations.js       ← Curated Indian destinations database
│   ├── server.js             ← Express server & streaming chatbot route
│   └── test-tara.js          ← CLI test script for Tara
├── website-rules.md          ← Frontend UI and Web Audio constraints
├── server-rules.md           ← Backend API and Response format constraints
└── chatbot-rules.md          ← Tara's personality guidelines
```

## Setup & Running Locally

1. **Backend Server**:
   Navigate to `wanderwise/server/`, configure `.env` (with your `GEMINI_API_KEY`), and run:
   ```bash
   npm install
   npm start
   ```
   The backend will run on `http://localhost:3001`.

2. **Frontend Website**:
   Navigate to `wanderwise/website-server/` and run:
   ```bash
   npm install
   npm start
   ```
   The website will run on `http://localhost:3000`.

3. **CLI Chatbot Test**:
   While the backend is running, test Tara's responses directly from the terminal inside `wanderwise/server/`:
   ```bash
   node test-tara.js
   ```

## Deploying

* **Frontend**: Deploy `wanderwise/website` to **GitHub Pages**.
* **Backend**: Deploy the Node.js API to **Render**.
