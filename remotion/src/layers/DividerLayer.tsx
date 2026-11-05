import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface DividerLayerProps {
  accentColor?: string;
  width?: number;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const DividerLayer: React.FC<DividerLayerProps> = ({
  accentColor = "#C59B48",
  width = 160,
  verticalOffset = 66,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scale entrance
  const scaleX = interpolate(frame, [0, 9], [0, 1], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out before curtain swipe
  const fadeOutDuration = 9;
  const fadeOutStart = Math.max(0, durationInFrames - fadeOutDuration);
  const fadeOut = interpolate(frame, [fadeOutStart, durationInFrames], [1, 0], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOutY = interpolate(frame, [fadeOutStart, durationInFrames], [0, -10], {
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
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: "1px",
          backgroundImage: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
          transformOrigin: "center center",
          transform: `translateY(${verticalOffset + fadeOutY}px) scaleX(${scaleX})`,
        }}
      />
    </AbsoluteFill>
  );
};
