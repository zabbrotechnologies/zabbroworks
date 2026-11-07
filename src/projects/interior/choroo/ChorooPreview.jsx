import React from 'react';

export default function ChorooPreview({ isExpanded = false }) {
  return (
    <div 
      className={`interior-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{ backgroundColor: '#F9F8F5', width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <img src="/covers/choroo.png" alt="CHOROO Atelier" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

