// ------------------------- Tool data -------------------------
const tools = [
  { title: "Tab Cloaker", id: "cloaker-tool", type: "tabCloak" },
  { title: "Blob Cloaker", id: "blob-tool", type: "blob" }
];

// ------------------------- DOM refs -------------------------
const toolListEl = document.getElementById('tool-list');
const searchInput = document.getElementById('tool-search');

// ------------------------- Render tools -------------------------
function renderTools(filter = "") {
  toolListEl.innerHTML = "";
  tools
    .filter(t => t.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(tool => {
      const card = document.createElement('div');
      card.className = "tool-card";
      card.innerHTML = `<span>${tool.title}</span><button>Open</button>`;
      card.querySelector('button').addEventListener('click', () => {
        document.querySelectorAll('.tool-display').forEach(el => {
          el.style.display = 'none'; el.setAttribute('aria-hidden','true');
        });
        const el = document.getElementById(tool.id);
        if (el) { el.style.display = 'block'; el.setAttribute('aria-hidden','false'); }
      });
      toolListEl.appendChild(card);
    });
}

searchInput.addEventListener('input', () => renderTools(searchInput.value));
renderTools();

// ------------------------- Tab Cloaker logic -------------------------
const titleSelect = document.getElementById('title-select');
const faviconSelect = document.getElementById('favicon-select');
const applyCloakBtn = document.getElementById('apply-cloak');

applyCloakBtn.addEventListener('click', () => {
  const newTitle = titleSelect.value || document.title;
  const newFavicon = faviconSelect.value || null;

  // change tab title
  document.title = newTitle;

  // change favicon (create link if needed)
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  if (newFavicon) link.href = newFavicon;

  // small visual feedback
  applyCloakBtn.textContent = "Applied ✓";
  setTimeout(()=> applyCloakBtn.textContent = "Apply Cloak", 1300);
});

// ------------------------- Blob Cloaker (no external file) -------------------------
let lastBlobUrl = null;

async function openBlobOfCurrentPage() {
  try {
    // gather whole current HTML (including inlined state)
    let html = document.documentElement.outerHTML;

    // Optionally: inject a visible "fake path" banner so it looks like a different path
    const fakePath = generateFakePath('/tools');
    html = html.replace('</body>',
      `<div style="position:fixed;top:10px;left:10px;background:rgba(0,0,0,0.6);padding:6px 10px;border-radius:8px;color:${'#00cfff'};font-family:monospace;z-index:2147483647">${fakePath}</div></body>`);

    // create blob and navigate to it
    const blob = new Blob([html], { type: 'text/html' });
    lastBlobUrl = URL.createObjectURL(blob);

    // navigation to blob in same tab (user will be on blob: URL)
    window.location.href = lastBlobUrl;
  } catch (err) {
    console.error("Failed to open blob:", err);
    alert("Failed to open blob (see console).");
  }
}

function revokeLastBlob() {
  if (lastBlobUrl) {
    URL.revokeObjectURL(lastBlobUrl);
    lastBlobUrl = null;
    alert("Blob revoked. Refresh the page to return to the normal site.");
  } else {
    alert("No active blob to revoke in this session.");
  }
}

function generateFakePath(base = '/site') {
  const parts = ['portal','alpha','beta','hidden','secret','edu'];
  const pick = parts[Math.floor(Math.random()*parts.length)];
  return `${base}/${pick}`;
}

// attach blob buttons
document.getElementById('open-blob-btn').addEventListener('click', openBlobOfCurrentPage);
document.getElementById('revoke-blob-btn').addEventListener('click', revokeLastBlob);
