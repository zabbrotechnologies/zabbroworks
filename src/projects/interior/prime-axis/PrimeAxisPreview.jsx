import React from 'react';

export default function PrimeAxisPreview({ isExpanded = false }) {
  return (
    <div 
      className={`interior-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{ backgroundColor: '#F2EFEB', width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <img src="/covers/prime-axis.png" alt="PRIME AXIS Architecture" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

