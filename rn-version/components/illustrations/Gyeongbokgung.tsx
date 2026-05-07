import React from 'react';
import Svg, {
  Rect,
  Circle,
  Path,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
  G,
} from 'react-native-svg';

export function Gyeongbokgung() {
  return (
    <Svg viewBox="0 0 200 220" width="100%" height="100%">
      <Defs>
        <LinearGradient id="sky-ko" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#D9F0E3" />
          <Stop offset="50%" stopColor="#C9E4D8" />
          <Stop offset="100%" stopColor="#F0E8D8" />
        </LinearGradient>
        <LinearGradient id="roof-ko" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#A84A4A" />
          <Stop offset="100%" stopColor="#8B3A3A" />
        </LinearGradient>
        <LinearGradient id="wall-ko" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#E8C896" />
          <Stop offset="100%" stopColor="#C4A574" />
        </LinearGradient>
      </Defs>

      <Rect width="200" height="220" fill="url(#sky-ko)" />

      {/* Mountain backdrop */}
      <Path d="M0 120 Q50 100 100 110 T200 120 L200 200 L0 200 Z" fill="#A8C8B0" opacity="0.3" />

      {/* Palace roof with curved edges */}
      <Path d="M30 130 L100 90 L170 130 L165 135 L35 135 Z" fill="url(#roof-ko)" />
      <Path d="M30 130 Q50 125 100 90 Q150 125 170 130" stroke="#6D2A2A" strokeWidth="1.5" fill="none" />

      {/* Roof decorative edge */}
      <Rect x="30" y="133" width="140" height="3" fill="#6D2A2A" />

      {/* Main wall */}
      <Rect x="50" y="135" width="100" height="65" fill="url(#wall-ko)" />

      {/* Pillars with detail */}
      {[65, 85, 105, 125].map((x) => (
        <G key={x}>
          <Rect x={x - 4} y="135" width="8" height="65" fill="#8B5A3C" />
          <Rect x={x - 3.5} y="135" width="1.5" height="65" fill="#A67C52" opacity="0.6" />
          <Rect x={x + 2} y="135" width="1.5" height="65" fill="#000000" opacity="0.2" />
        </G>
      ))}

      {/* Door */}
      <Rect x="90" y="160" width="20" height="40" fill="#6D2A2A" rx="1" />
      <Rect x="93" y="163" width="6" height="34" fill="#8B3A3A" />
      <Rect x="101" y="163" width="6" height="34" fill="#8B3A3A" />

      {/* Decorative patterns on wall */}
      {[55, 135].map((x) => (
        <G key={`deco${x}`}>
          <Rect x={x} y="145" width="10" height="15" fill="#B88856" opacity="0.4" rx="1" />
        </G>
      ))}

      <Rect x="0" y="200" width="200" height="20" fill="#7B8D6A" />

      {/* Pine tree - more detailed */}
      <G transform="translate(20, 150)">
        <Rect x="6" y="30" width="4" height="22" fill="#5D4037" />
        <Ellipse cx="8" cy="24" rx="11" ry="12" fill="#4A7A5A" />
        <Ellipse cx="8" cy="28" rx="13" ry="10" fill="#3D6B4A" />
        <Ellipse cx="4" cy="32" rx="8" ry="8" fill="#3D6B4A" />
        <Ellipse cx="12" cy="32" rx="8" ry="8" fill="#3D6B4A" />
        <Circle cx="8" cy="24" r="6" fill="#5A8B6A" opacity="0.4" />
      </G>

      <Rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.1" />
    </Svg>
  );
}
