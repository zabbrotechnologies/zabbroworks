import React from 'react';

export default function NordicTimberPreview({ isExpanded = false }) {
  return (
    <div 
      className={`nordic-timber-preview ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: isExpanded ? '640px' : '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F4EBDD',
        color: '#1C2920',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Hero Background Architectural Image (IMAGE 1) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/projects/nordic-timber/assets/images/nordic-hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />

      {/* 2. Left Cream Scrim Mask */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #F4EBDD 0%, #F4EBDD 35%, rgba(244, 235, 221, 0.94) 45%, rgba(244, 235, 221, 0.65) 58%, rgba(244, 235, 221, 0.15) 75%, transparent 90%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* 3. Subtle Topographic Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'repeating-radial-gradient(ellipse at 15% 30%, rgba(16, 37, 29, 0.03) 0, rgba(16, 37, 29, 0.03) 1px, transparent 1px, transparent 28px)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* 4. Left Vertical Coordinates (Trondheim) */}
      {isExpanded && (
        <div 
          style={{
            position: 'absolute',
            top: '22%',
            left: '1.75rem',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            color: '#1C2920',
            opacity: 0.8
          }}
        >
          <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>+</span>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', whiteSpace: 'nowrap' }}>
            63.4305° N &nbsp;|&nbsp; 10.3951° E
          </span>
          <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>+</span>
        </div>
      )}

      {/* 5. Right Vertical Section Navigation */}
      {isExpanded && (
        <div 
          style={{
            position: 'absolute',
            top: '22%',
            right: '2rem',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            fontFamily: "'Manrope', sans-serif"
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#FFFFFF', fontWeight: 600, fontSize: '0.72rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            <span style={{ width: '3px', height: '14px', backgroundColor: '#FFFFFF', borderRadius: '2px', boxShadow: '0 0 6px rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", opacity: 0.85 }}>01</span>
            <span>Research</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            <span style={{ width: '3px', height: '14px', backgroundColor: 'transparent' }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>02</span>
            <span>Projects</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            <span style={{ width: '3px', height: '14px', backgroundColor: 'transparent' }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>03</span>
            <span>Insights</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            <span style={{ width: '3px', height: '14px', backgroundColor: 'transparent' }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>04</span>
            <span>About</span>
          </div>
        </div>
      )}

      {/* 6. Top Navigation Bar */}
      <div 
        style={{
          position: 'relative',
          zIndex: 30,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isExpanded ? '1.6rem 3.5rem' : '0.7rem 1.35rem',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '0.85rem' : '0.55rem', color: '#10251D' }}>
          <svg style={{ width: isExpanded ? '26px' : '20px', height: isExpanded ? '30px' : '22px', flexShrink: 0 }} viewBox="0 0 24 28" fill="none">
            <path d="M12 2L3 11M12 2L21 11M12 2V26M12 9L5 16M12 9L19 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: isExpanded ? '0.82rem' : '0.68rem', fontWeight: 700, letterSpacing: '0.14em', lineHeight: 1.15, textTransform: 'uppercase' }}>
            NORDIC<br/><span style={{ fontWeight: 600 }}>TIMBER<sup style={{ fontSize: '0.6em', marginLeft: '1px' }}>®</sup></span>
          </div>
        </div>

        {/* Center Links (Visible in both Compact & Expanded) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '2.5rem' : '1rem' }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: isExpanded ? '0.85rem' : '0.7rem', fontWeight: 600, color: '#1C2920', borderBottom: '2px solid #1C2920', paddingBottom: '2px' }}>Home</span>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: isExpanded ? '0.85rem' : '0.7rem', fontWeight: 500, color: '#1C2920', opacity: 0.85 }}>Projects</span>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: isExpanded ? '0.85rem' : '0.7rem', fontWeight: 500, color: '#1C2920', opacity: 0.85 }}>Research</span>
          {isExpanded && (
            <>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: '#1C2920', opacity: 0.85 }}>Journal</span>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: '#1C2920', opacity: 0.85 }}>About</span>
            </>
          )}
        </div>

        {/* Right CTA + Hamburger (Crisp Off-White over Dark Timber Roof) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '1.25rem' : '0.75rem' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: "'Manrope', sans-serif",
              fontSize: isExpanded ? '0.82rem' : '0.68rem',
              fontWeight: 500,
              color: '#F4EBDD',
              border: '1px solid rgba(244, 235, 221, 0.45)',
              padding: isExpanded ? '0.55rem 1.25rem' : '0.35rem 0.75rem',
              borderRadius: '5px',
              backgroundColor: 'rgba(16, 37, 29, 0.25)',
              backdropFilter: 'blur(4px)',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Get in Touch</span>
            <span style={{ fontSize: isExpanded ? '0.85rem' : '0.7rem' }}>↗</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: isExpanded ? '6px' : '4px', width: isExpanded ? '26px' : '18px', cursor: 'pointer' }}>
            <span style={{ width: '100%', height: '2px', backgroundColor: '#F4EBDD', borderRadius: '1px' }} />
            <span style={{ width: '100%', height: '2px', backgroundColor: '#F4EBDD', borderRadius: '1px' }} />
          </div>
        </div>
      </div>

      {/* 7. Hero Editorial Content (Image 2 Left Block) */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          padding: isExpanded ? '0 3rem 0 5.5rem' : '0 1.25rem 0 1.5rem',
          maxWidth: isExpanded ? '820px' : '650px'
        }}
      >
        {/* Eyebrow */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: isExpanded ? '0.72rem' : '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: '#1C2920',
            marginBottom: isExpanded ? '0.85rem' : '0.25rem'
          }}
        >
          <span style={{ color: '#98663D', fontWeight: 600 }}>/</span>
          <span>TIMBER RESEARCH STUDIO</span>
        </div>

        {/* 3-Line Headline */}
        <div 
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: isExpanded ? 'clamp(2.8rem, 4.8vw, 4.8rem)' : '1.75rem',
            lineHeight: 0.98,
            fontWeight: 400,
            color: '#1C2920',
            marginBottom: isExpanded ? '1.5rem' : '0.45rem'
          }}
        >
          <div>Timber</div>
          <div style={{ fontStyle: 'italic', color: '#98663D' }}>Heritage</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span>Survey</span>
            <span style={{ opacity: 0.6, fontWeight: 300 }}>—</span>
            <span 
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isExpanded ? '0.85rem' : '0.68rem',
                lineHeight: 1.3,
                color: '#3B4B42',
                maxWidth: isExpanded ? '240px' : '210px'
              }}
            >
              Structural blueprints and geographic vernacular mapping.
            </span>
          </div>
        </div>

        {/* Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '1.25rem' : '0.85rem' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#162E24',
              color: '#F4EBDD',
              fontFamily: "'Manrope', sans-serif",
              fontSize: isExpanded ? '0.82rem' : '0.68rem',
              fontWeight: 500,
              padding: isExpanded ? '0.7rem 1.35rem' : '0.42rem 0.85rem',
              borderRadius: '4px 12px 4px 4px',
              boxShadow: '0 4px 14px rgba(16, 37, 29, 0.25)'
            }}
          >
            <span>Explore Research</span>
            <span style={{ fontSize: '0.8rem' }}>↗</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#1C2920' }}>
            <span 
              style={{
                width: isExpanded ? '32px' : '22px',
                height: isExpanded ? '32px' : '22px',
                borderRadius: '50%',
                border: '1.5px solid #1C2920',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg style={{ width: isExpanded ? '10px' : '8px', height: isExpanded ? '10px' : '8px', marginLeft: '1px' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 001.52.85l11-6.86a1 1 0 000-1.7l-11-6.86A1 1 0 008 5.14z"/>
              </svg>
            </span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: isExpanded ? '0.82rem' : '0.68rem', fontWeight: 500 }}>
              Watch Overview
            </span>
          </div>
        </div>
      </div>

      {/* 8. Organic Curved Forest-Green Lower Section with Featured Card */}
      <div 
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          backgroundColor: '#10251D',
          color: '#F4EBDD',
          marginTop: isExpanded ? '2rem' : '0.25rem'
        }}
      >
        {/* Organic Wave Divider SVG */}
        <div 
          style={{
            position: 'absolute',
            top: isExpanded ? '-55px' : '-36px',
            left: 0,
            width: '100%',
            height: isExpanded ? '56px' : '37px',
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
        >
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0,100 C220,100 380,60 640,65 C840,70 1020,110 1440,80 L1440,140 L0,140 Z" fill="#10251D"/>
            <path d="M0,88 C220,88 380,48 640,53 C840,58 1020,98 1440,68" stroke="rgba(244,235,221,0.18)" strokeWidth="1.2" strokeDasharray="3 4"/>
          </svg>
        </div>

        {/* Content Container */}
        <div 
          style={{
            padding: isExpanded ? '0.5rem 3rem 1.25rem 5.5rem' : '0.2rem 1.25rem 0.55rem 1.25rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: isExpanded ? '1.5rem' : '1rem',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Areas of Study */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: isExpanded ? '0.62rem' : '0.55rem', letterSpacing: '0.12em', color: '#A8B8AF' }}>
              // AREAS OF STUDY
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '1.75rem' : '0.85rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <svg style={{ width: isExpanded ? '22px' : '17px', height: isExpanded ? '22px' : '17px' }} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <ellipse cx="10" cy="18" rx="5" ry="5"/>
                  <circle cx="10" cy="18" r="1.5" fill="currentColor"/>
                  <path d="M10 13h18c2.5 0 4.5 2.2 4.5 5s-2 5-4.5 5H10"/>
                  <ellipse cx="28" cy="18" rx="3.5" ry="5"/>
                </svg>
                <span style={{ fontSize: isExpanded ? '0.66rem' : '0.58rem', textAlign: 'center', lineHeight: 1.15, color: '#F4EBDD' }}>
                  Vernacular<br/>Mapping
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <svg style={{ width: isExpanded ? '22px' : '17px', height: isExpanded ? '22px' : '17px' }} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 30L18 8l14 22H4z"/>
                  <path d="M18 8v22"/>
                  <path d="M11 19h14"/>
                </svg>
                <span style={{ fontSize: isExpanded ? '0.66rem' : '0.58rem', textAlign: 'center', lineHeight: 1.15, color: '#F4EBDD' }}>
                  Timber<br/>Structures
                </span>
              </div>

              {isExpanded && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 4L8 14h5l-6 8h6l-7 9h24l-7-9h6l-6-8h5L18 4z"/>
                    </svg>
                    <span style={{ fontSize: '0.66rem', textAlign: 'center', lineHeight: 1.2, color: '#F4EBDD' }}>
                      Material<br/>Behavior
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 28c5-4 12-4 18 0s8 2 8 0"/>
                      <path d="M6 22c6-5 14-5 20 0s5 1 5-1"/>
                      <path d="M8 16c6-4 11-4 16 0s3 0 4-2"/>
                    </svg>
                    <span style={{ fontSize: '0.66rem', textAlign: 'center', lineHeight: 1.2, color: '#F4EBDD' }}>
                      Regional<br/>Typologies
                    </span>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Featured Research Card */}
          <div 
            style={{
              position: 'relative',
              width: isExpanded ? '440px' : '265px',
              marginTop: isExpanded ? '-75px' : '-44px',
              flexShrink: 0,
              zIndex: 25
            }}
          >
            {/* Layer 2 Background Forest Card */}
            {isExpanded && (
              <div 
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '-10px',
                  width: '210px',
                  height: '160px',
                  backgroundColor: '#F4EBDD',
                  border: '1px solid rgba(28, 41, 32, 0.15)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transform: 'rotate(2deg)',
                  zIndex: 2,
                  boxShadow: '0 12px 28px rgba(0,0,0,0.3)'
                }}
              >
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/projects/nordic-timber/assets/images/nordic-reference.jpg)',
                    backgroundPosition: '89% 82%',
                    backgroundSize: '680%'
                  }}
                />
              </div>
            )}

            {/* Front Card */}
            <div 
              style={{
                position: 'relative',
                zIndex: 5,
                backgroundColor: '#F8F3EA',
                borderRadius: isExpanded ? '10px 22px 10px 10px' : '8px 16px 8px 8px',
                border: '1px solid rgba(28, 41, 32, 0.12)',
                boxShadow: '0 14px 32px -6px rgba(0, 0, 0, 0.45)',
                display: 'flex',
                overflow: 'hidden'
              }}
            >
              {/* Card Left Info */}
              <div 
                style={{
                  flex: 1.2,
                  padding: isExpanded ? '1.25rem 1rem 1rem 1.25rem' : '0.65rem 0.6rem 0.55rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: isExpanded ? '0.58rem' : '0.5rem', fontWeight: 600, letterSpacing: '0.12em', color: '#98663D' }}>
                    FEATURED RESEARCH
                  </span>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isExpanded ? '1.35rem' : '0.92rem', fontWeight: 600, lineHeight: 1.1, color: '#1C2920', margin: isExpanded ? '0.25rem 0' : '0.15rem 0' }}>
                    Nordic Timber Forms
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isExpanded ? '0.74rem' : '0.58rem', lineHeight: 1.3, color: '#3B4B42' }}>
                    A study on regional timber construction and its modern relevance.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.35rem', borderTop: '1px solid rgba(28, 41, 32, 0.1)', marginTop: '0.35rem' }}>
                  <span style={{ width: '16px', height: '1.5px', backgroundColor: '#98663D' }} />
                  <span 
                    style={{
                      width: isExpanded ? '24px' : '18px',
                      height: isExpanded ? '24px' : '18px',
                      backgroundColor: '#10251D',
                      color: '#F4EBDD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '3px',
                      fontSize: isExpanded ? '0.72rem' : '0.6rem'
                    }}
                  >
                    ↗
                  </span>
                </div>
              </div>

              {/* Card Right Timber Joinery Photo (Exact Crop from Image 2) */}
              <div 
                style={{
                  flex: 1.3,
                  position: 'relative',
                  minHeight: isExpanded ? '160px' : '95px',
                  backgroundColor: '#E5DACB',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/projects/nordic-timber/assets/images/nordic-reference.jpg)',
                    backgroundPosition: '74% 82%',
                    backgroundSize: isExpanded ? '460%' : '440%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

