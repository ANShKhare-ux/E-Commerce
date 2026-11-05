import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface WordmarkLayerProps {
  brandName?: string;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const WordmarkLayer: React.FC<WordmarkLayerProps> = ({
  brandName = "LUMIÈRE",
  verticalOffset = -40,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const chars = brandName.split("");
  const letterDuration = Math.round(fps * 0.45); // ~13 frames

  // Fade out before curtain swipe
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
        opacity: fadeOut,
      }}
    >
      <div
        className="flex items-center justify-center font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-[0.45em] uppercase select-none pl-3"
        style={{
          transform: `translateY(${verticalOffset + fadeOutY}px)`,
          letterSpacing: "0.45em",
        }}
      >
        {chars.map((char, index) => {
          const charStart = index * Math.round(fps * 0.04);
          const charProgress = interpolate(
            frame,
            [charStart, charStart + letterDuration],
            [0, 1],
            {
              easing: luxuryEasing,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          const charOpacity = charProgress;
          const charY = interpolate(charProgress, [0, 1], [14, 0]);
          const charBlur = interpolate(charProgress, [0, 1], [6, 0]);

          return (
            <span
              key={index}
              className="inline-block"
              style={{
                opacity: charOpacity,
                transform: `translateY(${charY}px)`,
                filter: `blur(${charBlur}px)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
