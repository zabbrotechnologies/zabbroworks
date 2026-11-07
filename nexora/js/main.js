/* ============================================================================
   NEXORA — IMMERSIVE & CINEMATIC BUSINESS WEBSITE
   Main Interactivity & Application State (main.js)
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    mobileMenu.classList.add('is-active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('is-active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', openMobileMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMobileMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', closeMobileMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
  }

  // --------------------------------------------------------------------------
  // 2. Hero Slide Navigation
  // --------------------------------------------------------------------------
  const SLIDES_DATA = [
    {
      index: '01',
      kicker: '01 / A HIGHER PERSPECTIVE',
      title1: 'Your',
      title2: 'Growth,',
      titleAccent: 'Our Strategy.',
      lead: 'WE HELP AMBITIOUS BUSINESSES TURN COMPLEXITY INTO CLARITY AND IDEAS INTO MEASURABLE GROWTH.'
    },
    {
      index: '02',
      kicker: '02 / ARCHITECTURAL CLARITY',
      title1: 'Transforming',
      title2: 'Enterprise,',
      titleAccent: 'Elevating Capital.',
      lead: 'INTEGRATING ADVANCED MACHINE INTELLIGENCE AND CLOUD TOPOLOGIES FOR CONTINUOUS COMPETITIVE ADVANTAGE.'
    },
    {
      index: '03',
      kicker: '03 / SUSTAINED VALUATION',
      title1: 'Empirical',
      title2: 'Execution,',
      titleAccent: 'Generational Value.',
      lead: 'STRUCTURING MULTI-HORIZON GROWTH VEHICLES AND CROSS-BORDER GOVERNANCE FOR INTERNATIONAL EXPANSION.'
    }
  ];

  let currentSlide = 0;
  const currentSlideNumEl = document.getElementById('currentSlideNum');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const heroIndexEl = document.querySelector('.hero-section-index span');
  const heroTitleLines = document.querySelectorAll('.hero-display-title .hero-title-line');
  const heroLeadEl = document.querySelector('.hero-lead-copy');

  const updateSlide = (idx) => {
    currentSlide = (idx + SLIDES_DATA.length) % SLIDES_DATA.length;
    const data = SLIDES_DATA[currentSlide];

    if (currentSlideNumEl) currentSlideNumEl.textContent = data.index;
    if (heroIndexEl) heroIndexEl.textContent = data.kicker;
    if (heroTitleLines.length >= 3) {
      heroTitleLines[0].textContent = data.title1;
      heroTitleLines[1].textContent = data.title2;
      heroTitleLines[2].innerHTML = `<span class="hero-accent-sage">${data.titleAccent}</span>`;
    }
    if (heroLeadEl) heroLeadEl.textContent = data.lead;
  };

  if (prevSlideBtn && nextSlideBtn) {
    prevSlideBtn.addEventListener('click', () => updateSlide(currentSlide - 1));
    nextSlideBtn.addEventListener('click', () => updateSlide(currentSlide + 1));
  }

  // --------------------------------------------------------------------------
  // 3. Video Modal Triggering
  // --------------------------------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const openHeroVideoBtn = document.getElementById('openHeroVideoBtn');
  const approachVideoTrigger = document.getElementById('approachVideoTrigger');
  const watchStoryBtn = document.getElementById('watchStoryBtn');

  const showVideoModal = () => {
    if (videoModal) {
      videoModal.classList.add('is-open');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const hideVideoModal = () => {
    if (videoModal) {
      videoModal.classList.remove('is-open');
      videoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (openHeroVideoBtn) openHeroVideoBtn.addEventListener('click', showVideoModal);
  if (approachVideoTrigger) approachVideoTrigger.addEventListener('click', showVideoModal);
  if (watchStoryBtn) watchStoryBtn.addEventListener('click', showVideoModal);
  if (closeVideoModal) closeVideoModal.addEventListener('click', hideVideoModal);

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) hideVideoModal();
    });
  }

  // --------------------------------------------------------------------------
  // 4. Articles Data & Modal
  // --------------------------------------------------------------------------
  const ARTICLES = {
    'sustainable': {
      category: 'SUSTAINABLE CAPITAL // MONOGRAPH 01',
      title: 'The Next Era of Sustainable Growth',
      date: 'OCT 2026 • 7 MIN READ',
      content: `
        <p style="font-size: 1.15rem; color: #F3F0E8; margin-bottom: 1.5rem; line-height: 1.6;">
          For decades, enterprise sustainability was treated as an ancillary risk-mitigation function—an annual CSR brochure relegated to compliance teams. That paradigm has definitively collapsed.
        </p>
        <p style="margin-bottom: 1.25rem;">
          In 2026, global capital allocation has fundamentally bifurcated. Sovereign wealth funds, private equity syndicates, and institutional debt markets increasingly mandate provable Scope-1, 2, and 3 decarbonization metrics as a condition of capital provision. Companies operating inefficient, carbon-intensive operational topologies are facing prohibitive financing spreads.
        </p>
        <p style="margin-bottom: 1.25rem;">
          At NEXORA, our Sustainable Value practice helps industrial conglomerates restructure process heat, electrify heavy logistics, and monetize circular supply chains. Rather than approaching decarbonization as a regulatory overhead, forward-looking enterprises convert operational efficiency into permanent pricing power.
        </p>
        <div style="background: rgba(193, 217, 181, 0.08); border-left: 2px solid #C1D9B5; padding: 1.25rem; margin: 2rem 0; font-family: var(--nexora-font-display); font-size: 1.25rem; color: #F3F0E8;">
          "The companies that capture the next decade will not be those that simply comply, but those that design sustainability directly into their balance sheet architecture."
        </div>
        <p>
          By establishing rigorous, auditor-verified data pipelines and deploying capital into long-horizon renewable storage buffers, international organizations achieve durable valuation premiums that withstand macroeconomic volatility.
        </p>
      `
    },
    'resilient': {
      category: 'SYSTEM ARCHITECTURE // MONOGRAPH 02',
      title: 'Building Resilient Digital Businesses',
      date: 'SEP 2026 • 5 MIN READ',
      content: `
        <p style="font-size: 1.15rem; color: #F3F0E8; margin-bottom: 1.5rem; line-height: 1.6;">
          Monolithic enterprise software suites and fragile single-cloud dependencies have created unprecedented vulnerabilities across global operations.
        </p>
        <p style="margin-bottom: 1.25rem;">
          Modern enterprise resilience demands cellular, decentralized systems. When regional infrastructure suffers outages or unexpected geopolitical friction restricts data transfers, an organization must possess the autonomous capability to isolate nodes without interrupting transactional throughput.
        </p>
        <p style="margin-bottom: 1.25rem;">
          NEXORA works with Fortune 500 boards to dismantle architectural lock-in, transition critical operations to multi-cloud topologies, and automate regulatory failover protocols.
        </p>
      `
    },
    'impact': {
      category: 'EXECUTIVE EXECUTION // MONOGRAPH 03',
      title: 'Turning Strategy Into Measurable Impact',
      date: 'AUG 2026 • 6 MIN READ',
      content: `
        <p style="font-size: 1.15rem; color: #F3F0E8; margin-bottom: 1.5rem; line-height: 1.6;">
          Every quarter, hundreds of millions of dollars are invested in visionary strategic slide decks that quietly disappear into executive desktop drawers.
        </p>
        <p style="margin-bottom: 1.25rem;">
          The breakdown rarely occurs at the conceptual level. It occurs at the organizational interface where strategic intent collides with entrenched middle-management incentives and siloed operational incentives.
        </p>
        <p style="margin-bottom: 1.25rem;">
          Our empirical execution methodology establishes closed-loop KPI governance down to sub-quarterly milestones, aligning departmental compensation directly with strategic milestone realization.
        </p>
      `
    }
  };

  const articleModal = document.getElementById('articleModal');
  const closeArticleModal = document.getElementById('closeArticleModal');
  const artModalCategory = document.getElementById('artModalCategory');
  const artModalTitle = document.getElementById('artModalTitle');
  const artModalDate = document.getElementById('artModalDate');
  const artModalBody = document.getElementById('artModalBody');
  const readArticleBtns = document.querySelectorAll('.read-article-btn');
  const heroInsightCapsule = document.getElementById('heroInsightCapsule');

  const openArticle = (key) => {
    const data = ARTICLES[key] || ARTICLES['sustainable'];
    if (artModalCategory) artModalCategory.textContent = data.category;
    if (artModalTitle) artModalTitle.textContent = data.title;
    if (artModalDate) artModalDate.textContent = data.date;
    if (artModalBody) artModalBody.innerHTML = data.content;

    if (articleModal) {
      articleModal.classList.add('is-open');
      articleModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeArticle = () => {
    if (articleModal) {
      articleModal.classList.remove('is-open');
      articleModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  readArticleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.insight-article-card');
      const articleKey = card ? card.getAttribute('data-article') : 'sustainable';
      openArticle(articleKey);
    });
  });

  if (heroInsightCapsule) {
    heroInsightCapsule.addEventListener('click', () => openArticle('sustainable'));
  }

  if (closeArticleModal) closeArticleModal.addEventListener('click', closeArticle);
  if (articleModal) {
    articleModal.addEventListener('click', (e) => {
      if (e.target === articleModal) closeArticle();
    });
  }

  // --------------------------------------------------------------------------
  // 5. Solution Scope Inspection
  // --------------------------------------------------------------------------
  const solutionExpandBtns = document.querySelectorAll('.solution-expand-btn');
  solutionExpandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.solution-card');
      const title = card ? card.querySelector('.solution-title')?.textContent : 'Strategic Solution';
      const desc = card ? card.querySelector('.solution-desc')?.textContent : '';
      
      if (artModalCategory) artModalCategory.textContent = 'CAPABILITY DOSSIER // PRACTICE SCOPE';
      if (artModalTitle) artModalTitle.textContent = title;
      if (artModalDate) artModalDate.textContent = 'SENIOR PARTNER ADVISORY SPECIFICATION';
      if (artModalBody) {
        artModalBody.innerHTML = `
          <p style="font-size: 1.15rem; color: #F3F0E8; margin-bottom: 1.5rem; line-height: 1.6;">
            ${desc}
          </p>
          <h4 style="font-family: var(--nexora-font-display); font-size: 1.35rem; color: var(--nexora-accent-sage); margin: 1.5rem 0 0.75rem;">
            Core Deliverables &amp; Methodology
          </h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
            <li>&bull; Full diagnostic architectural telemetry and stakeholder interviews</li>
            <li>&bull; Quantitative economic risk modeling &amp; capital allocation scenarios</li>
            <li>&bull; Multi-horizon implementation roadmap with sub-cycle milestone verification</li>
            <li>&bull; Dedicated partner oversight through transition execution</li>
          </ul>
          <a href="#contact" onclick="document.getElementById('articleModal').classList.remove('is-open'); document.body.style.overflow='';" style="display: inline-block; background-color: var(--nexora-accent-sage); color: #080B0B; padding: 0.85rem 1.75rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">
            Initiate Advisory Briefing &rarr;
          </a>
        `;
      }
      if (articleModal) {
        articleModal.classList.add('is-open');
        articleModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. Interactive Contact Form
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const clientName = document.getElementById('clientName');
  const clientEmail = document.getElementById('clientEmail');
  const clientCompany = document.getElementById('clientCompany');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameGroup = clientName.closest('.form-group');
      if (!clientName.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = clientEmail.closest('.form-group');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientEmail.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Company
      const companyGroup = clientCompany.closest('.form-group');
      if (!clientCompany.value.trim()) {
        companyGroup.classList.add('has-error');
        isValid = false;
      } else {
        companyGroup.classList.remove('has-error');
      }

      if (isValid) {
        // Show success state
        formFeedback.className = 'form-feedback-msg is-success';
        formFeedback.innerHTML = `
          <strong>Thank you, ${clientName.value.trim()}.</strong><br>
          Your strategic inquiry has been routed to our senior partners in Zurich &amp; London. A partner will review your brief and contact you within 24 business hours.
        `;
        contactForm.reset();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Escape key closes modals
  // --------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideVideoModal();
      closeArticle();
      closeMobileMenu();
    }
  });

});
