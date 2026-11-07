/**
 * SOLVIX — Vivid Gradients & Immersive Digital Experience
 * main.js
 * Primary interactivity: mobile drawer, 5-step approach dossier, modals, interactive inquiry form
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Mobile Drawer Navigation
     ========================================================================== */
  function initMobileDrawer() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (!menuToggle || !mobileDrawer) return;

    function openDrawer() {
      mobileDrawer.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      mobileDrawer.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  /* ==========================================================================
     2. Interactive 5-Step Approach Dossier System
     ========================================================================== */
  const stepData = {
    '01': {
      phase: 'PHASE // 01 · DISCOVER',
      title: 'Discover & Diagnose',
      desc: 'We immerse ourselves in your market landscape, customer data, and technical architecture to isolate unfair competitive advantages.',
      specs: [
        'Stakeholder Workshops & Value Mapping',
        'Technical Debt & Architecture Audit',
        'User Friction & Journey Telemetry',
        'Competitive Whitespace Isolation'
      ],
      img: 'assets/images/service-brand.jpg',
      fill: '20%'
    },
    '02': {
      phase: 'PHASE // 02 · DEFINE',
      title: 'Define Strategy & Systems',
      desc: 'Formulating clear technical specifications, user personas, and a bespoke design taxonomy calibrated for high conversion and market recall.',
      specs: [
        'Product Requirements & Feature Scoping',
        'Information Architecture & Content Models',
        'Design Language Archetypes & Moodboards',
        'Performance & Scalability Benchmark Plan'
      ],
      img: 'assets/images/service-web.jpg',
      fill: '40%'
    },
    '03': {
      phase: 'PHASE // 03 · DESIGN',
      title: 'Kinetic System Design',
      desc: 'Crafting living component libraries infused with vivid gradients, reactive typography, and responsive tactile micro-interactions.',
      specs: [
        'Multi-State Figma Design System',
        'Kinetic Physics & Micro-Interaction Specs',
        'Fluid Gradients & Shader Aesthetics',
        'WCAG 2.2 AA Contrast & Accessibility Check'
      ],
      img: 'assets/images/service-ai.jpg',
      fill: '60%'
    },
    '04': {
      phase: 'PHASE // 04 · DEVELOP',
      title: 'Creative Engineering',
      desc: 'Translating designs into lean, modular web standard code with hardware-accelerated CSS and sub-second critical render paths.',
      specs: [
        'Clean Modular Vanilla JS / Modern Architecture',
        'Hardware-Accelerated CSS Animations',
        'Headless API & CMS Integrations',
        'Sub-second First Contentful Paint Engine'
      ],
      img: 'assets/images/service-growth.jpg',
      fill: '80%'
    },
    '05': {
      phase: 'PHASE // 05 · DELIVER',
      title: 'Launch & Continuous Evolution',
      desc: 'Rigorous cross-device testing, stress drills, and real-time conversion monitoring that drives compounded growth post-deployment.',
      specs: [
        'Multi-Device & Cross-Browser Stress Testing',
        'Real-User Performance Telemetry (RUM)',
        'Conversion Funnel & A/B Experimentation',
        'Continuous Feature Expansion SLA'
      ],
      img: 'assets/images/project-horizon.jpg',
      fill: '100%'
    }
  };

  function initApproachDossier() {
    const stepBtns = document.querySelectorAll('.step-btn');
    const labelEl = document.getElementById('dossierStepLabel');
    const titleEl = document.getElementById('dossierStepTitle');
    const descEl = document.getElementById('dossierStepDesc');
    const specsEl = document.getElementById('dossierSpecs');
    const imgEl = document.getElementById('dossierImg');
    const fillEl = document.getElementById('processFill');

    if (!stepBtns.length || !titleEl) return;

    function renderStep(key) {
      const data = stepData[key];
      if (!data) return;

      // Update button active state
      stepBtns.forEach(btn => {
        const isActive = btn.getAttribute('data-step') === key;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Subtle fade update
      titleEl.style.opacity = '0';
      descEl.style.opacity = '0';
      if (specsEl) specsEl.style.opacity = '0';
      if (imgEl) imgEl.style.opacity = '0';

      setTimeout(() => {
        if (labelEl) labelEl.textContent = data.phase;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (imgEl) imgEl.src = data.img;

        if (specsEl) {
          specsEl.innerHTML = data.specs
            .map(s => `<div class="spec-pill">&bull; ${s}</div>`)
            .join('');
        }

        if (fillEl) {
          fillEl.style.width = data.fill;
        }

        titleEl.style.opacity = '1';
        descEl.style.opacity = '1';
        if (specsEl) specsEl.style.opacity = '1';
        if (imgEl) imgEl.style.opacity = '1';
      }, 160);
    }

    stepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-step');
        renderStep(key);
      });
    });

    if (fillEl) fillEl.style.width = '20%';
  }

  /* ==========================================================================
     3. Modals: Showreel & Editorial Monograph Reader
     ========================================================================== */
  function initModals() {
    // Showreel
    const openShowreelBtns = document.querySelectorAll('#openShowreelBtn, #heroWatchBtn, .hero-video-play-btn');
    const showreelModal = document.getElementById('showreelModal');
    const closeShowreelBtn = document.getElementById('closeShowreelBtn');

    function openShowreel() {
      if (!showreelModal) return;
      showreelModal.classList.add('is-open');
      showreelModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeShowreel() {
      if (!showreelModal) return;
      showreelModal.classList.remove('is-open');
      showreelModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openShowreelBtns.forEach(btn => btn.addEventListener('click', openShowreel));
    if (closeShowreelBtn) closeShowreelBtn.addEventListener('click', closeShowreel);
    if (showreelModal) {
      showreelModal.addEventListener('click', e => {
        if (e.target === showreelModal) closeShowreel();
      });
    }

    // Perspective / Monograph Reader Modal
    const readBtns = document.querySelectorAll('.read-monograph-btn, .read-insight-btn, .solvix-article-card');
    const perspectiveModal = document.getElementById('perspectiveModal');
    const closePerspectiveBtn = document.getElementById('closePerspectiveBtn');
    const modalArtCat = document.getElementById('modalArtCat');
    const modalArtBody = document.getElementById('modalArtBody');

    const sampleArticles = {
      '01': {
        cat: 'EDITORIAL ESSAY // 01 · CREATIVE TECHNOLOGY',
        title: 'Emerging Digital Experiences: The Post-Flat Web Paradigm',
        body: `
          <h2 style="font-family: var(--solvix-font-display); font-size: 1.8rem; margin-bottom: 1.2rem; color: #F7F8FF; font-weight: 700; line-height: 1.15;">
            Fluid Gradients, Spatial Physics &amp; Sensory Intelligence
          </h2>
          <p style="margin-bottom: 1rem; color: #A8A9C5; font-size: 0.95rem; line-height: 1.75;">
            For two decades, web interfaces adhered to strict flat design: predictable box models, monochromatic blocks, and lifeless grids. At SOLVIX, our experimental laboratory pioneers interactive environments where dynamic radiant shaders and physical motion engines turn web surfaces into living sensory media.
          </p>
          <p style="margin-bottom: 1.2rem; color: #A8A9C5; font-size: 0.95rem; line-height: 1.75;">
            By running lightweight GPU-accelerated CSS and reactive typography scales, our digital experiences deliver emotional depth without the latency overhead of heavy 3D canvases.
          </p>
          <div style="background: rgba(40,91,255,0.12); border-left: 3px solid #285BFF; padding: 1.2rem; margin: 1.5rem 0; border-radius: 4px;">
            <p style="font-family: var(--solvix-font-mono); font-size: 0.82rem; color: #F7F8FF; margin: 0; line-height: 1.6;">
              RESEARCH FINDING: Sensory-rich tactile interfaces achieve a 48% higher session dwell time and 3.2X increase in spontaneous brand recall among enterprise decision-makers.
            </p>
          </div>
        `
      },
      '02': {
        cat: 'EDITORIAL ESSAY // 02 · MACHINE INTELLIGENCE',
        title: 'How AI Is Reshaping Business Operations & Customer Engagement',
        body: `
          <h2 style="font-family: var(--solvix-font-display); font-size: 1.8rem; margin-bottom: 1.2rem; color: #F7F8FF; font-weight: 700; line-height: 1.15;">
            From Passive Text Prompts to Proactive Autonomous Copilots
          </h2>
          <p style="margin-bottom: 1rem; color: #A8A9C5; font-size: 0.95rem; line-height: 1.75;">
            Machine learning has crossed the threshold from content generation curiosity into foundational business infrastructure. Enterprise software must now orchestrate autonomous agent networks that analyze, synthesize, and execute actions with superhuman speed.
          </p>
          <p style="margin-bottom: 1.2rem; color: #A8A9C5; font-size: 0.95rem; line-height: 1.75;">
            The challenge is no longer compute; it is clarity. SOLVIX builds visual orchestration dashboards that make AI decision vectors intuitive and fully auditable for human operators.
          </p>
        `
      },
      '03': {
        cat: 'EDITORIAL ESSAY // 03 · PRODUCT ARCHITECTURE',
        title: 'Building Resilient Platforms for Tomorrow’s Scalability Demands',
        body: `
          <h2 style="font-family: var(--solvix-font-display); font-size: 1.8rem; margin-bottom: 1.2rem; color: #F7F8FF; font-weight: 700; line-height: 1.15;">
            Zero-Bloat Engineering for Sub-Second Global Performance
          </h2>
          <p style="margin-bottom: 1rem; color: #A8A9C5; font-size: 0.95rem; line-height: 1.75;">
            High visual fidelity must never compromise performance. By eliminating extraneous framework dependencies and leveraging modern standards like native web components, semantic HTML5, and streaming asset delivery, platforms can achieve both breathtaking aesthetics and perfect Lighthouse 100 performance scores.
          </p>
        `
      }
    };

    function openPerspective(key) {
      if (!perspectiveModal) return;
      const data = sampleArticles[key] || sampleArticles['01'];
      if (modalArtCat) modalArtCat.textContent = data.cat;
      if (modalArtBody) modalArtBody.innerHTML = data.body;

      perspectiveModal.classList.add('is-open');
      perspectiveModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closePerspective() {
      if (!perspectiveModal) return;
      perspectiveModal.classList.remove('is-open');
      perspectiveModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    readBtns.forEach((btn, idx) => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const key = ((idx % 3) + 1).toString().padStart(2, '0');
        openPerspective(key);
      });
    });

    if (closePerspectiveBtn) closePerspectiveBtn.addEventListener('click', closePerspective);
    if (perspectiveModal) {
      perspectiveModal.addEventListener('click', e => {
        if (e.target === perspectiveModal) closePerspective();
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeShowreel();
        closePerspective();
      }
    });
  }

  /* ==========================================================================
     4. Interactive Inquiry Form
     ========================================================================= */
  function initInquiryForm() {
    const form = document.getElementById('inquiryForm');
    const alertBox = document.getElementById('formAlert');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const submitBtn = form.querySelector('.cta-submit-btn, button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting Brief...</span>';
      }

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Brief Transmitted</span> &check;';
        }

        if (alertBox) {
          alertBox.classList.add('is-active');
          alertBox.innerHTML = `
            <div style="background: rgba(40, 91, 255, 0.16); border: 1px solid #285BFF; border-radius: 6px; padding: 1.25rem; margin-top: 1.5rem; text-align: left;">
              <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.4rem;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #285BFF; box-shadow: 0 0 10px #285BFF;"></span>
                <strong style="font-family: var(--solvix-font-display); color: #F7F8FF; font-size: 0.95rem; letter-spacing: 0.05em;">Project Brief Transmitted Successfully</strong>
              </div>
              <p style="font-size: 0.85rem; color: #A8A9C5; line-height: 1.55; margin: 0;">
                Thank you for contacting SOLVIX. Our strategy and engineering partners have received your briefing parameters and will contact your team within 24 hours.
              </p>
            </div>
          `;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = '<span>Start a Project</span> <span class="arrow-glyph">&rarr;</span>';
          }
        }, 5500);
      }, 850);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initMobileDrawer();
    initApproachDossier();
    initModals();
    initInquiryForm();
  }
})();

