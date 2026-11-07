/**
 * MUSEUM 01 — Main Application Controller
 * Navigation, Virtual Visit Simulator, Artist Profiles & Journal Reader
 */

(function () {
  'use strict';

  // -------------------------------------------------------------
  // 1. STICKY NAV & MOBILE DRAWER
  // -------------------------------------------------------------
  const nav = document.getElementById('museumNav');
  const menuBtn = document.getElementById('navMenuBtn');
  const drawer = document.getElementById('museumDrawer');
  const drawerScrim = document.getElementById('drawerScrim');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-nav a');

  window.addEventListener('scroll', () => {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.style.backgroundColor = 'rgba(241, 240, 236, 0.98)';
      nav.style.boxShadow = '0 4px 20px rgba(8, 8, 8, 0.04)';
    } else {
      nav.style.backgroundColor = 'rgba(241, 240, 236, 0.92)';
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (drawerScrim) drawerScrim.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (drawerScrim) drawerScrim.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerScrim) drawerScrim.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // -------------------------------------------------------------
  // 2. VIRTUAL VISIT ROOM SELECTOR SIMULATOR
  // -------------------------------------------------------------
  const roomData = {
    a: {
      name: 'GALLERY 01 // VOLUMETRIC HALL',
      desc: 'Cathedral-scale concrete chamber with natural diffused skylights and spatial audio dispersion.',
      img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=85',
      artworkIndex: 0
    },
    b: {
      name: 'GALLERY 02 // THE DARK CUBE',
      desc: 'Monolithic obsidian black box with floor-to-ceiling 360-degree reactive LED surfaces and calibrated dark-adaptation.',
      img: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=85',
      artworkIndex: 2
    },
    c: {
      name: 'GALLERY 03 // SCULPTURAL VOID',
      desc: 'Open-air limestone architectural courtyard capturing alpine mountain haze and continuous zenith daylight transitions.',
      img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=85',
      artworkIndex: 1
    }
  };

  const roomTabs = document.querySelectorAll('.room-tab');
  const roomActiveImg = document.getElementById('roomActiveImage');
  const roomNameLabel = document.getElementById('roomNameLabel');
  const roomDescLabel = document.getElementById('roomDescLabel');
  const btnEnterSpace = document.getElementById('btnEnterVirtualSpace');
  let currentRoom = 'a';

  roomTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roomTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const roomKey = tab.dataset.room;
      currentRoom = roomKey;
      const data = roomData[roomKey] || roomData.a;

      if (roomActiveImg) {
        roomActiveImg.style.opacity = '0.3';
        setTimeout(() => {
          roomActiveImg.src = data.img;
          roomActiveImg.style.opacity = '1';
        }, 150);
      }

      if (roomNameLabel) roomNameLabel.textContent = data.name;
      if (roomDescLabel) roomDescLabel.textContent = data.desc;
    });
  });

  if (btnEnterSpace) {
    btnEnterSpace.addEventListener('click', () => {
      const targetIndex = roomData[currentRoom]?.artworkIndex || 0;
      if (window.Museum01Viewer) {
        window.Museum01Viewer.open(targetIndex);
      }
    });
  }

  // -------------------------------------------------------------
  // 3. ARTIST ARCHIVE DETAIL MODAL
  // -------------------------------------------------------------
  const artistsDb = {
    elena: {
      name: 'Elena Rostova',
      discipline: 'GENERATIVE ARCHITECTURE // ZÜRICH',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
      bio: 'Elena Rostova (b. 1988) works at the intersection of algorithmic computation and spatial monuments. Trained in civil engineering in Basel and digital scenography in Zürich, her installations re-imagine architectural weight through weightless mathematical fields.',
      works: [
        'Beyond the Visible (2026, 8K Projection Matrix)',
        'Soft Geometry (2026, Chromatic Tension)',
        'Volumetric Ribbons (2025, Installation)',
        'Monuments in Mist (2024, Architecture Commission)'
      ]
    },
    marcus: {
      name: 'Marcus Vance',
      discipline: 'COMPUTATIONAL AESTHETICS // OSLO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
      bio: 'Marcus Vance explores monolithic minimal structures inspired by brutalist hydroelectric dams and alpine concrete portals. His digital practice questions whether light particles can produce architectural gravitas identical to physical masonry.',
      works: [
        'Silent Form (2026, Volumetric Resin)',
        'Light Studies (2026, Raytraced Monolith)',
        'Monolithic Portal (2025, Generative Sound)'
      ]
    },
    kaito: {
      name: 'Kaito Mori',
      discipline: 'SPECTRAL VOLUMES // TOKYO',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
      bio: 'Kaito Mori develops continuous audio-reactive waveforms that occupy physical gallery space via high-lumen laser diffraction and retinal after-imaging. His works challenge human ocular adaptation thresholds.',
      works: [
        'After Image (2026, Waveform Monolith)',
        'Between Worlds (2026, Atmospheric Simulation)'
      ]
    },
    soren: {
      name: 'Sören Lindqvist',
      discipline: 'MATERIAL DECAY // COPENHAGEN',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85',
      bio: 'Sören Lindqvist interrogates how virtual objects endure time, synthetic weathering and code rot. His sculptures are continuously eroded by real-world weather telemetry streamed live from Baltic weather stations.',
      works: [
        'The Other Side (2025, Spatial Void)',
        'Erosion of the Monolith (2024, Telemetric Sculpture)'
      ]
    }
  };

  const artistModal = document.getElementById('artistModal');
  const btnCloseArtist = document.getElementById('btnCloseArtistModal');
  const artistModalImg = document.getElementById('artistModalImg');
  const artistModalDiscipline = document.getElementById('artistModalDiscipline');
  const artistModalName = document.getElementById('artistModalName');
  const artistModalBio = document.getElementById('artistModalBio');
  const artistModalWorks = document.getElementById('artistModalWorks');

  function openArtistModal(artistKey) {
    const data = artistsDb[artistKey] || artistsDb.elena;
    if (artistModalImg) artistModalImg.src = data.image;
    if (artistModalDiscipline) artistModalDiscipline.textContent = data.discipline;
    if (artistModalName) artistModalName.textContent = data.name;
    if (artistModalBio) artistModalBio.textContent = data.bio;

    if (artistModalWorks) {
      artistModalWorks.innerHTML = '';
      data.works.forEach(work => {
        const li = document.createElement('li');
        li.textContent = work;
        artistModalWorks.appendChild(li);
      });
    }

    if (artistModal) {
      artistModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeArtistModal() {
    if (artistModal) {
      artistModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  const artistBtns = document.querySelectorAll('.btn-artist-detail');
  artistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openArtistModal(btn.dataset.artist);
    });
  });

  const artistCards = document.querySelectorAll('.artist-card');
  artistCards.forEach(card => {
    card.addEventListener('click', () => {
      openArtistModal(card.dataset.artist);
    });
  });

  if (btnCloseArtist) btnCloseArtist.addEventListener('click', closeArtistModal);
  if (artistModal) {
    artistModal.addEventListener('click', (e) => {
      if (e.target === artistModal) closeArtistModal();
    });
  }

  // -------------------------------------------------------------
  // 4. JOURNAL ARTICLE READER MODAL
  // -------------------------------------------------------------
  const articlesDb = {
    '01': {
      category: 'THEORETICAL CRITIQUE // VOL. 14',
      title: 'The Changing Language of Digital Art.',
      meta: 'OCTOBER 2026 • 08 MIN READ • BY DR. JULIA MÜLLER',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
      paragraphs: [
        'For decades, digital art remained largely constrained by the physical boundaries of cathode-ray tubes, backlit liquid-crystal panels and mobile rectangles. It was viewed as an image of something else, rather than an architectural presence in its own right.',
        'At Museum 01, we witness a decisive historic transition: pixels are no longer flat pictures hung upon gallery walls; they have evolved into volumetric substance. The contemporary artist sculpts directly with photon density, room acoustics and spatial interference.',
        'When light occupies architectural space with the physical presence once reserved for marble or raw concrete, our philosophical definition of a permanent artwork must expand. Art is no longer bound to physical conservation; it exists as an immaculate, unrepeatable perceptual phenomenon.'
      ]
    },
    '02': {
      category: 'ARCHITECTURAL ESSAY // SPECIAL REPORT',
      title: 'When Architecture Becomes an Artwork.',
      meta: 'SEPTEMBER 2026 • 05 MIN READ • BY MARCUS VANCE',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85',
      paragraphs: [
        'A museum is never a neutral container. The walls of a gallery do not merely hold art—they dictate where daylight enters, how quietness settles over the stone, and how visitors gauge their own scale against eternity.',
        'In building the digital galleries of Museum 01, we discarded standard website templates in favor of architectural voids. Negative space is not empty web code; it is the limestone corridor between two monumental thoughts.'
      ]
    },
    '03': {
      category: 'LIGHT PHENOMENOLOGY // MONOGRAPH',
      title: 'Exploring Light as a Creative Medium.',
      meta: 'AUGUST 2026 • 06 MIN READ • BY ELENA ROSTOVA',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=85',
      paragraphs: [
        'Light does not describe space; light creates space. In our newest computational installations, light waves are treated as fluid bodies subject to viscosity, refraction and temporal turbulence.',
        'The visitor who stands before Beyond the Visible is not observing a pre-rendered video loop. They are immersed inside a continuous live calculation of radiance that never replicates the exact same visual state twice.'
      ]
    }
  };

  const articleModal = document.getElementById('articleModal');
  const btnCloseArticle = document.getElementById('btnCloseArticleModal');
  const articleModalCat = document.getElementById('articleModalCat');
  const articleModalTitle = document.getElementById('articleModalTitle');
  const articleModalMeta = document.getElementById('articleModalMeta');
  const articleModalImg = document.getElementById('articleModalImg');
  const articleModalBody = document.getElementById('articleModalBody');

  function openArticleModal(artKey) {
    const data = articlesDb[artKey] || articlesDb['01'];
    if (articleModalCat) articleModalCat.textContent = data.category;
    if (articleModalTitle) articleModalTitle.textContent = data.title;
    if (articleModalMeta) articleModalMeta.textContent = data.meta;
    if (articleModalImg) articleModalImg.src = data.image;

    if (articleModalBody) {
      articleModalBody.innerHTML = '';
      data.paragraphs.forEach(pText => {
        const p = document.createElement('p');
        p.textContent = pText;
        articleModalBody.appendChild(p);
      });
    }

    if (articleModal) {
      articleModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeArticleModal() {
    if (articleModal) {
      articleModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  const readBtns = document.querySelectorAll('.btn-read-article');
  readBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openArticleModal(btn.dataset.article);
    });
  });

  const journalCards = document.querySelectorAll('.journal-feature-card, .journal-compact-card');
  journalCards.forEach(card => {
    card.addEventListener('click', () => {
      openArticleModal(card.dataset.article);
    });
  });

  if (btnCloseArticle) btnCloseArticle.addEventListener('click', closeArticleModal);
  if (articleModal) {
    articleModal.addEventListener('click', (e) => {
      if (e.target === articleModal) closeArticleModal();
    });
  }

  // Global ESC for Sub-modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (artistModal && artistModal.classList.contains('active')) closeArtistModal();
      if (articleModal && articleModal.classList.contains('active')) closeArticleModal();
    }
  });

  // -------------------------------------------------------------
  // 5. APEX RETURN
  // -------------------------------------------------------------
  const apexBtn = document.querySelector('.f-apex-btn');
  if (apexBtn) {
    apexBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();

