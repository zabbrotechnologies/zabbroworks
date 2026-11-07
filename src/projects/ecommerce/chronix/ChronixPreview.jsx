import React from 'react';
import './chronix.css';

export default function ChronixPreview({ isExpanded = false }) {
  return (
    <div className={`chronix-card-preview-root ${isExpanded ? 'is-expanded-card' : 'is-compact-card'}`}>
      {/* Top Header */}
      <div className="preview-top-brand-bar">
        <span className="preview-brand-wordmark">CHRONIX</span>
        <div className="preview-nav-indicators">
          <span>WATCHES</span>
          <span>COLLECTIONS</span>
          <span>CALIBRES</span>
        </div>
        <span className="preview-bag-badge">Bag (1 • $2,850)</span>
      </div>

      {/* Hero Layout (Exact Reference Match) */}
      <div className="preview-hero-body-grid">
        <div className="preview-text-col">
          <span className="preview-tag-label">SWISS HOROLOGY / 2026</span>
          <h4 className="preview-headline-serif">
            CRAFTED<br />
            FOR TIMELESS<br />
            MOMENTS
          </h4>
          <p className="preview-lead-copy">
            Grade 5 titanium architecture, sapphire crystal, and Swiss automatic movements.
          </p>
          <div className="preview-actions-strip">
            <span className="preview-cta-pill">Discover Collection ↗</span>
            <span className="preview-price-tag">$2,850 USD</span>
          </div>
        </div>

        {/* Photorealistic Luxury Wristwatch on Dark Background */}
        <div className="preview-watch-photo-col">
          <img
            src="/projects/chronix/hero-watch-dark.jpg"
            alt="CHRONIX luxury timepiece"
            className="preview-watch-photo-img"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="preview-bottom-specs-bar">
        <span>GRADE 5 TITANIUM</span>
        <span>CALIBRE CX-90</span>
        <span className="preview-accent-label">GENÈVE MANUFACTURE</span>
      </div>
    </div>
  );
}
