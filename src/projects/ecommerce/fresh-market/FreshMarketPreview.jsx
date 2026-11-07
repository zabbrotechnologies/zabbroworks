import React from 'react';
import './fresh-market.css';

export default function FreshMarketPreview({ isExpanded = false }) {
  return (
    <div className={`freshmarket-preview-root ${isExpanded ? 'is-expanded' : 'is-compact'}`}>
      {/* Brand Header */}
      <div className="freshmarket-header">
        <span className="freshmarket-brand">
          <span className="freshmarket-leaf-icon">🌿</span>
          FRESH MARKET
        </span>
        <div className="freshmarket-nav">
          <span>PRODUCE</span>
          <span>DAIRY</span>
          <span>BAKERY</span>
          <span>ORGANIC</span>
        </div>
        <span className="freshmarket-cart-pill">Cart (5 • $34.50)</span>
      </div>

      {/* Hero Body */}
      <div className="freshmarket-body">
        <div className="freshmarket-copy">
          <span className="freshmarket-eyebrow">Harvested This Morning</span>
          <h4 className="freshmarket-title">
            Locally Sourced.<br />
            <span>Farm To Door.</span>
          </h4>
          <p className="freshmarket-desc">
            Organic Honeycrisp apples, fresh pasture milk, and artisan sourdough delivered in 30 minutes.
          </p>
          <div className="freshmarket-actions">
            <span className="freshmarket-cta-btn">Order Fresh ↗</span>
            <span className="freshmarket-price-tag">From $3.49</span>
          </div>
        </div>

        {/* Bespoke Grocery Produce Visual */}
        <div className="freshmarket-visual-col">
          <svg viewBox="0 0 200 140" className="freshmarket-graphic-svg" fill="none">
            {/* Soft Green Aura */}
            <circle cx="100" cy="75" r="45" fill="rgba(22, 155, 80, 0.12)" filter="blur(6px)" />
            
            {/* Wooden Produce Basket Shadow */}
            <ellipse cx="105" cy="125" rx="55" ry="9" fill="rgba(0,0,0,0.08)" filter="blur(2px)" />
            
            {/* Woven Wooden Crate */}
            <rect x="55" y="85" width="95" height="40" rx="6" fill="#E8D7B8" stroke="#D1BC95" strokeWidth="2" />
            <line x1="55" y1="98" x2="150" y2="98" stroke="#D1BC95" strokeWidth="1.5" />
            <line x1="55" y1="112" x2="150" y2="112" stroke="#D1BC95" strokeWidth="1.5" />
            <line x1="85" y1="85" x2="85" y2="125" stroke="#C4AD85" strokeWidth="2" />
            <line x1="120" y1="85" x2="120" y2="125" stroke="#C4AD85" strokeWidth="2" />

            {/* Farm Fresh Milk Bottle in Crate */}
            <rect x="68" y="55" width="22" height="42" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="73" y="48" width="12" height="7" fill="#169B50" />
            <text x="71" y="76" fill="#169B50" fontSize="5" fontWeight="bold">MILK</text>

            {/* Organic Honeycrisp Apples */}
            <circle cx="102" cy="78" r="16" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
            <path d="M102 62 Q 106 54 112 56" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M103 62 Q 112 60 110 66 Z" fill="#22C55E" />

            <circle cx="126" cy="80" r="14" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <path d="M126 66 Q 130 58 136 60" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M127 66 Q 136 64 134 70 Z" fill="#22C55E" />

            {/* Price Badge Pill */}
            <rect x="135" y="42" width="45" height="18" rx="9" fill="#169B50" />
            <text x="142" y="54" fill="#FFFFFF" fontSize="7.5" fontWeight="bold">$3.49/lb</text>
          </svg>
        </div>
      </div>

      {/* Bottom Features Strip */}
      <div className="freshmarket-bottom-bar">
        <span>100% ORGANIC CERTIFIED</span>
        <span>ZERO PLASTIC CRATES</span>
        <span className="freshmarket-badge">EXPRESS 30M DELIVERY</span>
      </div>
    </div>
  );
}
