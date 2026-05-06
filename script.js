(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.nav-links a');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('.card').forEach((el, i) => {
    el.style.setProperty('--d', `${Math.min(i * 40, 400)}ms`);
  });

  // Deep-link support: if the URL arrives with #sectionId AND scene.js has
  // booted the 3D layer, open that section's dialog automatically once
  // monitors are ready. scene.js dispatches a 'scene:ready' event on window.
  window.addEventListener('scene:ready', () => {
    const id = location.hash.slice(1);
    if (!id) return;
    const monitor = document.getElementById(id);
    if (!monitor) return;
    // Synthesize a click on the matching monitor by dispatching a scene:open
    // event scene.js listens to; it doesn't need raycaster pickup.
    window.dispatchEvent(new CustomEvent('scene:open', { detail: { sectionId: id } }));
  });
})();
