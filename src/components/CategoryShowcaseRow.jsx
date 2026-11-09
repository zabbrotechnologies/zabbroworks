import React, { useState, useRef, useEffect } from 'react';
import ProjectMockup from './ProjectMockup';

function CategoryShowcaseRow({ section, projects, onSelectProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const thumbRefs = useRef([]);
  const stackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const isFirstMount = useRef(true);

  // Keep active thumbnail centered in mobile scroll view on user interaction
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const el = thumbRefs.current[activeIndex];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  const handleMouseDown = (e) => {
    if (!stackRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - stackRef.current.offsetLeft;
    scrollLeftRef.current = stackRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !stackRef.current) return;
    const x = e.pageX - stackRef.current.offsetLeft;
    const dist = Math.abs(x - startXRef.current);
    if (dist > 5) {
      hasMovedRef.current = true;
    }
    const walk = (x - startXRef.current) * 1.5;
    stackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchStart = () => {
    hasMovedRef.current = false;
  };

  const handleTouchMove = () => {
    hasMovedRef.current = true;
  };

  if (!projects || projects.length === 0) return null;

  const activeProject = projects[activeIndex] || projects[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const getThumbnailSnippet = (proj) => {
    if (proj.thumbnailImg) {
      return (
        <img 
          src={proj.thumbnailImg} 
          alt={proj.title}
          className="thumbnail-mini-img"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
    const accent = proj.theme?.accent || '#9BFF9B';
    const bg = proj.theme?.bg || '#0B150F';
    return (
      <div 
        className="thumbnail-mini-abstract" 
        style={{ 
          background: `linear-gradient(135deg, ${bg} 0%, #050907 100%)`,
          border: `1px solid ${accent}33`
        }}
      >
        <div 
          className="mini-abstract-shape" 
          style={{ background: accent }} 
        />
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="category-showcase-row" 
      id={`section-${section.slug}`}
    >
      <div className="row-inner-bounds">
        <div className="row-columns-grid">
          
          {/* =========================================================
           * 1. CATEGORY INFO: Number, Heading, Description & CTA
           * ========================================================= */}
          <div className="col-category-info">
            <div className="category-eyebrow-line">
              <span className="eyebrow-num">{section.number}</span>
              <span className="eyebrow-divider">——</span>
              <span className="eyebrow-cat-name">{section.category}</span>
            </div>

            <h2 className="category-display-heading">
              <span className="heading-part-1">{section.headingLine1}</span>
              <span className="heading-part-2">{section.headingLine2}</span>
            </h2>

            <p className="category-lead-desc">
              {section.description}
            </p>

            {/* CTA action buttons */}
            <div className="category-cta-group">
              <button
                type="button"
                className="circular-arrow-cta-btn"
                aria-label={`Open ${activeProject.title}`}
                onClick={() => onSelectProject(activeProject)}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                type="button"
                className="view-projects-pill-btn"
                onClick={() => onSelectProject(activeProject)}
              >
                <span>VIEW PROJECTS</span>
              </button>
            </div>

            {/* Bottom tags */}
            <div className="category-tags-bottom">
              <span>{section.tags.join('  ·  ')}</span>
            </div>
          </div>

          {/* =========================================================
           * 2. CENTER: Large Featured Website Preview + Metadata
           * ========================================================= */}
          <div className="col-center-preview">
            <div 
              className="perspective-mockup-wrapper"
              onClick={() => onSelectProject(activeProject)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(activeProject);
                }
              }}
              role="button"
              tabIndex={0}
              title={`Click to preview ${activeProject.title}`}
            >
              <div className="perspective-device-frame">
                {/* Gloss reflection overlay */}
                <div className="perspective-gloss-sheen" />

                {/* Render the high-definition project cover screenshot */}
                <div className="perspective-mockup-body">
                  {activeProject.coverImg || activeProject.thumbnailImg ? (
                    <img 
                      src={activeProject.coverImg || activeProject.thumbnailImg} 
                      alt={activeProject.title}
                      className="perspective-cover-full-img"
                      decoding="async"
                      loading="lazy"
                    />
                  ) : (
                    <ProjectMockup project={activeProject} isExpanded={false} />
                  )}
                </div>
              </div>
            </div>

            {/* Mockup Metadata Bar */}
            <div className="mockup-meta-strip">
              <div className="meta-left-info">
                <span className="meta-project-title">{activeProject.title}</span>
                <span className="meta-project-subtitle">
                  {activeProject.subtitle || activeProject.client || activeProject.description}
                </span>
              </div>
              <div 
                className="meta-right-year"
                onClick={() => onSelectProject(activeProject)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(activeProject);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <span>{activeProject.year || '2026'}</span>
                <span className="meta-year-arrow">↗</span>
              </div>
            </div>
          </div>

          {/* =========================================================
           * 3. RIGHT: Existing Project Selector & Thumbnail Stack
           * ========================================================= */}
          <div className="col-right-selector">
            {/* Top Index & Controls */}
            <div className="selector-top-header">
              <span className="selector-counter-label">
                {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <div className="selector-nav-arrows">
                <button
                  type="button"
                  className="selector-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous project in section"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="selector-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next project in section"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Stack / Carousel of Thumbnails */}
            <div 
              ref={stackRef}
              className="selector-thumbnails-stack"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              {projects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.id}
                    ref={(el) => (thumbRefs.current[idx] = el)}
                    type="button"
                    className={`thumbnail-nav-item ${isActive ? 'is-active-thumb' : ''}`}
                    onClick={() => {
                      if (!hasMovedRef.current) {
                        setActiveIndex(idx);
                      }
                    }}
                    title={`Select ${proj.title}`}
                  >
                    <div className="thumb-item-text">
                      <span className="thumb-item-title">
                        {proj.title}
                      </span>
                    </div>
                    <div className="thumb-item-preview-box">
                      {getThumbnailSnippet(proj)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default React.memo(CategoryShowcaseRow);
