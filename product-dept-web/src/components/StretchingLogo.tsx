"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Token {
  type: 'cmd' | 'num';
  value: string | number;
}

interface StretchingLogoProps {
  progress: MotionValue<number>;
  y?: MotionValue<string> | string;
}

// Tokenizes an SVG path/points string into commands and numbers
function tokenize(pathStr: string): Token[] {
  const regex = /([A-Za-z])|(-?\d*\.?\d+)/g;
  const tokens: Token[] = [];
  let match;
  while ((match = regex.exec(pathStr)) !== null) {
    if (match[1]) {
      tokens.push({ type: 'cmd', value: match[1] });
    } else if (match[2]) {
      tokens.push({ type: 'num', value: parseFloat(match[2]) });
    }
  }
  return tokens;
}

// Interpolates between two parsed token arrays
function interpolateTokens(tokensL: Token[], tokensS: Token[], progress: number): string {
  const parts: string[] = [];
  for (let i = 0; i < tokensL.length; i++) {
    const tL = tokensL[i];
    const tS = tokensS[i];
    if (tL.type === 'cmd') {
      parts.push(tL.value as string);
    } else {
      const val = (tL.value as number) + ((tS.value as number) - (tL.value as number)) * progress;
      parts.push(val.toFixed(3));
    }
  }
  return parts.join(' ');
}

// Raw string data from the two SVG logo files
const longData = [
  "M1.34.12H0v42.4h1.18v-3.08h.36c.74,0,1.14-.49,1.14-1.39V1.36C2.68.46,2.3.12,1.34.12ZM1.49,37.93c0,.22-.05.25-.31.25V1.32c.26,0,.31.04.31.26v36.35Z", // 0 (path)
  "M5.3,39.08c.19-.23.29-.58.29-1.03V1.35c0-.9-.37-1.23-1.33-1.23h-1.34v42.39h1.17v-3.07h.13l.31,3.07h1.24l-.47-3.43ZM4.41,37.93c0,.21-.05.25-.32.25V1.32c.27,0,.32.03.32.26v36.35Z", // 1 (path)
  "M7.21,0c-.82,0-1.37.52-1.37,1.32v39.99c0,.79.54,1.32,1.34,1.32s1.4-.53,1.4-1.32V1.32c0-.8-.57-1.32-1.37-1.32ZM7.36,41.11c0,.26-.07.32-.15.32-.09,0-.17-.06-.17-.32V1.52c0-.26.08-.32.17-.32.08,0,.15.06.15.32v39.59Z", // 2 (path)
  "M10.35.12h-1.52v42.39h1.55c.88,0,1.21-.35,1.21-1.29V1.41c0-.95-.34-1.29-1.24-1.29ZM10.36,41c0,.25-.06.31-.36.31V1.31c.3,0,.36.06.36.32v39.37Z", // 3 (path)
  "M14.54.12v41.19c0,.79-.56,1.32-1.36,1.32s-1.34-.53-1.34-1.32V.12h1.17v40.98c0,.27.07.33.15.33s.15-.06.15-.33V.12h1.23Z", // 4 (path)
  "M16.31,37.9V1.52c0-.26-.07-.32-.14-.32-.09,0-.16.06-.16.32v39.59c0,.26.07.32.16.32.07,0,.14-.06.14-.32v-2.93h1.18v3.13c0,.79-.53,1.32-1.35,1.32s-1.35-.53-1.35-1.32V1.32c0-.8.56-1.32,1.38-1.32s1.32.52,1.32,1.32v36.58h-1.18Z", // 5 (path)
  "20.54 .12 20.54 1.32 19.74 1.32 19.74 42.52 18.54 42.52 18.54 1.32 17.74 1.32 17.74 .12 20.54 .12", // 6 (polygon)
  "M24.38.12h-1.53v42.39h1.55c.89,0,1.21-.35,1.21-1.29V1.41c0-.95-.33-1.29-1.23-1.29ZM24.39,41c0,.25-.06.31-.36.31V1.32c.3,0,.36.06.36.31v39.37Z", // 7 (path)
  "27.06 1.32 27.06 37.54 27.86 37.54 27.86 38.81 27.06 38.81 27.06 41.32 27.86 41.32 27.86 42.51 25.86 42.51 25.86 .12 27.86 .12 27.86 1.32 27.06 1.32", // 8 (polygon)
  "M29.46.12h-1.35v42.39h1.18v-3.07h.36c.74,0,1.14-.49,1.14-1.39V1.35c0-.9-.37-1.23-1.33-1.23ZM29.6,37.93c0,.21-.05.25-.31.25V1.32c.26,0,.31.03.31.26v36.35Z", // 9 (path)
  "33.85 .12 33.85 1.32 33.04 1.32 33.04 42.51 31.84 42.51 31.84 1.32 31.04 1.32 31.04 .12 33.85 .12", // 10 (polygon)
];

const shortData = [
  "M1.34.12H0v8.4h1.18v-3.08h.36c.74,0,1.14-.49,1.14-1.39V1.36C2.68.46,2.3.12,1.34.12ZM1.49,3.93c0,.22-.05.25-.31.25V1.32c.26,0,.31.04.31.26v2.35Z",
  "M5.3,5.08c.19-.23.29-.58.29-1.03V1.35c0-.9-.37-1.23-1.33-1.23h-1.34v8.39h1.17v-3.07h.13l.31,3.07h1.24l-.47-3.43ZM4.41,3.93c0,.21-.05.25-.32.25V1.32c.27,0,.32.03.32.26v2.35Z",
  "M7.21,0c-.82,0-1.37.52-1.37,1.32v5.99c0,.79.54,1.32,1.34,1.32s1.4-.53,1.4-1.32V1.32c0-.8-.57-1.32-1.37-1.32ZM7.36,7.11c0,.26-.07.32-.15.32-.09,0-.17-.06-.17-.32V1.52c0-.26.08-.32.17-.32.08,0,.15.06.15.32v5.59Z",
  "M10.35.12h-1.52v8.39h1.55c.88,0,1.21-.35,1.21-1.29V1.41c0-.95-.34-1.29-1.24-1.29ZM10.36,7c0,.25-.06.31-.36.31V1.31c.3,0,.36.06.36.32v5.37Z",
  "M14.54.12v7.19c0,.79-.56,1.32-1.36,1.32s-1.34-.53-1.34-1.32V.12h1.17v6.98c0,.27.07.33.15.33s.15-.06.15-.33V.12h1.23Z",
  "M16.31,3.9V1.52c0-.26-.07-.32-.14-.32-.09,0-.16.06-.16.32v5.59c0,.26.07.32.16.32.07,0,.14-.06.14-.32v-2.93h1.18v3.13c0,.79-.53,1.32-1.35,1.32s-1.35-.53-1.35-1.32V1.32c0-.8.56-1.32,1.38-1.32s1.32.52,1.32,1.32v2.58h-1.18Z",
  "20.54 .12 20.54 1.32 19.74 1.32 19.74 8.52 18.54 8.52 18.54 1.32 17.74 1.32 17.74 .12 20.54 .12",
  "M24.38.12h-1.53v8.39h1.55c.89,0,1.21-.35,1.21-1.29V1.41c0-.95-.33-1.29-1.23-1.29ZM24.39,7c0,.25-.06.31-.36.31V1.32c.3,0,.36.06.36.31v5.37Z",
  "27.06 1.32 27.06 3.55 27.86 3.55 27.86 4.81 27.06 4.81 27.06 7.32 27.86 7.32 27.86 8.51 25.86 8.51 25.86 .12 27.86 .12 27.86 1.32 27.06 1.32",
  "M29.46.12h-1.35v8.39h1.18v-3.07h.36c.74,0,1.14-.49,1.14-1.39V1.35c0-.9-.37-1.23-1.33-1.23ZM29.6,3.93c0,.21-.05.25-.31.25V1.32c.26,0,.31.03.31.26v2.35Z",
  "33.85 .12 33.85 1.32 33.04 1.32 33.04 8.51 31.84 8.51 31.84 1.32 31.04 1.32 31.04 .12 33.85 .12",
];

// Tokenize the path strings statically at load time
const longTokens = longData.map(tokenize);
const shortTokens = shortData.map(tokenize);

export function StretchingLogo({ progress, y }: StretchingLogoProps) {
  // Animate viewBox height: long height = 42.63, short height = 8.63
  const viewBox = useTransform(progress, (p) => {
    const h = 42.63 + (8.63 - 42.63) * p;
    return `0 0 35.17 ${h.toFixed(3)}`;
  });

  // Dynamic values for paths, polygons, and the dot rect
  const d0 = useTransform(progress, (p) => interpolateTokens(longTokens[0], shortTokens[0], p));
  const d1 = useTransform(progress, (p) => interpolateTokens(longTokens[1], shortTokens[1], p));
  const d2 = useTransform(progress, (p) => interpolateTokens(longTokens[2], shortTokens[2], p));
  const d3 = useTransform(progress, (p) => interpolateTokens(longTokens[3], shortTokens[3], p));
  const d4 = useTransform(progress, (p) => interpolateTokens(longTokens[4], shortTokens[4], p));
  const d5 = useTransform(progress, (p) => interpolateTokens(longTokens[5], shortTokens[5], p));
  const points6 = useTransform(progress, (p) => interpolateTokens(longTokens[6], shortTokens[6], p));
  const d7 = useTransform(progress, (p) => interpolateTokens(longTokens[7], shortTokens[7], p));
  const points8 = useTransform(progress, (p) => interpolateTokens(longTokens[8], shortTokens[8], p));
  const d9 = useTransform(progress, (p) => interpolateTokens(longTokens[9], shortTokens[9], p));
  const points10 = useTransform(progress, (p) => interpolateTokens(longTokens[10], shortTokens[10], p));
  
  // Rect values (x: 33.97, y: 41.32 -> 7.32, w: 1.2, h: 1.19)
  const rectY = useTransform(progress, [0, 1], [41.32, 7.32]);

  return (
    <motion.svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={{ y }}
      className="w-full h-auto text-white fill-current select-none"
    >
      <defs>
        <style>{`.cls-1 { fill: currentColor; }`}</style>
      </defs>
      <motion.path className="cls-1" d={d0} />
      <motion.path className="cls-1" d={d1} />
      <motion.path className="cls-1" d={d2} />
      <motion.path className="cls-1" d={d3} />
      <motion.path className="cls-1" d={d4} />
      <motion.path className="cls-1" d={d5} />
      <motion.polygon className="cls-1" points={points6} />
      <motion.path className="cls-1" d={d7} />
      <motion.polygon className="cls-1" points={points8} />
      <motion.path className="cls-1" d={d9} />
      <motion.polygon className="cls-1" points={points10} />
      <motion.rect className="cls-1" x="33.97" y={rectY} width="1.2" height="1.19" />
    </motion.svg>
  );
}
