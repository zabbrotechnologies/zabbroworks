import React from 'react';

export default function MarcusVancePreview({ isExpanded = false }) {
  return (
    <div 
      className={`marcus-monolith-preview ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: isExpanded ? '640px' : '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: 'url(/projects/marcus-vance/assets/images/marcus-hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        color: '#F5F0E7',
        fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: isExpanded ? '2rem 2.5rem' : '1.25rem 1.5rem'
      }}
    >
      {/* Left contrast scrim for pristine typographic readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isExpanded ? '60%' : '75%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(23, 23, 21, 0.92) 0%, rgba(23, 23, 21, 0.78) 55%, rgba(23, 23, 21, 0.2) 85%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 1. Top Minimal Navigation */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid rgba(245, 240, 231, 0.15)'
        }}
      >
        <div 
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#F5F0E7'
          }}
        >
          MARCUS VANCE &mdash;
        </div>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#A79D90'
          }}
        >
          <span style={{ color: '#F5F0E7' }}>PORTFOLIO</span>
          <span>WORK</span>
          <span>ABOUT</span>
        </div>

        <a 
          href="/projects/marcus-vance/index.html#contact"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#F5F0E7',
            border: '1px solid rgba(245, 240, 231, 0.25)',
            padding: '0.35rem 0.85rem',
            textDecoration: 'none'
          }}
        >
          CONTACT &nearr;
        </a>
      </div>

      {/* 2. Monumental Hero Body */}
      <div 
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: isExpanded ? '520px' : '380px',
          margin: 'auto 0'
        }}
      >
        <div 
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: isExpanded ? '0.62rem' : '0.55rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#A79D90',
            marginBottom: isExpanded ? '0.65rem' : '0.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <span style={{ width: '5px', height: '5px', backgroundColor: '#A77D54' }} />
          / CREATIVE DEVELOPER
        </div>

        <h1 
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isExpanded ? '4.8rem' : '2.5rem',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#F5F0E7',
            margin: isExpanded ? '0 0 1rem 0' : '0 0 0.5rem 0'
          }}
        >
          <span style={{ display: 'block' }}>MARCUS</span>
          <span style={{ display: 'block' }}>VANCE</span>
        </h1>

        <p 
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: isExpanded ? '0.92rem' : '0.72rem',
            lineHeight: 1.5,
            color: '#E7DED1',
            margin: isExpanded ? '0 0 1.5rem 0' : '0 0 0.75rem 0',
            fontWeight: 350,
            maxWidth: isExpanded ? '440px' : '340px'
          }}
        >
          Designing digital experiences at the intersection of architecture, technology, and human behavior.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a 
            href="/projects/marcus-vance/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#F5F0E7',
              color: '#171715',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: isExpanded ? '0.72rem' : '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: isExpanded ? '0.65rem 1.35rem' : '0.4rem 0.85rem',
              textDecoration: 'none'
            }}
          >
            <span>VIEW PORTFOLIO</span>
            <span>&nearr;</span>
          </a>

          <a 
            href="/projects/marcus-vance/index.html#about"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'transparent',
              color: '#F5F0E7',
              border: '1px solid rgba(245, 240, 231, 0.25)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.62rem 1.25rem',
              textDecoration: 'none'
            }}
          >
            ABOUT ME
          </a>
        </div>
      </div>

      {/* 3. Bottom Information Strip */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          borderTop: '1px solid rgba(245, 240, 231, 0.15)',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#A79D90'
        }}
      >
        <span>CREATIVE DEVELOPMENT</span>
        <span>DIGITAL DESIGN</span>
        <span>INTERACTIVE EXPERIENCES</span>
      </div>
    </div>
  );
}

