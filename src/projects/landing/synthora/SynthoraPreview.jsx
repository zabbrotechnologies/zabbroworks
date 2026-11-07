import React from 'react';

export default function SynthoraPreview({ isExpanded = false }) {
  return (
    <div 
      className={`synthora-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#07040D',
        color: '#F4F3FF',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Space Grotesk', sans-serif"
      }}
    >
      {/* Background Cyberpunk Artwork (Image 01) */}
      <img
        src="/projects/synthora/assets/images/hero-cyberpunk.jpg"
        alt="SYNTHORA Cyberpunk Sculpture Hero Artwork"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '78% center',
          filter: 'brightness(0.9) contrast(1.15)',
          zIndex: 0,
          transition: 'transform 0.8s ease'
        }}
      />

      {/* Cyberpunk Gradient Overlays */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(90deg, rgba(7, 4, 13, 0.95) 0%, rgba(7, 4, 13, 0.75) 45%, rgba(7, 4, 13, 0.2) 75%, rgba(7, 4, 13, 0.6) 100%), linear-gradient(180deg, rgba(7, 4, 13, 0.6) 0%, transparent 40%, rgba(7, 4, 13, 0.95) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Top Futuristic Wire Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.1rem',
          borderBottom: '1px solid rgba(255, 22, 213, 0.25)',
          backgroundColor: 'rgba(7, 4, 13, 0.82)',
          backdropFilter: 'blur(12px)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          fontWeight: 800, 
          letterSpacing: '0.2em',
          color: '#F4F3FF',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <span style={{ color: '#FF16D5' }}>&#10022;</span> [10] S Y N T H O R A
        </span>
        <span style={{ color: '#12D9FF', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', fontWeight: 600 }}>
          Y2K CYBERPUNK &bull; DIGITAL STUDIO
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
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#12D9FF',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem'
            }}
          >
            [ DIGITAL EXPERIENCE STUDIO ]
          </span>
          <h4 
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.95rem',
              lineHeight: 1.05,
              fontWeight: 900,
              color: '#F4F3FF',
              margin: '0.2rem 0 0.5rem',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase'
            }}
          >
            FUTURE-READY<br />
            DIGITAL{' '}
            <span style={{ 
              color: '#FF16D5',
              textShadow: '0 0 20px rgba(255, 22, 213, 0.8)',
              display: 'inline-block'
            }}>
              EXPERIENCES
            </span>
          </h4>
          <p 
            style={{
              fontSize: '0.68rem',
              lineHeight: 1.5,
              color: 'rgba(168, 160, 188, 0.9)',
              maxWidth: '300px',
              letterSpacing: '0.01em'
            }}
          >
            We design, build and scale next-gen digital products that merge creativity, technology and culture.
          </p>
        </div>

        {/* Action Button & Spec */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#FF16D5',
              color: '#07040D',
              fontSize: '0.62rem',
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 800,
              padding: '0.4rem 0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '999px',
              boxShadow: '0 0 16px rgba(255, 22, 213, 0.65)'
            }}
          >
            EXPLORE WORK &nearr;
          </span>
          <span 
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.6rem',
              color: '#12D9FF',
              fontWeight: 700,
              letterSpacing: '0.08em'
            }}
          >
            120+ DELIVERED &bull; 98% CSAT
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
          borderTop: '1px solid rgba(255, 22, 213, 0.2)',
          fontSize: '0.58rem',
          fontFamily: "'Share Tech Mono', monospace",
          color: '#A8A0BC',
          backgroundColor: 'rgba(7, 4, 13, 0.88)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span>FEATURED: NEXUS AI</span>
        <span style={{ color: '#FF16D5' }}>#07040D &bull; #FF16D5 &bull; #12D9FF</span>
      </div>
    </div>
  );
}

