import React, { useState } from 'react';

export default function OffgridPreview({ isExpanded = false }) {
  const [activePalette, setActivePalette] = useState('original');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setDragOffset({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`offgrid-preview ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: isExpanded ? '640px' : '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F2EBDD',
        color: '#171717',
        fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
        border: isExpanded ? '3px solid #171717' : '1px solid #171717',
        boxShadow: isExpanded ? '8px 8px 0px #171717' : 'none'
      }}
    >
      {/* 1. Subtle Paper Texture Background Grid */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#171717 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          opacity: 0.05,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 2. Top Header Navigation Bar */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          height: isExpanded ? '56px' : '44px',
          backgroundColor: '#F2EBDD',
          borderBottom: '2px solid #171717',
          padding: isExpanded ? '0 1.5rem' : '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            fontFamily: "'Archivo Black', sans-serif", 
            fontSize: '1.25rem', 
            letterSpacing: '-0.04em',
            color: '#171717'
          }}>
            OFFGRID<sup style={{ fontSize: '0.6rem', fontFamily: 'monospace' }}>®</sup>
          </span>
          <span style={{
            backgroundColor: '#F04438',
            color: '#F2EBDD',
            fontSize: '10px',
            fontWeight: 900,
            padding: '2px 6px',
            border: '1px solid #171717'
          }}>
            +
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.72rem',
            fontWeight: 700,
            background: 'rgba(0,0,0,0.06)',
            padding: '4px 8px',
            border: '1px solid rgba(0,0,0,0.15)'
          }}>
            INDEX / 001–026
          </span>
          <a 
            href="/projects/offgrid/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              backgroundColor: '#F04438',
              color: '#FFFFFF',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '6px 14px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0px #171717',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'transform 0.1s ease'
            }}
          >
            <span>LIVE EXPERIENCE</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* 3. Main Hero Composition */}
      <div 
        style={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          padding: isExpanded ? '2.5rem 3rem' : '1rem 1.25rem',
          display: 'grid',
          gridTemplateColumns: isExpanded ? '1.25fr 1fr' : '1fr',
          gap: '2rem',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Bold Typography & Headline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              backgroundColor: '#F04438',
              color: '#FFFFFF',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '3px 8px',
              border: '1.5px solid #171717'
            }}>
              VISUAL SYSTEMS / 001
            </span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#171717'
            }}>
              EXPERIMENTAL DESIGN STUDIO
            </span>
            <span style={{
              backgroundColor: '#171717',
              color: '#F2EBDD',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '3px 8px',
              border: '1.5px solid #171717'
            }}>
              EST. 2026
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: isExpanded ? 'clamp(2.4rem, 4.8vw, 4.2rem)' : 'clamp(1.8rem, 3.5vw, 2.6rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            margin: '0 0 1.25rem 0',
            color: '#171717'
          }}>
            <div>DESIGN</div>
            <div style={{ margin: '0.15em 0' }}>
              <span style={{
                backgroundColor: '#E9F044',
                color: '#171717',
                padding: '0 0.2em 0.05em',
                border: '2.5px solid #171717',
                boxShadow: '5px 5px 0px #171717',
                display: 'inline-block',
                transform: 'rotate(-1.5deg)'
              }}>
                WITHOUT
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
              <span>PERMISSION</span>
              <span style={{ color: '#F04438' }}>.</span>
              <span style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: isExpanded ? '1.4rem' : '1.1rem',
                fontStyle: 'italic',
                fontWeight: 400,
                textTransform: 'none',
                letterSpacing: 0,
                color: '#171717',
                marginLeft: '6px',
                textDecoration: 'underline #F04438 2px',
                textUnderlineOffset: '3px'
              }}>
                unregulated form
              </span>
            </div>
          </h2>

          <p style={{
            fontSize: isExpanded ? '1.05rem' : '0.9rem',
            lineHeight: 1.45,
            maxWidth: '520px',
            color: 'rgba(23, 23, 23, 0.85)',
            marginBottom: '1.5rem',
            fontWeight: 500
          }}>
            Independent graphic design studio &amp; interactive visual playground. Neo-Brutalism × Swiss Design × Physical Print Collage.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href="/projects/offgrid/index.html#works"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                backgroundColor: '#171717',
                color: '#F2EBDD',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                padding: '10px 20px',
                border: '2px solid #171717',
                boxShadow: '3px 3px 0px #171717',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>EXPLORE ARCHIVE</span>
              <span>↗</span>
            </a>

            <a 
              href="/projects/offgrid/index.html#playground"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                backgroundColor: '#F2EBDD',
                color: '#171717',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                padding: '10px 20px',
                border: '2px solid #171717',
                boxShadow: '3px 3px 0px #171717',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>ENTER PLAYGROUND</span>
              <span>+</span>
            </a>
          </div>
        </div>

        {/* Right Column: Physical Print Collage / Interactive Table */}
        <div 
          style={{
            position: 'relative',
            height: isExpanded ? '340px' : '260px',
            border: '2.5px solid #171717',
            backgroundColor: '#FAF8F5',
            boxShadow: '6px 6px 0px #171717',
            overflow: 'hidden',
            display: isExpanded ? 'block' : 'none'
          }}
        >
          {/* Grid lines inside table */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            pointerEvents: 'none'
          }} />

          {/* Draggable Object 1: Giant Letter O */}
          <div 
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              position: 'absolute',
              top: `${30 + dragOffset.y}px`,
              left: `${40 + dragOffset.x}px`,
              width: '90px',
              height: '90px',
              backgroundColor: '#171717',
              color: '#F2EBDD',
              border: '2.5px solid #171717',
              boxShadow: '4px 4px 0px rgba(23, 23, 23, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              zIndex: 15
            }}
          >
            <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '4.5rem', lineHeight: 1 }}>O</span>
            <span style={{ position: 'absolute', top: '3px', right: '5px', fontSize: '9px', opacity: 0.5 }}>✥</span>
          </div>

          {/* Object 2: Signal Red Banner */}
          <div style={{
            position: 'absolute',
            top: '140px',
            left: '100px',
            backgroundColor: '#F04438',
            color: '#FFFFFF',
            padding: '8px 16px',
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: '0.75rem',
            border: '2px solid #171717',
            boxShadow: '4px 4px 0px #171717',
            transform: 'rotate(-5deg)',
            zIndex: 12
          }}>
            PRINT MATTERS • POST-DIGITAL
          </div>

          {/* Object 3: Cobalt Disc */}
          <div style={{
            position: 'absolute',
            top: '25px',
            right: '40px',
            width: '95px',
            height: '95px',
            borderRadius: '50%',
            backgroundColor: '#2547D0',
            color: '#F2EBDD',
            border: '2px solid #171717',
            boxShadow: '4px 4px 0px #171717',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '0.95rem',
            letterSpacing: '0.05em',
            zIndex: 11
          }}>
            CHAOS
          </div>

          {/* Object 4: Acid Yellow Note Slip */}
          <div style={{
            position: 'absolute',
            bottom: '25px',
            right: '30px',
            backgroundColor: '#E9F044',
            color: '#171717',
            padding: '10px 14px',
            width: '160px',
            border: '2px solid #171717',
            boxShadow: '4px 4px 0px #171717',
            transform: 'rotate(6deg)',
            zIndex: 13
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', fontWeight: 700, marginBottom: '2px' }}>
              // SPEC. 08
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.78rem', lineHeight: 1.2 }}>
              “A grid is a framework to destroy.”
            </div>
          </div>

          {/* Status Label on Table */}
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '12px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            fontWeight: 700,
            color: 'rgba(23, 23, 23, 0.6)'
          }}>
            PHYSICAL DESIGN TABLE // DRAGGABLE
          </div>
        </div>
      </div>

      {/* 4. Bottom Specs Footer Bar */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#171717',
          color: '#F2EBDD',
          padding: '8px 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.68rem',
          fontWeight: 700,
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#12B76A', display: 'inline-block' }} />
          <span>NEO-BRUTALISM × SWISS POSTER LAB // ACTIVE</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ color: '#E9F044' }}>PAPER: #F2EBDD</span>
          <span style={{ color: '#F04438' }}>RED: #F04438</span>
          <span style={{ color: '#4C6EF5' }}>COBALT: #2547D0</span>
        </div>
      </div>
    </div>
  );
}

