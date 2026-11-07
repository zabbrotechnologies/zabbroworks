/**
 * PRISMATIC — CHROMATIC LAB INTERACTIVE PLAYGROUND
 * Generative procedural canvas engine responding to live matrix parameters
 */

(function () {
  const canvas = document.getElementById('chromaticLabCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // State Parameters
  const state = {
    colorMode: 'acid', // 'acid' | 'chromatic' | 'monochrome'
    form: 'liquid',    // 'liquid' | 'geometric' | 'organic'
    distortion: 45,    // 0 - 100
    rotationX: 0,
    rotationY: 0,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    cycle: 4820,
    fps: 60,
    lastTime: performance.now(),
    frameCount: 0
  };

  // Color Palettes
  const PALETTES = {
    acid: {
      primary: '#D6FF35',
      secondary: '#FF5A36',
      tertiary: '#54D9C5',
      dark: '#11120F',
      wavelength: '520nm / 610nm'
    },
    chromatic: {
      primary: '#54D9C5',
      secondary: '#9D4EDD',
      tertiary: '#FF5A36',
      dark: '#080A08',
      wavelength: '480nm / 680nm'
    },
    monochrome: {
      primary: '#F2F0E8',
      secondary: '#777B76',
      tertiary: '#2B2E28',
      dark: '#11120F',
      wavelength: 'SPECTRAL_NEUTRAL'
    }
  };

  initLab();

  function initLab() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    setupControls();
    setupCanvasInteractivity();

    renderLoop();
  }

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function setupControls() {
    // 1. Color Mode Buttons
    const colorBtns = document.querySelectorAll('#colorControlGroup .ctrl-btn');
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.colorMode = btn.dataset.mode;
        updateHud();
      });
    });

    // 2. Form Topology Buttons
    const formBtns = document.querySelectorAll('#formControlGroup .ctrl-btn');
    formBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        formBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.form = btn.dataset.form;
        updateHud();
      });
    });

    // 3. Distortion Slider
    const slider = document.getElementById('distortionSlider');
    const sliderVal = document.getElementById('distortionVal');
    if (slider) {
      slider.addEventListener('input', (e) => {
        state.distortion = parseInt(e.target.value, 10);
        if (sliderVal) sliderVal.textContent = `${state.distortion}%`;
        updateHud();
      });
    }

    // 4. Presets
    const presets = document.querySelectorAll('.preset-pill');
    presets.forEach(p => {
      p.addEventListener('click', () => {
        const type = p.dataset.preset;
        applyPreset(type);
      });
    });

    // 5. Snapshot Capture
    const btnSnapshot = document.getElementById('btnSnapshot');
    if (btnSnapshot) {
      btnSnapshot.addEventListener('click', () => {
        takeSnapshot();
      });
    }
  }

  function applyPreset(type) {
    if (type === 'supernova') {
      setActiveControl('#colorControlGroup', 'acid');
      setActiveControl('#formControlGroup', 'organic');
      setSlider(85);
    } else if (type === 'quantum') {
      setActiveControl('#colorControlGroup', 'chromatic');
      setActiveControl('#formControlGroup', 'geometric');
      setSlider(30);
    } else if (type === 'darkvoid') {
      setActiveControl('#colorControlGroup', 'monochrome');
      setActiveControl('#formControlGroup', 'liquid');
      setSlider(60);
    }
  }

  function setActiveControl(groupId, val) {
    const btns = document.querySelectorAll(`${groupId} .ctrl-btn`);
    btns.forEach(b => {
      if (b.dataset.mode === val || b.dataset.form === val) {
        b.classList.add('active');
        if (b.dataset.mode) state.colorMode = val;
        if (b.dataset.form) state.form = val;
      } else {
        b.classList.remove('active');
      }
    });
    updateHud();
  }

  function setSlider(val) {
    const slider = document.getElementById('distortionSlider');
    const sliderVal = document.getElementById('distortionVal');
    if (slider) {
      slider.value = val;
      state.distortion = val;
      if (sliderVal) sliderVal.textContent = `${val}%`;
      updateHud();
    }
  }

  function setupCanvasInteractivity() {
    canvas.addEventListener('mousedown', (e) => {
      state.isDragging = true;
      state.prevMouseX = e.clientX;
      state.prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      state.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isDragging) return;
      const dx = e.clientX - state.prevMouseX;
      const dy = e.clientY - state.prevMouseY;

      state.rotationY += dx * 0.005;
      state.rotationX += dy * 0.005;

      state.prevMouseX = e.clientX;
      state.prevMouseY = e.clientY;
    });
  }

  function updateHud() {
    const hudMatrix = document.getElementById('hudMatrix');
    const specWavelength = document.getElementById('specWavelength');
    const specSteps = document.getElementById('specSteps');

    if (hudMatrix) {
      hudMatrix.textContent = `MAT: [${state.colorMode.toUpperCase()} / ${state.form.toUpperCase()} / D:${state.distortion}%]`;
    }
    if (specWavelength) {
      specWavelength.textContent = PALETTES[state.colorMode].wavelength;
    }
    if (specSteps) {
      const steps = Math.floor(32 + (state.distortion / 100) * 96);
      specSteps.textContent = `${steps} ITERATIONS`;
    }
  }

  function renderLoop() {
    animationFrameId = requestAnimationFrame(renderLoop);

    const now = performance.now();
    state.frameCount++;
    if (now - state.lastTime >= 1000) {
      state.fps = state.frameCount;
      state.frameCount = 0;
      state.lastTime = now;
      const hudFps = document.getElementById('hudFps');
      if (hudFps) hudFps.textContent = `${state.fps}.0 FPS`;
    }

    state.cycle++;
    const hudCycles = document.getElementById('hudCycles');
    if (hudCycles && state.cycle % 10 === 0) {
      hudCycles.textContent = `CYCLE: ${String(state.cycle).padStart(6, '0')}`;
    }

    drawProceduralArt(now * 0.001);
  }

  function drawProceduralArt(t) {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    const pal = PALETTES[state.colorMode];
    const distFactor = state.distortion / 100;

    // Dark clear
    ctx.fillStyle = pal.dark;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(state.rotationY + t * 0.1);

    // Multiple concentric harmonic rings / forms
    const count = state.form === 'geometric' ? 6 : (state.form === 'liquid' ? 12 : 8);

    for (let i = 0; i < count; i++) {
      const radius = 60 + i * 22;
      const ringT = t * 1.5 + i * 0.35;

      ctx.beginPath();

      if (state.form === 'geometric') {
        // Multi-point sharp polygon
        const sides = 3 + (i % 4);
        for (let j = 0; j <= sides; j++) {
          const a = (j * 2 * Math.PI) / sides + ringT * 0.3;
          const rDist = radius * (1 + Math.sin(a * 4 + ringT) * 0.35 * distFactor);
          const px = Math.cos(a) * rDist;
          const py = Math.sin(a) * rDist;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      } else if (state.form === 'liquid') {
        // Smooth sine fluid wave
        const points = 72;
        for (let j = 0; j <= points; j++) {
          const a = (j * 2 * Math.PI) / points;
          const wave = Math.sin(a * 5 + ringT) * Math.cos(a * 3 - ringT) * 35 * distFactor;
          const r = radius + wave;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      } else {
        // Organic spiky petal harmonics
        const points = 100;
        for (let j = 0; j <= points; j++) {
          const a = (j * 2 * Math.PI) / points;
          const noise = Math.sin(a * 7 + ringT) * 25 * distFactor + Math.sin(a * 13 - ringT * 2) * 15 * distFactor;
          const r = radius + noise;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }

      ctx.closePath();

      // Stroke with alternating colors
      if (i % 3 === 0) {
        ctx.strokeStyle = pal.primary;
        ctx.shadowColor = pal.primary;
      } else if (i % 3 === 1) {
        ctx.strokeStyle = pal.secondary;
        ctx.shadowColor = pal.secondary;
      } else {
        ctx.strokeStyle = pal.tertiary;
        ctx.shadowColor = pal.tertiary;
      }

      ctx.shadowBlur = 12 * distFactor;
      ctx.lineWidth = 1.5 + (i % 2);
      ctx.stroke();
    }

    // Center focal optical core
    ctx.beginPath();
    ctx.arc(0, 0, 16 + Math.sin(t * 3) * 6, 0, Math.PI * 2);
    ctx.fillStyle = pal.primary;
    ctx.shadowBlur = 24;
    ctx.shadowColor = pal.primary;
    ctx.fill();

    ctx.restore();
  }

  function takeSnapshot() {
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `PRISMATIC_LAB_${state.colorMode}_${state.form}_${Date.now()}.png`;
    a.click();

    const toast = document.getElementById('toastNotice');
    const toastMsg = document.getElementById('toastMsg');
    if (toast && toastMsg) {
      toastMsg.textContent = 'Frame artifact captured & downloaded (.PNG).';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
  }
})();

