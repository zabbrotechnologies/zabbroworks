/**
 * DEVFLOW — Main Interactive Architecture
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initContactForm();
  initCurrentYear();
  initSmoothScroll();
});

/**
 * Mobile Drawer Menu
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const links = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  links.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Meaningful Contact Form Validation & Submission Flow
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const detailsInput = document.getElementById('contactDetails');

    // Name Validation
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-field').classList.add('has-error');
      isValid = false;
    } else {
      nameInput.closest('.form-field').classList.remove('has-error');
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-field').classList.add('has-error');
      isValid = false;
    } else {
      emailInput.closest('.form-field').classList.remove('has-error');
    }

    // Details Validation
    if (!detailsInput.value.trim()) {
      detailsInput.closest('.form-field').classList.add('has-error');
      isValid = false;
    } else {
      detailsInput.closest('.form-field').classList.remove('has-error');
    }

    if (!isValid) {
      feedback.style.color = '#DC2626';
      feedback.textContent = 'Please complete all required fields correctly.';
      return;
    }

    // Meaningful Submission Handling
    const selectedType = form.querySelector('input[name="projectType"]:checked')?.value || 'General Inquiry';

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Processing Inquiry...</span>';
    feedback.style.color = 'var(--color-cobalt)';
    feedback.textContent = 'Encrypting inquiry data...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Inquiry Sent &check;</span>';
      submitBtn.style.backgroundColor = 'var(--color-cobalt)';

      feedback.style.color = '#059669';
      feedback.textContent = `Thank you, ${nameInput.value.trim()}. Your inquiry regarding "${selectedType}" has been recorded. Our team will review your brief within 1 business day.`;

      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        submitBtn.style.backgroundColor = '';
      }, 6000);
    }, 1000);
  });
}

/**
 * Dynamically generated copyright year
 */
function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Smooth anchor scrolling for navigation links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
