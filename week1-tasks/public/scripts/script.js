const quoteTextElement = document.getElementById('quote-text');
const authorElement = document.getElementById('author');
const nextQuoteButton = document.getElementById('next-quote-btn');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('author-search');

function getRandomQuote() {
  fetch('/quote/random')
    .then(response => response.json())
    .then(data => {
      displayQuote(data);
    })
    .catch(error => {
      console.error('Error fetching random quote:', error);
    });
}

function searchByAuthor() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === '') {
    alert('Please enter an author name to search.');
    return;
  }

  fetch(`/quote/search?author=${searchTerm}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        displayQuote(data);
      } else {
        quoteTextElement.textContent = 'No quotes found for this author.';
        authorElement.textContent = '';
      }
    })
    .catch(error => {
      console.error('Error searching quotes by author:', error);
    });
}

function displayQuote(quote) {
  quoteTextElement.textContent = quote.text;
  authorElement.textContent = quote.author;
}

nextQuoteButton.addEventListener('click', getRandomQuote);
searchButton.addEventListener('click', searchByAuthor);

// Initial load
getRandomQuote();
