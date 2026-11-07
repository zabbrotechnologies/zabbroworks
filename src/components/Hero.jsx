import React from 'react';
import { projects } from '../data/projects';

export default function Hero() {
  const scrollToSection = (sectionSlug) => {
    const el = document.getElementById(`section-${sectionSlug}`) || document.getElementById('works-gallery-start');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { label: 'E-COMMERCE', slug: 'ecommerce' },
    { label: 'BUSINESS', slug: 'business' },
    { label: 'LANDING PAGES', slug: 'landing' },
    { label: 'PORTFOLIO', slug: 'portfolio' },
    { label: 'CREATIVE', slug: 'creative' },
    { label: 'INTERIOR DESIGN', slug: 'interior' },
  ];

  const totalProjectsCount = String(projects.length).padStart(2, '0');

  return (
    <section className="verhost-editorial-hero">
      <div className="hero-inner-bounds">
        {/* Top Eyebrow Tag */}
        <div className="hero-top-eyebrow">
          <span className="eyebrow-text">ZABBRO DIGITAL WORKS</span>
          <span className="eyebrow-dash">——</span>
          <span className="eyebrow-text" style={{ letterSpacing: '0.14em', opacity: 0.85 }}>BUILD • AUTOMATE • EVOLVE</span>
        </div>

        {/* 3-Zone Architecture */}
        <div className="hero-grid-3zone">
          {/* Zone 1: Monumental Display Headline */}
          <div className="hero-headline-zone">
            <h1 className="hero-monumental-heading">
              <span className="hero-line">ELEVATE YOUR</span>
              <span className="hero-line hero-line-accent">DIGITAL PRESENCE.</span>
            </h1>
          </div>

          {/* Zone 2: Curated Description */}
          <div className="hero-statement-zone">
            <p className="hero-curated-paragraph">
              ZABBRO transforms your vision into reality with next-gen web solutions. Combining high-performance web engineering, SEO optimization, and refined design to deliver digital systems that drive growth and engagement.
            </p>
          </div>

          {/* Zone 3: Categories & Live Stat Counter */}
          <div className="hero-stat-zone">
            <div className="hero-category-list">
              {categories.map((cat, i) => (
                <button
                  key={`${cat.slug}-${i}`}
                  type="button"
                  className="hero-category-item"
                  onClick={() => scrollToSection(cat.slug)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-live-counter-block">
              <span className="hero-counter-number">{totalProjectsCount}</span>
              <div className="hero-counter-labels">
                <span>LIVE</span>
                <span>EXPERIENCES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
