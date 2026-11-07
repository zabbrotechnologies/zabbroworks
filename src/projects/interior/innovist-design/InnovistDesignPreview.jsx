import React from 'react';

export default function InnovistDesignPreview({ isExpanded = false }) {
  return (
    <div 
      className={`innovist-preview-card ${isExpanded ? 'is-expanded-preview' : 'is-compact-preview'}`}
      style={{
        backgroundColor: '#0D0907',
        color: '#F4ECE4',
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
        src="/covers/innovist-design.jpg"
        alt="INNOVIST Interior Architecture & Luxury Craft"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          filter: 'brightness(0.9) contrast(1.05)',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(13, 9, 7, 0.4) 0%, transparent 40%, rgba(13, 9, 7, 0.75) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

