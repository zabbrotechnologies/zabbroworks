/**
 * SYNTHORA — Main Interactive Logic
 * Pure Vanilla JavaScript — High Performance
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initServicesSlider();
  initProcessSwitchboard();
  initShowreelModal();
  initTransmissionForm();
});

/**
 * Mobile navigation drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerClose');
  const links = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Services slider controls & index tracker
 */
function initServicesSlider() {
  const slider = document.getElementById('servicesSlider');
  const prevBtn = document.getElementById('servicePrevBtn');
  const nextBtn = document.getElementById('serviceNextBtn');
  const indexDisplay = document.getElementById('sliderIndex');
  const cards = document.querySelectorAll('.service-card');

  if (!slider || !prevBtn || !nextBtn || !cards.length) return;

  let currentIndex = 0;
  const total = cards.length;

  const updateDisplay = () => {
    indexDisplay.textContent = `0${currentIndex + 1} / 0${total}`;
    
    // In mobile/tablet horizontal scroll or highlights
    cards.forEach((card, i) => {
      if (i === currentIndex) {
        card.style.borderColor = 'var(--color-electric-magenta)';
        card.style.boxShadow = '0 0 20px rgba(255, 22, 213, 0.4)';
      } else {
        card.style.borderColor = '';
        card.style.boxShadow = '';
      }
    });

    // If on smaller screens, scroll card into view
    if (window.innerWidth <= 992) {
      cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    updateDisplay();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateDisplay();
  });
}

/**
 * Interactive process switchboard (01 Discover, 02 Imagine, 03 Engineer, 04 Launch)
 */
function initProcessSwitchboard() {
  const stepBtns = document.querySelectorAll('.step-btn');
  const progressBar = document.getElementById('pipelineProgress');
  const stageTag = document.getElementById('processStageTag');
  const title = document.getElementById('processTitle');
  const body = document.getElementById('processBody');
  const deliverables = document.getElementById('processDeliverables');
  const radarData = document.querySelector('.radar-data');

  if (!stepBtns.length) return;

  const stepsData = [
    {
      tag: 'STAGE 01 // SCOPING & SIGNALS',
      title: '01 — DISCOVER',
      body: 'We dissect industry complexity, extract cultural signals, and establish foundational technical parameters. We define clear KPIs and cybernetic design vectors before laying down architecture.',
      deliverables: [
        '&bull; Cultural & Competitive Telemetry',
        '&bull; Technical Architecture Blueprint',
        '&bull; Core User Personas & Journey Mapping'
      ],
      coord: 'COORD: 35.6762° N, 139.6503° E',
      progress: '25%'
    },
    {
      tag: 'STAGE 02 // CREATIVE SYNTHESIS',
      title: '02 — IMAGINE',
      body: 'Rapid visual prototyping, 3D motion studies, and spatial layout simulations. We merge high-contrast Y2K aesthetics with uncompromising UI usability to forge unprecedented brand universes.',
      deliverables: [
        '&bull; High-Fidelity Interactive Wireframes',
        '&bull; Custom 3D Art & Motion Systems',
        '&bull; Cybernetic Micro-Interactions'
      ],
      coord: 'COORD: 52.5200° N, 13.4050° E',
      progress: '50%'
    },
    {
      tag: 'STAGE 03 // FULL-STACK RUNTIME',
      title: '03 — ENGINEER',
      body: 'Clean, performant codebase constructed with modern standards. Sub-millisecond rendering loops, hardware acceleration, and seamless API integrations engineered for global scale.',
      deliverables: [
        '&bull; Lightweight Vanilla JS & CSS Modules',
        '&bull; 60/120 FPS Animation Pipelines',
        '&bull; Rigorous Security & Accessibility Audits'
      ],
      coord: 'COORD: 37.7749° N, 122.4194° W',
      progress: '75%'
    },
    {
      tag: 'STAGE 04 // GLOBAL DEPLOYMENT',
      title: '04 — LAUNCH',
      body: 'Edge CDN orchestration, global node synchronization, and automated telemetry tracking. Continuous optimization ensures sustained conversion and cultural impact.',
      deliverables: [
        '&bull; Edge CDN & Multi-Region Hosting',
        '&bull; Live Telemetry & Conversion Analytics',
        '&bull; Post-Launch Scaling & Maintenance Sprints'
      ],
      coord: 'COORD: ORBITAL NODE 01 // ONLINE',
      progress: '100%'
    }
  ];

  stepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-step'), 10);
      const data = stepsData[idx];

      stepBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (progressBar) progressBar.style.width = data.progress;
      if (stageTag) stageTag.textContent = data.tag;
      if (title) title.textContent = data.title;
      if (body) body.textContent = data.body;
      if (deliverables) deliverables.innerHTML = data.deliverables.map(d => `<li>${d}</li>`).join('');
      if (radarData) radarData.textContent = data.coord;
    });
  });
}

/**
 * Showreel Video Modal
 */
function initShowreelModal() {
  const openBtn = document.getElementById('watchReelBtn');
  const modal = document.getElementById('showreelModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const backdrop = document.getElementById('modalBackdrop');

  if (!openBtn || !modal) return;

  const openModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * Contact Transmission Planner Form Validation
 */
function initTransmissionForm() {
  const form = document.getElementById('transmissionForm');
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !statusDiv) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const briefInput = document.getElementById('userBrief');

    // Name validation
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      nameInput.closest('.form-group').classList.remove('has-error');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      emailInput.closest('.form-group').classList.remove('has-error');
    }

    // Brief validation
    if (!briefInput.value.trim()) {
      briefInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      briefInput.closest('.form-group').classList.remove('has-error');
    }

    if (!isValid) {
      statusDiv.style.color = '#ff476d';
      statusDiv.textContent = '// TRANSMISSION INCOMPLETE: PLEASE RESOLVE FIELDS';
      return;
    }

    // Submit Simulation
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
    statusDiv.style.color = 'var(--color-electric-cyan)';
    statusDiv.textContent = '// ENCRYPTING PAYLOAD...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>TRANSMISSION CONFIRMED &check;</span>';
      submitBtn.style.backgroundColor = '#12D9FF';
      submitBtn.style.color = '#07040D';

      statusDiv.style.color = '#12D9FF';
      statusDiv.textContent = '// TRANSMISSION RECEIVED: SYNTHORA ARCHITECTS WILL RESPOND IN < 24H';
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = '<span>LAUNCH YOUR PROJECT</span><svg viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" stroke-width="2"/></svg>';
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
      }, 5000);
    }, 1200);
  });
}

