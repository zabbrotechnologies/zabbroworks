import React, { useState, useEffect, useRef } from 'react';
import AmbientFluidBackground from './components/AmbientFluidBackground';
import Hero from './components/Hero';
import ProjectShowcase from './components/ProjectShowcase';
import ProjectViewer from './components/ProjectViewer';
import Footer from './components/Footer';
import { projects } from './data/projects';

// Direct store imports for standalone new-tab live website views
import LumoraLivingStore from './projects/ecommerce/lumora-living/LumoraLivingStore';
import ChronixStore from './projects/ecommerce/chronix/ChronixStore';
import GloweStore from './projects/ecommerce/glowe/GloweStore';
import AtelierStudio from './projects/business/atelier/AtelierStudio';
import VerdantSystems from './projects/business/verdant/VerdantSystems';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const isPushedRef = useRef(false);

  // Handle browser Back / Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (selectedProject) {
        // User pressed browser Back button while project was open:
        // Close modal smoothly and stay on the showcase homepage!
        isPushedRef.current = false;
        setSelectedProject(null);
      } else if (window.location.hash.startsWith('#project-')) {
        // User navigated forward to open project
        const hashId = window.location.hash.replace('#project-', '');
        const matching = projects.find((p) => p.id === hashId);
        if (matching) {
          isPushedRef.current = true;
          setSelectedProject(matching);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedProject]);

  // Initial load check for hash (e.g. reload or bookmark)
  useEffect(() => {
    if (window.location.hash.startsWith('#project-')) {
      const hashId = window.location.hash.replace('#project-', '');
      const matching = projects.find((p) => p.id === hashId);
      if (matching) {
        setSelectedProject(matching);
      }
    }
  }, []);

  // Check for standalone view in query parameters (?view=...)
  const searchParams = new URLSearchParams(window.location.search);
  const standaloneId = searchParams.get('view');

  if (standaloneId) {
    if (standaloneId === 'lumora-living') {
      return (
        <div className="standalone-project-container" style={{ background: '#FAF8F5', minHeight: '100vh' }}>
          <LumoraLivingStore />
        </div>
      );
    }
    if (standaloneId === 'chronix') {
      return (
        <div className="standalone-project-container" style={{ background: '#0D0E12', minHeight: '100vh' }}>
          <ChronixStore />
        </div>
      );
    }
    if (standaloneId === 'glowe') {
      return (
        <div className="standalone-project-container" style={{ background: '#FAF7F2', minHeight: '100vh' }}>
          <GloweStore />
        </div>
      );
    }
    if (standaloneId === 'atelier') {
      return (
        <div className="standalone-project-container" style={{ background: '#F4F2F6', minHeight: '100vh' }}>
          <AtelierStudio />
        </div>
      );
    }
    if (standaloneId === 'verdant-systems') {
      return (
        <div className="standalone-project-container" style={{ background: '#090B09', minHeight: '100vh' }}>
          <VerdantSystems />
        </div>
      );
    }
  }

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    isPushedRef.current = true;
    window.history.pushState(
      { zabbroProjectModal: true, projectId: project.id },
      '',
      `#project-${project.id}`
    );
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (isPushedRef.current && window.location.hash.startsWith('#project-')) {
      isPushedRef.current = false;
      window.history.back();
    } else if (window.location.hash.startsWith('#project-')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleNavigateProject = (newProj) => {
    setSelectedProject(newProj);
    window.history.replaceState(
      { zabbroProjectModal: true, projectId: newProj.id },
      '',
      `#project-${newProj.id}`
    );
  };

  return (
    <div className="verhost-app-root">
      {/* Immersive Animated Fluid Gradient Background */}
      <AmbientFluidBackground />

      <div className="verhost-content-layer">
        {/* Editorial Typography Hero */}
        <Hero />

        {/* Main 22-Project Gallery Across 5 Sections */}
        <main id="works-gallery-start">
          <ProjectShowcase
            projects={projects}
            onSelectProject={handleSelectProject}
          />
        </main>

        {/* Editorial Footer */}
        <Footer />
      </div>

      {/* Click-to-Open Website Previewer Modal */}
      {selectedProject && (
        <ProjectViewer
          project={selectedProject}
          projects={projects}
          onClose={handleCloseProject}
          onNavigateProject={handleNavigateProject}
        />
      )}
    </div>
  );
}
