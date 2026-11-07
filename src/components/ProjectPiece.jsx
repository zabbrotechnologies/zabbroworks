import React, { useState, useEffect } from 'react';
import ProjectIframe from './ProjectIframe';

export default function ProjectPiece({ project, index, viewMode, onSelectProject }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isGridStyle = viewMode === 'grid' || isMobile;

  // 2xN grid theme set logic:
  // 1: white, 2: black
  // 3: black, 4: white
  // 5: white, 6: black
  // 7: black, 8: white
  const isDarkTheme = isGridStyle
    ? (Math.floor(index / 2) + (index % 2)) % 2 === 1
    : index % 2 === 1;

  const themeClass = isDarkTheme ? 'theme-dark' : 'theme-light';
  const isContentLeft = index % 2 === 0;

  if (isGridStyle) {
    return (
      <article 
        className={`project-piece project-piece-grid ${themeClass}`}
        style={{ animationDelay: `${(index % 6) * 0.08}s` }}
      >
        <div className="grid-card-inner">
          <div className="preview-col">
            <div className="preview-card">
              <ProjectIframe
                demoUrl={project.demoUrl}
                title={project.title}
                onOpenViewer={() => onSelectProject(project)}
              />
            </div>
          </div>
          <div className="content-col">
            <div className="project-category-tag">
              <span className="category-glow-dot"></span>
              <span>{project.categoryLabel}</span>
            </div>
            <h2 className="project-title">{project.title}</h2>
            <p className="project-desc">{project.description}</p>
            <div className="action-row" style={{ marginTop: 'auto' }}>
              <button
                type="button"
                className="view-project-btn"
                onClick={() => onSelectProject(project)}
                aria-label={`View ${project.title}`}
              >
                <span>View Project</span>
                <span className="arrow-icon">↗</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Alternate: Even index -> Content on Left, Preview on Right
  if (isContentLeft) {
    return (
      <article 
        className={`project-piece layout-preview-right ${themeClass}`}
        style={{ animationDelay: `${(index % 6) * 0.1}s` }}
      >
        <div className="content-col">
          <div>
            <div className="project-category-tag">
              <span className="category-glow-dot"></span>
              <span>{project.categoryLabel}</span>
            </div>
            <h2 className="project-title">{project.title}</h2>
            <p className="project-desc">{project.description}</p>
            {project.deliverables && (
              <div className="deliverables-list">
                {project.deliverables.map((item, i) => (
                  <span key={i} className="deliverable-tag">{item}</span>
                ))}
              </div>
            )}
          </div>

          <div className="action-row">
            <button
              type="button"
              id={`view-btn-${project.id}`}
              className="view-project-btn"
              onClick={() => onSelectProject(project)}
              aria-label={`View ${project.title}`}
            >
              <span>View Project</span>
              <span className="arrow-icon">↗</span>
            </button>
          </div>
        </div>

        <div className="preview-col">
          <div className="preview-card">
            <ProjectIframe
              demoUrl={project.demoUrl}
              title={project.title}
              onOpenViewer={() => onSelectProject(project)}
            />
          </div>
        </div>
      </article>
    );
  }

  // Alternate: Odd index -> Preview on Left, Content on Right
  return (
    <article 
      className={`project-piece layout-preview-left ${themeClass}`}
      style={{ animationDelay: `${(index % 6) * 0.1}s` }}
    >
      <div className="preview-col">
        <div className="preview-card">
          <ProjectIframe
            demoUrl={project.demoUrl}
            title={project.title}
            onOpenViewer={() => onSelectProject(project)}
          />
        </div>
      </div>

      <div className="content-col">
        <div>
          <div className="project-category-tag">
            <span className="category-glow-dot"></span>
            <span>{project.categoryLabel}</span>
          </div>
          <h2 className="project-title">{project.title}</h2>
          <p className="project-desc">{project.description}</p>
          {project.deliverables && (
            <div className="deliverables-list">
              {project.deliverables.map((item, i) => (
                <span key={i} className="deliverable-tag">{item}</span>
              ))}
            </div>
          )}
        </div>

        <div className="action-row">
          <button
            type="button"
            id={`view-btn-${project.id}`}
            className="view-project-btn"
            onClick={() => onSelectProject(project)}
            aria-label={`View ${project.title}`}
          >
            <span>View Project</span>
            <span className="arrow-icon">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}
