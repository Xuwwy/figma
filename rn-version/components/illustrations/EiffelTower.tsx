import React from 'react';
import Svg, {
  Rect,
  Circle,
  Path,
  Line,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  G,
} from 'react-native-svg';

export function EiffelTower() {
  return (
    <Svg viewBox="0 0 200 220" width="100%" height="100%">
      <Defs>
        <LinearGradient id="sky-fr" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFD4E5" />
          <Stop offset="50%" stopColor="#E8C4DC" />
          <Stop offset="100%" stopColor="#B8D5E8" />
        </LinearGradient>
        <LinearGradient id="tower-fr" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#4A3328" />
          <Stop offset="100%" stopColor="#2C1810" />
        </LinearGradient>
        <RadialGradient id="moon-fr">
          <Stop offset="0%" stopColor="#FFFAF0" />
          <Stop offset="100%" stopColor="#FFF4D6" stopOpacity="0.85" />
        </RadialGradient>
      </Defs>

      <Rect width="200" height="220" fill="url(#sky-fr)" />

      {/* Moon glow */}
      <Circle cx="40" cy="50" r="24" fill="#FFF4D6" opacity="0.3" />
      <Circle cx="40" cy="50" r="18" fill="url(#moon-fr)" />

      {/* Tower structure */}
      <Path
        d="M100 30 L92 90 L75 160 L60 210 L140 210 L125 160 L108 90 Z"
        fill="url(#tower-fr)"
        opacity="0.9"
      />
      <Path d="M100 30 L96 70 L88 70 L100 30 Z" fill="#5D4037" />

      {/* Cross beams */}
      <Line x1="80" y1="120" x2="120" y2="120" stroke="#3E2723" strokeWidth="2.5" />
      <Line x1="70" y1="170" x2="130" y2="170" stroke="#3E2723" strokeWidth="2.5" />

      {/* Lattice detail */}
      {[80, 100, 130, 150].map((y) => (
        <G key={y}>
          <Line x1="85" y1={y} x2="95" y2={y + 15} stroke="#5D4037" strokeWidth="0.8" opacity="0.6" />
          <Line x1="105" y1={y} x2="115" y2={y + 15} stroke="#5D4037" strokeWidth="0.8" opacity="0.6" />
        </G>
      ))}

      {/* Lights on tower */}
      {[100, 140, 180].map((y) => (
        <Circle key={`light${y}`} cx="100" cy={y} r="1.5" fill="#FFE66D" opacity="0.8" />
      ))}

      <Rect x="0" y="200" width="200" height="20" fill="#6B8E5A" />
      <Rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.15" />
    </Svg>
  );
}
