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

  // Scale entrance (0 -> 14 frames)
  const scaleX = interpolate(frame, [0, 14], [0, 1], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit fade before unmount
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [1, 0],
    {
      easing: luxuryEasing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const exitY = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -10],
    {
      easing: luxuryEasing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: "1px",
          backgroundImage: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
          transformOrigin: "center center",
          transform: `translateY(${verticalOffset + exitY}px) scaleX(${scaleX})`,
        }}
      />
    </AbsoluteFill>
  );
};
