/**
 * OFFGRID® — Experimental Typography Lab Engine
 * Real-time Font Mutation, Tracking Calibration & Ink Density Control
 */

(function () {
  'use strict';

  const phraseSelect = document.getElementById('typePhraseSelect');
  const fontBtns = document.querySelectorAll('#typeFontBtns .t-btn');
  const trackingSlider = document.getElementById('trackingSlider');
  const trackingValue = document.getElementById('trackingValue');
  const colorSwatches = document.querySelectorAll('#typeColorSwatches .t-color-dot');
  const displayTarget = document.getElementById('typeDisplayTarget');

  if (!displayTarget) return;

  // 1. Phrase Selector
  if (phraseSelect) {
    phraseSelect.addEventListener('change', (e) => {
      displayTarget.innerHTML = e.target.value;
    });
  }

  // 2. Font Style Toggles
  const fontMap = {
    archivo: {
      family: "'Archivo Black', sans-serif",
      style: "normal",
      weight: "900",
      transform: "uppercase"
    },
    bodoni: {
      family: "'Bodoni Moda', serif",
      style: "italic",
      weight: "700",
      transform: "none"
    },
    space: {
      family: "'Space Mono', monospace",
      style: "normal",
      weight: "700",
      transform: "none"
    }
  };

  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fontBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const fontKey = btn.dataset.font;
      const fontConf = fontMap[fontKey] || fontMap.archivo;

      displayTarget.style.fontFamily = fontConf.family;
      displayTarget.style.fontStyle = fontConf.style;
      displayTarget.style.fontWeight = fontConf.weight;
      displayTarget.style.textTransform = fontConf.transform;
    });
  });

  // 3. Tracking Slider
  if (trackingSlider && trackingValue) {
    trackingSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      trackingValue.textContent = `${val}px`;
      displayTarget.style.letterSpacing = `${val}px`;
    });
  }

  // 4. Color Swatches
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const colorVal = swatch.dataset.color;
      displayTarget.style.color = colorVal;
    });
  });

})();

