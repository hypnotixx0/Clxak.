// Good Luck CR IT team
const SECRET_EMAIL_ENCODED = "dW5oaWluQGNseGFrLmNvbQ=="; // Base64 for unhiin@clxak.com
const REDIRECT_PAGE = "/public/html/home.html";

function decodeEmail(encoded) {
  return atob(encoded); // decode Base64
}

const form = document.getElementById('apply-form');
const input = document.getElementById('email');
const msg = document.getElementById('apply-msg');
const clearBtn = document.getElementById('clear-btn');

clearBtn.addEventListener('click', () => {
  input.value = '';
  msg.textContent = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailVal = input.value.trim().toLowerCase();
  if (!emailVal || !emailVal.includes('@')) {
    msg.textContent = 'Please enter a valid email.';
    return;
  }

  if (emailVal === decodeEmail(SECRET_EMAIL_ENCODED)) {
    msg.textContent = 'Access granted — redirecting…';
    setTimeout(() => { window.location.href = REDIRECT_PAGE; }, 700);
  } else {
    msg.textContent = 'Thanks — your application was received.';
  }
});
