import React, { useState } from 'react';

export default function Museum01Preview({ isExpanded = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`museum01-preview ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: isExpanded ? '640px' : '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F1F0EC',
        color: '#080808',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
        border: '1px solid #D9D8D2'
      }}
    >
      {/* 1. Subtle Architectural Grid Background Lines */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(8, 8, 8, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(8, 8, 8, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 2. Top Header Navigation Bar */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          height: isExpanded ? '60px' : '44px',
          backgroundColor: 'rgba(241, 240, 236, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #D9D8D2',
          padding: isExpanded ? '0 2rem' : '0 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            fontFamily: "'Bodoni Moda', serif", 
            fontSize: isExpanded ? '1.25rem' : '1rem', 
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: '#080808',
            lineHeight: 1
          }}>
            MUSEUM 01
          </span>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: isExpanded ? '0.55rem' : '0.48rem',
            letterSpacing: '0.12em',
            color: '#A6A39C',
            marginTop: '2px'
          }}>
            DIGITAL ART INSTITUTION
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ 
            display: isExpanded ? 'flex' : 'none', 
            alignItems: 'center', 
            gap: '1.5rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.06em'
          }}>
            <span style={{ color: '#B69A69' }}>01 / EXHIBITIONS</span>
            <span style={{ color: '#080808' }}>02 / COLLECTION</span>
            <span style={{ color: '#080808' }}>03 / ARTISTS</span>
          </div>

          <a 
            href="/projects/museum01/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              backgroundColor: '#080808',
              color: '#F1F0EC',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: isExpanded ? '0.75rem' : '0.65rem',
              letterSpacing: '0.04em',
              padding: isExpanded ? '8px 16px' : '5px 12px',
              border: '1px solid #080808',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s ease'
            }}
          >
            <span>ENTER GALLERY</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* 3. Main Hero / Exhibition Presentation Composition */}
      <div 
        style={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          padding: isExpanded ? '3rem 3.5rem' : '1.25rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: isExpanded ? '1.2fr 1fr' : '1fr',
          gap: isExpanded ? '3rem' : '1.5rem',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Architectural Editorial Statement */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: isExpanded ? '1.25rem' : '0.5rem' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#B69A69', display: 'inline-block' }} />
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: isExpanded ? '0.7rem' : '0.58rem',
              letterSpacing: '0.1em',
              color: '#080808',
              fontWeight: 500
            }}>
              M01 / DIGITAL ART INSTITUTION &bull; GENÈVE
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: isExpanded ? 'clamp(2.4rem, 4.5vw, 4.4rem)' : '1.85rem',
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
            margin: isExpanded ? '0 0 1.25rem 0' : '0 0 0.5rem 0',
            color: '#080808',
            fontWeight: 400
          }}>
            <div>A SPACE FOR</div>
            <div>THE <em style={{ fontStyle: 'italic', color: '#B69A69' }}>UNSEEN</em>.</div>
          </h1>

          <p style={{
            fontSize: isExpanded ? '1.1rem' : '0.74rem',
            lineHeight: 1.45,
            maxWidth: '540px',
            color: 'rgba(8, 8, 8, 0.8)',
            marginBottom: isExpanded ? '2rem' : '0.75rem',
            fontWeight: 400
          }}>
            An independent digital museum exploring the boundaries of contemporary art, technology and visual culture.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href="/projects/museum01/index.html#exhibition"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                backgroundColor: '#080808',
                color: '#F1F0EC',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: isExpanded ? '0.82rem' : '0.68rem',
                letterSpacing: '0.04em',
                padding: isExpanded ? '10px 20px' : '6px 14px',
                border: '1px solid #080808',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>CURRENT EXHIBITION</span>
              <span>↗</span>
            </a>

            {isExpanded && (
              <a 
                href="/projects/museum01/index.html#collection"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                  color: '#080808',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  padding: '10px 20px',
                  border: '1px solid #D9D8D2',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>THE COLLECTION</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Featured Installation Frame */}
        <div 
          style={{
            position: 'relative',
            display: isExpanded ? 'block' : 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #D9D8D2',
            padding: '1rem',
            boxShadow: isHovered ? '0 16px 40px rgba(8, 8, 8, 0.08)' : '0 8px 24px rgba(8, 8, 8, 0.03)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '320px',
              overflow: 'hidden',
              backgroundColor: '#E5E3DC'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85" 
                alt="Beyond the Visible — Elena Rostova"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(8, 8, 8, 0.85)',
                color: '#F1F0EC',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.65rem',
                padding: '6px 12px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                EXH. 001 // NOW SHOWING
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: '0.85rem'
            }}>
              <div>
                <span style={{ 
                  fontFamily: "'Bodoni Moda', serif", 
                  fontSize: '1.15rem', 
                  fontWeight: 500,
                  display: 'block',
                  color: '#080808'
                }}>
                  Beyond the Visible
                </span>
                <span style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: '0.78rem', 
                  color: '#A6A39C' 
                }}>
                  Elena Rostova, 2026
                </span>
              </div>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.68rem',
                color: '#B69A69'
              }}>
                GALLERY A ↗
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Specs Footer Bar */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#080808',
          color: '#F1F0EC',
          padding: '10px 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.68rem',
          letterSpacing: '0.06em',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B69A69', display: 'inline-block' }} />
          <span>CURRENT EXHIBITION // BEYOND THE VISIBLE &bull; ON VIEW THROUGH FEB 2027</span>
        </div>
        <div style={{ display: 'flex', gap: '14px', color: '#A6A39C' }}>
          <span>FREE DIGITAL ADMISSION</span>
          <span>46.2044° N, 6.1432° E &bull; GENEVA</span>
        </div>
      </div>
    </div>
  );
}

