const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const posts = await response.json();
        renderCards(posts.slice(0, 12)); // Берем первые 12 записей
    } catch (error) {
        console.error("Download error", error);
    }
}

function renderCards(posts) {
    const container = document.getElementById("cards-container");

    posts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
      <img src="https://img02.rl0.ru/afisha/e1000x500i/daily.afisha.ru/uploads/images/3/66/366aaf2940195925492c549b3c5c57b2.jpg" alt="Image">
      <div class="card-content">
        <h3 class="card-title">${post.title}</h3>
        <p class="card-body">${post.body}</p>
      </div>
    `;

        container.appendChild(card);
    });
}

fetchPosts();