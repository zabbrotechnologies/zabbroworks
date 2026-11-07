/**
 * SOLVIX — Vivid Gradients & Immersive Digital Experience
 * animations.js
 * Lightweight, high-performance interactions, scroll reveals & animated metrics
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. Scroll Reveal Observer
     ========================================================================== */
  function initScrollReveals() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll, .reveal-fade').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ==========================================================================
     2. Hero Statistics Counter
     ========================================================================== */
  function initStatsCounter() {
    const statCells = document.querySelectorAll('.stat-cell, .stat-block');
    if (!statCells.length) return;

    let hasCounted = false;

    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            animateNumbers();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    const statsContainer = document.querySelector('.hero-stats-row, .hero-stats-strip');
    if (statsContainer) {
      statsObserver.observe(statsContainer);
    }

    function animateNumbers() {
      statCells.forEach(cell => {
        const numEl = cell.querySelector('.stat-number, .stat-num');
        if (!numEl) return;

        const target = parseFloat(numEl.getAttribute('data-target') || numEl.textContent.replace(/[^0-9.]/g, ''));
        if (isNaN(target)) return;

        const duration = 1600; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 4);
          const currentVal = Math.floor(target * easeOut);

          numEl.textContent = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            numEl.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }
  }

  /* ==========================================================================
     3. Header Glassmorphism On Scroll
     ========================================================================== */
  function initHeaderElevation() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (lastScrollY > 40) {
              header.classList.add('is-scrolled');
            } else {
              header.classList.remove('is-scrolled');
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ==========================================================================
     4. Navigation Spy (Active Section Tracker)
     ========================================================================== */
  function initNavSpy() {
    const navLinks = document.querySelectorAll('.solvix-nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');
    if (!navLinks.length || !sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('is-active');
              } else {
                link.classList.remove('is-active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach(sec => observer.observe(sec));
  }

  /* ==========================================================================
     5. Hero Subtle Mouse Parallax
     ========================================================================== */
  function initHeroParallax() {
    if (prefersReducedMotion) return;
    const heroImg = document.getElementById('heroParallaxImg');
    if (!heroImg) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener(
      'mousemove',
      e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 16;
        const y = (e.clientY / window.innerHeight - 0.5) * 16;
        targetX = x;
        targetY = y;
      },
      { passive: true }
    );

    function tick() {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      heroImg.style.transform = `scale(1.04) translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(tick);
    }

    tick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initScrollReveals();
    initStatsCounter();
    initHeaderElevation();
    initNavSpy();
    initHeroParallax();
  }
})();

