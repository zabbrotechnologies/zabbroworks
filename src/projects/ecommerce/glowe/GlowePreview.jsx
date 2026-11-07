import React from 'react';
import './glowe.css';

export default function GlowePreview({ isExpanded = false }) {
  return (
    <div className={`glowe-card-preview-root ${isExpanded ? 'is-expanded-card' : 'is-compact-card'}`}>
      {/* Top Editorial Masthead Bar */}
      <div className="preview-glowe-masthead-bar">
        <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--glowe-olive)' }}>
          VOL. 04 / LAB
        </span>
        <span className="preview-masthead-title">GLOWÉ</span>
        <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--glowe-terracotta)' }}>
          BAG (1)
        </span>
      </div>

      {/* Art-Directed Campaign Overlap Canvas */}
      <div className="preview-canvas-overlap">
        <div className="preview-canvas-copy">
          <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--glowe-terracotta)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            ● Botanical Formulation
          </span>
          <h4 className="preview-canvas-headline">
            Pure Care.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--glowe-terracotta)' }}>Real Results.</span>
          </h4>
          <p style={{ fontSize: '0.68rem', lineHeight: 1.35, color: '#5C564E', margin: '0.25rem 0 0.65rem' }}>
            Cold-fermented multi-weight hyaluronic acid and biomimetic ceramides.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ backgroundColor: 'var(--glowe-ink)', color: '#fff', fontSize: '0.58rem', fontWeight: 600, padding: '0.3rem 0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Explore Ritual &rarr;
            </span>
            <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--glowe-terracotta)' }}>
              $68
            </span>
          </div>
        </div>

        <div className="preview-canvas-thumb">
          <img
            src="/projects/glowe/hero-skincare.jpg"
            alt="GLOWÉ botanical skincare"
            className="preview-canvas-img"
          />
          <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(247, 243, 237, 0.92)', padding: '0.2rem 0.4rem', border: '1px solid rgba(0,0,0,0.06)', fontFamily: 'var(--glowe-font-mono)', fontSize: '0.5rem', letterSpacing: '0.06em' }}>
            [01] CERAMIDE NP
          </div>
        </div>
      </div>

      {/* Horizontal Editorial Strip */}
      <div className="preview-bottom-editorial-strip">
        <span>01 HYDRATION</span>
        <span>02 BARRIER</span>
        <span>03 TONE</span>
        <span>04 CLEANSING</span>
      </div>
    </div>
  );
}
