import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export interface AmbientGlowLayerProps {
  glowColor?: string;
  size?: number;
  verticalOffset?: number;
}

export const AmbientGlowLayer: React.FC<AmbientGlowLayerProps> = ({
  glowColor = "rgba(197, 155, 72, 0.16)",
  size = 520,
  verticalOffset = -60,
}) => {
  const frame = useCurrentFrame();

  // Gentle entrance
  const opacity = interpolate(frame, [0, 15], [0, 1], {
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
