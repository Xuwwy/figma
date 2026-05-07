import React from 'react';
import Svg, {
  Rect,
  Circle,
  Polygon,
  Line,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  G,
} from 'react-native-svg';

export function SagradaFamilia() {
  const towers = [40, 70, 100, 130, 160];
  const heights = [110, 140, 160, 135, 105];

  return (
    <Svg viewBox="0 0 200 220" width="100%" height="100%">
      <Defs>
        <LinearGradient id="sky-es" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFE4C8" />
          <Stop offset="40%" stopColor="#FFD3A5" />
          <Stop offset="70%" stopColor="#FFB89D" />
          <Stop offset="100%" stopColor="#FF9B8F" />
        </LinearGradient>
        <LinearGradient id="tower-es" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FAF0E6" />
          <Stop offset="50%" stopColor="#E8D4BE" />
          <Stop offset="100%" stopColor="#C9A88A" />
        </LinearGradient>
        <RadialGradient id="sun-es" cx="50%" cy="50%">
          <Stop offset="0%" stopColor="#FFF4E0" />
          <Stop offset="100%" stopColor="#FFE9C4" stopOpacity="0.8" />
        </RadialGradient>
      </Defs>

      <Rect width="200" height="220" fill="url(#sky-es)" />

      {/* Sun with glow */}
      <Circle cx="155" cy="55" r="28" fill="url(#sun-es)" opacity="0.4" />
      <Circle cx="155" cy="55" r="20" fill="url(#sun-es)" opacity="0.9" />

      {/* Towers */}
      {towers.map((x, i) => {
        const h = heights[i];
        return (
          <G key={x}>
            <Polygon
              points={`${x - 10},220 ${x - 10},${220 - h} ${x},${220 - h - 25} ${x + 10},${220 - h} ${x + 10},220`}
              fill="url(#tower-es)"
              stroke="#B89A7D"
              strokeWidth="0.5"
            />
            <Circle cx={x} cy={220 - h - 30} r="4" fill="#F4D03F" opacity="0.9" />
            <Circle cx={x} cy={220 - h - 30} r="2" fill="#FFE66D" />

            {[0.25, 0.45, 0.65, 0.85].map((p, idx) => (
              <Line
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

            {[0.35, 0.55, 0.75].map((p) => (
              <Circle key={`w${p}`} cx={x} cy={220 - h * p} r="1.5" fill="#7A6550" opacity="0.6" />
            ))}
          </G>
        );
      })}

      <Rect x="0" y="200" width="200" height="20" fill="#8B6F47" />
      <Rect x="0" y="200" width="200" height="3" fill="#000000" opacity="0.1" />
    </Svg>
  );
}
