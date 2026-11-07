import React from 'react';

export default function IntrioPreview({ isExpanded = false }) {
  return (
    <div 
      className={`interior-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#141414',
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <img
        src="/covers/intrio.png"
        alt="INTRIO Interior Studio"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center'
        }}
      />
    </div>
  );
}

