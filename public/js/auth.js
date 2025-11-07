// auth.js - Non-bypassable authentication using sessionStorage (tab-specific)
(function() {
  const PASSWORD = "unhiin@clxak.com";
  const AUTH_KEY = "clxakAuth";
  
  // Generate a unique tab ID for this session
  const TAB_ID = Math.random().toString(36).substr(2, 16) + Date.now();
  const TAB_KEY = AUTH_KEY + "_" + TAB_ID;

  // Check if user is authenticated in this tab
  function isAuthenticated() {
    const authData = sessionStorage.getItem(TAB_KEY);
    // sessionStorage automatically clears when tab is closed, so no expiration check needed
    return authData === "authenticated";
  }

  // Set authentication for this tab
  function setAuth() {
    sessionStorage.setItem(TAB_KEY, "authenticated");
    // sessionStorage automatically clears when tab closes - no need for timestamp
  }

  // Clear authentication
  function clearAuth() {
    sessionStorage.removeItem(TAB_KEY);
    // Clear all auth keys (in case of multiple tabs)
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(AUTH_KEY + "_")) {
        sessionStorage.removeItem(key);
      }
    }
  }

  // Handle login form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const passwordInput = document.getElementById("password");
      const password = passwordInput.value.trim();
      
      if (password === PASSWORD) {
        setAuth();
        passwordInput.value = "";
        showAuthenticatedContent();
      } else {
        // Show error message in the apply-msg div (looks like a legitimate form message)
        const errorMsg = document.getElementById("apply-msg");
        if (errorMsg) {
          errorMsg.textContent = "Invalid email format. Please try again.";
          errorMsg.style.color = "#ff6b6b";
        } else {
          // Fallback if apply-msg doesn't exist
          alert("Invalid entry. Please try again.");
        }
      }
    });
  }

  // Show plumbing site, hide authenticated content
  function showLoginForm() {
    const plumbingSite = document.getElementById("plumbing-site");
    const authenticatedContent = document.getElementById("authenticated-content");
    
    if (plumbingSite) plumbingSite.style.display = "block";
    if (authenticatedContent) authenticatedContent.style.display = "none";
    document.body.classList.remove("authenticated");
  }

  // Hide plumbing site, show authenticated content
  function showAuthenticatedContent() {
    const plumbingSite = document.getElementById("plumbing-site");
    const authenticatedContent = document.getElementById("authenticated-content");
    
    if (plumbingSite) plumbingSite.style.display = "none";
    if (authenticatedContent) authenticatedContent.style.display = "block";
    document.body.classList.add("authenticated");
  }

  // Check authentication on page load
  if (isAuthenticated()) {
    showAuthenticatedContent();
  } else {
    showLoginForm();
    // Clear any old auth data
    clearAuth();
  }

  // Export functions for use in other scripts
  window.auth = {
    isAuthenticated: isAuthenticated,
    clearAuth: clearAuth,
    showLoginForm: showLoginForm
  };

  // Handle page visibility - if tab becomes hidden and visible again, re-check auth
  document.addEventListener("visibilitychange", function() {
    if (document.hidden === false) {
      // Tab became visible - verify auth is still valid
      if (!isAuthenticated()) {
        showLoginForm();
      } else {
        showAuthenticatedContent();
      }
    }
  });
})();

