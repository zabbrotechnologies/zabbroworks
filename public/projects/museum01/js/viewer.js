/**
 * MUSEUM 01 — Immersive Digital Exhibition Viewer
 * Fullscreen Art Experience, Curatorial Inspector & Keyboard Traversal
 */

(function () {
  'use strict';

  // Complete Institutional Catalogue
  const artworksCatalog = [
    {
      id: 'EXH.001',
      title: 'Beyond the Visible',
      artist: 'Elena Rostova',
      year: '2026',
      medium: 'Computational Fluid Spectra & 8K Projection Matrix',
      dim: 'Site-Specific Architectural Volume',
      prov: 'Acquired via Museum 01 Acquisition Fund',
      desc: 'An exploration of form, light, perception and the relationship between digital environments and physical space. By liberating sculptural form from material gravity, this installation examines how digital architectural volumes evoke contemplation and sensory resonance impossible within stone or bronze.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85'
    },
    {
      id: 'INV.2026.001',
      title: 'Silent Form',
      artist: 'Marcus Vance',
      year: '2026',
      medium: 'Volumetric Light & Algorithmic Resin',
      dim: '320 × 240 × 180 cm (Simulated)',
      prov: 'Permanent Collection, Gift of the Artist',
      desc: 'Silent Form probes the boundary between architectural permanence and optical dissolution. High-density raytraced luminous filaments create an illusion of heavy monolithic mass suspended without support.',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 'INV.2026.002',
      title: 'After Image',
      artist: 'Kaito Mori',
      year: '2026',
      medium: 'Spectral Waveform Monolith',
      dim: '180 × 360 cm',
      prov: 'Exhibition Commission 2026',
      desc: 'Developing audio-reactive optical environments that explore retinal persistence, after-images and chromatic distortion under controlled dark-room conditions.',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'INV.2025.014',
      title: 'The Other Side',
      artist: 'Sören Lindqvist',
      year: '2025',
      medium: 'Architectural Spatial Void & Raw Concrete Shadow',
      dim: '400 × 400 cm',
      prov: 'Museum 01 Foundation Collection',
      desc: 'An architectural portal capturing the passage of twilight through unadorned concrete embrasures, generating deep contemplative silence.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85'
    },
    {
      id: 'INV.2026.003',
      title: 'Soft Geometry',
      artist: 'Elena Rostova',
      year: '2026',
      medium: 'Generative Chromatic Tension',
      dim: '200 × 200 cm',
      prov: 'Acquisition via Pro Helvetia Grant',
      desc: 'A gentle study of mathematical curved surfaces whose colors subtly migrate based on ambient time-of-day parameters in the exhibition space.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85'
    },
    {
      id: 'INV.2026.004',
      title: 'Between Worlds',
      artist: 'Kaito Mori',
      year: '2026',
      medium: 'Dual-State Atmospheric Simulation',
      dim: '540 × 220 cm',
      prov: 'Commissioned for the Geneva Biennale',
      desc: 'Atmospheric fluid particles colliding at sub-millimeter scales, projecting an imagined synthetic topography that breathes in perpetual slow motion.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85'
    },
    {
      id: 'INV.2026.005',
      title: 'Light Studies',
      artist: 'Marcus Vance',
      year: '2026',
      medium: 'Raytraced Luminous Particles',
      dim: '280 × 160 cm',
      prov: 'Donation of Nordic Arts Council',
      desc: 'Focused laser-collimated light particles intersecting atmospheric mist, creating transient planar geometries that vanish upon closer inspection.',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  // DOM Elements
  const viewer = document.getElementById('fullscreenViewer');
  const mainImage = document.getElementById('viewerMainImage');
  const counter = document.getElementById('viewerCounter');
  const vacTitle = document.getElementById('vacTitle');
  const vacArtist = document.getElementById('vacArtist');
  const btnPrev = document.getElementById('btnViewerPrev');
  const btnNext = document.getElementById('btnViewerNext');
  const btnClose = document.getElementById('btnCloseViewer');
  const btnToggleInfo = document.getElementById('btnToggleInfo');
  const btnCloseInfo = document.getElementById('btnCloseInfoPanel');
  const infoPanel = document.getElementById('viewerInfoPanel');
  const btnFullscreen = document.getElementById('btnToggleNativeFullscreen');

  // Curatorial Panel Elements
  const vipTag = document.getElementById('vipTag');
  const vipTitle = document.getElementById('vipTitle');
  const vipArtist = document.getElementById('vipArtist');
  const vipYear = document.getElementById('vipYear');
  const vipMedium = document.getElementById('vipMedium');
  const vipDim = document.getElementById('vipDim');
  const vipProv = document.getElementById('vipProv');
  const vipDesc = document.getElementById('vipDesc');

  let currentIndex = 0;
  let isViewerOpen = false;

  function renderArtwork(index) {
    if (index < 0) index = artworksCatalog.length - 1;
    if (index >= artworksCatalog.length) index = 0;
    currentIndex = index;

    const data = artworksCatalog[currentIndex];

    // Smooth image transition
    if (mainImage) {
      mainImage.style.opacity = '0';
      mainImage.style.transform = 'scale(0.97)';
      
      const newImg = new Image();
      newImg.src = data.image;
      newImg.onload = () => {
        mainImage.src = data.image;
        mainImage.alt = `${data.title} by ${data.artist}`;
        setTimeout(() => {
          mainImage.style.opacity = '1';
          mainImage.style.transform = 'scale(1)';
        }, 50);
      };
    }

    // Update Counter & Captions
    if (counter) {
      const padCurrent = (currentIndex + 1) < 10 ? `0${currentIndex + 1}` : (currentIndex + 1);
      const padTotal = artworksCatalog.length < 10 ? `0${artworksCatalog.length}` : artworksCatalog.length;
      counter.textContent = `${padCurrent} / ${padTotal}`;
    }

    if (vacTitle) vacTitle.textContent = data.title;
    if (vacArtist) vacArtist.textContent = `${data.artist}, ${data.year}`;

    // Update Curatorial Info Drawer
    if (vipTag) vipTag.textContent = data.id;
    if (vipTitle) vipTitle.textContent = data.title;
    if (vipArtist) vipArtist.textContent = data.artist;
    if (vipYear) vipYear.textContent = data.year;
    if (vipMedium) vipMedium.textContent = data.medium;
    if (vipDim) vipDim.textContent = data.dim;
    if (vipProv) vipProv.textContent = data.prov;
    if (vipDesc) vipDesc.textContent = data.desc;
  }

  function openViewer(index = 0) {
    if (!viewer) return;
    isViewerOpen = true;
    viewer.classList.add('active');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderArtwork(index);
  }

  function closeViewer() {
    if (!viewer) return;
    isViewerOpen = false;
    viewer.classList.remove('active');
    viewer.setAttribute('aria-hidden', 'true');
    if (infoPanel) infoPanel.classList.remove('open');
    document.body.style.overflow = '';
  }

  function nextArtwork() {
    renderArtwork(currentIndex + 1);
  }

  function prevArtwork() {
    renderArtwork(currentIndex - 1);
  }

  function toggleCuratorialInfo() {
    if (infoPanel) {
      infoPanel.classList.toggle('open');
    }
  }

  function toggleNativeFullscreen() {
    if (!document.fullscreenElement) {
      if (viewer.requestFullscreen) {
        viewer.requestFullscreen();
      } else if (viewer.webkitRequestFullscreen) {
        viewer.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Bind Buttons
  if (btnPrev) btnPrev.addEventListener('click', prevArtwork);
  if (btnNext) btnNext.addEventListener('click', nextArtwork);
  if (btnClose) btnClose.addEventListener('click', closeViewer);
  if (btnToggleInfo) btnToggleInfo.addEventListener('click', toggleCuratorialInfo);
  if (btnCloseInfo) btnCloseInfo.addEventListener('click', () => infoPanel && infoPanel.classList.remove('open'));
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleNativeFullscreen);

  // Trigger from Exhibition Section
  const featuredCard = document.getElementById('featuredArtworkCard');
  const btnLaunchExhibition = document.getElementById('btnLaunchCuratedExhibition');
  if (featuredCard) {
    featuredCard.addEventListener('click', () => openViewer(0));
  }
  if (btnLaunchExhibition) {
    btnLaunchExhibition.addEventListener('click', () => openViewer(0));
  }

  // Trigger from Collection Grid Cards
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.artIndex, 10);
      openViewer(isNaN(idx) ? 1 : idx);
    });
  });

  // Global Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (!isViewerOpen) return;

    if (e.key === 'ArrowRight') {
      nextArtwork();
    } else if (e.key === 'ArrowLeft') {
      prevArtwork();
    } else if (e.key === 'Escape') {
      if (infoPanel && infoPanel.classList.contains('open')) {
        infoPanel.classList.remove('open');
      } else {
        closeViewer();
      }
    }
  });

  // Touch Swipe Support for Tablets and Mobiles
  let touchStartX = 0;
  let touchEndX = 0;

  if (viewer) {
    viewer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      nextArtwork();
    } else if (touchEndX > touchStartX + threshold) {
      prevArtwork();
    }
  }

  // Expose viewer globally if needed
  window.Museum01Viewer = {
    open: openViewer,
    close: closeViewer,
    next: nextArtwork,
    prev: prevArtwork
  };

})();

