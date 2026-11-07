import React, { useState, useEffect, useRef } from 'react';
import './verdant.css';

// Master Data Collections for VERDANT SYSTEMS

const TECH_CHAPTERS = [
  {
    number: '01',
    code: 'INFRA-01',
    title: 'Renewable Infrastructure',
    tagline: 'Grid-Synchronized Integration & Dynamic Line Architecture',
    desc: 'We engineer dynamic transmission topologies that accommodate multi-gigawatt intermittent solar, wind, and offshore kinetic generation without curtailment. Our proprietary synchronization nodes stabilize line frequency within 4 milliseconds.',
    specs: [
      { label: 'Transmission Efficiency', val: '99.4% HVDC' },
      { label: 'Fault Isolation Time', val: '< 4.2 ms' },
      { label: 'Harmonic Attenuation', val: '-48 dB' },
      { label: 'Thermal Capacity Boost', val: '+38% Dynamic Rating' }
    ],
    image: '/projects/verdant/tech-infrastructure.jpg',
    imageAlt: 'High-voltage transmission substation and illuminated smart power grid with wind turbines at twilight',
    telemetryTag: 'DYNAMIC LINE SENSING • 4.2 MS SYNC',
    coordinates: 'GRID BUS NODE // 47.3769° N, 8.5417° E'
  },
  {
    number: '02',
    code: 'STORE-02',
    title: 'Intelligent Energy Storage',
    tagline: 'Long-Duration Flow Systems & Multi-Horizon Telemetry',
    desc: 'Moving beyond short-cycle lithium constraints, our localized iron-flow and thermodynamic salt architectures deliver 12 to 24 hours of continuous discharge. Algorithmic dispatch models anticipate regional demand surges before wholesale spikes occur.',
    specs: [
      { label: 'Continuous Discharge', val: '14.5 Hours' },
      { label: 'Round-Trip Efficiency', val: '86.2%' },
      { label: 'Electrolyte Degradation', val: 'Zero over 30 yrs' },
      { label: 'Levelized Storage Cost', val: '$0.042 / kWh' }
    ],
    image: '/projects/verdant/tech-storage.jpg',
    imageAlt: 'Grid-scale containerized long-duration flow battery and BESS installation at twilight',
    telemetryTag: '30-YR CYCLE LIFE • NON-FLAMMABLE',
    coordinates: 'FLOW CELL TANK CLUSTER // BESS-02'
  },
  {
    number: '03',
    code: 'DECARB-03',
    title: 'Industrial Decarbonization',
    tagline: 'High-Temperature Electrification & Deep Process Heat',
    desc: 'Heavy industry accounts for over 70% of global process emissions. We replace fossil gas boilers with thermal thermal-battery heat pumps reaching 1,100°C, integrating real-time carbon telemetry down to the production batch level.',
    specs: [
      { label: 'Max Industrial Heat', val: '1,150°C Direct' },
      { label: 'Emissions Abatement', val: 'Up to 94%' },
      { label: 'Telemetry Precision', val: 'Sub-second Scada' },
      { label: 'Fuel Switching ROI', val: '3.4 Years Avg' }
    ],
    image: '/projects/verdant/tech-decarb.jpg',
    imageAlt: '1,150°C clean induction heating furnace core for aerospace titanium and metallurgical processing',
    telemetryTag: '1,150°C INDUCTION • ZERO COMBUSTION',
    coordinates: 'THERMAL CORE // SECTOR 03'
  }
];

const LAB_NODES = [
  {
    id: 'generation',
    step: 'STAGE 01',
    title: 'Renewable Generation',
    role: 'Solar array, offshore wind, and micro-hydro harvesting with localized maximum power point tracking.',
    status: 'ONLINE',
    capacity: '1,450 MW Active',
    flowRate: '4,280 MWh / Day',
    telemetry: 'Grid Frequency: 50.02 Hz'
  },
  {
    id: 'storage',
    step: 'STAGE 02',
    title: 'Energy Storage',
    role: 'Centralized non-degrading flow battery stacks and underground pressurized thermodynamic chambers.',
    status: 'RECHARGING',
    capacity: '3,800 MWh Reserve',
    flowRate: '14.5h Autonomy',
    telemetry: 'Thermal State: 28.4°C'
  },
  {
    id: 'distribution',
    step: 'STAGE 03',
    title: 'Intelligent Distribution',
    role: 'Micro-substations equipped with predictive AI balancing load curves across industrial high-voltage feeders.',
    status: 'OPTIMAL',
    capacity: '99.99% Reliability',
    flowRate: '0.02s Switchover',
    telemetry: 'Line Loss: 0.61%'
  },
  {
    id: 'usage',
    step: 'STAGE 04',
    title: 'Industrial Usage',
    role: 'Electrified steel smelters, chemical reactors, data hubs, and pharmaceutical continuous manufacturing.',
    status: 'ENGAGED',
    capacity: '62 Industrial Partners',
    flowRate: '-88% Net Emissions',
    telemetry: 'Offset Rate: 420 kg/min'
  }
];

const PROJECTS_DATA = [
  {
    id: 'atacama-solar-grid',
    number: 'PRJ-01',
    title: 'Solar Grid Integration',
    location: 'Atacama High-Plains, Chile',
    category: 'Renewable Infrastructure',
    scale: '650 MW Solar PV + 1.2 GWh Storage',
    year: '2025',
    image: '/projects/verdant/project-solar.jpg',
    imageAlt: 'High-altitude utility solar photovoltaic tracking arrays in Atacama',
    summary: 'Deploying high-altitude dynamic transmission lines and localized iron-flow storage to supply uninterrupted base-load power to copper extraction facilities without diesel backup.',
    technologies: ['Dynamic Line Rating', 'Iron-Flow Chemistry', 'Autonomous Inverters', 'Cloud SCADA'],
    narrative: 'Located in the driest desert on earth with the highest solar irradiance index globally (3,300 kWh/m²), the challenge was not generation but 24-hour delivery across mountainous terrain. VERDANT installed 650 MW of single-axis tracking bifacial arrays paired with our 1.2 GWh non-degrading flow batteries. The facility now eliminates 410,000 metric tons of diesel combustion annually.',
    metrics: {
      dieselReplaced: '88M Liters / yr',
      systemUptime: '99.98%',
      peakTransmission: '620 MW'
    }
  },
  {
    id: 'rotterdam-battery-corridor',
    number: 'PRJ-02',
    title: 'Industrial Battery Network',
    location: 'Port of Rotterdam Corridor, Netherlands',
    category: 'Energy Storage',
    scale: '1.2 GWh Distributed Network',
    year: '2026',
    image: '/projects/verdant/project-battery.jpg',
    imageAlt: 'Maritime container terminal industrial battery network and logistics corridor',
    summary: 'A maritime port-wide energy buffer connecting container terminal cranes, electric barge chargers, and petrochemical refining hubs into a unified flexibility asset.',
    technologies: ['Multi-Port Flow Topology', 'Millisecond Frequency Response', 'Thermal Balancing', 'Hydrogen Co-Generation'],
    narrative: 'Heavy container handling and electric inland vessel charging created massive transient power spikes that threatened municipal substations. VERDANT interconnected 8 modular storage hubs along a 14-kilometer canal spine. The system absorbs peak regenerative braking power from 42 gantry cranes and redistributes it directly to maritime fast-chargers.',
    metrics: {
      peakPeakShaved: '142 MW',
      gridCongestion: '-78%',
      maritimeCleanTrips: '14,200 / yr'
    }
  },
  {
    id: 'nordic-smart-campus',
    number: 'PRJ-03',
    title: 'Smart Energy Campus',
    location: 'Nordic Innovation District, Sweden',
    category: 'Intelligent Distribution',
    scale: '85 MW Microgrid with Thermal Sink',
    year: '2025',
    image: '/projects/verdant/project-campus.jpg',
    imageAlt: 'Nordic sustainable research campus and integrated microgrid architecture',
    summary: 'Deep geothermal borehole storage coupled with high-efficiency heat recovery from semiconductor cleanrooms, supplying heating and power to 45,000 research occupants.',
    technologies: ['Borehole Thermal Mass', 'Bidirectional DC Grid', 'Predictive Weather Dispatch', 'Acoustic Insulation'],
    narrative: 'A next-generation technology research park designed to operate completely off-grid for up to 30 continuous winter days. Waste heat from quantum computing and cleanroom operations is redirected into a 300-meter deep seasonal bedrock thermal reservoir, achieving a net-positive seasonal energy return.',
    metrics: {
      selfSufficiency: '96.4%',
      winterPeakReduction: '84%',
      heatRecycled: '42 GWh / yr'
    }
  },
  {
    id: 'bavaria-low-carbon-foundry',
    number: 'PRJ-04',
    title: 'Low-Carbon Manufacturing',
    location: 'Bavaria Advanced Metals, Germany',
    category: 'Industrial Decarbonization',
    scale: '320 kt CO2e Abatement / yr',
    year: '2026',
    image: '/projects/verdant/project-metals.jpg',
    imageAlt: 'Clean electric induction foundry and high-precision titanium alloy fabrication',
    summary: 'Replacing blast-furnace fossil gas firing with industrial electric induction heaters and pressurized steam heat storage for precision aerospace titanium alloys.',
    technologies: ['Induction Thermal Torches', 'Pressurized Steam Storage', 'Scope-1 Telemetry', 'Sub-second Power Modulation'],
    narrative: 'High-grade titanium and nickel superalloy manufacturing requires continuous temperatures exceeding 1,050°C. VERDANT deployed proprietary plasma-induction heating cores powered directly by dedicated regional wind power contracts, proving that heavy metallurgical processes can decarbonize without quality loss.',
    metrics: {
      gasDisplaced: '92% Volume',
      furnaceEfficiency: '+18%',
      scope1Reduction: '320,000 t / yr'
    }
  }
];

const ARTICLES_DATA = [
  {
    id: 'article-solid-state-storage',
    category: 'ENERGY PHYSICS',
    date: 'OCT 2026',
    readTime: '6 MIN READ',
    title: 'The Next Generation of Solid-State Energy Storage',
    excerpt: 'How non-toxic aqueous chemistry and thermodynamic salt phase-change reservoirs are fundamentally dismantling lithium supply bottlenecks for multi-day industrial grid resilience.',
    content: `For decades, the energy transition has operated under a profound misconception: that the batteries powering lightweight consumer electronics and passenger cars are suitable for multi-day industrial power grids. They are not.

Lithium-ion chemistry excels in gravimetric energy density—packing maximum kilowatt-hours into minimum kilograms. But stationary utility infrastructure does not fly; it does not drive. Weight is irrelevant. What matters are levelized cost over thirty years, total absence of thermal runaway risk, and the ability to sustain continuous discharge across 14 to 36 hours during prolonged wind and solar droughts (Dunkelflaute).

At VERDANT, our research centers on iron-chromium flow chemistry and subterranean thermodynamic heat sink vaults. By circulating abundant, non-degrading electrolytes through inert carbon felt membranes, we decouple energy capacity from instantaneous power capacity. To add twelve more hours of storage, we do not build more converters; we simply install larger recyclable liquid tanks. This fundamental physical divergence transforms grid economics from a speculative mineral scramble into durable civic infrastructure.`
  },
  {
    id: 'article-industrial-electrification',
    category: 'SYSTEM DESIGN',
    date: 'SEP 2026',
    readTime: '8 MIN READ',
    title: 'Why Industrial Electrification is the Final Decarbonization Frontier',
    excerpt: 'Over 70% of industrial energy demand is consumed as high-temperature process heat. Why clean electrons alone cannot solve heavy manufacturing without thermal storage buffers.',
    content: `Solar panels and offshore wind farms are visible emblems of decarbonization. Yet when we examine global greenhouse emissions, light-duty mobility and residential electricity represent the easy initial phases. The true structural core of global carbon consumption lies in industrial heat.

From cement calcination and chemical cracking to glass annealing and metallurgy, industrial processes demand continuous thermal energy between 400°C and 1,300°C. Simply connecting electric resistive heaters to an intermittent grid will inevitably collapse regional distribution lines or force factories into costly shutdowns when the wind ceases.

The solution requires thermal energy storage as an active buffer: converting surplus clean electricity at midday into latent sensible heat stored in high-density graphite and crushed refractory ceramics, then continuously discharging clean hot air or high-pressure steam at precisely regulated temperatures around the clock.`
  },
  {
    id: 'article-resilient-micro-networks',
    category: 'GRID ARCHITECTURE',
    date: 'AUG 2026',
    readTime: '5 MIN READ',
    title: 'Designing Resilient Micro-Networks for Unpredictable Grid Strain',
    excerpt: 'Extreme weather phenomena and rapid datacenter expansion require decentralized grid nodes capable of autonomous islanding and sub-cycle harmonic compensation.',
    content: `The 20th-century transmission model—centralized generation stations broadcasting power outwards in a unidirectional tree topology—is failing under the dual pressures of extreme meteorological volatility and unprecedented localized demand from AI computing clusters.

Modern resilience demands cellular architectures. Each industrial campus, manufacturing corridor, or district hospital must function as an autonomous biological cell: capable of seamless synchronization with the national grid during nominal conditions, yet instantly capable of autonomous islanding without voltage flicker when transmission lines trip.

By distributing solid-state transformer nodes with localized inertia synthesis, VERDANT micro-networks eliminate single points of failure across critical economic corridors.`
  },
  {
    id: 'article-capital-renewable-infrastructure',
    category: 'CAPITAL DYNAMICS',
    date: 'JUL 2026',
    readTime: '7 MIN READ',
    title: 'Capital Allocation Dynamics in Next-Gen Renewable Infrastructure',
    excerpt: 'Why early-stage curtailment risks are driving capital towards integrated storage assets rather than speculative standalone generation portfolios.',
    content: `In mature renewable markets such as Northern Europe, California, and South Australia, electricity wholesale prices increasingly drop to zero—or negative values—during midday peak generation, only to skyrocket during evening demand peaks.

Investors allocating capital into standalone solar or wind projects face escalating curtailment risk: generating clean power that the grid cannot absorb. As a consequence, institutional infrastructure funds are pivoting towards integrated generation-plus-storage platforms.

By co-locating multi-hour storage with predictive telemetry, developers lock in bankable fixed-capacity tariffs rather than gambling on volatile spot energy markets. Infrastructure maturity is defined not by how much power you generate, but by how reliably you can deliver it when demand is critical.`
  }
];

export default function VerdantSystems() {
  // Interactive State
  const [activeTechChapter, setActiveTechChapter] = useState(0);
  const [selectedLabNode, setSelectedLabNode] = useState(LAB_NODES[0]);
  const [detailProject, setDetailProject] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    fetch('/api/sync-verdant').catch(() => {});
  }, []);

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    organization: '',
    sector: 'renewable-utility',
    scale: '50-250 MW',
    message: ''
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Living Energy Typography Mouse Position Tracking
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });
  const heroRef = useRef(null);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.organization) {
      showToast('Please provide your name and enterprise organization.');
      return;
    }
    setEnquirySubmitted(true);
    showToast('Consultation transmission sent to VERDANT Systems Advisory.');
  };

  return (
    <div className="verdant-root verdant-tech-grid-bg" onMouseMove={handleHeroMouseMove}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#090B09',
          border: '1px solid #A5F36C',
          color: '#A5F36C',
          padding: '0.85rem 1.5rem',
          fontFamily: 'var(--verdant-font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          zIndex: 2000,
          boxShadow: '0 8px 32px rgba(165, 243, 108, 0.3)'
        }}>
          [✓] {toastMessage}
        </div>
      )}

      {/* ====================================================================
          1. MINIMAL ARCHITECTURAL HEADER
          ==================================================================== */}
      <header className="verdant-header">
        <div className="verdant-header-inner">
          <div className="verdant-brand-lockup" onClick={() => scrollTo('verdant-hero')}>
            <span className="verdant-brand-wordmark">
              <span className="verdant-brand-dot" />
              VERDANT SYSTEMS
            </span>
            <span className="verdant-brand-descriptor">
              CLIMATE TECHNOLOGY / EST. 2026
            </span>
          </div>

          <nav>
            <ul className="verdant-nav-links">
              <li>
                <button type="button" className="verdant-nav-link" onClick={() => scrollTo('verdant-problem')}>
                  01 Problem
                </button>
              </li>
              <li>
                <button type="button" className="verdant-nav-link" onClick={() => scrollTo('verdant-technology')}>
                  02 Technology
                </button>
              </li>
              <li>
                <button type="button" className="verdant-nav-link" onClick={() => scrollTo('verdant-lab')}>
                  03 Energy Lab
                </button>
              </li>
              <li>
                <button type="button" className="verdant-nav-link" onClick={() => scrollTo('verdant-impact')}>
                  04 Impact
                </button>
              </li>
              <li>
                <button type="button" className="verdant-nav-link" onClick={() => scrollTo('verdant-projects')}>
                  05 Projects
                </button>
              </li>
              <li>
                <button type="button" className="verdant-nav-link" onClick={() => scrollTo('verdant-insights')}>
                  06 Insights
                </button>
              </li>
            </ul>
          </nav>

          <div className="verdant-header-actions">
            <button
              type="button"
              className="verdant-talk-btn"
              onClick={() => scrollTo('verdant-closing')}
            >
              <span>Let&apos;s Talk</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          2. HOMEPAGE HERO — LIVING ENERGY TYPOGRAPHY
          ==================================================================== */}
      <section
        id="verdant-hero"
        ref={heroRef}
        className="verdant-hero"
        aria-label="Verdant Systems Living Energy Opening"
      >
        {/* Interactive Pointer Energy Illumination */}
        <div
          className="verdant-hero-energy-glow"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`
          }}
        />

        {/* Abstract Vector Energy Flow Schematic in Background */}
        <svg className="verdant-hero-bg-visual" viewBox="0 0 1400 700" fill="none">
          <circle cx="1100" cy="350" r="280" stroke="rgba(165, 243, 108, 0.12)" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="1100" cy="350" r="180" stroke="rgba(165, 243, 108, 0.18)" strokeWidth="1" />
          <line x1="200" y1="180" x2="1200" y2="180" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
          <line x1="100" y1="520" x2="1300" y2="520" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
          
          {/* Animated Flowing Energy Waveform */}
          <path
            d="M 50 350 Q 300 200, 600 350 T 1100 350 T 1400 350"
            stroke="var(--verdant-electric)"
            strokeWidth="1.5"
            fill="none"
            className="verdant-flowing-line"
            opacity="0.4"
          />
        </svg>

        {/* Top Wire & Editorial Metadata */}
        <div className="verdant-hero-top-bar">
          <div className="verdant-hero-index-pill">
            <span>INDEX // 01</span>
            <span>A NEW ENERGY SYSTEM</span>
          </div>
          <div className="verdant-hero-telemetry-badge">
            <span className="verdant-telemetry-dot" />
            <span>GRID SYNCHRONIZATION ACTIVE &bull; 50.00 HZ</span>
          </div>
          <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.62rem' }}>
            LAT 47.3769° N &bull; LON 8.5417° E
          </span>
        </div>

        {/* Center Typography Canvas */}
        <div className="verdant-hero-typographic-stage">
          <h1 className="verdant-hero-headline">
            <span className="verdant-headline-line">
              ENERGY,
            </span>
            <span className="verdant-headline-line">
              <span className="verdant-headline-outlined">RE</span>
              <span className="verdant-headline-highlight">imagined.</span>
            </span>
          </h1>
        </div>

        {/* Bottom Stage: Editorial Statement, Actions, Key Spec Strip */}
        <div className="verdant-hero-bottom-stage">
          <div className="verdant-hero-statement">
            We design intelligent systems that make cleaner energy more accessible, measurable, and scalable.
          </div>

          <div className="verdant-hero-actions-col">
            <button
              type="button"
              className="verdant-editorial-link"
              onClick={() => scrollTo('verdant-technology')}
            >
              <span>Explore Our Technology</span>
              <span>&rarr;</span>
            </button>
            <button
              type="button"
              className="verdant-editorial-link verdant-editorial-link-sec"
              onClick={() => scrollTo('verdant-problem')}
            >
              <span>Our Approach</span>
              <span>&nearr;</span>
            </button>
          </div>

          <div className="verdant-hero-specs-col">
            <div className="verdant-spec-row">
              <span>STORAGE DURATION</span>
              <span className="verdant-spec-val">12-24 Hours</span>
            </div>
            <div className="verdant-spec-row">
              <span>GRID STABILITY</span>
              <span className="verdant-spec-val">&plusmn; 0.01 Hz Synchronized</span>
            </div>
            <div className="verdant-spec-row">
              <span>HEAT ELECTRIFICATION</span>
              <span className="verdant-spec-val">Up to 1,150&deg;C</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. SECTION TWO — THE ENERGY PROBLEM (WARM WHITE EDITORIAL INVERSION)
          ==================================================================== */}
      <section id="verdant-problem" className="verdant-problem-section" aria-label="The Energy Problem">
        <div className="verdant-problem-inner">
          <div className="verdant-problem-top-wire">
            <span>EDITORIAL ESSAY // CHAPTER 01</span>
            <span>SYSTEM VOLATILITY &bull; THE STORAGE DEFICIT</span>
          </div>

          <div className="verdant-problem-grid">
            <h2 className="verdant-problem-headline">
              The future<br />
              needs more<br />
              than <span className="highlight-serif">clean power.</span>
            </h2>

            <div className="verdant-problem-editorial-col">
              <p className="verdant-problem-lead">
                Generating intermittent green electrons is no longer the technological frontier. Delivering dependable, round-the-clock base-load electricity and high-temperature thermal power to heavy industry is.
              </p>
              <p className="verdant-problem-body">
                Today&apos;s transmission grids were constructed for steady, predictable fossil turbines. As wind and solar generation surges, networks suffer from catastrophic midday curtailment followed by evening deficit spikes. Without multi-hour storage and sub-second automated synchronization, expanding renewable capacity alone risks destabilizing the very grids we depend on.
              </p>
            </div>
          </div>

          {/* Demonstrative Numerical Callouts */}
          <div className="verdant-problem-metrics-grid">
            <div className="verdant-metric-block">
              <span className="verdant-metric-big-num">73%</span>
              <span className="verdant-metric-label">Industrial Heat Fossil Reliance</span>
              <span className="verdant-metric-desc">
                Three quarters of global industrial energy is consumed as process heat, almost entirely supplied by methane and coal combustion.
              </span>
              <span className="verdant-metric-disclaimer">*Illustrative industry baseline benchmark</span>
            </div>

            <div className="verdant-metric-block">
              <span className="verdant-metric-big-num">4.2&times;</span>
              <span className="verdant-metric-label">Grid Balancing Capacity Needed</span>
              <span className="verdant-metric-desc">
                Anticipated flexibility reserve required by transmission operators over the next decade to absorb high renewable penetration.
              </span>
              <span className="verdant-metric-disclaimer">*Illustrative grid modeling scenario</span>
            </div>

            <div className="verdant-metric-block">
              <span className="verdant-metric-big-num">12h+</span>
              <span className="verdant-metric-label">Storage Duration Threshold</span>
              <span className="verdant-metric-desc">
                The minimum continuous discharge threshold required to bridge overnight deficits and multi-day meteorological lulls.
              </span>
              <span className="verdant-metric-disclaimer">*Technological target architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. SECTION THREE — OUR TECHNOLOGY (3 DIVERSE EDITORIAL CHAPTERS)
          ==================================================================== */}
      <section id="verdant-technology" className="verdant-tech-section" aria-label="Our Core Technology">
        <div className="verdant-tech-inner">
          <div className="verdant-tech-header">
            <div>
              <span className="verdant-section-tag">ENGINEERING DOMAINS</span>
              <h2 className="verdant-section-headline">Our Technology</h2>
            </div>
            <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.72rem', color: 'var(--verdant-gray)' }}>
              3 INTERCONNECTED RESEARCH DIVISIONS
            </span>
          </div>

          <div className="verdant-tech-chapters-list">
            {TECH_CHAPTERS.map((ch, idx) => (
              <article key={ch.number} className="verdant-tech-chapter-item">
                <div className="verdant-tech-chapter-grid">
                  {/* Left Editorial Column */}
                  <div className="verdant-chapter-content-side">
                    <div>
                      <div className="verdant-chapter-top-meta">
                        <span>DIVISION [{ch.number}]</span>
                        <span>{ch.code}</span>
                      </div>
                      <h3 className="verdant-chapter-title">{ch.title}</h3>
                      <p style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.78rem', color: 'var(--verdant-electric)', marginBottom: '1rem', letterSpacing: '0.06em' }}>
                        {ch.tagline}
                      </p>
                      <p className="verdant-chapter-desc">{ch.desc}</p>
                    </div>

                    <div className="verdant-chapter-specs-strip">
                      {ch.specs.map((s, sIdx) => (
                        <div key={sIdx} className="verdant-chapter-spec-item">
                          <span className="spec-bullet">&bull;</span>
                          <strong>{s.label}:</strong>
                          <span style={{ color: 'var(--verdant-white)' }}>{s.val}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '2.5rem' }}>
                      <button
                        type="button"
                        className="verdant-editorial-link"
                        onClick={() => {
                          setActiveTechChapter(idx);
                          scrollTo('verdant-lab');
                        }}
                      >
                        <span>Simulate in Technology Lab</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Technical Photography & Live Telemetry HUD */}
                  <div className="verdant-chapter-visual-side">
                    <div className="verdant-chapter-photo-wrap">
                      <img
                        src={ch.image}
                        alt={ch.imageAlt}
                        className="verdant-chapter-photo"
                        loading="lazy"
                      />
                      <div className="verdant-chapter-photo-overlay">
                        <div className="verdant-chapter-photo-top-hud">
                          <span className="verdant-chapter-badge">
                            <span className="verdant-pulse-dot" />
                            {ch.telemetryTag}
                          </span>
                          <span className="verdant-chapter-id-tag">DIVISION // [{ch.number}]</span>
                        </div>
                        <div className="verdant-chapter-photo-bottom-hud">
                          <span className="verdant-chapter-coords-text">{ch.coordinates}</span>
                          <span className="verdant-chapter-status-live">STATUS // CONTINUOUS ACTIVE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SECTION FOUR — THE TECHNOLOGY LAB (INTERACTIVE ENERGY SYSTEM DIAGRAM)
          ==================================================================== */}
      <section id="verdant-lab" className="verdant-lab-section" aria-label="Interactive Energy Lab">
        <div className="verdant-lab-inner">
          <div className="verdant-lab-header">
            <span className="verdant-section-tag">SIMULATION SUITE</span>
            <h2 className="verdant-section-headline" style={{ color: 'var(--verdant-white)' }}>
              The Technology Lab
            </h2>
            <p className="verdant-lab-sub">
              An interactive topological visualization demonstrating the four interconnected stages of our autonomous energy architecture. Select any stage to inspect real-time telemetry parameters.
            </p>
          </div>

          <div className="verdant-lab-interactive-canvas">
            {/* 4 Pipeline Stages */}
            <div className="verdant-lab-nodes-row">
              {LAB_NODES.map((node) => (
                <div
                  key={node.id}
                  className={`verdant-lab-node-card ${selectedLabNode.id === node.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLabNode(node);
                    showToast(`Selected Node: ${node.title}`);
                  }}
                >
                  <div className="verdant-node-top-wire">
                    <span>{node.step}</span>
                    <div className="verdant-node-status-indicator">
                      <span className="verdant-node-status-dot" />
                      <span>{node.status}</span>
                    </div>
                  </div>

                  <h3 className="verdant-node-title">{node.title}</h3>
                  <p className="verdant-node-role">{node.role}</p>

                  <div className="verdant-node-telemetry-tag">
                    {node.capacity}
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting Visual Energy Pipeline */}
            <div className="verdant-lab-pipeline-wire" />

            {/* Active Selected Node Dossier Panel */}
            <div className="verdant-lab-detail-dossier">
              <div>
                <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.65rem', color: 'var(--verdant-gray)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  ACTIVE NODE TELEMETRY // {selectedLabNode.step}
                </span>
                <h4 className="verdant-dossier-headline">{selectedLabNode.title}</h4>
                <p className="verdant-dossier-p">{selectedLabNode.role}</p>
              </div>

              <div className="verdant-dossier-specs-grid">
                <div className="verdant-dossier-spec-item">
                  <span className="verdant-dossier-spec-label">FLOW RATE</span>
                  <span className="verdant-dossier-spec-val">{selectedLabNode.flowRate}</span>
                </div>
                <div className="verdant-dossier-spec-item">
                  <span className="verdant-dossier-spec-label">SYSTEM STATE</span>
                  <span className="verdant-dossier-spec-val" style={{ color: 'var(--verdant-electric)' }}>{selectedLabNode.status}</span>
                </div>
                <div className="verdant-dossier-spec-item">
                  <span className="verdant-dossier-spec-label">LIVE SENSING</span>
                  <span className="verdant-dossier-spec-val">{selectedLabNode.telemetry}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. SECTION FIVE — MEASURABLE IMPACT (DATA-LED EDITORIAL PUBLICATION)
          ==================================================================== */}
      <section id="verdant-impact" className="verdant-impact-section" aria-label="Measurable Environmental Impact">
        <div className="verdant-impact-inner">
          <div className="verdant-impact-top-strip">
            <div>
              <span className="verdant-section-tag" style={{ color: 'var(--verdant-forest)' }}>DATA ARCHIVE // REPORT 2026</span>
              <h2 className="verdant-impact-main-title">Measurable Impact</h2>
            </div>
            <span className="verdant-impact-provenance">
              VERIFIED DECARBONIZATION TELEMETRY
            </span>
          </div>

          <div className="verdant-impact-data-grid">
            <div className="verdant-impact-card">
              <span className="verdant-impact-metric-num">3.8 GWh</span>
              <span className="verdant-impact-metric-title">Clean Energy Dispatched</span>
              <p className="verdant-impact-metric-copy">
                Cumulative baseline electricity balanced through localized flow-storage nodes during peak grid strain hours.
              </p>
              <span className="verdant-impact-methodology">
                *Illustrative demonstration benchmark
              </span>
            </div>

            <div className="verdant-impact-card">
              <span className="verdant-impact-metric-num">1.4 MT</span>
              <span className="verdant-impact-metric-title">CO2e Emissions Mitigated</span>
              <p className="verdant-impact-metric-copy">
                Fossil methane and industrial coal combustion avoided through zero-emission high-temperature induction cores.
              </p>
              <span className="verdant-impact-methodology">
                *Illustrative greenhouse gas protocol model
              </span>
            </div>

            <div className="verdant-impact-card">
              <span className="verdant-impact-metric-num">480 MW</span>
              <span className="verdant-impact-metric-title">Synchronized Assets</span>
              <p className="verdant-impact-metric-copy">
                Interconnected industrial manufacturing hubs and offshore HVDC injection terminals under autonomous algorithmic telemetry.
              </p>
              <span className="verdant-impact-methodology">
                *Active pilot deployment portfolio
              </span>
            </div>

            <div className="verdant-impact-card">
              <span className="verdant-impact-metric-num">99.98%</span>
              <span className="verdant-impact-metric-title">Continuous Grid Reliability</span>
              <p className="verdant-impact-metric-copy">
                Operational power availability maintained without single point of failure across winter extreme cold snaps.
              </p>
              <span className="verdant-impact-methodology">
                *Multi-year transmission availability standard
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. SECTION SIX — SELECTED PROJECTS (EDITORIAL CASE STUDIES ARCHIVE)
          ==================================================================== */}
      <section id="verdant-projects" className="verdant-projects-section" aria-label="Selected Projects Archive">
        <div className="verdant-projects-inner">
          <div className="verdant-tech-header">
            <div>
              <span className="verdant-section-tag">FIELD DEPLOYMENTS</span>
              <h2 className="verdant-section-headline">Selected Projects</h2>
            </div>
            <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.72rem', color: 'var(--verdant-gray)' }}>
              4 DEMONSTRATION CASE STUDIES
            </span>
          </div>

          <div className="verdant-projects-editorial-grid">
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.id}
                className="verdant-project-entry-card"
                onClick={() => setDetailProject(proj)}
              >
                <div className="verdant-project-card-visual">
                  <span className="verdant-project-badge">{proj.number} // {proj.category}</span>
                  <img
                    src={proj.image}
                    alt={proj.imageAlt}
                    className="verdant-project-card-img"
                    loading="lazy"
                  />
                  <div className="verdant-project-card-overlay-hud">
                    <span className="verdant-project-card-scale">{proj.scale}</span>
                  </div>
                </div>

                <div className="verdant-project-card-info">
                  <div className="verdant-project-meta-wire">
                    <span>{proj.location}</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className="verdant-project-title">{proj.title}</h3>
                  <p className="verdant-project-summary">{proj.summary}</p>

                  <div className="verdant-project-tech-pills">
                    {proj.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="verdant-tech-pill">{t}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.68rem', color: 'var(--verdant-electric)', fontWeight: 600 }}>
                      Inspect Case Study &rarr;
                    </span>
                    <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.6rem', color: 'var(--verdant-gray)' }}>
                      CONCEPTUAL CASE STUDY
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. SECTION SEVEN — RESEARCH & INSIGHTS (MAGAZINE-STYLE EDITORIAL)
          ==================================================================== */}
      <section id="verdant-insights" className="verdant-insights-section" aria-label="Research and Insights">
        <div className="verdant-insights-inner">
          <div className="verdant-tech-header">
            <div>
              <span className="verdant-section-tag">EDITORIAL JOURNAL</span>
              <h2 className="verdant-section-headline">Research &amp; Insights</h2>
            </div>
            <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.72rem', color: 'var(--verdant-gray)' }}>
              PUBLICATIONS &bull; QUARTERLY VOL. 04
            </span>
          </div>

          <div className="verdant-insights-grid">
            {/* Featured Article Card */}
            <article
              className="verdant-featured-article-card"
              onClick={() => setActiveArticle(ARTICLES_DATA[0])}
            >
              <div className="verdant-article-cover-frame">
                <img
                  src="/projects/verdant/insight-research.jpg"
                  alt="Laboratory clean-energy research monograph on solid-state electrolytes"
                  className="verdant-article-cover-img"
                  loading="lazy"
                />
                <div className="verdant-article-cover-hud">
                  <span className="verdant-article-cover-tag">MONOGRAPH // VOL. 04</span>
                  <span className="verdant-article-cover-peer">SOLID-STATE ELECTROLYTES</span>
                </div>
              </div>

              <div className="verdant-article-card-body">
                <div className="verdant-article-meta-row">
                  <span>{ARTICLES_DATA[0].category}</span>
                  <span>&bull;</span>
                  <span>{ARTICLES_DATA[0].date}</span>
                  <span>&bull;</span>
                  <span>{ARTICLES_DATA[0].readTime}</span>
                </div>

                <h3 className="verdant-article-main-title">{ARTICLES_DATA[0].title}</h3>
                <p className="verdant-article-excerpt">{ARTICLES_DATA[0].excerpt}</p>

                <div style={{ marginTop: 'auto' }}>
                  <span className="verdant-editorial-link">
                    <span>Read Full Monograph</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            </article>

            {/* Secondary Articles Column */}
            <div className="verdant-secondary-articles-col">
              {ARTICLES_DATA.slice(1).map((art) => (
                <article
                  key={art.id}
                  className="verdant-compact-article-card"
                  onClick={() => setActiveArticle(art)}
                >
                  <div className="verdant-article-meta-row" style={{ marginBottom: '0.5rem' }}>
                    <span>{art.category}</span>
                    <span>&bull;</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h4 className="verdant-compact-title">{art.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(242, 240, 232, 0.75)', lineHeight: 1.5, margin: '0.5rem 0 1rem' }}>
                    {art.excerpt}
                  </p>

                  <div className="verdant-compact-read-time">
                    <span>Read Monograph &rarr;</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. SECTION EIGHT — CLOSING CALL TO ACTION & ENQUIRY
          ==================================================================== */}
      <section id="verdant-closing" className="verdant-closing-section" aria-label="Initiate Engagement">
        <div className="verdant-closing-inner">
          <div>
            <span className="verdant-section-tag" style={{ color: 'var(--verdant-acid)' }}>ENGAGEMENT // 2026</span>
            <h2 className="verdant-closing-headline">
              Let&apos;s build<br />
              what comes<br />
              <span style={{ color: 'var(--verdant-electric)', fontStyle: 'italic', fontFamily: 'var(--verdant-font-editorial)' }}>next.</span>
            </h2>

            <p className="verdant-closing-lead">
              Whether you are integrating multi-gigawatt renewable transmission, deploying continuous industrial storage, or decarbonizing high-temperature process heat—our engineering advisory is ready.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--verdant-font-mono)', fontSize: '0.75rem', color: 'var(--verdant-gray)' }}>
              <div><strong>HEADQUARTERS:</strong> R&auml;mistrasse 101, 8001 Zurich, Switzerland</div>
              <div><strong>RESEARCH HUB:</strong> 1 Science Park Drive, 118221 Singapore</div>
              <div><strong>ADVISORY DIRECT:</strong> contact@verdant-systems.internal</div>
            </div>
          </div>

          {/* Minimalist Interactive Enquiry Form */}
          <div className="verdant-enquiry-box">
            <span className="verdant-enquiry-header">
              INITIATE ADVISORY BRIEFING // STAGE 01
            </span>

            {enquirySubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--verdant-electric)', color: '#090B09', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 700 }}>
                  &check;
                </div>
                <h4 style={{ fontFamily: 'var(--verdant-font-display)', fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Brief Transmitted
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--verdant-gray)', lineHeight: 1.6 }}>
                  Thank you, <strong>{enquiryForm.name}</strong>. A Verdant Systems principal engineer will review the {enquiryForm.scale} {enquiryForm.sector} specification and contact your team within 24 hours.
                </p>
                <button
                  type="button"
                  style={{ marginTop: '1.5rem', background: 'none', border: '1px solid var(--verdant-line-electric)', color: 'var(--verdant-electric)', padding: '0.5rem 1.25rem', fontFamily: 'var(--verdant-font-mono)', fontSize: '0.65rem', cursor: 'pointer' }}
                  onClick={() => setEnquirySubmitted(false)}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="verdant-form-field">
                  <label className="verdant-field-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="verdant-input-text"
                    placeholder="e.g. Dr. Aris Thorne"
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  />
                </div>

                <div className="verdant-form-field">
                  <label className="verdant-field-label">Enterprise / Utility Organization</label>
                  <input
                    type="text"
                    required
                    className="verdant-input-text"
                    placeholder="e.g. Nordic Grid Authority"
                    value={enquiryForm.organization}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, organization: e.target.value })}
                  />
                </div>

                <div className="verdant-form-field">
                  <label className="verdant-field-label">Sector Focus</label>
                  <select
                    className="verdant-select-field"
                    value={enquiryForm.sector}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, sector: e.target.value })}
                  >
                    <option value="renewable-utility">Renewable Transmission &amp; Utility Integration</option>
                    <option value="energy-storage">Long-Duration Energy Storage (12h+)</option>
                    <option value="industrial-heat">Heavy Industrial Decarbonization (&gt;800&deg;C)</option>
                    <option value="microgrid">Resilient Datacenter / Campus Microgrid</option>
                  </select>
                </div>

                <div className="verdant-form-field">
                  <label className="verdant-field-label">Target Infrastructure Scale</label>
                  <select
                    className="verdant-select-field"
                    value={enquiryForm.scale}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, scale: e.target.value })}
                  >
                    <option value="10-50 MW">10 - 50 MW Initial Pilot</option>
                    <option value="50-250 MW">50 - 250 MW Utility Scale</option>
                    <option value="250 MW+">250 MW+ Giga-Scale Topology</option>
                  </select>
                </div>

                <div className="verdant-form-field">
                  <label className="verdant-field-label">Project Objectives &amp; Technical Scope</label>
                  <textarea
                    rows={3}
                    className="verdant-textarea-field"
                    placeholder="Describe target timelines, local grid constraints, or high-heat processes..."
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="verdant-submit-cta">
                  Start a Conversation &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. FOOTER & COLOPHON
          ==================================================================== */}
      <footer className="verdant-footer">
        <div className="verdant-footer-inner">
          <div>
            <div className="verdant-footer-brand-title">VERDANT SYSTEMS</div>
            <p style={{ color: 'var(--verdant-gray)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '380px' }}>
              A climate-technology enterprise engineering intelligent renewable energy storage, grid integration, and industrial decarbonization architectures.
            </p>
          </div>

          <div>
            <div className="verdant-footer-col-title">TECHNOLOGY</div>
            <div className="verdant-footer-links-list">
              <span>Renewable Infrastructure</span>
              <span>Intelligent Storage</span>
              <span>Industrial Decarbonization</span>
              <span>The Energy Lab</span>
            </div>
          </div>

          <div>
            <div className="verdant-footer-col-title">GLOBAL HUBS</div>
            <div className="verdant-footer-links-list">
              <span>Zurich (HQ &bull; R&amp;D)</span>
              <span>Singapore (Asia Grid Hub)</span>
              <span>San Francisco (Silicon Valley Lab)</span>
              <span>Oslo (Offshore Marine Center)</span>
            </div>
          </div>

          <div>
            <div className="verdant-footer-col-title">ACCREDITATION</div>
            <p style={{ color: 'var(--verdant-gray)', fontSize: '0.78rem', lineHeight: 1.5 }}>
              ISO 14064 Carbon Telemetry Certified. IEEE 1547-2018 Interconnection Standard Compliant. Demonstrative showcase created for VERHOST Digital Works.
            </p>
          </div>
        </div>

        <div className="verdant-footer-bottom-strip">
          <span>&copy; 2026 VERDANT SYSTEMS INFRASTRUCTURE AG. ALL RIGHTS RESERVED.</span>
          <span>VERHOST DIGITAL WORKS &bull; BUSINESS SHOWCASE [06]</span>
        </div>
      </footer>

      {/* ====================================================================
          11. PROJECT DETAIL DOSSIER MODAL
          ==================================================================== */}
      {detailProject && (
        <div className="verdant-modal-overlay" role="dialog" aria-modal="true">
          <div className="verdant-modal-window">
            <div className="verdant-modal-header">
              <div>
                <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.65rem', color: 'var(--verdant-electric)', letterSpacing: '0.12em' }}>
                  {detailProject.number} // CASE STUDY DOSSIER
                </span>
                <h3 style={{ fontFamily: 'var(--verdant-font-display)', fontSize: '1.65rem', textTransform: 'uppercase', margin: '0.2rem 0' }}>
                  {detailProject.title}
                </h3>
                <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.68rem', color: 'var(--verdant-gray)' }}>
                  {detailProject.location} &bull; {detailProject.year} &bull; {detailProject.scale}
                </span>
              </div>
              <button
                type="button"
                className="verdant-modal-close-btn"
                onClick={() => setDetailProject(null)}
                title="Close Modal"
              >
                &times;
              </button>
            </div>

            {detailProject.image && (
              <div className="verdant-modal-banner-wrap">
                <img
                  src={detailProject.image}
                  alt={detailProject.imageAlt || detailProject.title}
                  className="verdant-modal-banner-img"
                />
                <div className="verdant-modal-banner-badge">
                  <span>DEPLOYMENT // {detailProject.scale}</span>
                </div>
              </div>
            )}

            <div className="verdant-modal-body">
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--verdant-white)', marginBottom: '2rem' }}>
                {detailProject.narrative}
              </p>

              <div style={{ backgroundColor: '#0A1C13', border: '1px solid var(--verdant-line-dark)', padding: '2rem', borderRadius: '3px', marginBottom: '2.5rem' }}>
                <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.65rem', color: 'var(--verdant-electric)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '1.25rem' }}>
                  KEY ENGINEERING METRICS
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                  {Object.entries(detailProject.metrics).map(([key, value]) => (
                    <div key={key}>
                      <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.62rem', color: 'var(--verdant-gray)', textTransform: 'uppercase', display: 'block' }}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--verdant-electric)' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.65rem', color: 'var(--verdant-gray)', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  INTEGRATED ARCHITECTURAL TECHNOLOGIES
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {detailProject.technologies.map((t, idx) => (
                    <span key={idx} className="verdant-tech-pill" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="verdant-talk-btn"
                  onClick={() => {
                    setDetailProject(null);
                    scrollTo('verdant-closing');
                  }}
                >
                  Inquire for Similar Topology &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          12. ARTICLE READER MODAL
          ==================================================================== */}
      {activeArticle && (
        <div className="verdant-modal-overlay" role="dialog" aria-modal="true">
          <div className="verdant-modal-window">
            <div className="verdant-modal-header">
              <div>
                <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.65rem', color: 'var(--verdant-electric)', letterSpacing: '0.12em' }}>
                  {activeArticle.category} &bull; {activeArticle.readTime}
                </span>
                <h3 style={{ fontFamily: 'var(--verdant-font-display)', fontSize: '1.65rem', textTransform: 'uppercase', margin: '0.2rem 0' }}>
                  {activeArticle.title}
                </h3>
                <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.68rem', color: 'var(--verdant-gray)' }}>
                  PUBLISHED {activeArticle.date} &bull; VERDANT RESEARCH MONOGRAPH
                </span>
              </div>
              <button
                type="button"
                className="verdant-modal-close-btn"
                onClick={() => setActiveArticle(null)}
                title="Close Article"
              >
                &times;
              </button>
            </div>

            <div className="verdant-modal-body">
              {activeArticle.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(242, 240, 232, 0.9)', marginBottom: '1.5rem' }}>
                  {paragraph}
                </p>
              ))}

              <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--verdant-line-dark)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--verdant-font-mono)', fontSize: '0.65rem', color: 'var(--verdant-gray)' }}>
                  VERDANT CLIMATE TECHNOLOGY &bull; RESEARCH VOL. 04
                </span>
                <button
                  type="button"
                  className="verdant-editorial-link"
                  onClick={() => setActiveArticle(null)}
                >
                  &larr; Return to Insights
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

