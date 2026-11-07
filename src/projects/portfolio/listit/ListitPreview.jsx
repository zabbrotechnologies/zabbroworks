import React, { useState } from 'react';

export default function ListitPreview({ isExpanded = false }) {
  const [aotEp, setAotEp] = useState(21);
  const totalAot = 28;
  const aotPct = Math.round((aotEp / totalAot) * 100);
  const [inList, setInList] = useState(true);

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (aotEp < totalAot) {
      setAotEp(prev => prev + 1);
    }
  };

  const handleToggleList = (e) => {
    e.stopPropagation();
    setInList(prev => !prev);
  };

  return (
    <div 
      className={`listit-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#0E0B1A',
        color: '#F8F8F8',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      {/* Ambient Space Atmosphere */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-8%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 75% 30%, rgba(216, 180, 254, 0.85) 0%, rgba(147, 51, 234, 0.5) 40%, rgba(14, 11, 26, 0) 75%)',
          filter: 'blur(1px)',
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />

      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '40%',
          width: '350px',
          height: '180px',
          background: 'radial-gradient(ellipse at center, rgba(196, 255, 77, 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />

      {/* Wireframe dome lower right */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '1.5px solid rgba(196, 255, 77, 0.25)',
          background: 'radial-gradient(circle at 40% 40%, rgba(124, 58, 237, 0.25) 0%, rgba(14, 11, 26, 0) 75%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Top Header Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.4rem',
          backgroundColor: 'rgba(14, 11, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.65rem',
          letterSpacing: '0.14em',
          position: 'relative',
          zIndex: 10
        }}
      >
        <span style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontWeight: 700, 
          letterSpacing: '0.2em',
          color: '#FFFFFF'
        }}>
          PORTFOLIO <span style={{ color: '#B388FF' }}>—</span>
        </span>

        <span style={{ 
          fontFamily: "'JetBrains Mono', monospace", 
          fontSize: '0.65rem',
          letterSpacing: '0.22em', 
          color: '#A39BB5',
          textTransform: 'uppercase'
        }}>
          SELECTED WORKS
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#FFFFFF', fontSize: '0.65rem' }}>
            01 / 06
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <span style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF'
            }}>
              ‹
            </span>
            <span style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#C4FF4D',
              color: '#0E0B1A',
              fontWeight: 800,
              boxShadow: '0 0 10px rgba(196, 255, 77, 0.5)'
            }}>
              ›
            </span>
          </div>
        </div>
      </div>

      {/* Main Stage Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: isExpanded ? '300px 1fr 100px' : '260px 1fr',
          gap: '1.25rem',
          padding: '1.25rem 1.5rem',
          flex: 1,
          alignItems: 'center',
          position: 'relative',
          zIndex: 5
        }}
      >
        {/* Left Editorial Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem', 
            fontWeight: 700, 
            color: '#C4FF4D',
            letterSpacing: '0.15em'
          }}>
            <span>/</span> FEATURED PROJECT
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isExpanded ? '2.4rem' : '1.75rem',
            fontWeight: 800,
            lineHeight: 1.05,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            LISTIT<span style={{ fontSize: '0.8rem', verticalAlign: 'super', color: '#B388FF' }}>®</span><br />
            ARCHIVE<span style={{ color: '#C4FF4D' }}>/</span>
          </h2>

          <p style={{
            fontSize: '0.75rem',
            lineHeight: 1.5,
            color: '#A39BB5',
            margin: 0,
            maxWidth: '280px'
          }}>
            A high-velocity anime tracking and discovery archive. Built with zero API friction, seasonal radars, and real-time watchlist synchronization.
          </p>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['UI/UX', 'Product Design', 'Web App'].map((tag) => (
              <span 
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.58rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ECE6FF'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.6rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', display: 'block', lineHeight: 1 }}>
                +42%
              </span>
              <span style={{ fontSize: '0.55rem', color: '#A39BB5' }}>User Engagement</span>
            </div>
            <div style={{ width: '1px', height: '26px', background: 'rgba(255, 255, 255, 0.1)' }} />
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', display: 'block', lineHeight: 1 }}>
                3.8x
              </span>
              <span style={{ fontSize: '0.55rem', color: '#A39BB5' }}>Faster Discovery</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
            <a 
              href="/projects/listit/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '999px',
                background: '#C4FF4D',
                color: '#0E0B1A',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: '0 4px 18px rgba(196, 255, 77, 0.45)',
                textDecoration: 'none'
              }}
            >
              <span>View Case Study</span>
              <span>↗</span>
            </a>

            <a
              href="https://trackwithlistit.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                textDecoration: 'none'
              }}
              title="Open Live App"
            >
              ▶
            </a>
          </div>
        </div>

        {/* Center 3D Smartphone Stage */}
        <div 
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: isExpanded ? '460px' : '360px',
            perspective: '1000px'
          }}
        >
          {/* Orbital ribbon background arc */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '110%',
              height: '240px',
              transform: 'translate(-50%, -50%) rotate(-12deg)',
              pointerEvents: 'none',
              zIndex: 2
            }}
          >
            <svg viewBox="0 0 1000 480" fill="none" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
              <path d="M 50 260 C 140 90, 860 90, 950 260" stroke="#B388FF" strokeWidth="2.5" strokeOpacity="0.6" strokeLinecap="round" />
              <path d="M 50 260 C 140 90, 860 90, 950 260" stroke="rgba(179, 136, 255, 0.15)" strokeWidth="12" strokeLinecap="round" />
            </svg>
          </div>

          {/* Left Phone: Discovery */}
          <div 
            style={{
              width: isExpanded ? '180px' : '150px',
              height: isExpanded ? '360px' : '300px',
              borderRadius: '26px',
              padding: '6px',
              background: 'linear-gradient(145deg, #E6DCFF 0%, #A886F8 30%, #5B21B6 70%, #2E1F47 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              transform: 'perspective(1000px) rotateY(16deg) rotateX(4deg) scale(0.92) translateX(20px)',
              position: 'relative',
              zIndex: 3,
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              background: 'linear-gradient(180deg, #16102E 0%, #0E0B1A 100%)',
              padding: '16px 8px 8px',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '0.55rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#C4FF4D', fontWeight: 800 }}>⚡ TRENDING</span>
                <span style={{ color: '#A39BB5' }}>LST</span>
              </div>
              <div style={{
                borderRadius: '10px',
                height: '100px',
                background: 'linear-gradient(180deg, #7C3AED 0%, #16102E 100%)',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                marginBottom: '6px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ fontSize: '0.48rem', color: '#C4FF4D', fontWeight: 700 }}>#01 TRENDING</span>
                <strong style={{ fontSize: '0.62rem', color: '#FFFFFF' }}>Frieren</strong>
                <span style={{ fontSize: '0.5rem', color: '#ECE6FF' }}>★ 9.38 • 28 Eps</span>
              </div>
              <div style={{
                padding: '4px 6px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '4px'
              }}>
                <span>02 Jujutsu Kaisen</span>
                <span style={{ color: '#C4FF4D' }}>★ 8.9</span>
              </div>
              <div style={{
                padding: '4px 6px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>03 Demon Slayer</span>
                <span style={{ color: '#C4FF4D' }}>★ 8.7</span>
              </div>
            </div>
          </div>

          {/* Center Phone: Interactive Watchlist */}
          <div 
            style={{
              width: isExpanded ? '210px' : '180px',
              height: isExpanded ? '410px' : '350px',
              borderRadius: '30px',
              padding: '7px',
              background: 'linear-gradient(145deg, #E6DCFF 0%, #A886F8 30%, #5B21B6 70%, #2E1F47 100%)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.7), 0 0 35px rgba(124, 58, 237, 0.5), 0 0 15px rgba(196, 255, 77, 0.3)',
              transform: 'perspective(1000px) scale(1.05) translateZ(40px)',
              position: 'relative',
              zIndex: 6,
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              background: 'linear-gradient(180deg, #1C1438 0%, #0E0B1A 100%)',
              padding: '18px 10px 10px',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '0.6rem'
            }}>
              {/* Status Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.1em' }}>
                  <span style={{ color: '#C4FF4D' }}>///</span> LISTIT
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.5rem',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  background: 'rgba(196, 255, 77, 0.2)',
                  color: '#C4FF4D'
                }}>
                  ACTIVE
                </span>
              </div>

              {/* Watch Card: Attack on Titan */}
              <div style={{
                borderRadius: '12px',
                background: 'rgba(35, 26, 66, 0.75)',
                border: '1px solid rgba(179, 136, 255, 0.3)',
                padding: '8px',
                marginBottom: '8px'
              }}>
                <div style={{
                  height: '75px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #3B0764 100%)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  marginBottom: '6px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    fontSize: '0.48rem',
                    padding: '0.1rem 0.35rem',
                    background: '#C4FF4D',
                    color: '#0E0B1A',
                    fontWeight: 800,
                    borderRadius: '3px'
                  }}>
                    IN PROGRESS
                  </span>
                  <strong style={{ fontSize: '0.72rem', color: '#FFFFFF' }}>Attack on Titan</strong>
                  <span style={{ fontSize: '0.52rem', color: '#ECE6FF' }}>The Final Season</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', marginBottom: '4px' }}>
                  <span style={{ color: '#A39BB5' }}>Ep <strong>{aotEp}</strong> of {totalAot}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#C4FF4D', fontWeight: 700 }}>{aotPct}%</span>
                </div>

                <div style={{ width: '100%', height: '5px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{ width: `${aotPct}%`, height: '100%', background: 'linear-gradient(90deg, #7C3AED, #C4FF4D)', transition: 'width 0.3s ease' }} />
                </div>

                <button 
                  onClick={handleIncrement}
                  style={{
                    width: '100%',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    background: aotEp === totalAot ? '#ECE6FF' : '#C4FF4D',
                    color: '#0E0B1A',
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  {aotEp === totalAot ? '★ Completed!' : '+1 Ep Watched'}
                </button>
              </div>

              {/* Secondary item: Solo Leveling */}
              <div style={{
                padding: '6px 8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#FFFFFF' }}>Solo Leveling</div>
                  <div style={{ fontSize: '0.5rem', color: '#A39BB5' }}>Ep 11 / 12 • 91%</div>
                </div>
                <span style={{ color: '#C4FF4D', fontSize: '0.75rem', fontWeight: 700 }}>+</span>
              </div>
            </div>
          </div>

          {/* Right Phone: Dossier */}
          <div 
            style={{
              width: isExpanded ? '180px' : '150px',
              height: isExpanded ? '360px' : '300px',
              borderRadius: '26px',
              padding: '6px',
              background: 'linear-gradient(145deg, #E6DCFF 0%, #A886F8 30%, #5B21B6 70%, #2E1F47 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              transform: 'perspective(1000px) rotateY(-16deg) rotateX(4deg) scale(0.92) translateX(-20px)',
              position: 'relative',
              zIndex: 3,
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              background: 'linear-gradient(180deg, #1A1232 0%, #0E0B1A 100%)',
              padding: '16px 8px 8px',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '0.55rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#B388FF' }}>← DOSSIER</span>
                <span style={{ color: '#A39BB5' }}>#4289</span>
              </div>
              <div style={{ marginBottom: '6px' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                  09<span style={{ color: '#7C3AED' }}>:</span><span style={{ color: '#C4FF4D' }}>18</span>
                </div>
                <span style={{ fontSize: '0.48rem', color: '#B388FF' }}>COMMUNITY SCORE</span>
              </div>
              <strong style={{ fontSize: '0.68rem', color: '#FFFFFF', marginBottom: '2px' }}>Vinland Saga</strong>
              <span style={{ fontSize: '0.52rem', color: '#A39BB5', marginBottom: '8px' }}>Season 2 • MAPPA</span>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px',
                marginBottom: '8px'
              }}>
                <div style={{ padding: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }}>
                  <span style={{ display: 'block', fontSize: '0.45rem', color: '#6E6582' }}>EPS</span>
                  <span style={{ fontWeight: 700, color: '#ECE6FF' }}>24 Eps</span>
                </div>
                <div style={{ padding: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }}>
                  <span style={{ display: 'block', fontSize: '0.45rem', color: '#6E6582' }}>STATUS</span>
                  <span style={{ fontWeight: 700, color: '#ECE6FF' }}>Finished</span>
                </div>
              </div>

              <button 
                onClick={handleToggleList}
                style={{
                  marginTop: 'auto',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  background: inList ? 'rgba(196, 255, 77, 0.15)' : 'rgba(255,255,255,0.08)',
                  border: inList ? '1px solid #C4FF4D' : '1px solid rgba(255,255,255,0.15)',
                  color: inList ? '#C4FF4D' : '#ECE6FF',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {inList ? '✓ In Watchlist' : '+ Add to List'}
              </button>
            </div>
          </div>

          {/* Orbital ribbon foreground arc (passes around lower edges) */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '110%',
              height: '240px',
              transform: 'translate(-50%, -50%) rotate(-12deg)',
              pointerEvents: 'none',
              zIndex: 12
            }}
          >
            <svg viewBox="0 0 1000 480" fill="none" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
              <path d="M 950 260 C 860 410, 140 410, 50 260" stroke="#C4FF4D" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px rgba(196, 255, 77, 0.7))' }} />
              <path d="M 950 260 C 860 410, 140 410, 50 260" stroke="rgba(196, 255, 77, 0.12)" strokeWidth="12" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Right Vertical Nav (when expanded) */}
        {isExpanded && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '1rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.62rem'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#C4FF4D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(196, 255, 77, 0.5)'
            }}>
              <span style={{ fontSize: '1.2rem', color: '#0E0B1A', fontWeight: 900 }}>✦</span>
            </div>
            <span style={{ color: '#B388FF', fontWeight: 700 }}>//</span>
            <span style={{ color: '#C4FF4D', fontWeight: 700 }}>OVERVIEW</span>
            <span style={{ color: '#6E6582' }}>PROCESS</span>
            <span style={{ color: '#6E6582' }}>SOLUTION</span>
            <span style={{ color: '#6E6582' }}>RESULTS</span>
          </div>
        )}
      </div>
    </div>
  );
}

