import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

import { StorefrontCanvasLayer } from "./layers/StorefrontCanvasLayer";
import { LeftCurtainLayer } from "./layers/LeftCurtainLayer";
import { RightCurtainLayer } from "./layers/RightCurtainLayer";
import { AmbientGlowLayer } from "./layers/AmbientGlowLayer";
import { MonogramStrokeLayer } from "./layers/MonogramStrokeLayer";
import { DiamondStarLayer } from "./layers/DiamondStarLayer";
import { WordmarkLayer } from "./layers/WordmarkLayer";
import { SubtitleLayer } from "./layers/SubtitleLayer";
import { LocationsLayer } from "./layers/LocationsLayer";
import { DividerLayer } from "./layers/DividerLayer";
import { ProvenanceLayer } from "./layers/ProvenanceLayer";
import { SkipButtonLayer } from "./layers/SkipButtonLayer";

// Schema for Studio Inspector Properties
export const introAnimationSchema = z.object({
  brandName: z.string(),
  subtitle: z.string(),
  locations: z.string(),
  provenance: z.string(),
  accentColor: zColor(),
  curtainBgColor: zColor(),
  swipeStartFrame: z.number().int().min(10).max(35),
});

export type IntroAnimationProps = z.infer<typeof introAnimationSchema>;

export const defaultIntroProps: IntroAnimationProps = {
  brandName: "LUMIÈRE",
  subtitle: "Haute Horlogerie & Fashion Atelier",
  locations: "New Delhi • Paris • Geneva • Tokyo",
  provenance: "Hand-Loomed Chanderi • Bespoke Tailoring • Luxury Curations",
  accentColor: "#C59B48",
  curtainBgColor: "#08080a",
  swipeStartFrame: 23,
};

export const INTRO_DURATION_IN_FRAMES = 35; // 1.166 seconds at 30fps

/**
 * IntroEntranceAnimation with:
 * 1. Fade out animation on all content layers
 * 2. LeftCurtainLayer swipe to the left
 * 3. RightCurtainLayer swipe to the right
 * 4. The LUMIÈRE website revealed underneath
 */
export const IntroEntranceAnimation: React.FC<IntroAnimationProps> = ({
  brandName = defaultIntroProps.brandName,
  subtitle = defaultIntroProps.subtitle,
  locations = defaultIntroProps.locations,
  provenance = defaultIntroProps.provenance,
  accentColor = defaultIntroProps.accentColor,
  curtainBgColor = defaultIntroProps.curtainBgColor,
  swipeStartFrame = defaultIntroProps.swipeStartFrame,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-black select-none font-sans overflow-hidden">
      {/* LAYER 00: The Revealed Storefront Website (Underlay revealed by curtain swipe) */}
      <Sequence
        name="00. Revealed Storefront Website"
        from={0}
        durationInFrames={35}
        premountFor={fps}
      >
        <StorefrontCanvasLayer
          brandName={brandName}
          accentColor={accentColor}
          swipeStartFrame={swipeStartFrame}
          swipeDuration={12}
        />
      </Sequence>

      {/* LAYER 01: Left Silk Curtain Panel (Swipes left to -102%) */}
      <Sequence
        name="01. Left Silk Curtain (Swipe Left)"
        from={0}
        durationInFrames={35}
        premountFor={fps}
      >
        <LeftCurtainLayer
          backgroundColor={curtainBgColor}
          accentColor={accentColor}
          partingFrame={swipeStartFrame}
          partingDuration={12}
        />
      </Sequence>

      {/* LAYER 02: Right Silk Curtain Panel (Swipes right to 102%) */}
      <Sequence
        name="02. Right Silk Curtain (Swipe Right)"
        from={0}
        durationInFrames={35}
        premountFor={fps}
      >
        <RightCurtainLayer
          backgroundColor={curtainBgColor}
          accentColor={accentColor}
          partingFrame={swipeStartFrame}
          partingDuration={12}
        />
      </Sequence>

      {/* LAYER 03: Ambient Radial Gold Glow (Fade Out) */}
      <Sequence
        name="03. Ambient Gold Aura (Fade Out)"
        from={0}
        durationInFrames={35}
        premountFor={fps}
      >
        <AmbientGlowLayer
          glowColor={`${accentColor}26`}
          size={520}
          verticalOffset={-60}
        />
      </Sequence>

      {/* LAYER 04: Sovereign Monogram 'L' Vector Stroke (Fade Out) */}
      <Sequence
        name="04. Sovereign Monogram 'L' Stroke (Fade Out)"
        from={0}
        durationInFrames={35}
        premountFor={fps}
      >
        <MonogramStrokeLayer
          accentColor={accentColor}
          size={96}
          verticalOffset={-140}
        />
      </Sequence>

      {/* LAYER 05: Celestial Diamond Gemstone Spring (Fade Out) */}
      <Sequence
        name="05. Celestial Diamond Star (Fade Out)"
        from={10}
        durationInFrames={25}
        premountFor={fps}
      >
        <DiamondStarLayer
          accentColor={accentColor}
          size={96}
          verticalOffset={-140}
        />
      </Sequence>

      {/* LAYER 06: Haute Couture Didone Brand Wordmark (Fade Out) */}
      <Sequence
        name="06. Brand Wordmark LUMIÈRE (Fade Out)"
        from={14}
        durationInFrames={21}
        premountFor={fps}
      >
        <WordmarkLayer
          brandName={brandName}
          verticalOffset={-40}
        />
      </Sequence>

      {/* LAYER 07: Haute Atelier Heritage Subtitle (Fade Out) */}
      <Sequence
        name="07. Haute Atelier Subtitle (Fade Out)"
        from={20}
        durationInFrames={15}
        premountFor={fps}
      >
        <SubtitleLayer
          subtitle={subtitle}
          accentColor={accentColor}
          verticalOffset={22}
        />
      </Sequence>

      {/* LAYER 08: Global Atelier Locations (Fade Out) */}
      <Sequence
        name="08. Global Atelier Locations (Fade Out)"
        from={22}
        durationInFrames={13}
        premountFor={fps}
      >
        <LocationsLayer
          locations={locations}
          verticalOffset={44}
        />
      </Sequence>

      {/* LAYER 09: 1px Expanding Golden Divider (Fade Out) */}
      <Sequence
        name="09. Expanding Golden Divider (Fade Out)"
        from={24}
        durationInFrames={11}
        premountFor={fps}
      >
        <DividerLayer
          accentColor={accentColor}
          width={160}
          verticalOffset={66}
        />
      </Sequence>

      {/* LAYER 10: Authentic Indian Craft Provenance (Fade Out) */}
      <Sequence
        name="10. Authentic Craft Provenance (Fade Out)"
        from={26}
        durationInFrames={9}
        premountFor={fps}
      >
        <ProvenanceLayer
          provenance={provenance}
          verticalOffset={88}
        />
      </Sequence>

      {/* LAYER 11: Skip Prologue UI Button Hint (Fade Out) */}
      <Sequence
        name="11. Skip Prologue [Esc] Hint (Fade Out)"
        from={0}
        durationInFrames={35}
        premountFor={fps}
      >
        <SkipButtonLayer
          label="Skip Prologue [Esc]"
          accentColor={accentColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
