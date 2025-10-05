// Random uplifting messages
const messages = [
  "Unhiins pretty cool huh?",
  "Stay Clxaked",
  "If you got the login your lucky",
  "Have fun blocking this",
  "Unhiin made this"
];

document.addEventListener("DOMContentLoaded", () => {
  const msgEl = document.getElementById("uplift-msg");
  msgEl.textContent = messages[Math.floor(Math.random() * messages.length)];
  document.body.classList.add("loaded");

  const listEl = document.getElementById("game-list");
  const searchInput = document.getElementById("game-search");

  function renderList(filtered) {
    listEl.innerHTML = "";
    filtered.forEach(game => {
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
        btn.target = "_blank";
        btn.className = "game-card-button";
        card.appendChild(btn);
      }

      listEl.appendChild(card);
    });
  }
});
