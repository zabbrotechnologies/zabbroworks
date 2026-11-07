import React from 'react';

export default function DevflowPreview({ isExpanded = false }) {
  return (
    <div 
      className={`devflow-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#F8F7F4',
        color: '#101D43',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Top Floating Pill Nav Preview */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(16, 29, 67, 0.08)',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span style={{ 
          fontFamily: "'Manrope', sans-serif", 
          fontWeight: 800, 
          letterSpacing: '0.16em',
          color: '#101D43',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '2px', 
            backgroundColor: '#3157E8', 
            display: 'inline-block' 
          }}></span>
          [11] D E V F L O W
        </span>
        <span style={{ 
          color: '#795BFF', 
          fontFamily: "'JetBrains Mono', monospace", 
          fontSize: '0.58rem', 
          fontWeight: 600 
        }}>
          BENTO GRID &bull; CREATIVE TECH
        </span>
      </div>

      {/* Main Bento Mini-Stage */}
      <div 
        style={{
          padding: '1.25rem 1.15rem',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '0.85rem',
          flexGrow: 1,
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Card A Mini Hero */}
        <div 
          style={{
            backgroundColor: '#101D43',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '1.25rem 1.1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(16, 29, 67, 0.12)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.52rem',
              letterSpacing: '0.14em',
              color: '#DCD8FF',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FF873F' }}></span>
              DESIGN. DEVELOP. DELIVER.
            </span>
            <h4 style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '1.25rem',
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: '0.2rem 0 0.5rem'
            }}>
              We Turn Complex Ideas Into{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3157E8 0%, #795BFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Digital
              </span>{' '}
              Reality.
            </h4>
            <p style={{
              fontSize: '0.62rem',
              lineHeight: 1.45,
              color: 'rgba(255, 255, 255, 0.75)',
              margin: 0
            }}>
              Modern websites, intuitive digital experiences, and custom software.
            </p>
          </div>

          <div style={{ marginTop: '0.85rem', display: 'flex', gap: '0.5rem' }}>
            <span style={{
              backgroundColor: '#3157E8',
              color: '#FFFFFF',
              fontSize: '0.55rem',
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              padding: '0.35rem 0.65rem',
              borderRadius: '999px'
            }}>
              Explore Work &rarr;
            </span>
            <span style={{
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              fontSize: '0.55rem',
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              padding: '0.35rem 0.65rem',
              borderRadius: '999px'
            }}>
              Start Project
            </span>
          </div>
        </div>

        {/* Right Stack: Card B Visual & Card C Delivery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Card B Mini Layer */}
          <div style={{
            background: 'linear-gradient(145deg, #14285B 0%, #1a2f6b 100%)',
            borderRadius: '14px',
            padding: '0.85rem',
            color: '#FFFFFF',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF5F56' }}></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFBD2E' }}></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#27C93F' }}></span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', color: 'rgba(255,255,255,0.6)', marginLeft: '4px' }}>
                devflow.ts
              </span>
            </div>
            <div style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#FFFFFF',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              margin: '0.35rem 0'
            }}>
              &lt;/&gt;
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.5rem',
              letterSpacing: '0.08em',
              color: '#DCD8FF',
              textAlign: 'center'
            }}>
              MODERN ARCHITECTURE
            </span>
          </div>

          {/* Card C Mini Delivery */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '0.65rem 0.85rem',
            border: '1px solid rgba(16, 29, 67, 0.08)',
            boxShadow: '0 4px 12px rgba(16, 29, 67, 0.04)'
          }}>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 700,
              color: '#101D43',
              display: 'block'
            }}>
              Ideas Into Experiences.
            </span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.55rem',
              color: '#5C6375'
            }}>
              Built with purpose &amp; precision.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Technical Indicators */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.55rem 1.1rem',
          borderTop: '1px solid rgba(16, 29, 67, 0.08)',
          fontSize: '0.58rem',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#5C6375',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span>STATUS: AVAILABLE FOR Q2/Q3</span>
        <span style={{ color: '#3157E8', fontWeight: 600 }}>#F8F7F4 &bull; #101D43 &bull; #3157E8</span>
      </div>
    </div>
  );
}

