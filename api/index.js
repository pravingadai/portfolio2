// Simple Express server for Vercel
const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Export for Vercel
module.exports = app;