import React from 'react';

export default function SpacenPreview({ isExpanded = false }) {
  return (
    <div 
      className={`spacen-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#F3EFE9',
        color: '#101B32',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Top Skeuomorphic Pod Wire */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.1rem',
          backgroundColor: '#FAF8F5',
          borderBottom: '1px solid rgba(191, 195, 201, 0.7)',
          boxShadow: 'inset 0 1px 0 #FFFFFF, 0 2px 8px rgba(16, 27, 50, 0.05)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontWeight: 800, 
          letterSpacing: '0.18em',
          color: '#101B32',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem'
        }}>
          {/* Miniature Planetary Icon */}
          <span style={{
            position: 'relative',
            width: '14px',
            height: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #FF8A32, #101B32)',
              display: 'inline-block'
            }}></span>
            <span style={{
              position: 'absolute',
              width: '14px',
              height: '5px',
              border: '1.2px solid #F36B21',
              borderRadius: '50%',
              transform: 'rotate(-25deg)'
            }}></span>
          </span>
          [12] S P A C E N
        </span>
        <span style={{ 
          color: '#F36B21', 
          fontFamily: "'IBM Plex Mono', monospace", 
          fontSize: '0.58rem', 
          fontWeight: 600 
        }}>
          SKEUOMORPHIC 3D CAROUSEL
        </span>
      </div>

      {/* Center 3D Curved Perspective Stage Preview */}
      <div 
        style={{
          padding: '1.4rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          position: 'relative',
          perspective: '800px',
          zIndex: 1
        }}
      >
        <div>
          <h4 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.65rem',
            lineHeight: 1.12,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#101B32',
            margin: '0.2rem 0 0.4rem'
          }}>
            Explore Beyond{' '}
            <span style={{ color: '#F36B21' }}>
              Earth.
            </span>
          </h4>
          <p style={{
            fontSize: '0.66rem',
            lineHeight: 1.45,
            color: '#858A94',
            maxWidth: '310px',
            margin: 0
          }}>
            Tactile aerospace console with curved 3D mission cards and deep planetary discovery archives.
          </p>
        </div>

        {/* 3D Curved Cards Mini-Track Representation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          margin: '0.85rem 0',
          position: 'relative',
          height: '100px'
        }}>
          {/* Left Card */}
          <div style={{
            width: '64px',
            height: '84px',
            borderRadius: '10px',
            backgroundColor: '#182B4A',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            transform: 'rotateY(25deg) scale(0.85)',
            opacity: 0.65,
            overflow: 'hidden',
            boxShadow: '0 6px 16px rgba(16, 27, 50, 0.15)'
          }}>
            <img src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=200&auto=format&fit=crop" alt="Mars Mini" style={{ width: '100%', height: '55%', objectFit: 'cover' }} />
            <div style={{ padding: '0.25rem', color: '#FFF', fontSize: '0.42rem', fontFamily: "'IBM Plex Mono', monospace" }}>MARS // 02</div>
          </div>

          {/* Center Prominent Card */}
          <div style={{
            width: '84px',
            height: '102px',
            borderRadius: '12px',
            backgroundColor: '#101B32',
            border: '1.5px solid #F36B21',
            transform: 'rotateY(0deg) scale(1.0)',
            opacity: 1,
            zIndex: 3,
            overflow: 'hidden',
            boxShadow: '0 12px 28px rgba(16, 27, 50, 0.28)'
          }}>
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop" alt="Astronaut Mini" style={{ width: '100%', height: '55%', objectFit: 'cover' }} />
            <div style={{ padding: '0.3rem', color: '#FFF' }}>
              <div style={{ fontSize: '0.45rem', color: '#F36B21', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>HUMAN MISSIONS</div>
              <div style={{ fontSize: '0.52rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Beyond Earth</div>
            </div>
          </div>

          {/* Right Card */}
          <div style={{
            width: '64px',
            height: '84px',
            borderRadius: '10px',
            backgroundColor: '#182B4A',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            transform: 'rotateY(-25deg) scale(0.85)',
            opacity: 0.65,
            overflow: 'hidden',
            boxShadow: '0 6px 16px rgba(16, 27, 50, 0.15)'
          }}>
            <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=200&auto=format&fit=crop" alt="Nebula Mini" style={{ width: '100%', height: '55%', objectFit: 'cover' }} />
            <div style={{ padding: '0.25rem', color: '#FFF', fontSize: '0.42rem', fontFamily: "'IBM Plex Mono', monospace" }}>DEEP // 05</div>
          </div>
        </div>

        {/* Action Button & Spec */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(180deg, #FF8A32 0%, #F36B21 100%)',
              color: '#FFFFFF',
              fontSize: '0.62rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              padding: '0.45rem 0.95rem',
              borderRadius: '999px',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 14px rgba(243, 107, 33, 0.35)'
            }}
          >
            Explore Missions &rarr;
          </span>
          <span 
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.6rem',
              color: '#101B32',
              fontWeight: 700,
              letterSpacing: '0.06em'
            }}
          >
            5 MISSIONS &bull; 8 WORLDS
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.55rem 1.1rem',
          borderTop: '1px solid rgba(191, 195, 201, 0.7)',
          fontSize: '0.58rem',
          fontFamily: "'IBM Plex Mono', monospace",
          color: '#858A94',
          backgroundColor: '#FAF8F5',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span>SYS: 408.2 KM // 27,600 KM/H</span>
        <span style={{ color: '#F36B21', fontWeight: 700 }}>#F3EFE9 &bull; #101B32 &bull; #F36B21</span>
      </div>
    </div>
  );
}

