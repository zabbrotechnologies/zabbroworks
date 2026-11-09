import React from 'react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="verhost-editorial-footer">
      <div className="footer-inner-container">
        <div className="footer-top-row">
          <div className="footer-brand-column">
            <span className="footer-wordmark">ZABBRO</span>
            <p className="footer-description">
              Transforming vision into reality with next-gen web solutions, custom design, SEO optimization, and 24/7 support tailored to modern business needs.
            </p>
          </div>

          <div className="footer-nav-column">
            <span className="footer-col-title">ARCHIVE SECTIONS</span>
            <a href="#section-ecommerce">01 —— E-COMMERCE</a>
            <a href="#section-business">02 —— BUSINESS</a>
            <a href="#section-landing">03 —— LANDING PAGES</a>
            <a href="#section-portfolio">04 —— PORTFOLIO</a>
            <a href="#section-creative">05 —— CREATIVE</a>
            <a href="#section-interior">06 —— INTERIOR DESIGN</a>
          </div>

          <div className="footer-contact-column">
            <span className="footer-col-title">STUDIO INQUIRIES</span>
            <p className="footer-contact-email">
              <a href="mailto:zabbrotechnologies@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                zabbrotechnologies@gmail.com
              </a>
            </p>
            <p className="footer-contact-cities">zabbro.space · New York · London · Tokyo · Chennai</p>
            <button type="button" className="footer-back-to-top" onClick={scrollToTop}>
              <span>BACK TO TOP</span>
              <span className="arrow-up-symbol">↑</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>© 2026 ZABBRO DIGITAL WORKS. ALL RIGHTS RESERVED.</span>
          <span>BUILD • AUTOMATE • EVOLVE × NEXT-GEN WEB SOLUTIONS</span>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
