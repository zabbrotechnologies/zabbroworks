/**
 * DEVFLOW — Animations & Micro-Interactions
 * Pure Vanilla JavaScript — Lightweight & Hardware-Accelerated
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initBentoScrollReveal();
  initNavSpy();
  initCardTilt();
});

/**
 * Header subtle elevation on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('devflowHeader');
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
 * Staggered Intersection Observer scroll reveal for Bento cards
 */
function initBentoScrollReveal() {
  const revealCards = document.querySelectorAll('.bento-card, .service-deep-card, .project-editorial-card, .process-stage-card, .why-card');
  if (!revealCards.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('bento-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });

  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .bento-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}

/**
 * Navigation Spy for floating pill menu
 */
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const handleSpy = () => {
    const scrollY = window.scrollY + 140;

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

/**
 * Subtle 3D card hover elevation
 */
function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth <= 1024) return; // Desktop only

  const tiltCards = document.querySelectorAll('.card-visual-artwork, .card-hero-text');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });
}
