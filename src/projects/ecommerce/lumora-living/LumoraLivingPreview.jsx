import React from 'react';
import './lumora-living.css';

export default function LumoraLivingPreview({ isExpanded = false }) {
  return (
    <div className={`lumora-card-preview-root ${isExpanded ? 'is-expanded-card' : 'is-compact-card'}`}>
      {/* Top Header */}
      <div className="preview-brand-header">
        <span className="preview-brand-title">LUMORA LIVING</span>
        <div className="preview-nav-pills">
          <span>FURNITURE</span>
          <span>LIGHTING</span>
          <span>DÉCOR</span>
        </div>
        <span className="preview-cart-badge">Bag (1 • $1,280)</span>
      </div>

      {/* Main Hero Layout with Authentic High-Resolution Photography */}
      <div className="preview-hero-layout">
        <div className="preview-copy-column">
          <span className="preview-editorial-label">THE LIVING COLLECTION / 2026</span>
          <h4 className="preview-serif-heading">
            Sculptural Living.<br />
            <em>Timeless Spaces.</em>
          </h4>
          <p className="preview-lead-desc">
            Artisanal solid oak lounge chairs, travertine side tables, and alabaster luminaires.
          </p>
          <div className="preview-actions-bar">
            <span className="preview-cta-button">Explore Collection ↗</span>
            <span className="preview-price-tag">$1,280</span>
          </div>
        </div>

        {/* Living Room Photography */}
        <div className="preview-photo-column">
          <img
            src="/projects/lumora-living/hero-living.jpg"
            alt="LUMORA LIVING modern furniture"
            className="preview-living-photo"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="preview-bottom-bar">
        <span>SOLID EUROPEAN OAK</span>
        <span>ITALIAN TRAVERTINE</span>
        <span className="preview-accent-tag">WHITE-GLOVE DELIVERY</span>
      </div>
    </div>
  );
}
