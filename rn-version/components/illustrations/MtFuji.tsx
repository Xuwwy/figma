import React from 'react';
import Svg, {
  Rect,
  Circle,
  Path,
  Ellipse,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  G,
} from 'react-native-svg';

export function MtFuji() {
  const petals = [
    { x: 20, y: 185 },
    { x: 60, y: 190 },
    { x: 140, y: 188 },
    { x: 175, y: 192 },
  ];

  return (
    <Svg viewBox="0 0 200 220" width="100%" height="100%">
      <Defs>
        <LinearGradient id="sky-ja" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFE4EC" />
          <Stop offset="50%" stopColor="#FFD9E0" />
          <Stop offset="100%" stopColor="#FFF5F7" />
        </LinearGradient>
        <LinearGradient id="fuji-ja" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#8A9CC1" />
          <Stop offset="60%" stopColor="#7A8FB8" />
          <Stop offset="100%" stopColor="#6A7FA0" />
        </LinearGradient>
        <RadialGradient id="sun-ja">
          <Stop offset="0%" stopColor="#FF8B9A" />
          <Stop offset="100%" stopColor="#FF6B7A" stopOpacity="0.85" />
        </RadialGradient>
      </Defs>

      <Rect width="200" height="220" fill="url(#sky-ja)" />

      {/* Rising sun */}
      <Circle cx="150" cy="55" r="26" fill="#FF6B7A" opacity="0.3" />
      <Circle cx="150" cy="55" r="20" fill="url(#sun-ja)" />

      {/* Mt Fuji */}
      <Path d="M30 200 L100 70 L170 200 Z" fill="url(#fuji-ja)" />

      {/* Snow cap with detail */}
      <Path
        d="M75 110 L100 70 L125 110 L120 115 L110 100 L100 110 L90 100 L80 115 Z"
        fill="#FFFFFF"
      />
      <Path d="M85 108 L100 85 L115 108" fill="#F0F8FF" opacity="0.6" />

      {/* Clouds - more refined */}
      <G opacity="0.75">
        <Ellipse cx="35" cy="160" rx="25" ry="8" fill="#FFFFFF" />
        <Ellipse cx="50" cy="157" rx="20" ry="7" fill="#FFFFFF" />
        <Ellipse cx="145" cy="175" rx="30" ry="9" fill="#FFFFFF" />
        <Ellipse cx="165" cy="172" rx="22" ry="7" fill="#FFFFFF" />
      </G>

      {/* Foreground with sakura tone */}
      <Rect x="0" y="200" width="200" height="20" fill="#E8B5C0" />

      {/* Cherry blossom petals */}
      {petals.map((p, i) => (
        <G key={i} transform={`translate(${p.x}, ${p.y})`}>
          <Circle cx="0" cy="0" r="2" fill="#FFB5C5" opacity="0.8" />
          <Circle cx="0" cy="0" r="1" fill="#FFC5D5" />
        </G>
      ))}

      <Rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.08" />
    </Svg>
  );
}
