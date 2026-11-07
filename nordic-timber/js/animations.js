/**
 * NORDIC TIMBER® — ARCHITECTURAL RESEARCH STUDIO (Standalone Root)
 */
document.addEventListener('DOMContentLoaded', () => {
  initHeroParallax();
  initScrollObserver();
});

function initHeroParallax() {
  const heroCard = document.querySelector('.featured-research-card');
  const layerSecondary = document.querySelector('.card-layer.layer-secondary');
  const layerTertiary = document.querySelector('.card-layer.layer-tertiary');
  const heroSection = document.querySelector('.hero-section');

  if (!heroSection || !heroCard) return;

  if (window.innerWidth > 1024) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = -y * 8;
      const tiltY = x * 8;

      heroCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;

      if (layerSecondary) {
        layerSecondary.style.transform = `rotate(2deg) translate(${x * 12}px, ${y * 12}px)`;
      }
      if (layerTertiary) {
        layerTertiary.style.transform = `rotate(4deg) translate(${x * 18}px, ${y * 18}px)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      if (layerSecondary) layerSecondary.style.transform = 'rotate(2deg) translate(0, 0)';
      if (layerTertiary) layerTertiary.style.transform = 'rotate(4deg) translate(0, 0)';
    });
  }
}

function initScrollObserver() {
  const cards = document.querySelectorAll('.project-card, .species-card, .journal-row, .codex-display-panel');

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

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });
}

