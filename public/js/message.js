// Random uplifting messages
const messages = [
  "Unhiins pretty cool huh?",
  "Stay Clxaked",
  "If you got the login your lucky",
  "Have fun blocking this",
  "Unhiin made this"
];

// Make messages available globally
window.messages = messages;

// Apply message on page load
function applyMessage() {
  const msgEl = document.getElementById("uplift-msg");
  if (msgEl && !msgEl.textContent) {
    msgEl.textContent = messages[Math.floor(Math.random() * messages.length)];
    document.body.classList.add("loaded");
  }
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", applyMessage);
} else {
  applyMessage();
}

// Also run after a short delay to catch dynamically loaded content
setTimeout(applyMessage, 500);
