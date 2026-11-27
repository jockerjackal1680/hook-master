const express = require('express');
const app = express();
const port = 3000;

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

// Serve a simple icon for notifications
app.get('/icon.png', (req, res) => {
  res.sendFile(__dirname + '/icon.png');
});

// Start the server
app.listen(port, () => {
  console.log(`\n🚀 Hook Master Backend Running at http://localhost:${port}`);
  console.log(`   Endpoint: POST /track`);
  console.log(`   Endpoint: POST /title`);
});