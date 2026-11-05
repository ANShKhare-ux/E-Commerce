import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export interface SubtitleLayerProps {
  subtitle?: string;
  accentColor?: string;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const SubtitleLayer: React.FC<SubtitleLayerProps> = ({
  subtitle = "Haute Horlogerie & Fashion Atelier",
  accentColor = "#C59B48",
  verticalOffset = 22,
}) => {
  const frame = useCurrentFrame();

  // Entrance
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const inY = interpolate(frame, [0, 10], [8, 0], {
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
        opacity,
      }}
    >
      <div
        style={{
          transform: `translateY(${verticalOffset + inY}px)`,
        }}
      >
        <span
          className="text-xs sm:text-sm tracking-[0.55em] uppercase font-mono block select-none"
          style={{ color: accentColor }}
        >
          {subtitle}
        </span>
      </div>
    </AbsoluteFill>
  );
};
