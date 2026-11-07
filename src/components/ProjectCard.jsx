import React from 'react';
import ProjectMockup from './ProjectMockup';

export default function ProjectCard({
  project,
  isExpanded,
  onMouseEnter,
  onSelectProject,
}) {
  const { title, year, category, description, number } = project;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelectProject(project);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectProject(project);
    }
  };

  return (
    <article
      className={`verhost-project-card ${isExpanded ? 'is-active-expanded' : 'is-idle-compact'}`}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`Project ${number}: ${title}, ${category}`}
    >
      {!isExpanded ? (
        /* COMPACT 4:3 / 3:2 LANDSCAPE PREVIEW (Matches reference Card 1, 3, 4) */
        <div className="compact-card-layout">
          <div className="compact-preview-box">
            <ProjectMockup project={project} isExpanded={false} />
          </div>
          <div className="compact-label-bar">
            <span className="compact-name-text">{title}</span>
            <div className="compact-meta-right">
              <span className="compact-year-text">{year}</span>
              <span className="compact-arrow-icon">↗</span>
            </div>
          </div>
        </div>
      ) : (
        /* HOVER-EXPANDED PILL/CAPSULE (Matches reference Livora/Nexora/Synthora) */
        <div className="expanded-capsule-layout">
          {/* Left: 60-65% Landscape Website Preview */}
          <div className="expanded-preview-pane">
            <ProjectMockup project={project} isExpanded={true} />
          </div>

          {/* Right: 35-40% Project Information */}
          <div className="expanded-info-pane">
            <div className="expanded-dash-row">
              <span className="dash-indicator">—</span>
            </div>
            <div className="expanded-heading-block">
              <h3 className="expanded-project-title">{title}</h3>
              <span className="expanded-category-tag">[ {category} ]</span>
            </div>
            <p className="expanded-project-blurb">{description}</p>
            <div className="expanded-footer-bar">
              <button
                type="button"
                className="expanded-launch-button"
                onClick={handleClick}
              >
                <span>VIEW PROJECT</span>
                <span className="arrow-glyph">↗</span>
              </button>
              <span className="expanded-year-corner">{year}</span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
