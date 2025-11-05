const iframe = document.querySelector('.game-iframe');

document.querySelector('.reload-btn').addEventListener('click', () => {
  iframe.src = iframe.src; // Reload iframe
});

document.querySelector('.fullscreen-btn').addEventListener('click', () => {
  if (iframe.requestFullscreen) iframe.requestFullscreen();
  else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
});

document.querySelector('.popout-btn').addEventListener('click', () => {
  // Open the actual 2048 GitHub URL in a new tab
  window.open('https://1kh0.github.io/projects/2048/index.html', '_blank', 'width=1000,height=700');
});
