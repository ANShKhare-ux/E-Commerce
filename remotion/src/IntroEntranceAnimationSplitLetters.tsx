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

export const IntroEntranceAnimationSplitLetters: React.FC<IntroAnimationProps> = ({
  brandName = defaultIntroProps.brandName,
  subtitle = defaultIntroProps.subtitle,
  locations = defaultIntroProps.locations,
  provenance = defaultIntroProps.provenance,
  accentColor = defaultIntroProps.accentColor,
  curtainBgColor = defaultIntroProps.curtainBgColor,
  swipeStartFrame = defaultIntroProps.swipeStartFrame,
}) => {
  const { fps } = useVideoConfig();
  const chars = brandName.split("");

  return (
    <AbsoluteFill className="bg-black select-none font-sans overflow-hidden">
      {/* LAYER 00: The Revealed Storefront Website */}
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

      {/* LAYER 01: Left Silk Curtain Panel (Swipes left) */}
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

      {/* LAYER 02: Right Silk Curtain Panel (Swipes right) */}
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

      {/* LAYER 06: Individual Letter Sequences for "L U M I È R E" (Fade Out) */}
      {chars.map((char, index) => {
        const letterStart = 14 + index * 1;
        return (
          <Sequence
            key={index}
            name={`06.${index + 1} Wordmark Letter [${char}] (Fade Out)`}
            from={letterStart}
            durationInFrames={35 - letterStart}
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
