const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const apiUrl = 'https://zenquotes.io/api/quotes';

app.use(express.static('public'));

app.get('/quote/random', async (req, res) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex];
      res.json({ text: quote.q, author: quote.a });
    } else {
      throw new Error('Invalid response format from ZenQuotes API');
    }
  } catch (error) {
    console.error('Error fetching random quote:', error);
    res.status(500).json({ error: 'Failed to fetch random quote' });
  }
});

app.get('/quote/search', async (req, res) => {
  const searchTerm = req.query.author.toLowerCase();
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const matchedQuote = data.find(quote =>
      quote.a.toLowerCase().includes(searchTerm)
    );

    if (matchedQuote) {
      res.json({ text: matchedQuote.q, author: matchedQuote.a });
    } else {
      res.status(404).json({ error: 'Quote not found' });
    }
  } catch (error) {
    console.error('Error searching quotes by author:', error);
    res.status(500).json({ error: 'Failed to search quotes by author' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
