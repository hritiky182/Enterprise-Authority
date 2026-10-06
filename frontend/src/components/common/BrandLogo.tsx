import React from 'react';
import { useApp } from '../../context/AppContext';

export interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'emblem' | 'full' | 'horizontal';
  showText?: boolean;
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showText = true,
  inverted = false,
}) => {
  const { organization, lang } = useApp();

  const dimensions = {
    sm: { box: 'w-7 h-7', icon: 28, text: 'text-xs', sub: 'text-[9px]' },
    md: { box: 'w-9 h-9', icon: 36, text: 'text-sm', sub: 'text-[10px]' },
    lg: { box: 'w-12 h-12', icon: 48, text: 'text-base', sub: 'text-xs' },
    xl: { box: 'w-16 h-16', icon: 64, text: 'text-lg', sub: 'text-xs' },
  }[size];

  // If a custom image was uploaded, render that
  if (organization?.logoUrl && organization.logoUrl.trim().length > 0) {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img
          src={organization.logoUrl}
          alt={organization.name || 'Organization Logo'}
          className={`${dimensions.box} object-contain rounded-xl`}
        />
        {showText && variant !== 'emblem' && (
          <div className="leading-tight">
            <div className={`font-bold font-sans ${inverted ? 'text-white' : 'text-slate-900'} ${dimensions.text}`}>
              {lang === 'ar' ? (organization.nameAr || organization.name) : organization.name}
            </div>
            <div className={`font-mono uppercase tracking-wider text-blue-500 font-semibold ${dimensions.sub}`}>
              {organization.shortCode || organization.shortName || 'AHDA'}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active logo preset type (default: 'ahda-emblem')
  const logoType = organization?.logo || 'ahda-emblem';

  // SVG Vector Emblems
  const renderEmblem = () => {
    switch (logoType) {
      case 'falcon-crest':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="url(#falconGrad)" stroke="#6366F1" strokeWidth="2.5" />
            <path d="M50 20L58 36L76 38L62 50L66 68L50 58L34 68L38 50L24 38L42 36L50 20Z" fill="#FDE047" opacity="0.9" />
            <path d="M50 32C42 42 36 54 36 64C36 72 42 78 50 78C58 78 64 72 64 64C64 54 58 42 50 32Z" fill="#FFFFFF" opacity="0.95" />
            <defs>
              <linearGradient id="falconGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#312E81" />
                <stop offset="1" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'geometric-star':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="url(#starGrad)" stroke="#38BDF8" strokeWidth="2.5" />
            <polygon points="50,15 62,38 85,38 67,52 74,75 50,60 26,75 33,52 15,38 38,38" fill="#38BDF8" opacity="0.85" />
            <polygon points="50,25 58,42 75,42 62,52 67,68 50,58 33,68 38,52 25,42 42,42" fill="#FFFFFF" />
            <circle cx="50" cy="50" r="6" fill="#F59E0B" />
            <defs>
              <linearGradient id="starGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0C4A6E" />
                <stop offset="1" stopColor="#082F49" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'civic-pillar':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="url(#pillarGrad)" stroke="#F59E0B" strokeWidth="2.5" />
            <rect x="25" y="74" width="50" height="6" rx="2" fill="#FDE047" />
            <rect x="28" y="22" width="44" height="6" rx="2" fill="#FDE047" />
            <rect x="33" y="30" width="7" height="42" rx="1.5" fill="#FFFFFF" />
            <rect x="46.5" y="30" width="7" height="42" rx="1.5" fill="#FFFFFF" />
            <rect x="60" y="30" width="7" height="42" rx="1.5" fill="#FFFFFF" />
            <path d="M50 14L28 22H72L50 14Z" fill="#FDE047" />
            <defs>
              <linearGradient id="pillarGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#78350F" />
                <stop offset="1" stopColor="#451A03" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'ahda-emblem':
      default:
        // Official Al-Ahsa Development Authority Oasis Palm & Heritage Architectural Seal
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outer Ring with Golden Gradient */}
            <circle cx="50" cy="50" r="47" fill="url(#ahdaBg)" stroke="url(#goldRing)" strokeWidth="3" />
            <circle cx="50" cy="50" r="43" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

            {/* Oasis Waterways & Palm Tree Silhouette */}
            {/* Sun Rays / Radiance behind Palm */}
            <path d="M50 20L50 26M50 74L50 80M20 50L26 50M74 50L80 50" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

            {/* Architectural Fortress Battlements at base */}
            <path d="M30 68H70V73C70 74 69 75 68 75H32C31 75 30 74 30 73V68Z" fill="#B45309" opacity="0.8" />
            <path d="M34 68V64H38V68H42V64H46V68H54V64H58V68H62V64H66V68" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Oasis Palm Tree Trunk */}
            <path d="M47.5 68L48.5 45H51.5L52.5 68H47.5Z" fill="#F59E0B" />
            <path d="M46 54H54M47 60H53" stroke="#92400E" strokeWidth="1" />

            {/* Lush Palm Fronds (Al-Ahsa Oasis UNESCO Heritage) */}
            <path d="M50 45C45 38 35 37 26 40C34 44 42 46 49 46" fill="#10B981" />
            <path d="M50 45C55 38 65 37 74 40C66 44 58 46 51 46" fill="#10B981" />
            <path d="M50 44C43 33 32 30 22 31C30 36 40 40 48 44" fill="#059669" />
            <path d="M50 44C57 33 68 30 78 31C70 36 60 40 52 44" fill="#059669" />
            <path d="M50 43C47 30 39 23 29 21C36 28 44 35 49 43" fill="#34D399" />
            <path d="M50 43C53 30 61 23 71 21C64 28 56 35 51 43" fill="#34D399" />
            <path d="M50 42C50 28 47 19 50 16C53 19 50 28 50 42" fill="#FDE68A" />

            {/* Two crossed Heritage Scimitars / Emblems at lower quadrant */}
            <path d="M38 72Q50 78 62 72" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />

            {/* Gradients */}
            <defs>
              <linearGradient id="ahdaBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#064E3B" />
                <stop offset="0.6" stopColor="#042F2E" />
                <stop offset="1" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="goldRing" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" />
                <stop offset="0.5" stopColor="#D97706" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        );
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Emblem Frame */}
      <div className={`${dimensions.box} rounded-2xl flex items-center justify-center p-0.5 shrink-0 shadow-xs transition-transform duration-200 hover:scale-105`}>
        {renderEmblem()}
      </div>

      {/* Official Typography */}
      {showText && variant !== 'emblem' && (
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight font-sans truncate ${
                inverted ? 'text-white' : 'text-slate-900'
              } ${dimensions.text}`}
              title={lang === 'ar' ? (organization?.nameAr || organization?.name) : organization?.name}
            >
              {lang === 'ar'
                ? (organization?.nameAr || 'هيئة تطوير الأحساء')
                : (organization?.name || 'Al Ahsa Development Authority')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 leading-none">
            <span
              className={`font-mono font-bold tracking-wider uppercase text-amber-500 ${dimensions.sub} truncate`}
            >
              {organization?.shortCode || organization?.shortName || 'AHDA'}
            </span>
            <span className="text-slate-400 text-[9px]">•</span>
            <span
              className={`font-sans truncate ${inverted ? 'text-slate-400' : 'text-slate-500'} ${dimensions.sub}`}
            >
              {lang === 'ar' ? 'المنظومة الاستراتيجية' : 'Strategy & GRC Suite'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
