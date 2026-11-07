/**
 * CREATIVIO — Premium Glassmorphism Landing Website
 * main.js
 * Mobile navigation drawer, approach step indicators, testimonial slider, modals & consultation form
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Mobile Drawer Navigation
     ========================================================================== */
  function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const drawer = document.getElementById('mobileDrawer');
    const closeBtn = document.getElementById('drawerCloseBtn');
    const backdrop = document.getElementById('drawerBackdrop');
    const links = document.querySelectorAll('.drawer-link');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    links.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  /* ==========================================================================
     2. Interactive Approach Step Selector
     ========================================================================== */
  function initApproachSteps() {
    const stepItems = document.querySelectorAll('.process-step-item');
    if (!stepItems.length) return;

    let currentStep = 0;
    let autoInterval = null;

    function setStep(index) {
      stepItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
      });
      currentStep = index;
    }

    stepItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        setStep(idx);
        clearInterval(autoInterval);
      });
    });

    // Auto-advance step every 5.5 seconds
    autoInterval = setInterval(() => {
      const next = (currentStep + 1) % stepItems.length;
      setStep(next);
    }, 5500);

    const stepsContainer = document.querySelector('.process-steps-list');
    if (stepsContainer) {
      stepsContainer.addEventListener('mouseenter', () => clearInterval(autoInterval));
    }
  }

  /* ==========================================================================
     3. Testimonials Slider
     ========================================================================== */
  function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prevTestimonialBtn');
    const nextBtn = document.getElementById('nextTestimonialBtn');
    const sliderContainer = document.querySelector('.testimonial-slider-container');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;

    function goToSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentIndex = index;
    }

    function nextSlide() {
      const next = (currentIndex + 1) % slides.length;
      goToSlide(next);
    }

    function prevSlide() {
      const prev = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetTimer();
      });
    });

    function startTimer() {
      autoPlayTimer = setInterval(nextSlide, 6500);
    }

    function resetTimer() {
      clearInterval(autoPlayTimer);
      startTimer();
    }

    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
      sliderContainer.addEventListener('mouseleave', startTimer);
    }

    startTimer();
  }

  /* ==========================================================================
     4. Showreel Modal
     ========================================================================== */
  function initModals() {
    const showreelBtn = document.getElementById('heroShowreelBtn');
    const showreelModal = document.getElementById('showreelModal');
    const closeShowreelBtn = document.getElementById('closeShowreelBtn');

    function openModal() {
      if (!showreelModal) return;
      showreelModal.classList.add('is-open');
      showreelModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!showreelModal) return;
      showreelModal.classList.remove('is-open');
      showreelModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (showreelBtn) showreelBtn.addEventListener('click', openModal);
    if (closeShowreelBtn) closeShowreelBtn.addEventListener('click', closeModal);
    if (showreelModal) {
      showreelModal.addEventListener('click', e => {
        if (e.target === showreelModal) closeModal();
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && showreelModal && showreelModal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     5. Interactive Project Consultation Form
     ========================================================================== */
  function initInquiryForm() {
    const form = document.getElementById('creativioInquiryForm');
    const feedbackBox = document.getElementById('formFeedbackAlert');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        if (feedbackBox) {
          feedbackBox.classList.add('is-active');
          feedbackBox.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 8px; padding: 1rem 1.25rem; color: #FCA5A5; font-size: 0.88rem;">
              Please complete all required fields (*).
            </div>
          `;
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting...</span>';
      }

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Project Brief Transmitted</span> &check;';
        }

        if (feedbackBox) {
          feedbackBox.classList.add('is-active');
          feedbackBox.innerHTML = `
            <div style="background: rgba(40, 72, 232, 0.18); border: 1px solid rgba(173, 210, 250, 0.5); border-radius: 10px; padding: 1.4rem; backdrop-filter: blur(12px); box-shadow: 0 8px 30px rgba(4, 12, 55, 0.35);">
              <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.4rem;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #ADD2FA; box-shadow: 0 0 10px #ADD2FA;"></span>
                <strong style="font-family: var(--font-heading); color: #F7FAFF; font-size: 1rem; letter-spacing: 0.02em;">Brief Received &bull; Priority Consultation Scheduled</strong>
              </div>
              <p style="font-size: 0.88rem; color: #DCE5F5; line-height: 1.6; margin: 0;">
                Thank you for connecting with CREATIVIO. Our lead design architect will review your parameters and respond within 24 hours with custom scope options.
              </p>
            </div>
          `;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = '<span>Start Your Project</span> <span class="btn-diag-glyph">&nearr;</span>';
          }
        }, 5500);
      }, 850);
    });
  }

  // Initialize all interactive modules
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initMobileDrawer();
    initApproachSteps();
    initTestimonialSlider();
    initModals();
    initInquiryForm();
  }
})();

