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
  partingFrame = 48,
  partingDuration = 20,
}) => {
  const frame = useCurrentFrame();

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
          borderLeft: `1px solid ${accentColor}26`,
          boxShadow: "-15px 0 45px rgba(0,0,0,0.85)",
          transform: `translateX(${translateX}%)`,
          willChange: "transform",
        }}
      >
        {/* Subtle Luxury Sheen */}
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
