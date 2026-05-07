import { motion } from "motion/react";

type Theme = "es" | "fr" | "de" | "ja" | "ko";

interface Props {
  theme: Theme;
}

function SagradaFamilia() {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-es" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE4C8" />
          <stop offset="40%" stopColor="#FFD3A5" />
          <stop offset="70%" stopColor="#FFB89D" />
          <stop offset="100%" stopColor="#FF9B8F" />
        </linearGradient>
        <linearGradient id="tower-es" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAF0E6" />
          <stop offset="50%" stopColor="#E8D4BE" />
          <stop offset="100%" stopColor="#C9A88A" />
        </linearGradient>
        <radialGradient id="sun-es" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFF4E0" />
          <stop offset="100%" stopColor="#FFE9C4" opacity="0.8" />
        </radialGradient>
      </defs>
      <rect width="200" height="220" fill="url(#sky-es)" />
      {/* Sun with glow */}
      <circle cx="155" cy="55" r="28" fill="url(#sun-es)" opacity="0.4" />
      <circle cx="155" cy="55" r="20" fill="url(#sun-es)" opacity="0.9" />
      {/* Towers */}
      {[40, 70, 100, 130, 160].map((x, i) => {
        const h = [110, 140, 160, 135, 105][i];
        return (
          <g key={x}>
            <polygon
              points={`${x - 10},220 ${x - 10},${220 - h} ${x},${220 - h - 25} ${x + 10},${220 - h} ${x + 10},220`}
              fill="url(#tower-es)"
              stroke="#B89A7D"
              strokeWidth="0.5"
            />
            <circle cx={x} cy={220 - h - 30} r="4" fill="#F4D03F" opacity="0.9" />
            <circle cx={x} cy={220 - h - 30} r="2" fill="#FFE66D" />
            {[0.25, 0.45, 0.65, 0.85].map((p, idx) => (
              <line
                key={p}
                x1={x - 9}
                y1={220 - h * p}
                x2={x + 9}
                y2={220 - h * p}
                stroke="#A88566"
                strokeWidth="0.8"
                opacity={0.5 + idx * 0.1}
              />
            ))}
            {/* Window details */}
            {[0.35, 0.55, 0.75].map((p) => (
              <circle key={`w${p}`} cx={x} cy={220 - h * p} r="1.5" fill="#7A6550" opacity="0.6" />
            ))}
          </g>
        );
      })}
      <rect x="0" y="200" width="200" height="20" fill="#8B6F47" />
      {/* Ground shadows */}
      <rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.1" />
    </svg>
  );
}

function EiffelTower() {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-fr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD4E5" />
          <stop offset="50%" stopColor="#E8C4DC" />
          <stop offset="100%" stopColor="#B8D5E8" />
        </linearGradient>
        <linearGradient id="tower-fr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A3328" />
          <stop offset="100%" stopColor="#2C1810" />
        </linearGradient>
        <radialGradient id="moon-fr">
          <stop offset="0%" stopColor="#FFFAF0" />
          <stop offset="100%" stopColor="#FFF4D6" opacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="200" height="220" fill="url(#sky-fr)" />
      {/* Moon glow */}
      <circle cx="40" cy="50" r="24" fill="#FFF4D6" opacity="0.3" />
      <circle cx="40" cy="50" r="18" fill="url(#moon-fr)" />
      {/* Tower structure */}
      <path d="M100 30 L92 90 L75 160 L60 210 L140 210 L125 160 L108 90 Z" fill="url(#tower-fr)" opacity="0.9" />
      <path d="M100 30 L96 70 L88 70 L100 30 Z" fill="#5D4037" />
      {/* Cross beams */}
      <line x1="80" y1="120" x2="120" y2="120" stroke="#3E2723" strokeWidth="2.5" />
      <line x1="70" y1="170" x2="130" y2="170" stroke="#3E2723" strokeWidth="2.5" />
      {/* Lattice detail */}
      {[80, 100, 130, 150].map((y) => (
        <g key={y}>
          <line x1="85" y1={y} x2="95" y2={y + 15} stroke="#5D4037" strokeWidth="0.8" opacity="0.6" />
          <line x1="105" y1={y} x2="115" y2={y + 15} stroke="#5D4037" strokeWidth="0.8" opacity="0.6" />
        </g>
      ))}
      {/* Lights on tower */}
      {[100, 140, 180].map((y) => (
        <circle key={`light${y}`} cx="100" cy={y} r="1.5" fill="#FFE66D" opacity="0.8" />
      ))}
      <rect x="0" y="200" width="200" height="20" fill="#6B8E5A" />
      <rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.15" />
    </svg>
  );
}

function Brandenburg() {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-de" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4E8D8" />
          <stop offset="50%" stopColor="#E8D5C4" />
          <stop offset="100%" stopColor="#C8B8A0" />
        </linearGradient>
        <linearGradient id="stone-de" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0CDB0" />
          <stop offset="100%" stopColor="#C4AC8E" />
        </linearGradient>
      </defs>
      <rect width="200" height="220" fill="url(#sky-de)" />
      {/* Main gate structure */}
      <rect x="40" y="100" width="120" height="100" fill="url(#stone-de)" />
      {/* Columns with depth */}
      {[55, 80, 105, 130, 155].map((x) => (
        <g key={x}>
          <rect x={x - 6} y="100" width="12" height="100" fill="#9B8366" />
          <rect x={x - 5} y="100" width="2" height="100" fill="#B89A7D" opacity="0.5" />
          <rect x={x + 3} y="100" width="2" height="100" fill="#000000" opacity="0.15" />
        </g>
      ))}
      {/* Top architrave */}
      <rect x="35" y="90" width="130" height="14" fill="#B89A7D" />
      <rect x="35" y="90" width="130" height="2" fill="#D4BFA0" />
      <rect x="35" y="102" width="130" height="2" fill="#000000" opacity="0.2" />
      {/* Quadriga (chariot) on top */}
      <g transform="translate(85, 60)">
        <rect x="0" y="20" width="30" height="10" fill="#9B7F5A" />
        <rect x="0" y="20" width="30" height="2" fill="#C9A87A" />
        <circle cx="15" cy="15" r="9" fill="#D4B896" />
        <circle cx="15" cy="15" r="7" fill="#C9A87A" />
        {/* Horses silhouette */}
        <path d="M5 22 L8 18 L10 22 M20 22 L23 18 L25 22" stroke="#8B7355" strokeWidth="1.5" fill="none" />
      </g>
      {/* Archways detail */}
      {[65, 100, 135].map((x) => (
        <rect key={`arch${x}`} x={x - 8} y="130" width="16" height="40" rx="8" fill="#5D4F3C" opacity="0.3" />
      ))}
      <rect x="0" y="200" width="200" height="20" fill="#6B5D44" />
      <rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.12" />
    </svg>
  );
}

function MtFuji() {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-ja" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE4EC" />
          <stop offset="50%" stopColor="#FFD9E0" />
          <stop offset="100%" stopColor="#FFF5F7" />
        </linearGradient>
        <linearGradient id="fuji-ja" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A9CC1" />
          <stop offset="60%" stopColor="#7A8FB8" />
          <stop offset="100%" stopColor="#6A7FA0" />
        </linearGradient>
        <radialGradient id="sun-ja">
          <stop offset="0%" stopColor="#FF8B9A" />
          <stop offset="100%" stopColor="#FF6B7A" opacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="200" height="220" fill="url(#sky-ja)" />
      {/* Rising sun */}
      <circle cx="150" cy="55" r="26" fill="#FF6B7A" opacity="0.3" />
      <circle cx="150" cy="55" r="20" fill="url(#sun-ja)" />
      {/* Mt Fuji */}
      <path d="M30 200 L100 70 L170 200 Z" fill="url(#fuji-ja)" />
      {/* Snow cap with detail */}
      <path d="M75 110 L100 70 L125 110 L120 115 L110 100 L100 110 L90 100 L80 115 Z" fill="#FFFFFF" />
      <path d="M85 108 L100 85 L115 108" fill="#F0F8FF" opacity="0.6" />
      {/* Clouds - more refined */}
      <g opacity="0.75">
        <ellipse cx="35" cy="160" rx="25" ry="8" fill="#FFFFFF" />
        <ellipse cx="50" cy="157" rx="20" ry="7" fill="#FFFFFF" />
        <ellipse cx="145" cy="175" rx="30" ry="9" fill="#FFFFFF" />
        <ellipse cx="165" cy="172" rx="22" ry="7" fill="#FFFFFF" />
      </g>
      {/* Foreground with sakura tone */}
      <rect x="0" y="200" width="200" height="20" fill="#E8B5C0" />
      {/* Cherry blossom petals */}
      {[{x: 20, y: 185}, {x: 60, y: 190}, {x: 140, y: 188}, {x: 175, y: 192}].map((p, i) => (
        <g key={i} transform={`translate(${p.x}, ${p.y})`}>
          <circle cx="0" cy="0" r="2" fill="#FFB5C5" opacity="0.8" />
          <circle cx="0" cy="0" r="1" fill="#FFC5D5" />
        </g>
      ))}
      <rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.08" />
    </svg>
  );
}

function Gyeongbokgung() {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-ko" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9F0E3" />
          <stop offset="50%" stopColor="#C9E4D8" />
          <stop offset="100%" stopColor="#F0E8D8" />
        </linearGradient>
        <linearGradient id="roof-ko" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A84A4A" />
          <stop offset="100%" stopColor="#8B3A3A" />
        </linearGradient>
        <linearGradient id="wall-ko" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C896" />
          <stop offset="100%" stopColor="#C4A574" />
        </linearGradient>
      </defs>
      <rect width="200" height="220" fill="url(#sky-ko)" />
      {/* Mountain backdrop */}
      <path d="M0 120 Q50 100 100 110 T200 120 L200 200 L0 200 Z" fill="#A8C8B0" opacity="0.3" />
      {/* Palace roof with curved edges */}
      <path d="M30 130 L100 90 L170 130 L165 135 L35 135 Z" fill="url(#roof-ko)" />
      <path d="M30 130 Q50 125 100 90 Q150 125 170 130" stroke="#6D2A2A" strokeWidth="1.5" fill="none" />
      {/* Roof decorative edge */}
      <rect x="30" y="133" width="140" height="3" fill="#6D2A2A" />
      {/* Main wall */}
      <rect x="50" y="135" width="100" height="65" fill="url(#wall-ko)" />
      {/* Pillars with detail */}
      {[65, 85, 105, 125].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="135" width="8" height="65" fill="#8B5A3C" />
          <rect x={x - 3.5} y="135" width="1.5" height="65" fill="#A67C52" opacity="0.6" />
          <rect x={x + 2} y="135" width="1.5" height="65" fill="#000000" opacity="0.2" />
        </g>
      ))}
      {/* Door */}
      <rect x="90" y="160" width="20" height="40" fill="#6D2A2A" rx="1" />
      <rect x="93" y="163" width="6" height="34" fill="#8B3A3A" />
      <rect x="101" y="163" width="6" height="34" fill="#8B3A3A" />
      {/* Decorative patterns on wall */}
      {[55, 135].map((x) => (
        <g key={`deco${x}`}>
          <rect x={x} y="145" width="10" height="15" fill="#B88856" opacity="0.4" rx="1" />
        </g>
      ))}
      <rect x="0" y="200" width="200" height="20" fill="#7B8D6A" />
      {/* Pine tree - more detailed */}
      <g transform="translate(20, 150)">
        <rect x="6" y="30" width="4" height="22" fill="#5D4037" />
        <ellipse cx="8" cy="24" rx="11" ry="12" fill="#4A7A5A" />
        <ellipse cx="8" cy="28" rx="13" ry="10" fill="#3D6B4A" />
        <ellipse cx="4" cy="32" rx="8" ry="8" fill="#3D6B4A" />
        <ellipse cx="12" cy="32" rx="8" ry="8" fill="#3D6B4A" />
        <circle cx="8" cy="24" r="6" fill="#5A8B6A" opacity="0.4" />
      </g>
      <rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.1" />
    </svg>
  );
}

const map = {
  es: { Comp: SagradaFamilia, caption: "Barcelona · España", lat: "41.3851° N", lng: "2.1734° E" },
  fr: { Comp: EiffelTower, caption: "Paris · France", lat: "48.8584° N", lng: "2.2945° E" },
  de: { Comp: Brandenburg, caption: "Berlin · Deutschland", lat: "52.5163° N", lng: "13.3777° E" },
  ja: { Comp: MtFuji, caption: "富士山 · 日本", lat: "35.3606° N", lng: "138.7274° E" },
  ko: { Comp: Gyeongbokgung, caption: "경복궁 · 한국", lat: "37.5796° N", lng: "126.9770° E" },
};

export function PolaroidLandmark({ theme }: Props) {
  const { Comp, caption, lat, lng } = map[theme];
  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0, y: 16, rotate: -4, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
      exit={{ opacity: 0, y: -16, rotate: 2, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
      className="bg-white p-4 pb-14 rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_10px_25px_-10px_rgba(0,0,0,0.2)] relative cursor-pointer"
      style={{ width: 260 }}
    >
      <div className="w-full aspect-[10/11] overflow-hidden bg-stone-50 rounded-sm ring-1 ring-stone-200/50">
        <Comp />
      </div>
      <div
        className="absolute bottom-4 left-0 right-0 px-4"
        style={{ fontFamily: '"Caveat", "Bradley Hand", cursive' }}
      >
        <div className="text-stone-700 mb-0.5" style={{ fontSize: 17, fontWeight: 500 }}>
          {caption}
        </div>
        <div className="text-stone-400 flex items-center gap-1.5" style={{ fontSize: 11.5 }}>
          <span>{lat}</span>
          <span>·</span>
          <span>{lng}</span>
        </div>
      </div>
      {/* Tape with more realistic look */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-gradient-to-b from-amber-50 to-amber-100/80 rotate-[-2deg] shadow-md"
           style={{
             boxShadow: '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
           }}
      />
    </motion.div>
  );
}
