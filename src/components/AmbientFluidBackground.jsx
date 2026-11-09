import React, { useEffect, useRef } from 'react';

/**
 * AmbientFluidBackground — ZABBRO Interactive Animated Background (Black & White Theme)
 * 
 * Living wireframe environment featuring abstract wireframe wave & guilloche wavy line patterns:
 * - Layer 1: Base Guilloche Artwork with continuous organic wave drift animation.
 * - Layer 2: Flowing Wave Morphed Overlay (screen blend) causing fluid undulation.
 * - Layer 3: Atmospheric subtle monochrome wave shimmer pulsing softly.
 * - Layer 4: Living Canvas Guilloche Wireframe Stream & Particle Mesh.
 * - Layer 5: Interactive cursor ambient soft monochrome glow.
 */
export default function AmbientFluidBackground() {
  const canvasRef = useRef(null);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    // Parallax tracking variables
    let targetNormX = 0;
    let targetNormY = 0;
    let currentNormX = 0;
    let currentNormY = 0;

    let targetClientX = window.innerWidth * 0.7;
    let targetClientY = window.innerHeight * 0.35;
    let currentClientX = targetClientX;
    let currentClientY = targetClientY;

    let targetScroll = window.scrollY || 0;
    let currentScroll = targetScroll;
    let scrollVelocity = 0;

    let animId;
    let isTabVisible = true;

    // --- CANVAS PARTICLE SIMULATION SETUP ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let isMobile = window.innerWidth < 768;
    let particleCount = isMobile ? 10 : 26;

    // Palette: Monochrome Pure White #FFFFFF, Platinum #E4E4E7, Radiant Silver #D4D4D8
    const particleColors = [
      'rgba(255, 255, 255, ',
      'rgba(228, 228, 231, ',
      'rgba(212, 212, 216, '
    ];

    class FlowParticle {
      constructor(isUpper) {
        this.isUpper = isUpper;
        this.reset(true);
      }

      reset(initial = false) {
        this.isUpper = Math.random() > 0.44;
        this.x = initial ? Math.random() * width : -20 - Math.random() * 50;
        this.waveSpread = (Math.random() - 0.5) * (this.isUpper ? height * 0.15 : height * 0.22);
        this.flowSpeed = this.isUpper 
          ? 0.45 + Math.random() * 0.65 
          : 0.35 + Math.random() * 0.50;

        this.radius = 1.0 + Math.random() * 1.4;
        this.colorPrefix = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.baseAlpha = 0.35 + Math.random() * 0.45;
        this.pulseSpeed = 0.015 + Math.random() * 0.025;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.phaseOffset = Math.random() * Math.PI * 2;
        this.disturbX = 0;
        this.disturbY = 0;
      }

      update(mouseX, mouseY, timeSec) {
        this.x += this.flowSpeed;

        const normX = Math.max(0, Math.min(1, this.x / width));
        let curveY;
        if (this.isUpper) {
          curveY = height * (0.21 + 0.08 * Math.sin(normX * Math.PI * 1.5 - 0.35) - 0.045 * Math.sin(normX * Math.PI * 3.0));
        } else {
          curveY = height * (0.75 - 0.065 * Math.sin(normX * Math.PI * 1.6 + 0.4));
        }

        const waveHarmonic = Math.sin(timeSec * 1.6 + normX * 5.5 + this.phaseOffset) * (this.isUpper ? 7.5 : 7.0);
        this.y = curveY + this.waveSpread + waveHarmonic + this.disturbY;

        this.pulseAngle += this.pulseSpeed;

        let edgeFade = 1;
        if (this.x < 70) edgeFade = Math.max(0, this.x / 70);
        if (this.x > width - 70) edgeFade = Math.max(0, (width - this.x) / 70);

        this.currentAlpha = (this.baseAlpha + Math.sin(this.pulseAngle) * 0.2) * edgeFade;

        // Interactive mouse proximity disturbance (lightweight)
        if (mouseX !== undefined && mouseY !== undefined) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          if (Math.abs(dx) < 130 && Math.abs(dy) < 130) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130 && dist > 1) {
              const force = (1 - dist / 130) * 0.7;
              this.disturbX -= (dx / dist) * force * 1.4;
              this.disturbY -= (dy / dist) * force * 1.4;
            }
          }
        }

        this.disturbX *= 0.94;
        this.disturbY *= 0.94;

        if (this.x > width + 45) {
          this.reset(false);
        }
      }

      draw(context) {
        const a = Math.max(0.05, Math.min(0.9, this.currentAlpha));
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = `${this.colorPrefix}${a.toFixed(2)})`;
        context.fill();

        // Hardware-friendly halo glow for larger particles (NO shadowBlur)
        if (this.radius > 1.6) {
          context.beginPath();
          context.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
          context.fillStyle = `${this.colorPrefix}${(a * 0.25).toFixed(2)})`;
          context.fill();
        }
      }
    }

    const particles = Array.from({ length: particleCount }, () => new FlowParticle(true));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      particles.forEach((p) => p.reset(true));
    };

    const handlePointerMove = (e) => {
      targetClientX = e.clientX;
      targetClientY = e.clientY;
      targetNormX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetNormY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScroll = window.scrollY || 0;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animId) {
        animId = requestAnimationFrame(update);
      }
    };

    // --- MAIN 60FPS OPTIMIZED ANIMATION LOOP ---
    const update = (time) => {
      if (!isTabVisible) {
        animId = null;
        return;
      }

      const timeSec = time * 0.001;

      // Liquid-smooth dual-damped spring interpolation for buttery, jitter-free parallax
      currentNormX += (targetNormX - currentNormX) * 0.055;
      currentNormY += (targetNormY - currentNormY) * 0.055;
      currentClientX += (targetClientX - currentClientX) * 0.065;
      currentClientY += (targetClientY - currentClientY) * 0.065;

      const scrollDelta = targetScroll - currentScroll;
      currentScroll += scrollDelta * 0.065;
      scrollVelocity += (scrollDelta - scrollVelocity) * 0.15;

      // 1. Layer 1: Atmospheric Ambient Glow follows cursor seamlessly
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${currentClientX.toFixed(1)}px, ${currentClientY.toFixed(1)}px, 0)`;
      }

      // 2. Clear canvas for single living Guilloche string wave render
      ctx.clearRect(0, 0, width, height);

      // Scroll phase progression:
      // Scrolling DOWN advances wave forward (left-to-right)
      // Scrolling UP moves wave backward
      const scrollPhase = currentScroll * 0.0030 + scrollVelocity * 0.0009;

      // Curated Airy Guilloche Wave (matching User Reference Images 2 & 3)
      // Open, airy lines with clean spacing, scaled and positioned dynamically for mobile & desktop
      const lineCount = isMobile ? 18 : 36;
      const steps = isMobile ? 90 : 180;
      const speed = isMobile ? 0.32 : 0.42; // Hypnotic, elegant continuous left-to-right flow speed

      for (let i = 0; i < lineCount; i++) {
        const p = i / (lineCount - 1);
        const pCentered = (p - 0.5) * 2; // -1 to 1

        // Core line luminous gradient (subtle glow along center strings, sheer tapering edges)
        // On mobile: sheer silk opacity so white text always maintains supreme legibility
        const coreWeight = Math.exp(-pCentered * pCentered * 2.4);
        const lineAlpha = isMobile 
          ? (0.035 + 0.16 * coreWeight)
          : (0.09 + 0.44 * coreWeight);
        ctx.lineWidth = isMobile
          ? (0.50 + 0.30 * coreWeight)
          : (0.70 + 0.55 * coreWeight);

        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          const x = u * width;

          // Progressive wave phase: frequency tuned to viewport aspect ratio
          // Mobile uses gentle horizontal sweeps (~0.95 PI) preventing steep vertical cliff plunging
          const freqMain = isMobile ? (u * Math.PI * 0.95) : (u * Math.PI * 1.9);
          const freqHarmonic = isMobile ? (u * Math.PI * 1.8) : (u * Math.PI * 3.6);
          const freqLow = isMobile ? (u * Math.PI * 0.5) : (u * Math.PI * 0.95);

          const phaseMain = freqMain - (timeSec * speed + scrollPhase);
          const phaseHarmonic = freqHarmonic - (timeSec * speed * 1.2 + scrollPhase * 1.15);
          const phaseLow = freqLow - (timeSec * speed * 0.55 + scrollPhase * 0.6);

          // Liquid-smooth vertical parallax derived from scroll & mouse tilt
          const mouseTiltY = (currentClientY / height - 0.5) * (isMobile ? 14 : 24);
          // On mobile: undulates smoothly across the active viewport as user scrolls instead of getting stuck
          const scrollParallaxY = isMobile 
            ? Math.sin(currentScroll * 0.0018) * 35 
            : -currentScroll * 0.032;

          const ampMain = isMobile ? 0.11 : 0.17;
          const ampHarmonic = isMobile ? 0.045 : 0.08;
          const ampLow = isMobile ? 0.030 : 0.06;
          // Natural organic viewport centering: moves freely, no longer pinned to the top
          const mobileBreathing = isMobile ? 0.04 * Math.sin(timeSec * 0.4 + currentScroll * 0.0015) : 0;
          const yCenter = isMobile ? (0.46 + mobileBreathing) : 0.48;

          const yBase = height * (yCenter + ampMain * Math.sin(phaseMain - 0.3) + ampHarmonic * Math.cos(phaseHarmonic) - ampLow * Math.sin(phaseLow)) + mouseTiltY + scrollParallaxY;

          // Airy Guilloche optical dispersion - scaled gracefully for mobile viewport
          const spread = isMobile
            ? (66 + 26 * Math.sin(freqMain * 1.4 - (timeSec * speed * 0.75 + scrollPhase * 0.8))) * (0.35 + 0.65 * (1 - Math.abs(pCentered) * 0.35))
            : (210 + 95 * Math.sin(u * Math.PI * 2.1 - (timeSec * speed * 0.75 + scrollPhase * 0.8))) * (0.35 + 0.65 * (1 - Math.abs(pCentered) * 0.35));
          const twist = Math.sin(phaseMain * 1.25 + p * Math.PI * 1.45) * (spread * (isMobile ? 0.25 : 0.36));

          // BUTTERY-SMOOTH TANGIBLE HOVER DEFLECTION & ELASTIC STRING RIPPLE
          const dx = currentClientX - x;
          const dy = currentClientY - yBase;
          const dist = Math.hypot(dx, dy);
          let hoverDeflect = 0;

          const hoverMaxDist = isMobile ? 120 : 260;
          if (dist < hoverMaxDist) {
            const hoverFactor = Math.pow(1 - dist / hoverMaxDist, 2.2);
            // Continuous magnetic push/pull perpendicular to string flow (100% smooth, zero kinks)
            const pushY = (dy / (dist + 40)) * hoverFactor * (isMobile ? 16 : 30) * (0.4 + 0.6 * coreWeight);
            // Dynamic travelling acoustic harmonic ripple radiating outward
            const ripple = Math.sin(dist * 0.045 - timeSec * 4.5) * (isMobile ? 7 : 14) * hoverFactor;
            hoverDeflect = pushY + ripple;
          }

          // Final coordinate for string i at column x
          const y = yBase + pCentered * (spread * 0.46) + twist + hoverDeflect;

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha.toFixed(3)})`;
        ctx.stroke();
      }

      // Fast proximity connecting lines between nearby particles
      const maxDist = isMobile ? 48 : 68;
      const maxDistSq = maxDist * maxDist;
      ctx.lineWidth = 0.65;

      for (let i = 0; i < particles.length; i++) {
        const pA = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pB = particles[j];
          if (pA.isUpper !== pB.isUpper) continue;

          const dx = pA.x - pB.x;
          if (Math.abs(dx) > maxDist) continue;
          const dy = pA.y - pB.y;
          if (Math.abs(dy) > maxDist) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const alpha = (1 - Math.sqrt(distSq) / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
            ctx.stroke();
          }
        }
      }

      // Update & Draw individual flowing particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(currentClientX, currentClientY, timeSec);
        particles[i].draw(ctx);
      }

      animId = requestAnimationFrame(update);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="verhost-ambient-background-system" aria-hidden="true">
      {/* =========================================================
       * SINGLE LIVING GUILLOCHE STRING WAVE CANVAS
       * Continuously streams in a loop from left to right with
       * hypnotic 3D optical illusion moire interference.
       * ========================================================= */}
      <canvas 
        ref={canvasRef} 
        className="verhost-particles-canvas"
      />

      {/* Atmospheric Ambient Soft Luminescence & Depth */}
      <div className="verhost-wave-ambient-shimmer" />

      {/* Interactive soft monochrome cursor glow */}
      <div 
        ref={cursorGlowRef} 
        className="verhost-cursor-ambient-glow"
      />
    </div>
  );
}
