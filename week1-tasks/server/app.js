const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const apiUrl = 'https://zenquotes.io/api/quotes';

app.get('/quote/random', async (req, res) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex];
      res.json({ text: quote.q, author: quote.a });
    } else {
      throw new Error('No quotes found');
    }
  } catch (error) {
    console.error('Error fetching random quote:', error);
    res.status(500).json({ error: 'Failed to fetch random quote' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
