import React from 'react';

export default function SolvixPreview({ isExpanded = false }) {
  return (
    <div 
      className={`solvix-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#070A19',
        color: '#F7F8FF',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background Architectural & Radiant Gradient Stage */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 75% 35%, rgba(135, 59, 255, 0.28) 0%, rgba(40, 91, 255, 0.15) 40%, transparent 70%), linear-gradient(180deg, rgba(7, 10, 25, 0.6) 0%, rgba(7, 10, 25, 0.3) 45%, rgba(7, 10, 25, 0.95) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <img
        src="/projects/solvix/assets/images/hero-bg.jpg"
        alt="SOLVIX Vivid Gradients Stage Preview"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right 20%',
          filter: 'brightness(0.85) contrast(1.15) saturate(1.2)',
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
          borderBottom: '1px solid rgba(247, 248, 255, 0.12)',
          backgroundColor: 'rgba(7, 10, 25, 0.85)',
          backdropFilter: 'blur(10px)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontWeight: 700, 
          letterSpacing: '0.22em',
          background: 'linear-gradient(90deg, #F7F8FF, #285BFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          [08] S O L V I X
        </span>
        <span style={{ color: '#A8A9C5', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.56rem' }}>
          CREATIVE TECH &bull; VIVID GRADIENTS
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
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              color: '#A8A9C5',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem'
            }}
          >
            DIGITAL SOLUTIONS FOR A BOLDER TOMORROW
          </span>
          <h4 
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2.1rem',
              lineHeight: 1.02,
              fontWeight: 700,
              color: '#F7F8FF',
              margin: '0.2rem 0 0.5rem',
              letterSpacing: '-0.03em'
            }}
          >
            Ideas<br />
            into{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #285BFF 0%, #873BFF 40%, #F02DAD 75%, #FF853D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Impact.
            </span>
          </h4>
          <p 
            style={{
              fontSize: '0.68rem',
              lineHeight: 1.5,
              color: 'rgba(247, 248, 255, 0.8)',
              maxWidth: '300px',
              letterSpacing: '0.02em'
            }}
          >
            We design and build digital experiences that help ambitious brands grow, connect and make a lasting impact.
          </p>
        </div>

        {/* Action Button & Spec */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #285BFF 0%, #873BFF 100%)',
              color: '#F7F8FF',
              fontSize: '0.62rem',
              fontWeight: 600,
              padding: '0.4rem 0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '999px',
              boxShadow: '0 4px 18px rgba(40, 91, 255, 0.45)'
            }}
          >
            Explore Website &rarr;
          </span>
          <span 
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6rem',
              color: '#A8A9C5',
              fontWeight: 500,
              letterSpacing: '0.08em'
            }}
          >
            120+ BRANDS &bull; 4X IMPACT
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
          borderTop: '1px solid rgba(247, 248, 255, 0.1)',
          fontSize: '0.58rem',
          fontFamily: "'IBM Plex Mono', monospace",
          color: '#A8A9C5',
          backgroundColor: 'rgba(7, 10, 25, 0.9)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span>FEATURED: HORIZON PLATFORM</span>
        <span style={{ color: '#F02DAD' }}>#070A19 &bull; #285BFF</span>
      </div>
    </div>
  );
}

