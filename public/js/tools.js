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
const CLOAK_STORAGE_KEY = 'clxakTabCloak';
const CLOAK_TITLE_KEY = 'clxakCloakTitle';
const CLOAK_FAVICON_KEY = 'clxakCloakFavicon';

// Function to apply cloak (used both when applying and on page load)
function applyCloak(title, favicon) {
  if (title) {
    document.title = title;
  }
  
  if (favicon) {
    // Remove existing favicon links
    document.querySelectorAll("link[rel~='icon'], link[rel~='shortcut icon']").forEach(link => link.remove());
    
    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = favicon;
    document.head.appendChild(link);
  }
}

// Function to save cloak to localStorage
function saveCloak(title, favicon) {
  if (title) {
    localStorage.setItem(CLOAK_TITLE_KEY, title);
  }
  if (favicon) {
    localStorage.setItem(CLOAK_FAVICON_KEY, favicon);
  }
  localStorage.setItem(CLOAK_STORAGE_KEY, 'true');
}

// Function to clear saved cloak
function clearCloak() {
  localStorage.removeItem(CLOAK_TITLE_KEY);
  localStorage.removeItem(CLOAK_FAVICON_KEY);
  localStorage.removeItem(CLOAK_STORAGE_KEY);
}

// Apply saved cloak on page load
function applySavedCloak() {
  const savedTitle = localStorage.getItem(CLOAK_TITLE_KEY);
  const savedFavicon = localStorage.getItem(CLOAK_FAVICON_KEY);
  
  if (savedTitle || savedFavicon) {
    applyCloak(savedTitle, savedFavicon);
  }
}

// Apply saved cloak immediately when script loads
applySavedCloak();

// Tab Cloaker UI (only on tools page)
const titleSelect = document.getElementById('title-select');
const faviconSelect = document.getElementById('favicon-select');
const applyCloakBtn = document.getElementById('apply-cloak');

if (applyCloakBtn) {
  applyCloakBtn.addEventListener('click', () => {
    const newTitle = titleSelect ? titleSelect.value : null;
    const newFavicon = faviconSelect ? faviconSelect.value : null;

    // Apply the cloak
    applyCloak(newTitle, newFavicon);
    
    // Save to localStorage for persistence
    saveCloak(newTitle, newFavicon);

    // Visual feedback
    applyCloakBtn.textContent = "Applied ✓";
    setTimeout(() => applyCloakBtn.textContent = "Apply Cloak", 1300);
  });
  
  // Load saved values into selects if they exist
  const savedTitle = localStorage.getItem(CLOAK_TITLE_KEY);
  const savedFavicon = localStorage.getItem(CLOAK_FAVICON_KEY);
  
  if (titleSelect && savedTitle) {
    titleSelect.value = savedTitle;
  }
  if (faviconSelect && savedFavicon) {
    faviconSelect.value = savedFavicon;
  }
}

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
