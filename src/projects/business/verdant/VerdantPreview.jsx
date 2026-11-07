import React from 'react';
import './verdant.css';

export default function VerdantPreview({ isExpanded = false }) {
  return (
    <div className={`verdant-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}>
      {/* Top Technical Wire */}
      <div className="verdant-preview-top-wire">
        <span style={{ color: 'var(--verdant-electric)', fontWeight: 700 }}>
          [06] VERDANT SYSTEMS
        </span>
        <span style={{ color: 'var(--verdant-gray)' }}>
          CLIMATE TECHNOLOGY
        </span>
      </div>

      {/* Center Dynamic Typography Stage */}
      <div className="verdant-preview-stage">
        <div>
          <span className="verdant-preview-tag">
            &bull; AUTONOMOUS ENERGY INFRASTRUCTURE
          </span>
          <h4 className="verdant-preview-headline">
            ENERGY,<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px #F2F0E8' }}>RE</span>
            <span style={{ color: 'var(--verdant-electric)', fontStyle: 'italic', fontFamily: 'var(--verdant-font-editorial)', fontWeight: 400 }}>imagined.</span>
          </h4>
          <p style={{ fontSize: '0.68rem', lineHeight: 1.4, color: 'var(--verdant-gray)', margin: '0.25rem 0 0.75rem' }}>
            Grid-synchronized flow storage, transmission topology, and deep industrial decarbonization heat.
          </p>
        </div>

        {/* Mini Energy Waveform Graphic */}
        <div style={{ margin: '0.5rem 0', position: 'relative' }}>
          <svg viewBox="0 0 300 45" fill="none" style={{ width: '100%', height: '35px' }}>
            <line x1="0" y1="22" x2="300" y2="22" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <path
              d="M 0 22 Q 75 2, 150 22 T 300 22"
              stroke="var(--verdant-electric)"
              strokeWidth="1.5"
              fill="none"
              className="verdant-flowing-line"
            />
            <circle cx="150" cy="22" r="3" fill="var(--verdant-acid)" />
          </svg>
        </div>

        {/* Action Button & Spec */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <span style={{ backgroundColor: 'var(--verdant-electric)', color: '#090B09', fontSize: '0.58rem', fontWeight: 700, padding: '0.3rem 0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Explore Technology &rarr;
          </span>
          <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.62rem', color: 'var(--verdant-electric)', fontWeight: 600 }}>
            3.8 GWh DISPATCHED
          </span>
        </div>
      </div>

      {/* Bottom Technical Indicators */}
      <div className="verdant-preview-bottom-bar">
        <span>01 STORAGE</span>
        <span>02 HVDC TRANSMISSION</span>
        <span>03 PROCESS HEAT</span>
      </div>
    </div>
  );
}

