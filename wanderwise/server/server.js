const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const url = require('url');
const destinations = require('./destinations');

// Load environment variables relative to the server folder
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup to allow frontend connections
app.use(cors());
app.use(express.json());

// API Endpoint 1: Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: "Tara is ready to explore!",
    data: null
  });
});

// API Endpoint 2: Destinations List
app.get('/api/destinations', (req, res) => {
  res.json({
    success: true,
    message: "Destinations fetched successfully.",
    data: destinations
  });
});

// Helper to check if message contains emoji
function hasEmojiInText(text) {
  return /[\p{Emoji_Presentation}\p{Emoji}\u2600-\u27BF]/u.test(text);
}

// API Endpoint 3: Chat Stream
app.post('/api/chat', (req, res) => {
  const { message, history } = req.body;
  
  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required.",
      data: null
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    // FALLBACK MOCK STREAMING ENGINE FOR CONVENIENT TESTING
    console.log("No GEMINI_API_KEY configured. Falling back to local Hinglish mock streaming...");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');

    const msgLower = message.toLowerCase();
    let replyText = "Jaipur, Goa, aur Munnar hamare sabse hot spots hain! Kahan ka ticket book karein fir? Jaipur and Goa are awesome. Bilkul mast jagah hai, zaroor jaana!";
    
    // Check custom queries
    if (msgLower.includes('monsoon')) {
      replyText = "Monsoon ke liye toh Spiti Valley ya Munnar bilkul jannat hai! Greenery dekh ke maza aa jayega, yaara. Spiti Valley and Munnar are spectacular. Bilkul mast jagah hai, zaroor jaana!";
    } else if (msgLower.includes('budget')) {
      replyText = "Kam budget me Hampi ya Gandikota best options hain. Wahan rehne-khane ka kharcha bohot kam hai aur views gazab ke hain! Hampi and Gandikota will fit right in. Bilkul mast jagah hai, zaroor jaana!";
    } else if (msgLower.includes('honeymoon')) {
      replyText = "Honeymoon ke liye Udaipur ya Havelock Island is perfect! Udaipur ki lakes aur Havelock ke white sand beaches, bohot hi romantic feel denge aapko. Udaipur and Havelock Island are beautiful. Bilkul mast jagah hai, zaroor jaana!";
    } else if (msgLower.includes('adventure')) {
      replyText = "Adventure chahiye toh Leh-Ladakh ya Gulmarg jao, yaara! Khardung La me bullet chalana aur Gulmarg me skiing, dono hi thrilling hain! Leh-Ladakh and Gulmarg are full of thrills. Bilkul mast jagah hai, zaroor jaana!";
    } else if (msgLower.includes('book') || msgLower.includes('plan') || msgLower.includes('jaana hai') || msgLower.includes('want to go')) {
      // Find matching destination or default to Gulmarg
      let selectedDest = "Gulmarg";
      for (let dest of destinations) {
        if (msgLower.includes(dest.name.toLowerCase())) {
          selectedDest = dest.name;
          break;
        }
      }
      replyText = `Arre wah! ${selectedDest} chalne ki taiyari shuru karein? Chalo, main abhi aapke liye plan bana deti hoon. [BOOKING: ${selectedDest}]`;
    } else if (msgLower.includes('code') || msgLower.includes('math') || msgLower.includes('recipe') || msgLower.includes('coding') || msgLower.includes('javascript') || msgLower.includes('python')) {
      replyText = "Arre, main toh sirf travel ki baatein karti hoon!";
    }

    // Split text into words/chunks and stream them
    const words = replyText.split(' ');
    let wordIndex = 0;

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        const chunk = words[wordIndex] + (wordIndex === words.length - 1 ? "" : " ");
        res.write(JSON.stringify({
          success: true,
          message: "chunk",
          data: { chunk: chunk }
        }) + '\n');
        wordIndex++;
      } else {
        clearInterval(interval);
        res.write(JSON.stringify({
          success: true,
          message: "Stream complete.",
          data: { done: true }
        }) + '\n');
        res.end();
      }
    }, 80); // Stream word-by-word at a realistic pace
    return;
  }

  // 1. Format Gemini system instruction
  const userHasEmoji = hasEmojiInText(message);
  const systemPrompt = `You are Tara, a warm, friendly, well-travelled Indian travel guide.
You speak natural Hinglish in Roman script (e.g. "Arre wah! Kahan ghumne ka plan hai?").
You MUST follow these strict rules:
1. Limit your response to exactly 2 to 5 sentences. Keep it short.
2. DO NOT use markdown of any kind (no bold with **, no italics, no bullet points, no lists, no headings). Just plain text.
3. ${userHasEmoji ? "You may use emojis naturally." : "DO NOT use any emojis in your response."}
4. You only know the following 16 WanderWise destinations:
${destinations.map(d => `- ${d.name} in ${d.state} (${d.category}): Cost is ₹${d.cost} per person. Best season: ${d.bestSeason}. Ideal days: ${d.idealDays}. Adventure level: ${d.adventureLevel}/5. Description: ${d.description}`).join('\n')}
5. Recommend only from this list of 16 destinations. Do not mention or recommend any place outside this list.
6. Every recommendation or suggestion of a destination must end with exactly this phrase: "Bilkul mast jagah hai, zaroor jaana!"
7. If the user asks something completely unrelated to travel (like coding, math, recipes, non-travel questions), respond with exactly: "Arre, main toh sirf travel ki baatein karti hoon!"
8. Travel-adjacent follow-ups (costs, season, food, weather, transport, days) for our destinations are considered ON-topic.
9. When the user expresses intent to book one of our destinations (e.g., "book this", "plan this trip", "plan kar do", "mujhe yahaan jaana hai"), reply warmly and append exactly "[BOOKING: Destination Name]" (where Destination Name is the exact name of the destination, e.g. [BOOKING: Gulmarg]) to the end of your response. Ensure the destination name matches one of our 16 destinations.`;

  // 2. Format request history for Gemini contents
  const geminiHistory = (history || []).map(turn => ({
    role: turn.role === 'model' ? 'model' : 'user',
    parts: [{ text: turn.content }]
  }));
  
  // Append current message
  geminiHistory.push({
    role: 'user',
    parts: [{ text: message }]
  });

  // 3. Make POST streaming request to Gemini 2.5 Flash Lite
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?alt=sse&key=${apiKey}`;
  const parsedUrl = url.parse(geminiUrl);

  const requestBody = JSON.stringify({
    contents: geminiHistory,
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    }
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');

  const reqObj = https.request({
    hostname: parsedUrl.hostname,
    path: parsedUrl.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  }, (geminiRes) => {
    console.log(`Gemini API status: ${geminiRes.statusCode}`);
    let buffer = '';

    geminiRes.on('data', (chunk) => {
      const chunkStr = chunk.toString();
      if (geminiRes.statusCode !== 200) {
        console.error("Gemini Error payload:", chunkStr);
      }
      buffer += chunkStr;
      
      // Normalize CRLF to LF as requested in Phase 5
      buffer = buffer.replace(/\r\n/g, '\n');

      let parts = buffer.split('\n\n');
      buffer = parts.pop(); // keep last incomplete part

      for (const part of parts) {
        if (part.startsWith('data:')) {
          const jsonStr = part.replace(/^data:\s*/, '').trim();
          if (jsonStr) {
            try {
              const parsedData = JSON.parse(jsonStr);
              const textChunk = parsedData &&
                                parsedData.candidates &&
                                parsedData.candidates[0] &&
                                parsedData.candidates[0].content &&
                                parsedData.candidates[0].content.parts &&
                                parsedData.candidates[0].content.parts[0] &&
                                parsedData.candidates[0].content.parts[0].text;
              if (textChunk) {
                // Send NDJSON chunk
                res.write(JSON.stringify({
                  success: true,
                  message: "chunk",
                  data: { chunk: textChunk }
                }) + '\n');
              }
            } catch (err) {
              console.warn('Gemini SSE parsing error:', err);
            }
          }
        }
      }
    });

    geminiRes.on('end', () => {
      // Process remaining buffer
      if (buffer && buffer.startsWith('data:')) {
        const jsonStr = buffer.replace(/^data:\s*/, '').trim();
        if (jsonStr) {
          try {
            const parsedData = JSON.parse(jsonStr);
            const textChunk = parsedData &&
                              parsedData.candidates &&
                              parsedData.candidates[0] &&
                              parsedData.candidates[0].content &&
                              parsedData.candidates[0].content.parts &&
                              parsedData.candidates[0].content.parts[0] &&
                              parsedData.candidates[0].content.parts[0].text;
            if (textChunk) {
              res.write(JSON.stringify({
                success: true,
                message: "chunk",
                data: { chunk: textChunk }
              }) + '\n');
            }
          } catch (err) {}
        }
      }

      // Send termination NDJSON line
      res.write(JSON.stringify({
        success: true,
        message: "Stream complete.",
        data: { done: true }
      }) + '\n');
      
      res.end();
    });
  });

  reqObj.on('error', (err) => {
    console.error('Gemini REST connection error:', err);
    res.write(JSON.stringify({
      success: false,
      message: "Arre yaar, connections me koi error aya! Ruko thoda.",
      data: { error: err.message }
    }) + '\n');
    res.end();
  });

  reqObj.write(requestBody);
  reqObj.end();
});

// Start backend server
app.listen(PORT, () => {
  console.log(`WanderWise Server running at http://localhost:${PORT}`);
});
