/**
 * ARCHORA STUDIO — Main Editorial Portfolio Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initRightNavSpy();
  initThumbnailGallery();
  initLightbox();
});

/* Right-side vertical navigation spy via IntersectionObserver */
function initRightNavSpy() {
  const sections = document.querySelectorAll('.case-section, .hero-editorial-viewport');
  const navItems = document.querySelectorAll('.right-nav-item');

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
    threshold: 0.35
  });

  sections.forEach(sec => observer.observe(sec));

  // Smooth scroll
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* Bottom-left thumbnail strip interaction */
function initThumbnailGallery() {
  const thumbs = document.querySelectorAll('.thumb-item');
  const modal = document.querySelector('.lightbox-modal');
  const lightboxImg = modal ? modal.querySelector('.lightbox-img') : null;
  const lightboxCaption = modal ? modal.querySelector('.lightbox-caption') : null;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const img = thumb.querySelector('img');
      const title = thumb.dataset.title || 'ARCHORA Architectural Study';

      if (modal && lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const thumbArrow = document.querySelector('.thumb-arrow-btn');
  if (thumbArrow && thumbs.length) {
    thumbArrow.addEventListener('click', () => {
      const active = document.querySelector('.thumb-item.active') || thumbs[0];
      let nextIndex = Array.from(thumbs).indexOf(active) + 1;
      if (nextIndex >= thumbs.length) nextIndex = 0;
      thumbs[nextIndex].click();
    });
  }
}

/* Lightbox Modal Handling */
function initLightbox() {
  const modal = document.querySelector('.lightbox-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.lightbox-close');

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
