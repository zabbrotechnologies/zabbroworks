/**
 * LISTIT ARCHIVE — Animations & Parallax Physics Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initMouseParallax();
  initScrollSpy();
  initScrollReveals();
});

/**
 * 3D Mouse Parallax on Smartphone Stage
 */
function initMouseParallax() {
  const stage = document.getElementById('deviceStage');
  const phoneLeft = document.getElementById('phoneLeft');
  const phoneCenter = document.getElementById('phoneCenter');
  const phoneRight = document.getElementById('phoneRight');
  
  if (!stage || window.innerWidth < 992) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    mouseY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
  });

  function renderParallax() {
    // Smooth lerp
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    if (phoneCenter) {
      phoneCenter.style.transform = `perspective(1200px) scale(1) translateZ(30px) rotateY(${currentX * 4}deg) rotateX(${-currentY * 3}deg)`;
    }
    if (phoneLeft) {
      phoneLeft.style.transform = `perspective(1200px) rotateY(${15 + currentX * 3}deg) rotateX(${2 - currentY * 2}deg) scale(0.92) translateX(24px) translateZ(-25px) translateY(${currentY * 4}px)`;
    }
    if (phoneRight) {
      phoneRight.style.transform = `perspective(1200px) rotateY(${-15 + currentX * 3}deg) rotateX(${2 - currentY * 2}deg) scale(0.92) translateX(-24px) translateZ(-25px) translateY(${-currentY * 4}px)`;
    }

    requestAnimationFrame(renderParallax);
  }

  requestAnimationFrame(renderParallax);
}

/**
 * Scrollspy for Right Sidebar Navigation
 */
function initScrollSpy() {
  const navItems = document.querySelectorAll('.vert-nav-item');
  const sections = document.querySelectorAll('.case-study-section, .hero-showcase-section');

  window.addEventListener('scroll', () => {
    let currentId = 'hero';
    const scrollPos = window.scrollY + 300;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === currentId || (currentId === 'hero' && item.getAttribute('data-section') === 'overview')) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Scroll Reveal Animations via Intersection Observer
 */
function initScrollReveals() {
  const elements = document.querySelectorAll('.bento-card, .feature-card, .timeline-step, .problem-card, .tech-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`;
    observer.observe(el);
  });
}

