import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface LocationsLayerProps {
  locations?: string;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const LocationsLayer: React.FC<LocationsLayerProps> = ({
  locations = "New Delhi • Paris • Geneva • Tokyo",
  verticalOffset = 44,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Entrance
  const inOpacity = interpolate(frame, [0, 11], [0, 0.8], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const inY = interpolate(frame, [0, 11], [8, 0], {
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
        opacity: inOpacity * exitOpacity,
      }}
    >
      <div
        style={{
          transform: `translateY(${verticalOffset + inY + exitY}px)`,
        }}
      >
        <span className="text-[10px] sm:text-xs tracking-[0.42em] text-[#a1a1aa] uppercase font-sans block select-none">
          {locations}
        </span>
      </div>
    </AbsoluteFill>
  );
};
