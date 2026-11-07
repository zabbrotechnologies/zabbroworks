import React from 'react';

export default function ElirasPreview({ isExpanded = false }) {
  return (
    <div 
      className={`interior-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{ backgroundColor: '#181A1B', width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <img src="/covers/eliras.png" alt="ELIRAS Studio" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

