import React, { useState, useMemo } from 'react';
import './glowe.css';

// GLOWÉ Master Product Catalogue Data
const PRODUCTS = [
  {
    id: 'dew-theory-serum',
    name: 'Dew Theory Hydrating Serum',
    category: 'serums',
    categoryLabel: 'Multi-Weight Serum',
    concern: 'hydration',
    concernLabel: 'Deep Cellular Hydration',
    price: 68,
    size: '30ml / 1.0 fl oz',
    texture: 'Lightweight micro-droplet elixir',
    keyIngredients: 'Multi-Weight Hyaluronic Acid, Snow Mushroom Glucan, Niacinamide',
    image: '/projects/glowe/product-serum.jpg',
    badge: 'Clinical Award Winner',
    description: 'A transformative multi-molecular hydration serum combining ultra-low and high-molecular weight hyaluronic acid with bio-fermented snow mushroom to deliver 72 hours of cellular hydration and bouncy, dewy luminosity.',
    howToUse: 'Dispense 3–4 drops onto damp skin after cleansing and essence. Gently press into face, neck, and décolleté morning and evening before moisturizer.',
    ingredientsList: 'Aqua/Water, Tremella Fuciformis (Snow Mushroom) Extract, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Niacinamide (Vitamin B3), Glycerin, Camellia Sinensis Leaf Extract, Panthenol.'
  },
  {
    id: 'cloudmilk-cleanser',
    name: 'Cloudmilk Gentle Cleanser',
    category: 'cleansers',
    categoryLabel: 'Lipid Emulsion',
    concern: 'cleansing',
    concernLabel: 'Gentle Cleansing',
    price: 42,
    size: '150ml / 5.1 fl oz',
    texture: 'Velvety botanical milk',
    keyIngredients: 'Colloidal Oat, Chamomile Hydrosol, Plant Squalane',
    image: '/projects/glowe/product-cleanser.jpg',
    badge: 'Daily Essential',
    description: 'A non-stripping, pH-balanced milky emulsion that effortlessly dissolves impurities, mineral sunscreen, and makeup while reinforcing the delicate lipid barrier with soothing colloidal oat.',
    howToUse: 'Massage 1–2 pumps onto dry or damp skin in circular motions. Rinse thoroughly with lukewarm water or remove with a damp organic muslin cloth.',
    ingredientsList: 'Water/Aqua, Cetearyl Alcohol, Glycerin, Avena Sativa (Oat) Kernel Flour, Squalane, Chamomilla Recutita (Matricaria) Flower Water, Decyl Glucoside, Allantoin.'
  },
  {
    id: 'barrier-veil-moisturizer',
    name: 'Barrier Veil Moisturizer',
    category: 'barrier',
    categoryLabel: 'Ceramide Cream',
    concern: 'barrier',
    concernLabel: 'Lipid Barrier Repair',
    price: 58,
    size: '50ml / 1.7 fl oz',
    texture: 'Whipped lipid-rich velvet cream',
    keyIngredients: 'Ceramides NP/AP/EOP, Cholesterol, Centella Asiatica',
    image: '/projects/glowe/product-moisturizer.jpg',
    badge: 'Barrier Gold Standard',
    description: 'Bio-mimetic ceramide cream formulated with a 3:1:1 physiological ratio of essential lipids, plant cholesterol, and fatty acids to seal trans-epidermal water loss and soothe sensitized skin.',
    howToUse: 'Warm a pea-sized amount between fingertips and smooth over face and neck as the final sealing step of your morning and nighttime ritual.',
    ingredientsList: 'Aqua, Butyrospermum Parkii (Shea) Butter, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Centella Asiatica Extract, Sodium Lauroyl Lactylate.'
  },
  {
    id: 'sun-ritual-spf',
    name: 'Sun Ritual SPF 50 Fluid',
    category: 'sun',
    categoryLabel: 'Solar Protection',
    concern: 'barrier',
    concernLabel: 'Photoprotection',
    price: 46,
    size: '50ml / 1.7 fl oz',
    texture: 'Invisible serum-weight solar veil',
    keyIngredients: 'Non-Nano Zinc Oxide 12%, Ectoin, Green Tea Catechins',
    image: '/projects/glowe/product-spf.jpg',
    badge: 'Broad Spectrum 50+',
    description: 'Weightless 100% mineral sunscreen fluid that leaves zero white cast, greasiness, or pore congestion. Enriched with extremolyte Ectoin to shield skin from UV rays, HEV blue light, and urban pollution.',
    howToUse: 'Shake well before use. Apply liberally across face, neck, and ears 15 minutes before sun exposure. Reapply every 2 hours or after swimming.',
    ingredientsList: 'Zinc Oxide 12.0%, Water/Aqua, Caprylic/Capric Triglyceride, Ectoin, Camellia Sinensis (Green Tea) Leaf Extract, Silica, Tocopheryl Acetate, Polyglyceryl-3 Polyricinoleate.'
  },
  {
    id: 'recovery-eye-nectar',
    name: 'Cellular Recovery Eye Nectar',
    category: 'serums',
    categoryLabel: 'Orbital Treatment',
    concern: 'brightening',
    concernLabel: 'Dark Circles & Tone',
    price: 54,
    size: '15ml / 0.5 fl oz',
    texture: 'Silken cooling gel-nectar',
    keyIngredients: 'Green Tea Caffeine, Tetrapeptide-30, Licorice Extract',
    image: '/projects/glowe/product-eye-cream.jpg',
    badge: 'Depuffing Formula',
    description: 'Targeted awakening eye serum powered by green tea caffeine and peptide complexes to visibly de-puff morning under-eye swelling, smooth fine dehydration lines, and fade vascular dark circles.',
    howToUse: 'Gently glide one pump around orbital eye bone with ring finger, tapping softly from outer corner inward until absorbed.',
    ingredientsList: 'Aqua, Caffeine, Tetrapeptide-30, Glycyrrhiza Glabra (Licorice) Root Extract, Sodium Hyaluronate, Hydroxyethylcellulose, Propanediol.'
  },
  {
    id: 'rice-micro-essence',
    name: 'Rice Micro-Essence',
    category: 'cleansers',
    categoryLabel: 'Fermented Infusion',
    concern: 'texture',
    concernLabel: 'Pore & Texture Refining',
    price: 48,
    size: '180ml / 6.1 fl oz',
    texture: 'Silky botanical infusion water',
    keyIngredients: 'Fermented Rice Filtrate 74%, Willow Bark Extract, Galactomyces',
    image: '/projects/glowe/product-essence.jpg',
    badge: 'K-Beauty Science',
    description: 'Traditional fermented rice water paired with natural enzymatic willow bark. Micro-exfoliates dead surface cells, softens rough texture, and primes skin to absorb subsequent serums 3x faster.',
    howToUse: 'Pour a generous splash into palms and pat gently across clean skin until fully quenched. Can be layered 3 to 7 times for intensified glass-skin radiance.',
    ingredientsList: 'Oryza Sativa (Rice) Bran Water, Galactomyces Ferment Filtrate, Salix Alba (Willow) Bark Extract, Glycerin, Butylene Glycol, Dipotassium Glycyrrhizate.'
  }
];

// Interactive Ingredient Discovery Data
const INGREDIENTS_DATA = [
  {
    id: 'hyaluronic',
    code: 'MOL-01 / HYDRATION',
    name: 'Multi-Molecular HA',
    inci: 'Sodium Hyaluronate (Low + High MW)',
    image: '/projects/glowe/ingredient-hyaluronic.jpg',
    bioMechanism: 'Cross-linked hyaluronic fractions create a multi-tiered moisture reservoir. High-weight molecules bind water on surface stratum corneum, while low-weight fractions penetrate cellular crevices to trigger endogenous collagen elasticity.',
    associatedProductId: 'dew-theory-serum'
  },
  {
    id: 'ceramide',
    code: 'MOL-02 / BARRIER',
    name: 'Biomimetic Ceramides',
    inci: 'Ceramide NP, Ceramide AP, Ceramide EOP',
    image: '/projects/glowe/ingredient-ceramide.jpg',
    bioMechanism: 'Identical to natural intercellular lipid mortar. Integrates directly into micro-fissures of compromised skin barriers, stopping trans-epidermal moisture loss (TEWL) and blocking atmospheric pollutant ingress.',
    associatedProductId: 'barrier-veil-moisturizer'
  },
  {
    id: 'niacinamide',
    code: 'MOL-03 / TONE',
    name: 'Active Niacinamide',
    inci: 'Vitamin B3 / Nicotinamide 5%',
    image: '/projects/glowe/ingredient-niacinamide.jpg',
    bioMechanism: 'Inhibits melanosome transfer from melanocytes to keratinocytes, visibly evening post-inflammatory erythema while boosting cellular ATP synthesis to visibly contract enlarged pore walls.',
    associatedProductId: 'dew-theory-serum'
  },
  {
    id: 'oat',
    code: 'MOL-04 / CALMING',
    name: 'Colloidal Oat Beta-Glucan',
    inci: 'Avena Sativa Kernel Flour Extract',
    image: '/projects/glowe/ingredient-oat.jpg',
    bioMechanism: 'Rich in anti-inflammatory avenanthramides that downregulate inflammatory cytokines. Provides immediate relief from burning, flushing, and environmental reactivity within 120 seconds of topical application.',
    associatedProductId: 'cloudmilk-cleanser'
  }
];

export default function GloweStore() {
  // Navigation & UI States
  const [activeConcernFilter, setActiveConcernFilter] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Ingredient Explorer Selected Molecule
  const [activeMoleculeIndex, setActiveMoleculeIndex] = useState(0);

  // Editorial Ritual Builder State
  const [builderStep, setBuilderStep] = useState(1); // 1: Concern, 2: Routine Pacing, 3: Recommended Suite
  const [builderConcern, setBuilderConcern] = useState('hydration');
  const [builderPacing, setBuilderPacing] = useState('2'); // '2' or '4'

  // Circadian Timeline Mode
  const [circadianMode, setCircadianMode] = useState('am'); // am | pm

  // Product Modal State
  const [detailProduct, setDetailProduct] = useState(null);

  // Shopping Bag Drawer State
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      product: PRODUCTS[0], // Dew Theory Serum
      quantity: 1
    }
  ]);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Helpers
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToBag = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to your ritual bag`);
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const next = item.quantity + delta;
            return next > 0 ? { ...item, quantity: next } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed from ritual bag');
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keyIngredients.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesConcern = activeConcernFilter === 'all' || p.concern === activeConcernFilter;
      return matchesSearch && matchesConcern;
    });
  }, [searchQuery, activeConcernFilter]);

  const activeMolecule = INGREDIENTS_DATA[activeMoleculeIndex];
  const activeAssocProduct = PRODUCTS.find(p => p.id === activeMolecule.associatedProductId) || PRODUCTS[0];

  // Routine Suite Recommendations
  const recommendedSuiteProducts = useMemo(() => {
    if (builderPacing === '2') {
      if (builderConcern === 'hydration') return [PRODUCTS[1], PRODUCTS[0]];
      if (builderConcern === 'brightening') return [PRODUCTS[1], PRODUCTS[4]];
      if (builderConcern === 'texture') return [PRODUCTS[1], PRODUCTS[5]];
      return [PRODUCTS[1], PRODUCTS[2]];
    } else {
      if (builderConcern === 'hydration') return [PRODUCTS[1], PRODUCTS[5], PRODUCTS[0], PRODUCTS[2]];
      if (builderConcern === 'brightening') return [PRODUCTS[1], PRODUCTS[0], PRODUCTS[4], PRODUCTS[3]];
      if (builderConcern === 'texture') return [PRODUCTS[1], PRODUCTS[5], PRODUCTS[0], PRODUCTS[3]];
      return [PRODUCTS[1], PRODUCTS[5], PRODUCTS[2], PRODUCTS[3]];
    }
  }, [builderConcern, builderPacing]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="glowe-store-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="glowe-toast" role="status">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          1. MAGAZINE MASTHEAD (REBUILT ARCHITECTURE: CENTERED COVER LOGO)
          ==================================================================== */}
      <header className="glowe-masthead-wrapper">
        {/* Top Wire */}
        <div className="glowe-announcement-wire">
          <div className="glowe-wire-left">
            <span className="glowe-wire-tag">
              <span className="glowe-wire-dot" />
              PARIS &bull; KYOTO BOTANICAL ARCHIVE
            </span>
            <span className="glowe-wire-tag">
              <span className="glowe-wire-dot" />
              COLD-PROCESS FERMENTATION &bull; VOL. 04
            </span>
          </div>
          <div>
            <span>CARBON-NEUTRAL COURIER OVER $50</span>
          </div>
        </div>

        {/* Grand Centered Masthead */}
        <div className="glowe-masthead-main">
          {/* Left Metadata */}
          <div className="glowe-masthead-meta-left">
            <span className="glowe-meta-vol">ISSUE 04 / 2026</span>
            <span className="glowe-meta-origin">CLINICAL DERMATOLOGY</span>
          </div>

          {/* Center Brand Wordmark */}
          <div className="glowe-masthead-center">
            <h1 className="glowe-masthead-logo" onClick={() => scrollTo('glowe-hero')}>
              GLOWÉ
            </h1>
            <span className="glowe-masthead-subline">BOTANICAL SCIENCE &bull; REFINED CARE</span>
          </div>

          {/* Right Utility Controls */}
          <div className="glowe-masthead-controls-right">
            <button
              type="button"
              className="glowe-header-action-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span>{isSearchOpen ? 'CLOSE [✕]' : 'SEARCH [⌕]'}</span>
            </button>

            <button
              type="button"
              className="glowe-header-action-btn"
              onClick={() => setIsBagOpen(true)}
            >
              <span>BAG</span>
              <span className="glowe-bag-indicator">{totalCartCount}</span>
            </button>
          </div>
        </div>

        {/* Category Index Navigation Strip */}
        <nav className="glowe-category-index-bar">
          <ul className="glowe-index-links">
            <li>
              <button type="button" className="glowe-index-link" onClick={() => scrollTo('glowe-wall')}>
                FORMULARY
              </button>
            </li>
            <li>
              <button type="button" className="glowe-index-link" onClick={() => scrollTo('glowe-explorer')}>
                INGREDIENT LAB
              </button>
            </li>
            <li>
              <button type="button" className="glowe-index-link" onClick={() => scrollTo('glowe-builder')}>
                RITUAL PROTOCOL
              </button>
            </li>
            <li>
              <button type="button" className="glowe-index-link" onClick={() => scrollTo('glowe-circadian')}>
                CIRCADIAN ORDER
              </button>
            </li>
            <li>
              <button type="button" className="glowe-index-link" onClick={() => scrollTo('glowe-story')}>
                THE ARCHIVE
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="glowe-index-cta-pill"
            onClick={() => scrollTo('glowe-builder')}
          >
            Skin Diagnostic &rarr;
          </button>
        </nav>

        {/* Expandable Search Tray */}
        {isSearchOpen && (
          <div className="glowe-search-tray">
            <input
              type="text"
              className="glowe-tray-input"
              placeholder="Search botanical molecules, ceramide serums, gentle cleansers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              className="glowe-header-action-btn"
              onClick={() => {
                setIsSearchOpen(false);
                scrollTo('glowe-wall');
              }}
            >
              View Results &rarr;
            </button>
          </div>
        )}
      </header>

      {/* ====================================================================
          2. ART-DIRECTED CAMPAIGN CANVAS HERO (OVERLAPPING COMPOSITION)
          ==================================================================== */}
      <section id="glowe-hero" className="glowe-campaign-canvas-hero" aria-label="GLOWÉ Campaign Canvas">
        <div className="glowe-canvas-frame">
          {/* Left Vertical Accent Index */}
          <div className="glowe-canvas-edge-index">
            <span className="glowe-edge-text">CAMPAIGN 04 / HARVEST</span>
            <div className="glowe-edge-divider" />
            <span className="glowe-edge-text" style={{ fontSize: '0.55rem' }}>KYOTO FORMULATION</span>
          </div>

          {/* Central Full-Bleed Skincare Still Life Photograph */}
          <div className="glowe-canvas-hero-photo-wrapper">
            <img
              src="/projects/glowe/hero-skincare.jpg"
              alt="GLOWÉ skincare campaign still life with cream textures and botanicals"
              className="glowe-canvas-hero-img"
            />
          </div>

          {/* Floating Ingredient Precision Annotations */}
          <div className="glowe-canvas-annotation glowe-anno-pos-1">
            <span className="glowe-annotation-num">[01] CERAMIDE NP/AP</span>
            <span className="glowe-annotation-title">Physiological Lipid Mortar</span>
            <span className="glowe-annotation-desc">Multi-depth barrier reinforcement</span>
          </div>

          <div className="glowe-canvas-annotation glowe-anno-pos-2">
            <span className="glowe-annotation-num">[02] TREMELLA FUCIFORMIS</span>
            <span className="glowe-annotation-title">Snow Mushroom Glucan</span>
            <span className="glowe-annotation-desc">72h trans-epidermal moisture lock</span>
          </div>

          <div className="glowe-canvas-annotation glowe-anno-pos-3">
            <span className="glowe-annotation-num">[03] GALACTOMYCES</span>
            <span className="glowe-annotation-title">Fermented Prebiotic Rice</span>
            <span className="glowe-annotation-desc">Glass-skin enzymatic smoothing</span>
          </div>

          {/* Overlapping Typography Stage */}
          <div className="glowe-canvas-typography-stage">
            <div className="glowe-hero-editorial-label">
              <span>●</span>
              <span>BOTANICAL SCIENCE ARCHIVE &bull; 2026</span>
            </div>

            <h2 className="glowe-hero-colossal-title">
              Pure Care. <br />
              <span className="glowe-title-em">Real Results.</span>
            </h2>

            <p className="glowe-hero-narrative-copy">
              Engineered with cold-fermented actives and bio-mimetic lipid ceramides to restore cellular equilibrium without aggressive acids or barrier disruption.
            </p>

            <div className="glowe-canvas-cta-cluster">
              <button
                type="button"
                className="glowe-cta-ink-block"
                onClick={() => scrollTo('glowe-builder')}
              >
                <span>Explore the Ritual</span>
                <span>&rarr;</span>
              </button>

              <button
                type="button"
                className="glowe-cta-text-link"
                onClick={() => scrollTo('glowe-wall')}
              >
                Inspect Formulary ($42–$68)
              </button>
            </div>
          </div>

          {/* Bottom Technical Specifications Strip */}
          <div className="glowe-canvas-bottom-bar">
            <div className="glowe-canvas-spec-col">
              <span className="glowe-spec-num-heading">98.4%</span>
              <span className="glowe-spec-txt-label">Bio-Compatible Active Matrix</span>
            </div>
            <div className="glowe-canvas-spec-col">
              <span className="glowe-spec-num-heading">0%</span>
              <span className="glowe-spec-txt-label">Silicones, Sulfates & Mineral Oils</span>
            </div>
            <div className="glowe-canvas-spec-col">
              <span className="glowe-spec-num-heading">72h</span>
              <span className="glowe-spec-txt-label">Proven Moisture Retention</span>
            </div>
            <div className="glowe-canvas-spec-col">
              <span className="glowe-spec-num-heading">KYOTO</span>
              <span className="glowe-spec-txt-label">Cold Extraction Laboratory</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. HORIZONTAL EDITORIAL SKIN CONCERN TICKER / INDEX
          ==================================================================== */}
      <section id="glowe-ticker" className="glowe-concern-ticker-section" aria-label="Editorial Concern Index">
        <div className="glowe-ticker-track">
          <button
            type="button"
            className={`glowe-ticker-item ${activeConcernFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveConcernFilter('all')}
          >
            <span className="glowe-ticker-num">00</span>
            <span className="glowe-ticker-label">ALL FORMULATIONS</span>
          </button>
          <span className="glowe-ticker-sep">&bull;</span>

          <button
            type="button"
            className={`glowe-ticker-item ${activeConcernFilter === 'hydration' ? 'active' : ''}`}
            onClick={() => setActiveConcernFilter(activeConcernFilter === 'hydration' ? 'all' : 'hydration')}
          >
            <span className="glowe-ticker-num">01</span>
            <span className="glowe-ticker-label">DEEP HYDRATION</span>
          </button>
          <span className="glowe-ticker-sep">&bull;</span>

          <button
            type="button"
            className={`glowe-ticker-item ${activeConcernFilter === 'barrier' ? 'active' : ''}`}
            onClick={() => setActiveConcernFilter(activeConcernFilter === 'barrier' ? 'all' : 'barrier')}
          >
            <span className="glowe-ticker-num">02</span>
            <span className="glowe-ticker-label">SKIN BARRIER REPAIR</span>
          </button>
          <span className="glowe-ticker-sep">&bull;</span>

          <button
            type="button"
            className={`glowe-ticker-item ${activeConcernFilter === 'brightening' ? 'active' : ''}`}
            onClick={() => setActiveConcernFilter(activeConcernFilter === 'brightening' ? 'all' : 'brightening')}
          >
            <span className="glowe-ticker-num">03</span>
            <span className="glowe-ticker-label">UNEVEN TONE & RADIANCE</span>
          </button>
          <span className="glowe-ticker-sep">&bull;</span>

          <button
            type="button"
            className={`glowe-ticker-item ${activeConcernFilter === 'cleansing' ? 'active' : ''}`}
            onClick={() => setActiveConcernFilter(activeConcernFilter === 'cleansing' ? 'all' : 'cleansing')}
          >
            <span className="glowe-ticker-num">04</span>
            <span className="glowe-ticker-label">GENTLE CLEANSING</span>
          </button>
          <span className="glowe-ticker-sep">&bull;</span>

          <button
            type="button"
            className={`glowe-ticker-item ${activeConcernFilter === 'texture' ? 'active' : ''}`}
            onClick={() => setActiveConcernFilter(activeConcernFilter === 'texture' ? 'all' : 'texture')}
          >
            <span className="glowe-ticker-num">05</span>
            <span className="glowe-ticker-label">PORE & TEXTURE REFINING</span>
          </button>
        </div>
      </section>

      {/* ====================================================================
          4. ASYMMETRICAL EDITORIAL PRODUCT WALL (NOT A 4-CARD REPETITIVE GRID!)
          ==================================================================== */}
      <section id="glowe-wall" className="glowe-product-wall-section" aria-label="The Editorial Product Wall">
        <div className="glowe-wall-top-bar">
          <div className="glowe-wall-title-box">
            <span className="glowe-wall-section-label">CURATED FORMULARY</span>
            <h2 className="glowe-wall-headline">The Product Edit</h2>
          </div>
          <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.75rem', color: 'var(--glowe-ink-subtle)' }}>
            [{filteredProducts.length} ACTIVE COMPOUNDS IN ARCHIVE]
          </span>
        </div>

        {/* Asymmetrical Mosaic Layout */}
        <div className="glowe-wall-mosaic-grid">
          {/* Colossal Left Flagship Product Card: Dew Theory Serum */}
          <div className="glowe-wall-flagship">
            <div className="glowe-flagship-visual">
              <span className="glowe-flagship-award-tag">FLAGSHIP CLINICAL FAVORITE</span>
              <img
                src={filteredProducts[0].image}
                alt={filteredProducts[0].name}
                className="glowe-flagship-photo"
              />
            </div>
            <div className="glowe-flagship-info-plate">
              <span className="glowe-flagship-cat-label">{filteredProducts[0].categoryLabel}</span>
              <h3 className="glowe-flagship-name">{filteredProducts[0].name}</h3>
              <p className="glowe-flagship-formula-desc">{filteredProducts[0].description}</p>

              <div className="glowe-flagship-matrix">
                <div className="glowe-matrix-cell">
                  <span className="glowe-matrix-label">ACTIVE RATIO</span>
                  <span className="glowe-matrix-val">5% Niacinamide + HA</span>
                </div>
                <div className="glowe-matrix-cell">
                  <span className="glowe-matrix-label">NET VOLUME</span>
                  <span className="glowe-matrix-val">{filteredProducts[0].size}</span>
                </div>
                <div className="glowe-matrix-cell">
                  <span className="glowe-matrix-label">CLINICAL SCORE</span>
                  <span className="glowe-matrix-val">99.2% Barrier Fit</span>
                </div>
              </div>

              <div className="glowe-flagship-purchase-row">
                <span className="glowe-flagship-price-val">${filteredProducts[0].price} USD</span>
                <div className="glowe-flagship-actions">
                  <button
                    type="button"
                    className="glowe-header-action-btn"
                    onClick={() => setDetailProduct(filteredProducts[0])}
                  >
                    Inspect Formula
                  </button>
                  <button
                    type="button"
                    className="glowe-cta-ink-block"
                    onClick={() => addToBag(filteredProducts[0])}
                  >
                    + Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Stacked Products & Editorial Manifesto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Secondary Product 1: Cloudmilk Cleanser */}
            {filteredProducts.length > 1 && (
              <div className="glowe-wall-secondary-card">
                <div className="glowe-sec-thumb">
                  <img src={filteredProducts[1].image} alt={filteredProducts[1].name} className="glowe-sec-img" />
                </div>
                <div className="glowe-sec-content">
                  <span className="glowe-sec-cat">{filteredProducts[1].categoryLabel}</span>
                  <h4 className="glowe-sec-title">{filteredProducts[1].name}</h4>
                  <p className="glowe-sec-desc">{filteredProducts[1].description.slice(0, 95)}...</p>
                  <div className="glowe-sec-footer">
                    <span className="glowe-sec-price">${filteredProducts[1].price}</span>
                    <button
                      type="button"
                      className="glowe-sec-btn-add"
                      onClick={() => addToBag(filteredProducts[1])}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Embedded Formulation Manifesto Card */}
            <div className="glowe-wall-manifesto-card">
              <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--glowe-terracotta)', fontWeight: 700, marginBottom: '0.5rem' }}>
                FORMULATION INTEGRITY
              </span>
              <p className="glowe-manifesto-quote">
                "We design formulas to integrate natively into cellular biology, avoiding the synthetic occlusion of silicones."
              </p>
              <span className="glowe-manifesto-author">DR. CLAIRE RENAUD &bull; KYOTO BIO-LABS</span>
            </div>

            {/* Secondary Product 2: Barrier Veil Cream */}
            {filteredProducts.length > 2 && (
              <div className="glowe-wall-secondary-card">
                <div className="glowe-sec-thumb">
                  <img src={filteredProducts[2].image} alt={filteredProducts[2].name} className="glowe-sec-img" />
                </div>
                <div className="glowe-sec-content">
                  <span className="glowe-sec-cat">{filteredProducts[2].categoryLabel}</span>
                  <h4 className="glowe-sec-title">{filteredProducts[2].name}</h4>
                  <p className="glowe-sec-desc">{filteredProducts[2].description.slice(0, 95)}...</p>
                  <div className="glowe-sec-footer">
                    <span className="glowe-sec-price">${filteredProducts[2].price}</span>
                    <button
                      type="button"
                      className="glowe-sec-btn-add"
                      onClick={() => addToBag(filteredProducts[2])}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Rail of Additional Formulations */}
        <div className="glowe-wall-rail-header">
          <span className="glowe-wall-section-label">ADDITIONAL SPECIALIZED REGIMENS</span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--glowe-font-mono)' }}>EXTENDED PHARMACOPEIA</span>
        </div>

        <div className="glowe-rail-grid">
          {filteredProducts.slice(3).map(p => (
            <div key={p.id} className="glowe-wall-secondary-card" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div className="glowe-sec-thumb">
                <img src={p.image} alt={p.name} className="glowe-sec-img" />
              </div>
              <div className="glowe-sec-content">
                <span className="glowe-sec-cat">{p.categoryLabel}</span>
                <h4 className="glowe-sec-title" style={{ fontSize: '1.15rem' }}>{p.name}</h4>
                <p className="glowe-sec-desc" style={{ fontSize: '0.75rem' }}>{p.description.slice(0, 85)}...</p>
                <div className="glowe-sec-footer">
                  <span className="glowe-sec-price">${p.price}</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      type="button"
                      className="glowe-header-action-btn"
                      style={{ fontSize: '0.62rem', padding: '0.3rem 0.5rem' }}
                      onClick={() => setDetailProduct(p)}
                    >
                      Inspect
                    </button>
                    <button
                      type="button"
                      className="glowe-sec-btn-add"
                      onClick={() => addToBag(p)}
                    >
                      + Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          5. SIGNATURE INTERACTION: CENTRAL INGREDIENT EXPLORER (MACRO CANVAS)
          ==================================================================== */}
      <section id="glowe-explorer" className="glowe-ingredient-explorer-section" aria-label="Ingredient Explorer Lab">
        <div className="glowe-explorer-inner">
          <div className="glowe-explorer-header">
            <span className="glowe-wall-section-label">MACRO MOLECULAR VISUALIZER</span>
            <h2 className="glowe-wall-headline">The Ingredient Explorer</h2>
            <p style={{ color: 'var(--glowe-ink-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              Select an active molecule to inspect its biological mechanism and corresponding formulation.
            </p>
          </div>

          <div className="glowe-explorer-stage-layout">
            {/* Left: Molecule Selector List */}
            <div className="glowe-molecules-list">
              {INGREDIENTS_DATA.map((mol, idx) => (
                <button
                  key={mol.id}
                  type="button"
                  className={`glowe-molecule-nav-item ${activeMoleculeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveMoleculeIndex(idx)}
                >
                  <span className="glowe-mol-code">{mol.code}</span>
                  <span className="glowe-mol-name">{mol.name}</span>
                </button>
              ))}
            </div>

            {/* Center: Large High-Resolution Macro Photography Canvas */}
            <div className="glowe-central-macro-stage">
              <img
                src={activeMolecule.image}
                alt={activeMolecule.name}
                className="glowe-central-macro-img"
              />
              <span className="glowe-macro-watermark">
                BIO-PHOTONIC RECORD &bull; {activeMolecule.name}
              </span>
            </div>

            {/* Right: Technical Explanation & Direct Associated Product */}
            <div className="glowe-explorer-detail-panel">
              <span className="glowe-panel-inci">{activeMolecule.inci}</span>
              <h3 className="glowe-panel-title">{activeMolecule.name}</h3>
              <p className="glowe-panel-bio-mechanism">{activeMolecule.bioMechanism}</p>

              <div className="glowe-associated-product-card">
                <span className="glowe-assoc-label">MATCHED FORMULATION</span>
                <div className="glowe-assoc-flex">
                  <img src={activeAssocProduct.image} alt={activeAssocProduct.name} className="glowe-assoc-thumb" />
                  <div className="glowe-assoc-info">
                    <span className="glowe-assoc-name">{activeAssocProduct.name}</span>
                    <span className="glowe-assoc-price">${activeAssocProduct.price} USD</span>
                  </div>
                  <button
                    type="button"
                    className="glowe-btn-assoc-add"
                    onClick={() => addToBag(activeAssocProduct)}
                  >
                    + Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. EDITORIAL SKIN RITUAL BUILDER (VERTICAL PROGRESS RAIL)
          ==================================================================== */}
      <section id="glowe-builder" className="glowe-ritual-builder-section" aria-label="Skin Ritual Builder">
        <div className="glowe-builder-frame">
          <div className="glowe-builder-rail-layout">
            {/* Left Vertical Progress Rail */}
            <div className="glowe-vertical-rail">
              <div
                className={`glowe-rail-step-indicator ${builderStep === 1 ? 'active' : ''}`}
                onClick={() => setBuilderStep(1)}
              >
                <span className="glowe-rail-circle">01</span>
                <span>CONCERN</span>
              </div>
              <div
                className={`glowe-rail-step-indicator ${builderStep === 2 ? 'active' : ''}`}
                onClick={() => setBuilderStep(2)}
              >
                <span className="glowe-rail-circle">02</span>
                <span>PACING</span>
              </div>
              <div
                className={`glowe-rail-step-indicator ${builderStep === 3 ? 'active' : ''}`}
                onClick={() => setBuilderStep(3)}
              >
                <span className="glowe-rail-circle">03</span>
                <span>CURATED SUITE</span>
              </div>
            </div>

            {/* Right Interactive Canvas */}
            <div className="glowe-rail-content-canvas">
              {builderStep === 1 && (
                <div>
                  <h3 className="glowe-builder-question-heading">
                    What is your barrier's primary clinical objective?
                  </h3>
                  <div className="glowe-builder-tiles-2x2">
                    <div
                      className={`glowe-builder-concern-box ${builderConcern === 'hydration' ? 'selected' : ''}`}
                      onClick={() => {
                        setBuilderConcern('hydration');
                        setBuilderStep(2);
                      }}
                    >
                      <div className="glowe-box-icon">💧</div>
                      <h4 className="glowe-box-title">Deep Hydration</h4>
                      <p className="glowe-box-desc">Dryness, cellular dehydration lines, flaking surface stratum.</p>
                    </div>

                    <div
                      className={`glowe-builder-concern-box ${builderConcern === 'barrier' ? 'selected' : ''}`}
                      onClick={() => {
                        setBuilderConcern('barrier');
                        setBuilderStep(2);
                      }}
                    >
                      <div className="glowe-box-icon">🛡️</div>
                      <h4 className="glowe-box-title">Lipid Barrier Repair</h4>
                      <p className="glowe-box-desc">Over-exfoliated sensitivity, redness, burning sensations.</p>
                    </div>

                    <div
                      className={`glowe-builder-concern-box ${builderConcern === 'brightening' ? 'selected' : ''}`}
                      onClick={() => {
                        setBuilderConcern('brightening');
                        setBuilderStep(2);
                      }}
                    >
                      <div className="glowe-box-icon">✨</div>
                      <h4 className="glowe-box-title">Radiance & Tone</h4>
                      <p className="glowe-box-desc">Post-acne pigmentation, morning under-eye vascular fatigue.</p>
                    </div>

                    <div
                      className={`glowe-builder-concern-box ${builderConcern === 'texture' ? 'selected' : ''}`}
                      onClick={() => {
                        setBuilderConcern('texture');
                        setBuilderStep(2);
                      }}
                    >
                      <div className="glowe-box-icon">🌿</div>
                      <h4 className="glowe-box-title">Pore Texture Refining</h4>
                      <p className="glowe-box-desc">Roughness, keratin accumulation, lack of glass-skin reflection.</p>
                    </div>
                  </div>
                </div>
              )}

              {builderStep === 2 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <button
                      type="button"
                      className="glowe-header-action-btn"
                      onClick={() => setBuilderStep(1)}
                    >
                      &larr; Back to Concerns
                    </button>
                    <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.75rem', color: 'var(--glowe-olive)' }}>
                      TARGET: {builderConcern.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="glowe-builder-question-heading">
                    Select your preferred daily pacing
                  </h3>

                  <div className="glowe-builder-pacing-grid">
                    <div
                      className={`glowe-pacing-card ${builderPacing === '2' ? 'selected' : ''}`}
                      onClick={() => {
                        setBuilderPacing('2');
                        setBuilderStep(3);
                      }}
                    >
                      <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.65rem', color: 'var(--glowe-olive)', fontWeight: 700 }}>
                        STREAMLINED &bull; 2 STEPS
                      </span>
                      <h4 style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '1.6rem', margin: '0.35rem 0 0.5rem' }}>
                        The Essential Protocol
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--glowe-ink-muted)' }}>
                        Two high-performance formulations delivering barrier stability without excessive time investment.
                      </p>
                    </div>

                    <div
                      className={`glowe-pacing-card ${builderPacing === '4' ? 'selected' : ''}`}
                      onClick={() => {
                        setBuilderPacing('4');
                        setBuilderStep(3);
                      }}
                    >
                      <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.65rem', color: 'var(--glowe-terracotta)', fontWeight: 700 }}>
                        COMPREHENSIVE &bull; 4 STEPS
                      </span>
                      <h4 style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '1.6rem', margin: '0.35rem 0 0.5rem' }}>
                        The Complete Editorial
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--glowe-ink-muted)' }}>
                        Multi-layered East Asian essence hydration, targeted active concentrates, and protective lipid sealing.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {builderStep === 3 && (
                <div>
                  <div className="glowe-curated-suite-header">
                    <div>
                      <span className="glowe-wall-section-label">CURATED CLINICAL SUITE</span>
                      <h3 style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '1.85rem', color: 'var(--glowe-ink)' }}>
                        {builderPacing}-Step Regimen for {builderConcern.toUpperCase()}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        type="button"
                        className="glowe-header-action-btn"
                        onClick={() => setBuilderStep(1)}
                      >
                        Reset Diagnostic
                      </button>
                      <button
                        type="button"
                        className="glowe-cta-ink-block"
                        onClick={() => recommendedSuiteProducts.forEach(p => addToBag(p))}
                      >
                        Add Complete Suite to Bag
                      </button>
                    </div>
                  </div>

                  <div className="glowe-suite-grid">
                    {recommendedSuiteProducts.map((p, idx) => (
                      <div key={p.id} className="glowe-suite-card">
                        <div className="glowe-suite-thumb">
                          <span className="glowe-suite-step-tag">STEP 0{idx + 1}</span>
                          <img src={p.image} alt={p.name} className="glowe-suite-img" />
                        </div>
                        <div className="glowe-suite-body">
                          <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.6rem', color: 'var(--glowe-ink-subtle)' }}>
                            {p.categoryLabel}
                          </span>
                          <h4 className="glowe-suite-name">{p.name}</h4>
                          <span className="glowe-suite-price">${p.price} USD</span>
                          <div className="glowe-suite-actions">
                            <button
                              type="button"
                              className="glowe-header-action-btn"
                              style={{ fontSize: '0.62rem', justifyContent: 'center' }}
                              onClick={() => setDetailProduct(p)}
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              className="glowe-sec-btn-add"
                              onClick={() => addToBag(p)}
                            >
                              + Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.7rem', color: 'var(--glowe-ink-subtle)', fontStyle: 'italic' }}>
                    *Formulated with pharmaceutical grade purity. General compatibility matching for demonstration purposes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. CIRCADIAN DAILY RITUAL (AM / PM VERTICAL SEQUENCE)
          ==================================================================== */}
      <section id="glowe-circadian" className="glowe-circadian-timeline-section" aria-label="Circadian Routine Timeline">
        <div className="glowe-circadian-inner">
          <div className="glowe-circadian-top">
            <div>
              <span className="glowe-wall-section-label">CHRONO-DERMATOLOGY</span>
              <h2 className="glowe-wall-headline">Circadian Order of Use</h2>
            </div>

            <div className="glowe-circadian-toggle">
              <button
                type="button"
                className={`glowe-circadian-btn ${circadianMode === 'am' ? 'active' : ''}`}
                onClick={() => setCircadianMode('am')}
              >
                AM &bull; Daytime Shield
              </button>
              <button
                type="button"
                className={`glowe-circadian-btn ${circadianMode === 'pm' ? 'active' : ''}`}
                onClick={() => setCircadianMode('pm')}
              >
                PM &bull; Nighttime Repair
              </button>
            </div>
          </div>

          <div className="glowe-vertical-timeline-stack">
            {circadianMode === 'am' ? (
              <>
                <div className="glowe-circadian-step-card">
                  <div className="glowe-step-time-dot">1</div>
                  <span className="glowe-step-time-label">07:30 AM &bull; CLEANSE</span>
                  <h4 className="glowe-step-headline">Dissolve Sebum</h4>
                  <p className="glowe-step-instruction">
                    Gentle lukewarm wash using colloidal oat to cleanse without disrupting fragile acid mantle.
                  </p>
                  <div className="glowe-step-product-snip" onClick={() => setDetailProduct(PRODUCTS[1])}>
                    <img src={PRODUCTS[1].image} alt="" className="glowe-snip-img" />
                    <div>
                      <div className="glowe-snip-name">Cloudmilk Cleanser</div>
                      <div className="glowe-snip-price">$42</div>
                    </div>
                  </div>
                </div>

                <div className="glowe-circadian-step-card">
                  <div className="glowe-step-time-dot">2</div>
                  <span className="glowe-step-time-label">07:33 AM &bull; PRIME</span>
                  <h4 className="glowe-step-headline">Micro-Hydrate</h4>
                  <p className="glowe-step-instruction">
                    Pat fermented rice water to create water channels for subsequent serum transport.
                  </p>
                  <div className="glowe-step-product-snip" onClick={() => setDetailProduct(PRODUCTS[5])}>
                    <img src={PRODUCTS[5].image} alt="" className="glowe-snip-img" />
                    <div>
                      <div className="glowe-snip-name">Rice Micro-Essence</div>
                      <div className="glowe-snip-price">$48</div>
                    </div>
                  </div>
                </div>

                <div className="glowe-circadian-step-card">
                  <div className="glowe-step-time-dot">3</div>
                  <span className="glowe-step-time-label">07:36 AM &bull; PLUMP</span>
                  <h4 className="glowe-step-headline">Deep Moisture</h4>
                  <p className="glowe-step-instruction">
                    Layer multi-weight hyaluronic acid to lock 72h cellular hydration beneath daily exposure.
                  </p>
                  <div className="glowe-step-product-snip" onClick={() => setDetailProduct(PRODUCTS[0])}>
                    <img src={PRODUCTS[0].image} alt="" className="glowe-snip-img" />
                    <div>
                      <div className="glowe-snip-name">Dew Theory Serum</div>
                      <div className="glowe-snip-price">$68</div>
                    </div>
                  </div>
                </div>

                <div className="glowe-circadian-step-card">
                  <div className="glowe-step-time-dot">4</div>
                  <span className="glowe-step-time-label">07:40 AM &bull; DEFEND</span>
                  <h4 className="glowe-step-headline">Solar Shield</h4>
                  <p className="glowe-step-instruction">
                    Finish with 100% invisible mineral SPF 50 with ectoin to deflect UV, HEV light, and particulate soot.
                  </p>
                  <div className="glowe-step-product-snip" onClick={() => setDetailProduct(PRODUCTS[3])}>
                    <img src={PRODUCTS[3].image} alt="" className="glowe-snip-img" />
                    <div>
                      <div className="glowe-snip-name">Sun Ritual SPF 50</div>
                      <div className="glowe-snip-price">$46</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="glowe-circadian-step-card">
                  <div className="glowe-step-time-dot">1</div>
                  <span className="glowe-step-time-label">09:30 PM &bull; PURIFY</span>
                  <h4 className="glowe-step-headline">Dissolve Sunscreen</h4>
                  <p className="glowe-step-instruction">
                    Emulsify waterproof mineral filters and airborne particulate matter without barrier friction.
                  </p>
                  <div className="glowe-step-product-snip" onClick={() => setDetailProduct(PRODUCTS[1])}>
                    <img src={PRODUCTS[1].image} alt="" className="glowe-snip-img" />
                    <div>
                      <div className="glowe-snip-name">Cloudmilk Cleanser</div>
                      <div className="glowe-snip-price">$42</div>
                    </div>
                  </div>
                </div>

                <div className="glowe-circadian-step-card">
                  <div className="glowe-step-time-dot">2</div>
                  <span className="glowe-step-time-label">09:34 PM &bull; REFINE</span>
                  <h4 className="glowe-step-headline">Galactomyces Kiss</h4>
                  <p className="glowe-step-instruction">
                    Enzymatic rice fermentation works through the night to loosen keratin buildup without peels.
                  </p>
                  <div className="glowe-step-product-snip" onClick={() => setDetailProduct(PRODUCTS[5])}>
                    <img src={PRODUCTS[5].image} alt="" className="glowe-snip-img" />
                    <div>
                      <div className="glowe-snip-name">Rice Micro-Essence</div>
                      <div className="glowe-snip-price">$48</div>
                    </div>
                  </div>
                </div>

                <div className="glowe-circadian-step-card">
                  <div className="glowe-step-time-dot">3</div>
                  <span className="glowe-step-time-label">09:38 PM &bull; ORBITAL</span>
                  <h4 className="glowe-step-headline">Awaken Eyes</h4>
                  <p className="glowe-step-instruction">
                    Targeted green tea caffeine and tetrapeptide-30 stimulates overnight micro-lymphatic drainage.
                  </p>
                  <div className="glowe-step-product-snip" onClick={() => setDetailProduct(PRODUCTS[4])}>
                    <img src={PRODUCTS[4].image} alt="" className="glowe-snip-img" />
                    <div>
                      <div className="glowe-snip-name">Cellular Eye Nectar</div>
                      <div className="glowe-snip-price">$54</div>
                    </div>
                  </div>
                </div>

                <div className="glowe-circadian-step-card">
                  <div className="glowe-step-time-dot">4</div>
                  <span className="glowe-step-time-label">09:42 PM &bull; COCOON</span>
                  <h4 className="glowe-step-headline">Lipid Seal</h4>
                  <p className="glowe-step-instruction">
                    Rich ceramide cream formulated with a 3:1:1 lipid ratio prevents overnight trans-epidermal moisture escape.
                  </p>
                  <div className="glowe-step-product-snip" onClick={() => setDetailProduct(PRODUCTS[2])}>
                    <img src={PRODUCTS[2].image} alt="" className="glowe-snip-img" />
                    <div>
                      <div className="glowe-snip-name">Barrier Veil Cream</div>
                      <div className="glowe-snip-price">$58</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. TEXTURE STUDIO COLLAGE
          ==================================================================== */}
      <section className="glowe-texture-studio-collage" aria-label="Tactile Texture Studio">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <span className="glowe-wall-section-label">SENSORY FORMULATION</span>
          <h2 className="glowe-wall-headline">The Texture Studio</h2>
          <p style={{ color: 'var(--glowe-ink-muted)', marginTop: '0.5rem' }}>
            Textures compounded to melt into skin with zero tackiness, silicones, or heavy mineral occlusives.
          </p>
        </div>

        <div className="glowe-texture-mosaic">
          <div className="glowe-mosaic-item">
            <img src="/projects/glowe/texture-cream.jpg" alt="Velvet Cream" className="glowe-mosaic-img" />
            <div className="glowe-mosaic-overlay">
              <span className="glowe-mosaic-tag">TEXTURE 01 &bull; VELVET CREAM</span>
              <h3 className="glowe-mosaic-title">Whipped Lipid Veil</h3>
              <p className="glowe-mosaic-desc">Micro-whipped ceramide emulsion that coats skin in breathable comfort.</p>
            </div>
          </div>

          <div className="glowe-mosaic-item">
            <img src="/projects/glowe/texture-serum.jpg" alt="Serum Droplet" className="glowe-mosaic-img" />
            <div className="glowe-mosaic-overlay">
              <span className="glowe-mosaic-tag">TEXTURE 02 &bull; DEWY ELIXIR</span>
              <h3 className="glowe-mosaic-title">Hydro-Burst Elixir</h3>
              <p className="glowe-mosaic-desc">Breaks into cool water upon fingertip contact for instant quenching.</p>
            </div>
          </div>

          <div className="glowe-mosaic-item">
            <img src="/projects/glowe/texture-gel.jpg" alt="Aqua Gel" className="glowe-mosaic-img" />
            <div className="glowe-mosaic-overlay">
              <span className="glowe-mosaic-tag">TEXTURE 03 &bull; AQUA GEL</span>
              <h3 className="glowe-mosaic-title">Cooling Cryo-Gel</h3>
              <p className="glowe-mosaic-desc">Lowers skin surface temperature by 1.8°C to subdue inflammatory flushing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. BRAND STORY EDITORIAL
          ==================================================================== */}
      <section id="glowe-story" className="glowe-brand-story-editorial" aria-label="About GLOWÉ">
        <div className="glowe-story-editorial-grid">
          <div className="glowe-editorial-frame">
            <img
              src="/projects/glowe/story-botanical-lab.jpg"
              alt="GLOWÉ extraction laboratory"
              className="glowe-editorial-img"
            />
            <div className="glowe-editorial-colophon">
              <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--glowe-ink)', fontWeight: 700 }}>
                LABORATOIRE GLOWÉ &bull; KYOTO
              </span>
              <div style={{ fontSize: '0.65rem', color: 'var(--glowe-olive)' }}>Cold-Fermentation Extraction Vaults</div>
            </div>
          </div>

          <div>
            <span className="glowe-wall-section-label">OUR PHILOSOPHY</span>
            <h2 style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', lineHeight: 1.15, margin: '0.5rem 0 1.5rem', fontStyle: 'italic' }}>
              "True skin luminosity cannot be coerced. It must be cultivated from the barrier inward."
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--glowe-ink-muted)', marginBottom: '1.25rem' }}>
              GLOWÉ was conceived in 2024 as an antidote to the aggressive chemical peel culture. By harnessing Kyoto cold-process fermentation and Parisian dermatological lipid chemistry, we develop formulas that work in physiological harmony with the skin microbiome.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--glowe-ink-muted)' }}>
              Packaged exclusively in biophotonic violet glass to filter degrading visible wavelengths, our botanical concentrates remain chemically active from the first drop to the last.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. NEWSLETTER & COLOPHON FOOTER
          ==================================================================== */}
      <section className="glowe-newsletter-plate" aria-label="Editorial Gazette">
        <span className="glowe-wall-section-label">THE GLOWÉ GAZETTE</span>
        <h3>Subscribe to Private Formulary Dispatches</h3>
        <p>
          Receive seasonal botanical harvest reports, barrier health guides, and private invitation access to batch releases.
        </p>

        {newsletterSuccess ? (
          <div style={{ color: 'var(--glowe-olive)', fontWeight: 600, fontSize: '0.9rem' }}>
            ✓ Thank you for subscribing. Your private formulary dispatch has been sent.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newsletterEmail && newsletterEmail.includes('@')) {
                setNewsletterSuccess(true);
              }
            }}
            style={{ display: 'flex', gap: '0.5rem', maxWidth: '440px', margin: '0 auto' }}
          >
            <input
              type="email"
              className="glowe-tray-input"
              placeholder="Enter your editorial email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="glowe-cta-ink-block">
              Subscribe
            </button>
          </form>
        )}
      </section>

      <footer className="glowe-editorial-footer">
        <div className="glowe-footer-inner-colophon">
          <div>
            <h3 style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '2rem', letterSpacing: '0.14em', marginBottom: '0.75rem' }}>
              GLOWÉ
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(247, 243, 237, 0.65)', lineHeight: 1.6, maxWidth: '300px' }}>
              Botanical science and barrier dermatology formulated to cultivate enduring skin vitality without compromise.
            </p>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.7rem', color: 'var(--glowe-terracotta)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Formulations
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <li><a href="#wall" style={{ color: 'rgba(247, 243, 237, 0.75)', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollTo('glowe-wall'); }}>The Product Edit</a></li>
              <li><a href="#explorer" style={{ color: 'rgba(247, 243, 237, 0.75)', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollTo('glowe-explorer'); }}>Ingredient Lab</a></li>
              <li><a href="#builder" style={{ color: 'rgba(247, 243, 237, 0.75)', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollTo('glowe-builder'); }}>Skin Diagnostic</a></li>
            </ul>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.7rem', color: 'var(--glowe-terracotta)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Clinical Standards
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(247, 243, 237, 0.75)' }}>
              <li>Bio-Photonic Violet Glass</li>
              <li>Cold-Process Extraction</li>
              <li>Non-Comedogenic Testing</li>
              <li>Cruelty-Free Leaping Bunny</li>
            </ul>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.7rem', color: 'var(--glowe-terracotta)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Dispatches
            </span>
            <div style={{ fontSize: '0.8rem', color: 'rgba(247, 243, 237, 0.75)', lineHeight: 1.6 }}>
              editorial@gloweskincare.com<br />
              Kyoto Extraction Lab &bull; Paris Studio<br />
              Mon–Fri 09:00–18:00 CET
            </div>
          </div>
        </div>

        <div className="glowe-colophon-bottom">
          <span>&copy; 2026 GLOWÉ BOTANICAL LABORATOIRE. DEMO PROJECT FOR VERHOST SHOWCASE.</span>
          <span>PARIS &bull; KYOTO &bull; DERMATOLOGICAL ARCHIVE</span>
        </div>
      </footer>

      {/* ====================================================================
          11. SLIDE-OUT SHOPPING BAG DRAWER
          ==================================================================== */}
      {isBagOpen && (
        <>
          <div className="glowe-drawer-overlay" onClick={() => setIsBagOpen(false)} />
          <aside className="glowe-editorial-drawer" aria-label="Shopping Bag">
            <div style={{ padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glowe-border)' }}>
              <h3 style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '1.4rem', fontWeight: 600 }}>
                Your Ritual Bag ({totalCartCount})
              </h3>
              <button
                type="button"
                className="glowe-drawer-close-btn"
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--glowe-ink-muted)' }}
                onClick={() => setIsBagOpen(false)}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--glowe-ink-muted)' }}>
                  <p>Your shopping bag is currently empty.</p>
                  <button
                    type="button"
                    className="glowe-cta-ink-block"
                    style={{ marginTop: '1rem', padding: '0.65rem 1.25rem' }}
                    onClick={() => {
                      setIsBagOpen(false);
                      scrollTo('glowe-wall');
                    }}
                  >
                    Discover Formulations
                  </button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.product.id} style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: '1rem', alignItems: 'center', background: 'var(--glowe-white)', padding: '0.85rem', border: '1px solid var(--glowe-border)' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '1rem', fontWeight: 600 }}>{item.product.name}</h4>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--glowe-terracotta)' }}>${item.product.price} USD</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
                        <button
                          type="button"
                          style={{ width: '22px', height: '22px', border: '1px solid var(--glowe-border)', background: 'var(--glowe-porcelain)', cursor: 'pointer' }}
                          onClick={() => updateQuantity(item.product.id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          type="button"
                          style={{ width: '22px', height: '22px', border: '1px solid var(--glowe-border)', background: 'var(--glowe-porcelain)', cursor: 'pointer' }}
                          onClick={() => updateQuantity(item.product.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: 'var(--glowe-ink-subtle)', cursor: 'pointer', fontSize: '1.2rem' }}
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem 1.75rem', borderTop: '1px solid var(--glowe-border)', backgroundColor: 'var(--glowe-white)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--glowe-ink-muted)', fontSize: '0.85rem' }}>Estimated Subtotal</span>
                  <span style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '1.4rem', fontWeight: 700 }}>${subtotal} USD</span>
                </div>
                <button
                  type="button"
                  className="glowe-cta-ink-block"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => showToast('Simulated Checkout: Demonstration order placed.')}
                >
                  Proceed to Checkout &bull; ${subtotal}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--glowe-ink-subtle)', marginTop: '0.65rem', fontStyle: 'italic' }}>
                  VERHOST E-Commerce Prototype &bull; Carbon-neutral delivery & complimentary discovery samples.
                </p>
              </div>
            )}
          </aside>
        </>
      )}

      {/* ====================================================================
          12. PRODUCT DETAIL MODAL
          ==================================================================== */}
      {detailProduct && (
        <div className="glowe-modal-glass-backdrop" role="dialog" aria-modal="true">
          <div className="glowe-editorial-modal">
            <button
              type="button"
              style={{ position: 'absolute', top: '1rem', right: '1.25rem', background: 'var(--glowe-white)', border: '1px solid var(--glowe-border)', width: '32px', height: '32px', cursor: 'pointer', zIndex: 10, fontSize: '1.25rem' }}
              onClick={() => setDetailProduct(null)}
            >
              &times;
            </button>

            <div style={{ backgroundColor: '#ECE5DC', position: 'relative' }}>
              <img src={detailProduct.image} alt={detailProduct.name} style={{ width: '100%', height: '100%', minHeight: '440px', objectFit: 'cover' }} />
            </div>

            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--glowe-font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--glowe-olive)', fontWeight: 700 }}>
                {detailProduct.categoryLabel}
              </span>
              <h2 style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--glowe-ink)', margin: '0.25rem 0 0.5rem' }}>
                {detailProduct.name}
              </h2>
              <span style={{ fontFamily: 'var(--glowe-font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--glowe-terracotta)', marginBottom: '1.25rem' }}>
                ${detailProduct.price} USD
              </span>

              <p style={{ fontSize: '0.9rem', color: 'var(--glowe-ink-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {detailProduct.description}
              </p>

              <div style={{ borderTop: '1px solid var(--glowe-border-light)', paddingTop: '1rem', marginBottom: '1.5rem', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div><strong>Volume:</strong> {detailProduct.size}</div>
                <div><strong>Sensory Feel:</strong> {detailProduct.texture}</div>
                <div><strong>Active Complex:</strong> {detailProduct.keyIngredients}</div>
                <div><strong>Directions:</strong> {detailProduct.howToUse}</div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  className="glowe-cta-ink-block"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    addToBag(detailProduct);
                    setDetailProduct(null);
                  }}
                >
                  Add to Ritual Bag &bull; ${detailProduct.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
