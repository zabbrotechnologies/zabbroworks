import React, { useState } from 'react';

export default function ArchoraPreview({ isExpanded = false }) {
  const [activeThumb, setActiveThumb] = useState(0);

  const thumbnails = [
    { id: 0, title: 'The Cloister Corridor — Kyoto', img: '/projects/archora/assets/images/archora-corridor.png' },
    { id: 1, title: 'Olive & Stone Sanctuary — Deià', img: '/projects/archora/assets/images/archora-tree.png' },
    { id: 2, title: 'Pavilion of Light — Basel', img: '/projects/archora/assets/images/archora-curve.png' }
  ];

  return (
    <div 
      className={`archora-editorial-preview ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: isExpanded ? '640px' : '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: 'url(/projects/archora/assets/images/archora-hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        color: '#202020',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: isExpanded ? '1.75rem 2.5rem' : '1.25rem 1.5rem'
      }}
    >
      {/* Subtle left-side legibility scrim */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isExpanded ? '46%' : '52%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(248, 244, 238, 0.94) 0%, rgba(248, 244, 238, 0.8) 50%, rgba(248, 244, 238, 0.2) 80%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 1. Top Navigation Layer */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid rgba(32, 32, 32, 0.12)'
        }}
      >
        <div 
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#202020',
            fontWeight: 500
          }}
        >
          PORTFOLIO &mdash;
        </div>

        <div 
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#202020',
            fontWeight: 600
          }}
        >
          SELECTED WORKS
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span 
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              color: '#202020',
              fontWeight: 500
            }}
          >
            02 / 06
          </span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <span 
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '1px solid rgba(32, 32, 32, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem'
              }}
            >
              &larr;
            </span>
            <span 
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#202020',
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem'
              }}
            >
              &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Left Editorial Column */}
      <div 
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: isExpanded ? '440px' : '360px',
          margin: 'auto 0'
        }}
      >
        <div 
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8B8176',
            marginBottom: '0.45rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#B8764E' }} />
          / FEATURED PROJECT
        </div>

        <h1 
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isExpanded ? '3.2rem' : '2.3rem',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 0.85rem 0'
          }}
        >
          <span style={{ display: 'block', color: '#202020' }}>Archora™</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: '#B8764E', fontStyle: 'italic', fontWeight: 400 }}>Studio</span>
            <span style={{ flex: 1, height: '1px', backgroundColor: '#B8764E', maxWidth: '80px', opacity: 0.6 }} />
          </span>
        </h1>

        <p 
          style={{
            fontSize: isExpanded ? '0.88rem' : '0.76rem',
            lineHeight: 1.6,
            color: '#4A4641',
            margin: '0 0 1rem 0',
            fontWeight: 350,
            maxWidth: '380px'
          }}
        >
          An architectural studio experience showcasing thoughtful spaces, material exploration, and visionary design through an immersive digital presentation.
        </p>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {['Architecture', 'Interior Design', 'Spatial Design'].map(cat => (
            <span 
              key={cat}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.58rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(243, 236, 227, 0.85)',
                border: '1px solid #D9C5AF',
                color: '#202020',
                fontWeight: 500
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a 
            href="/projects/archora/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#202020',
              color: '#F8F4EE',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              padding: '0.6rem 1.2rem',
              borderRadius: '4px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(32, 32, 32, 0.2)'
            }}
          >
            <span>View Live Project</span>
            <span>&nearr;</span>
          </a>

          <a 
            href="/projects/archora/index.html#overview"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'transparent',
              color: '#202020',
              border: '1px solid #202020',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              padding: '0.58rem 1.15rem',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Explore Case Study
          </a>
        </div>
      </div>

      {/* 3. Bottom Bar: Thumbnail Strip */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        {thumbnails.map((t, idx) => (
          <div 
            key={t.id}
            onClick={(e) => {
              e.stopPropagation();
              setActiveThumb(idx);
            }}
            style={{
              width: isExpanded ? '54px' : '44px',
              height: isExpanded ? '40px' : '32px',
              borderRadius: '3px',
              overflow: 'hidden',
              border: activeThumb === idx ? '1.5px solid #B8764E' : '1px solid rgba(32, 32, 32, 0.15)',
              cursor: 'pointer',
              backgroundColor: '#D9C5AF',
              boxShadow: activeThumb === idx ? '0 2px 8px rgba(184, 118, 78, 0.35)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <img 
              src={t.img} 
              alt={t.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        ))}
        <span 
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(32, 32, 32, 0.15)',
            backgroundColor: 'rgba(248, 244, 238, 0.85)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.72rem',
            color: '#202020'
          }}
        >
          &rarr;
        </span>
      </div>
    </div>
  );
}
