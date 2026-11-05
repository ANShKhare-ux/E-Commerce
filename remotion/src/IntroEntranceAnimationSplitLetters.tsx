import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import {
  IntroAnimationProps,
  defaultIntroProps,
} from "./IntroEntranceAnimation";

import { StorefrontCanvasLayer } from "./layers/StorefrontCanvasLayer";
import { LeftCurtainLayer } from "./layers/LeftCurtainLayer";
import { RightCurtainLayer } from "./layers/RightCurtainLayer";
import { AmbientGlowLayer } from "./layers/AmbientGlowLayer";
import { MonogramStrokeLayer } from "./layers/MonogramStrokeLayer";
import { DiamondStarLayer } from "./layers/DiamondStarLayer";
import { LetterLayer } from "./layers/LetterLayer";
import { SubtitleLayer } from "./layers/SubtitleLayer";
import { LocationsLayer } from "./layers/LocationsLayer";
import { DividerLayer } from "./layers/DividerLayer";
import { ProvenanceLayer } from "./layers/ProvenanceLayer";
import { SkipButtonLayer } from "./layers/SkipButtonLayer";

/**
 * Ultra-granular split timeline:
 * In addition to the curtains, monogram, star, subtitle, etc.,
 * every individual character in "L U M I È R E" is an independent
 * Sequence track on the Remotion Studio timeline.
 */
export const IntroEntranceAnimationSplitLetters: React.FC<IntroAnimationProps> = ({
  brandName = defaultIntroProps.brandName,
  subtitle = defaultIntroProps.subtitle,
  locations = defaultIntroProps.locations,
  provenance = defaultIntroProps.provenance,
  accentColor = defaultIntroProps.accentColor,
  curtainBgColor = defaultIntroProps.curtainBgColor,
  partingStartFrame = defaultIntroProps.partingStartFrame,
}) => {
  const { fps } = useVideoConfig();
  const chars = brandName.split("");

  return (
    <AbsoluteFill className="bg-black select-none font-sans overflow-hidden">
      {/* LAYER 1: Revealed Storefront Underneath */}
      <Sequence
        name="01. Revealed Storefront (Underlay)"
        from={0}
        durationInFrames={80}
        premountFor={fps}
      >
        <StorefrontCanvasLayer
          brandName={brandName}
          accentColor={accentColor}
          partingFrame={partingStartFrame}
        />
      </Sequence>

      {/* LAYER 2: Left Silk Curtain Panel */}
      <Sequence
        name="02. Left Silk Curtain"
        from={0}
        durationInFrames={80}
        premountFor={fps}
      >
        <LeftCurtainLayer
          backgroundColor={curtainBgColor}
          accentColor={accentColor}
          partingFrame={partingStartFrame}
          partingDuration={20}
        />
      </Sequence>

      {/* LAYER 3: Right Silk Curtain Panel */}
      <Sequence
        name="03. Right Silk Curtain"
        from={0}
        durationInFrames={80}
        premountFor={fps}
      >
        <RightCurtainLayer
          backgroundColor={curtainBgColor}
          accentColor={accentColor}
          partingFrame={partingStartFrame}
          partingDuration={20}
        />
      </Sequence>

      {/* LAYER 4: Ambient Radial Gold Glow */}
      <Sequence
        name="04. Ambient Gold Aura"
        from={0}
        durationInFrames={55}
        premountFor={fps}
      >
        <AmbientGlowLayer
          glowColor={`${accentColor}26`}
          size={520}
          verticalOffset={-60}
        />
      </Sequence>

      {/* LAYER 5: Sovereign Monogram 'L' Vector Stroke */}
      <Sequence
        name="05. Sovereign Monogram 'L' Stroke"
        from={0}
        durationInFrames={55}
        premountFor={fps}
      >
        <MonogramStrokeLayer
          accentColor={accentColor}
          size={96}
          verticalOffset={-140}
        />
      </Sequence>

      {/* LAYER 6: Celestial Diamond Gemstone Spring */}
      <Sequence
        name="06. Celestial Diamond Star"
        from={10}
        durationInFrames={45}
        premountFor={fps}
      >
        <DiamondStarLayer
          accentColor={accentColor}
          size={96}
          verticalOffset={-140}
        />
      </Sequence>

      {/* LAYER 7+: Individual Letter Sequences for "L U M I È R E" */}
      {chars.map((char, index) => {
        const letterStart = 14 + index * 2;
        return (
          <Sequence
            key={index}
            name={`07.${index + 1} Wordmark Letter [${char}]`}
            from={letterStart}
            durationInFrames={55 - letterStart}
            premountFor={fps}
          >
            <LetterLayer
              brandName={brandName}
              charIndex={index}
              verticalOffset={-40}
            />
          </Sequence>
        );
      })}

      {/* LAYER 8: Haute Atelier Heritage Subtitle */}
      <Sequence
        name="08. Haute Atelier Subtitle"
        from={22}
        durationInFrames={33}
        premountFor={fps}
      >
        <SubtitleLayer
          subtitle={subtitle}
          accentColor={accentColor}
          verticalOffset={22}
        />
      </Sequence>

      {/* LAYER 9: Global Atelier Locations */}
      <Sequence
        name="09. Global Atelier Locations"
        from={24}
        durationInFrames={31}
        premountFor={fps}
      >
        <LocationsLayer
          locations={locations}
          verticalOffset={44}
        />
      </Sequence>

      {/* LAYER 10: 1px Expanding Golden Divider */}
      <Sequence
        name="10. Expanding Golden Divider"
        from={26}
        durationInFrames={29}
        premountFor={fps}
      >
        <DividerLayer
          accentColor={accentColor}
          width={160}
          verticalOffset={66}
        />
      </Sequence>

      {/* LAYER 11: Authentic Indian Craft Provenance */}
      <Sequence
        name="11. Authentic Craft Provenance"
        from={28}
        durationInFrames={27}
        premountFor={fps}
      >
        <ProvenanceLayer
          provenance={provenance}
          verticalOffset={88}
        />
      </Sequence>

      {/* LAYER 12: Skip Prologue UI Button Hint */}
      <Sequence
        name="12. Skip Prologue [Esc] Hint"
        from={0}
        durationInFrames={55}
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
