import React from 'react';
import './vera-beauty.css';

export default function VeraBeautyPreview({ isExpanded = false }) {
  return (
    <div className={`vera-preview-root ${isExpanded ? 'is-expanded' : 'is-compact'}`}>
      {/* Brand Header */}
      <div className="vera-header">
        <span className="vera-brand">VÉRA BEAUTY</span>
        <div className="vera-nav">
          <span>SERUMS</span>
          <span>HYDRATION</span>
          <span>RITUALS</span>
          <span>CLEANSERS</span>
        </div>
        <span className="vera-cart-pill">Bag (2 • $142)</span>
      </div>

      {/* Hero Body */}
      <div className="vera-body">
        <div className="vera-copy">
          <span className="vera-eyebrow">Bio-Compatible Dermatology</span>
          <h4 className="vera-title">
            Pure Care.<br />
            Real Results.
          </h4>
          <p className="vera-desc">
            Antioxidant peptide serum and ceramide velvet barrier cream formulated for cellular skin renewal.
          </p>
          <div className="vera-actions">
            <span className="vera-cta-btn">Shop Ritual ↗</span>
            <span className="vera-price-tag">$78 • 30ml</span>
          </div>
        </div>

        {/* Bespoke Luxury Skincare Bottles Visual */}
        <div className="vera-visual-col">
          <svg viewBox="0 0 200 140" className="vera-graphic-svg" fill="none">
            {/* Soft Rose Glow */}
            <circle cx="110" cy="70" r="50" fill="rgba(212, 165, 154, 0.22)" filter="blur(8px)" />
            
            {/* Dropper Bottle */}
            <ellipse cx="65" cy="126" rx="22" ry="6" fill="rgba(36, 24, 21, 0.1)" filter="blur(2px)" />
            <rect x="48" y="58" width="34" height="66" rx="8" fill="#F4EAE2" stroke="#DEC8BD" strokeWidth="1.5" />
            <rect x="52" y="70" width="26" height="34" fill="#FAF7F2" stroke="#DEC8BD" strokeWidth="1" />
            <text x="56" y="86" fill="#C27863" fontSize="6" fontWeight="bold">VÉRA</text>
            <text x="56" y="94" fill="#8C7B76" fontSize="4.5">SERUM</text>
            {/* Collar & Pipette Bulb */}
            <rect x="58" y="44" width="14" height="14" fill="#DEC8BD" />
            <path d="M60 44 C 60 36, 70 36, 70 44 Z" fill="#FFFFFF" stroke="#DEC8BD" strokeWidth="1" />

            {/* Velvet Creme Jar */}
            <ellipse cx="120" cy="126" rx="30" ry="7" fill="rgba(36, 24, 21, 0.1)" filter="blur(2px)" />
            <rect x="96" y="75" width="48" height="48" rx="8" fill="#EADBCE" stroke="#DEC8BD" strokeWidth="1.5" />
            <rect x="92" y="65" width="56" height="12" rx="4" fill="#241815" />
            <rect x="102" y="88" width="36" height="22" fill="#FAF7F2" stroke="#DEC8BD" strokeWidth="1" />
            <text x="107" y="100" fill="#241815" fontSize="5.5" fontWeight="bold">HYDRA</text>
            <text x="107" y="106" fill="#8C7B76" fontSize="4">BARRIER</text>

            {/* Botanical Dried Rosehip Branch */}
            <path d="M158 126 Q 168 85 162 45 Q 158 30 154 18" stroke="#A6877E" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="164" cy="52" r="5" fill="#C27863" />
            <circle cx="156" cy="35" r="4.5" fill="#D4A59A" />
            <circle cx="166" cy="75" r="4" fill="#C27863" />
          </svg>
        </div>
      </div>

      {/* Bottom Certifications Strip */}
      <div className="vera-bottom-bar">
        <span>100% VEGAN</span>
        <span>CLEAN CERTIFIED</span>
        <span className="vera-badge">DERMATOLOGIST TESTED</span>
      </div>
    </div>
  );
}
