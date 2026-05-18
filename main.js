document.addEventListener('DOMContentLoaded', () => {

  // ─── DOSSIER DES IMAGES ──────────────────────────────────────────────────
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
    'work-89.webp','work-91.webp','work-92.webp',
    'work-93.webp','work-94.webp','work-95.webp','work-96.webp',
    'work-97.webp','work-101.webp','work-102.webp','work-103.webp','work-104.webp',
    'work-105.webp','work-106.webp','work-107.webp','work-108.webp',
    'work-109.webp','work-110.webp','work-111.webp','work-112.webp',
    'work-113.webp','work-114.webp'
  ];

  const relmiteImages     = rawRelmite.map(img => basePath + img);
  const petalsmoothImages = rawPetalsmooth.map(img => basePath + img);
  const allImages         = shuffle(rawAllImages.map(img => basePath + img));

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
      img.onerror = function() {
        this.style.border = '2px solid red';
        this.alt = 'ERREUR : ' + src;
        console.error("L'image n'a pas été trouvée : ", this.src);
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
  let lbImages = [], lbIndex = 0, lbOpen = false;

  window.openLightbox = function(images, index) {
    lbImages = images;
    lbIndex  = index;
    setLbImg(images[index]);
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
    lbOpen = true;
    history.pushState({ lightbox: true }, '');
  };

  function setLbImg(src) {
    const img = document.getElementById('lbImg');
    img.style.opacity = '0';
    setTimeout(() => { img.src = src; img.style.opacity = '1'; }, 100);
    img.style.transition = 'opacity .2s ease';
  }

  window.closeLightbox = function() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = activePanel ? 'hidden' : '';
    lbOpen = false;
    if (history.state && history.state.lightbox) {
      history.back();
    }
  };

  window.lbNav = function(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    setLbImg(lbImages[lbIndex]);
  };

  document.addEventListener('keydown', e => {
    if (!lbOpen) return;
    if (e.key === 'ArrowRight') window.lbNav(1);
    if (e.key === 'ArrowLeft')  window.lbNav(-1);
    if (e.key === 'Escape')     window.closeLightbox();
  });

  // ─── CASE PANELS ───────────────────────────────────────────────────────────
  let savedScroll = 0;
  let activePanel = null;

  history.replaceState({ panel: null, lightbox: false }, '');

  window.openPanel = function(name) {
    if (!activePanel) savedScroll = window.scrollY;
    if (activePanel && activePanel !== name) {
      document.getElementById('panel-' + activePanel).classList.remove('open');
    }
    activePanel = name;
    document.getElementById('panel-' + name).classList.add('open');
    document.body.style.overflow = 'hidden';
    history.pushState({ panel: name }, '');
  };

  window.closePanel = function(name) {
    document.getElementById('panel-' + name).classList.remove('open');
    document.body.style.overflow = '';
    activePanel = null;
    window.scrollTo(0, savedScroll);
    if (history.state && history.state.panel === name) {
      history.back();
    }
  };

  // ─── POPSTATE — bouton retour navigateur / smartphone ─────────────────────
  window.addEventListener('popstate', e => {
    const state = e.state || {};

    // Priorité 1 : ferme la lightbox si elle est ouverte
    if (lbOpen) {
      document.getElementById('lightbox').classList.remove('open');
      document.body.style.overflow = activePanel ? 'hidden' : '';
      lbOpen = false;
      return;
    }

    // Priorité 2 : ferme le panel si l'état cible n'en contient pas
    if (!state.panel && activePanel) {
      document.getElementById('panel-' + activePanel).classList.remove('open');
      document.body.style.overflow = '';
      activePanel = null;
      window.scrollTo(0, savedScroll);
      return;
    }

    // Priorité 3 : ouvre un panel différent si l'état cible en contient un
    if (state.panel && state.panel !== activePanel) {
      if (activePanel) {
        document.getElementById('panel-' + activePanel).classList.remove('open');
      }
      activePanel = state.panel;
      document.getElementById('panel-' + activePanel).classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  // ─── CURSOR ────────────────────────────────────────────────────────────────
  const cur = document.getElementById('cursor');
  const cf  = document.getElementById('cf');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mousedown', () => { cur.style.transform = 'translate(-50%, -50%) scale(0.6)'; });
  document.addEventListener('mouseup',   () => { cur.style.transform = 'translate(-50%, -50%) scale(1)'; });

  (function animC() {
    fx += (mx - fx) * 0.2; fy += (my - fy) * 0.2;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    cf.style.left  = fx + 'px'; cf.style.top  = fy + 'px';
    requestAnimationFrame(animC);
  })();

  document.querySelectorAll('a, button, .case-card, .pin, .metric-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hov');    cf.classList.add('hov'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hov'); cf.classList.remove('hov'); });
  });

  // ─── NAV SCROLL ────────────────────────────────────────────────────────────
  window.addEventListener('scroll', () =>
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60)
  );

  // ─── INTERSECTION OBSERVER ─────────────────────────────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('[data-animate], .metric-item').forEach(el => obs.observe(el));

  // ─── MAGNETIC BUTTONS ──────────────────────────────────────────────────────
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.25;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0px, 0px)'; });
  });

});
