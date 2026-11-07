import React, { useState, useEffect, useRef } from 'react';

export default function ProjectIframe({ demoUrl, title, onOpenViewer, className = '' }) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const simulatedDomain = `${title.toLowerCase().replace(/[^a-z0-9]/g, '')}.zabbro.space`;

  return (
    <div
      ref={containerRef}
      className={`preview-card-inner ${className}`}
      onClick={onOpenViewer}
      role="button"
      tabIndex={0}
      aria-label={`Open interactive viewer for ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenViewer();
        }
      }}
    >
      {/* Sleek minimal browser chrome */}
      <div className="preview-top-bar">
        <div className="preview-dots">
          <span className="p-dot"></span>
          <span className="p-dot"></span>
          <span className="p-dot"></span>
        </div>
        <div className="preview-domain">
          <span className="domain-lock">&bull;</span> {simulatedDomain}
        </div>
        <div className="preview-live-indicator">
          <span className="live-dot"></span>
          <span className="live-text">DEMO</span>
        </div>
      </div>

      <div className="preview-frame-container">
        {isInView ? (
          <>
            {!isLoaded && (
              <div className="preview-placeholder">
                <div className="placeholder-spinner"></div>
                <span className="placeholder-text">Initializing {title}</span>
              </div>
            )}
            <iframe
              src={demoUrl}
              title={title}
              loading="lazy"
              className="live-iframe"
              style={{ opacity: isLoaded ? 1 : 0 }}
              onLoad={() => setIsLoaded(true)}
            />
          </>
        ) : (
          <div className="preview-placeholder">
            <span className="placeholder-text">{title} &mdash; Standby</span>
          </div>
        )}

        {/* Visually quiet hover indicator that moves subtly */}
        <div className="iframe-overlay-trigger">
          <div className="preview-badge-hover">
            <span>Enter Full Experience</span>
            <span className="arrow">&nearr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
