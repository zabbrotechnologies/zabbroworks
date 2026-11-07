import React, { useState } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Work');

  const scrollToExplore = () => {
    const el = document.getElementById('works-gallery-start');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    scrollToExplore();
  };

  return (
    <header className="verhost-nav-header">
      <div className="nav-inner-bounds">
        {/* Left: Brand Wordmark */}
        <div className="nav-brand-part">
          <a href="/" className="verhost-logo-text" aria-label="ZABBRO Home">
            <span style={{ letterSpacing: '0.12em', fontWeight: 800 }}>ZABBRO</span>
          </a>
        </div>

        {/* Center: Clean links with active indicator */}
        <nav className="nav-editorial-links">
          {['Work', 'About', 'Services', 'Insights', 'Contact'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`editorial-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleNavClick(tab)}
            >
              {tab}
              {activeTab === tab && <span className="active-nav-line" />}
            </button>
          ))}
        </nav>

        {/* Right: CTA Pill & Circular Menu Icon */}
        <div className="nav-cta-part">
          <button 
            type="button"
            className="start-project-pill-btn"
            onClick={() => {
              alert('ZABBRO Studio Inquiry: Connecting you with our engineering and design leads.');
            }}
          >
            <span>START A PROJECT</span>
            <span className="cta-arrow-icon">↗</span>
          </button>

          <button 
            type="button" 
            className="nav-hamburger-circle-btn" 
            aria-label="Toggle Menu"
            onClick={scrollToExplore}
          >
            <div className="hamburger-icon-lines">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
