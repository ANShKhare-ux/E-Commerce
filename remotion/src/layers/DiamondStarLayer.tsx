import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DiamondStarLayerProps {
  accentColor?: string;
  size?: number;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const DiamondStarLayer: React.FC<DiamondStarLayerProps> = ({
  accentColor = "#C59B48",
  size = 96,
  verticalOffset = -140,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

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

  const inOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth fade out before curtain swipe
  const fadeOutDuration = 9;
  const fadeOutStart = Math.max(0, durationInFrames - fadeOutDuration);
  const fadeOut = interpolate(frame, [fadeOutStart, durationInFrames], [1, 0], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOutY = interpolate(frame, [fadeOutStart, durationInFrames], [0, -12], {
    easing: luxuryEasing,
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
        opacity: inOpacity * fadeOut,
      }}
    >
      <div
        style={{
          transform: `translateY(${verticalOffset + fadeOutY}px)`,
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
