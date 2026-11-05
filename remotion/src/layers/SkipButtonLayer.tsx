import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface SkipButtonLayerProps {
  label?: string;
  accentColor?: string;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const SkipButtonLayer: React.FC<SkipButtonLayerProps> = ({
  label = "Skip Prologue [Esc]",
  accentColor = "#C59B48",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Entrance
  const inOpacity = interpolate(frame, [0, 15], [0, 0.8], {
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

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          opacity: inOpacity * fadeOut,
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#a1a1aa",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: `1px solid ${accentColor}40`,
            padding: "8px 16px",
            borderRadius: "9999px",
            userSelect: "none",
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
