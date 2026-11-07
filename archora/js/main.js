/**
 * ARCHORA STUDIO — Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initWorksFilter();
  initLightbox();
  initInquiryForm();
});

/* Navigation handling */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* Works Filter Bar */
function initWorksFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* Lightbox Modal for Architecture Photos */
function initLightbox() {
  const modal = document.querySelector('.lightbox-modal');
  if (!modal) return;

  const lightboxImg = modal.querySelector('.lightbox-img');
  const lightboxCaption = modal.querySelector('.lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');

  const triggers = document.querySelectorAll('.project-card, .hero-stage');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Avoid firing if clicking directly on a button/link inside card
      if (e.target.closest('a') || e.target.closest('button')) return;

      const img = trigger.querySelector('img');
      const title = trigger.querySelector('.card-title') || trigger.querySelector('.badge-title');

      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = title ? title.textContent : 'ARCHORA STUDIO — Architecture Project';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

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

/* Inquiry Form */
function initInquiryForm() {
  const form = document.querySelector('.cta-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Transmitting Consultation Request...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Request Received — Studio Will Connect';
      btn.style.backgroundColor = '#4A7C59';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.disabled = false;
      }, 4000);
    }, 1000);
  });
}

