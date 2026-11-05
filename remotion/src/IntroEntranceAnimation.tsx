import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

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
});

export type IntroAnimationProps = z.infer<typeof introAnimationSchema>;

export const defaultIntroProps: IntroAnimationProps = {
  brandName: "LUMIÈRE",
  subtitle: "Haute Horlogerie & Fashion Atelier",
  locations: "New Delhi • Paris • Geneva • Tokyo",
  provenance: "Hand-Loomed Chanderi • Bespoke Tailoring • Luxury Curations",
  accentColor: "#C59B48",
  curtainBgColor: "#08080a",
};

export const INTRO_DURATION_IN_FRAMES = 35; // 35 frames at 30fps = 1.166s (~1.16 seconds)

/**
 * IntroEntranceAnimation with duration capped strictly at 1.16 seconds (35 frames).
 * All elements and trailing layers after 1.16 seconds have been completely removed.
 *
 * Each layer is independently editable on the Remotion Studio timeline.
 */
export const IntroEntranceAnimation: React.FC<IntroAnimationProps> = ({
  brandName = defaultIntroProps.brandName,
  subtitle = defaultIntroProps.subtitle,
  locations = defaultIntroProps.locations,
  provenance = defaultIntroProps.provenance,
  accentColor = defaultIntroProps.accentColor,
  curtainBgColor = defaultIntroProps.curtainBgColor,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-black select-none font-sans overflow-hidden">
      {/* LAYER 1: Left Silk Curtain Panel */}
      <Sequence
        name="01. Left Silk Curtain"
        from={0}
        durationInFrames={35}
        premountFor={fps}
      >
        <LeftCurtainLayer
          backgroundColor={curtainBgColor}
          accentColor={accentColor}
          partingFrame={999} // Kept closed through 1.16s
        />
      </Sequence>

      {/* LAYER 2: Right Silk Curtain Panel */}
      <Sequence
        name="02. Right Silk Curtain"
        from={0}
        durationInFrames={35}
        premountFor={fps}
      >
        <RightCurtainLayer
          backgroundColor={curtainBgColor}
          accentColor={accentColor}
          partingFrame={999}
        />
      </Sequence>

      {/* LAYER 3: Ambient Radial Gold Glow */}
      <Sequence
        name="03. Ambient Gold Aura"
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

      {/* LAYER 4: Sovereign Monogram 'L' Vector Stroke */}
      <Sequence
        name="04. Sovereign Monogram 'L' Stroke"
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

      {/* LAYER 5: Celestial Diamond Gemstone Spring */}
      <Sequence
        name="05. Celestial Diamond Star"
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

      {/* LAYER 6: Haute Couture Didone Brand Wordmark */}
      <Sequence
        name="06. Brand Wordmark (LUMIÈRE)"
        from={14}
        durationInFrames={21}
        premountFor={fps}
      >
        <WordmarkLayer
          brandName={brandName}
          verticalOffset={-40}
        />
      </Sequence>

      {/* LAYER 7: Haute Atelier Heritage Subtitle */}
      <Sequence
        name="07. Haute Atelier Subtitle"
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

      {/* LAYER 8: Global Atelier Locations */}
      <Sequence
        name="08. Global Atelier Locations"
        from={22}
        durationInFrames={13}
        premountFor={fps}
      >
        <LocationsLayer
          locations={locations}
          verticalOffset={44}
        />
      </Sequence>

      {/* LAYER 9: 1px Expanding Golden Divider */}
      <Sequence
        name="09. Expanding Golden Divider"
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

      {/* LAYER 10: Authentic Indian Craft Provenance */}
      <Sequence
        name="10. Authentic Craft Provenance"
        from={26}
        durationInFrames={9}
        premountFor={fps}
      >
        <ProvenanceLayer
          provenance={provenance}
          verticalOffset={88}
        />
      </Sequence>

      {/* LAYER 11: Skip Prologue UI Button Hint */}
      <Sequence
        name="11. Skip Prologue [Esc] Hint"
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
