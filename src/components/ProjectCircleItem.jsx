import React from 'react';

export default function ProjectCircleItem({
  project,
  index,
  _rowIndex,
  isExpanded,
  isAnyExpanded,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onTouch,
}) {
  const isDark = (index % 2 === 0);
  const themeClass = isDark ? 'theme-dark' : 'theme-light';
  const itemNumber = String(index + 1).padStart(2, '0');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const displayDomain = project.demoUrl.startsWith('http')
    ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `${project.id}.zabbro.space`;

  return (
    <article
      className={`cinematic-project-item ${themeClass} ${isExpanded ? 'is-expanded' : 'is-compact'} ${isAnyExpanded && !isExpanded ? 'is-shrunk' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onTouchEnd={onTouch}
      onFocus={onMouseEnter}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${project.title} - ${project.categoryLabel}`}
      onKeyDown={handleKeyDown}
    >
      {/* 1. COMPACT CIRCULAR STATE VIEW */}
      <div className="compact-circle-content" aria-hidden={isExpanded}>
        <div className="compact-top-meta">
          <span className="compact-index">[{itemNumber}]</span>
          <span className="compact-year">{project.year || '2026'}</span>
        </div>

        <div className="compact-center-body">
          <div className="compact-category-dot">
            <span className="glow-dot"></span>
            <span className="category-text">{project.categoryLabel}</span>
          </div>
          <h3 className="compact-title">{project.title}</h3>
        </div>

        <div className="compact-bottom-action">
          <span className="compact-action-cue">
            <span>Explore</span>
            <span className="arrow-glyph">↗</span>
          </span>
        </div>
      </div>

      {/* 2. EXPANDED HORIZONTAL PILL PREVIEW VIEW */}
      <div className="expanded-pill-content" aria-hidden={!isExpanded}>
        {/* Left column: Browser Preview Window */}
        <div className="pill-preview-col">
          <div className="pill-browser-window">
            <div className="pill-browser-header">
              <div className="browser-dots">
                <span className="dot dot-close"></span>
                <span className="dot dot-min"></span>
                <span className="dot dot-max"></span>
              </div>
              <div className="browser-domain-pill">
                <span className="domain-lock">🔒</span>
                <span className="domain-text">{displayDomain}</span>
              </div>
              <div className="browser-live-badge">
                <span className="live-pulse-dot"></span>
                <span className="live-label">LIVE</span>
              </div>
            </div>

            <div className="pill-browser-viewport">
              <div className={`viewport-mock-interior category-${project.category}`}>
                <div className="mock-site-hero">
                  <span className="mock-eyebrow">{project.categoryLabel} // ARCHIVE</span>
                  <h4 className="mock-heading">{project.title}</h4>
                  <p className="mock-subheading">{project.client || 'Studio Edition'}</p>
                </div>
                <div className="mock-site-footer">
                  <span className="mock-chip">{project.deliverables?.[0] || 'Interactive Experience'}</span>
                  <span className="mock-chip">{project.deliverables?.[1] || 'Design System'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Editorial Details & Launch Action */}
        <div className="pill-details-col">
          <div className="pill-meta-row">
            <span className="pill-category-badge">
              <span className="glow-dot"></span>
              <span>{project.categoryLabel}</span>
            </span>
            <span className="pill-index-badge">[{itemNumber}]</span>
          </div>

          <h3 className="pill-project-title">{project.title}</h3>
          
          <p className="pill-project-desc">{project.description}</p>

          {project.deliverables && project.deliverables.length > 0 && (
            <div className="pill-deliverables-list">
              {project.deliverables.slice(0, 3).map((tag, i) => (
                <span key={i} className="pill-deliverable-tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="pill-action-row">
            <button
              type="button"
              className="pill-launch-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              aria-label={`Open interactive viewer for ${project.title}`}
            >
              <span>Launch Experience</span>
              <span className="arrow-icon">↗</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
