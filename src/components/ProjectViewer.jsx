import React, { useState, useEffect } from 'react';
import ProjectMockup from './ProjectMockup';
import LumoraLivingStore from '../projects/ecommerce/lumora-living/LumoraLivingStore';
import ChronixStore from '../projects/ecommerce/chronix/ChronixStore';
import GloweStore from '../projects/ecommerce/glowe/GloweStore';
import AtelierStudio from '../projects/business/atelier/AtelierStudio';
import VerdantSystems from '../projects/business/verdant/VerdantSystems';

export default function ProjectViewer({ project, projects, onClose, onNavigateProject }) {
  const [viewportMode, setViewportMode] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 'mobile';
      if (window.innerWidth < 1024) return 'tablet';
    }
    return 'desktop';
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const currentIndex = projects.findIndex((p) => p.id === project.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    onNavigateProject(projects[prevIdx]);
    setIframeLoaded(false);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % projects.length;
    onNavigateProject(projects[nextIdx]);
    setIframeLoaded(false);
  };

  // Synchronize fullscreen state with browser changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Lock outer document scrolling completely while viewer modal is mounted
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('verhost-modal-open');
    document.documentElement.classList.add('verhost-modal-open');

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove('verhost-modal-open');
      document.documentElement.classList.remove('verhost-modal-open');
    };
  }, []);

  // Keyboard navigation & Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projects, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const openInNewTab = () => {
    const targetUrl = project.liveUrl || project.demoUrl || `/?view=${project.id}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Viewport width styling
  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'mobile':
        return '390px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  return (
    <div className="verhost-project-viewer-modal" role="dialog" aria-modal="true">
      <div className="viewer-backdrop" onClick={onClose} />

      <div className="viewer-modal-window">
        {/* Top Control Toolbar */}
        <header className="viewer-toolbar">
          {/* Left: Project Identity */}
          <div className="viewer-toolbar-left">
            <span className="viewer-index-label">[{project.number}]</span>
            <h2 className="viewer-project-title">{project.title}</h2>
            <span className="viewer-category-tag">{project.category}</span>
          </div>

          {/* Center: Device Viewport Controls */}
          <div className="viewer-toolbar-center">
            <div className="device-switcher-pill" role="radiogroup" aria-label="Viewport Size">
              <button
                type="button"
                className={`device-btn device-btn-desktop ${viewportMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setViewportMode('desktop')}
                title="Desktop View (100%)"
              >
                <span>Desktop</span>
              </button>
              <button
                type="button"
                className={`device-btn device-btn-tablet ${viewportMode === 'tablet' ? 'active' : ''}`}
                onClick={() => setViewportMode('tablet')}
                title="Tablet View (768px)"
              >
                <span>Tablet</span>
              </button>
              <button
                type="button"
                className={`device-btn device-btn-mobile ${viewportMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setViewportMode('mobile')}
                title="Mobile View (390px)"
              >
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="viewer-toolbar-right">
            <button
              type="button"
              className="viewer-nav-btn"
              onClick={handlePrev}
              title="Previous Project (←)"
            >
              ←
            </button>
            <button
              type="button"
              className="viewer-nav-btn"
              onClick={handleNext}
              title="Next Project (→)"
            >
              →
            </button>

            <button
              type="button"
              className="viewer-action-btn"
              onClick={openInNewTab}
              title="Open Live Website in New Tab"
              aria-label="Open Live Website in New Tab"
            >
              ↗
            </button>

            <button
              type="button"
              className={`viewer-action-btn ${isFullscreen ? 'active-fullscreen' : ''}`}
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}
            >
              {isFullscreen ? '✕' : '⛶'}
            </button>

            <button
              type="button"
              className="viewer-close-btn"
              onClick={onClose}
              title="Close Viewer (Esc)"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Viewport Display Area */}
        <div className="viewer-viewport-stage">
          <div
            className="viewer-container-frame"
            style={{ width: getViewportWidth() }}
          >
            {project.id === 'lumora-living' ? (
              /* LUMORA LIVING: Full Interactive Website Experience */
              <div key={project.id} className="viewer-store-scroll-container">
                <LumoraLivingStore />
                <div className="prototype-specs-drawer lumora-specs-drawer">
                  <div className="spec-item">
                    <span className="spec-label">CLIENT / PRACTICE</span>
                    <span className="spec-val">{project.client}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">YEAR</span>
                    <span className="spec-val">{project.year}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">DELIVERABLES</span>
                    <span className="spec-val">{project.deliverables?.join(', ')}</span>
                  </div>
                </div>
              </div>
            ) : project.id === 'chronix' ? (
              /* CHRONIX: Full Interactive Watch Website Experience */
              <div key={project.id} className="viewer-store-scroll-container">
                <ChronixStore />
                <div className="prototype-specs-drawer chronix-specs-drawer">
                  <div className="spec-item">
                    <span className="spec-label">CLIENT / HOROLOGY</span>
                    <span className="spec-val">{project.client}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">YEAR</span>
                    <span className="spec-val">{project.year}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">DELIVERABLES</span>
                    <span className="spec-val">{project.deliverables?.join(', ')}</span>
                  </div>
                </div>
              </div>
            ) : project.id === 'glowe' ? (
              /* GLOWÉ: Full Interactive Botanical Skincare Website Experience */
              <div key={project.id} className="viewer-store-scroll-container">
                <GloweStore />
                <div className="prototype-specs-drawer glowe-specs-drawer">
                  <div className="spec-item">
                    <span className="spec-label">CLIENT / BOTANICAL LAB</span>
                    <span className="spec-val">{project.client}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">YEAR</span>
                    <span className="spec-val">{project.year}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">DELIVERABLES</span>
                    <span className="spec-val">{project.deliverables?.join(', ')}</span>
                  </div>
                </div>
              </div>
            ) : project.id === 'atelier' ? (
              /* ATELIER: Full Interactive Architecture Studio Website Experience */
              <div key={project.id} className="viewer-store-scroll-container">
                <AtelierStudio />
                <div className="prototype-specs-drawer atelier-specs-drawer">
                  <div className="spec-item">
                    <span className="spec-label">CLIENT / STUDIO</span>
                    <span className="spec-val">{project.client}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">YEAR</span>
                    <span className="spec-val">{project.year}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">DELIVERABLES</span>
                    <span className="spec-val">{project.deliverables?.join(', ')}</span>
                  </div>
                </div>
              </div>
            ) : project.id === 'verdant-systems' ? (
              /* VERDANT SYSTEMS: Full Interactive Climate Technology Website Experience */
              <div key={project.id} className="viewer-store-scroll-container">
                <VerdantSystems />
                <div className="prototype-specs-drawer verdant-specs-drawer">
                  <div className="spec-item">
                    <span className="spec-label">CLIENT / ENTERPRISE</span>
                    <span className="spec-val">{project.client}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">YEAR</span>
                    <span className="spec-val">{project.year}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">DELIVERABLES</span>
                    <span className="spec-val">{project.deliverables?.join(', ')}</span>
                  </div>
                </div>
              </div>
            ) : project.demoUrl ? (
              <div className="viewer-iframe-wrapper">
                {!iframeLoaded && (
                  <div className="viewer-loading-skeleton">
                    <div className="loading-spinner" />
                    <span>Loading Live Website Experience...</span>
                  </div>
                )}
                <iframe
                  src={project.demoUrl}
                  title={project.title}
                  className="viewer-live-iframe"
                  onLoad={() => setIframeLoaded(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            ) : (
              /* Fallback for projects with prototypes pending live build */
              <div key={project.id} className="viewer-prototype-wrapper">
                <div className="prototype-status-banner">
                  <span className="pulse-green-dot" />
                  <span>Interactive High-Fidelity Prototype • Live Website Integration Coming Soon</span>
                </div>
                <div className="prototype-mockup-container">
                  <ProjectMockup project={project} isExpanded={true} />
                </div>
                <div className="prototype-specs-drawer">
                  <div className="spec-item">
                    <span className="spec-label">CLIENT / PRACTICE</span>
                    <span className="spec-val">{project.client}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">YEAR</span>
                    <span className="spec-val">{project.year}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">DELIVERABLES</span>
                    <span className="spec-val">{project.deliverables?.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
