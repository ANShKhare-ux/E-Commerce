import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export interface MonogramStrokeLayerProps {
  accentColor?: string;
  size?: number;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const MonogramStrokeLayer: React.FC<MonogramStrokeLayerProps> = ({
  accentColor = "#C59B48",
  size = 96,
  verticalOffset = -140,
}) => {
  const frame = useCurrentFrame();

  // 1. Vector Path Draw Progress (0 -> 20 frames)
  const pathProgress = interpolate(frame, [0, 20], [0, 1], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strokeDashoffset = 560 * (1 - pathProgress);

  // 2. Gold Fill Fade (starts at local frame 13 -> 23)
  const fillProgress = interpolate(frame, [13, 23], [0, 0.95], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transform: `translateY(${verticalOffset}px)`,
          filter: "drop-shadow(0 0 24px rgba(197, 155, 72, 0.5))",
        }}
      >
        <svg
          viewBox="0 0 256 256"
          width={size}
          height={size}
          role="img"
          aria-label="Sovereign Monogram L"
        >
          <path
            d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"
            stroke={accentColor}
            strokeWidth="1.8"
            strokeDasharray="560"
            strokeDashoffset={strokeDashoffset}
            fill={`rgba(197, 155, 72, ${fillProgress})`}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
