import React from 'react';

export default function NexoraPreview({ isExpanded = false }) {
  return (
    <div 
      className={`nexora-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#080B0B',
        color: '#F3F0E8',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Manrope', sans-serif"
      }}
    >
      {/* Background Architectural Graphic */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 80% 40%, rgba(193, 217, 181, 0.12) 0%, transparent 60%), linear-gradient(180deg, rgba(8, 11, 11, 0.7) 0%, rgba(8, 11, 11, 0.4) 50%, rgba(8, 11, 11, 0.95) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <img
        src="/projects/nexora/assets/images/hero-bg.jpg"
        alt="NEXORA Architectural Preview"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center',
          filter: 'brightness(0.75) contrast(1.1)',
          zIndex: 0,
          transition: 'transform 0.8s ease'
        }}
      />

      {/* Top Technical Wire */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(8, 11, 11, 0.85)',
          backdropFilter: 'blur(8px)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span style={{ color: '#C1D9B5', fontWeight: 700, letterSpacing: '0.2em' }}>
          [07] N E X O R A
        </span>
        <span style={{ color: '#A5AAA5' }}>
          STRATEGY &bull; TECHNOLOGY &bull; GROWTH
        </span>
      </div>

      {/* Center Dynamic Typography Stage */}
      <div 
        style={{
          padding: '1.75rem 1.4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          position: 'relative',
          zIndex: 2
        }}
      >
        <div>
          <span 
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              color: '#A5AAA5',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem'
            }}
          >
            01 / A HIGHER PERSPECTIVE
          </span>
          <h4 
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontSize: '2rem',
              lineHeight: 1.05,
              fontWeight: 500,
              color: '#F3F0E8',
              margin: '0.2rem 0 0.5rem'
            }}
          >
            Your Growth,<br />
            <span style={{ color: '#C1D9B5', fontStyle: 'italic' }}>Our Strategy.</span>
          </h4>
          <p 
            style={{
              fontSize: '0.68rem',
              lineHeight: 1.5,
              color: 'rgba(243, 240, 232, 0.75)',
              maxWidth: '280px',
              letterSpacing: '0.04em'
            }}
          >
            Turning complexity into clarity and ideas into measurable enterprise growth.
          </p>
        </div>

        {/* Action Button & Spec */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#C1D9B5',
              color: '#080B0B',
              fontSize: '0.6rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: '2px'
            }}
          >
            Explore Website &rarr;
          </span>
          <span 
            style={{
              fontSize: '0.62rem',
              color: '#C1D9B5',
              fontWeight: 600,
              letterSpacing: '0.1em'
            }}
          >
            250+ CLIENTS &bull; 4X IMPACT
          </span>
        </div>
      </div>

      {/* Bottom Technical Indicators */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.55rem 1.1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.58rem',
          color: '#A5AAA5',
          backgroundColor: 'rgba(8, 11, 11, 0.85)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span>GLOBAL ADVISORY DESK</span>
        <span style={{ color: '#C1D9B5' }}>ZURICH &bull; LONDON &bull; NYC</span>
      </div>
    </div>
  );
}

