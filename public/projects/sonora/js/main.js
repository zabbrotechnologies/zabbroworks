/**
 * SONORA® — Main Experience Script
 * Hero Waveform Canvas, Archive Filters, Release Modals & Navigation
 */

(function () {
  'use strict';

  // ==================== 1. HERO GENERATIVE FREQUENCY CANVAS ====================
  const heroCanvas = document.getElementById('heroWaveCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width, height;
    let time = 0;

    function resize() {
      const rect = heroCanvas.getBoundingClientRect();
      width = rect.width * (window.devicePixelRatio || 1);
      height = rect.height * (window.devicePixelRatio || 1);
      heroCanvas.width = width;
      heroCanvas.height = height;
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    window.addEventListener('resize', resize);
    resize();

    const waveLines = [
      { color: 'rgba(255, 107, 53, 0.45)', speed: 0.012, amp: 48, freq: 0.005, width: 2.5 },
      { color: 'rgba(197, 244, 103, 0.35)', speed: 0.009, amp: 38, freq: 0.008, width: 2 },
      { color: 'rgba(101, 84, 164, 0.4)', speed: 0.015, amp: 58, freq: 0.004, width: 2 },
      { color: 'rgba(241, 241, 237, 0.25)', speed: 0.007, amp: 28, freq: 0.01, width: 1.5 }
    ];

    function renderHeroWaves() {
      const w = heroCanvas.getBoundingClientRect().width;
      const h = heroCanvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);
      const centerY = h * 0.55;

      waveLines.forEach((line, index) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;

        for (let x = 0; x < w; x += 4) {
          const y = centerY + Math.sin(x * line.freq + time * line.speed + index) * line.amp
                            + Math.cos(x * 0.003 - time * 0.008) * (line.amp * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      time += 1;
      requestAnimationFrame(renderHeroWaves);
    }

    requestAnimationFrame(renderHeroWaves);
  }

  // ==================== 2. NAVIGATION & MOBILE DRAWER ====================
  const nav = document.getElementById('sonoraNav');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.d-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // ==================== 3. ARCHIVE CATEGORY FILTERING ====================
  const filterTabs = document.querySelectorAll('#archiveFilterTabs .filter-tab');
  const releaseItems = document.querySelectorAll('.release-item');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.dataset.filter || 'all';

      releaseItems.forEach((item) => {
        const itemCat = item.dataset.category || '';
        if (filterVal === 'all' || itemCat.toLowerCase() === filterVal.toLowerCase()) {
          item.style.display = 'flex';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ==================== 4. RELEASE DETAIL MODAL ====================
  const releaseModal = document.getElementById('releaseModal');
  const btnCloseModal = document.getElementById('btnCloseReleaseModal');
  const btnModalPlay = document.getElementById('btnModalPlayTrack');

  const modalImg = document.getElementById('modalReleaseImg');
  const modalCat = document.getElementById('modalReleaseCat');
  const modalTitle = document.getElementById('modalReleaseTitle');
  const modalArtist = document.getElementById('modalReleaseArtist');
  const modalDesc = document.getElementById('modalReleaseDesc');
  const modalBpm = document.getElementById('modalReleaseBpm');
  const modalKey = document.getElementById('modalReleaseKey');

  const releaseCatalog = {
    '01': {
      title: 'AFTER HOURS',
      artist: 'SONORA SELECTS',
      category: 'DEEP ELECTRONIC // LP',
      bpm: '124',
      key: 'F#m',
      desc: 'A hypnotic nocturnal exploration of sub-bass frequencies, syncopated polyrhythms, and modular synthesizer textures designed for late-night sensory immersion.',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85'
    },
    '02': {
      title: 'NEON MEMORY',
      artist: 'LENA FORM',
      category: 'AMBIENT ELECTRONICA // EP',
      bpm: '98',
      key: 'Dm',
      desc: 'Drifting tape-saturated arpeggios layered with granular vocal resynthesis and delicate atmospheric spatialization.',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85'
    },
    '03': {
      title: 'STATIC BLOOM',
      artist: 'KAI STATIC',
      category: 'EXPERIMENTAL TECHNO // LP',
      bpm: '138',
      key: 'Am',
      desc: 'Industrial mechanical percussion colliding with raw analog distortion circuits and high-velocity kick pulses.',
      img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=85'
    },
    '04': {
      title: 'LOW FREQUENCY',
      artist: 'NOAH VEL',
      category: 'MINIMAL ELECTRONIC // SINGLE',
      bpm: '118',
      key: 'Em',
      desc: 'Subterranean 808 sub-bass pressure combined with minimal micro-percussion and dub delay feedback paths.',
      img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=85'
    },
    '05': {
      title: 'SIGNAL LOST',
      artist: 'MIRA SONIC',
      category: 'ATMOSPHERIC // EP',
      bpm: '110',
      key: 'Cm',
      desc: 'Cinematic drone sculptures created from radio telescope telemetry data and modular FM synthesis.',
      img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=85'
    },
    '06': {
      title: 'SOFT COLLISION',
      artist: 'NOAH VEL × LENA FORM',
      category: 'FUTURE GARAGE // SINGLE',
      bpm: '130',
      key: 'Bbm',
      desc: 'Collaborative interplay between crisp syncopated 2-step garage rhythms and emotive vocal chop delays.',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85'
    }
  };

  function openModal(id) {
    const data = releaseCatalog[id] || releaseCatalog['01'];
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalArtist) modalArtist.textContent = data.artist;
    if (modalCat) modalCat.textContent = data.category;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalBpm) modalBpm.textContent = data.bpm;
    if (modalKey) modalKey.textContent = data.key;
    if (modalImg) modalImg.src = data.img;

    if (releaseModal) releaseModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (releaseModal) releaseModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  releaseItems.forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.dataset.releaseId || '01';
      openModal(id);
    });
  });

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (releaseModal) {
    releaseModal.addEventListener('click', (e) => {
      if (e.target === releaseModal) closeModal();
    });
  }

  if (btnModalPlay) {
    btnModalPlay.addEventListener('click', () => {
      closeModal();
      if (window.SonoraPlayer) {
        window.SonoraPlayer.start();
        const releaseSection = document.getElementById('release');
        if (releaseSection) {
          releaseSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // ==================== 5. STEMS DOWNLOAD SIMULATION ====================
  const btnDownloadStems = document.getElementById('btnDownloadStems');
  if (btnDownloadStems) {
    btnDownloadStems.addEventListener('click', () => {
      const originalText = btnDownloadStems.innerHTML;
      btnDownloadStems.innerHTML = '<span>PACKING 24-BIT STEMS (8 TRACKS)...</span>';
      setTimeout(() => {
        btnDownloadStems.innerHTML = '<span style="color: #C5F467;">READY &bull; ARCHIVE TRANSMITTED ✦</span>';
        setTimeout(() => {
          btnDownloadStems.innerHTML = originalText;
        }, 3000);
      }, 1200);
    });
  }

})();
