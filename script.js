//storage the api inside a constant

const apikey = '2f32b24d0fed49dc955a59a16c2ab86c';
const blogContainer = document.getElementById('blog-container');
blogContainer.style.fontFamily="'Times New Roman', Times, serif";
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
//fetching the data from the new API
async function fetchRandomNews() {
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl)
        const data = await response.json();
        return data.articles;       
    } catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener('click', async ()=>{
    const searchQuery = searchField.value.trim();
    if(searchQuery !== ""){
        try{
            const articles = await fetchNewsQuery(searchQuery);
            displayBLogs(articles);
        }catch(error){
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;       
    } catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBLogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {

        const blogCard = document.createElement('div');
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length > 30? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = TruncatedTitle;

        const description = document.createElement("p");
        const TruncatedDes = article.description.length > 120? article.description.slice(0, 120) + "...." : article.description;
        description.textContent = TruncatedDes;
        

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=>{
            window.open(article.url, '_blank');
        });

        blogContainer.appendChild(blogCard)



    });
}

(async()=>{
    try{
       const articles = await fetchRandomNews();
       displayBLogs(articles)
    }catch(error){
        console.error("Error fetching random news", error);
    }
})();

const searchInput = document.getElementById('search-input');
