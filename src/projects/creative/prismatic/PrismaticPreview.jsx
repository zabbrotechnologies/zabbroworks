import React, { useState, useEffect, useRef } from 'react';

export default function PrismaticPreview({ isExpanded = false }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`prismatic-preview ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: isExpanded ? '640px' : '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#11120F',
        color: '#F2F0E8',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundImage: `
          radial-gradient(circle at 75% 45%, rgba(84, 217, 197, 0.12) 0%, rgba(214, 255, 53, 0.05) 25%, transparent 60%),
          radial-gradient(circle at 25% 75%, rgba(255, 90, 54, 0.08) 0%, transparent 50%),
          #11120F
        `
      }}
    >
      {/* 1. Subtle Radial Pattern & Grain */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(#FFF 1px, transparent 0)',
          backgroundSize: '24px 24px',
          opacity: 0.04,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 2. Central 3D Optical Glass Prism Visual Representation */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: isExpanded ? '12%' : '6%',
          transform: `translate(50%, -50%) rotateX(${mousePos.y * 15}deg) rotateY(${mousePos.x * 20}deg)`,
          width: isExpanded ? '380px' : '260px',
          height: isExpanded ? '380px' : '260px',
          zIndex: 2,
          pointerEvents: 'none',
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Iridescent Refraction Halo */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            transform: 'translate(-50%, -50%)',
            background: 'conic-gradient(from 180deg, #D6FF35 0deg, #54D9C5 120deg, #FF5A36 240deg, #D6FF35 360deg)',
            filter: 'blur(50px)',
            opacity: 0.55,
            borderRadius: '50%'
          }}
        />

        {/* Faceted Optical Prism SVG */}
        <svg 
          viewBox="0 0 200 200" 
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
          }}
        >
          {/* Crystalline facets with refractive chromatic fills */}
          <polygon points="100,20 170,75 100,105 30,75" fill="rgba(84, 217, 197, 0.4)" stroke="#54D9C5" strokeWidth="1.2"/>
          <polygon points="30,75 100,105 100,185 30,125" fill="rgba(214, 255, 53, 0.25)" stroke="#D6FF35" strokeWidth="1.2"/>
          <polygon points="170,75 100,105 100,185 170,125" fill="rgba(255, 90, 54, 0.35)" stroke="#FF5A36" strokeWidth="1.2"/>
          <polygon points="100,20 170,75 170,125 100,185 30,125 30,75" fill="none" stroke="rgba(242, 240, 232, 0.6)" strokeWidth="1.5"/>

          {/* Inner Optical Core */}
          <polygon points="100,60 135,100 100,140 65,100" fill="rgba(214, 255, 53, 0.75)" stroke="#D6FF35" strokeWidth="1.5"/>
          <circle cx="100" cy="100" r="8" fill="#FF5A36"/>
        </svg>

        {/* Specular Glint */}
        <div 
          style={{
            position: 'absolute',
            top: '25%',
            left: '30%',
            width: '12px',
            height: '12px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            boxShadow: '0 0 20px #FFFFFF, 0 0 40px #D6FF35'
          }}
        />
      </div>

      {/* 3. Top Navigation */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isExpanded ? '1.5rem 3rem' : '1.1rem 1.6rem',
          borderBottom: '1px solid rgba(119, 123, 118, 0.18)',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <svg style={{ width: '20px', height: '20px', color: '#F2F0E8' }} viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,20 2,20" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="14" r="3" fill="#D6FF35"/>
          </svg>
          <span 
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: isExpanded ? '1.05rem' : '0.88rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F2F0E8'
            }}
          >
            PRISMATIC<span style={{ color: '#D6FF35' }}>.</span>
          </span>
        </div>

        {/* Links (Expanded) */}
        {isExpanded && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#F2F0E8', borderBottom: '2px solid #D6FF35', paddingBottom: '2px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Manifesto</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#777B76', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Experiments</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#777B76', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Chromatic Lab</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#777B76', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Selected Works</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#777B76', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Studio</span>
          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#D6FF35',
              color: '#11120F',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: isExpanded ? '0.72rem' : '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              padding: isExpanded ? '0.55rem 1.15rem' : '0.4rem 0.85rem',
              borderRadius: '4px',
              boxShadow: '0 0 16px rgba(214, 255, 53, 0.35)'
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: '#11120F', borderRadius: '50%' }} />
            <span>DISPATCH</span>
            <span style={{ fontSize: '0.8rem' }}>↗</span>
          </div>
        </div>
      </div>

      {/* 4. Main Hero Typography Block */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          padding: isExpanded ? '0 3.5rem' : '0 1.6rem',
          maxWidth: '860px'
        }}
      >
        {/* Eyebrow Tag */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: isExpanded ? '0.72rem' : '0.62rem',
            letterSpacing: '0.12em',
            color: '#777B76',
            marginBottom: isExpanded ? '1rem' : '0.5rem'
          }}
        >
          <span style={{ width: '7px', height: '7px', backgroundColor: '#D6FF35', borderRadius: '50%', boxShadow: '0 0 8px #D6FF35' }} />
          <span>INDEPENDENT DIGITAL ART LAB / EST. 2026</span>
        </div>

        {/* Oversized Headline */}
        <div 
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isExpanded ? 'clamp(3.2rem, 6.2vw, 5.8rem)' : '2.4rem',
            fontWeight: 700,
            lineHeight: 0.94,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#F2F0E8',
            marginBottom: isExpanded ? '1.5rem' : '0.85rem'
          }}
        >
          <div>WE CREATE</div>
          <div>
            WHAT <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', textTransform: 'lowercase', fontWeight: 400, color: '#F2F0E8' }}>doesn't</span>
          </div>
          <div>
            <span style={{ color: '#D6FF35', textShadow: '0 0 24px rgba(214, 255, 53, 0.35)' }}>EXIST</span>
            <span style={{ color: '#FF5A36' }}>.</span>
          </div>
        </div>

        {/* Subtitle / Description */}
        <p 
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isExpanded ? '1.05rem' : '0.82rem',
            lineHeight: 1.5,
            color: '#F2F0E8',
            maxWidth: '540px',
            marginBottom: isExpanded ? '2rem' : '1.25rem'
          }}
        >
          We transform imagination into interactive digital experiences through experimental visuals, generative systems and unconventional creative technology.
        </p>

        {/* CTA Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              backgroundColor: '#D6FF35',
              color: '#11120F',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: isExpanded ? '0.85rem' : '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: isExpanded ? '0.85rem 1.6rem' : '0.6rem 1.15rem',
              borderRadius: '4px',
              boxShadow: '0 8px 24px rgba(214, 255, 53, 0.3)'
            }}
          >
            <span>EXPLORE THE LAB</span>
            <span>↗</span>
          </div>

          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: isExpanded ? '0.85rem' : '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#F2F0E8',
              border: '1px solid #777B76',
              padding: isExpanded ? '0.85rem 1.5rem' : '0.6rem 1rem',
              borderRadius: '4px'
            }}
          >
            <span>DISCOVER OUR WORK</span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Technical Stats Row */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isExpanded ? '1.5rem 3.5rem' : '1rem 1.6rem',
          borderTop: '1px solid rgba(119, 123, 118, 0.15)',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: isExpanded ? '0.72rem' : '0.62rem'
        }}
      >
        <div style={{ display: 'flex', gap: isExpanded ? '3rem' : '1.5rem' }}>
          <div>
            <span style={{ color: '#F2F0E8', fontWeight: 600, display: 'block' }}>001—026</span>
            <span style={{ color: '#777B76', fontSize: '0.6rem' }}>DIGITAL EXPERIMENTS</span>
          </div>
          <div>
            <span style={{ color: '#D6FF35', fontWeight: 600, display: 'block' }}>ACTIVE</span>
            <span style={{ color: '#777B76', fontSize: '0.6rem' }}>CREATIVE SYSTEMS</span>
          </div>
          {isExpanded && (
            <div>
              <span style={{ color: '#54D9C5', fontWeight: 600, display: 'block' }}>3D / MOTION</span>
              <span style={{ color: '#777B76', fontSize: '0.6rem' }}>INTERACTION CORE</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#777B76' }}>
          <span style={{ width: '24px', height: '2px', backgroundColor: '#4B4F4A', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, width: '8px', height: '100%', backgroundColor: '#D6FF35' }} />
          </span>
          <span>SCROLL TO INTERACT</span>
        </div>
      </div>
    </div>
  );
}

