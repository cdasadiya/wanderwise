const http = require('http');

const postData = JSON.stringify({
  message: "I want an adventure trip in the mountains, kuch suggest karo!",
  history: []
});

console.log('Sending message to Tara: "I want an adventure trip in the mountains, kuch suggest karo!"');
console.log('Waiting for Tara\'s response...\n');

const req = http.request({
  hostname: 'localhost',
  port: 3001,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Error: Server responded with status ${res.statusCode}`);
    res.resume();
    return;
  }

  let buffer = '';

  res.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop(); // save trailing partial line

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const parsed = JSON.parse(line);
        if (parsed.success && parsed.data) {
          if (parsed.data.chunk) {
            process.stdout.write(parsed.data.chunk);
          }
          if (parsed.data.done) {
            console.log('\n\nStream complete — Tara ne plan bana diya!');
          }
        }
      } catch (err) {
        // Silent catch for partial buffer streams
      }
    }
  });

  res.on('end', () => {
    // Process final buffer line if any
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer);
        if (parsed.success && parsed.data && parsed.data.chunk) {
          process.stdout.write(parsed.data.chunk);
        }
      } catch (err) {}
    }
  });
});

req.on('error', (err) => {
  console.error(`\nError connection failed: ${err.message}`);
  console.error('Make sure the WanderWise server is running locally on port 3001 first!');
});

req.write(postData);
req.end();
