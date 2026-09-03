"use client";

interface LogoInteractiveProps {
  brandColor: string;
}

export function LogoInteractive({ brandColor }: LogoInteractiveProps) {
  const fill = brandColor || "#f41c06";

  return (
    <svg
      viewBox="0 0 564.03 288.69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none pointer-events-none"
    >
      {/* Left Circle */}
      <circle cx="136.64" cy="152.05" r="136.64" fill={fill} />

      {/* Right Polygon */}
      <polygon
        points="553.22 284.38 311.9 284.38 286.31 0 562.31 67.5"
        fill={fill}
      />
    </svg>
  );
}
