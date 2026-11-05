import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export interface StorefrontCanvasLayerProps {
  brandName?: string;
  accentColor?: string;
  partingFrame?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const StorefrontCanvasLayer: React.FC<StorefrontCanvasLayerProps> = ({
  brandName = "LUMIÈRE",
  accentColor = "#C59B48",
  partingFrame = 48,
}) => {
  const frame = useCurrentFrame();

  // Subtle zoom/reveal transition when the curtains part
  const scale = interpolate(frame, [partingFrame, partingFrame + 25], [0.94, 1], {
    easing: luxuryEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [partingFrame - 2, partingFrame + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0c",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Radial Gold Luster & Dark Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse at 50% 40%, rgba(197, 155, 72, 0.15) 0%, transparent 65%),
                            radial-gradient(ellipse at 50% 100%, rgba(0, 0, 0, 0.95) 0%, transparent 80%)`,
          pointerEvents: "none",
        }}
      />

      {/* Watermark Crest & Unveiled Storefront Branding */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg
          viewBox="0 0 256 256"
          width="130"
          height="130"
          style={{
            marginBottom: "1.5rem",
            opacity: 0.45,
            filter: "drop-shadow(0 0 35px rgba(197, 155, 72, 0.35))",
          }}
        >
          <path
            d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"
            fill={accentColor}
          />
          <polygon
            points="144,80 174,110 144,140 114,110"
            fill={accentColor}
          />
        </svg>

        <h1
          className="font-serif text-5xl md:text-6xl text-white font-light uppercase"
          style={{ letterSpacing: "0.45em", marginBottom: "0.75rem" }}
        >
          {brandName}
        </h1>

        <p
          className="font-mono text-xs md:text-sm uppercase text-[#C59B48]"
          style={{ letterSpacing: "0.5em", marginBottom: "0.5rem" }}
        >
          LUMIÈRE ATELIER STOREFRONT UNVEILED
        </p>

        <span
          className="text-xs uppercase text-[#a1a1aa] font-sans"
          style={{ letterSpacing: "0.3em" }}
        >
          Hand-Loomed Chanderi • Bespoke Tailoring • Luxury Curations
        </span>
      </div>
    </AbsoluteFill>
  );
};
