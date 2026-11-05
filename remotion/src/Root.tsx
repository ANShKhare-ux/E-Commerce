import React from "react";
import { Composition, Folder } from "remotion";
import "./index.css";
import {
  IntroEntranceAnimation,
  defaultIntroProps,
  introAnimationSchema,
} from "./IntroEntranceAnimation";
import { IntroEntranceAnimationSplitLetters } from "./IntroEntranceAnimationSplitLetters";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Lumiere-Storefront-Intros">
        {/* 1. Master Timeline with all 12 visual layers split into separate Sequence tracks */}
        <Composition
          id="IntroEntranceAnimation"
          component={IntroEntranceAnimation}
          durationInFrames={80}
          fps={30}
          width={1920}
          height={1080}
          schema={introAnimationSchema}
          defaultProps={defaultIntroProps}
        />

        {/* 2. Ultra-Granular Timeline with individual letter Sequence tracks (L, U, M, I, È, R, E) */}
        <Composition
          id="IntroEntranceAnimation-LettersSplit"
          component={IntroEntranceAnimationSplitLetters}
          durationInFrames={80}
          fps={30}
          width={1920}
          height={1080}
          schema={introAnimationSchema}
          defaultProps={defaultIntroProps}
        />

        {/* 3. Mobile / Stories / Reels 9:16 Vertical Cut */}
        <Composition
          id="IntroEntranceAnimation-Mobile"
          component={IntroEntranceAnimation}
          durationInFrames={80}
          fps={30}
          width={1080}
          height={1920}
          schema={introAnimationSchema}
          defaultProps={defaultIntroProps}
        />

        {/* 4. Instagram / Feed 1:1 Square Cut */}
        <Composition
          id="IntroEntranceAnimation-Square"
          component={IntroEntranceAnimation}
          durationInFrames={80}
          fps={30}
          width={1080}
          height={1080}
          schema={introAnimationSchema}
          defaultProps={defaultIntroProps}
        />
      </Folder>
    </>
  );
};
