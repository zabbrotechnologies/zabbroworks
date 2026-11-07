import React from 'react';

export default function DatumPreview({ isExpanded = false }) {
  return (
    <div 
      className={`interior-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{ backgroundColor: '#F5F2EB', width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <img src="/covers/datum-interior.png" alt="DATUM Interior" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

