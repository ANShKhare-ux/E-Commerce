import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface LetterLayerProps {
  brandName?: string;
  charIndex: number;
  verticalOffset?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const LetterLayer: React.FC<LetterLayerProps> = ({
  brandName = "LUMIÈRE",
  charIndex,
  verticalOffset = -40,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const chars = brandName.split("");
  const targetChar = chars[charIndex] || "";
  const letterDuration = Math.round(fps * 0.45); // ~13 frames

  // Entrance
  const inProgress = interpolate(frame, [0, letterDuration], [0, 1], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = inProgress;
  const inY = interpolate(inProgress, [0, 1], [14, 0]);
  const blur = interpolate(inProgress, [0, 1], [6, 0]);

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
        className="flex items-center justify-center font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-[0.45em] uppercase select-none pl-3"
        style={{
          transform: `translateY(${verticalOffset + exitY}px)`,
          letterSpacing: "0.45em",
        }}
      >
        {chars.map((char, index) => {
          if (index !== charIndex) {
            // Invisible placeholder to maintain exact optical kerning
            return (
              <span
                key={index}
                className="inline-block"
                style={{ opacity: 0, pointerEvents: "none" }}
              >
                {char}
              </span>
            );
          }

          return (
            <span
              key={index}
              className="inline-block"
              style={{
                opacity,
                transform: `translateY(${inY}px)`,
                filter: `blur(${blur}px)`,
              }}
            >
              {targetChar}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
