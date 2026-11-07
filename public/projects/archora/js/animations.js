/**
 * ARCHORA STUDIO — Restrained Editorial Motion & Load Choreography
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  choreographHeroEntrance();
  initCaseStudyScrollReveals();
});

function choreographHeroEntrance() {
  const elements = [
    { selector: '.hero-top-nav', delay: 100 },
    { selector: '.eyebrow-tag', delay: 250 },
    { selector: '.hero-editorial-title', delay: 400 },
    { selector: '.hero-editorial-desc', delay: 550 },
    { selector: '.category-pills-row', delay: 650 },
    { selector: '.hero-cta-group', delay: 750 },
    { selector: '.hero-right-nav', delay: 900 },
    { selector: '.hero-bottom-bar', delay: 1050 }
  ];

  elements.forEach(({ selector, delay }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    }
  });
}

function initCaseStudyScrollReveals() {
  const revealCards = document.querySelectorAll(
    '.overview-grid, .timeline-step, .mat-item-card, .result-row'
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
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });
}
