/**
 * SONORA® — Generative Web Audio Player Engine
 * Synthesizes electronic music groove (analog kick/sub + arpeggios + hi-hat)
 * Fully connected with track timeline, visualizer bars and volume slider.
 */

(function () {
  'use strict';

  // Elements
  const playBtn = document.getElementById('btnPlayFeaturedTrack');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const statusLabel = document.getElementById('playerStatusLabel');
  const currentTimeEl = document.getElementById('playerCurrentTime');
  const durationEl = document.getElementById('playerDuration');
  const progressTrack = document.getElementById('playerProgressBarTrack');
  const progressFill = document.getElementById('playerProgressFill');
  const visualizerContainer = document.getElementById('playerReactiveVisualizer');
  const volumeSlider = document.getElementById('playerVolumeSlider');
  const artworkCard = document.getElementById('featuredArtworkCard');
  
  const globalToggle = document.getElementById('globalSoundToggle');
  const globalLabel = document.getElementById('soundStateLabel');

  // State
  let audioCtx = null;
  let masterGain = null;
  let isPlaying = false;
  let timerInterval = null;
  let synthInterval = null;
  let playbackSeconds = 0;
  const trackDuration = 272; // 04:32 in seconds
  let beatStep = 0;

  // Build 16 reactive visualizer bars
  const visualizerBars = [];
  if (visualizerContainer) {
    visualizerContainer.innerHTML = '';
    for (let i = 0; i < 16; i++) {
      const bar = document.createElement('div');
      bar.className = 'pmv-bar';
      bar.style.height = `${Math.floor(Math.random() * 8) + 4}px`;
      visualizerContainer.appendChild(bar);
      visualizerBars.push(bar);
    }
  }

  function animateVisualizer() {
    if (!isPlaying) {
      visualizerBars.forEach(bar => {
        bar.style.height = '4px';
      });
      return;
    }
    visualizerBars.forEach((bar, idx) => {
      const h = Math.floor(Math.random() * 20) + 4;
      bar.style.height = `${h}px`;
      bar.style.background = idx % 3 === 0 ? '#C5F467' : '#FF6B35';
    });
  }

  // Audio Context Initialization
  function initAudio() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    const vol = volumeSlider ? parseFloat(volumeSlider.value) : 0.8;
    masterGain.gain.setValueAtTime(vol * 0.22, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }

  // Generative Synth Pattern (Bass notes, chords, hats)
  const bassNotes = [55, 55, 65.41, 73.42, 82.41, 55, 98, 73.42]; // A1, C2, D2, E2, G2
  const leadNotes = [220, 261.63, 329.63, 392.0, 440, 523.25, 659.25, 587.33];

  function playSynthStep() {
    if (!audioCtx || !isPlaying) return;

    const now = audioCtx.currentTime;

    // 1. Kick / Sub Bass Pulse on quarters (0, 4, 8, 12)
    if (beatStep % 4 === 0) {
      const kickOsc = audioCtx.createOscillator();
      const kickGain = audioCtx.createGain();
      kickOsc.frequency.setValueAtTime(115, now);
      kickOsc.frequency.exponentialRampToValueAtTime(32, now + 0.16);
      kickGain.gain.setValueAtTime(0.42, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      kickOsc.connect(kickGain);
      kickGain.connect(masterGain);
      kickOsc.start(now);
      kickOsc.stop(now + 0.24);
    }

    // 2. Melodic Synth Pluck
    const noteFreq = leadNotes[(beatStep * 3) % leadNotes.length];
    const leadOsc = audioCtx.createOscillator();
    const leadGain = audioCtx.createGain();
    leadOsc.type = 'sawtooth';
    leadOsc.frequency.setValueAtTime(noteFreq, now);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100 + Math.sin(beatStep) * 550, now);

    leadGain.gain.setValueAtTime(0.12, now);
    leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    leadOsc.connect(filter);
    filter.connect(leadGain);
    leadGain.connect(masterGain);
    leadOsc.start(now);
    leadOsc.stop(now + 0.18);

    // 3. Ambient Sub Bass note
    if (beatStep % 8 === 0) {
      const bassOsc = audioCtx.createOscillator();
      const bassGain = audioCtx.createGain();
      bassOsc.type = 'triangle';
      const bFreq = bassNotes[(beatStep / 8) % bassNotes.length];
      bassOsc.frequency.setValueAtTime(bFreq, now);
      bassGain.gain.setValueAtTime(0.2, now);
      bassGain.gain.linearRampToValueAtTime(0.001, now + 0.75);
      bassOsc.connect(bassGain);
      bassGain.connect(masterGain);
      bassOsc.start(now);
      bassOsc.stop(now + 0.75);
    }

    animateVisualizer();
    beatStep = (beatStep + 1) % 16;
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function updateTimeDisplay() {
    if (currentTimeEl) {
      currentTimeEl.textContent = formatTime(playbackSeconds);
    }
    if (progressFill) {
      const pct = (playbackSeconds / trackDuration) * 100;
      progressFill.style.width = `${pct}%`;
    }
  }

  function startPlayback() {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = true;

    // UI Updates
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'inline';
    if (statusLabel) statusLabel.textContent = 'TRANSMITTING // 24-BIT 96kHz';
    if (artworkCard) artworkCard.classList.add('playing');
    if (globalToggle) globalToggle.classList.add('audio-active');
    if (globalLabel) globalLabel.textContent = 'AUDIO ON';

    // Timer Interval
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      playbackSeconds++;
      if (playbackSeconds >= trackDuration) {
        playbackSeconds = 0;
      }
      updateTimeDisplay();
    }, 1000);

    // Synth Interval (124 BPM = 120ms per 16th note)
    clearInterval(synthInterval);
    synthInterval = setInterval(playSynthStep, 122);
  }

  function stopPlayback() {
    isPlaying = false;
    clearInterval(timerInterval);
    clearInterval(synthInterval);

    if (playIcon) playIcon.style.display = 'inline';
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (statusLabel) statusLabel.textContent = 'TRANSMISSION PAUSED';
    if (artworkCard) artworkCard.classList.remove('playing');
    if (globalToggle) globalToggle.classList.remove('audio-active');
    if (globalLabel) globalLabel.textContent = 'AUDIO OFF';
    animateVisualizer();
  }

  function togglePlayback() {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }

  // Scrubber Progress Click
  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      playbackSeconds = Math.round(ratio * trackDuration);
      updateTimeDisplay();
    });
  }

  // Volume Slider
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      if (masterGain && audioCtx) {
        const val = parseFloat(e.target.value);
        masterGain.gain.setValueAtTime(val * 0.22, audioCtx.currentTime);
      }
    });
  }

  // Bind Buttons
  if (playBtn) playBtn.addEventListener('click', togglePlayback);
  if (globalToggle) globalToggle.addEventListener('click', togglePlayback);

  // Expose toggle globally for other cards
  window.SonoraPlayer = {
    start: startPlayback,
    stop: stopPlayback,
    toggle: togglePlayback
  };

})();
