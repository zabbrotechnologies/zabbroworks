/* ============================================================================
   NEXORA — IMMERSIVE & CINEMATIC BUSINESS WEBSITE
   Cinematic Animations & Intersection Observers (animations.js)
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Header Scroll State
  const header = document.getElementById('mainHeader');
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // 2. Parallax on Hero Cinematic Image
  const heroImg = document.getElementById('heroParallaxImg');
  if (heroImg && !isReducedMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < window.innerHeight * 1.5) {
            heroImg.style.transform = `scale(1.02) translateY(${scrollY * 0.18}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 3. Metric Counter Animation
  const metricElements = document.querySelectorAll('.metric-num');
  let metricsAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(easeProgress * target);

      el.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const metricsSection = document.querySelector('.hero-bottom-stage');
  if (metricsSection && metricElements.length > 0) {
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !metricsAnimated) {
          metricsAnimated = true;
          metricElements.forEach(animateCounter);
          metricsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    metricsObserver.observe(metricsSection);
  }

  // 4. Scroll Reveal with Intersection Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade');
  if (!isReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: immediate reveal
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 5. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nexora-nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(sec => sectionObserver.observe(sec));
  }
});

