import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import {
  IntroAnimationProps,
  defaultIntroProps,
} from "./IntroEntranceAnimation";

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
}) => {
  const { fps } = useVideoConfig();
  const chars = brandName.split("");

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
          partingFrame={999}
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

      {/* LAYER 6: Individual Letter Sequences for "L U M I È R E" */}
      {chars.map((char, index) => {
        const letterStart = 14 + index * 1;
        return (
          <Sequence
            key={index}
            name={`06.${index + 1} Wordmark Letter [${char}]`}
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
