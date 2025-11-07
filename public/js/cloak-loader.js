// cloak-loader.js - Apply saved tab cloak on authenticated pages only
(function() {
  const CLOAK_TITLE_KEY = 'clxakCloakTitle';
  const CLOAK_FAVICON_KEY = 'clxakCloakFavicon';
  const AUTH_KEY = 'clxakAuth';
  
  // Check if user is authenticated
  function isAuthenticated() {
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
  
  // Check if we're on the plumbing/login page
  function isPlumbingPage() {
    // Check if plumbing site is visible
    const plumbingSite = document.getElementById('plumbing-site');
    const authenticatedContent = document.getElementById('authenticated-content');
    
    // If plumbing site exists and is visible, or authenticated content doesn't exist, we're on login page
    if (plumbingSite && (plumbingSite.style.display !== 'none' && window.getComputedStyle(plumbingSite).display !== 'none')) {
      return true;
    }
    
    // If authenticated content doesn't exist at all, we're likely on login page
    if (!authenticatedContent) {
      // Check if body has authenticated class
      if (!document.body.classList.contains('authenticated')) {
        // Check if we're on index.html and not authenticated
        if (window.location.pathname === '/' && !isAuthenticated()) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  // Function to apply cloak
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
  
  // Function to restore original title/favicon (for plumbing page)
  function restoreOriginal() {
    // Restore original title if it was a plumbing title
    const plumbingTitle = "Dover Reliable Plumbing";
    if (document.title !== plumbingTitle) {
      // Only restore if we have a saved cloak (meaning it was applied)
      const savedTitle = localStorage.getItem(CLOAK_TITLE_KEY);
      if (savedTitle && document.title === savedTitle) {
        document.title = plumbingTitle;
      }
    }
    
    // Remove custom favicon if it was a cloaked one
    const savedFavicon = localStorage.getItem(CLOAK_FAVICON_KEY);
    if (savedFavicon) {
      document.querySelectorAll("link[rel~='icon'], link[rel~='shortcut icon']").forEach(link => {
        if (link.href === savedFavicon) {
          link.remove();
        }
      });
    }
  }
  
  // Apply saved cloak on page load (only if authenticated)
  function applySavedCloak() {
    // Don't apply cloak on plumbing/login page
    if (isPlumbingPage()) {
      restoreOriginal();
      return;
    }
    
    // Only apply if authenticated
    if (!isAuthenticated()) {
      restoreOriginal();
      return;
    }
    
    const savedTitle = localStorage.getItem(CLOAK_TITLE_KEY);
    const savedFavicon = localStorage.getItem(CLOAK_FAVICON_KEY);
    
    if (savedTitle || savedFavicon) {
      applyCloak(savedTitle, savedFavicon);
    }
  }
  
  // Apply immediately when script loads
  applySavedCloak();
  
  // Also apply on DOMContentLoaded in case script loads early
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySavedCloak);
  }
  
  // Watch for authentication changes (when user logs in/out)
  let lastAuthState = isAuthenticated();
  setInterval(() => {
    const currentAuthState = isAuthenticated();
    if (currentAuthState !== lastAuthState) {
      lastAuthState = currentAuthState;
      applySavedCloak();
    }
  }, 500);
})();

