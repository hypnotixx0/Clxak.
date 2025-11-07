// auth-check.js - Check authentication for protected pages
// Redirects to home page if not authenticated
(function() {
  const AUTH_KEY = "clxakAuth";
  
  // Get all sessionStorage keys
  function findAuthKey() {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(AUTH_KEY + "_")) {
        const authData = sessionStorage.getItem(key);
        if (authData === "authenticated") {
          return true;
        }
      }
    }
    return false;
  }
  
  // Check if authenticated
  function isAuthenticated() {
    return findAuthKey();
  }
  
  // If not authenticated, redirect to home
  if (!isAuthenticated()) {
    window.location.replace("/");
  }
})();

