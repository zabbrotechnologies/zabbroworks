/**
 * SONORA® — The Sound Lab Simulator
 * Interactive Waveform Canvas, Harmonic Folding & Web Audio Synth
 */

(function () {
  'use strict';

  const canvas = document.getElementById('soundLabCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Specs & Value Displays
  const specWaveform = document.getElementById('specWaveform');
  const specFreq = document.getElementById('specFreq');
  const specAmp = document.getElementById('specAmp');
  const specDist = document.getElementById('specDist');

  // Sliders
  const sliderFreq = document.getElementById('sliderFreq');
  const valFreq = document.getElementById('valFreq');
  const sliderAmp = document.getElementById('sliderAmp');
  const valAmp = document.getElementById('valAmp');
  const sliderDist = document.getElementById('sliderDist');
  const valDist = document.getElementById('valDist');

  // Button Clusters
  const waveBtns = document.querySelectorAll('#waveformCluster .rack-btn');
  const colorDots = document.querySelectorAll('#colorCluster .color-dot');
  const speedBtns = document.querySelectorAll('#speedCluster .rack-btn');
  const btnSynthToggle = document.getElementById('btnLabSynthToggle');
  const synthToggleLabel = document.getElementById('synthToggleLabel');
  const btnReset = document.getElementById('btnLabReset');

  // State
  let waveType = 'sine';
  let frequency = 124;
  let amplitude = 65;
  let distortion = 15;
  let speedMultiplier = 1;
  let phase = 0;
  let isPointerDown = false;
  let strokeColor = '#FF6B35';

  const colorMap = {
    orange: '#FF6B35',
    acid: '#C5F467',
    ice: '#F1F1ED',
    violet: '#9d8cd7'
  };

  // Web Audio Synth
  let labAudioCtx = null;
  let labOsc = null;
  let labGain = null;
  let isSynthAudible = false;

  function initLabAudio() {
    if (labAudioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    labAudioCtx = new AudioContextClass();
    labGain = labAudioCtx.createGain();
    labGain.gain.setValueAtTime(0.06, labAudioCtx.currentTime);
    labGain.connect(labAudioCtx.destination);
  }

  function startLabSynth() {
    initLabAudio();
    if (!labAudioCtx) return;
    if (labAudioCtx.state === 'suspended') {
      labAudioCtx.resume();
    }

    if (labOsc) {
      try { labOsc.stop(); labOsc.disconnect(); } catch (e) {}
    }

    labOsc = labAudioCtx.createOscillator();
    const typeMap = { sine: 'sine', square: 'square', triangle: 'triangle', noise: 'sawtooth' };
    labOsc.type = typeMap[waveType] || 'sine';
    labOsc.frequency.setValueAtTime(frequency, labAudioCtx.currentTime);
    labOsc.connect(labGain);
    labOsc.start();
    isSynthAudible = true;

    if (btnSynthToggle) {
      btnSynthToggle.classList.add('synth-active');
    }
    if (synthToggleLabel) {
      synthToggleLabel.textContent = 'AUDIBLE TONE: ON';
    }
  }

  function stopLabSynth() {
    if (labOsc) {
      try { labOsc.stop(); labOsc.disconnect(); } catch (e) {}
      labOsc = null;
    }
    isSynthAudible = false;

    if (btnSynthToggle) {
      btnSynthToggle.classList.remove('synth-active');
    }
    if (synthToggleLabel) {
      synthToggleLabel.textContent = 'AUDIBLE TONE: OFF';
    }
  }

  function updateLabSynthParams() {
    if (!labOsc || !labAudioCtx) return;
    labOsc.frequency.setTargetAtTime(frequency, labAudioCtx.currentTime, 0.04);
    const typeMap = { sine: 'sine', square: 'square', triangle: 'triangle', noise: 'sawtooth' };
    labOsc.type = typeMap[waveType] || 'sine';
  }

  // Canvas Resizing
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Waveform calculation
  function getWaveY(x, width, height) {
    const normalizedX = (x / width) * (frequency / 18) + phase;
    let y = 0;

    switch (waveType) {
      case 'sine':
        y = Math.sin(normalizedX);
        break;
      case 'square':
        y = Math.sin(normalizedX) >= 0 ? 0.8 : -0.8;
        break;
      case 'triangle':
        y = (2 / Math.PI) * Math.asin(Math.sin(normalizedX));
        break;
      case 'noise':
        y = (Math.sin(normalizedX) * 0.4) + ((Math.random() - 0.5) * (distortion / 35));
        break;
    }

    // Harmonic folding
    if (distortion > 0 && waveType !== 'noise') {
      const harm = Math.sin(normalizedX * 3) * (distortion / 120);
      y += harm;
    }

    const ampPx = (height * 0.38) * (amplitude / 100);
    return (height / 2) + y * ampPx;
  }

  // Animation Loop
  function draw() {
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height;

    ctx.clearRect(0, 0, width, height);

    // Subtle Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const grid = 36;
    for (let x = 0; x < width; x += grid) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += grid) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Center Baseline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glowing Primary Wave
    ctx.shadowBlur = 18;
    ctx.shadowColor = strokeColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;

    ctx.beginPath();
    for (let x = 0; x < width; x += 2) {
      const y = getWaveY(x, width, height);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Secondary White Shimmer
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let x = 0; x < width; x += 4) {
      const y = getWaveY(x, width, height);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    phase += 0.04 * speedMultiplier;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

  // Sliders Bindings
  if (sliderFreq) {
    sliderFreq.addEventListener('input', (e) => {
      frequency = parseInt(e.target.value, 10);
      if (valFreq) valFreq.textContent = `${frequency} Hz`;
      if (specFreq) specFreq.textContent = `${frequency}.0 Hz`;
      updateLabSynthParams();
    });
  }

  if (sliderAmp) {
    sliderAmp.addEventListener('input', (e) => {
      amplitude = parseInt(e.target.value, 10);
      if (valAmp) valAmp.textContent = `${amplitude}%`;
      if (specAmp) specAmp.textContent = (amplitude / 100).toFixed(2);
    });
  }

  if (sliderDist) {
    sliderDist.addEventListener('input', (e) => {
      distortion = parseInt(e.target.value, 10);
      if (valDist) valDist.textContent = `${distortion}%`;
      if (specDist) specDist.textContent = `${(distortion / 100).toFixed(2)} THD`;
    });
  }

  // Wave Selectors
  waveBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      waveBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      waveType = btn.dataset.wave || 'sine';
      if (specWaveform) specWaveform.textContent = waveType.toUpperCase();
      updateLabSynthParams();
    });
  });

  // Color Clusters
  colorDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const c = dot.dataset.color || 'orange';
      strokeColor = colorMap[c] || '#FF6B35';
    });
  });

  // Speed Multiplier
  speedBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const s = btn.dataset.speed;
      if (s === 'slow') speedMultiplier = 0.5;
      else if (s === 'fast') speedMultiplier = 2.0;
      else speedMultiplier = 1.0;
    });
  });

  // Synth Toggle Button
  if (btnSynthToggle) {
    btnSynthToggle.addEventListener('click', () => {
      if (isSynthAudible) {
        stopLabSynth();
      } else {
        startLabSynth();
      }
    });
  }

  // Reset Button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      frequency = 124;
      amplitude = 65;
      distortion = 15;
      speedMultiplier = 1.0;
      waveType = 'sine';
      strokeColor = '#FF6B35';

      if (sliderFreq) sliderFreq.value = 124;
      if (valFreq) valFreq.textContent = '124 Hz';
      if (specFreq) specFreq.textContent = '124.0 Hz';

      if (sliderAmp) sliderAmp.value = 65;
      if (valAmp) valAmp.textContent = '65%';
      if (specAmp) specAmp.textContent = '0.65';

      if (sliderDist) sliderDist.value = 15;
      if (valDist) valDist.textContent = '15%';
      if (specDist) specDist.textContent = '0.15 THD';

      if (specWaveform) specWaveform.textContent = 'SINE';

      waveBtns.forEach(b => b.classList.toggle('active', b.dataset.wave === 'sine'));
      colorDots.forEach(d => d.classList.toggle('active', d.dataset.color === 'orange'));
      speedBtns.forEach(b => b.classList.toggle('active', b.dataset.speed === 'balanced'));

      updateLabSynthParams();
    });
  }

  // Pointer Modulation on Canvas Viewport
  function handleCanvasMod(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const freqRatio = x / rect.width;
    frequency = Math.round(30 + freqRatio * 400);
    if (sliderFreq) sliderFreq.value = frequency;
    if (valFreq) valFreq.textContent = `${frequency} Hz`;
    if (specFreq) specFreq.textContent = `${frequency}.0 Hz`;

    const ampRatio = 1 - (y / rect.height);
    amplitude = Math.round(15 + ampRatio * 80);
    if (sliderAmp) sliderAmp.value = amplitude;
    if (valAmp) valAmp.textContent = `${amplitude}%`;
    if (specAmp) specAmp.textContent = (amplitude / 100).toFixed(2);

    updateLabSynthParams();
  }

  canvas.addEventListener('mousedown', (e) => {
    isPointerDown = true;
    handleCanvasMod(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isPointerDown) handleCanvasMod(e);
  });

  window.addEventListener('mouseup', () => {
    isPointerDown = false;
  });

  canvas.addEventListener('touchstart', (e) => {
    isPointerDown = true;
    if (e.touches[0]) handleCanvasMod(e.touches[0]);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isPointerDown && e.touches[0]) handleCanvasMod(e.touches[0]);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isPointerDown = false;
  });

})();

