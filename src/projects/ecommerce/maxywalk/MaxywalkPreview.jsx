import React from 'react';
import './maxywalk.css';
import heroScreenshot from './assets/maxywalk-hero.png';

export default function MaxywalkPreview({ isExpanded = false }) {
  return (
    <div className={`maxywalk-preview-root ${isExpanded ? 'is-expanded' : 'is-compact'}`}>
      <img
        src={heroScreenshot}
        alt="Maxywalk Handcrafted Leather Footwear Original Website"
        className="maxywalk-cover-img"
        loading="eager"
      />
      <div className="maxywalk-cover-overlay">
        <span className="maxywalk-live-pill">
          LIVE STORE ↗
        </span>
      </div>
    </div>
  );
}
