/**
 * LISTIT ARCHIVE — Core Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initWatchlistInteractions();
  initDossierInteractions();
});

/**
 * Top Navbar Scroll Background Shift
 */
function initNavbarScroll() {
  const nav = document.getElementById('topNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/**
 * Interactive Center Phone: Episode Increment & Filter Tabs
 */
function initWatchlistInteractions() {
  const btnInc = document.getElementById('btnIncEp');
  const epCountEl = document.getElementById('aotEpCount');
  const percentEl = document.getElementById('aotPercent');
  const progressFill = document.getElementById('aotProgressFill');
  const filterTabs = document.querySelectorAll('.filter-tab-pill');

  let currentEp = 21;
  const totalEps = 28;

  if (btnInc && epCountEl && percentEl && progressFill) {
    btnInc.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentEp < totalEps) {
        currentEp++;
        const pct = Math.round((currentEp / totalEps) * 100);
        epCountEl.textContent = currentEp;
        percentEl.textContent = `${pct}%`;
        progressFill.style.width = `${pct}%`;

        // Micro vibration feedback simulation
        btnInc.style.transform = 'scale(0.96)';
        setTimeout(() => {
          btnInc.style.transform = 'translateY(-1px)';
        }, 150);

        if (currentEp === totalEps) {
          btnInc.innerHTML = '<span>★ Series Completed!</span>';
          btnInc.style.background = '#ECE6FF';
          btnInc.style.color = '#0E0B1A';
        }
      }
    });
  }

  // Filter tabs toggle
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

/**
 * Interactive Right Phone: Toggle Watchlist Status
 */
function initDossierInteractions() {
  const btnToggle = document.getElementById('btnToggleList');
  const statusText = document.getElementById('btnListStatusText');

  if (btnToggle && statusText) {
    let inList = true;

    btnToggle.addEventListener('click', () => {
      inList = !inList;
      if (inList) {
        btnToggle.classList.add('active-in-list');
        statusText.textContent = 'In Watchlist';
        btnToggle.style.borderColor = 'var(--accent-lime)';
        btnToggle.style.color = 'var(--accent-lime)';
      } else {
        btnToggle.classList.remove('active-in-list');
        statusText.textContent = '+ Add to Watchlist';
        btnToggle.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        btnToggle.style.color = '#ECE6FF';
      }
    });
  }
}

