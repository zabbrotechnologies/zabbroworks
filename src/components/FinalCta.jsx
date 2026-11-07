import React from 'react';

export default function FinalCta({ onOpenContact }) {
  return (
    <section className="final-cta-section" aria-label="Final Call to Action">
      <div className="cta-eyebrow">Have a project in mind?</div>

      <h2 className="cta-headline">
        <span className="line-break">LET'S BUILD</span>
        <span className="line-break">WHAT'S NEXT.</span>
      </h2>

      <button
        type="button"
        className="cta-action-btn"
        onClick={onOpenContact}
        aria-label="Start a project with ZABBRO"
      >
        <span>Start a project</span>
        <span className="arrow-icon">↗</span>
      </button>
    </section>
  );
}
