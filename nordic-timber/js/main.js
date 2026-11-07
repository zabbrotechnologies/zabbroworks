/**
 * NORDIC TIMBER® — ARCHITECTURAL RESEARCH STUDIO (Standalone Root)
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initVideoModal();
  initCodexTabs();
  initStudyItems();
  initContactForm();
  initScrollSpy();
});

function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function initVideoModal() {
  const openVideoBtn = document.getElementById('openVideoBtn');
  const closeVideoBtn = document.getElementById('closeVideoBtn');
  const videoModal = document.getElementById('videoModal');

  if (!openVideoBtn || !videoModal) return;

  openVideoBtn.addEventListener('click', () => {
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeVideo() {
    videoModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideo);

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideo();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) {
      closeVideo();
    }
  });
}

const CODEX_DATA = {
  lap: {
    index: 'SPECIFICATION NO. 01',
    title: 'Halved Lap Joint (Halvkløving)',
    desc: 'The primary foundational joint in vernacular Nordic post-and-beam construction. Enables symmetrical shear distribution and accommodates longitudinal thermal movement without splitting.',
    shear: '18.4 kN',
    moisture: '12–15%',
    species: 'Scots Pine',
    fastener: 'Oak Dowel',
    ref: 'DWG-REF: NT-J01'
  },
  dovetail: {
    index: 'SPECIFICATION NO. 02',
    title: 'Blind Dovetail (Svalestjert)',
    desc: 'Self-interlocking tensile joint common in high-wind coastal naust boathouses. The flared angle mechanically resists extraction forces induced by lateral North Sea gales.',
    shear: '24.2 kN',
    moisture: '10–13%',
    species: 'Norway Spruce',
    fastener: 'Friction Wedged',
    ref: 'DWG-REF: NT-J02'
  },
  notch: {
    index: 'SPECIFICATION NO. 03',
    title: 'Scandinavian Cogging (Lafting)',
    desc: 'The defining joint of log timber building (laftebygg). Features a concave saddle scribe that compresses tightly under self-weight, maintaining airtight seals across seasonal expansion.',
    shear: '31.8 kN',
    moisture: '14–18%',
    species: 'Pine Heartwood',
    fastener: 'Self-Weight Lock',
    ref: 'DWG-REF: NT-J03'
  },
  scarf: {
    index: 'SPECIFICATION NO. 04',
    title: 'Keyed Scarf Joint (Lask)',
    desc: 'Longitudinal beam extension joint with inserted hardwood wedge key. Allows continuous span lengths exceeding 18 meters in historic church roof trusses while maintaining bending stiffness.',
    shear: '28.6 kN',
    moisture: '11–14%',
    species: 'Larch / Oak Key',
    fastener: 'Birch Keel Wedge',
    ref: 'DWG-REF: NT-J04'
  }
};

function initCodexTabs() {
  const tabs = document.querySelectorAll('.codex-tab');
  const jointTitle = document.getElementById('jointTitle');
  const jointDesc = document.getElementById('jointDesc');
  const entryIndex = document.querySelector('.entry-index');
  const metricShear = document.getElementById('metricShear');
  const metricMoisture = document.getElementById('metricMoisture');
  const metricSpecies = document.getElementById('metricSpecies');
  const metricFastener = document.getElementById('metricFastener');
  const bpMark = document.querySelector('.bp-mark');
  const btnDownloadSpec = document.getElementById('btnDownloadSpec');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const jointKey = tab.dataset.joint;
      const data = CODEX_DATA[jointKey];

      if (!data) return;

      if (entryIndex) entryIndex.textContent = data.index;
      if (jointTitle) jointTitle.textContent = data.title;
      if (jointDesc) jointDesc.textContent = data.desc;
      if (metricShear) metricShear.textContent = data.shear;
      if (metricMoisture) metricMoisture.textContent = data.moisture;
      if (metricSpecies) metricSpecies.textContent = data.species;
      if (metricFastener) metricFastener.textContent = data.fastener;
      if (bpMark) bpMark.textContent = data.ref;
    });
  });

  if (btnDownloadSpec) {
    btnDownloadSpec.addEventListener('click', () => {
      showToast('Vector blueprint & structural calculation package downloaded.');
    });
  }
}

function initStudyItems() {
  const items = document.querySelectorAll('.study-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const targetSection = document.getElementById('research');
      if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    showToast(`Dispatch received from ${name}. A Nordic Timber researcher will reply.`);
    form.reset();
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = toast.querySelector('.toast-msg');
  if (toastMsg) toastMsg.textContent = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const secNavItems = document.querySelectorAll('.sec-nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    const navbar = document.getElementById('topNav');
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (!currentId && scrollY < 200) currentId = 'hero';

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) link.classList.add('active');
    });

    secNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) item.classList.add('active');
    });
  }, { passive: true });
}

