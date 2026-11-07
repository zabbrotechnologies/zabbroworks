/**
 * MARCUS VANCE — Main Architectural Portfolio Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initIndexSpy();
  initSmoothScroll();
});

/* Right-side index tracking via IntersectionObserver */
function initIndexSpy() {
  const sections = document.querySelectorAll('header, section');
  const navItems = document.querySelectorAll('.index-item');

  if (!navItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(sec => observer.observe(sec));
}

/* Smooth anchor scrolling */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

