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
  const bgParallaxRef = useRef(null);
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

    let prevBgX = -999;
    let prevBgY = -999;
    let prevPX = -999;
    let prevPY = -999;

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

      // Spring-like easing
      currentNormX += (targetNormX - currentNormX) * 0.045;
      currentNormY += (targetNormY - currentNormY) * 0.045;
      currentClientX += (targetClientX - currentClientX) * 0.05;
      currentClientY += (targetClientY - currentClientY) * 0.05;
      currentScroll += (targetScroll - currentScroll) * 0.05;

      // 1. Layer 1-3 Parallax Stage (only update style if moved > 0.08px)
      if (bgParallaxRef.current) {
        const bgX = currentNormX * 5.2;
        const bgY = currentNormY * 4.0 + currentScroll * -0.014;
        if (Math.abs(bgX - prevBgX) > 0.05 || Math.abs(bgY - prevBgY) > 0.05) {
          bgParallaxRef.current.style.transform = `translate3d(${bgX.toFixed(1)}px, ${bgY.toFixed(1)}px, 0)`;
          prevBgX = bgX;
          prevBgY = bgY;
        }
      }

      // 2. Layer 4: Particle Mesh Canvas Parallax
      if (canvas) {
        const pX = currentNormX * 9.8;
        const pY = currentNormY * 7.6 + currentScroll * -0.026;
        if (Math.abs(pX - prevPX) > 0.05 || Math.abs(pY - prevPY) > 0.05) {
          canvas.style.transform = `translate3d(${pX.toFixed(1)}px, ${pY.toFixed(1)}px, 0)`;
          prevPX = pX;
          prevPY = pY;
        }
      }

      // 3. Layer 5: Interactive Cursor Glow
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${Math.round(currentClientX)}px, ${Math.round(currentClientY)}px, 0)`;
      }

      // 4. Clear canvas and render elegant ambient floating particles
      ctx.clearRect(0, 0, width, height);

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
       * PARALLAX STAGE: Smoothly responds to mouse & scroll
       * Single unified guilloche wireframe wave background layer
       * ========================================================= */}
      <div ref={bgParallaxRef} className="verhost-bg-parallax-stage">
        {/* Single Wave Layer: Guilloche wireframe wave with organic drift */}
        <div className="verhost-bg-image-layer verhost-wave-drift-base" />

        {/* Atmospheric Ambient Wave Luminescence & Soft Glow */}
        <div className="verhost-wave-ambient-shimmer" />
      </div>

      {/* =========================================================
       * LAYER 4: LIVING FLOWING PARTICLE MESH CANVAS
       * Streams continuously along the wave trajectories with
       * organic wave oscillation and delicate interconnecting networks.
       * ========================================================= */}
      <canvas 
        ref={canvasRef} 
        className="verhost-particles-canvas"
      />

      {/* =========================================================
       * LAYER 5: INTERACTIVE SOFT CURSOR GLOW
       * Restrained, non-blinding emerald light perturbation.
       * ========================================================= */}
      <div 
        ref={cursorGlowRef} 
        className="verhost-cursor-ambient-glow"
      />
    </div>
  );
}
