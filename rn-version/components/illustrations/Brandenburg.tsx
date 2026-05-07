import React from 'react';
import Svg, {
  Rect,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
} from 'react-native-svg';

export function Brandenburg() {
  return (
    <Svg viewBox="0 0 200 220" width="100%" height="100%">
      <Defs>
        <LinearGradient id="sky-de" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#F4E8D8" />
          <Stop offset="50%" stopColor="#E8D5C4" />
          <Stop offset="100%" stopColor="#C8B8A0" />
        </LinearGradient>
        <LinearGradient id="stone-de" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#E0CDB0" />
          <Stop offset="100%" stopColor="#C4AC8E" />
        </LinearGradient>
      </Defs>

      <Rect width="200" height="220" fill="url(#sky-de)" />

      {/* Main gate structure */}
      <Rect x="40" y="100" width="120" height="100" fill="url(#stone-de)" />

      {/* Columns with depth */}
      {[55, 80, 105, 130, 155].map((x) => (
        <G key={x}>
          <Rect x={x - 6} y="100" width="12" height="100" fill="#9B8366" />
          <Rect x={x - 5} y="100" width="2" height="100" fill="#B89A7D" opacity="0.5" />
          <Rect x={x + 3} y="100" width="2" height="100" fill="#000000" opacity="0.15" />
        </G>
      ))}

      {/* Top architrave */}
      <Rect x="35" y="90" width="130" height="14" fill="#B89A7D" />
      <Rect x="35" y="90" width="130" height="2" fill="#D4BFA0" />
      <Rect x="35" y="102" width="130" height="2" fill="#000000" opacity="0.2" />

      {/* Quadriga (chariot) on top */}
      <G transform="translate(85, 60)">
        <Rect x="0" y="20" width="30" height="10" fill="#9B7F5A" />
        <Rect x="0" y="20" width="30" height="2" fill="#C9A87A" />
        <Circle cx="15" cy="15" r="9" fill="#D4B896" />
        <Circle cx="15" cy="15" r="7" fill="#C9A87A" />
        <Path d="M5 22 L8 18 L10 22 M20 22 L23 18 L25 22" stroke="#8B7355" strokeWidth="1.5" fill="none" />
      </G>

      {/* Archways detail */}
      {[65, 100, 135].map((x) => (
        <Rect key={`arch${x}`} x={x - 8} y="130" width="16" height="40" rx="8" fill="#5D4F3C" opacity="0.3" />
      ))}

      <Rect x="0" y="200" width="200" height="20" fill="#6B5D44" />
      <Rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.12" />
    </Svg>
  );
}
