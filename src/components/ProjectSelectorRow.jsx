import React, { useState, useEffect } from 'react';
import ProjectCircleItem from './ProjectCircleItem';

export default function ProjectSelectorRow({
  projects,
  rowStartIndex,
  onSelectProject,
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleItemHover = (idx) => {
    if (!isTouch) {
      setExpandedIndex(idx);
    }
  };

  const handleRowLeave = () => {
    if (!isTouch) {
      setExpandedIndex(null);
    }
  };

  const handleItemClick = (project, idx) => {
    if (isTouch) {
      // Touch interaction: first tap expands, second tap launches viewer
      if (expandedIndex === idx) {
        onSelectProject(project);
      } else {
        setExpandedIndex(idx);
      }
    } else {
      // Desktop mouse: clicking opens the viewer
      onSelectProject(project);
    }
  };

  const handleItemTouch = (project, idx, e) => {
    if (expandedIndex === idx) {
      onSelectProject(project);
    } else {
      setExpandedIndex(idx);
    }
  };

  return (
    <div
      className="cinematic-selector-row"
      onMouseLeave={handleRowLeave}
      role="region"
      aria-label={`Project Selector Row ${Math.floor(rowStartIndex / 4) + 1}`}
    >
      <div className="selector-row-track">
        {projects.map((project, idx) => {
          const globalIndex = rowStartIndex + idx;
          const isExpanded = expandedIndex === idx;
          const isAnyExpanded = expandedIndex !== null;

          return (
            <ProjectCircleItem
              key={project.id}
              project={project}
              index={globalIndex}
              rowIndex={idx}
              isExpanded={isExpanded}
              isAnyExpanded={isAnyExpanded}
              onMouseEnter={() => handleItemHover(idx)}
              onMouseLeave={() => {}}
              onClick={() => handleItemClick(project, idx)}
              onTouch={(e) => handleItemTouch(project, idx, e)}
            />
          );
        })}
      </div>
    </div>
  );
}
