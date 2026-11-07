/**
 * SYNTHORA — Animations & Interaction Physics
 * Pure Vanilla JavaScript — Lightweight & Hardware-Accelerated
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initHeroParallax();
  initScrollReveal();
  initStatsCounter();
  initNavSpy();
});

/**
 * Header background blur & elevation on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('synthoraHeader');
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
 * Subtle interactive mouse parallax on hero sculpture artwork
 */
function initHeroParallax() {
  const heroArtwork = document.getElementById('heroArtwork');
  const heroSection = document.getElementById('hero');
  if (!heroArtwork || !heroSection) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isTicking = false;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX = x * 18; // Max 18px shift
    mouseY = y * 18;

    if (!isTicking) {
      requestAnimationFrame(updateParallax);
      isTicking = true;
    }
  }, { passive: true });

  function updateParallax() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    heroArtwork.style.transform = `scale(1.03) translate3d(${currentX}px, ${currentY}px, 0)`;

    if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
      requestAnimationFrame(updateParallax);
    } else {
      isTicking = false;
    }
  }

  heroSection.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
    if (!isTicking) {
      requestAnimationFrame(updateParallax);
      isTicking = true;
    }
  });
}

/**
 * Intersection Observer for staggered scroll reveals
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-item, .service-card, .work-card, .lab-pod, .pillar-row');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Global style rule when visible
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleTag);
}

/**
 * Animated statistics numbers counter
 */
function initStatsCounter() {
  const statNodes = document.querySelectorAll('.stat-number');
  if (!statNodes.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAllStats();
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsContainer = document.querySelector('.hero-stats-row');
  if (statsContainer) observer.observe(statsContainer);

  function animateAllStats() {
    statNodes.forEach((node) => {
      const target = parseInt(node.getAttribute('data-target'), 10);
      const isPercent = node.textContent.includes('%');
      const isX = node.textContent.includes('X');
      const isPlus = node.textContent.includes('+');

      let current = 0;
      const duration = 1600;
      const startTime = performance.now();

      function updateNumber(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(easeOut * target);

        let suffix = '';
        if (isPercent) suffix = '%';
        else if (isX) suffix = 'X';
        else if (isPlus) suffix = '+';

        node.textContent = `${current}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          node.textContent = `${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }
}

/**
 * Navigation Spy for active link indicator
 */
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');

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
