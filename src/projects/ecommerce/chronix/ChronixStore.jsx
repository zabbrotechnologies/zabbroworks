import React, { useState, useMemo } from 'react';
import './chronix.css';

// Chronix Watch Catalogue Data
const WATCHES = [
  {
    id: 'chronix-obsidian',
    name: 'Chronix Obsidian Automatic',
    collection: 'automatic',
    collectionLabel: 'Automatic Classics',
    price: 2850,
    caseMaterial: 'Grade 5 DLC Titanium',
    calibre: 'Calibre CX-90 Automatic',
    diameter: '41mm',
    powerReserve: '72 Hours',
    waterResistance: '100m / 10 ATM',
    crystal: 'Anti-Reflective Sapphire',
    strap: 'Solid Titanium Link Bracelet with Micro-Adjust Clasp',
    image: '/projects/chronix/watch-obsidian.jpg',
    badge: 'Flagship Edition',
    description: 'An architectural expression of stealth luxury. Forged from aerospace-grade Grade 5 titanium with diamond-like carbon coating and an ultra-deep charcoal dial with hand-applied luminescent indices.'
  },
  {
    id: 'chronix-chrono-pro',
    name: 'Chronix Chrono-Steel Pro',
    collection: 'chronograph',
    collectionLabel: 'Chronograph Series',
    price: 3400,
    caseMaterial: '316L Brushed & Polished Stainless Steel',
    calibre: 'Calibre CX-300 Column-Wheel Chrono',
    diameter: '42mm',
    powerReserve: '60 Hours',
    waterResistance: '150m / 15 ATM',
    crystal: 'Double-Domed Sapphire Crystal',
    strap: 'Integrated 3-Link Steel Bracelet',
    image: '/projects/chronix/watch-chrono-pro.jpg',
    badge: 'Bestseller',
    description: 'Engineered for split-second mechanical measurement. Features high-beat column-wheel chronograph pushers, tachymeter bezel, and triple sub-dial counters with sunray guilloche finishing.'
  },
  {
    id: 'chronix-stealth-diver',
    name: 'Chronix Stealth Diver 300M',
    collection: 'essential',
    collectionLabel: 'The Essential Collection',
    price: 2450,
    caseMaterial: 'Matte Bead-Blasted 904L Steel',
    calibre: 'Calibre CX-28 Chronometer Certified',
    diameter: '40mm',
    powerReserve: '48 Hours',
    waterResistance: '300m / 30 ATM',
    crystal: 'Flat 4.5mm Scratchproof Sapphire',
    strap: 'FKM Vulcanized Tactical Rubber & Steel Buckle',
    image: '/projects/chronix/watch-diver.jpg',
    badge: 'COSC Certified',
    description: 'Deep-ocean reliability paired with restrained monochrome aesthetics. Unidirectional 120-click ceramic bezel, automatic helium escape valve, and Super-LumiNova BGW9 night visibility.'
  },
  {
    id: 'chronix-heritage-silver',
    name: 'Chronix Heritage Silver Dial',
    collection: 'essential',
    collectionLabel: 'The Essential Collection',
    price: 1980,
    caseMaterial: 'High-Polish 316L Stainless Steel',
    calibre: 'Calibre CX-10 Slimline Automatic',
    diameter: '39mm',
    powerReserve: '50 Hours',
    waterResistance: '50m / 5 ATM',
    crystal: 'Box-Domed Sapphire Crystal',
    strap: 'Full-Grain Black Horween Leather Strap',
    image: '/projects/chronix/watch-heritage.jpg',
    badge: 'Heritage',
    description: 'Timeless mid-century proportions refined for modern connoisseurs. Opalescent silver sunburst dial, faceted blued-steel hands, and an ultra-thin 9.4mm case profile.'
  },
  {
    id: 'chronix-tourbillon-monolith',
    name: 'Chronix Tourbillon Monolith',
    collection: 'automatic',
    collectionLabel: 'Automatic Classics',
    price: 7200,
    caseMaterial: 'Brushed Tantalum & Titanium Composite',
    calibre: 'Calibre CX-Tourbillon Manual Wind',
    diameter: '43mm',
    powerReserve: '72 Hours',
    waterResistance: '50m / 5 ATM',
    crystal: 'Dual Exhibition Sapphire Front & Caseback',
    strap: 'Hand-Stitched Matte Alligator Grain Strap',
    image: '/projects/chronix/watch-tourbillon.jpg',
    badge: 'Limited to 50 Pieces',
    description: 'Haute horlogerie showcase featuring a 60-second flying tourbillon cage at 6 o’clock, skeletonized black-coated bridges, and hand-chamfered anglage.'
  },
  {
    id: 'chronix-chrono-carbon',
    name: 'Chronix Eclipse GMT Carbon',
    collection: 'chronograph',
    collectionLabel: 'Chronograph Series',
    price: 3900,
    caseMaterial: 'Forged Carbon Fiber & Titanium',
    calibre: 'Calibre CX-GMT Dual-Time Automatic',
    diameter: '41.5mm',
    powerReserve: '65 Hours',
    waterResistance: '200m / 20 ATM',
    crystal: 'Anti-Glare Sapphire Crystal',
    strap: 'Ballistic Cordura Hybrid Strap',
    image: '/projects/chronix/flagship-watch.jpg',
    badge: 'New 2026',
    description: 'Every forged carbon case features a completely unique marbled grain pattern. Features independent jumping hour 24-hour GMT hand for tracking international timezones.'
  }
];

export default function ChronixStore() {
  const [activeCollection, setActiveCollection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [cart, setCart] = useState([
    { ...WATCHES[0], quantity: 1 }
  ]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Cart totals
  const totalCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToBag = (watch) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === watch.id);
      if (existing) {
        return prev.map((item) =>
          item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...watch, quantity: 1 }];
    });
    showToast(`Added "${watch.name}" to shopping bag`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Timepiece removed from bag');
  };

  // Filter watches
  const filteredWatches = useMemo(() => {
    return WATCHES.filter((watch) => {
      const matchesCollection =
        activeCollection === 'all' || watch.collection === activeCollection;
      const matchesSearch =
        !searchQuery.trim() ||
        watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        watch.caseMaterial.toLowerCase().includes(searchQuery.toLowerCase()) ||
        watch.calibre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        watch.collectionLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCollection && matchesSearch;
    });
  }, [activeCollection, searchQuery]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleCollectionFilter = (slug) => {
    setActiveCollection(slug);
    scrollTo('chronix-catalogue-section');
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubmitted(true);
      showToast('Thank you for subscribing to the Chronix Gazette');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="chronix-store-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="chronix-toast" role="status">
          <svg className="toast-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header & Navigation (Monochrome Reference Style) */}
      <header className="chronix-header">
        <div className="chronix-header-inner">
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="chronix-mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Brand Wordmark (Exact Reference Match) */}
          <div className="chronix-brand-mark" onClick={() => scrollTo('chronix-hero')}>
            <span className="brand-logo-text">CHRONIX</span>
            <span className="brand-tagline">GENÈVE • HAUTE HORLOGERIE</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="chronix-desktop-nav">
            <button type="button" className="chronix-nav-link" onClick={() => scrollTo('chronix-hero')}>
              Home
            </button>
            <button type="button" className="chronix-nav-link" onClick={() => { setActiveCollection('all'); scrollTo('chronix-catalogue-section'); }}>
              Watches
            </button>
            <button type="button" className="chronix-nav-link" onClick={() => scrollTo('chronix-collections-section')}>
              Collections
            </button>
            <button type="button" className="chronix-nav-link" onClick={() => scrollTo('chronix-discovery-section')}>
              Our Story
            </button>
            <button type="button" className="chronix-nav-link" onClick={() => scrollTo('chronix-story-section')}>
              Journal
            </button>
          </nav>

          {/* Header Actions: Search, Shopping Bag, "Shop Now" Pill Button */}
          <div className="chronix-header-actions">
            {/* Live Search Input */}
            <div className="chronix-search-box">
              <svg className="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search calibre, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="chronix-search-field"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-reset-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Bag Button */}
            <button
              type="button"
              className="chronix-bag-trigger-btn"
              onClick={() => setIsBagOpen(true)}
              aria-label="View shopping bag"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="bag-counter-pill">{totalCount}</span>
            </button>

            {/* "Shop Now" Pill Button from Reference */}
            <button
              type="button"
              className="chronix-header-cta-pill"
              onClick={() => scrollTo('chronix-catalogue-section')}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="chronix-mobile-dropdown">
            <div className="mobile-search-wrapper">
              <input
                type="text"
                placeholder="Search watches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mobile-nav-items">
              <button type="button" onClick={() => scrollTo('chronix-hero')}>Home</button>
              <button type="button" onClick={() => { setActiveCollection('all'); scrollTo('chronix-catalogue-section'); }}>All Timepieces</button>
              <button type="button" onClick={() => { setActiveCollection('chronograph'); scrollTo('chronix-catalogue-section'); }}>Chronograph Series</button>
              <button type="button" onClick={() => { setActiveCollection('automatic'); scrollTo('chronix-catalogue-section'); }}>Automatic Classics</button>
              <button type="button" onClick={() => scrollTo('chronix-discovery-section')}>Design &amp; Calibre</button>
              <button type="button" onClick={() => scrollTo('chronix-flagship-section')}>Flagship Edition</button>
              <button type="button" onClick={() => scrollTo('chronix-story-section')}>Brand Story</button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="chronix-main-body">
        {/* 2. Hero Section (Recreates the Exact Reference Composition) */}
        <section className="chronix-hero" id="chronix-hero">
          <div className="chronix-hero-canvas">
            {/* Background Ambient Glow */}
            <div className="hero-ambient-glow" />

            <div className="chronix-hero-grid">
              {/* Left Side: Editorial Typography & Actions */}
              <div className="hero-editorial-column">
                <div className="hero-editorial-label">
                  <span className="label-pulse-dot" />
                  <span>SWISS CALIBRE HOROLOGY / 2026</span>
                </div>

                <h1 className="hero-serif-headline">
                  CRAFTED<br />
                  FOR TIMELESS<br />
                  MOMENTS
                </h1>

                <p className="hero-supporting-lead">
                  Engineered with uncompromising Swiss calibre precision, aerospace-grade titanium,
                  and hand-finished dials to define the pinnacle of modern luxury horology.
                </p>

                <div className="hero-actions-row">
                  <button
                    type="button"
                    className="hero-pill-cta"
                    onClick={() => scrollTo('chronix-catalogue-section')}
                  >
                    Discover the Collection
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="hero-secondary-link"
                    onClick={() => scrollTo('chronix-discovery-section')}
                  >
                    The Calibre Story ↗
                  </button>
                </div>

                {/* Key Spec Badges Strip */}
                <div className="hero-specs-strip">
                  <div className="spec-item-badge">
                    <span className="spec-item-num">01</span>
                    <div className="spec-item-copy">
                      <span className="spec-item-title">Grade 5 Titanium</span>
                      <span className="spec-item-sub">Aerospace Architecture</span>
                    </div>
                  </div>
                  <div className="spec-item-badge">
                    <span className="spec-item-num">02</span>
                    <div className="spec-item-copy">
                      <span className="spec-item-title">Calibre CX-90</span>
                      <span className="spec-item-sub">Swiss Automatic 28,800 vph</span>
                    </div>
                  </div>
                  <div className="spec-item-badge">
                    <span className="spec-item-num">03</span>
                    <div className="spec-item-copy">
                      <span className="spec-item-title">72h Reserve</span>
                      <span className="spec-item-sub">Twin-Barrel Power</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Prominent Photorealistic Luxury Watch */}
              <div className="hero-visual-column">
                <div className="hero-watch-stage">
                  {/* Background showcases the Roger Dubuis luxury skeleton timepiece */}
                  {/* Subtle Floating Lookbook Badge */}
                  <div className="hero-floating-watch-badge">
                    <span className="floating-badge-tag">CHRONIX MONOLITH CX-1</span>
                    <span className="floating-badge-val">DLC Titanium Case • 41mm</span>
                    <span className="floating-badge-price">$2,850 USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Collections Section */}
        <section className="chronix-collections-section" id="chronix-collections-section">
          <div className="chronix-section-header">
            <span className="section-pre-title">HOROLOGICAL DISCIPLINES</span>
            <h2 className="section-main-heading">Featured Collections</h2>
            <p className="section-description-text">
              Each series represents a dedicated mastery of mechanical horology, from ultra-slim dress silhouettes to high-beat chronographs.
            </p>
          </div>

          <div className="collections-trio-grid">
            {/* Collection 1 */}
            <div
              className="collection-card"
              onClick={() => handleCollectionFilter('essential')}
              role="button"
              tabIndex={0}
            >
              <div className="collection-img-wrapper">
                <img
                  src="/projects/chronix/collection-essential.jpg"
                  alt="The Essential Collection"
                  className="collection-photo"
                  loading="lazy"
                />
                <div className="collection-scrim" />
              </div>
              <div className="collection-details">
                <span className="collection-badge-tag">SERIES 01</span>
                <h3 className="collection-title">The Essential Collection</h3>
                <p className="collection-desc">
                  Minimalist automatic timepieces engineered for understated everyday sophistication with ultra-thin profiles.
                </p>
                <span className="collection-cta-link">
                  Explore Essential Pieces
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Collection 2 */}
            <div
              className="collection-card"
              onClick={() => handleCollectionFilter('chronograph')}
              role="button"
              tabIndex={0}
            >
              <div className="collection-img-wrapper">
                <img
                  src="/projects/chronix/collection-chrono.jpg"
                  alt="Chronograph Series"
                  className="collection-photo"
                  loading="lazy"
                />
                <div className="collection-scrim" />
              </div>
              <div className="collection-details">
                <span className="collection-badge-tag">SERIES 02</span>
                <h3 className="collection-title">Chronograph Series</h3>
                <p className="collection-desc">
                  Split-second column-wheel timing instruments designed for high-performance mechanical measurement and motor racing heritage.
                </p>
                <span className="collection-cta-link">
                  Explore Chronographs
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Collection 3 */}
            <div
              className="collection-card"
              onClick={() => handleCollectionFilter('automatic')}
              role="button"
              tabIndex={0}
            >
              <div className="collection-img-wrapper">
                <img
                  src="/projects/chronix/watch-tourbillon.jpg"
                  alt="Automatic Classics"
                  className="collection-photo"
                  loading="lazy"
                />
                <div className="collection-scrim" />
              </div>
              <div className="collection-details">
                <span className="collection-badge-tag">SERIES 03</span>
                <h3 className="collection-title">Automatic Classics</h3>
                <p className="collection-desc">
                  Exhibition caseback calibres and openworked skeleton dials that celebrate centuries of hand-adjusted Swiss escapements.
                </p>
                <span className="collection-cta-link">
                  Explore Automatics
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Bestselling Watches Grid */}
        <section className="chronix-catalogue-section" id="chronix-catalogue-section">
          <div className="catalogue-top-bar">
            <div>
              <span className="section-pre-title">SWISS CALIBRE CATALOGUE</span>
              <h2 className="section-main-heading">Bestselling Timepieces</h2>
            </div>

            {/* Category Filter Pills */}
            <div className="catalogue-filter-pills" role="tablist">
              <button
                type="button"
                className={`filter-btn-pill ${activeCollection === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveCollection('all')}
              >
                All Timepieces ({WATCHES.length})
              </button>
              <button
                type="button"
                className={`filter-btn-pill ${activeCollection === 'chronograph' ? 'is-active' : ''}`}
                onClick={() => setActiveCollection('chronograph')}
              >
                Chronograph
              </button>
              <button
                type="button"
                className={`filter-btn-pill ${activeCollection === 'automatic' ? 'is-active' : ''}`}
                onClick={() => setActiveCollection('automatic')}
              >
                Automatic
              </button>
              <button
                type="button"
                className={`filter-btn-pill ${activeCollection === 'essential' ? 'is-active' : ''}`}
                onClick={() => setActiveCollection('essential')}
              >
                The Essential
              </button>
            </div>
          </div>

          {/* Active Search Banner */}
          {searchQuery && (
            <div className="catalogue-search-status">
              <span>Displaying {filteredWatches.length} timepieces matching &ldquo;{searchQuery}&rdquo;</span>
              <button type="button" onClick={() => setSearchQuery('')}>Reset Filter</button>
            </div>
          )}

          {/* Watch Product Cards Grid */}
          <div className="chronix-products-grid">
            {filteredWatches.map((watch) => (
              <div key={watch.id} className="chronix-product-card">
                <div className="product-image-box">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="product-card-photo"
                    loading="lazy"
                  />
                  {watch.badge && (
                    <span className="product-tag-badge">{watch.badge}</span>
                  )}
                  {/* Quick View Button */}
                  <button
                    type="button"
                    className="product-quick-view-btn"
                    onClick={() => setSelectedWatch(watch)}
                  >
                    Quick Specifications
                  </button>
                </div>

                <div className="product-info-panel">
                  <div className="product-meta-header">
                    <span className="product-collection-tag">{watch.collectionLabel}</span>
                    <span className="product-price-val">${watch.price.toLocaleString()} USD</span>
                  </div>

                  <h3 className="product-model-name" onClick={() => setSelectedWatch(watch)}>
                    {watch.name}
                  </h3>

                  <p className="product-calibre-specs">
                    {watch.caseMaterial} • {watch.diameter} • {watch.calibre}
                  </p>

                  <div className="product-card-footer">
                    <button
                      type="button"
                      className="product-add-bag-btn"
                      onClick={() => addToBag(watch)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Add to Bag
                    </button>

                    <button
                      type="button"
                      className="product-details-link-btn"
                      onClick={() => setSelectedWatch(watch)}
                    >
                      View Specs ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWatches.length === 0 && (
            <div className="catalogue-empty-state">
              <p>No timepieces match your current selection.</p>
              <button
                type="button"
                className="hero-pill-cta"
                onClick={() => { setActiveCollection('all'); setSearchQuery(''); }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* 5. Watch Discovery & Craftsmanship Section */}
        <section className="chronix-discovery-section" id="chronix-discovery-section">
          <div className="discovery-inner-grid">
            <div className="discovery-text-col">
              <span className="section-pre-title">ATELIER PHILOSOPHY &amp; ENGINEERING</span>
              <h2 className="discovery-serif-title">
                The Science of<br />
                <em>Micro-Mechanical Art</em>
              </h2>
              <p className="discovery-lead-text">
                Every Chronix timepiece is conceived as an architectural monument on the wrist.
                We merge traditional Geneva hand-finishing with aerospace-grade metallurgy.
              </p>

              <div className="discovery-pillars-list">
                <div className="pillar-row">
                  <div className="pillar-icon-box">01</div>
                  <div>
                    <h4 className="pillar-heading">Grade 5 Aerospace Titanium</h4>
                    <p className="pillar-desc">
                      Twice as strong as stainless steel with half the weight. Finished with diamond-like carbon (DLC) coating for exceptional scratch resistance.
                    </p>
                  </div>
                </div>

                <div className="pillar-row">
                  <div className="pillar-icon-box">02</div>
                  <div>
                    <h4 className="pillar-heading">Swiss In-House Calibres</h4>
                    <p className="pillar-desc">
                      High-beat movements operating at 28,800 vibrations per hour (4Hz) for gliding sweep hands and chronometer-grade ±2 seconds per day timing.
                    </p>
                  </div>
                </div>

                <div className="pillar-row">
                  <div className="pillar-icon-box">03</div>
                  <div>
                    <h4 className="pillar-heading">Hand-Applied Anglage &amp; Côtes de Genève</h4>
                    <p className="pillar-desc">
                      Every bridge, wheel, and counterweight is chamfered and polished by master artisans under 20x optical magnification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="discovery-visual-col">
              <div className="discovery-image-card">
                <img
                  src="/projects/chronix/craft-movement.jpg"
                  alt="Swiss mechanical movement craftsmanship"
                  className="discovery-photo"
                  loading="lazy"
                />
                <div className="discovery-floating-stat">
                  <span className="stat-num">28,800</span>
                  <span className="stat-label">Vibrations Per Hour Precision</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Signature Flagship Spotlight Feature */}
        <section className="chronix-flagship-section" id="chronix-flagship-section">
          <div className="flagship-container-box">
            <div className="flagship-media-side">
              <img
                src="/projects/chronix/flagship-watch.jpg"
                alt="Chronix Obsidian Flagship Edition"
                className="flagship-photo"
                loading="lazy"
              />
              <div className="flagship-scrim-overlay" />
            </div>

            <div className="flagship-content-side">
              <span className="section-pre-title">SIGNATURE FLAGSHIP SPOTLIGHT</span>
              <h2 className="flagship-serif-heading">Chronix Obsidian Automatic</h2>
              <span className="flagship-edition-label">Calibre CX-90 Flagship Reference • $2,850 USD</span>

              <p className="flagship-summary-paragraph">
                The definitive expression of modern dark luxury horology. Machined from a single block
                of forged titanium, featuring a diamond-hard DLC stealth treatment and double anti-reflective
                sapphire crystal for an unobstructed view into pure mechanical artistry.
              </p>

              {/* Technical Specifications Grid */}
              <div className="flagship-specs-matrix">
                <div className="spec-matrix-cell">
                  <span className="spec-matrix-label">CASE DIAMETER</span>
                  <span className="spec-matrix-val">41.0 mm</span>
                </div>
                <div className="spec-matrix-cell">
                  <span className="spec-matrix-label">CASE THICKNESS</span>
                  <span className="spec-matrix-val">10.8 mm</span>
                </div>
                <div className="spec-matrix-cell">
                  <span className="spec-matrix-label">MOVEMENT</span>
                  <span className="spec-matrix-val">Automatic CX-90</span>
                </div>
                <div className="spec-matrix-cell">
                  <span className="spec-matrix-label">POWER RESERVE</span>
                  <span className="spec-matrix-val">72 Hours</span>
                </div>
                <div className="spec-matrix-cell">
                  <span className="spec-matrix-label">WATER RATING</span>
                  <span className="spec-matrix-val">100m / 10 ATM</span>
                </div>
                <div className="spec-matrix-cell">
                  <span className="spec-matrix-label">WARRANTY</span>
                  <span className="spec-matrix-val">5-Year Global</span>
                </div>
              </div>

              <div className="flagship-actions-group">
                <button
                  type="button"
                  className="flagship-primary-btn"
                  onClick={() => addToBag(WATCHES[0])}
                >
                  Acquire Flagship Timepiece • $2,850
                </button>
                <button
                  type="button"
                  className="flagship-secondary-btn"
                  onClick={() => setSelectedWatch(WATCHES[0])}
                >
                  View Full Technical Dossier
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Brand Story & Horological Heritage */}
        <section className="chronix-story-section" id="chronix-story-section">
          <div className="story-header-wrap">
            <span className="section-pre-title">HERITAGE &amp; ATELIER</span>
            <h2 className="section-main-heading">Defined by Every Second</h2>
            <p className="story-quote">
              &ldquo;We do not merely assemble instruments to measure time. We craft mechanical heirlooms
              that anchor human memories across generations.&rdquo;
            </p>
            <span className="quote-author">— Antoine Chronix, Master Horologist &amp; Founder</span>
          </div>

          <div className="story-features-row">
            <div className="story-feature-card">
              <span className="story-feature-num">01</span>
              <h3 className="story-feature-title">Geneva Atelier</h3>
              <p className="story-feature-text">
                Hand-assembled in our independent manufacture in Meyrin, Geneva. Every movement undergoes 1,000 hours of rigorous chronometric certification before release.
              </p>
            </div>

            <div className="story-feature-card">
              <span className="story-feature-num">02</span>
              <h3 className="story-feature-title">Numbered Limited Runs</h3>
              <p className="story-feature-text">
                To guarantee uncompromised tactile perfection, our annual production is strictly restricted to fewer than 1,200 timepieces worldwide.
              </p>
            </div>

            <div className="story-feature-card">
              <span className="story-feature-num">03</span>
              <h3 className="story-feature-title">Five-Year Global Care</h3>
              <p className="story-feature-text">
                Every Chronix includes international concierge servicing, complimentary pressure re-testing, and complete movement overhauls for five full years.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Editorial Footer & Newsletter */}
      <footer className="chronix-footer">
        <div className="chronix-footer-top">
          {/* Newsletter Column */}
          <div className="footer-newsletter-col">
            <span className="footer-brand-title">CHRONIX</span>
            <p className="footer-brand-sub">
              Haute Horlogerie manufacture dedicated to high-performance mechanical timepieces and monochrome architectural beauty.
            </p>

            <form className="chronix-newsletter-form" onSubmit={handleNewsletter}>
              <span className="newsletter-caption">The Chronix Horology Gazette</span>
              <div className="newsletter-input-box">
                <input
                  type="email"
                  placeholder="Enter your private email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit">Join</button>
              </div>
              {newsletterSubmitted && (
                <span className="newsletter-confirmation">You have been registered for private collector previews.</span>
              )}
            </form>
          </div>

          {/* Links Columns */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Collections</h4>
            <ul>
              <li><button type="button" onClick={() => handleCollectionFilter('all')}>All Watches</button></li>
              <li><button type="button" onClick={() => handleCollectionFilter('chronograph')}>Chronograph Series</button></li>
              <li><button type="button" onClick={() => handleCollectionFilter('automatic')}>Automatic Classics</button></li>
              <li><button type="button" onClick={() => handleCollectionFilter('essential')}>The Essential Series</button></li>
              <li><button type="button" onClick={() => scrollTo('chronix-flagship-section')}>Flagship Edition</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Client Services</h4>
            <ul>
              <li><button type="button" onClick={() => showToast('Insured armored courier delivery on all orders')}>Armored Delivery</button></li>
              <li><button type="button" onClick={() => showToast('Five-year comprehensive movement warranty registered at purchase')}>5-Year Warranty</button></li>
              <li><button type="button" onClick={() => showToast('Bespoke strap sizing and custom engraving available via concierge')}>Custom Engraving</button></li>
              <li><button type="button" onClick={() => showToast('Boutique appointment requests: concierge@chronix.ch')}>Boutique Appointments</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Manufacture &amp; Salons</h4>
            <div className="salon-address">
              <strong>Geneva Atelier</strong>
              <span>Rue du Rhône 42, 1204 Genève</span>
            </div>
            <div className="salon-address">
              <strong>Tokyo Salon</strong>
              <span>Ginza 6-Chome, Chuo-ku, Tokyo 104-0061</span>
            </div>
            <div className="salon-address">
              <strong>New York Gallery</strong>
              <span>740 Madison Avenue, New York, NY 10065</span>
            </div>
          </div>
        </div>

        <div className="chronix-footer-bottom">
          <span className="copyright-text">© 2026 CHRONIX HORLOGERIE GENÈVE S.A. ALL RIGHTS RESERVED.</span>
          <div className="legal-links-row">
            <span>CHRONOMETRIC ACCREDITATION</span>
            <span>PRIVACY CHARTER</span>
            <span>TERMS OF ACQUISITION</span>
          </div>
        </div>
      </footer>

      {/* Product Quick-View Technical Modal */}
      {selectedWatch && (
        <div className="chronix-modal-backdrop" onClick={() => setSelectedWatch(null)}>
          <div className="chronix-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedWatch(null)}
              aria-label="Close watch details"
            >
              ✕
            </button>

            <div className="modal-content-grid">
              <div className="modal-photo-col">
                <img src={selectedWatch.image} alt={selectedWatch.name} className="modal-photo" />
                <span className="modal-badge-overlay">{selectedWatch.badge}</span>
              </div>

              <div className="modal-info-col">
                <span className="modal-collection-label">{selectedWatch.collectionLabel}</span>
                <h3 className="modal-watch-name">{selectedWatch.name}</h3>
                <span className="modal-watch-price">${selectedWatch.price.toLocaleString()} USD</span>

                <p className="modal-watch-desc">{selectedWatch.description}</p>

                <div className="modal-specs-table">
                  <div className="modal-spec-row">
                    <span>Case Material</span>
                    <strong>{selectedWatch.caseMaterial}</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Calibre Movement</span>
                    <strong>{selectedWatch.calibre}</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Diameter</span>
                    <strong>{selectedWatch.diameter}</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Power Reserve</span>
                    <strong>{selectedWatch.powerReserve}</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Water Resistance</span>
                    <strong>{selectedWatch.waterResistance}</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Crystal</span>
                    <strong>{selectedWatch.crystal}</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Bracelet / Clasp</span>
                    <strong>{selectedWatch.strap}</strong>
                  </div>
                </div>

                <div className="modal-actions-row">
                  <button
                    type="button"
                    className="modal-add-bag-btn"
                    onClick={() => { addToBag(selectedWatch); setSelectedWatch(null); }}
                  >
                    Add to Bag • ${selectedWatch.price.toLocaleString()}
                  </button>
                  <button
                    type="button"
                    className="modal-concierge-btn"
                    onClick={() => showToast('Concierge inquiry dispatched for ' + selectedWatch.name)}
                  >
                    Speak with Concierge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Bag Slide-Over Drawer */}
      {isBagOpen && (
        <div className="chronix-bag-backdrop" onClick={() => setIsBagOpen(false)}>
          <div className="chronix-bag-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-strip">
              <div className="drawer-header-copy">
                <h3>Shopping Bag</h3>
                <span className="drawer-item-count">({totalCount} items)</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsBagOpen(false)}
                aria-label="Close bag drawer"
              >
                ✕
              </button>
            </div>

            {/* Armored Courier Free Delivery Notice */}
            <div className="drawer-insured-strip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Complimentary insured armored courier delivery worldwide</span>
            </div>

            {/* Bag Items List */}
            <div className="drawer-items-list">
              {cart.map((item) => (
                <div key={item.id} className="drawer-item-row">
                  <img src={item.image} alt={item.name} className="drawer-item-thumb" />
                  <div className="drawer-item-meta">
                    <div className="drawer-item-top">
                      <h4 className="drawer-item-name">{item.name}</h4>
                      <button
                        type="button"
                        className="drawer-item-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    <span className="drawer-item-calibre">{item.calibre}</span>
                    <div className="drawer-item-bottom">
                      <div className="drawer-qty-steppers">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="drawer-item-total-price">
                        ${(item.price * item.quantity).toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="drawer-empty-state">
                  <p>Your shopping bag is currently empty.</p>
                  <button
                    type="button"
                    className="hero-pill-cta"
                    onClick={() => { setIsBagOpen(false); scrollTo('chronix-catalogue-section'); }}
                  >
                    Explore Timepieces
                  </button>
                </div>
              )}
            </div>

            {/* Bag Drawer Footer */}
            {cart.length > 0 && (
              <div className="drawer-footer-actions">
                <div className="drawer-summary-row">
                  <span>Subtotal</span>
                  <span className="drawer-subtotal-val">${subtotal.toLocaleString()} USD</span>
                </div>
                <div className="drawer-summary-row subtle">
                  <span>Armored Transport &amp; Insurance</span>
                  <span>Complimentary</span>
                </div>
                <button
                  type="button"
                  className="drawer-checkout-btn"
                  onClick={() => showToast('Chronix prototype: Demo checkout transaction recorded')}
                >
                  Proceed to Secure Checkout • ${subtotal.toLocaleString()} USD
                </button>
                <span className="drawer-demo-disclaimer">
                  Interactive Prototype Demo • No actual financial transaction is processed
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
