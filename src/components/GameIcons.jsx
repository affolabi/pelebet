import React, { useState } from 'react';

export const PELEBET_ASSETS = {
  logoLight: 'https://pelebet.app/images/logo.png',
  logoDark: 'https://pelebet.app/images/logo-dark.png',
  phoneFront: 'https://pelebet.app/images/phone-front.png',
  phoneBack: 'https://pelebet.app/images/phone-back.png',
  googlePlay: 'https://pelebet.app/images/google-play.png',
  appStore: 'https://pelebet.app/images/app-store.png',
  games: {
    WHOT: 'https://pelebet.app/images/whot_icon.png',
    EIGHT_BALL: 'https://pelebet.app/images/8ball_icon.png',
    LUDO: 'https://pelebet.app/images/Ludo_icon.png',
    PENALTY: 'https://pelebet.app/images/penalty_icon.png',
  }
};

export function PeleBetLogo({ light = true, className = "h-9" }) {
  const [imgError, setImgError] = useState(false);
  const src = light ? PELEBET_ASSETS.logoLight : PELEBET_ASSETS.logoDark;

  if (!imgError) {
    return (
      <div className="inline-flex items-center gap-2.5 select-none">
        <img
          src={src}
          alt="PeleBet"
          className={`${className} w-auto object-contain`}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-[#5ce1e6] flex items-center justify-center shadow-sm border border-white/20 relative overflow-hidden">
        <span className="font-condensed text-xl tracking-tight text-[#080612] leading-none pt-0.5">PB</span>
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#6226FF] border-2 border-[#080612]" />
      </div>
      <div className="flex flex-col">
        <span className={`font-display font-extrabold text-xl tracking-tight leading-none ${light ? 'text-white' : 'text-[#080612]'}`}>
          PELE<span className={light ? 'text-[#5ce1e6]' : 'text-[#6226FF]'}>BET</span>
        </span>
        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] leading-none mt-0.5 ${light ? 'text-white/70' : 'text-gray-500'}`}>
          PvP Cash Arena
        </span>
      </div>
    </div>
  );
}

export function GameBadgeIcon({ gameId, className = "w-8 h-8", rounded = "rounded-xl" }) {
  const [imgError, setImgError] = useState(false);
  const imgUrl = PELEBET_ASSETS.games[gameId];

  if (imgUrl && !imgError) {
    return (
      <img
        src={imgUrl}
        alt={gameId}
        className={`${className} ${rounded} object-cover shrink-0`}
        onError={() => setImgError(true)}
      />
    );
  }

  switch (gameId) {
    case "WHOT":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <rect x="6" y="4" width="22" height="30" rx="4" fill="#FFF" stroke="#080612" strokeWidth="2.2" transform="rotate(-6 6 4)" />
          <rect x="12" y="6" width="22" height="30" rx="4" fill="#FF6B2C" stroke="#080612" strokeWidth="2.2" transform="rotate(4 12 6)" />
          <path d="M23 14L25.2 18.8L30.4 19.4L26.5 23L27.6 28.2L23 25.5L18.4 28.2L19.5 23L15.6 19.4L20.8 18.8L23 14Z" fill="#FFF" />
          <text x="15" y="14" fill="#FFF" fontSize="6" fontWeight="900">20</text>
        </svg>
      );
    case "EIGHT_BALL":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <circle cx="20" cy="20" r="15" fill="#080612" stroke="#5ce1e6" strokeWidth="2.2" />
          <circle cx="15" cy="14" r="3" fill="rgba(255,255,255,0.2)" />
          <circle cx="21" cy="21" r="6.5" fill="#FFF" />
          <text x="21" y="24" textAnchor="middle" fill="#080612" fontSize="9.5" fontWeight="900">8</text>
        </svg>
      );
    case "PENALTY":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <rect x="5" y="8" width="30" height="18" rx="2" stroke="#00A859" strokeWidth="2.5" fill="rgba(0,168,89,0.12)" />
          <circle cx="20" cy="26" r="8" fill="#FFF" stroke="#080612" strokeWidth="2.2" />
          <path d="M20 21L23.5 23.5L22 27.5H18L16.5 23.5L20 21Z" fill="#080612" />
        </svg>
      );
    case "LUDO":
    default:
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none">
          <rect x="7" y="7" width="26" height="26" rx="6" fill="#F59E0B" stroke="#080612" strokeWidth="2.2" />
          <circle cx="14" cy="14" r="2.3" fill="#080612" />
          <circle cx="26" cy="14" r="2.3" fill="#080612" />
          <circle cx="20" cy="20" r="2.3" fill="#FFF" />
          <circle cx="14" cy="26" r="2.3" fill="#080612" />
          <circle cx="26" cy="26" r="2.3" fill="#080612" />
        </svg>
      );
  }
}

export function QrCodeGraphic({ className = "w-14 h-14", color = "#FFFFFF" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <rect x="4" y="4" width="20" height="20" rx="3" stroke={color} strokeWidth="4" />
      <rect x="10" y="10" width="8" height="8" rx="1" fill={color} />
      <rect x="40" y="4" width="20" height="20" rx="3" stroke={color} strokeWidth="4" />
      <rect x="46" y="10" width="8" height="8" rx="1" fill={color} />
      <rect x="4" y="40" width="20" height="20" rx="3" stroke={color} strokeWidth="4" />
      <rect x="10" y="46" width="8" height="8" rx="1" fill={color} />
      <rect x="28" y="8" width="6" height="6" fill={color} />
      <rect x="28" y="18" width="6" height="10" fill={color} />
      <rect x="8" y="28" width="10" height="6" fill={color} />
      <rect x="24" y="30" width="12" height="6" fill={color} />
      <rect x="40" y="28" width="6" height="12" fill={color} />
      <rect x="52" y="30" width="8" height="6" fill={color} />
      <rect x="30" y="42" width="8" height="8" fill={color} />
      <rect x="44" y="44" width="14" height="6" fill={color} />
      <rect x="42" y="54" width="8" height="6" fill={color} />
      <rect x="54" y="52" width="6" height="8" fill={color} />
    </svg>
  );
}

/* PocketApp-style bold wavy ribbons at base of Hero */
export function HeroWavyRibbons() {
  return (
    <div className="w-full overflow-hidden pointer-events-none select-none">
      <svg
        viewBox="0 0 1440 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[110px] sm:h-[160px] lg:h-[210px] preserve-3d"
        preserveAspectRatio="none"
      >
        <path
          d="M-60 95 C 60 15, 180 175, 300 95 C 420 15, 540 175, 660 95 C 780 15, 900 175, 1020 95 C 1140 15, 1260 175, 1380 95 C 1440 55, 1500 95, 1540 95"
          stroke="#080612"
          strokeWidth="38"
          strokeLinecap="round"
        />
        <path
          d="M-60 145 C 60 65, 180 225, 300 145 C 420 65, 540 225, 660 145 C 780 65, 900 225, 1020 145 C 1140 65, 1260 225, 1380 145 C 1440 105, 1500 145, 1540 145"
          stroke="#7A42FF"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <path
          d="M0 155 C 120 95, 240 205, 360 155 C 480 95, 600 205, 720 155 C 840 95, 960 205, 1080 155 C 1200 95, 1320 205, 1440 155 L 1440 220 L 0 220 Z"
          fill="#080612"
        />
      </svg>
    </div>
  );
}

/* PocketApp-style intertwined looping ribbons inside the Emerald Green Banner */
export function GreenBannerRibbons() {
  return (
    <div className="w-full overflow-hidden pointer-events-none select-none mt-4">
      <svg
        viewBox="0 0 1200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[160px] sm:h-[220px] lg:h-[260px]"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-40 260 C 40 150, 150 180, 190 280"
          stroke="#6226FF"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M1240 260 C 1160 150, 1050 180, 1010 280"
          stroke="#6226FF"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M-20 80 C 120 220, 360 240, 390 110 C 410 30, 290 30, 310 120 C 340 230, 500 235, 600 235 C 700 235, 860 230, 890 120 C 910 30, 790 30, 810 110 C 840 240, 1080 220, 1220 80"
          stroke="#F59E0B"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-30 160 C 90 35, 250 110, 230 280"
          stroke="#080612"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M1230 160 C 1110 35, 950 110, 970 280"
          stroke="#080612"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M230 280 C 245 140, 445 140, 480 270"
          stroke="#080612"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M970 280 C 955 140, 755 140, 720 270"
          stroke="#080612"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <rect x="520" y="216" width="160" height="38" rx="19" fill="#F59E0B" />
      </svg>
    </div>
  );
}
