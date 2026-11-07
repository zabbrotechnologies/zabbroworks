import React, { useState, useMemo } from 'react';
import './lumora-living.css';

// Product Catalog
const CATALOG = [
  {
    id: 'chair-1',
    name: 'Sculpted Oak Lounge Chair',
    category: 'furniture',
    categoryName: 'Furniture',
    price: 1280,
    material: 'Solid European White Oak & Natural Bouclé',
    image: '/projects/lumora-living/product-chair.jpg',
    badge: 'Best Seller',
    description: 'An architectural lounge chair defined by gentle curves, hand-planed joinery, and tactile bouclé upholstery.'
  },
  {
    id: 'table-1',
    name: 'Forma Travertine Side Table',
    category: 'furniture',
    categoryName: 'Furniture',
    price: 640,
    material: 'Honed Italian Travertine Stone',
    image: '/projects/lumora-living/product-table.jpg',
    badge: 'New',
    description: 'Solid stone plinth table cut from a single block of unpolished travertine with organic earthy veining.'
  },
  {
    id: 'lamp-1',
    name: 'Arc Floor Lamp',
    category: 'lighting',
    categoryName: 'Lighting',
    price: 420,
    material: 'Hand-Brushed Patinated Brass & Opal Glass',
    image: '/projects/lumora-living/product-lamp.jpg',
    badge: 'Popular',
    description: 'Sweeping architectural arc with warm ambient diffused illumination and a heavyweight marble counterweight base.'
  },
  {
    id: 'vessel-1',
    name: 'Atelier Ceramic Vessel',
    category: 'decor',
    categoryName: 'Home Accessories',
    price: 180,
    material: 'Hand-Thrown Stoneware with Matte Slip',
    image: '/projects/lumora-living/product-vessel.jpg',
    badge: 'Artisanal',
    description: 'Sculptural fluted vessel crafted in small studio batches with textured raw stoneware glaze.'
  },
  {
    id: 'furniture-2',
    name: 'Kanso Minimalist Daybed',
    category: 'furniture',
    categoryName: 'Furniture',
    price: 2100,
    material: 'Belgian Oatmeal Linen & Smoked Oak',
    image: '/projects/lumora-living/category-furniture.jpg',
    badge: 'Signature',
    description: 'Generously proportioned resting bench with removable cylinder bolster and mortise-and-tenon joints.'
  },
  {
    id: 'lighting-2',
    name: 'Fluted Alabaster Pendant',
    category: 'lighting',
    categoryName: 'Lighting',
    price: 540,
    material: 'Translucent Spanish Alabaster & Bronze',
    image: '/projects/lumora-living/category-lighting.jpg',
    badge: 'New Arrival',
    description: 'Carved from solid Spanish alabaster, casting warm organic veined light across dining and living spaces.'
  }
];

export default function LumoraLivingStore() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([
    { ...CATALOG[0], quantity: 1 }
  ]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Cart calculations
  const totalCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const handleAddToBag = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to your bag`);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from bag');
  };

  // Product filtering
  const filteredProducts = useMemo(() => {
    return CATALOG.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
    scrollTo('lumora-products-section');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      showToast('Thank you for subscribing to Lumora Journal');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="lumora-store-root">
      {/* Toast Notification */}
      {toast && (
        <div className="lumora-toast" role="status">
          <svg className="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toast}</span>
        </div>
      )}

      {/* A. Top Announcement Bar */}
      <div className="lumora-announcement">
        <div className="announcement-content">
          <span>COMPLIMENTARY WHITE-GLOVE DELIVERY ON ORDERS OVER $500</span>
          <span className="announcement-divider">•</span>
          <span>THE LIVING COLLECTION / SPRING 2026</span>
        </div>
      </div>

      {/* A. Main Navigation Header */}
      <header className="lumora-header">
        <div className="lumora-header-inner">
          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="lumora-mobile-menu-btn"
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

          {/* Wordmark Logo */}
          <div className="lumora-brand-container" onClick={() => scrollTo('lumora-hero')}>
            <span className="lumora-brand-title">LUMORA LIVING</span>
            <span className="lumora-brand-sub">STUDIO COPENHAGEN &amp; NEW YORK</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="lumora-nav-links">
            <button
              type="button"
              className={`lumora-nav-item ${activeCategory === 'all' ? 'is-active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              All Works
            </button>
            <button
              type="button"
              className={`lumora-nav-item ${activeCategory === 'furniture' ? 'is-active' : ''}`}
              onClick={() => handleCategoryClick('furniture')}
            >
              Furniture
            </button>
            <button
              type="button"
              className={`lumora-nav-item ${activeCategory === 'lighting' ? 'is-active' : ''}`}
              onClick={() => handleCategoryClick('lighting')}
            >
              Lighting
            </button>
            <button
              type="button"
              className={`lumora-nav-item ${activeCategory === 'decor' ? 'is-active' : ''}`}
              onClick={() => handleCategoryClick('decor')}
            >
              Décor
            </button>
            <button
              type="button"
              className="lumora-nav-item"
              onClick={() => scrollTo('lumora-story-section')}
            >
              Story
            </button>
          </nav>

          {/* Search and Shopping Bag Actions */}
          <div className="lumora-header-actions">
            {/* Live Search Input */}
            <div className="lumora-search-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="lumora-search-input"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button
              type="button"
              className="lumora-bag-btn"
              onClick={() => setIsBagOpen(true)}
              aria-label="Open Shopping Bag"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="bag-text">Bag</span>
              <span className="bag-counter">{totalCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lumora-mobile-nav-panel">
            <div className="mobile-search-row">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mobile-nav-links">
              <button type="button" onClick={() => handleCategoryClick('all')}>All Collections</button>
              <button type="button" onClick={() => handleCategoryClick('furniture')}>Furniture</button>
              <button type="button" onClick={() => handleCategoryClick('lighting')}>Lighting</button>
              <button type="button" onClick={() => handleCategoryClick('decor')}>Décor &amp; Accessories</button>
              <button type="button" onClick={() => scrollTo('lumora-editorial-banner')}>Lookbook</button>
              <button type="button" onClick={() => scrollTo('lumora-story-section')}>Brand Story</button>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <div className="lumora-main-content">
        {/* B. Photography-Led Hero Section */}
        <section className="lumora-hero" id="lumora-hero">
          <div className="lumora-hero-grid">
            {/* Left: Editorial Copy */}
            <div className="hero-editorial-col">
              <div className="hero-tag-badge">
                <span className="badge-bullet"></span>
                <span>THE LIVING COLLECTION / 2026</span>
              </div>
              <h1 className="hero-headline">
                Sculptural Living.<br />
                <em>Timeless Spaces.</em>
              </h1>
              <p className="hero-lead">
                Artisanal furniture, honed travertine tables, and ambient lighting
                thoughtfully shaped from solid European hardwoods and natural mineral stones.
              </p>
              
              <div className="hero-cta-group">
                <button
                  type="button"
                  className="btn-hero-primary"
                  onClick={() => scrollTo('lumora-products-section')}
                >
                  Explore Collection
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn-hero-secondary"
                  onClick={() => scrollTo('lumora-story-section')}
                >
                  Discover Our Story
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Editorial Material Indicators */}
              <div className="hero-pillars">
                <div className="pillar-item">
                  <span className="pillar-num">01</span>
                  <div className="pillar-meta">
                    <span className="pillar-title">Solid European Oak</span>
                    <span className="pillar-desc">FSC-Certified Forestry</span>
                  </div>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">02</span>
                  <div className="pillar-meta">
                    <span className="pillar-title">Italian Travertine</span>
                    <span className="pillar-desc">Unpolished Earthy Veining</span>
                  </div>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">03</span>
                  <div className="pillar-meta">
                    <span className="pillar-title">Ten-Year Guarantee</span>
                    <span className="pillar-desc">Architectural Joinery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Prominent Photography */}
            <div className="hero-visual-col">
              <div className="hero-photo-container">
                <img
                  src="/projects/lumora-living/hero-living.jpg"
                  alt="LUMORA LIVING contemporary styled living room with sculpted furniture"
                  className="hero-photo-img"
                  loading="eager"
                />
                <div className="hero-floating-card">
                  <span className="floating-edition">EDITION NO. 01</span>
                  <span className="floating-title">Architectural Seating Arrangement</span>
                  <span className="floating-detail">Featuring European Oak &amp; Natural Bouclé</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* C. Shop By Category */}
        <section className="lumora-categories" id="lumora-categories-section">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">CURATED DISCIPLINES</span>
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <p className="section-caption">
              Every discipline is developed with dedicated craft ateliers across Scandinavia and Northern Italy.
            </p>
          </div>

          <div className="categories-grid">
            {/* Category 1: Furniture */}
            <div
              className="category-card"
              onClick={() => handleCategoryClick('furniture')}
              role="button"
              tabIndex={0}
            >
              <div className="category-img-box">
                <img
                  src="/projects/lumora-living/category-furniture.jpg"
                  alt="Lumora Furniture Collection"
                  className="category-img"
                  loading="lazy"
                />
                <div className="category-overlay" />
              </div>
              <div className="category-info">
                <span className="category-count">14 OBJECTS</span>
                <h3 className="category-name">Furniture</h3>
                <span className="category-link">
                  Explore Furniture
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Category 2: Lighting */}
            <div
              className="category-card"
              onClick={() => handleCategoryClick('lighting')}
              role="button"
              tabIndex={0}
            >
              <div className="category-img-box">
                <img
                  src="/projects/lumora-living/category-lighting.jpg"
                  alt="Lumora Lighting Collection"
                  className="category-img"
                  loading="lazy"
                />
                <div className="category-overlay" />
              </div>
              <div className="category-info">
                <span className="category-count">09 OBJECTS</span>
                <h3 className="category-name">Lighting</h3>
                <span className="category-link">
                  Explore Lighting
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Category 3: Home Accessories / Décor */}
            <div
              className="category-card"
              onClick={() => handleCategoryClick('decor')}
              role="button"
              tabIndex={0}
            >
              <div className="category-img-box">
                <img
                  src="/projects/lumora-living/category-decor.jpg"
                  alt="Lumora Home Accessories"
                  className="category-img"
                  loading="lazy"
                />
                <div className="category-overlay" />
              </div>
              <div className="category-info">
                <span className="category-count">18 OBJECTS</span>
                <h3 className="category-name">Home Accessories</h3>
                <span className="category-link">
                  Explore Décor
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* D. Featured Products Grid */}
        <section className="lumora-products" id="lumora-products-section">
          <div className="products-controls-bar">
            <div>
              <span className="section-eyebrow">PERMANENT COLLECTION</span>
              <h2 className="section-title">Curated Pieces</h2>
            </div>

            {/* Filter Pills */}
            <div className="products-filter-pills" role="tablist">
              <button
                type="button"
                className={`filter-pill ${activeCategory === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All Pieces ({CATALOG.length})
              </button>
              <button
                type="button"
                className={`filter-pill ${activeCategory === 'furniture' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('furniture')}
              >
                Furniture
              </button>
              <button
                type="button"
                className={`filter-pill ${activeCategory === 'lighting' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('lighting')}
              >
                Lighting
              </button>
              <button
                type="button"
                className={`filter-pill ${activeCategory === 'decor' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('decor')}
              >
                Décor
              </button>
            </div>
          </div>

          {/* Active Search Feedback */}
          {searchQuery && (
            <div className="search-status-bar">
              <span>Showing {filteredProducts.length} results matching &ldquo;{searchQuery}&rdquo;</span>
              <button type="button" onClick={() => setSearchQuery('')}>Clear filter</button>
            </div>
          )}

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-img-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                  <button
                    type="button"
                    className="quick-add-btn"
                    onClick={() => handleAddToBag(product)}
                  >
                    Add to Bag
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>

                <div className="product-details">
                  <div className="product-meta-row">
                    <span className="product-category-label">{product.categoryName}</span>
                    <span className="product-price">${product.price.toLocaleString()}</span>
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-material">{product.material}</p>
                  <button
                    type="button"
                    className="product-mobile-add-btn"
                    onClick={() => handleAddToBag(product)}
                  >
                    Add to Bag • ${product.price.toLocaleString()}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="products-empty-state">
              <p>No pieces found matching your current filter.</p>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* E. Editorial Collection Banner */}
        <section className="lumora-editorial-banner" id="lumora-editorial-banner">
          <div className="editorial-banner-container">
            <div className="editorial-banner-image-box">
              <img
                src="/projects/lumora-living/editorial-banner.jpg"
                alt="Objects Made to Last — Lumora Living Editorial Lookbook"
                className="editorial-banner-photo"
                loading="lazy"
              />
              <div className="editorial-banner-scrim" />
            </div>

            <div className="editorial-banner-content">
              <span className="editorial-label">STUDIO ESSAY &amp; LOOKBOOK</span>
              <h2 className="editorial-title">Objects Made to Last</h2>
              <p className="editorial-paragraph">
                We believe true luxury resides in natural authenticity. Every Lumora piece
                is sculpted with deliberate restraint, hand-finished with organic plant-based oils,
                and made to develop a warm, gentle patina with each passing decade.
              </p>
              <div className="editorial-actions">
                <button
                  type="button"
                  className="btn-editorial-primary"
                  onClick={() => scrollTo('lumora-products-section')}
                >
                  Explore Collection
                </button>
                <button
                  type="button"
                  className="btn-editorial-secondary"
                  onClick={() => scrollTo('lumora-story-section')}
                >
                  Read Editorial Essay
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* F. Brand Story and Service Benefits */}
        <section className="lumora-benefits" id="lumora-story-section">
          <div className="benefits-header">
            <span className="section-eyebrow">OUR PRACTICE &amp; COMMITMENT</span>
            <h2 className="section-title">The Lumora Philosophy</h2>
            <p className="section-caption">
              Conscious design born from sustainable European forestry, ancestral stonework, and white-glove customer care.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="benefit-card-title">Considered Materials</h3>
              <p className="benefit-card-text">
                FSC-certified European white oak, natural unpolished travertine, and non-toxic organic oils. Every raw element is traceable to ethical origins.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="benefit-card-title">White-Glove Delivery</h3>
              <p className="benefit-card-text">
                Complimentary room of choice placement, full packaging removal, and assembly by certified logistics specialists on all qualifying orders.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="benefit-card-title">10-Year Guarantee</h3>
              <p className="benefit-card-text">
                Precision mortise-and-tenon structural integrity designed to survive generations of daily living. We guarantee heirloom durability.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="benefit-card-title">Artisanal Studio Batches</h3>
              <p className="benefit-card-text">
                Crafted in limited seasonal studio runs to minimize industrial waste and maintain meticulous tactile supervision over each finished surface.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* G. Editorial Footer */}
      <footer className="lumora-footer">
        <div className="footer-main-row">
          {/* Brand & Newsletter */}
          <div className="footer-brand-col">
            <span className="footer-brand-title">LUMORA LIVING</span>
            <p className="footer-brand-desc">
              Heirloom furniture, ambient illumination, and tactile stone objects designed in Copenhagen and New York.
            </p>
            
            <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
              <span className="newsletter-label">Subscribe to the Lumora Journal</span>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit">Join</button>
              </div>
              {newsletterSubscribed && (
                <span className="newsletter-success">You are subscribed to the private journal.</span>
              )}
            </form>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-header">Collections</h4>
            <ul>
              <li><button type="button" onClick={() => handleCategoryClick('furniture')}>Furniture</button></li>
              <li><button type="button" onClick={() => handleCategoryClick('lighting')}>Lighting</button></li>
              <li><button type="button" onClick={() => handleCategoryClick('decor')}>Home Accessories</button></li>
              <li><button type="button" onClick={() => handleCategoryClick('all')}>New Arrivals 2026</button></li>
              <li><button type="button" onClick={() => scrollTo('lumora-editorial-banner')}>Lookbook Archive</button></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-header">Client Care</h4>
            <ul>
              <li><button type="button" onClick={() => showToast('White-glove care guide available via concierge')}>White-Glove Delivery</button></li>
              <li><button type="button" onClick={() => showToast('Complimentary wood sample kits ship within 24h')}>Finish Samples</button></li>
              <li><button type="button" onClick={() => showToast('Architectural trade program details: trade@lumoraliving.com')}>Architect &amp; Trade Program</button></li>
              <li><button type="button" onClick={() => showToast('30-day home trial with complimentary return logistics')}>Returns &amp; Guarantee</button></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-header">Studio Locations</h4>
            <div className="studio-address">
              <strong>Copenhagen Studio</strong>
              <span>Kronprinsessegade 18, 1306 København</span>
            </div>
            <div className="studio-address">
              <strong>New York Gallery</strong>
              <span>52 Crosby Street, SoHo, NY 10012</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copyright">© 2026 LUMORA LIVING STUDIO. ALL RIGHTS RESERVED.</span>
          <div className="footer-legal-links">
            <span>SUSTAINABILITY CHARTER</span>
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
          </div>
        </div>
      </footer>

      {/* Shopping Bag Slide-Over Drawer */}
      {isBagOpen && (
        <div className="lumora-bag-overlay" onClick={() => setIsBagOpen(false)}>
          <div className="lumora-bag-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="bag-drawer-header">
              <div className="bag-header-title">
                <h3>Shopping Bag</h3>
                <span className="bag-items-count">({totalCount} items)</span>
              </div>
              <button
                type="button"
                className="bag-close-btn"
                onClick={() => setIsBagOpen(false)}
                aria-label="Close bag drawer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Free shipping threshold progress */}
            <div className="bag-shipping-progress">
              {subtotal >= 500 ? (
                <div className="shipping-qualified">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>You qualify for complimentary White-Glove delivery!</span>
                </div>
              ) : (
                <span className="shipping-need">
                  Add ${(500 - subtotal).toLocaleString()} more for complimentary white-glove delivery
                </span>
              )}
            </div>

            {/* Bag Item List */}
            <div className="bag-items-list">
              {cart.map((item) => (
                <div key={item.id} className="bag-item-row">
                  <img src={item.image} alt={item.name} className="bag-item-thumb" />
                  <div className="bag-item-meta">
                    <div className="bag-item-top">
                      <h4 className="bag-item-name">{item.name}</h4>
                      <button
                        type="button"
                        className="bag-item-remove"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    <span className="bag-item-mat">{item.material}</span>
                    <div className="bag-item-bottom">
                      <div className="bag-qty-stepper">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="bag-item-total">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="bag-empty-state">
                  <p>Your shopping bag is currently empty.</p>
                  <button
                    type="button"
                    className="btn-hero-primary"
                    onClick={() => { setIsBagOpen(false); scrollTo('lumora-products-section'); }}
                  >
                    Explore Featured Pieces
                  </button>
                </div>
              )}
            </div>

            {/* Bag Drawer Footer */}
            {cart.length > 0 && (
              <div className="bag-drawer-footer">
                <div className="bag-subtotal-row">
                  <span>Subtotal</span>
                  <span className="bag-subtotal-val">${subtotal.toLocaleString()}</span>
                </div>
                <div className="bag-shipping-row">
                  <span>Delivery</span>
                  <span>{subtotal >= 500 ? 'Complimentary White-Glove' : '$65'}</span>
                </div>
                <button
                  type="button"
                  className="bag-checkout-btn"
                  onClick={() => showToast('Order prototype: Checkout demo session recorded')}
                >
                  Proceed to Checkout • ${(subtotal + (subtotal >= 500 ? 0 : 65)).toLocaleString()}
                </button>
                <span className="bag-disclaimer">
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
