const apiKey = "YOUR_NEWSAPI_KEY"; // Replace with your key
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");

async function getNews(category = "general") {
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.articles);
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  if (articles.length === 0) {
    newsContainer.innerHTML = "<p>No articles found.</p>";
    return;
  }
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News Image">
      <div class="news-card-content">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More →</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

searchInput.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    const query = e.target.value;
    if (query.length > 2) {
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      displayNews(data.articles);
    }
  }
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Load default
window.onload = () => getNews();
