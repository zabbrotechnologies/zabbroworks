/**
 * SPACEN — Curved 3D Perspective Carousel Engine
 * Pure Vanilla JavaScript & CSS 3D Transforms
 */

class Spacen3DCarousel {
  constructor() {
    this.stage = document.getElementById('carouselStage');
    this.track = document.getElementById('carouselTrack');
    this.cards = Array.from(document.querySelectorAll('.carousel-card'));
    this.prevBtn = document.getElementById('carouselPrevBtn');
    this.nextBtn = document.getElementById('carouselNextBtn');
    this.dotsContainer = document.getElementById('carouselDots');
    this.dots = Array.from(document.querySelectorAll('.dot-pill'));
    
    if (!this.track || !this.cards.length) return;

    this.currentIndex = 2; // Center card (02 Human Missions) by default
    this.totalCards = this.cards.length;
    this.isAnimating = false;
    this.autoplayTimer = null;
    this.autoplayInterval = 6000;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.updateCarousel(false);
    this.bindEvents();
    this.startAutoplay();
  }

  bindEvents() {
    // Buttons
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoplay();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoplay();
      });
    }

    // Dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goTo(index);
        this.resetAutoplay();
      });
    });

    // Clicking directly on neighboring cards
    this.cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (this.currentIndex !== index) {
          this.goTo(index);
          this.resetAutoplay();
        }
      });
    });

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.next();
        this.resetAutoplay();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
        this.resetAutoplay();
      }
    });

    // Touch Swipe
    this.stage.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.stage.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, { passive: true });

    // Pause on Hover
    this.stage.addEventListener('mouseenter', () => this.stopAutoplay());
    this.stage.addEventListener('mouseleave', () => this.startAutoplay());

    // Window Resize Handler
    window.addEventListener('resize', () => {
      this.updateCarousel(false);
    }, { passive: true });

    // Viewport Intersection (Pause autoplay when offscreen)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startAutoplay();
        } else {
          this.stopAutoplay();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(this.stage);
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
      this.resetAutoplay();
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateCarousel(true);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateCarousel(true);
  }

  goTo(index) {
    this.currentIndex = index;
    this.updateCarousel(true);
  }

  updateCarousel(animated = true) {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

    // Curved geometry configurations
    let stepX = 260;
    let stepZ = -90;
    let stepRotate = 18;

    if (isTablet) {
      stepX = 180;
      stepZ = -80;
      stepRotate = 15;
    } else if (isMobile) {
      stepX = 120;
      stepZ = -60;
      stepRotate = 12;
    }

    this.cards.forEach((card, idx) => {
      // Calculate circular offset distance relative to current index
      let offset = idx - this.currentIndex;

      // Handle wrapping in 5-card circular geometry
      if (offset < -2) offset += this.totalCards;
      if (offset > 2) offset -= this.totalCards;

      const absOffset = Math.abs(offset);

      let x = offset * stepX;
      let z = absOffset === 0 ? 0 : (absOffset === 1 ? stepZ : stepZ * 2.1);
      let rotateY = offset * -stepRotate;
      let scale = absOffset === 0 ? 1.0 : (absOffset === 1 ? 0.88 : 0.76);
      let opacity = absOffset === 0 ? 1 : (absOffset === 1 ? 0.88 : 0.55);
      let zIndex = 10 - absOffset * 2;

      card.style.transition = animated 
        ? 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease, box-shadow 0.8s ease'
        : 'none';

      card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;

      // Highlight active card
      if (absOffset === 0) {
        card.classList.add('is-active-card');
        card.style.boxShadow = '0 24px 60px rgba(16, 27, 50, 0.35), 0 0 0 2px rgba(243, 107, 33, 0.5)';
      } else {
        card.classList.remove('is-active-card');
        card.style.boxShadow = '0 12px 32px rgba(16, 27, 50, 0.2)';
      }
    });

    // Update Dots
    this.dots.forEach((dot, idx) => {
      if (idx === this.currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  startAutoplay() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, this.autoplayInterval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.spacenCarousel = new Spacen3DCarousel();
});

