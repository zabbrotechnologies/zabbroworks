/**
 * SPACEN — Main Interactive Controls
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initSearchModal();
  initJoinForm();
  initCurrentYear();
  initScrollSpy();
});

/**
 * Header Scroll Elevation
 */
function initHeaderScroll() {
  const header = document.getElementById('spacenHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
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

  links.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Interactive Search Modal & Query Filtering
 */
function initSearchModal() {
  const toggleBtn = document.getElementById('searchToggleBtn');
  const modal = document.getElementById('searchModal');
  const backdrop = document.getElementById('searchBackdrop');
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const resultsContainer = document.getElementById('searchResults');

  if (!toggleBtn || !modal || !input) return;

  // Search Database
  const searchIndex = [
    { title: 'Apollo 11 Lunar Landing', cat: 'Mission', url: '#missions', desc: '1969 crewed Moon landing at the Sea of Tranquility.' },
    { title: 'International Space Station', cat: 'Orbital Platform', url: '#missions', desc: 'Continuous microgravity laboratory in low Earth orbit.' },
    { title: 'James Webb Space Telescope', cat: 'Observatory', url: '#missions', desc: 'Infrared space telescope at Sun-Earth L2.' },
    { title: 'Mars Perseverance Rover', cat: 'Robotic Mission', url: '#missions', desc: 'Searching for ancient biosignatures in Jezero Crater.' },
    { title: 'Artemis Lunar Program', cat: 'Crewed Architecture', url: '#missions', desc: 'Sustained human presence on the Lunar South Pole.' },
    { title: 'Planet Mars', cat: 'Planet', url: '#planets', desc: 'Red planet with iron-oxide surface and shield volcanoes.' },
    { title: 'Planet Jupiter', cat: 'Planet', url: '#planets', desc: 'Largest gas giant with Great Red Spot and 90+ moons.' },
    { title: 'Europa & Enceladus Subsurface Oceans', cat: 'Astrobiology', url: '#research', desc: 'Hydrothermal vents and liquid reservoirs beneath icy crusts.' },
    { title: 'Gravitational Lensing & Deep Galaxies', cat: 'Deep Space', url: '#discover', desc: 'Observing early cosmos through space-time curvature.' }
  ];

  const openSearch = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 100);
  };

  const closeSearch = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    input.value = '';
    renderDefaultHint();
  };

  const renderDefaultHint = () => {
    resultsContainer.innerHTML = '<div class="search-initial-hint">Type keywords like "Mars", "James Webb", "Apollo 11", or "Europa"...</div>';
  };

  toggleBtn.addEventListener('click', openSearch);
  if (backdrop) backdrop.addEventListener('click', closeSearch);
  if (clearBtn) clearBtn.addEventListener('click', () => {
    input.value = '';
    renderDefaultHint();
    input.focus();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeSearch();
    }
  });

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      renderDefaultHint();
      return;
    }

    const matches = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.cat.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div class="search-initial-hint">No matching telemetry or missions found for "${e.target.value}".</div>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(m => `
      <a href="${m.url}" class="search-result-item" onclick="document.getElementById('searchModal').classList.remove('open'); document.body.style.overflow='';">
        <div>
          <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.95rem;">${m.title}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.78rem;color:#858A94;">${m.desc}</div>
        </div>
        <span style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:#F36B21;background:rgba(243,107,33,0.1);padding:0.25rem 0.5rem;border-radius:4px;">${m.cat}</span>
      </a>
    `).join('');
  });
}

/**
 * Community Enrollment Form Validation
 */
function initJoinForm() {
  const form = document.getElementById('joinForm');
  const feedback = document.getElementById('joinFeedback');
  const submitBtn = document.getElementById('joinSubmitBtn');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('crewName');
    const emailInput = document.getElementById('crewEmail');

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      feedback.style.color = '#DC2626';
      feedback.textContent = '// ERROR: PLEASE PROVIDE EXPLORER HANDLE AND VALID EMAIL';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      feedback.style.color = '#DC2626';
      feedback.textContent = '// ERROR: INVALID COMM FREQUENCY ADDRESS';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Transmitting...</span>';
    feedback.style.color = 'var(--color-aerospace-orange)';
    feedback.textContent = '// CONNECTING TO ORBITAL RELAY...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Transmitted &check;</span>';
      feedback.style.color = '#16A34A';
      feedback.textContent = `// WELCOME ABOARD, EXPLORER ${nameInput.value.trim().toUpperCase()}. TRANSMISSION CONFIRMED.`;
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = '<span>Join Community</span><svg viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" stroke-width="2"/></svg>';
      }, 5000);
    }, 1100);
  });
}

/**
 * Dynamic Copyright Year
 */
function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Navigation Spy
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill');
  if (!sections.length || !navLinks.length) return;

  const handleSpy = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleSpy, { passive: true });
}
