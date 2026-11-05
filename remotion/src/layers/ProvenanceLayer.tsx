import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface ProvenanceLayerProps {
  provenance?: string;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const ProvenanceLayer: React.FC<ProvenanceLayerProps> = ({
  provenance = "Hand-Loomed Chanderi • Bespoke Tailoring • Luxury Curations",
  verticalOffset = 88,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Entrance
  const inOpacity = interpolate(frame, [0, 9], [0, 0.85], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const inY = interpolate(frame, [0, 9], [6, 0], {
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
        opacity: inOpacity * fadeOut,
      }}
    >
      <div
        style={{
          transform: `translateY(${verticalOffset + inY + fadeOutY}px)`,
        }}
      >
        <span className="text-[9.5px] sm:text-[11px] tracking-[0.38em] text-[#d4d4d8] uppercase font-sans block select-none">
          {provenance}
        </span>
      </div>
    </AbsoluteFill>
  );
};
