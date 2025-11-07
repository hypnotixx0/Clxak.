// nav-handler.js - Handle title link navigation with auth check
(function() {
  const AUTH_KEY = "clxakAuth";
  
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
  
  // Handle title/brand link clicks
  function handleBrandClick(e) {
    // If authenticated, navigate to home (which will show authenticated view)
    if (isAuthenticated()) {
      // If we're on index.html, prevent default and show authenticated content
      if (window.location.pathname === '/' && window.auth && window.auth.showAuthenticatedContent) {
        e.preventDefault();
        window.auth.showAuthenticatedContent();
      }
      // On other pages, just navigate to "/" - it will show authenticated view
      // (don't prevent default, let it navigate)
    }
    // If not authenticated, allow default behavior (go to login)
  }
  
  // Attach handlers to all brand links
  document.addEventListener('DOMContentLoaded', function() {
    const brandLinks = document.querySelectorAll('.brand a, a.brand, .site-header .brand a');
    brandLinks.forEach(link => {
      // Only attach if it's a link to home/login
      if (link.href && (link.href.endsWith('/') || link.getAttribute('href') === '/' || link.getAttribute('href') === '/home')) {
        link.addEventListener('click', handleBrandClick);
      }
    });
  });
})();

