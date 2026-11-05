import React from "react";
import { Composition, Folder } from "remotion";
import "./index.css";
import {
  IntroEntranceAnimation,
  defaultIntroProps,
  introAnimationSchema,
  INTRO_DURATION_IN_FRAMES,
} from "./IntroEntranceAnimation";
import { IntroEntranceAnimationSplitLetters } from "./IntroEntranceAnimationSplitLetters";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Lumiere-Storefront-Intros">
        {/* 1. Master 1.16s Timeline (35 frames at 30fps) - everything after 1.16s removed */}
        <Composition
          id="IntroEntranceAnimation"
          component={IntroEntranceAnimation}
          durationInFrames={INTRO_DURATION_IN_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          schema={introAnimationSchema}
          defaultProps={defaultIntroProps}
        />

        {/* 2. 1.16s Timeline with individual letter Sequence tracks (L, U, M, I, È, R, E) */}
        <Composition
          id="IntroEntranceAnimation-LettersSplit"
          component={IntroEntranceAnimationSplitLetters}
          durationInFrames={INTRO_DURATION_IN_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          schema={introAnimationSchema}
          defaultProps={defaultIntroProps}
        />

        {/* 3. Mobile / Stories / Reels 9:16 Vertical Cut (1.16s) */}
        <Composition
          id="IntroEntranceAnimation-Mobile"
          component={IntroEntranceAnimation}
          durationInFrames={INTRO_DURATION_IN_FRAMES}
          fps={30}
          width={1080}
          height={1920}
          schema={introAnimationSchema}
          defaultProps={defaultIntroProps}
        />

        {/* 4. Instagram / Feed 1:1 Square Cut (1.16s) */}
        <Composition
          id="IntroEntranceAnimation-Square"
          component={IntroEntranceAnimation}
          durationInFrames={INTRO_DURATION_IN_FRAMES}
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
