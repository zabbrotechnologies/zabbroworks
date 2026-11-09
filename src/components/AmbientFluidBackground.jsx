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

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 14 : 26;

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
      // Open, airy lines with clean spacing, avoiding harsh grid mesh/fishnet clumping
      const lineCount = isMobile ? 22 : 36;
      const steps = isMobile ? 90 : 180;
      const speed = 0.42; // Hypnotic, elegant continuous left-to-right flow speed

      for (let i = 0; i < lineCount; i++) {
        const p = i / (lineCount - 1);
        const pCentered = (p - 0.5) * 2; // -1 to 1

        // Core line luminous gradient (subtle glow along center strings, sheer tapering edges)
        const coreWeight = Math.exp(-pCentered * pCentered * 2.4);
        const lineAlpha = 0.09 + 0.44 * coreWeight;
        ctx.lineWidth = 0.70 + 0.55 * coreWeight;

        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          const x = u * width;

          // Progressive wave phase: continuous left-to-right flow + dynamic scroll forward/backward motion
          const phaseMain = u * Math.PI * 1.9 - (timeSec * speed + scrollPhase);
          const phaseHarmonic = u * Math.PI * 3.6 - (timeSec * speed * 1.2 + scrollPhase * 1.15);
          const phaseLow = u * Math.PI * 0.95 - (timeSec * speed * 0.55 + scrollPhase * 0.6);

          // Liquid-smooth vertical parallax derived from scroll & mouse tilt
          const mouseTiltY = (currentClientY / height - 0.5) * 24;
          const scrollParallaxY = -currentScroll * 0.032;
          const yBase = height * (0.48 + 0.17 * Math.sin(phaseMain - 0.3) + 0.08 * Math.cos(phaseHarmonic) - 0.06 * Math.sin(phaseLow)) + mouseTiltY + scrollParallaxY;

          // Airy Guilloche optical dispersion - wide, breathing fan without harsh pinching
          const spread = (210 + 95 * Math.sin(u * Math.PI * 2.1 - (timeSec * speed * 0.75 + scrollPhase * 0.8))) * (0.35 + 0.65 * (1 - Math.abs(pCentered) * 0.35));
          const twist = Math.sin(phaseMain * 1.25 + p * Math.PI * 1.45) * (spread * 0.36);

          // BUTTERY-SMOOTH TANGIBLE HOVER DEFLECTION & ELASTIC STRING RIPPLE
          const dx = currentClientX - x;
          const dy = currentClientY - yBase;
          const dist = Math.hypot(dx, dy);
          let hoverDeflect = 0;

          if (dist < 260) {
            const hoverFactor = Math.pow(1 - dist / 260, 2.2);
            // Continuous magnetic push/pull perpendicular to string flow (100% smooth, zero kinks)
            const pushY = (dy / (dist + 50)) * hoverFactor * 30 * (0.4 + 0.6 * coreWeight);
            // Dynamic travelling acoustic harmonic ripple radiating outward
            const ripple = Math.sin(dist * 0.045 - timeSec * 4.5) * 14 * hoverFactor;
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
