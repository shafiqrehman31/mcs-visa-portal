import React, { useState, useEffect } from 'react';
import { getBranding, onStorageUpdate } from '../services/storageService';

interface LogoProps {
  variant?: 'inline' | 'stacked' | 'mark';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
  customLogoUrl?: string;
  customBrandName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'inline',
  theme = 'light',
  size = 'md',
  className = '',
  showSubtitle = true,
  customLogoUrl: propLogoUrl,
  customBrandName: propBrandName,
}) => {
  const [storedLogoUrl, setStoredLogoUrl] = useState<string | undefined>(undefined);
  const [storedBrandName, setStoredBrandName] = useState<string>('Modernminds');

  useEffect(() => {
    const updateLogo = () => {
      const branding = getBranding();
      setStoredLogoUrl(branding.logoUrl);
      if (branding.brandName) {
        setStoredBrandName(branding.brandName);
      }
    };
    updateLogo();
    const unsub = onStorageUpdate(updateLogo);
    return () => unsub();
  }, []);

  const activeLogoUrl = propLogoUrl || storedLogoUrl;
  const activeBrandName = propBrandName || storedBrandName || 'Modernminds';

  // Size dimensions
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-sm font-extrabold tracking-tight leading-none',
    md: 'text-base sm:text-lg font-extrabold tracking-tight leading-none',
    lg: 'text-xl sm:text-2xl font-black tracking-tight leading-none',
    xl: 'text-2xl sm:text-3xl font-black tracking-tight leading-none',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-wide font-bold mt-0.5',
    md: 'text-[10px] sm:text-[11px] tracking-wide font-bold mt-1',
    lg: 'text-xs tracking-wider font-bold mt-1',
    xl: 'text-sm tracking-wider font-bold mt-1.5',
  };

  const isDark = theme === 'dark';

  // Vector Icon representing the three figures & embracing ribbons
  // Colors: Primary Blue #074592, Accent Green #66d925, Coral Red #ff4958
  const LogoIcon = activeLogoUrl ? (
    <div className={`relative shrink-0 flex items-center justify-center ${iconSizes[size]}`}>
      <img 
        src={activeLogoUrl} 
        alt="Modernminds Logo" 
        className="w-full h-full object-contain rounded-md"
      />
    </div>
  ) : (
    <div className={`relative shrink-0 flex items-center justify-center ${iconSizes[size]}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mmsBlueGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3E0" />
            <stop offset="100%" stopColor="#074592" />
          </linearGradient>

          <linearGradient id="mmsRedGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4958" />
            <stop offset="100%" stopColor="#d62534" />
          </linearGradient>

          <linearGradient id="mmsGreenGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#66d925" />
            <stop offset="100%" stopColor="#4aa31a" />
          </linearGradient>

          <filter id="mmsShadowComp" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodOpacity="0.22" />
          </filter>
        </defs>

        <g transform="translate(0, 10)">
          {/* 3 Figure Heads (Dots) with Exact Brand Colors */}
          <circle cx="255" cy="72" r="18" fill="#074592" />
          <circle cx="106" cy="265" r="17" fill="#ff4958" />
          <circle cx="362" cy="290" r="16.5" fill="#66d925" />

          {/* Outer Embracing Swooshes */}
          {/* Red Swoosh (Top-Left Shoulder) */}
          <path
            d="M 125,275 C 70,235 60,135 145,95 C 205,67 265,110 300,135"
            fill="none"
            stroke="url(#mmsRedGradComp)"
            strokeWidth="13"
            strokeLinecap="round"
          />

          {/* Navy Blue Swoosh (Top-Right down to inner base) */}
          <path
            d="M 235,105 C 290,85 380,105 405,175 C 430,245 370,325 220,375"
            fill="none"
            stroke="#074592"
            strokeWidth="13.5"
            strokeLinecap="round"
          />

          {/* Lime Green Swoosh (Bottom Chin & left-up curve) */}
          <path
            d="M 148,145 C 130,265 185,405 260,427 C 315,441 348,385 340,315"
            fill="none"
            stroke="url(#mmsGreenGradComp)"
            strokeWidth="17"
            strokeLinecap="round"
          />

          {/* Inner Calligraphy Ribbon */}
          <g filter="url(#mmsShadowComp)">
            {/* Left Cyan Loop */}
            <path
              d="M 112,187 C 122,203 140,207 152,193 C 160,183 155,165 142,171 C 125,179 105,183 120,200 C 132,213 165,209 175,177"
              fill="none"
              stroke="url(#mmsBlueGradComp)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center Crimson Curve */}
            <path
              d="M 166,233 C 172,187 188,140 204,190 C 214,223 226,237 240,207 C 248,191 242,167 232,160"
              fill="none"
              stroke="url(#mmsRedGradComp)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Script Accent Dots */}
            <circle cx="214" cy="157" r="8" fill="#074592" />
            <circle cx="218" cy="155" r="4.5" fill="#ff4958" />

            {/* Green Flourish rising upward */}
            <path
              d="M 238,240 C 242,185 252,130 250,125"
              fill="none"
              stroke="#66d925"
              strokeWidth="5.5"
              strokeLinecap="round"
            />

            {/* Center-Right Green Loop */}
            <path
              d="M 240,205 C 246,177 258,170 268,200 C 274,220 272,237 255,237"
              fill="none"
              stroke="url(#mmsGreenGradComp)"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Far Right Red/Orange Loop */}
            <path
              d="M 275,197 C 285,173 318,173 335,185 C 352,197 342,233 315,235 C 290,237 294,203 322,193 C 342,185 354,197 345,213"
              fill="none"
              stroke="url(#mmsRedGradComp)"
              strokeWidth="15"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {LogoIcon}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {LogoIcon}
        <div className="mt-2">
          <span className={`block ${titleSizes[size]} ${isDark ? 'text-white' : 'text-[#074592]'}`}>
            {activeBrandName}
          </span>
          {showSubtitle && (
            <p className={`block ${subtitleSizes[size]} uppercase font-bold text-[#ff4958]`}>
              Consulting Services Pvt.Ltd
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default 'inline' layout
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {LogoIcon}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`${titleSizes[size]} ${isDark ? 'text-white' : 'text-[#074592]'}`}>
            {activeBrandName}
          </span>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#66d925]/20 text-[#074592] dark:text-[#66d925] border border-[#66d925]/50 leading-none">
            MCS
          </span>
        </div>
        {showSubtitle && (
          <p className={`${subtitleSizes[size]} uppercase font-bold text-[#ff4958]`}>
            Consulting Services Pvt.Ltd
          </p>
        )}
      </div>
    </div>
  );
};
