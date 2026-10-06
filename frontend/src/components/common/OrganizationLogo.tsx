import React from 'react';
import { Landmark, Leaf, Crown, ShieldCheck, Building2 } from 'lucide-react';

interface OrganizationLogoProps {
  logoId?: string | undefined;
  logoUrl?: string | undefined;
  className?: string | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  alt?: string | undefined;
}

export const OrganizationLogo: React.FC<OrganizationLogoProps> = ({
  logoId = 'ahda-emblem',
  logoUrl,
  className = '',
  size = 'md',
  alt = 'Organization Logo',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  // If a custom image (uploaded file / Data URL / external URL) is present, display it
  if (logoUrl && logoUrl.trim().length > 0) {
    return (
      <img
        src={logoUrl}
        alt={alt}
        className={`${sizeClasses} object-contain rounded-xl p-0.5 border border-slate-700/50 bg-white/10 ${className}`}
        onError={(e) => {
          // If image fails to load, gracefully fallback to vector emblem
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  // Preset Vector Emblems
  const getLogoPath = (id: string) => {
    switch (id) {
      case 'oasis-palm':
        return '/logos/oasis-palm.svg';
      case 'royal-crest':
        return '/logos/royal-crest.svg';
      case 'modern-shield':
        return '/logos/modern-shield.svg';
      case 'ahda-emblem':
      default:
        return '/logos/ahda-emblem.svg';
    }
  };

  const svgSrc = getLogoPath(logoId);

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${sizeClasses} ${className}`}>
      <img
        src={svgSrc}
        alt={alt}
        className="w-full h-full object-contain filter drop-shadow-sm transition-transform"
        onError={(e) => {
          // Inline icon fallback if SVG file cannot be fetched
          const target = e.currentTarget;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xs">AHDA</div>`;
          }
        }}
      />
    </div>
  );
};
