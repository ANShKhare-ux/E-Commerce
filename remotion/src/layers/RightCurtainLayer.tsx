import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export interface RightCurtainLayerProps {
  backgroundColor?: string;
  accentColor?: string;
  partingFrame?: number;
  partingDuration?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const RightCurtainLayer: React.FC<RightCurtainLayerProps> = ({
  backgroundColor = "#08080a",
  accentColor = "#C59B48",
  partingFrame = 23,
  partingDuration = 12,
}) => {
  const frame = useCurrentFrame();

  // Swipes to the right (102%)
  const translateX = interpolate(
    frame,
    [partingFrame, partingFrame + partingDuration],
    [0, 102],
    {
      easing: luxuryEasing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "50%",
          backgroundColor,
          borderLeft: `1px solid ${accentColor}33`,
          boxShadow: "-20px 0 50px rgba(0,0,0,0.9)",
          transform: `translateX(${translateX}%)`,
          willChange: "transform",
        }}
      >
        {/* Subtle Silk Sheen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at left, rgba(197, 155, 72, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
