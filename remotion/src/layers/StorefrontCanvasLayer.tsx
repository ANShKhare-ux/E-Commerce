import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export interface StorefrontCanvasLayerProps {
  brandName?: string;
  accentColor?: string;
  swipeStartFrame?: number;
  swipeDuration?: number;
}

const luxuryEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const StorefrontCanvasLayer: React.FC<StorefrontCanvasLayerProps> = ({
  brandName = "LUMIÈRE",
  accentColor = "#C59B48",
  swipeStartFrame = 24,
  swipeDuration = 11,
}) => {
  const frame = useCurrentFrame();

  // Subtle natural zoom as curtains part to reveal the website
  const scale = interpolate(
    frame,
    [swipeStartFrame, swipeStartFrame + swipeDuration],
    [0.97, 1.0],
    {
      easing: luxuryEasing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0d0f",
        overflow: "hidden",
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
      }}
      className="font-sans text-white select-none"
    >
      {/* 1. Header Navigation Bar */}
      <header
        style={{
          height: "72px",
          backgroundColor: "#ffffff",
          color: "#0d0d0d",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 3.5rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          flexShrink: 0,
          zIndex: 20,
        }}
      >
        {/* Brand Horizontal Lockup Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg viewBox="0 0 256 256" width="28" height="28">
            <path
              d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"
              fill={accentColor}
            />
            <polygon
              points="144,80 174,110 144,140 114,110"
              fill={accentColor}
            />
          </svg>
          <span
            className="font-serif text-2xl font-semibold tracking-[0.3em] uppercase"
            style={{ color: "#0d0d0d" }}
          >
            {brandName}
          </span>
        </div>

        {/* Navigation Categories */}
        <nav style={{ display: "flex", gap: "2.5rem", fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em" }}>
          <span style={{ color: "#ee5f73", borderBottom: "2px solid #ee5f73", paddingBottom: "4px" }}>MEN</span>
          <span style={{ color: "#282c3f" }}>WOMEN</span>
          <span style={{ color: "#282c3f" }}>UNISEX</span>
          <span style={{ color: accentColor, display: "flex", alignItems: "center", gap: "4px" }}>
            COLLECTIONS
            <span style={{ fontSize: "9px", backgroundColor: accentColor, color: "white", padding: "1px 5px", borderRadius: "4px" }}>
              NEW
            </span>
          </span>
        </nav>

        {/* Center-Right Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f5f5f6",
            padding: "8px 16px",
            borderRadius: "6px",
            width: "360px",
            gap: "10px",
            fontSize: "12px",
            color: "#696e79",
            border: "1px solid #eaeaec",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Search for products, brands and more</span>
        </div>

        {/* Action Icons */}
        <div style={{ display: "flex", gap: "1.75rem", fontSize: "11px", fontWeight: 600, color: "#282c3f" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Wishlist</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", position: "relative" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Bag</span>
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-6px",
                backgroundColor: accentColor,
                color: "white",
                fontSize: "9px",
                borderRadius: "9999px",
                width: "14px",
                height: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </span>
          </div>
        </div>
      </header>

      {/* 2. Hero Editorial Banner */}
      <div
        style={{
          flex: 1,
          position: "relative",
          backgroundImage: `linear-gradient(135deg, rgba(8,8,10,0.92) 0%, rgba(18,18,22,0.82) 50%, rgba(8,8,10,0.95) 100%),
                            radial-gradient(circle at 75% 30%, rgba(197, 155, 72, 0.22) 0%, transparent 60%)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 4.5rem",
        }}
      >
        <div style={{ maxWidth: "780px" }}>
          {/* Eyebrow badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              backgroundColor: "rgba(197, 155, 72, 0.12)",
              border: `1px solid ${accentColor}40`,
              borderRadius: "9999px",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: accentColor }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.3em", color: accentColor, fontFamily: "monospace", textTransform: "uppercase" }}>
              Haute Horlogerie & Fashion Atelier • Autumn 2026
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-light uppercase leading-tight mb-4"
            style={{ letterSpacing: "0.22em" }}
          >
            ROYAL CHANDERI & BANARASI WEAVES
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "14px",
              letterSpacing: "0.15em",
              color: "#d4d4d8",
              marginBottom: "2rem",
              lineHeight: 1.6,
              maxWidth: "600px",
            }}
          >
            Indigenous Indian handlooms merged with contemporary tailoring. Complimentary Delhivery express dispatch across 19,000+ PIN codes.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="button"
              style={{
                backgroundColor: accentColor,
                color: "#08080a",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "12px 28px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Shop Collection
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "12px 28px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
              }}
            >
              The Atelier Story
            </button>
          </div>
        </div>

        {/* 3. Luxury Product Cards Strip Preview */}
        <div
          style={{
            position: "absolute",
            right: "4.5rem",
            bottom: "2.5rem",
            display: "flex",
            gap: "1.25rem",
          }}
        >
          {[
            { title: "Banarasi Silk Kurta", price: "₹14,999", tag: "Silk Mark" },
            { title: "Chanderi Zari Sherwani", price: "₹28,500", tag: "Bespoke" },
            { title: "Mulmul Ivory Anarkali", price: "₹18,400", tag: "Handloom" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                width: "160px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  height: "90px",
                  backgroundColor: "rgba(197, 155, 72, 0.08)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: accentColor, textTransform: "uppercase" }}>
                  {item.tag}
                </span>
              </div>
              <span style={{ fontSize: "11px", color: "#f4f4f5", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.title}
              </span>
              <span style={{ fontSize: "11px", color: accentColor, fontFamily: "monospace", fontWeight: 600 }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
