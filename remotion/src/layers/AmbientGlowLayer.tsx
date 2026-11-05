import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface AmbientGlowLayerProps {
  glowColor?: string;
  size?: number;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const AmbientGlowLayer: React.FC<AmbientGlowLayerProps> = ({
  glowColor = "rgba(197, 155, 72, 0.16)",
  size = 520,
  verticalOffset = -60,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Gentle entrance
  const inOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth fade out before the curtain swipe
  const fadeOutDuration = 9;
  const fadeOutStart = Math.max(0, durationInFrames - fadeOutDuration);
  const fadeOut = interpolate(frame, [fadeOutStart, durationInFrames], [1, 0], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = inOpacity * fadeOut;

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
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "9999px",
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          transform: `translateY(${verticalOffset}px)`,
          opacity,
          willChange: "opacity",
        }}
      />
    </AbsoluteFill>
  );
};
