import React, { useState, useMemo } from 'react';
import './atelier.css';

// Master Architectural Project Archive Data
const PROJECTS = [
  {
    id: 'the-courtyard-house',
    number: 'PRJ-01',
    title: 'The Courtyard House',
    typology: 'Residential Pavilion',
    location: 'Kyoto, Japan',
    year: '2025',
    area: '420 m²',
    structuralSystem: 'Board-formed concrete, hinoki timber framework, granite reflecting basin',
    leadArchitect: 'Marcus Vance',
    dominantImage: '/projects/atelier/project-courtyard-main.jpg',
    detailImage: '/projects/atelier/project-courtyard-detail.jpg',
    materials: ['Board-Formed Concrete', 'Hinoki Cypress', 'Black Granite', 'Textured Glass'],
    brief: 'A multigenerational residence arranged around a sunken meditative water courtyard. Designed to capture seasonal zenith sunlight while shielding interior tatami living spaces from northern alpine winter winds.',
    designApproach: 'Rather than treating the building as a solitary volume, we carved three distinct living pavilions connected by a covered perimeter cloister (engawa). The courtyard serves as a climatic lung, inducing passive stack ventilation through operable clerestory louvers.',
    primaryMaterialKey: 'concrete',
    cadDrawing: {
      type: 'PLAN LEVEL 01',
      scale: 'SCALE 1:100',
      rooms: [
        { label: 'WATER COURTYARD', x: 60, y: 35, w: 80, h: 50 },
        { label: 'LIVING CLOISTER', x: 20, y: 30, w: 35, h: 60 },
        { label: 'TEA PAVILION', x: 145, y: 30, w: 40, h: 40 }
      ]
    }
  },
  {
    id: 'monsoon-residence',
    number: 'PRJ-02',
    title: 'Monsoon Residence',
    typology: 'Tropical Residential',
    location: 'Goa, Western Ghats',
    year: '2024',
    area: '560 m²',
    structuralSystem: 'Cast-in-place concrete, oxide red lime plaster, local basalt rubble foundations',
    leadArchitect: 'Elena Soria',
    dominantImage: '/projects/atelier/project-monsoon-main.jpg',
    detailImage: '/projects/atelier/project-monsoon-detail.jpg',
    materials: ['Terracotta & Oxide Plaster', 'Basalt Stone', 'Reclaimed Teak', 'Brushed Stainless Steel'],
    brief: 'Designed specifically for torrential monsoon weather patterns. Giant 4-meter cantilevered eaves shed seasonal downpours into acoustic drainage channels, creating a continuous dialogue between interior living spaces and surrounding jungle.',
    designApproach: 'The structure lifts lightly off the wet forest floor on monolithic basalt piers. Deep shaded verandas buffer tropical thermal gains while permitting cross breezes from the Arabian Sea to permeate throughout the core.',
    primaryMaterialKey: 'terracotta',
    cadDrawing: {
      type: 'SITE SECTION B-B',
      scale: 'SCALE 1:150',
      rooms: [
        { label: 'CANTILEVER EAVE', x: 25, y: 25, w: 45, h: 20 },
        { label: 'DOUBLE HEIGHT CORE', x: 75, y: 30, w: 70, h: 55 },
        { label: 'BASALT PIER PLINTH', x: 60, y: 88, w: 100, h: 18 }
      ]
    }
  },
  {
    id: 'the-quiet-office',
    number: 'PRJ-03',
    title: 'The Quiet Office',
    typology: 'Workplace & Research',
    location: 'Zurich, Switzerland',
    year: '2026',
    area: '1,250 m²',
    structuralSystem: 'Exposed mass timber post-and-beam, brushed stainless steel partitions, acoustic wool baffles',
    leadArchitect: 'Marcus Vance',
    dominantImage: '/projects/atelier/project-office-main.jpg',
    detailImage: '/projects/atelier/project-office-detail.jpg',
    materials: ['Brushed Stainless Steel', 'European White Oak', 'Fluted Cast Glass', 'Textured Acoustic Felt'],
    brief: 'A non-hierarchical research workspace structured as a series of contemplative library alcoves. Acoustic dampening zones create micro-climates of extreme focus amidst expansive panoramic views of Lake Zurich.',
    designApproach: 'Eliminating synthetic drywalls, the office is divided entirely through floor-to-ceiling rhythmic oak joinery and satin-brushed steel screens. Indirect north-facing natural illumination reduces artificial energy consumption by 62%.',
    primaryMaterialKey: 'steel',
    cadDrawing: {
      type: 'ACOUSTIC AXIS PLAN',
      scale: 'SCALE 1:200',
      rooms: [
        { label: 'RESEARCH ATRIUM', x: 30, y: 30, w: 75, h: 60 },
        { label: 'ALCOVE PODS', x: 110, y: 25, w: 35, h: 30 },
        { label: 'OAK ARCHIVE', x: 110, y: 60, w: 35, h: 30 }
      ]
    }
  },
  {
    id: 'earth-grain',
    number: 'PRJ-04',
    title: 'Earth & Grain',
    typology: 'Hospitality & Culinary',
    location: 'Oaxaca, Mexico',
    year: '2025',
    area: '890 m²',
    structuralSystem: 'Monolithic stabilized rammed earth walls, hand-burnished lime stucco, cedar joists',
    leadArchitect: 'Elena Soria',
    dominantImage: '/projects/atelier/project-earth-main.jpg',
    detailImage: '/projects/atelier/project-earth-detail.jpg',
    materials: ['Honed Limestone', 'Terracotta & Oxide Plaster', 'Board-Formed Concrete', 'European White Oak'],
    brief: 'A culinary pavilion that blurs the boundary between kitchen, dining cloister, and agave garden. Massive thermal-mass rammed earth walls naturally regulate extreme daytime heat and cool desert night temperatures without mechanical conditioning.',
    designApproach: 'Formulated with indigenous red clay, limestone dust, and crushed volcanic aggregates sourced within a 15km perimeter. Openings are aligned precisely to frame mountain silhouettes at dusk.',
    primaryMaterialKey: 'limestone',
    cadDrawing: {
      type: 'THERMAL MASS PLAN',
      scale: 'SCALE 1:125',
      rooms: [
        { label: 'RAMMED CLOISTER', x: 25, y: 30, w: 65, h: 55 },
        { label: 'HEARTH KITCHEN', x: 95, y: 30, w: 45, h: 35 },
        { label: 'AGAVE PATIO', x: 95, y: 70, w: 45, h: 25 }
      ]
    }
  },
  {
    id: 'the-light-pavilion',
    number: 'PRJ-05',
    title: 'The Light Pavilion',
    typology: 'Cultural & Gallery',
    location: 'Kanazawa, Japan',
    year: '2024',
    area: '1,680 m²',
    structuralSystem: 'Post-tensioned white concrete, fluted structural glass envelope, titanium zinc roof',
    leadArchitect: 'Kenzo Moriyama',
    dominantImage: '/projects/atelier/project-pavilion-main.jpg',
    detailImage: '/projects/atelier/project-pavilion-detail.jpg',
    materials: ['Fluted Cast Glass', 'Board-Formed Concrete', 'Brushed Stainless Steel', 'European White Oak'],
    brief: 'A contemporary sculpture pavilion engineered around calibrated north-facing clerestory light monitors. The fluted glass envelope filters coastal atmospheric mist, transforming incoming sunlight into a soft luminous fog inside the gallery halls.',
    designApproach: 'Constructed with ultra-high performance white concrete containing recycled crushed quartz. The roof geometry features hyperbolic paraboloid lanterns that shield delicate kinetic sculptures from direct UV exposure.',
    primaryMaterialKey: 'glass',
    cadDrawing: {
      type: 'DAYLIGHT REFLECTANCE PLAN',
      scale: 'SCALE 1:250',
      rooms: [
        { label: 'NORTH GALLERY', x: 30, y: 25, w: 70, h: 40 },
        { label: 'LIGHT MONITORS', x: 30, y: 70, w: 70, h: 25 },
        { label: 'SCULPTURE VOID', x: 105, y: 30, w: 45, h: 60 }
      ]
    }
  },
  {
    id: 'house-of-stone',
    number: 'PRJ-06',
    title: 'House of Stone',
    typology: 'Interior Architecture',
    location: 'Milan, Italy',
    year: '2026',
    area: '340 m²',
    structuralSystem: 'Monolithic Roman travertine slabs, patinated wax-finished bronze, smoked oak joinery',
    leadArchitect: 'Elena Soria',
    dominantImage: '/projects/atelier/project-stone-main.jpg',
    detailImage: '/projects/atelier/project-stone-detail.jpg',
    materials: ['Honed Limestone', 'European White Oak', 'Brushed Stainless Steel', 'Terracotta & Oxide Plaster'],
    brief: 'A radical interior transformation within a 19th-century Milanese palazzo. Monolithic stone blocks serve as structural fireplaces, washbasins, and kitchen plinths, celebrating the unyielding geological weight of natural stone.',
    designApproach: 'Rather than applying superficial veneers, whole 3-ton travertine blocks were lifted into the residence. Raw quarry-sawed textures contrast with velvety honed circulation floors and patinated dark bronze door hardware.',
    primaryMaterialKey: 'limestone',
    cadDrawing: {
      type: 'TECTONIC JOINT ELEVATION',
      scale: 'SCALE 1:50',
      rooms: [
        { label: 'TRAVERTINE PLINTH', x: 35, y: 40, w: 85, h: 30 },
        { label: 'BRONZE PIVOT', x: 125, y: 30, w: 20, h: 55 },
        { label: 'SMOKED CASING', x: 20, y: 25, w: 125, h: 12 }
      ]
    }
  }
];

// Tactile Material Library Data
const MATERIALS_DATA = [
  {
    id: 'concrete',
    code: 'MAT-01',
    name: 'Board-Formed Concrete',
    finish: 'Unsealed Raw Matte • Douglas Fir Grain Impression',
    image: '/projects/atelier/mat-concrete.jpg',
    qualities: 'Cast using rough-sawn horizontal timber formwork that imprints organic wood grain and knot textures into the cementitious matrix. High thermal inertia dampens diurnal temperature oscillations.',
    tactileFeel: 'Chalky, mineral, cool to touch, micro-porous',
    projects: ['The Courtyard House', 'Monsoon Residence', 'The Light Pavilion']
  },
  {
    id: 'oak',
    code: 'MAT-02',
    name: 'European White Oak',
    finish: 'Wire-Brushed • Cold-Pressed Organic Linseed Oil',
    image: '/projects/atelier/mat-oak.jpg',
    qualities: 'Quartersawn slow-growth European oak selected for straight rift grain and dimensional stability. Treated with solvent-free plant oils to retain natural pale warmth and acoustic warmth.',
    tactileFeel: 'Fine open grain, velvety warmth, aromatic wood tannins',
    projects: ['The Courtyard House', 'The Quiet Office', 'House of Stone']
  },
  {
    id: 'limestone',
    code: 'MAT-03',
    name: 'Honed Jura Limestone',
    finish: '240-Grit Diamond Hone • Breathable Silicate Impregnation',
    image: '/projects/atelier/mat-limestone.jpg',
    qualities: 'Sedimentary stone formed through geological calcification over 150 million years. Contains fossilized ammonites and calcite veins that reveal deep prehistoric strata under raking directional light.',
    tactileFeel: 'Silken density, gentle slip resistance, earthen solidity',
    projects: ['Earth & Grain', 'House of Stone', 'The Courtyard House']
  },
  {
    id: 'steel',
    code: 'MAT-04',
    name: 'Brushed Stainless Steel',
    finish: 'Directional Satin Grain • Natural Microcrystalline Wax',
    image: '/projects/atelier/mat-steel.jpg',
    qualities: 'Architectural grade 316 stainless steel with a non-reflective directional brush finish. Hand-waxed to prevent fingerprint oils while establishing precise tectonic contrast against rough mineral walls.',
    tactileFeel: 'Crisp, mechanical, zero-tolerance precision, cool resistance',
    projects: ['The Quiet Office', 'The Light Pavilion', 'House of Stone']
  },
  {
    id: 'glass',
    code: 'MAT-05',
    name: 'Fluted Cast Glass',
    finish: '12mm Linear Fluting • Low-Iron Acid Etch',
    image: '/projects/atelier/mat-glass.jpg',
    qualities: 'Architectural structural cast glass with continuous vertical prismatic channels. Bends and refracts direct glare into a luminous ambient field, providing visual privacy without sacrificing daylight transfer.',
    tactileFeel: 'Rhythmic linear ribs, frosted silk exterior, luminous depth',
    projects: ['The Light Pavilion', 'The Quiet Office', 'The Courtyard House']
  },
  {
    id: 'terracotta',
    code: 'MAT-06',
    name: 'Hand-Extruded Terracotta',
    finish: 'Wood-Kiln Bisque • Ferrous Oxide Flashing',
    image: '/projects/atelier/mat-terracotta.jpg',
    qualities: 'Fired in traditional wood kilns where flame draft creates varied chromatic flashes from deep ochre to burnt umber. Highly breathable clay allows moisture regulation in humid tropical environments.',
    tactileFeel: 'Earthen, porous, dry warmth, subtle handmade irregularities',
    projects: ['Monsoon Residence', 'Earth & Grain', 'House of Stone']
  }
];

// Interactive Studio Services Data
const SERVICES_DATA = [
  {
    id: 'architecture',
    step: 'STAGE 01',
    title: 'Architecture & Masterplanning',
    desc: 'From initial site solar analysis and environmental feasibility to complete construction administration. We craft bespoke residential estates, cultural pavilions, and institutional masterplans.',
    deliverables: 'Site Solar Studies • Structural CAD Drawings • Municipal Filings • Contractor Tendering',
    duration: '8–18 Months'
  },
  {
    id: 'interiors',
    step: 'STAGE 02',
    title: 'Interior Architecture & Spatial Design',
    desc: 'Holistic spatial choreography where materials, custom millwork, hardware, and sightlines are resolved down to the millimeter. Creating serene, tactile domestic environments.',
    deliverables: 'Custom Joinery Schedules • Wet Room Detailing • Door Furniture • Fixed Furniture Specification',
    duration: '4–10 Months'
  },
  {
    id: 'restoration',
    step: 'STAGE 03',
    title: 'Adaptive Reuse & Heritage Conservation',
    desc: 'Reimagining historical palazzo, industrial warehouses, and vernacular masonry buildings. Harmonizing historic fabric with modern thermal insulation and seismic reinforcement.',
    deliverables: 'Structural Archaeology • Conservation Filings • Stone Remediation • Modern Core Insertion',
    duration: '6–14 Months'
  },
  {
    id: 'materials',
    step: 'STAGE 04',
    title: 'Material Research & Fabrication',
    desc: 'Bespoke geological quarry sourcing, custom concrete mixture formulation, and metal patination testing in our studio workshop. Physical mockups precede all site installations.',
    deliverables: 'Physical Material Boards • Full-Scale Mockups • Quarry Inspection • Finish Recipes',
    duration: '2–6 Months'
  },
  {
    id: 'lighting',
    step: 'STAGE 05',
    title: 'Diurnal Lighting & Acoustic Engineering',
    desc: 'Designing the intangible atmosphere: how sunlight traverses a space from dawn to dusk, and how sound reverberates off masonry walls to create deep psychological calm.',
    deliverables: 'Sun Path Simulations • Acoustic Reverberation Analysis • Custom Luminaire Design',
    duration: '3–6 Months'
  }
];

export default function AtelierStudio() {
  // Navigation & Interactive States
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [archiveMode, setArchiveMode] = useState('composition'); // 'composition' | 'index' | 'material'
  const [activeMaterialIndex, setActiveMaterialIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [detailProject, setDetailProject] = useState(null);

  // Enquiry Form State
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    typology: 'residential',
    area: '',
    location: '',
    siteStatus: 'owned',
    budget: '$1M–$3M',
    timeline: '6–12 months',
    briefNotes: ''
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeHeroProject = PROJECTS[activeHeroIndex];
  const activeMaterial = MATERIALS_DATA[activeMaterialIndex];
  const activeService = SERVICES_DATA[activeServiceIndex];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Switch to next/previous project in detail view
  const handleDetailNav = (delta) => {
    if (!detailProject) return;
    const currIdx = PROJECTS.findIndex(p => p.id === detailProject.id);
    const nextIdx = (currIdx + delta + PROJECTS.length) % PROJECTS.length;
    setDetailProject(PROJECTS[nextIdx]);
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryData.name || !enquiryData.email) {
      showToast('Please provide your name and email address.');
      return;
    }
    setEnquirySubmitted(true);
    showToast('Enquiry received. Project dossier submitted to design partners.');
  };

  return (
    <div className="atelier-studio-root atelier-blueprint-grid-bg">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, backgroundColor: 'var(--atelier-graphite)', color: 'var(--atelier-paper)', padding: '0.85rem 1.5rem', borderRadius: '2px', fontFamily: 'var(--atelier-font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em', boxShadow: 'var(--atelier-shadow-elevated)', borderLeft: '3px solid var(--atelier-oxide)' }}>
          {toastMessage}
        </div>
      )}

      {/* ====================================================================
          1. STUDIO MASTHEAD & TECHNICAL UTILITY LINE
          ==================================================================== */}
      <header className="atelier-masthead-wrapper">
        <div className="atelier-top-utility-wire">
          <div>
            <span className="atelier-wire-dot" />
            <span>ARCHITECTURAL FIELD JOURNAL • VOL. 26</span>
          </div>
          <div>
            <span>STUDIO ARCHIVE • 48.8566° N, 2.3522° E</span>
          </div>
          <div>
            <span>PARIS • TOKYO • ZURICH</span>
          </div>
        </div>

        <div className="atelier-main-masthead">
          <div className="atelier-brand-lockup" onClick={() => scrollTo('atelier-hero')}>
            <span className="atelier-brand-wordmark">ATELIER</span>
            <span className="atelier-brand-discipline">
              ARCHITECTURE &bull; INTERIORS &bull; SPATIAL PRACTICE
            </span>
          </div>

          <nav>
            <ul className="atelier-nav-links">
              <li className="atelier-nav-item">
                <button type="button" onClick={() => scrollTo('atelier-archive')}>
                  01 ARCHIVE
                </button>
              </li>
              <li className="atelier-nav-item">
                <button type="button" onClick={() => scrollTo('atelier-narrative')}>
                  02 METHOD
                </button>
              </li>
              <li className="atelier-nav-item">
                <button type="button" onClick={() => scrollTo('atelier-materials')}>
                  03 MATERIALS
                </button>
              </li>
              <li className="atelier-nav-item">
                <button type="button" onClick={() => scrollTo('atelier-services')}>
                  04 SERVICES
                </button>
              </li>
              <li className="atelier-nav-item">
                <button type="button" onClick={() => scrollTo('atelier-philosophy')}>
                  05 STUDIO
                </button>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="atelier-enquiry-header-cta"
            onClick={() => scrollTo('atelier-enquiry')}
          >
            <span>Initiate Project</span>
            <span>&rarr;</span>
          </button>
        </div>
      </header>

      {/* ====================================================================
          2. UNCONVENTIONAL HOMEPAGE HERO — ARCHITECTURAL PRESENTATION BOARD
          ==================================================================== */}
      <section id="atelier-hero" className="atelier-presentation-board-hero" aria-label="Architectural Presentation Board">
        {/* Zone A: Left Studio Index Rail */}
        <aside className="atelier-hero-index-rail">
          <span className="atelier-rail-top-tag">
            PORTFOLIO ARCHIVE / 2026
          </span>
          <div className="atelier-rail-divider" />
          <span className="atelier-rail-coordinates">
            LAT 35.0116° N &bull; LON 135.7681° E
          </span>
        </aside>

        {/* Zone B: Main Architectural Composition Sheet */}
        <div className="atelier-hero-composition-sheet">
          {/* Architectural Registration Marks in Corners */}
          <span className="atelier-reg-mark" style={{ top: '10px', left: '12px' }}>+</span>
          <span className="atelier-reg-mark" style={{ top: '10px', right: '12px' }}>+</span>
          <span className="atelier-reg-mark" style={{ bottom: '10px', left: '12px' }}>+</span>
          <span className="atelier-reg-mark" style={{ bottom: '10px', right: '12px' }}>+</span>

          {/* Top Title & Metadata Block */}
          <div className="atelier-sheet-header-meta">
            <div className="atelier-sheet-title-block">
              <span className="atelier-sheet-prj-num">
                {activeHeroProject.number} &bull; {activeHeroProject.typology}
              </span>
              <h1 className="atelier-sheet-prj-name">
                {activeHeroProject.title}
              </h1>
              <span className="atelier-sheet-prj-location">
                {activeHeroProject.location} &bull; COMPLETED {activeHeroProject.year}
              </span>
            </div>

            <div className="atelier-sheet-specs-table">
              <div className="atelier-sheet-spec-cell">
                <span className="atelier-spec-cell-label">INTERNAL AREA</span>
                <span className="atelier-spec-cell-val">{activeHeroProject.area}</span>
              </div>
              <div className="atelier-sheet-spec-cell">
                <span className="atelier-spec-cell-label">DESIGN LEAD</span>
                <span className="atelier-spec-cell-val">{activeHeroProject.leadArchitect}</span>
              </div>
              <div className="atelier-sheet-spec-cell">
                <span className="atelier-spec-cell-label">SHEET REF</span>
                <span className="atelier-spec-cell-val" style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.75rem' }}>
                  ATL-{(activeHeroIndex + 1).toString().padStart(2, '0')}-A
                </span>
              </div>
            </div>
          </div>

          {/* Offset Overlapping Imagery Stage */}
          <div className="atelier-sheet-imagery-stage">
            {/* Dominant Photograph of Contemporary Architectural Space */}
            <div className="atelier-dominant-photo-frame">
              <img
                src={activeHeroProject.dominantImage}
                alt={activeHeroProject.title}
                className="atelier-dominant-photo"
              />
            </div>

            {/* Overlapping Column: Detail Photo + Authentic Architectural CAD SVG Drawing */}
            <div className="atelier-overlapping-assets-col">
              <div className="atelier-detail-photo-frame">
                <img
                  src={activeHeroProject.detailImage}
                  alt={`${activeHeroProject.title} material junction`}
                  className="atelier-detail-photo"
                />
              </div>

              {/* Technical Drawing Frame */}
              <div className="atelier-plan-drawing-frame">
                <div className="atelier-plan-legend-tag">
                  <span>{activeHeroProject.cadDrawing.type}</span>
                  <span>{activeHeroProject.cadDrawing.scale}</span>
                </div>
                <svg viewBox="0 0 200 100" className="atelier-svg-cad-drawing" fill="none">
                  {/* Drawing Grid */}
                  <line x1="10" y1="10" x2="190" y2="10" stroke="var(--atelier-blueprint-line)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="10" y1="90" x2="190" y2="90" stroke="var(--atelier-blueprint-line)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="10" y1="10" x2="10" y2="90" stroke="var(--atelier-blueprint-line)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="190" y1="10" x2="190" y2="90" stroke="var(--atelier-blueprint-line)" strokeWidth="0.5" strokeDasharray="2 2" />

                  {/* Room Volumes */}
                  {activeHeroProject.cadDrawing.rooms.map((room, idx) => (
                    <g key={idx}>
                      <rect
                        x={room.x}
                        y={room.y}
                        width={room.w}
                        height={room.h}
                        fill="rgba(76, 81, 27, 0.08)"
                        stroke="var(--atelier-blueprint)"
                        strokeWidth="1.2"
                      />
                      <text
                        x={room.x + room.w / 2}
                        y={room.y + room.h / 2 + 3}
                        fontSize="5"
                        fontFamily="monospace"
                        fill="var(--atelier-blueprint)"
                        textAnchor="middle"
                        letterSpacing="0.05em"
                      >
                        {room.label}
                      </text>
                    </g>
                  ))}

                  {/* North Arrow */}
                  <g transform="translate(170, 25)">
                    <line x1="0" y1="12" x2="0" y2="0" stroke="var(--atelier-oxide)" strokeWidth="1" />
                    <polygon points="-2.5,4 0,0 2.5,4" fill="var(--atelier-oxide)" />
                    <text x="5" y="6" fontSize="5" fontFamily="monospace" fill="var(--atelier-oxide)">N</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Sheet Footer Statement & Actions */}
          <div className="atelier-sheet-footer-bar">
            <p className="atelier-sheet-manifesto-quote">
              &ldquo;{activeHeroProject.brief}&rdquo;
            </p>

            <button
              type="button"
              className="atelier-sheet-action-cta"
              onClick={() => setDetailProject(activeHeroProject)}
            >
              Inspect Complete Dossier &rarr;
            </button>
          </div>
        </div>

        {/* Zone C: Right Edge Project Navigator */}
        <aside className="atelier-hero-navigator-rail">
          <div className="atelier-nav-rail-header">
            <span>DRAWING INDEX [{PROJECTS.length}]</span>
          </div>

          <div className="atelier-nav-project-list">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                className={`atelier-nav-project-btn ${activeHeroIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveHeroIndex(idx)}
              >
                <span className="atelier-nav-btn-num">{proj.number}</span>
                <span className="atelier-nav-btn-title">{proj.title}</span>
                <span className="atelier-nav-btn-meta">{proj.location}</span>
              </button>
            ))}
          </div>
        </aside>
      </section>

      {/* ====================================================================
          3. THE INTERACTIVE PROJECT ARCHIVE (SIGNATURE CORE FEATURE)
          ==================================================================== */}
      <section id="atelier-archive" className="atelier-project-archive-section" aria-label="Interactive Project Archive">
        <div className="atelier-archive-top-bar">
          <div className="atelier-archive-title-box">
            <span className="atelier-archive-section-tag">PORTFOLIO REPOSITORY</span>
            <h2 className="atelier-archive-headline">The Architectural Archive</h2>
          </div>

          {/* Three View Modes Switcher */}
          <div className="atelier-mode-switcher-pill" role="tablist" aria-label="Archive View Modes">
            <button
              type="button"
              className={`atelier-mode-btn ${archiveMode === 'composition' ? 'active' : ''}`}
              onClick={() => setArchiveMode('composition')}
            >
              Composition Mode
            </button>
            <button
              type="button"
              className={`atelier-mode-btn ${archiveMode === 'index' ? 'active' : ''}`}
              onClick={() => setArchiveMode('index')}
            >
              Index Mode
            </button>
            <button
              type="button"
              className={`atelier-mode-btn ${archiveMode === 'material' ? 'active' : ''}`}
              onClick={() => setArchiveMode('material')}
            >
              Material Mode
            </button>
          </div>
        </div>

        {/* MODE 1: COMPOSITION MODE (ASYMMETRIC ART-DIRECTED ARRANGEMENT) */}
        {archiveMode === 'composition' && (
          <div className="atelier-archive-composition-grid">
            {PROJECTS.map((proj, idx) => {
              // Asymmetric spans: 7/5, 4/8, 7/5
              const spanClass = idx % 4 === 0 ? 'atelier-comp-span-7'
                : idx % 4 === 1 ? 'atelier-comp-span-5'
                : idx % 4 === 2 ? 'atelier-comp-span-4'
                : 'atelier-comp-span-8';

              return (
                <div
                  key={proj.id}
                  className={`atelier-comp-card ${spanClass}`}
                  onClick={() => setDetailProject(proj)}
                >
                  <div className="atelier-comp-card-visual">
                    <span className="atelier-comp-card-badge">{proj.typology}</span>
                    <img
                      src={proj.dominantImage}
                      alt={proj.title}
                      className="atelier-comp-card-img"
                    />
                  </div>

                  <div className="atelier-comp-card-info">
                    <div className="atelier-comp-meta-row">
                      <span className="atelier-comp-num">{proj.number}</span>
                      <span className="atelier-comp-year">{proj.year} &bull; {proj.location}</span>
                    </div>

                    <h3 className="atelier-comp-name">{proj.title}</h3>
                    <p className="atelier-comp-desc">{proj.brief}</p>

                    <div className="atelier-comp-footer-specs">
                      <span>{proj.area}</span>
                      <span>{proj.materials.slice(0, 2).join(' & ')}</span>
                      <span style={{ color: 'var(--atelier-oxide)', fontWeight: 600 }}>Dossier &rarr;</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE 2: INDEX MODE (TYPOGRAPHIC REGISTER TABLE) */}
        {archiveMode === 'index' && (
          <div className="atelier-archive-index-table">
            <div className="atelier-index-table-header">
              <span>REF</span>
              <span>PROJECT TITLE</span>
              <span>TYPOLOGY</span>
              <span>LOCATION</span>
              <span>YEAR</span>
              <span>PRIMARY MATERIAL</span>
              <span>ACTION</span>
            </div>

            {PROJECTS.map(proj => (
              <div
                key={proj.id}
                className="atelier-index-table-row"
                onClick={() => setDetailProject(proj)}
              >
                <span className="atelier-index-col-num">{proj.number}</span>
                <span className="atelier-index-col-title">{proj.title}</span>
                <span className="atelier-index-col-meta">{proj.typology}</span>
                <span className="atelier-index-col-meta">{proj.location}</span>
                <span className="atelier-index-col-meta" style={{ fontFamily: 'var(--atelier-font-mono)' }}>{proj.year}</span>
                <span className="atelier-index-col-meta">{proj.materials[0]}</span>
                <div className="atelier-index-col-action">
                  <button type="button">View Sheet &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODE 3: MATERIAL ARCHIVE MODE */}
        {archiveMode === 'material' && (
          <div className="atelier-archive-material-groups">
            {MATERIALS_DATA.map(mat => {
              const matchedProjects = PROJECTS.filter(p => mat.projects.includes(p.title));
              return (
                <div key={mat.id} className="atelier-material-group-block">
                  <div className="atelier-material-group-header">
                    <h3 className="atelier-mat-group-title">{mat.name}</h3>
                    <span className="atelier-mat-group-count">
                      [{matchedProjects.length} DOCUMENTED COMMISSIONS] &bull; {mat.finish}
                    </span>
                  </div>

                  <div className="atelier-mat-group-grid" style={{ marginTop: '1.5rem' }}>
                    {matchedProjects.map(p => (
                      <div
                        key={p.id}
                        className="atelier-comp-card"
                        onClick={() => setDetailProject(p)}
                      >
                        <div className="atelier-comp-card-visual" style={{ aspectRatio: '16/9' }}>
                          <img src={p.dominantImage} alt={p.title} className="atelier-comp-card-img" />
                        </div>
                        <div className="atelier-comp-card-info" style={{ padding: '1.25rem' }}>
                          <span className="atelier-comp-num">{p.number}</span>
                          <h4 style={{ fontFamily: 'var(--atelier-font-serif)', fontSize: '1.35rem', margin: '0.25rem 0' }}>{p.title}</h4>
                          <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.62rem', color: 'var(--atelier-graphite-subtle)' }}>
                            {p.location} &bull; {p.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ====================================================================
          4. ARCHITECTURAL SCROLL NARRATIVE ("HOW ATELIER THINKS & WORKS")
          ==================================================================== */}
      <section id="atelier-narrative" className="atelier-narrative-section" aria-label="Architectural Process Narrative">
        <div className="atelier-narrative-inner">
          <div className="atelier-narrative-top-bar">
            <span className="atelier-narrative-tag">TECTONIC METHODOLOGY</span>
            <h2 className="atelier-narrative-headline">The Architectural Sequence</h2>
            <p className="atelier-narrative-sub">
              Architecture is not an instantaneous form; it is a patient spatial dialogue between landscape phenomena, structural honesty, and lived atmospheric resonance.
            </p>
          </div>

          <div className="atelier-narrative-timeline">
            {/* Stage A: OBSERVE */}
            <div className="atelier-timeline-stage">
              <div className="atelier-stage-copy">
                <span className="atelier-stage-step-tag">PHASE 01 &bull; GROUND</span>
                <h3 className="atelier-stage-title">Observe</h3>
                <p className="atelier-stage-desc">
                  Every commission begins with prolonged site immersion across seasons. We map ephemeral micro-phenomena: solar azimuth angles at winter solstice, diurnal wind channels, acoustic ambient decibels, and natural water runoff vectors.
                </p>
                <div className="atelier-stage-annotations-box">
                  <span className="atelier-anno-item">[+] Solar Zenith Mapping: 68.4° Summer / 24.2° Winter</span>
                  <span className="atelier-anno-item">[+] Ambient Noise Level: 32 dBA baseline natural forest</span>
                  <span className="atelier-anno-item">[+] Subsurface Hydrology: Basalt drainage aquifer</span>
                </div>
              </div>
              <div className="atelier-stage-visual">
                <img src="/projects/atelier/process-observe.jpg" alt="Site observation and topographical analysis" className="atelier-stage-img" />
              </div>
            </div>

            {/* Stage B: INTERPRET */}
            <div className="atelier-timeline-stage">
              <div className="atelier-stage-visual">
                <img src="/projects/atelier/process-interpret.jpg" alt="Architectural physical models and concept sketches" className="atelier-stage-img" />
              </div>
              <div className="atelier-stage-copy">
                <span className="atelier-stage-step-tag">PHASE 02 &bull; MORPHOLOGY</span>
                <h3 className="atelier-stage-title">Interpret</h3>
                <p className="atelier-stage-desc">
                  Through physical plaster and lime models, we carve voids rather than designing facades. Structural constraints are transformed into spatial choreographies that frame horizons and foster natural convection.
                </p>
                <div className="atelier-stage-annotations-box">
                  <span className="atelier-anno-item">[+] 1:50 Physical Sectional Plaster Studies</span>
                  <span className="atelier-anno-item">[+] Sightline Clearance: Uninterrupted southern canopy</span>
                  <span className="atelier-anno-item">[+] Thermal Mass Optimization: 450mm structural walls</span>
                </div>
              </div>
            </div>

            {/* Stage C: CONSTRUCT */}
            <div className="atelier-timeline-stage">
              <div className="atelier-stage-copy">
                <span className="atelier-stage-step-tag">PHASE 03 &bull; TECTONICS</span>
                <h3 className="atelier-stage-title">Construct</h3>
                <p className="atelier-stage-desc">
                  We collaborate directly with generational stone masons, carpenters, and metal smiths. Structural junctions, expansion joints, and material transitions are detailed without decorative cover-ups.
                </p>
                <div className="atelier-stage-annotations-box">
                  <span className="atelier-anno-item">[+] Concrete Formwork: Hand-selected rough Douglas Fir</span>
                  <span className="atelier-anno-item">[+] Joinery Tolerance: +/- 1.5mm dry-fit timber joints</span>
                  <span className="atelier-anno-item">[+] Thermal Break Details: Bespoke stainless anchors</span>
                </div>
              </div>
              <div className="atelier-stage-visual">
                <img src="/projects/atelier/process-construct.jpg" alt="Construction stage and structural assembly" className="atelier-stage-img" />
              </div>
            </div>

            {/* Stage D: INHABIT */}
            <div className="atelier-timeline-stage">
              <div className="atelier-stage-visual">
                <img src="/projects/atelier/process-inhabit.jpg" alt="Finished architectural interior and atmospheric daylight" className="atelier-stage-img" />
              </div>
              <div className="atelier-stage-copy">
                <span className="atelier-stage-step-tag">PHASE 04 &bull; ATMOSPHERE</span>
                <h3 className="atelier-stage-title">Inhabit</h3>
                <p className="atelier-stage-desc">
                  The true test of architecture unfolds in silence: the tactile temperature of stone beneath bare feet, the sound of rain descending into interior drainage channels, and the deep emotional stillness of honest shelter.
                </p>
                <div className="atelier-stage-annotations-box">
                  <span className="atelier-anno-item">[+] Diurnal Natural Illumination: 100% daylighting until dusk</span>
                  <span className="atelier-anno-item">[+] Acoustic Attenuation: Reverberation time RT60 &lt; 0.4s</span>
                  <span className="atelier-anno-item">[+] Indoor Air Quality: Zero synthetic volatile organic compounds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. TACTILE MATERIAL LIBRARY
          ==================================================================== */}
      <section id="atelier-materials" className="atelier-material-library-section" aria-label="Tactile Material Library">
        <div className="atelier-material-header">
          <span className="atelier-archive-section-tag">PHYSICAL SPECIMENS</span>
          <h2 className="atelier-archive-headline">The Material Library</h2>
          <p style={{ color: 'var(--atelier-graphite-muted)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
            We work exclusively with enduring authentic matter. Select any architectural specimen to examine its geological provenance, acoustic behavior, and archive project applications.
          </p>
        </div>

        <div className="atelier-material-grid">
          {MATERIALS_DATA.map((mat, idx) => (
            <div
              key={mat.id}
              className={`atelier-material-specimen-card ${activeMaterialIndex === idx ? 'active' : ''}`}
              onClick={() => {
                setActiveMaterialIndex(idx);
                showToast(`Inspecting Specimen ${mat.code}: ${mat.name}`);
              }}
            >
              <div className="atelier-mat-sample-thumb">
                <img src={mat.image} alt={mat.name} className="atelier-mat-sample-img" />
              </div>
              <span className="atelier-mat-specimen-id">{mat.code} &bull; SPECIMEN</span>
              <h3 className="atelier-mat-specimen-name">{mat.name}</h3>
              <span className="atelier-mat-specimen-finish">{mat.finish}</span>
              <p className="atelier-mat-specimen-desc">{mat.qualities}</p>
              <div className="atelier-mat-matched-projects">
                <strong>Documented In:</strong> {mat.projects.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          6. INTERACTIVE STUDIO SERVICES (ARCHITECTURAL PROCESS DIAGRAM)
          ==================================================================== */}
      <section id="atelier-services" className="atelier-services-section" aria-label="Interactive Studio Services">
        <div className="atelier-services-inner">
          <div className="atelier-services-header">
            <div>
              <span className="atelier-archive-section-tag">PRACTICE CAPABILITIES</span>
              <h2 className="atelier-archive-headline">Connected Disciplines</h2>
            </div>
            <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.7rem', color: 'var(--atelier-graphite-subtle)' }}>
              COMPREHENSIVE PROJECT LIFECYCLE
            </span>
          </div>

          <div className="atelier-services-diagram-grid">
            {SERVICES_DATA.map((svc, idx) => (
              <div
                key={svc.id}
                className={`atelier-service-stage-card ${activeServiceIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  setActiveServiceIndex(idx);
                  scrollTo('atelier-enquiry');
                }}
              >
                <span className="atelier-svc-step-badge">{svc.step}</span>
                <h3 className="atelier-svc-title">{svc.title}</h3>
                <p className="atelier-svc-desc">{svc.desc}</p>
                <div className="atelier-svc-deliverables">
                  <div><strong>Key Deliverables:</strong></div>
                  <div>{svc.deliverables}</div>
                  <div style={{ marginTop: '0.5rem', opacity: 0.85 }}><strong>Typical Duration:</strong> {svc.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. STUDIO PHILOSOPHY & DEMONSTRATION TEAM PROFILES
          ==================================================================== */}
      <section id="atelier-philosophy" className="atelier-philosophy-section" aria-label="Studio Philosophy & Team">
        <div className="atelier-philosophy-grid">
          <div>
            <span className="atelier-archive-section-tag">MANIFESTO ON PERMANENCE</span>
            <h2 className="atelier-manifesto-large-text">
              &ldquo;We believe genuine luxury in architecture is not superfluous ornament, but proportional clarity, quietude, and the honest permanence of materials that age with grace.&rdquo;
            </h2>
          </div>

          <div className="atelier-philosophy-body-text">
            <p>
              Founded in 2018 across studios in Paris, Tokyo, and Zurich, ATELIER unites spatial theorists, master carpenters, and computational structural engineers under a singular field-journal ethos.
            </p>
            <p>
              We deliberately restrict our annual commissions to no more than six major built works. This deliberate restraint guarantees that design principals remain personally immersed on-site through every concrete pour, stone joint, and daylight study.
            </p>
            <div style={{ borderTop: '1px solid var(--atelier-line)', paddingTop: '1.25rem', fontFamily: 'var(--atelier-font-mono)', fontSize: '0.75rem', color: 'var(--atelier-blueprint)' }}>
              <span>ACCREDITED RIBA &bull; SIA &bull; ORDRE DES ARCHITECTES</span>
            </div>
          </div>
        </div>

        {/* Fictional Demonstration Partner Profiles */}
        <div className="atelier-team-profiles-grid">
          <div className="atelier-team-card">
            <h3 className="atelier-team-name">Marcus Vance</h3>
            <span className="atelier-team-role">Design Principal &bull; Zurich</span>
            <p className="atelier-team-bio">
              Dipl. Arch. ETH Zurich. Specializes in monolithic mass-timber structures, acoustic spatial containment, and minimalist residential estates across the Alpine corridor.
            </p>
          </div>

          <div className="atelier-team-card">
            <h3 className="atelier-team-name">Elena Soria</h3>
            <span className="atelier-team-role">Director of Interiors & Materials &bull; Paris</span>
            <p className="atelier-team-bio">
              Politecnico di Milano. Leads the studio's physical material research lab, geological stone sourcing, and bespoke historical palazzo adaptive reuse.
            </p>
          </div>

          <div className="atelier-team-card">
            <h3 className="atelier-team-name">Kenzo Moriyama</h3>
            <span className="atelier-team-role">Technical & Structural Director &bull; Tokyo</span>
            <p className="atelier-team-bio">
              Tokyo University School of Engineering. Focuses on seismic post-tensioned concrete innovation, micro-climatic daylighting monitors, and Japanese joinery craft.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. PROFESSIONAL PROJECT ENQUIRY JOURNEY (MULTI-STEP WIZARD)
          ==================================================================== */}
      <section id="atelier-enquiry" className="atelier-enquiry-section" aria-label="Project Consultation Enquiry">
        <div className="atelier-enquiry-inner">
          <div className="atelier-enquiry-step-indicator">
            <div className={`atelier-step-bullet ${enquiryStep >= 1 ? 'active' : ''}`}>
              <span className="atelier-step-circle">01</span>
              <span>Client & Typology</span>
            </div>
            <div style={{ width: '40px', height: '1px', background: 'var(--atelier-line)' }} />
            <div className={`atelier-step-bullet ${enquiryStep >= 2 ? 'active' : ''}`}>
              <span className="atelier-step-circle">02</span>
              <span>Site & Scope</span>
            </div>
            <div style={{ width: '40px', height: '1px', background: 'var(--atelier-line)' }} />
            <div className={`atelier-step-bullet ${enquiryStep >= 3 ? 'active' : ''}`}>
              <span className="atelier-step-circle">03</span>
              <span>Review & Transmit</span>
            </div>
          </div>

          {enquirySubmitted ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--atelier-blueprint)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'var(--atelier-font-serif)', fontSize: '2.4rem', fontWeight: 500, color: 'var(--atelier-graphite)' }}>
                Dossier Received
              </h3>
              <p style={{ color: 'var(--atelier-graphite-muted)', maxWidth: '540px', margin: '1rem auto 2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Thank you, <strong>{enquiryData.name}</strong>. Your project dossier has been registered in our studio queue under reference <strong>ATL-REQ-8421</strong>. A partner will review your site constraints and initiate direct contact within 48 hours.
              </p>
              <div style={{ display: 'inline-block', backgroundColor: 'var(--atelier-paper-light)', border: '1px solid var(--atelier-line)', padding: '1rem 1.5rem', borderRadius: '2px', fontFamily: 'var(--atelier-font-mono)', fontSize: '0.72rem', color: 'var(--atelier-graphite-muted)' }}>
                VERHOST Architectural Prototype &bull; No live commercial backend connected.
              </div>
              <div style={{ marginTop: '2rem' }}>
                <button
                  type="button"
                  className="atelier-btn-secondary"
                  onClick={() => {
                    setEnquirySubmitted(false);
                    setEnquiryStep(1);
                  }}
                >
                  Submit Another Consultation Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit}>
              {/* STEP 1: CLIENT & TYPOLOGY */}
              {enquiryStep === 1 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--atelier-font-serif)', fontSize: '1.85rem', marginBottom: '1.5rem' }}>
                    01. Project Identification & Contact
                  </h3>

                  <div className="atelier-form-group">
                    <label className="atelier-form-label">Select Project Typology</label>
                    <div className="atelier-typology-selector-grid">
                      {[
                        { id: 'residential', label: 'Residential Estate', icon: '⌂' },
                        { id: 'workplace', label: 'Commercial & Workplace', icon: '🏢' },
                        { id: 'cultural', label: 'Cultural & Pavilion', icon: '🏛' },
                        { id: 'hospitality', label: 'Hospitality & Dining', icon: '☕' }
                      ].map(t => (
                        <button
                          key={t.id}
                          type="button"
                          className={`atelier-typology-btn ${enquiryData.typology === t.id ? 'active' : ''}`}
                          onClick={() => setEnquiryData({ ...enquiryData, typology: t.id })}
                        >
                          <span style={{ fontSize: '1.25rem' }}>{t.icon}</span>
                          <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', fontWeight: 600 }}>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="atelier-form-grid-2col">
                    <div className="atelier-form-group">
                      <label className="atelier-form-label">Full Name *</label>
                      <input
                        type="text"
                        className="atelier-form-input"
                        placeholder="e.g. Julian Henderson"
                        value={enquiryData.name}
                        onChange={(e) => setEnquiryData({ ...enquiryData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="atelier-form-group">
                      <label className="atelier-form-label">Email Address *</label>
                      <input
                        type="email"
                        className="atelier-form-input"
                        placeholder="e.g. j.henderson@private.ch"
                        value={enquiryData.email}
                        onChange={(e) => setEnquiryData({ ...enquiryData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="atelier-form-grid-2col">
                    <div className="atelier-form-group">
                      <label className="atelier-form-label">Telephone</label>
                      <input
                        type="tel"
                        className="atelier-form-input"
                        placeholder="+41 44 211 4000"
                        value={enquiryData.phone}
                        onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                      />
                    </div>
                    <div className="atelier-form-group">
                      <label className="atelier-form-label">Organization / Private Family</label>
                      <input
                        type="text"
                        className="atelier-form-input"
                        placeholder="e.g. Henderson Family Trust"
                        value={enquiryData.organization}
                        onChange={(e) => setEnquiryData({ ...enquiryData, organization: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="atelier-enquiry-nav-bar">
                    <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', color: 'var(--atelier-graphite-subtle)' }}>
                      STEP 1 OF 3
                    </span>
                    <button
                      type="button"
                      className="atelier-btn-primary"
                      onClick={() => {
                        if (!enquiryData.name || !enquiryData.email) {
                          showToast('Please enter your name and email to proceed.');
                          return;
                        }
                        setEnquiryStep(2);
                      }}
                    >
                      Continue to Site & Scope &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SITE & SCOPE */}
              {enquiryStep === 2 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--atelier-font-serif)', fontSize: '1.85rem', marginBottom: '1.5rem' }}>
                    02. Geographic Location & Constraints
                  </h3>

                  <div className="atelier-form-grid-2col">
                    <div className="atelier-form-group">
                      <label className="atelier-form-label">Site Location (City & Country) *</label>
                      <input
                        type="text"
                        className="atelier-form-input"
                        placeholder="e.g. Lausanne, Switzerland or Kyoto, Japan"
                        value={enquiryData.location}
                        onChange={(e) => setEnquiryData({ ...enquiryData, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="atelier-form-group">
                      <label className="atelier-form-label">Approximate Gross Area (m²)</label>
                      <input
                        type="text"
                        className="atelier-form-input"
                        placeholder="e.g. 450 m²"
                        value={enquiryData.area}
                        onChange={(e) => setEnquiryData({ ...enquiryData, area: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="atelier-form-grid-2col">
                    <div className="atelier-form-group">
                      <label className="atelier-form-label">Estimated Construction Budget</label>
                      <select
                        className="atelier-form-select"
                        value={enquiryData.budget}
                        onChange={(e) => setEnquiryData({ ...enquiryData, budget: e.target.value })}
                      >
                        <option value="Under $1,000,000 USD">Under $1,000,000 USD</option>
                        <option value="$1,000,000 – $3,000,000 USD">$1,000,000 – $3,000,000 USD</option>
                        <option value="$3,000,000 – $7,000,000 USD">$3,000,000 – $7,000,000 USD</option>
                        <option value="$7,000,000+ USD (Major Estate)">$7,000,000+ USD (Major Estate)</option>
                      </select>
                    </div>

                    <div className="atelier-form-group">
                      <label className="atelier-form-label">Anticipated Construction Timeline</label>
                      <select
                        className="atelier-form-select"
                        value={enquiryData.timeline}
                        onChange={(e) => setEnquiryData({ ...enquiryData, timeline: e.target.value })}
                      >
                        <option value="Immediate (Site acquired)">Immediate (Site acquired)</option>
                        <option value="6–12 Months (Planning stage)">6–12 Months (Planning stage)</option>
                        <option value="1–2 Years (Feasibility / Acquisition)">1–2 Years (Feasibility / Acquisition)</option>
                      </select>
                    </div>
                  </div>

                  <div className="atelier-form-group">
                    <label className="atelier-form-label">Brief Project Description / Context</label>
                    <textarea
                      rows={4}
                      className="atelier-form-textarea"
                      placeholder="Outline site topography, specific environmental ambitions, historic constraints, or material affinities..."
                      value={enquiryData.briefNotes}
                      onChange={(e) => setEnquiryData({ ...enquiryData, briefNotes: e.target.value })}
                    />
                  </div>

                  <div className="atelier-enquiry-nav-bar">
                    <button
                      type="button"
                      className="atelier-btn-secondary"
                      onClick={() => setEnquiryStep(1)}
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      className="atelier-btn-primary"
                      onClick={() => {
                        if (!enquiryData.location) {
                          showToast('Please specify the site location.');
                          return;
                        }
                        setEnquiryStep(3);
                      }}
                    >
                      Review Project Dossier &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW & TRANSMIT */}
              {enquiryStep === 3 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--atelier-font-serif)', fontSize: '1.85rem', marginBottom: '1.5rem' }}>
                    03. Verification & Dossier Transmission
                  </h3>

                  <div style={{ backgroundColor: 'var(--atelier-paper-light)', border: '1px solid var(--atelier-line)', padding: '2rem', borderRadius: '2px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.62rem', color: 'var(--atelier-graphite-subtle)', textTransform: 'uppercase' }}>CLIENT & CONTACT</span>
                      <div style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.2rem' }}>{enquiryData.name}</div>
                      <div style={{ color: 'var(--atelier-graphite-muted)' }}>{enquiryData.email}</div>
                      {enquiryData.phone && <div style={{ color: 'var(--atelier-graphite-muted)' }}>{enquiryData.phone}</div>}
                    </div>

                    <div>
                      <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.62rem', color: 'var(--atelier-graphite-subtle)', textTransform: 'uppercase' }}>TYPOLOGY & LOCATION</span>
                      <div style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.2rem', textTransform: 'capitalize' }}>{enquiryData.typology}</div>
                      <div style={{ color: 'var(--atelier-graphite-muted)' }}>{enquiryData.location}</div>
                      {enquiryData.area && <div style={{ color: 'var(--atelier-graphite-muted)' }}>Approx. {enquiryData.area}</div>}
                    </div>

                    <div>
                      <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.62rem', color: 'var(--atelier-graphite-subtle)', textTransform: 'uppercase' }}>ESTIMATED BUDGET</span>
                      <div style={{ fontWeight: 600, color: 'var(--atelier-blueprint)', marginTop: '0.2rem' }}>{enquiryData.budget}</div>
                    </div>

                    <div>
                      <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.62rem', color: 'var(--atelier-graphite-subtle)', textTransform: 'uppercase' }}>TIMELINE TARGET</span>
                      <div style={{ fontWeight: 600, color: 'var(--atelier-oxide)', marginTop: '0.2rem' }}>{enquiryData.timeline}</div>
                    </div>
                  </div>

                  {enquiryData.briefNotes && (
                    <div style={{ marginBottom: '2rem', padding: '1rem 1.5rem', borderLeft: '2px solid var(--atelier-blueprint)', backgroundColor: 'var(--atelier-paper-light)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                      &ldquo;{enquiryData.briefNotes}&rdquo;
                    </div>
                  )}

                  <div className="atelier-enquiry-nav-bar">
                    <button
                      type="button"
                      className="atelier-btn-secondary"
                      onClick={() => setEnquiryStep(2)}
                    >
                      &larr; Edit Details
                    </button>
                    <button
                      type="submit"
                      className="atelier-btn-primary"
                    >
                      Transmit Project Dossier to Studio &rarr;
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ====================================================================
          9. ARCHITECTURAL DOSSIER MODAL (PROJECT DETAILS)
          ==================================================================== */}
      {detailProject && (
        <div className="atelier-dossier-modal-overlay" role="dialog" aria-modal="true">
          <div className="atelier-dossier-sheet-window">
            <div className="atelier-dossier-header-bar">
              <div>
                <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', color: 'var(--atelier-oxide)', fontWeight: 700 }}>
                  {detailProject.number} &bull; ARCHITECTURAL DOSSIER
                </span>
                <h2 style={{ fontFamily: 'var(--atelier-font-serif)', fontSize: '1.85rem', fontWeight: 600, margin: '0.15rem 0' }}>
                  {detailProject.title}
                </h2>
                <span style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', color: 'var(--atelier-graphite-muted)' }}>
                  {detailProject.location} &bull; COMPLETED {detailProject.year} &bull; {detailProject.area}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  type="button"
                  style={{ background: 'none', border: '1px solid var(--atelier-line)', padding: '0.4rem 0.8rem', fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', cursor: 'pointer' }}
                  onClick={() => handleDetailNav(-1)}
                  title="Previous Project"
                >
                  &larr; PREV
                </button>
                <button
                  type="button"
                  style={{ background: 'none', border: '1px solid var(--atelier-line)', padding: '0.4rem 0.8rem', fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', cursor: 'pointer' }}
                  onClick={() => handleDetailNav(1)}
                  title="Next Project"
                >
                  NEXT &rarr;
                </button>
                <button
                  type="button"
                  style={{ background: 'var(--atelier-graphite)', color: '#fff', border: 'none', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setDetailProject(null)}
                  title="Close Dossier"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="atelier-dossier-content">
              {/* Photo Showcase */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
                <img
                  src={detailProject.dominantImage}
                  alt={detailProject.title}
                  style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '2px', border: '1px solid var(--atelier-line)' }}
                />
                <img
                  src={detailProject.detailImage}
                  alt={`${detailProject.title} tectonic detail`}
                  style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '2px', border: '1px solid var(--atelier-line)' }}
                />
              </div>

              {/* Two Column Narrative & Technical Breakdown */}
              <div className="atelier-dossier-grid">
                <div>
                  <h3 style={{ fontFamily: 'var(--atelier-font-serif)', fontSize: '1.5rem', marginBottom: '0.85rem' }}>
                    Design Concept & Climate Response
                  </h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--atelier-graphite-muted)', marginBottom: '1.25rem' }}>
                    {detailProject.designApproach}
                  </p>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--atelier-graphite-muted)' }}>
                    {detailProject.brief}
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--atelier-paper-warm)', padding: '2rem', border: '1px solid var(--atelier-line)', borderRadius: '2px' }}>
                  <h4 style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--atelier-blueprint)', marginBottom: '1.25rem', borderBottom: '1px solid var(--atelier-line)', paddingBottom: '0.5rem' }}>
                    Technical Specifications
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.8rem' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'var(--atelier-font-mono)', color: 'var(--atelier-graphite-subtle)' }}>STRUCTURAL SYSTEM</strong>
                      {detailProject.structuralSystem}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'var(--atelier-font-mono)', color: 'var(--atelier-graphite-subtle)' }}>PRIMARY MATERIALS</strong>
                      {detailProject.materials.join(' • ')}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'var(--atelier-font-mono)', color: 'var(--atelier-graphite-subtle)' }}>GROSS INTERNAL FLOOR AREA</strong>
                      {detailProject.area}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'var(--atelier-font-mono)', color: 'var(--atelier-graphite-subtle)' }}>PROJECT LEAD</strong>
                      {detailProject.leadArchitect} &bull; ATELIER Studio
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem' }}>
                    <button
                      type="button"
                      className="atelier-btn-primary"
                      style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                      onClick={() => {
                        setDetailProject(null);
                        scrollTo('atelier-enquiry');
                      }}
                    >
                      Enquire for Similar Commission &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          10. FOOTER & COLOPHON
          ==================================================================== */}
      <footer className="atelier-footer-colophon">
        <div className="atelier-footer-inner">
          <div>
            <span style={{ fontFamily: 'var(--atelier-font-serif)', fontSize: '2rem', letterSpacing: '0.15em', display: 'block', marginBottom: '0.75rem' }}>
              ATELIER
            </span>
            <p style={{ color: 'var(--atelier-concrete)', fontSize: '0.82rem', lineHeight: 1.6, maxWidth: '380px' }}>
              An international architecture and interior studio crafting enduring spaces at the confluence of natural light, tectonic permanence, and landscape ecology.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--atelier-oxide)', marginBottom: '1rem' }}>
              PRACTICE STUDIOS
            </h4>
            <div style={{ fontSize: '0.78rem', color: 'var(--atelier-concrete)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div><strong>PARIS</strong>: 14 Rue de Turenne, 75004</div>
              <div><strong>TOKYO</strong>: 5-7-2 Minami-Aoyama, Minato</div>
              <div><strong>ZURICH</strong>: Rämistrasse 101, 8001</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--atelier-oxide)', marginBottom: '1rem' }}>
              INDEX ARCHIVE
            </h4>
            <div style={{ fontSize: '0.78rem', color: 'var(--atelier-concrete)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>Residential Pavilions</div>
              <div>Cultural Galleries</div>
              <div>Workplace Research</div>
              <div>Material Laboratory</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--atelier-font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--atelier-oxide)', marginBottom: '1rem' }}>
              ACCREDITATION
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--atelier-concrete)', lineHeight: 1.5 }}>
              Registered with Ordre des Architectes (France), SIA (Switzerland), and JIA (Japan). All photography &copy; 2026 ATELIER Practice.
            </p>
          </div>
        </div>

        <div className="atelier-footer-bottom">
          <span>&copy; 2026 ATELIER ARCHITECTURAL STUDIO. ALL RIGHTS RESERVED.</span>
          <span>VERHOST DIGITAL WORKS &bull; BUSINESS SHOWCASE 02</span>
        </div>
      </footer>
    </div>
  );
}
