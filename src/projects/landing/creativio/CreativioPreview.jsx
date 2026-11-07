import React from 'react';

export default function CreativioPreview({ isExpanded = false }) {
  return (
    <div 
      className={`creativio-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#070F33',
        color: '#F7FAFF',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background Dimensional Glass Ribbon Stage */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 75% 40%, rgba(40, 72, 232, 0.3) 0%, rgba(29, 46, 187, 0.15) 50%, transparent 75%), linear-gradient(180deg, rgba(7, 15, 51, 0.65) 0%, rgba(7, 15, 51, 0.35) 45%, rgba(7, 15, 51, 0.95) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <img
        src="/projects/creativio/assets/images/hero-glass-background.jpg"
        alt="CREATIVIO Glassmorphic Hero Stage Preview"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center',
          filter: 'brightness(0.9) contrast(1.1)',
          zIndex: 0,
          transition: 'transform 0.8s ease'
        }}
      />

      {/* Top Glassmorphic Wire */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.14)',
          backgroundColor: 'rgba(7, 15, 51, 0.8)',
          backdropFilter: 'blur(12px)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span style={{ 
          fontFamily: "'Plus Jakarta Sans', sans-serif", 
          fontWeight: 800, 
          letterSpacing: '0.2em',
          color: '#F7FAFF'
        }}>
          [09] C R E A T I V I O
        </span>
        <span style={{ color: '#ADD2FA', fontFamily: "'Manrope', sans-serif", fontSize: '0.58rem', fontWeight: 600 }}>
          GLASSMORPHISM &bull; DIGITAL STUDIO
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
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.56rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#ADD2FA',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem'
            }}
          >
            CREATIVE DIGITAL STUDIO
          </span>
          <h4 
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1.95rem',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#F7FAFF',
              margin: '0.2rem 0 0.5rem',
              letterSpacing: '-0.03em'
            }}
          >
            Designing Digital<br />
            Experiences That{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #7895F8 0%, #ADD2FA 60%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Convert.
            </span>
          </h4>
          <p 
            style={{
              fontSize: '0.68rem',
              lineHeight: 1.5,
              color: 'rgba(220, 229, 245, 0.85)',
              maxWidth: '310px',
              letterSpacing: '0.01em'
            }}
          >
            Tactile glassmorphic surfaces, dimensional blue light, and high-performing creative engineering.
          </p>
        </div>

        {/* Action Button & Spec */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #ADD2FA 100%)',
              color: '#0B1748',
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '0.4rem 0.85rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: '999px',
              boxShadow: '0 4px 16px rgba(173, 210, 250, 0.45)'
            }}
          >
            Explore Website &rarr;
          </span>
          <span 
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.6rem',
              color: '#ADD2FA',
              fontWeight: 700,
              letterSpacing: '0.08em'
            }}
          >
            120+ PROJECTS &bull; 98% CSAT
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
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.58rem',
          fontFamily: "'Manrope', sans-serif",
          color: '#8BA6D8',
          backgroundColor: 'rgba(7, 15, 51, 0.85)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span>FEATURED: NOVA SAAS</span>
        <span style={{ color: '#ADD2FA' }}>#0B1748 &bull; #2848E8</span>
      </div>
    </div>
  );
}

