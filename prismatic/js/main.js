/**
 * PRISMATIC — Main Application (Standalone Mirror)
 */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavScroll();
  initMobileDrawer();
  initCreationsSlider();
  initArtworkModal();
  initInquiryForm();
  initScrollAnimations();
});

function initCursor() {
  const cursor = document.getElementById('customCursor');
  const label = document.getElementById('cursorLabel');
  if (!cursor || window.innerWidth < 1024) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  const interactiveTargets = document.querySelectorAll('a, button, .art-card, .slide-card, .optical-interactive-card');
  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active-hover');
      if (el.classList.contains('art-card')) label.textContent = 'INSPECT';
      else if (el.classList.contains('slide-card')) label.textContent = 'VIEW';
      else label.textContent = 'INTERACT';
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active-hover');
    });
  });
}

function initNavScroll() {
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }, { passive: true });
}

function initMobileDrawer() {
  const toggle = document.getElementById('navToggle');
  const close = document.getElementById('drawerClose');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const links = document.querySelectorAll('.drawer-link, .drawer-btn-cta');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openDrawer);
  if (close) close.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  links.forEach(l => l.addEventListener('click', closeDrawer));
}

function initCreationsSlider() {
  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const counter = document.getElementById('sliderCurIdx');
  const slides = document.querySelectorAll('.slide-card');
  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === currentIndex));
    const slideWidth = slides[0].getBoundingClientRect().width + 32;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    if (counter) counter.textContent = String(currentIndex + 1).padStart(2, '0');
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    });
  }

  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < totalSlides - 1) currentIndex++;
      else if (diff < 0 && currentIndex > 0) currentIndex--;
      updateSlider();
    }
  }, { passive: true });
}

const ARTWORK_SPECS = {
  '01': { tag: 'EXP // 001', title: 'Chromatic Flow', desc: 'Multi-octave continuous simplex fluid displacement. Generates real-time chromatic aberration by offsetting RGB wave vertices along orthogonal normal coordinates.', alg: 'SIMPLEX WAVE NOISE + FRESNEL REFLECT', stage: '60FPS GLSL FRAGMENT SHADER', mat: 'DIELECTRIC LIQUID GLASS / IOR 1.95' },
  '02': { tag: 'EXP // 002', title: 'Fracture', desc: 'Total internal reflection algorithm with Voronoi cellular fracturing. Explores high-stress crystalline boundaries subjected to mathematical shear deformation.', alg: 'VORONOI TESSELLATION + CAUSTICS', stage: 'RAYMARCHED HYPER-POLYGONS', mat: 'QUARTZ CRYSTAL / DISPERSION COEFFICIENT 0.08' },
  '03': { tag: 'EXP // 003', title: 'Afterimage', desc: 'Temporal feedback buffer inducing retinal persistence. High-contrast Acid Lime (#D6FF35) and Signal Orange (#FF5A36) strobe at physiological optical interference harmonics.', alg: 'TEMPORAL ACCUMULATION BUFFER', stage: 'MULTI-PASS POST PROCESSING', mat: 'RETINAL EMISSIVE MATRIX' },
  '04': { tag: 'EXP // 004', title: 'Liquid Matter', desc: 'Viscous zero-gravity mercury simulator. Uses smoothed particle hydrodynamics (SPH) coupled to dynamic environment radiance reflections.', alg: 'SPH FLUID TOPOLOGY + PBR METAL', stage: 'GPU COMPUTE FLUID DISPLACEMENT', mat: 'CHROMIUM MERCURY / ROUGHNESS 0.02' },
  '05': { tag: 'EXP // 005', title: 'Dimension 09', desc: 'Non-Euclidean architectural manifold intersecting 3-space. Implements 4D hypercube rotational projections rendered into brutalist monolithic geometries.', alg: '4D TESSERACT PROJECTION MATRIX', stage: 'PROCEDURAL VERTEX TRANSFORMATION', mat: 'OBSIDIAN POLISHED BASALT' },
  '06': { tag: 'EXP // 006', title: 'Color Theory', desc: 'Visible electromagnetic spectrum harmonic synthesis. Generates micro-tonal color shifts calculated directly from mathematical frequency ratios.', alg: 'ELECTROMAGNETIC WAVELENGTH SYNTH', stage: 'SPECTRAL INTERPOLATION ENGINE', mat: 'PHOTONIC DIFFRACTION GRATING' }
};

function initArtworkModal() {
  const modal = document.getElementById('artModal');
  const closeBtn = document.getElementById('modalClose');
  const inspectBtns = document.querySelectorAll('.btn-inspect-exp, .art-card');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalAlg = document.getElementById('modalAlg');
  const modalStage = document.getElementById('modalStage');
  const modalMat = document.getElementById('modalMat');
  const modalArtCanvas = document.getElementById('modalArtCanvas');
  const downloadBtn = document.getElementById('modalBtnDownload');
  if (!modal) return;

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.art-card');
      const artId = card ? card.dataset.art : '01';
      const spec = ARTWORK_SPECS[artId];
      if (!spec) return;

      modalTag.textContent = spec.tag;
      modalTitle.textContent = spec.title;
      modalDesc.textContent = spec.desc;
      modalAlg.textContent = spec.alg;
      modalStage.textContent = spec.stage;
      modalMat.textContent = spec.mat;

      const mediaBg = card.querySelector('.art-canvas-bg');
      if (mediaBg && modalArtCanvas) modalArtCanvas.className = `modal-art-canvas ${mediaBg.classList[1] || ''}`;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('Shader specification package (.JSON) downloaded.');
    });
  }
}

function initInquiryForm() {
  const form = document.getElementById('labInquiryForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('inqName').value;
    showToast(`Experiment brief received from ${name}. Laboratory dispatch activated.`);
    form.reset();
  });
}

function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }
}

function initScrollAnimations() {
  const animTargets = document.querySelectorAll('.art-card, .process-stage-unit, .slide-card, .manifesto-quote, .cta-inner-card');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animTargets.forEach(target => {
    target.style.opacity = '0';
    target.style.transform = 'translateY(28px)';
    target.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(target);
  });
}

