/**
 * OFFGRID® — Interactive Graphic Playground Engine
 * Real-time Draggable Physics, Palette Mutations & Composition States
 */

(function () {
  'use strict';

  const stage = document.getElementById('interactiveStage');
  const statusMsg = document.getElementById('stageStatusMsg');
  const paletteBtns = document.querySelectorAll('#paletteCluster .tool-btn');
  const compBtns = document.querySelectorAll('#compositionCluster .tool-btn');
  const addShapeBtns = document.querySelectorAll('#addShapeCluster .tool-btn');
  const resetBtn = document.getElementById('btnResetBoard');

  if (!stage) return;

  let highestZ = 20;
  let activePalette = 'original';
  let activeComp = 'collage';

  // Initial Item Configurations for Reset
  const initialElements = [
    { id: 'dragO', top: 40, left: 60, transform: 'rotate(0deg)' },
    { id: 'dragRed', top: 180, left: 160, transform: 'rotate(-5deg)' },
    { id: 'dragCobalt', top: 80, right: 180, left: null, transform: 'rotate(0deg)' },
    { id: 'dragYellow', top: 240, right: 120, left: null, transform: 'rotate(8deg)' },
    { id: 'dragSerif', bottom: 80, top: null, left: 120, transform: 'rotate(-2deg)' },
    { id: 'dragHalftone', bottom: 60, top: null, right: 280, left: null, transform: 'rotate(0deg)' }
  ];

  // -------------------------------------------------------------
  // DRAGGING ENGINE (Pointer Events)
  // -------------------------------------------------------------
  function makeDraggable(el) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    el.addEventListener('pointerdown', (e) => {
      // Don't drag if clicking buttons inside item
      if (e.target.tagName.toLowerCase() === 'button') return;

      isDragging = true;
      el.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');

      highestZ += 1;
      el.style.zIndex = highestZ;

      const rect = el.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();

      // Convert from bottom/right positioning to absolute top/left relative to stage
      startLeft = rect.left - stageRect.left;
      startTop = rect.top - stageRect.top;

      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.style.left = startLeft + 'px';
      el.style.top = startTop + 'px';

      startX = e.clientX;
      startY = e.clientY;

      updateStatus(`DRAGGING: ${el.id || 'GENERATED OBJECT'} // Z-INDEX: ${highestZ}`);
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newLeft = startLeft + dx;
      let newTop = startTop + dy;

      const stageRect = stage.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      // Bounding constraints
      const maxLeft = stageRect.width - elRect.width;
      const maxTop = stageRect.height - elRect.height;

      newLeft = Math.max(-20, Math.min(newLeft, maxLeft + 20));
      newTop = Math.max(-20, Math.min(newTop, maxTop + 20));

      el.style.left = newLeft + 'px';
      el.style.top = newTop + 'px';
    });

    const stopDragging = (e) => {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove('is-dragging');
      if (e.pointerId) {
        try { el.releasePointerCapture(e.pointerId); } catch (_) {}
      }
      updateActiveObjectCount();
    };

    el.addEventListener('pointerup', stopDragging);
    el.addEventListener('pointercancel', stopDragging);
  }

  // Initialize existing draggable items
  const items = stage.querySelectorAll('.drag-item');
  items.forEach(makeDraggable);

  // -------------------------------------------------------------
  // STATUS COUNTER
  // -------------------------------------------------------------
  function updateActiveObjectCount() {
    const total = stage.querySelectorAll('.drag-item').length;
    const pad = total < 10 ? `0${total}` : total;
    if (statusMsg) {
      statusMsg.textContent = `ACTIVE OBJECTS: ${pad} // READY FOR COLLISION`;
    }
  }

  function updateStatus(text) {
    if (statusMsg) {
      statusMsg.textContent = text;
    }
  }

  // -------------------------------------------------------------
  // COLOR PALETTE SWITCHER
  // -------------------------------------------------------------
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paletteBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePalette = btn.dataset.palette;
      applyPalette(activePalette);
    });
  });

  function applyPalette(palette) {
    const allItems = stage.querySelectorAll('.drag-item');

    allItems.forEach(item => {
      const inner = item.querySelector('.item-inner') || item;

      if (palette === 'original') {
        inner.style.background = '';
        inner.style.color = '';
        inner.style.borderColor = '';
      } else if (palette === 'redblack') {
        if (item.classList.contains('item-red-banner') || item.classList.contains('item-yellow-slip')) {
          inner.style.background = '#171717';
          inner.style.color = '#F04438';
          inner.style.borderColor = '#F04438';
        } else {
          inner.style.background = '#F04438';
          inner.style.color = '#171717';
          inner.style.borderColor = '#171717';
        }
      } else if (palette === 'cobaltcream') {
        if (item.classList.contains('item-cobalt-disc') || item.classList.contains('item-letter')) {
          inner.style.background = '#2547D0';
          inner.style.color = '#F2EBDD';
          inner.style.borderColor = '#171717';
        } else {
          inner.style.background = '#F2EBDD';
          inner.style.color = '#2547D0';
          inner.style.borderColor = '#2547D0';
        }
      } else if (palette === 'acidink') {
        if (item.classList.contains('item-yellow-slip') || item.classList.contains('item-serif-cutout')) {
          inner.style.background = '#171717';
          inner.style.color = '#E9F044';
          inner.style.borderColor = '#E9F044';
        } else {
          inner.style.background = '#E9F044';
          inner.style.color = '#171717';
          inner.style.borderColor = '#171717';
        }
      }
    });

    updateStatus(`PALETTE MUTATED: ${palette.toUpperCase()} // READY`);
  }

  // -------------------------------------------------------------
  // COMPOSITION PRESET SWITCHER
  // -------------------------------------------------------------
  compBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      compBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeComp = btn.dataset.comp;
      applyComposition(activeComp);
    });
  });

  function applyComposition(comp) {
    const allItems = Array.from(stage.querySelectorAll('.drag-item'));
    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;

    allItems.forEach((el, index) => {
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

      if (comp === 'collage') {
        // Staggered, chaotic collage with organic rotations
        const defaultPositions = [
          { x: 60, y: 50, rot: -2 },
          { x: 200, y: 160, rot: -6 },
          { x: stageW - 240, y: 70, rot: 5 },
          { x: stageW - 260, y: 240, rot: 9 },
          { x: 100, y: 340, rot: -3 },
          { x: stageW - 400, y: 320, rot: 4 }
        ];
        const pos = defaultPositions[index % defaultPositions.length];
        el.style.left = pos.x + 'px';
        el.style.top = pos.y + 'px';
        el.style.transform = `rotate(${pos.rot}deg)`;
      } else if (comp === 'grid') {
        // Disciplined Swiss 3-column x 2-row layout
        const cols = 3;
        const colW = (stageW - 120) / cols;
        const rowH = (stageH - 80) / 2;
        const col = index % cols;
        const row = Math.floor(index / cols);

        el.style.left = (60 + col * colW) + 'px';
        el.style.top = (40 + row * rowH) + 'px';
        el.style.transform = 'rotate(0deg)';
      } else if (comp === 'diagonal') {
        // Dynamic 45-degree angle staircase
        const stepX = (stageW - 300) / (allItems.length || 1);
        const stepY = (stageH - 200) / (allItems.length || 1);
        el.style.left = (50 + index * stepX) + 'px';
        el.style.top = (40 + index * stepY) + 'px';
        el.style.transform = 'rotate(-8deg)';
      } else if (comp === 'overlap') {
        // Centered overlapping stack
        const centerX = stageW / 2 - 80;
        const centerY = stageH / 2 - 80;
        const offset = (index - allItems.length / 2) * 28;
        el.style.left = (centerX + offset) + 'px';
        el.style.top = (centerY + offset * 0.5) + 'px';
        el.style.transform = `rotate(${(index % 2 === 0 ? 1 : -1) * (index * 4)}deg)`;
      }

      setTimeout(() => {
        el.style.transition = '';
      }, 500);
    });

    updateStatus(`COMPOSITION MODE: ${comp.toUpperCase()} APPLIED`);
  }

  // -------------------------------------------------------------
  // SHAPE GENERATOR
  // -------------------------------------------------------------
  addShapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const shapeType = btn.dataset.shape;
      createShape(shapeType);
    });
  });

  function createShape(shapeType) {
    const newDiv = document.createElement('div');
    newDiv.className = `drag-item item-gen-${shapeType} generated-item`;
    
    // Spawn near center with slight random offset
    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    const randX = Math.max(40, Math.min(stageW - 180, (stageW / 2) + (Math.random() * 160 - 80)));
    const randY = Math.max(40, Math.min(stageH - 140, (stageH / 2) + (Math.random() * 120 - 60)));
    const randRot = Math.floor(Math.random() * 20 - 10);

    newDiv.style.left = randX + 'px';
    newDiv.style.top = randY + 'px';
    newDiv.style.transform = `rotate(${randRot}deg)`;
    highestZ += 1;
    newDiv.style.zIndex = highestZ;

    const inner = document.createElement('div');
    inner.className = 'item-inner';

    if (shapeType === 'circle') {
      inner.textContent = 'PRINT.DOT';
    } else if (shapeType === 'rect') {
      inner.textContent = 'RAW CUTOUT';
    } else if (shapeType === 'triangle') {
      inner.textContent = '▲ SHIFT';
    } else if (shapeType === 'halftone') {
      inner.textContent = 'DPI 150';
    }

    const handle = document.createElement('span');
    handle.className = 'item-handle';
    handle.textContent = '✥';
    inner.appendChild(handle);

    newDiv.appendChild(inner);
    stage.appendChild(newDiv);

    makeDraggable(newDiv);
    applyPalette(activePalette);
    updateActiveObjectCount();
    updateStatus(`GENERATED: +${shapeType.toUpperCase()} // READY TO DRAG`);
  }

  // -------------------------------------------------------------
  // RESET BOARD
  // -------------------------------------------------------------
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Remove all dynamically generated items
      const generated = stage.querySelectorAll('.generated-item');
      generated.forEach(item => item.remove());

      // Restore initial 6 items
      initialElements.forEach(cfg => {
        const el = document.getElementById(cfg.id);
        if (el) {
          el.style.transition = 'all 0.4s ease';
          el.style.top = cfg.top !== null ? cfg.top + 'px' : '';
          el.style.left = cfg.left !== null ? cfg.left + 'px' : '';
          el.style.right = cfg.right !== null ? cfg.right + 'px' : '';
          el.style.bottom = cfg.bottom !== null ? cfg.bottom + 'px' : '';
          el.style.transform = cfg.transform;
          setTimeout(() => { el.style.transition = ''; }, 400);
        }
      });

      // Reset Palette and Comp buttons
      paletteBtns.forEach(b => b.classList.remove('active'));
      const origPalBtn = document.querySelector('#paletteCluster [data-palette="original"]');
      if (origPalBtn) origPalBtn.classList.add('active');
      activePalette = 'original';
      applyPalette('original');

      compBtns.forEach(b => b.classList.remove('active'));
      const origCompBtn = document.querySelector('#compositionCluster [data-comp="collage"]');
      if (origCompBtn) origCompBtn.classList.add('active');
      activeComp = 'collage';

      updateActiveObjectCount();
      updateStatus('BOARD REINITIALIZED // SYSTEM SPEC 26-B OK');
    });
  }

})();

