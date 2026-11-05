import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DiamondStarLayerProps {
  accentColor?: string;
  size?: number;
  verticalOffset?: number;
}

export const DiamondStarLayer: React.FC<DiamondStarLayerProps> = ({
  accentColor = "#C59B48",
  size = 96,
  verticalOffset = -140,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring scale entrance starting at local frame 0
  const starSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.8,
    },
  });
  const scale = Math.max(0, starSpring);

  const opacity = interpolate(frame, [0, 5], [0, 1], {
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
        opacity,
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
          aria-label="Celestial Diamond Gemstone"
        >
          <polygon
            points="144,80 174,110 144,140 114,110"
            fill={accentColor}
            style={{
              transformOrigin: "144px 110px",
              transform: `scale(${scale})`,
            }}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
