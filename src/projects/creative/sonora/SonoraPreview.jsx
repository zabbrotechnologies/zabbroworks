import React, { useState, useEffect, useRef } from 'react';

export default function SonoraPreview({ isExpanded = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWave, setActiveWave] = useState('sine');
  const [frequency, setFrequency] = useState(124);
  const canvasRef = useRef(null);

  // Frequency wave animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resize();

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Subtle Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Draw Wave
      ctx.shadowBlur = isPlaying ? 22 : 12;
      ctx.shadowColor = '#FF6B35';
      ctx.strokeStyle = '#FF6B35';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      for (let x = 0; x < w; x += 2) {
        const norm = (x / w) * (frequency / 20) + phase;
        let yNorm = Math.sin(norm);
        if (activeWave === 'square') yNorm = Math.sin(norm) >= 0 ? 0.75 : -0.75;
        if (activeWave === 'triangle') yNorm = (2 / Math.PI) * Math.asin(Math.sin(norm));

        const y = (h / 2) + yNorm * (h * 0.32);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Shimmer Layer
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(197, 244, 103, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x += 4) {
        const norm = (x / w) * (frequency / 20) + phase;
        let yNorm = Math.sin(norm * 1.05);
        const y = (h / 2) + yNorm * (h * 0.28);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isPlaying ? 0.07 : 0.025;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, activeWave, frequency]);

  return (
    <div
      className={`sonora-preview ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: isExpanded ? '640px' : '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0B0C10',
        color: '#F1F1ED',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
        border: '1px solid rgba(241, 241, 237, 0.1)'
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 65% 25%, rgba(255, 107, 53, 0.12) 0%, transparent 60%), radial-gradient(circle at 20% 75%, rgba(101, 84, 164, 0.15) 0%, transparent 55%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* 1. Header Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '56px',
          backgroundColor: 'rgba(11, 12, 16, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(241, 241, 237, 0.08)',
          padding: '0 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#F1F1ED'
            }}
          >
            SONORA<span style={{ color: '#FF6B35', fontSize: '0.75rem' }}>®</span>
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.55rem',
              letterSpacing: '0.15em',
              color: '#777B85'
            }}
          >
            AUDIO-VISUAL SYSTEM
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(197, 244, 103, 0.08)',
              border: '1px solid rgba(197, 244, 103, 0.25)',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#C5F467',
                boxShadow: '0 0 6px #C5F467'
              }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.62rem',
                color: '#C5F467',
                letterSpacing: '0.08em',
                fontWeight: 600
              }}
            >
              44.1 kHz
            </span>
          </div>

          <a
            href="/projects/sonora/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              backgroundColor: '#FF6B35',
              color: '#0B0C10',
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700,
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              padding: '0.45rem 0.95rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 14px rgba(255, 107, 53, 0.35)',
              transition: 'transform 0.2s ease'
            }}
          >
            LAUNCH SITE ↗
          </a>
        </div>
      </div>

      {/* 2. Hero Interactive Stage */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'grid',
          gridTemplateColumns: isExpanded ? '1.4fr 1fr' : '1fr',
          padding: '1.75rem',
          gap: '1.5rem',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Monolithic Headline & Interactive Wave Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                color: '#FF6B35',
                display: 'block',
                marginBottom: '0.4rem',
                fontWeight: 600
              }}
            >
              FREQUENCY 001 // EXPERIMENTAL SOUND
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: isExpanded ? '3.2rem' : '2.2rem',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                margin: 0
              }}
            >
              FEEL THE <br />
              <span style={{ color: '#FF6B35' }}>FREQUENCY.</span>
            </h2>
          </div>

          {/* Canvas Waveform Viewport */}
          <div
            style={{
              position: 'relative',
              height: isExpanded ? '180px' : '130px',
              backgroundColor: '#111318',
              borderRadius: '8px',
              border: '1px solid rgba(241, 241, 237, 0.08)',
              overflow: 'hidden'
            }}
          >
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '10px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.58rem',
                color: '#777B85',
                display: 'flex',
                gap: '8px'
              }}
            >
              <span>{frequency} Hz</span>
              <span style={{ color: '#C5F467' }}>{activeWave.toUpperCase()}</span>
            </div>
          </div>

          {/* Interactive Lab Controls */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                backgroundColor: isPlaying ? '#C5F467' : '#FF6B35',
                color: '#0B0C10',
                border: 'none',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '0.45rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {isPlaying ? 'AUDIO LIVE ❚❚' : 'PLAY TONE ▶'}
            </button>

            {['sine', 'square', 'triangle'].map((wave) => (
              <button
                key={wave}
                onClick={() => setActiveWave(wave)}
                style={{
                  backgroundColor: activeWave === wave ? '#252836' : 'transparent',
                  color: activeWave === wave ? '#FF6B35' : '#777B85',
                  border: '1px solid rgba(241, 241, 237, 0.1)',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.62rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {wave.toUpperCase()}
              </button>
            ))}

            <input
              type="range"
              min="40"
              max="360"
              value={frequency}
              onChange={(e) => setFrequency(parseInt(e.target.value, 10))}
              style={{
                accentColor: '#FF6B35',
                width: '90px',
                cursor: 'pointer'
              }}
              title="Modulate Frequency"
            />
          </div>
        </div>

        {/* Right Column: Featured Release Snippet (shown when expanded) */}
        {isExpanded && (
          <div
            style={{
              backgroundColor: '#14161E',
              border: '1px solid rgba(241, 241, 237, 0.08)',
              borderRadius: '10px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=85"
                alt="AFTER HOURS artwork"
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '6px',
                  objectFit: 'cover',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.58rem',
                    color: '#C5F467',
                    letterSpacing: '0.1em'
                  }}
                >
                  FEATURED LP // 001
                </span>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#F1F1ED'
                  }}
                >
                  AFTER HOURS
                </span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.78rem',
                    color: '#FF6B35'
                  }}
                >
                  SONORA SELECTS
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                borderTop: '1px solid rgba(241, 241, 237, 0.06)',
                paddingTop: '0.75rem',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.6rem',
                color: '#777B85'
              }}
            >
              <div>BPM: <strong style={{ color: '#F1F1ED' }}>124</strong></div>
              <div>KEY: <strong style={{ color: '#F1F1ED' }}>F#m</strong></div>
              <div>RES: <strong style={{ color: '#F1F1ED' }}>24/96</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Footer Strip */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '42px',
          backgroundColor: '#090A0D',
          borderTop: '1px solid rgba(241, 241, 237, 0.08)',
          padding: '0 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.62rem',
          color: '#777B85'
        }}
      >
        <span>BERLIN &bull; TOKYO &bull; LONDON</span>
        <span style={{ color: '#F1F1ED', fontWeight: 600 }}>SONORA AUDIO-VISUAL RECORDINGS</span>
      </div>
    </div>
  );
}

