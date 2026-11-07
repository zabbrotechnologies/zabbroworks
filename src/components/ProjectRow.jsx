import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectRow({ section, projects, onSelectProject }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleRowMouseLeave = () => {
    setExpandedIndex(null);
  };

  return (
    <div className="showcase-section-unit" id={`section-${section.slug}`}>
      {/* Section Header: "01 / E-COMMERCE" -------- "04 PROJECTS  <  >" */}
      <div className="section-title-strip">
        <div className="section-title-left">
          <span className="section-number-prefix">{section.number}</span>
          <span className="section-slash">/</span>
          <h2 className="section-name-text">{section.category}</h2>
        </div>
        <div className="section-hairline" />
        <div className="section-title-right">
          <span className="section-count-badge">{section.count}</span>
          <div className="section-nav-arrows">
            <button type="button" className="nav-arrow-btn" aria-label="Previous">&lt;</button>
            <button type="button" className="nav-arrow-btn" aria-label="Next">&gt;</button>
          </div>
        </div>
      </div>

      {/* Stable 4-Item Horizontal Track */}
      <div 
        className="projects-horizontal-track"
        onMouseLeave={handleRowMouseLeave}
      >
        {projects.map((proj, idx) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            isExpanded={expandedIndex === idx}
            onMouseEnter={() => setExpandedIndex(idx)}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </div>
  );
}
