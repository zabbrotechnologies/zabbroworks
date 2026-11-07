import React from 'react';
import './atelier.css';

export default function AtelierPreview({ isExpanded = false }) {
  return (
    <div className={`atelier-card-preview-root ${isExpanded ? 'is-expanded-card' : 'is-compact-card'}`}>
      {/* Top Technical Wire */}
      <div className="preview-atelier-top-wire">
        <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--atelier-oxide)', fontWeight: 700 }}>
          PRJ-01 / FIELD ARCHIVE
        </span>
        <span className="preview-atelier-title">ATELIER</span>
        <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--atelier-blueprint)' }}>
          48.85° N, 2.35° E
        </span>
      </div>

      {/* Architectural Presentation Board Canvas */}
      <div className="preview-atelier-composition">
        <div className="preview-atelier-copy">
          <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.55rem', letterSpacing: '0.16em', color: 'var(--atelier-blueprint)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            ● Architecture &bull; Interiors
          </span>
          <h4 className="preview-atelier-headline">
            The Courtyard<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--atelier-oxide)' }}>House.</span>
          </h4>
          <p style={{ fontSize: '0.68rem', lineHeight: 1.35, color: 'var(--atelier-graphite-muted)', margin: '0.25rem 0 0.65rem' }}>
            Board-formed concrete, hinoki timber framework, and reflecting basin.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ backgroundColor: 'var(--atelier-graphite)', color: '#fff', fontSize: '0.58rem', fontWeight: 600, padding: '0.3rem 0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Explore Studio &rarr;
            </span>
            <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.62rem', color: 'var(--atelier-oxide)', fontWeight: 600 }}>
              KYOTO 2025
            </span>
          </div>
        </div>

        <div className="preview-atelier-thumb">
          <img
            src="/projects/atelier/project-courtyard-main.jpg"
            alt="ATELIER architecture"
            className="preview-atelier-img"
          />
          <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(244, 242, 246, 0.95)', padding: '0.2rem 0.45rem', border: '1px solid var(--atelier-line)', fontFamily: 'var(--atelier-font-mono)', fontSize: '0.5rem', letterSpacing: '0.06em', color: 'var(--atelier-blueprint)' }}>
            CAD: PLAN 1:100
          </div>
        </div>
      </div>

      {/* Bottom Technical Strip */}
      <div className="preview-atelier-bottom-strip">
        <span>01 RESIDENTIAL</span>
        <span>02 WORKPLACE</span>
        <span>03 CULTURAL</span>
        <span>04 MATERIAL LAB</span>
      </div>
    </div>
  );
}
