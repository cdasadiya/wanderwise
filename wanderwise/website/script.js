// WanderWise Frontend Script
// Warm Hinglish Travel Guide (Tara)

// 1. API Base configuration
const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '')
  ? 'http://localhost:3001'
  : 'https://ai-engineering-ieau.onrender.com';

// Unsplash images mapped to destinations to look extremely premium
const IMAGE_MAP = {
  'Gulmarg': 'https://images.unsplash.com/photo-1548252646-e539001b9ad7?w=600&auto=format&fit=crop&q=80',
  'Manali': 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=80',
  'Munnar': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop&q=80',
  'Leh-Ladakh': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=600&auto=format&fit=crop&q=80',
  'Goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80',
  'Havelock Island': 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80',
  'Varkala': 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&auto=format&fit=crop&q=80',
  'Gokarna': 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600&auto=format&fit=crop&q=80',
  'Jaipur': 'https://images.unsplash.com/photo-1477584322902-4718261a76d6?w=600&auto=format&fit=crop&q=80',
  'Hampi': 'https://images.unsplash.com/photo-1600100397608-f010e42ecb9c?w=600&auto=format&fit=crop&q=80',
  'Varanasi': 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?w=600&auto=format&fit=crop&q=80',
  'Udaipur': 'https://images.unsplash.com/photo-1597079910443-60c43fc4f929?w=600&auto=format&fit=crop&q=80',
  'Spiti Valley': 'https://images.unsplash.com/photo-1589136777351-fdc9c9c8c480?w=600&auto=format&fit=crop&q=80',
  'Ziro Valley': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
  'Mawlynnong': 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&auto=format&fit=crop&q=80',
  'Gandikota': 'https://images.unsplash.com/photo-1626583223726-b259a1bb244c?w=600&auto=format&fit=crop&q=80'
};

// Global State
let allDestinations = [];
let chatHistory = [];
let isSoundMuted = true;

// Web Audio API State
let audioCtx = null;
let waveGain = null;
let waveFilter = null;
let masterGain = null;

// 2. Audio Engine using Web Audio API
function initAudio() {
  if (audioCtx) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  // Create white noise buffer
  const bufferSize = audioCtx.sampleRate * 4; // 4s of noise
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  // Lowpass filter for muffled sea sound
  waveFilter = audioCtx.createBiquadFilter();
  waveFilter.type = 'lowpass';
  waveFilter.frequency.value = 350;
  waveFilter.Q.value = 1.0;

  // waveGain simulates ocean wave swells (LFO-like)
  waveGain = audioCtx.createGain();
  waveGain.gain.value = 0.05;

  // masterGain handles global mute/unmute
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0; // Muted by default

  // Connections
  whiteNoise.connect(waveFilter);
  waveFilter.connect(waveGain);
  waveGain.connect(masterGain);
  masterGain.connect(audioCtx.destination);

  whiteNoise.start();

  // Schedule ocean swell LFO via intervals
  let time = audioCtx.currentTime;
  function scheduleWaves() {
    const cycle = 8; // 8s wave cycle
    for (let i = 0; i < 50; i++) {
      const t = time + i * cycle;
      // Inflow
      waveGain.gain.setValueAtTime(0.02, t);
      waveGain.gain.linearRampToValueAtTime(0.18, t + 3.5);
      waveFilter.frequency.setValueAtTime(200, t);
      waveFilter.frequency.exponentialRampToValueAtTime(650, t + 3.5);

      // Outflow
      waveGain.gain.setValueAtTime(0.18, t + 3.5);
      waveGain.gain.linearRampToValueAtTime(0.02, t + cycle);
      waveFilter.frequency.setValueAtTime(650, t + 3.5);
      waveFilter.frequency.exponentialRampToValueAtTime(200, t + cycle);
    }
  }
  scheduleWaves();
}

function playWhooshSound() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Create noise source
  const bufferSize = audioCtx.sampleRate * 1.5;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const whooshFilter = audioCtx.createBiquadFilter();
  whooshFilter.type = 'bandpass';
  whooshFilter.Q.value = 2.5;

  const whooshGain = audioCtx.createGain();

  noise.connect(whooshFilter);
  whooshFilter.connect(whooshGain);
  whooshGain.connect(audioCtx.destination); // Whoosh bypasses masterGain so Sfx is heard if user triggers it

  const now = audioCtx.currentTime;

  whooshFilter.frequency.setValueAtTime(100, now);
  whooshFilter.frequency.exponentialRampToValueAtTime(1800, now + 0.5);
  whooshFilter.frequency.exponentialRampToValueAtTime(100, now + 1.3);

  whooshGain.gain.setValueAtTime(0, now);
  whooshGain.gain.linearRampToValueAtTime(0.2, now + 0.4);
  whooshGain.gain.linearRampToValueAtTime(0.001, now + 1.3);

  noise.start(now);
  noise.stop(now + 1.4);
}

// Sound toggle handler
const audioToggle = document.getElementById('audio-toggle');
audioToggle.addEventListener('click', () => {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (isSoundMuted) {
    // Unmute
    isSoundMuted = false;
    masterGain.gain.setTargetAtTime(0.35, audioCtx.currentTime, 0.5);
    audioToggle.querySelector('.audio-icon').textContent = '🔊';
    audioToggle.querySelector('.audio-text').textContent = 'Sound On';
    audioToggle.classList.add('active');
  } else {
    // Mute
    isSoundMuted = true;
    masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.5);
    audioToggle.querySelector('.audio-icon').textContent = '🔇';
    audioToggle.querySelector('.audio-text').textContent = 'Mute';
    audioToggle.classList.remove('active');
  }
});

// 3. Welcome Action (Whoosh & Paper Planes)
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  // Sound check
  if (!isSoundMuted) {
    playWhooshSound();
  }
  
  // Trigger animations
  triggerPaperPlanes();

  // Scroll to destinations after a slight delay for paper plane whoosh
  setTimeout(() => {
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
  }, 700);
});

function triggerPaperPlanes() {
  const container = document.getElementById('plane-container');
  container.innerHTML = '';
  const count = 10;
  for (let i = 0; i < count; i++) {
    const plane = document.createElement('div');
    plane.className = 'paper-plane';
    plane.textContent = '✈';
    
    const startY = Math.random() * 70 + 15; // 15% to 85% Y height
    const scale = Math.random() * 0.7 + 0.5; // size
    const delay = Math.random() * 0.5;
    const duration = Math.random() * 1.2 + 1.2; // 1.2s to 2.4s flight

    plane.style.left = '-50px';
    plane.style.top = `${startY}%`;
    plane.style.fontSize = `${scale * 2}rem`;
    plane.style.animationDelay = `${delay}s`;
    
    // Inline style containing flight path
    plane.style.animation = `flyAcross ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;

    container.appendChild(plane);
    
    setTimeout(() => {
      plane.remove();
    }, (delay + duration) * 1000 + 100);
  }
}

// 4. Destinations Fetch & Local Filtering
async function loadDestinations() {
  try {
    const res = await fetch(`${API_BASE}/api/destinations`);
    const json = await res.json();
    if (json.success) {
      allDestinations = json.data;
      renderDestinations(allDestinations);
    } else {
      document.getElementById('destinations-grid').innerHTML = '<div class="loading-placeholder">Arre! Destinations load nahi ho paye. Refresh karo yaara.</div>';
    }
  } catch (err) {
    console.error('Destinations load error:', err);
    document.getElementById('destinations-grid').innerHTML = '<div class="loading-placeholder">API error, please run backend locally or verify connection.</div>';
  }
}

function renderDestinations(items) {
  const grid = document.getElementById('destinations-grid');
  grid.innerHTML = '';
  
  if (items.length === 0) {
    grid.innerHTML = '<div class="loading-placeholder">Koi destination nahi mila yaara!</div>';
    return;
  }

  items.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'dest-card';
    
    // Map category styles
    const catClass = dest.category ? `badge-${dest.category.toLowerCase().replace(' ', '-')}` : 'badge-gems';
    const stars = '★'.repeat(dest.adventureLevel) + '☆'.repeat(5 - dest.adventureLevel);
    const imageUrl = IMAGE_MAP[dest.name] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600';

    card.innerHTML = `
      <div class="dest-img-container" style="background-image: url('${imageUrl}');">
        <span class="dest-badge ${catClass}">${dest.category}</span>
        ${dest.isTarasPick ? `<span class="tara-pick-badge">⭐ Tara's Choice</span>` : ''}
      </div>
      <div class="dest-card-content">
        <div class="dest-state">${dest.state}</div>
        <h3 class="dest-name">${dest.name}</h3>
        <p class="dest-desc">${dest.description}</p>
        <div class="dest-meta">
          <div class="meta-item">
            <span class="meta-label">Cost</span>
            <span class="meta-value">₹${dest.cost.toLocaleString('en-IN')} / person</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Best Season</span>
            <span class="meta-value">${dest.bestSeason}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Adventure Level</span>
            <span class="meta-value stars">${stars}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Ideal Stay</span>
            <span class="meta-value">${dest.idealDays} Days</span>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Category filter event listeners
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const cat = btn.getAttribute('data-category');
    if (cat === 'all') {
      renderDestinations(allDestinations);
    } else {
      // Map frontend category filter tag to backend category name
      const tagMapping = {
        'mountains': 'Mountains',
        'beaches': 'Beaches',
        'heritage': 'Heritage Cities',
        'gems': 'Hidden Gems'
      };
      const filtered = allDestinations.filter(d => d.category === tagMapping[cat]);
      renderDestinations(filtered);
    }
  });
});

// 5. Scroll-Triggered Counter (IntersectionObserver)
const statsSection = document.getElementById('stats-section');
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        animateCounter(num, target);
      });
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

function animateCounter(element, target) {
  let start = 0;
  const duration = 2000; // 2 seconds animation
  const stepTime = Math.abs(Math.floor(duration / (target > 100 ? 50 : target)));
  const stepValue = target > 100 ? Math.ceil(target / 50) : 1;

  const timer = setInterval(() => {
    start += stepValue;
    if (start >= target) {
      element.textContent = target.toLocaleString('en-IN') + (target > 100 ? '+' : '');
      clearInterval(timer);
    } else {
      element.textContent = start.toLocaleString('en-IN');
    }
  }, stepTime);
}

// 6. Floating Chat Panel Toggle
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatPanel = document.getElementById('chat-panel');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatNotificationDot = document.querySelector('.chat-notification-dot');

chatToggleBtn.addEventListener('click', () => {
  chatPanel.classList.add('active');
  chatToggleBtn.style.display = 'none';
  if (chatNotificationDot) chatNotificationDot.style.display = 'none';
  
  // Focus the input
  document.getElementById('chat-input').focus();
});

chatCloseBtn.addEventListener('click', () => {
  chatPanel.classList.remove('active');
  chatToggleBtn.style.display = 'flex';
});

// 7. Chat API Integration & Streaming UI
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatSubmitBtn = document.getElementById('chat-submit-btn');
const quickChips = document.querySelectorAll('.quick-chip');

// Listen to quick chips clicks
quickChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const text = chip.textContent;
    chatInput.value = text;
    chatForm.dispatchEvent(new Event('submit'));
  });
});

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = '';
  appendUserMessage(text);
  
  // Show typing indicator
  const typingBubble = appendTypingIndicator();
  autoScrollChat();

  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text, history: chatHistory })
    });

    // Remove typing indicator once stream initiates
    typingBubble.remove();

    if (!response.ok) {
      throw new Error('Server response error');
    }

    // Create a new blank message bubble for Tara's stream response
    const taraBubble = createTaraMessageBubble();
    const bubbleElement = taraBubble.querySelector('.msg-bubble');
    autoScrollChat();

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let streamText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // save trailing partial chunk

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.success && parsed.data) {
            if (parsed.data.chunk) {
              streamText += parsed.data.chunk;
              // Clean out the booking pattern before rendering it in UI text
              bubbleElement.textContent = streamText.replace(/\[BOOKING:\s*[^\]]+\]/gi, '').trim();
              autoScrollChat();
            }
            if (parsed.data.done) {
              // Finalize history retention
              chatHistory.push({ role: 'user', content: text });
              chatHistory.push({ role: 'model', content: streamText });
              if (chatHistory.length > 24) { // 12 turns max (24 items total)
                chatHistory.splice(0, chatHistory.length - 24);
              }
              
              // Verify booking intent in final reply
              checkAndRenderBooking(taraBubble, streamText);
            }
          }
        } catch (err) {
          console.warn('NDJSON parsing warning:', err);
        }
      }
    }

  } catch (err) {
    console.error('Chat error:', err);
    typingBubble.remove();
    appendTaraErrorMessage();
    autoScrollChat();
  }
});

function appendUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message user-msg';
  msg.innerHTML = `<div class="msg-bubble">${text}</div>`;
  chatMessages.appendChild(msg);
}

function createTaraMessageBubble() {
  const msg = document.createElement('div');
  msg.className = 'message tara-msg';
  msg.innerHTML = `<div class="msg-bubble"></div>`;
  chatMessages.appendChild(msg);
  return msg;
}

function appendTypingIndicator() {
  const msg = document.createElement('div');
  msg.className = 'message tara-msg typing-bubble';
  msg.innerHTML = `
    <div class="msg-bubble typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatMessages.appendChild(msg);
  return msg;
}

function appendTaraErrorMessage() {
  const msg = document.createElement('div');
  msg.className = 'message tara-msg';
  msg.innerHTML = `<div class="msg-bubble">Arre yaar, kuch toh gadbad hui! Thoda ruko aur dobara try karo.</div>`;
  chatMessages.appendChild(msg);
}

// Auto scroll chat panel with requestAnimationFrame for layout performance
function autoScrollChat() {
  requestAnimationFrame(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

// 8. Booking Cards & Wishlist Flow
function checkAndRenderBooking(container, text) {
  const match = text.match(/\[BOOKING:\s*([^\]]+)\]/i);
  if (!match) return;

  const destName = match[1].trim();
  const destObj = allDestinations.find(d => d.name.toLowerCase() === destName.toLowerCase());

  if (!destObj) return;

  // Append a trip booking card directly underneath the bubble in the chat UI
  const bookingCard = document.createElement('div');
  bookingCard.className = 'booking-card';
  bookingCard.innerHTML = `
    <div class="booking-title">🗺️ Ready to explore ${destObj.name}?</div>
    <div class="booking-cost">Trip Cost: ₹${destObj.cost.toLocaleString('en-IN')} / person (${destObj.idealDays} Days)</div>
    <button class="booking-btn">Plan This Trip</button>
  `;
  
  // Wire up button click
  bookingCard.querySelector('.booking-btn').addEventListener('click', () => {
    openWishlistModal(destObj.name);
  });

  container.appendChild(bookingCard);
  autoScrollChat();
}

// Wishlist Modal Handlers
const modal = document.getElementById('wishlist-modal');
const modalClose = document.querySelector('.modal-close');
const modalOkBtn = document.getElementById('modal-ok-btn');

function openWishlistModal(destinationName) {
  modal.querySelector('h2').textContent = `Added ${destinationName} to Wishlist!`;
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
modalOkBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Load everything on start
window.addEventListener('DOMContentLoaded', () => {
  loadDestinations();
});
