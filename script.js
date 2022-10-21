const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotesBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

function loading () {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
function newQuotes () {
  loading();
  const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)]
  console.log(quote);
//Check if author is unknown
  if (!authorText) {
    authorText.textContent = 'Unknown';
  }
  else {
    authorText.textContent = quote.author;
  }
  //Ceck if Quote is long
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
}
  else {
    quoteText.classList.remove('long-quote');
  }
quoteText.textContent = quote.text;
complete();
}

async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    loading();
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuotes();
      console.log(apiQuotes);
    }
    catch (error) {
      console.error(error);
    }
}

//Tweet
function tweetQuote () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listners
newQuotesBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
getQuotes();