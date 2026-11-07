/**
 * MARCUS VANCE — Monolithic Motion & Entrance Choreography
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  choreographEntrance();
  initScrollMasks();
});

function choreographEntrance() {
  const sequence = [
    { selector: '.hero-nav', delay: 100 },
    { selector: '.hero-eyebrow', delay: 200 },
    { selector: '.hero-monumental-name span:first-child', delay: 350 },
    { selector: '.hero-monumental-name span:last-child', delay: 450 },
    { selector: '.hero-desc', delay: 600 },
    { selector: '.hero-cta-row', delay: 750 },
    { selector: '.hero-bottom-strip', delay: 900 }
  ];

  sequence.forEach(({ selector, delay }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    }
  });
}

function initScrollMasks() {
  const revealCards = document.querySelectorAll(
    '.work-card, .about-split, .expertise-row, .process-step, .exp-mosaic-item, .contact-layout'
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });
}

