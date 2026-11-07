import React from 'react';

export default function InnovistArchitecturePreview({ isExpanded = false }) {
  return (
    <div 
      className={`innovist-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#F5F2EC',
        color: '#1C1917',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Playfair Display', serif"
      }}
    >
      <img
        src="/covers/innovist-architecture.jpg"
        alt="INNOVIST Interior Architecture & Design"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          filter: 'brightness(0.95) contrast(1.02)',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(245, 242, 236, 0.2) 0%, transparent 40%, rgba(245, 242, 236, 0.4) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

