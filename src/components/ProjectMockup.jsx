import React from 'react';
import MaxywalkPreview from '../projects/ecommerce/maxywalk/MaxywalkPreview';
import LumoraLivingPreview from '../projects/ecommerce/lumora-living/LumoraLivingPreview';
import VeraBeautyPreview from '../projects/ecommerce/vera-beauty/VeraBeautyPreview';
import ChronixPreview from '../projects/ecommerce/chronix/ChronixPreview';
import FreshMarketPreview from '../projects/ecommerce/fresh-market/FreshMarketPreview';
import GlowePreview from '../projects/ecommerce/glowe/GlowePreview';
import AtelierPreview from '../projects/business/atelier/AtelierPreview';
import VerdantPreview from '../projects/business/verdant/VerdantPreview';
import NexoraPreview from '../projects/business/nexora/NexoraPreview';
import SolvixPreview from '../projects/business/solvix/SolvixPreview';
import CreativioPreview from '../projects/landing/creativio/CreativioPreview';
import SynthoraPreview from '../projects/landing/synthora/SynthoraPreview';
import DevflowPreview from '../projects/landing/devflow/DevflowPreview';
import SpacenPreview from '../projects/landing/spacen/SpacenPreview';
import ListitPreview from '../projects/portfolio/listit/ListitPreview';
import ArchoraPreview from '../projects/portfolio/archora/ArchoraPreview';
import MarcusVancePreview from '../projects/portfolio/marcus-vance/MarcusVancePreview';
import NordicTimberPreview from '../projects/portfolio/nordic-timber/NordicTimberPreview';
import PrismaticPreview from '../projects/creative/prismatic/PrismaticPreview';
import OffgridPreview from '../projects/creative/offgrid/OffgridPreview';
import Museum01Preview from '../projects/creative/museum01/Museum01Preview';
import SonoraPreview from '../projects/creative/sonora/SonoraPreview';
import InnovistDesignPreview from '../projects/interior/innovist-design/InnovistDesignPreview';
import InnovistArchitecturePreview from '../projects/interior/innovist-architecture/InnovistArchitecturePreview';
import IntrioPreview from '../projects/interior/intrio/IntrioPreview';
import DatumPreview from '../projects/interior/datum/DatumPreview';
import ChorooPreview from '../projects/interior/choroo/ChorooPreview';
import ElirasPreview from '../projects/interior/eliras/ElirasPreview';
import PrimeAxisPreview from '../projects/interior/prime-axis/PrimeAxisPreview';

export default function ProjectMockup({ project, isExpanded = false }) {
  // Delegate E-Commerce and Business projects to their independent modules
  if (project.id === 'maxywalk') {
    return <MaxywalkPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'lumora-living') {
    return <LumoraLivingPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'chronix') {
    return <ChronixPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'vera-beauty') {
    return <VeraBeautyPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'glowe') {
    return <GlowePreview isExpanded={isExpanded} />;
  }
  if (project.id === 'atelier') {
    return <AtelierPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'verdant-systems') {
    return <VerdantPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'nexora') {
    return <NexoraPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'solvix') {
    return <SolvixPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'creativio') {
    return <CreativioPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'synthora') {
    return <SynthoraPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'devflow') {
    return <DevflowPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'spacen') {
    return <SpacenPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'listit') {
    return <ListitPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'archora' || project.id === 'designer-port') {
    return <ArchoraPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'marcus-vance' || project.id === 'photo-journal') {
    return <MarcusVancePreview isExpanded={isExpanded} />;
  }
  if (project.id === 'nordic-timber' || project.id === 'arch-archive') {
    return <NordicTimberPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'prismatic' || project.id === 'aura-atelier') {
    return <PrismaticPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'offgrid' || project.id === 'motion-lab') {
    return <OffgridPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'museum-01' || project.id === 'monolith-ui') {
    return <Museum01Preview isExpanded={isExpanded} />;
  }
  if (project.id === 'sonora') {
    return <SonoraPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'fresh-market') {
    return <FreshMarketPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'innovist-design') {
    return <InnovistDesignPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'innovist-architecture') {
    return <InnovistArchitecturePreview isExpanded={isExpanded} />;
  }
  if (project.id === 'intrio') {
    return <IntrioPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'datum-interior') {
    return <DatumPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'choroo') {
    return <ChorooPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'eliras') {
    return <ElirasPreview isExpanded={isExpanded} />;
  }
  if (project.id === 'prime-axis') {
    return <PrimeAxisPreview isExpanded={isExpanded} />;
  }

  // Preserved rendering for other categories (Business, Landing, Portfolio, Creative)
  const { title, theme } = project;
  const isLight = theme?.mode === 'light';
  const bg = theme?.bg || (isLight ? '#F5F3EF' : '#111215');
  const textColor = isLight ? '#111111' : '#FFFFFF';
  const subTextColor = isLight ? '#666666' : '#9CA3AF';
  const accent = theme?.accent || '#169B50';
  const border = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)';

  return (
    <div 
      className={`mockup-screen-container ${isLight ? 'is-light-theme' : 'is-dark-theme'} ${isExpanded ? 'is-expanded-view' : 'is-compact-view'}`}
      style={{ backgroundColor: bg }}
    >
      {/* Website Header Bar */}
      <div className="mini-web-header" style={{ borderBottom: `1px solid ${border}` }}>
        <span className="mini-brand-tag" style={{ color: textColor }}>
          {theme?.brand || title}
        </span>
        <div className="mini-header-nav" style={{ color: subTextColor }}>
          <span>Home</span>
          <span>Overview</span>
          <span>Archive</span>
          <span>Contact</span>
        </div>
        <span className="mini-header-cta" style={{ backgroundColor: isLight ? '#111' : '#FFF', color: isLight ? '#FFF' : '#111' }}>
          Explore
        </span>
      </div>

      {/* Website Hero Composition */}
      <div className="mini-hero-body">
        <div className="mini-copy-col">
          <h4 className="mini-hero-headline" style={{ color: textColor }}>
            {theme?.headline || title}
          </h4>
          <p className="mini-hero-sub" style={{ color: subTextColor }}>
            {theme?.sub || project.description}
          </p>
          <div className="mini-cta-pill" style={{ backgroundColor: isLight ? '#111' : '#FFF', color: isLight ? '#FFF' : '#111' }}>
            <span>Learn More</span>
          </div>
        </div>

        <div className="mini-graphic-col">
          {renderCategoryGraphic(theme?.mockupType, accent, isLight)}
        </div>
      </div>
    </div>
  );
}

function renderCategoryGraphic(type, accent, isLight) {
  switch (type) {
    case 'architecture':
      return (
        <svg viewBox="0 0 200 130" className="mockup-svg-graphic" fill="none">
          <rect x="30" y="25" width="140" height="95" rx="3" fill="#D8D8D2" stroke="#555555" strokeWidth="1.5" />
          <line x1="65" y1="25" x2="65" y2="120" stroke="#777777" strokeWidth="1.5" />
          <line x1="100" y1="25" x2="100" y2="120" stroke="#777777" strokeWidth="1.5" />
          <line x1="135" y1="25" x2="135" y2="120" stroke="#777777" strokeWidth="1.5" />
          <line x1="30" y1="55" x2="170" y2="55" stroke="#777777" strokeWidth="1.5" />
          <line x1="30" y1="88" x2="170" y2="88" stroke="#777777" strokeWidth="1.5" />
          <polygon points="30,25 100,25 65,120 30,120" fill="rgba(255,255,255,0.35)" />
        </svg>
      );
    case 'turbine':
      return (
        <svg viewBox="0 0 200 130" className="mockup-svg-graphic" fill="none">
          <circle cx="100" cy="70" r="48" fill="#131C24" stroke="#1E293B" strokeWidth="3" />
          <circle cx="100" cy="70" r="32" fill="#0F172A" stroke="#22C55E" strokeWidth="2" strokeDasharray="6 3" />
          <circle cx="100" cy="70" r="16" fill="#22C55E" opacity="0.85" filter="drop-shadow(0 0 10px #22C55E)" />
          <path d="M20 105 Q 60 75 100 85 T 180 60" stroke="#22C55E" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>
      );
    case 'growth':
      return (
        <svg viewBox="0 0 200 130" className="mockup-svg-graphic" fill="none">
          <polygon points="90,130 140,40 180,90 200,130" fill="#E2EBE5" opacity="0.8" />
          <polygon points="120,130 160,20 200,70 200,130" fill="#C5DEC9" opacity="0.9" />
          <polygon points="150,130 185,10 200,45 200,130" fill="#93C89E" opacity="0.9" />
          <polygon points="170,130 195,5 200,25 200,130" fill="#489F5C" opacity="0.95" />
        </svg>
      );
    case 'cyberpunk':
      return (
        <svg viewBox="0 0 200 130" className="mockup-svg-graphic" fill="none">
          <ellipse cx="145" cy="85" rx="35" ry="45" fill="#101915" />
          <path d="M125 50 C 135 30 165 30 170 50 C 175 70 170 115 150 125 C 135 125 120 100 125 50 Z" fill="#14261D" />
          <path d="M140 45 C 150 35 168 40 170 60 C 172 80 165 110 152 120" stroke="#169B50" strokeWidth="3" strokeLinecap="round" />
          <circle cx="160" cy="65" r="3" fill="#169B50" />
          <line x1="160" y1="65" x2="185" y2="55" stroke="#169B50" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );
    case 'cubes':
      return (
        <svg viewBox="0 0 200 130" className="mockup-svg-graphic" fill="none">
          <polygon points="130,50 155,35 180,50 155,65" fill="#A7F3D0" />
          <polygon points="130,50 155,65 155,95 130,80" fill="#6EE7B7" />
          <polygon points="180,50 155,65 155,95 180,80" fill="#34D399" />
          <polygon points="90,75 115,60 140,75 115,90" fill="#D1FAE5" />
          <polygon points="90,75 115,90 115,120 90,105" fill="#A7F3D0" />
          <polygon points="140,75 115,90 115,120 140,105" fill="#6EE7B7" />
        </svg>
      );
    case 'automotive':
      return (
        <svg viewBox="0 0 200 130" className="mockup-svg-graphic" fill="none">
          <rect x="20" y="15" width="160" height="100" rx="6" fill="#0D0E12" stroke="#26262B" strokeWidth="1.5" />
          <circle cx="125" cy="65" r="34" fill="#18181F" stroke="#E11D48" strokeWidth="2" />
          <circle cx="115" cy="55" r="9" fill="#FFFFFF" opacity="0.85" filter="drop-shadow(0 0 6px #FFFFFF)" />
          <circle cx="138" cy="55" r="9" fill="#FFFFFF" opacity="0.85" filter="drop-shadow(0 0 6px #FFFFFF)" />
          <circle cx="115" cy="78" r="9" fill="#FFFFFF" opacity="0.85" filter="drop-shadow(0 0 6px #FFFFFF)" />
          <circle cx="138" cy="78" r="9" fill="#FFFFFF" opacity="0.85" filter="drop-shadow(0 0 6px #FFFFFF)" />
          <path d="M35 45 H75" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="35" y="60" width="45" height="6" rx="3" fill="#3F3F46" />
          <rect x="35" y="74" width="30" height="6" rx="3" fill="#27272A" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 130" className="mockup-svg-graphic" fill="none">
          <rect x="25" y="20" width="150" height="90" rx="8" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="65" cy="65" r="24" fill={accent} opacity="0.3" />
          <path d="M40 90 L 80 50 L 120 90 L 160 55" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
