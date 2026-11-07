/**
 * OFFGRID® — Core Application Controller
 * Navigation, Modal Inspector, Crosshair Cursor & Form Telemetry
 */

(function () {
  'use strict';

  // -------------------------------------------------------------
  // 1. REGISTRATION CROSSHAIR CURSOR
  // -------------------------------------------------------------
  const cursor = document.getElementById('crosshairCursor');
  const cursorLabel = document.getElementById('crosshairLabel');

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorLabel) {
        const normX = Math.round((mouseX / window.innerWidth) * 100);
        const normY = Math.round((mouseY / window.innerHeight) * 100);
        cursorLabel.textContent = `REG.${normX}:${normY}`;
      }
    });

    function renderCursor() {
      currentX += (mouseX - currentX) * 0.35;
      currentY += (mouseY - currentY) * 0.35;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  // -------------------------------------------------------------
  // 2. MOBILE DRAWER NAVIGATION
  // -------------------------------------------------------------
  const menuBtn = document.getElementById('menuToggleBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-links a');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // -------------------------------------------------------------
  // 3. STICKY NAV SCROLL SHADOW
  // -------------------------------------------------------------
  const topNav = document.getElementById('topNav');
  window.addEventListener('scroll', () => {
    if (!topNav) return;
    if (window.scrollY > 40) {
      topNav.style.boxShadow = '0 6px 20px rgba(23, 23, 23, 0.12)';
    } else {
      topNav.style.boxShadow = 'none';
    }
  }, { passive: true });

  // -------------------------------------------------------------
  // 4. POSTER INSPECTOR MODAL
  // -------------------------------------------------------------
  const posterModal = document.getElementById('posterModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCanvas = document.getElementById('modalPosterCanvas');
  const modalNum = document.getElementById('modalNum');
  const modalTitle = document.getElementById('modalTitle');
  const modalCat = document.getElementById('modalCat');
  const modalDesc = document.getElementById('modalDesc');
  const btnModalSpec = document.getElementById('btnModalSpec');

  const posterDatabase = {
    '01': {
      num: '01 // POSTER ARCHIVE',
      title: 'STATIC CULTURE',
      cat: 'Experimental Poster & Print Design',
      desc: 'Analogue screen-printing distortions applied to digital vector frameworks. Explores tactile ink bleeding, intentional mis-registration, and brutalist monochrome typography.',
      spec: 'B1 (700 × 1000 mm) • Munken Lynx 300gsm • Pantone 032 U + Process Black'
    },
    '02': {
      num: '02 // POSTER ARCHIVE',
      title: 'TYPE RIOT',
      cat: 'Kinetic Typographic Compositions',
      desc: 'A typographical uprising against corporate cleanliness. Layered Archivo Black marquees collided with signal red backgrounds and mechanical print registration dots.',
      spec: 'A0 (841 × 1189 mm) • Heavy Kraft 280gsm • Screen printed 2-color ink'
    },
    '03': {
      num: '03 // POSTER ARCHIVE',
      title: 'COLOR THEORY',
      cat: 'Chromatic Identity Exploration',
      desc: 'Spectral density study of primary cobalt and signal red pigments under high-lumen gallery lighting conditions.',
      spec: '500 × 700 mm • Cotton Rag 350gsm • Risograph Duo-tone Print'
    },
    '04': {
      num: '04 // POSTER ARCHIVE',
      title: 'OBJECT STUDY',
      cat: 'Abstract Graphic Objects & Forms',
      desc: 'Monolithic geometric cutouts exploring heavy shadows, isometric perspectives, and Swiss spatial tension.',
      spec: '600 × 800 mm • Uncoated Offset 250gsm • Pure Carbon Black Foil'
    },
    '05': {
      num: '05 // POSTER ARCHIVE',
      title: 'NO SIGNAL',
      cat: 'Experimental Digital Campaign',
      desc: 'Broadcast interruption aesthetics combining cathode-ray scanline textures with warning red typographical stamps.',
      spec: 'B1 (700 × 1000 mm) • Metallic Chrome Foil & Deep Carbon Black'
    },
    '06': {
      num: '06 // POSTER ARCHIVE',
      title: 'PRINT MATTERS',
      cat: 'Editorial & Physical Publication',
      desc: 'Manifesto for physical publishing. Highlighting the irreplaceable sensory weight of 450gsm textured cotton board and letterpress embossing.',
      spec: 'Broadsheet Fold • Somerset Velvet 450gsm • Letterpress Embossed'
    }
  };

  function openPosterModal(projectId, posterElement) {
    if (!posterModal) return;

    const data = posterDatabase[projectId] || posterDatabase['01'];
    if (modalNum) modalNum.textContent = data.num;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCat) modalCat.textContent = data.cat;
    if (modalDesc) modalDesc.textContent = data.desc;

    // Clone artwork into modal preview
    if (modalCanvas && posterElement) {
      const art = posterElement.querySelector('.poster-art');
      if (art) {
        modalCanvas.innerHTML = '';
        const clonedArt = art.cloneNode(true);
        clonedArt.style.width = '100%';
        clonedArt.style.height = '100%';
        modalCanvas.appendChild(clonedArt);
      }
    }

    posterModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePosterModal() {
    if (!posterModal) return;
    posterModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind Poster open buttons
  const posterArticles = document.querySelectorAll('.poster-item');
  posterArticles.forEach(article => {
    const pId = article.dataset.project;
    const btn = article.querySelector('.btn-open-poster');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPosterModal(pId, article);
      });
    }
    article.addEventListener('click', () => {
      openPosterModal(pId, article);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePosterModal);
  if (posterModal) {
    posterModal.addEventListener('click', (e) => {
      if (e.target === posterModal) closePosterModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePosterModal();
  });

  // -------------------------------------------------------------
  // 5. TOAST NOTIFICATION SYSTEM
  // -------------------------------------------------------------
  const toast = document.getElementById('offgridToast');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    if (toastText) toastText.textContent = msg;
    toast.classList.add('active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }

  if (btnModalSpec) {
    btnModalSpec.addEventListener('click', () => {
      showToast('Spec sheet dispatched. High-res archive downloaded.');
    });
  }

  // -------------------------------------------------------------
  // 6. CONTACT FORM SUBMISSION
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contactProjectForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName')?.value || 'Explorer';
      showToast(`Transmission received from ${name}. OFFGRID studio will reply shortly.`);
      contactForm.reset();
    });
  }

  // -------------------------------------------------------------
  // 7. APEX RETURN BUTTON
  // -------------------------------------------------------------
  const apexBtn = document.getElementById('btnReturnApex');
  if (apexBtn) {
    apexBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();

