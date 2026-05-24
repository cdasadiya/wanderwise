const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve website static files
app.use(express.static(path.join(__dirname, '../website')));

app.listen(PORT, () => {
  console.log(`WanderWise Website running at http://localhost:${PORT}`);
});
