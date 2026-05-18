document.addEventListener('DOMContentLoaded', () => {

  // ─── DOSSIER DES IMAGES ──────────────────────────────────────────────────
  // Ajoute automatiquement le préfixe 'assets/' à toutes les images
  const basePath = 'assets/';

  // ─── DATA ─────────────────────────────────────────────────────────────────
  const rawRelmite = [
    'work-22.webp','work-24.webp','work-25.webp','work-26.webp','work-9.webp',
    'work-27.webp','work-28.webp','work-29.webp','work-30.webp',
    'work-31.webp','work-32.webp','work-33.webp','work-34.webp',
    'work-35.webp','work-36.webp','work-37.webp','work-38.webp',
    'work-89.webp','work-98.webp','work-100.webp','work-113.webp'
  ];

  const rawPetalsmooth = [
    'work-2.webp','work-3.webp','work-39.webp','work-40.webp',
    'work-41.webp','work-42.webp','work-43.webp','work-44.webp',
    'work-45.webp','work-46.webp','work-47.webp','work-48.webp',
    'work-49.webp','work-5.webp','work-50.webp','work-51.webp',
    'work-52.webp','work-53.webp','work-54.webp','work-55.webp',
    'work-56.webp','work-57.webp','work-58.webp','work-59.webp',
    'work-60.webp','work-84.webp','work-85.webp','work-86.webp',
    'work-87.webp','work-88.webp','work-102.webp','work-103.webp',
    'work-105.webp','work-106.webp','work-107.webp','work-108.webp'
  ];

  const rawAllImages = [
    'work-1.webp','work-2.webp','work-3.webp','work-4.webp',
    'work-5.webp','work-6.webp','work-7.webp','work-8.webp',
    'work-9.webp','work-10.webp','work-11.webp','work-12.webp',
    'work-13.webp','work-14.webp','work-15.webp','work-16.webp',
    'work-17.webp','work-18.webp','work-19.webp','work-20.webp',
    'work-21.webp','work-22.webp','work-23.webp','work-24.webp',
    'work-25.webp','work-26.webp','work-27.webp','work-28.webp',
    'work-29.webp','work-30.webp','work-31.webp','work-32.webp',
    'work-33.webp','work-34.webp','work-35.webp','work-36.webp',
    'work-37.webp','work-38.webp','work-39.webp','work-40.webp',
    'work-41.webp','work-42.webp','work-43.webp','work-44.webp',
    'work-45.webp','work-46.webp','work-47.webp','work-48.webp',
    'work-49.webp','work-50.webp','work-51.webp','work-52.webp',
    'work-53.webp','work-54.webp','work-55.webp','work-56.webp',
    'work-57.webp','work-59.webp','work-60.webp','work-99.webp',
    'work-61.webp','work-62.webp','work-63.webp','work-64.webp',
    'work-65.webp','work-66.webp','work-67.webp','work-68.webp',
    'work-69.webp','work-70.webp','work-71.webp','work-72.webp',
    'work-73.webp','work-74.webp','work-75.webp','work-76.webp',
    'work-77.webp','work-78.webp','work-79.webp','work-80.webp',
    'work-81.webp','work-82.webp','work-83.webp','work-84.webp',
    'work-85.webp','work-86.webp','work-87.webp','work-88.webp',
    'work-89.webp','work-91.webp','work-92.webp','work-97.webp',
    'work-93.webp','work-94.webp','work-95.webp','work-96.webp',
    'work-97.webp','work-101.webp','work-102.webp','work-103.webp','work-104.webp',
    'work-105.webp','work-106.webp','work-107.webp','work-108.webp',
    'work-109.webp','work-110.webp','work-111.webp','work-112.webp',
    'work-113.webp','work-114.webp'
  ];

  // Application du chemin d'accès
  const relmiteImages = rawRelmite.map(img => basePath + img);
  const petalsmoothImages = rawPetalsmooth.map(img => basePath + img);
  const allImages = shuffle(rawAllImages.map(img => basePath + img));

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ─── BUILD PIN GRIDS ───────────────────────────────────────────────────────
  function buildPins(containerId, images) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = '';
    
    images.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'pin';
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Portfolio Asset';
      img.loading = 'lazy';
      
      // MODE DEBUG : Affiche les images cassées avec une bordure rouge
      img.onerror = function() {
        this.style.border = "2px solid red";
        this.alt = "ERREUR : " + src;
        console.error("L'image n'a pas été trouvée à cet endroit : ", this.src);
      };

      div.appendChild(img);
      div.addEventListener('click', () => openLightbox(images, i));
      c.appendChild(div);
    });
  }

  buildPins('pinGrid', allImages);
  buildPins('grid-relmite', relmiteImages);
  buildPins('grid-petalsmooth', petalsmoothImages);

  // ─── LIGHTBOX ──────────────────────────────────────────────────────────────
  let lbImages = [], lbIndex = 0;

  window.openLightbox = function(images, index) {
    lbImages = images;
    lbIndex = index;
    setLbImg(images[index]);
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function setLbImg(src) {
    const img = document.getElementById('lbImg');
    img.style.opacity = '0';
    setTimeout(() => { img.src = src; img.style.opacity = '1'; }, 100);
    img.style.transition = 'opacity .2s ease';
  }

  window.closeLightbox = function() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  };

  window.lbNav = function(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    setLbImg(lbImages[lbIndex]);
  };

  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'ArrowRight') window.lbNav(1);
    if (e.key === 'ArrowLeft')  window.lbNav(-1);
    if (e.key === 'Escape')     window.closeLightbox();
  });

  // ─── CASE PANELS ───────────────────────────────────────────────────────────
  let savedScroll = 0;

  window.openPanel = function(name) {
    savedScroll = window.scrollY;
    document.getElementById('panel-' + name).classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closePanel = function(name) {
    document.getElementById('panel-' + name).classList.remove('open');
    document.body.style.overflow = '';
    window.scrollTo(0, savedScroll);
  };

  // ─── CURSOR ────────────────────────────────────────────────────────────────
  const cur = document.getElementById('cursor');
  const cf  = document.getElementById('cf');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  
  // Effet de clic sur le curseur
  document.addEventListener('mousedown', () => { cur.style.transform = 'translate(-50%, -50%) scale(0.6)'; });
  document.addEventListener('mouseup', () => { cur.style.transform = 'translate(-50%, -50%) scale(1)'; });

  (function animC() {
    fx += (mx - fx) * 0.2; fy += (my - fy) * 0.2;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    cf.style.left  = fx + 'px'; cf.style.top  = fy + 'px';
    requestAnimationFrame(animC);
  })();

  document.querySelectorAll('a, button, .case-card, .pin, .metric-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hov'); cf.classList.add('hov'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hov'); cf.classList.remove('hov'); });
  });

  // ─── NAV SCROLL ────────────────────────────────────────────────────────────
  window.addEventListener('scroll', () =>
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60)
  );

  // ─── INTERSECTION OBSERVER (Animations au scroll) ──────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('[data-animate], .metric-item').forEach(el => obs.observe(el));

  // ─── MAGNETIC BUTTONS ──────────────────────────────────────────────────────
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.25;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0px, 0px)'; });
  });

});
