const apiKey = '08ca2bc620b147f4a8372fb9f59e9d51';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-iput");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news", error);
    return [];
  }
}

async function fetchNewsByQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news by query", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    if (article.urlToImage && article.description) {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      const img = document.createElement("img");
      img.src = article.urlToImage;
      img.alt = article.title;

      const title = document.createElement("h2");
      const truncatedTitle = article.title && article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
      title.textContent = truncatedTitle;

      const description = document.createElement("p");
      const truncatedDescription = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
      description.textContent = truncatedDescription;

      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(description);
      blogCard.addEventListener('click', () => {
        window.open(article.url, "_blank");
      });
      blogContainer.appendChild(blogCard);
    }
  });
}

searchButton.addEventListener('click', async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsByQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  }
});

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.log("Error fetching news", error);
  }
})();