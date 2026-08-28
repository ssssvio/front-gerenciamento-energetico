require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

// Injeta a URL da API em runtime, sem precisar de build step no front puro.
app.get('/env.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.API_BASE_URL = ${JSON.stringify(API_BASE_URL)};`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Frontend rodando em http://localhost:${PORT}`);
});
