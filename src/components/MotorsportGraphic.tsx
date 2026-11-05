import React from "react";

interface MotorsportGraphicProps {
  type: "hero-jump" | "rock-matrix" | "pokhara-himalayas" | "stunt-whip" | "paddock" | "crowd";
  className?: string;
  overlayText?: string;
}

export const MotorsportGraphic: React.FC<MotorsportGraphicProps> = ({
  type,
  className = "",
  overlayText
}) => {
  return (
    <div className={`relative overflow-hidden bg-neutral-950 ${className}`}>
      {type === "hero-jump" && (
        <svg
          viewBox="0 0 1600 900"
          className="w-full h-full object-cover select-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Motocross rider leaping over rugged dirt jump with mountain peaks in background"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c0a09" />
              <stop offset="40%" stopColor="#18181b" />
              <stop offset="75%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>
            <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E50920" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#b91c1c" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mountainHimalaya" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#71717a" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#18181b" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="dirtHill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="40%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <linearGradient id="redTrail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E50920" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E50920" stopOpacity="0" />
            </linearGradient>
            <filter id="motionBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Deep atmospheric sky */}
          <rect width="1600" height="900" fill="url(#skyGrad)" />
          
          {/* Radial sunset glow behind rider */}
          <circle cx="980" cy="380" r="480" fill="url(#sunGlow)" />

          {/* Distant Annapurna Range Peaks */}
          <path
            d="M 100 520 L 320 280 L 460 380 L 680 210 L 860 360 L 1020 180 L 1210 340 L 1380 230 L 1600 480 L 1600 900 L 0 900 L 0 540 Z"
            fill="url(#mountainHimalaya)"
          />
          {/* Snow glints on peaks */}
          <polygon points="680,210 630,260 730,260" fill="#ffffff" fillOpacity="0.25" />
          <polygon points="1020,180 970,240 1070,240" fill="#ffffff" fillOpacity="0.3" />
          <polygon points="1380,230 1340,280 1420,280" fill="#ffffff" fillOpacity="0.2" />

          {/* Midground rolling Pokhara ridge */}
          <path
            d="M 0 580 Q 400 490 850 560 T 1600 510 L 1600 900 L 0 900 Z"
            fill="#1c1917"
            fillOpacity="0.85"
          />

          {/* Foreground dirt launch ramp */}
          <path
            d="M 0 900 L 0 740 Q 320 700 540 620 L 590 640 L 820 900 Z"
            fill="url(#dirtHill)"
          />
          <path
            d="M 520 625 L 590 640 L 780 900 L 510 900 Z"
            fill="#18181b"
          />

          {/* Flying dust & roost streaks */}
          <g filter="url(#motionBlur)" opacity="0.6">
            <ellipse cx="640" cy="610" rx="90" ry="25" fill="#a1a1aa" opacity="0.4" />
            <ellipse cx="580" cy="630" rx="140" ry="35" fill="#71717a" opacity="0.3" />
            <path d="M 620 590 Q 520 680 430 760" stroke="#d4d4d8" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
            <path d="M 660 580 Q 540 690 390 820" stroke="#a1a1aa" strokeWidth="5" opacity="0.25" />
            <path d="M 700 560 Q 580 720 460 880" stroke="#71717a" strokeWidth="12" opacity="0.2" />
          </g>

          {/* Kinetic Speed Lines / Red championship accents */}
          <path d="M 680 340 L 480 480" stroke="url(#redTrail)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 720 310 L 560 410" stroke="url(#redTrail)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M 840 260 L 690 350" stroke="url(#redTrail)" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

          {/* Silhouette of Motocross Jump in Mid-Air */}
          <g transform="translate(820, 240) rotate(-14)">
            {/* Rear wheel */}
            <circle cx="-110" cy="110" r="54" fill="none" stroke="#27272a" strokeWidth="14" />
            <circle cx="-110" cy="110" r="38" fill="none" stroke="#52525b" strokeWidth="3" />
            <circle cx="-110" cy="110" r="16" fill="#E50920" />
            {/* Swingarm & chain */}
            <line x1="-110" y1="110" x2="-20" y2="70" stroke="#71717a" strokeWidth="10" strokeLinecap="round" />
            <line x1="-110" y1="110" x2="-30" y2="45" stroke="#a1a1aa" strokeWidth="4" />

            {/* Exhaust pipe */}
            <path d="M -15 65 Q -60 55 -90 85" fill="none" stroke="#e4e4e7" strokeWidth="7" strokeLinecap="round" />

            {/* Engine block */}
            <polygon points="-30,35 25,35 20,85 -25,85" fill="#3f3f46" stroke="#71717a" strokeWidth="2" />
            <rect x="-18" y="48" width="30" height="25" rx="3" fill="#18181b" />

            {/* Frame & Red championship plastics */}
            <path d="M -60 25 L 30 15 L 75 -15 L -20 15 Z" fill="#E50920" />
            <polygon points="-80,22 -30,22 -20,40 -70,35" fill="#ffffff" />
            <text x="-65" y="34" fill="#09090b" fontSize="11" fontWeight="bold" fontFamily="sans-serif">27</text>

            {/* Fuel tank & seat */}
            <path d="M -50 10 Q 0 -5 45 10 L 25 25 L -55 20 Z" fill="#18181b" />

            {/* Front forks & front wheel */}
            <line x1="45" y1="5" x2="120" y2="120" stroke="#a1a1aa" strokeWidth="8" strokeLinecap="round" />
            <line x1="55" y1="5" x2="128" y2="116" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
            <circle cx="125" cy="118" r="54" fill="none" stroke="#27272a" strokeWidth="14" />
            <circle cx="125" cy="118" r="38" fill="none" stroke="#52525b" strokeWidth="3" />
            <circle cx="125" cy="118" r="16" fill="#E50920" />
            {/* Front fender */}
            <path d="M 60 15 Q 115 15 150 45" fill="none" stroke="#E50920" strokeWidth="9" strokeLinecap="round" />

            {/* Handlebars & grips */}
            <line x1="38" y1="-8" x2="52" y2="-8" stroke="#e4e4e7" strokeWidth="7" strokeLinecap="round" />

            {/* Rider: Legs, torso, arms, helmet */}
            {/* Rider Boots & Legs */}
            <path d="M -15 65 L -35 25 L 5 -5" fill="none" stroke="#18181b" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M -18 68 L -38 28" stroke="#E50920" strokeWidth="6" strokeLinecap="round" />

            {/* Rider Torso with Red Racing Jersey */}
            <path d="M 5 -5 L 35 -45 L 60 -40 L 25 15 Z" fill="#E50920" />
            <text x="24" y="-22" fill="#ffffff" fontSize="12" fontWeight="900" transform="rotate(25 24 -22)" fontFamily="sans-serif">ASH</text>

            {/* Rider Arms */}
            <path d="M 45 -40 L 45 -10" fill="none" stroke="#18181b" strokeWidth="12" strokeLinecap="round" />
            <path d="M 48 -40 L 48 -10" stroke="#E50920" strokeWidth="4" strokeLinecap="round" />

            {/* Rider Helmet & Goggles */}
            <ellipse cx="50" cy="-62" rx="18" ry="16" fill="#18181b" stroke="#E50920" strokeWidth="4" />
            {/* Helmet peak/visor */}
            <polygon points="56,-74 78,-66 62,-60" fill="#E50920" />
            {/* Goggle lens */}
            <ellipse cx="62" cy="-62" rx="6" ry="4" fill="#fbbf24" opacity="0.9" />
          </g>

          {/* Vignette border */}
          <rect width="1600" height="900" fill="none" stroke="#18181b" strokeWidth="2" />
        </svg>
      )}

      {type === "rock-matrix" && (
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover select-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="800" height="500" fill="#111113" />
          {/* Mountain contours */}
          <path d="M0,320 Q200,260 400,310 T800,280 L800,500 L0,500 Z" fill="#18181b" />
          {/* Giant River Boulders */}
          <ellipse cx="140" cy="420" rx="90" ry="60" fill="#27272a" stroke="#3f3f46" strokeWidth="3" />
          <ellipse cx="290" cy="450" rx="110" ry="70" fill="#1e1e22" stroke="#3f3f46" strokeWidth="4" />
          <ellipse cx="460" cy="410" rx="85" ry="55" fill="#2d2d32" stroke="#52525b" strokeWidth="3" />
          <ellipse cx="620" cy="440" rx="100" ry="65" fill="#232328" stroke="#3f3f46" strokeWidth="4" />
          {/* Staggered Heavy Timber Logs */}
          <rect x="180" y="360" width="260" height="32" rx="8" fill="#443428" stroke="#713f12" strokeWidth="3" transform="rotate(-12 310 376)" />
          <rect x="360" y="340" width="240" height="30" rx="7" fill="#382c22" stroke="#5b3310" strokeWidth="3" transform="rotate(8 480 355)" />
          {/* Water Splash */}
          <path d="M 380 430 Q 340 370 320 400 Q 350 440 390 435" fill="#67e8f9" opacity="0.4" />
          <circle cx="340" cy="380" r="4" fill="#67e8f9" opacity="0.6" />
          <circle cx="360" cy="365" r="3" fill="#67e8f9" opacity="0.7" />
          {/* Hard Enduro Bike Clambering */}
          <g transform="translate(360, 260) rotate(22)">
            <circle cx="-50" cy="60" r="32" fill="none" stroke="#3f3f46" strokeWidth="9" />
            <circle cx="50" cy="35" r="32" fill="none" stroke="#3f3f46" strokeWidth="9" />
            <path d="M -50 60 L 5 40 L 50 35" stroke="#71717a" strokeWidth="6" />
            <polygon points="-25,25 20,20 10,40 -20,40" fill="#E50920" />
            <circle cx="20" cy="-10" r="12" fill="#E50920" />
            <line x1="5" y1="20" x2="20" y2="-2" stroke="#f4f4f5" strokeWidth="6" />
          </g>
          {/* Red racing accent tag */}
          <rect x="24" y="24" width="6" height="32" fill="#E50920" />
        </svg>
      )}

      {type === "pokhara-himalayas" && (
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover select-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="skyHimalaya" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0a0c" />
              <stop offset="60%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
            <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#skyHimalaya)" />
          {/* Snow peaks: Machhapuchhre (Fishtail) and Annapurna */}
          <polygon points="340,110 310,210 370,210" fill="#f8fafc" opacity="0.9" />
          <polygon points="340,110 350,150 360,210" fill="#cbd5e1" opacity="0.6" />
          {/* Fishtail double-horn silhouette */}
          <polygon points="334,105 340,125 346,105" fill="#18181b" />
          {/* Main Annapurna Massive */}
          <polygon points="120,160 50,260 200,260" fill="#e2e8f0" opacity="0.8" />
          <polygon points="560,140 460,260 640,260" fill="#e2e8f0" opacity="0.85" />
          <polygon points="680,180 610,270 760,270" fill="#cbd5e1" opacity="0.7" />
          {/* Green valley ridges */}
          <path d="M0,270 Q240,210 480,260 T800,240 L800,500 L0,500 Z" fill="#1c1917" opacity="0.9" />
          {/* Phewa Lake reflection */}
          <path d="M0,380 C200,360 600,360 800,380 L800,500 L0,500 Z" fill="url(#lakeGrad)" />
          {/* Ripple lines */}
          <line x1="220" y1="410" x2="380" y2="410" stroke="#38bdf8" strokeWidth="2" opacity="0.25" />
          <line x1="450" y1="430" x2="620" y2="430" stroke="#38bdf8" strokeWidth="2" opacity="0.2" />
          {/* Paraglider in distance */}
          <path d="M 620 120 Q 645 108 670 120" stroke="#E50920" strokeWidth="3" fill="none" />
          <circle cx="645" cy="130" r="2" fill="#ffffff" />
        </svg>
      )}

      {type === "stunt-whip" && (
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full object-cover select-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="800" height="600" fill="#0d0d10" />
          <circle cx="400" cy="240" r="240" fill="#E50920" opacity="0.12" />
          {/* Motocross FMX Whip Inverted in Air */}
          <g transform="translate(400, 250) rotate(-38)">
            <circle cx="-70" cy="50" r="36" fill="none" stroke="#27272a" strokeWidth="10" />
            <circle cx="70" cy="-50" r="36" fill="none" stroke="#27272a" strokeWidth="10" />
            <line x1="-70" y1="50" x2="0" y2="10" stroke="#71717a" strokeWidth="8" />
            <line x1="0" y1="10" x2="70" y2="-50" stroke="#71717a" strokeWidth="8" />
            <polygon points="-30,10 30,-20 15,15 -15,25" fill="#E50920" />
            {/* Rider horizontal whip body */}
            <line x1="-10" y1="0" x2="-40" y2="-40" stroke="#f4f4f5" strokeWidth="12" strokeLinecap="round" />
            <circle cx="-45" cy="-50" r="14" fill="#E50920" />
          </g>
          {/* Arena Floodlights */}
          <polygon points="120,40 180,40 260,320 80,320" fill="#ffffff" opacity="0.04" />
          <polygon points="680,40 620,40 540,320 720,320" fill="#ffffff" opacity="0.04" />
          {/* Landing ramp silhouette */}
          <polygon points="520,600 760,420 800,420 800,600" fill="#18181b" />
        </svg>
      )}

      {type === "paddock" && (
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover select-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="800" height="500" fill="#121215" />
          {/* Paddock Canopies */}
          <polygon points="40,240 220,180 400,240 40,240" fill="#E50920" opacity="0.8" />
          <polygon points="400,240 580,180 760,240 400,240" fill="#27272a" opacity="0.9" />
          <rect x="60" y="240" width="320" height="220" fill="#18181b" />
          <rect x="420" y="240" width="320" height="220" fill="#18181b" />
          {/* Bike on Stand */}
          <rect x="180" y="410" width="40" height="40" fill="#3f3f46" />
          <circle cx="160" cy="410" r="28" fill="none" stroke="#52525b" strokeWidth="8" />
          <circle cx="240" cy="410" r="28" fill="none" stroke="#52525b" strokeWidth="8" />
          <polygon points="170,390 230,390 210,360 180,360" fill="#E50920" />
          {/* Tool Chest */}
          <rect x="290" y="380" width="45" height="70" fill="#dc2626" rx="2" />
          <line x1="290" y1="400" x2="335" y2="400" stroke="#7f1d1d" strokeWidth="2" />
          <line x1="290" y1="420" x2="335" y2="420" stroke="#7f1d1d" strokeWidth="2" />
        </svg>
      )}

      {type === "crowd" && (
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover select-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="800" height="500" fill="#09090b" />
          {/* Hillside terrace with cheering fans */}
          <path d="M0,320 Q350,220 800,290 L800,500 L0,500 Z" fill="#1c1917" />
          {/* Silhouettes of heads and cheering hands */}
          <g fill="#27272a" opacity="0.9">
            {Array.from({ length: 42 }).map((_, i) => (
              <circle
                key={i}
                cx={20 + i * 19}
                cy={295 + Math.sin(i * 1.4) * 22}
                r={6 + (i % 3)}
              />
            ))}
          </g>
          {/* Raised championship banners and cameras */}
          <line x1="240" y1="280" x2="240" y2="240" stroke="#71717a" strokeWidth="2" />
          <rect x="240" y="240" width="30" height="18" fill="#E50920" />
          <line x1="520" y1="270" x2="520" y2="230" stroke="#71717a" strokeWidth="2" />
          <rect x="520" y="230" width="35" height="20" fill="#ffffff" />
          <text x="525" y="244" fill="#09090b" fontSize="8" fontWeight="bold">NEPAL</text>
        </svg>
      )}

      {overlayText && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6">
          <p className="text-white font-medium text-sm drop-shadow-md">{overlayText}</p>
        </div>
      )}
    </div>
  );
};
