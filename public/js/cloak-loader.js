// cloak-loader.js - Apply saved tab cloak on all pages
(function() {
  const CLOAK_TITLE_KEY = 'clxakCloakTitle';
  const CLOAK_FAVICON_KEY = 'clxakCloakFavicon';
  
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
  
  // Apply saved cloak on page load
  function applySavedCloak() {
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
})();

