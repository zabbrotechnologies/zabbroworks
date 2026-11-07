import React, { useState, useEffect } from 'react';

export default function EditorialModal({ isOpen, mode, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', scope: '', message: '' });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2400);
  };

  return (
    <div
      className="editorial-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="editorial-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-trigger"
          onClick={onClose}
          aria-label="Close dialog"
        >
          &times;
        </button>

        {mode === 'about' ? (
          <div>
            <div className="modal-label">Studio Monograph</div>
            <h2 className="modal-title">Engineering Digital Presence with Art-Directed Rigour.</h2>
            <div className="modal-body-text">
              <p style={{ marginBottom: '1.25rem' }}>
                ZABBRO is an independent digital practice operating at the convergence of pure typography, architectural whitespace, and high-performance web engineering.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                We believe websites are physical artifacts manifested through digital light. We reject the homogeneity of template dashboards and disposable UI frameworks in favor of bespoke, deliberate interactive pieces built to endure.
              </p>
              <p>
                Our commissions span contemporary fashion houses, structural architecture practices, venture capital funds, and generative artists across Europe, North America, and Asia.
              </p>
            </div>
            <button
              type="button"
              className="modal-submit-btn"
              onClick={onClose}
            >
              <span>Return to Archive</span>
              <span>&rarr;</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="modal-label">Initiate Commission</div>
            <h2 className="modal-title">Start a Project</h2>
            <p className="modal-body-text" style={{ marginBottom: '1.5rem' }}>
              We collaborate with ambitious founders and creative directors globally. Tell us about your vision and timeline.
            </p>

            {submitted ? (
              <div style={{ padding: '2rem 0', color: 'var(--accent-soft-green)', fontWeight: 600 }}>
                &check; Thank you. Your inquiry has been received. The ZABBRO team will review and respond within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="modal-form-group">
                  <label className="modal-label-input" htmlFor="clientName">Name &amp; Organization</label>
                  <input
                    id="clientName"
                    type="text"
                    required
                    className="modal-input"
                    placeholder="e.g. Maya Chen &mdash; Studio Kinetix"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="modal-form-group">
                  <label className="modal-label-input" htmlFor="clientEmail">Email</label>
                  <input
                    id="clientEmail"
                    type="email"
                    required
                    className="modal-input"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="modal-form-group">
                  <label className="modal-label-input" htmlFor="clientScope">Project Scope / Category</label>
                  <input
                    id="clientScope"
                    type="text"
                    className="modal-input"
                    placeholder="e.g. Flagship E-Commerce, Architectural Monograph, Interactive Web"
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  />
                </div>

                <div className="modal-form-group">
                  <label className="modal-label-input" htmlFor="clientMessage">Brief Overview</label>
                  <textarea
                    id="clientMessage"
                    rows="3"
                    required
                    className="modal-textarea"
                    placeholder="Goals, target release window, and design aspirations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="modal-submit-btn">
                  <span>Send Inquiry</span>
                  <span className="arrow-icon">↗</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
