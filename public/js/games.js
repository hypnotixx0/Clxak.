// Random uplifting messages
const messages = [
  "Unhiins pretty cool huh?",
  "Stay Clxaked",
  "If you got the login your lucky",
  "Have fun blocking this",
  "Unhiin made this"
];

// Games list
const games = [
  { name: "Fnaf 2", desc: "Something for jr", url: "/html/fnaf2.html" },
  { name: "Cookie Clicker", desc: "Get Clicking", url: "/html/cookieclicker.html" },
  { name: "Balatro", desc: "For u charles", url: "/html/balatro.html" },
  { name: "Hotline Miami", desc: "So Incelcore", url: "/html/hotlinemiami.html" },
  { name: "Fnaf 4", desc: "Luv u nemo", url: "/html/fnaf4.html" },
  { name: "OvO", desc: "Fun Speedrun", url: "/html/OvO.html" },
];

document.addEventListener("DOMContentLoaded", () => {
  const msgEl = document.getElementById("uplift-msg");
  msgEl.textContent = messages[Math.floor(Math.random() * messages.length)];
  document.body.classList.add("loaded");

  const listEl = document.getElementById("game-list");
  const searchInput = document.getElementById("game-search");

  // Helper: sort alphabetically by name
  function sortAlphabetically(list) {
    return list.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  function renderList(filtered) {
    listEl.innerHTML = "";
    // Always display alphabetically
    const sorted = sortAlphabetically(filtered);
    sorted.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";

      card.innerHTML = `
        <h4>${game.name}</h4>
        <p>${game.desc}</p>
      `;

      if (game.url) {
        const btn = document.createElement("a");
        btn.textContent = "Play";
        btn.href = game.url;
        btn.target = "_self";
        btn.className = "game-card-button";
        card.appendChild(btn);
      }

      listEl.appendChild(card);
    });
  }

  // Render games alphabetically on load
  renderList(games);

  // Search functionality (also alphabetically sorted)
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    const filtered = games.filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.desc.toLowerCase().includes(q)
    );
    renderList(filtered);
  });
});

// Proxy search form
const searchForm = document.getElementById('proxy-search-form');
const searchInput = document.getElementById('proxy-search-input');

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = encodeURIComponent(searchInput.value.trim());
    if (!query) return;

    // Redirect through proxy (DuckDuckGo HTML results)
    window.location.href = `/proxy?url=${encodeURIComponent(`https://duckduckgo.com/html/?q=${query}`)}`;
  });
}

