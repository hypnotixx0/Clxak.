// logincheck.js - handles login and protected page verification
(function() {
  const PASSWORD = "unhiin@clxak.com";
  const TOKEN_KEY = "clxakToken";
  const TOKEN_EXP_KEY = TOKEN_KEY + "_exp";

  // --- login form handling ---
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const input = document.getElementById("password").value;

      if (input === PASSWORD) {
        // generate random token
        const token = Math.random().toString(36).substr(2, 16);
        localStorage.setItem(TOKEN_KEY, token);

        // optional: set expiration 10 minutes
        const expires = Date.now() + 10 * 60 * 1000;
        localStorage.setItem(TOKEN_EXP_KEY, expires);

        // clear password and redirect safely
        document.getElementById("password").value = "";
        window.location.replace("/home");
      } else {
        alert("Wrong password!");
      }
    });

    // redirect if already verified
    if (localStorage.getItem(TOKEN_KEY)) {
      window.location.replace("/home");
    }
  }

  // --- verification for protected pages ---
  const token = localStorage.getItem(TOKEN_KEY);
  const exp = Number(localStorage.getItem(TOKEN_EXP_KEY) || 0);
  const protectedPages = ["/home", "/games", "/tools"];

  const path = window.location.pathname.toLowerCase();
  if (protectedPages.includes(path)) {
    if (!token || Date.now() > exp) {
      // remove expired token
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXP_KEY);
      window.location.replace("/");
    }
  }

  // --- optional: enforce canonical host ---
  if (window.location.hostname !== "clxak.vercel.app") {
    window.location.replace("https://clxak.vercel.app/");
  }
})();
