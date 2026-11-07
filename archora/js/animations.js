/**
 * ARCHORA STUDIO — Subtle Architectural Animations & Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initMouseParallax();
});

/* Intersection Observer Scroll Reveal */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(
    '.project-card, .material-card, .process-card, .recog-item, .manifesto-statement, .manifesto-body, .laptop-display-wrap, .showcase-content'
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* Mouse Parallax on Hero 3D Objects */
function initMouseParallax() {
  const stage = document.querySelector('.hero-stage');
  const arch = document.querySelector('.sculpture-arch');
  const sphere = document.querySelector('.sculpture-sphere');
  const ribbon = document.querySelector('.sculpture-ribbon');

  if (!stage) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (arch) {
      arch.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
    }
    if (sphere) {
      sphere.style.transform = `translate(${x * -35}px, ${y * -35}px)`;
    }
    if (ribbon) {
      ribbon.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    }
  });

  stage.addEventListener('mouseleave', () => {
    if (arch) arch.style.transform = '';
    if (sphere) sphere.style.transform = '';
    if (ribbon) ribbon.style.transform = '';
  });
}

