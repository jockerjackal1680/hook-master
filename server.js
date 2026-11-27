const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from current directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Simple backend endpoint to receive hook data
app.post('/track', (req, res) => {
  const { userId, source, timestamp } = req.body;
  
  console.log(`\n🎣 Hook Received!`);
  console.log(`   User: ${userId}`);
  console.log(`   Source: ${source}`);
  console.log(`   Time: ${timestamp}`);
  console.log(`   Body:`, req.body);
  
  // Send a response back to the frontend
  res.json({ 
    status: 'hooked', 
    message: 'Victim captured!',
    receivedAt: new Date().toISOString() 
  });
});

// Handle the title change request (if you want to track that too)
app.post('/title', (req, res) => {
  console.log('\n📄 Title Updated!');
  res.json({ status: 'title_updated' });
});

// Serve the user's photo as icon (using my-photo.jpg)
app.get('/icon.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-photo.jpg'));
});

// Start the server
app.listen(port, () => {
  console.log(`\n🚀 Hook Master Backend Running at http://localhost:${port}`);
  console.log(`   Endpoint: POST /track`);
  console.log(`   Endpoint: POST /title`);
  console.log(`   Icon: GET /icon.png`);
});