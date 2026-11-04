"use client";

import { useState, useEffect } from "react";
import { Variants, Transition, useReducedMotion } from "framer-motion";

/**
 * SSR and hydration-safe hook for prefers-reduced-motion.
 *
 * During SSR and the initial client hydration render, this always returns `false`.
 * This guarantees 100% attribute parity (opacity, transform, inline styles) between
 * server-rendered HTML and client DOM. After mount, it resolves to the user's actual
 * reduced motion preference.
 */
export function useSafeReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) {
      setIsReduced(true);
      return;
    }

    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsReduced(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else if (typeof (mediaQuery as unknown as { addListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener === "function") {
      (mediaQuery as unknown as { addListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener(handleChange);
      return () => (mediaQuery as unknown as { removeListener: (cb: (e: MediaQueryListEvent) => void) => void }).removeListener(handleChange);
    }
  }, [shouldReduce]);

  return isReduced;
}

export { useSafeReducedMotion as useReducedMotionSafe };

/**
 * Luxury atelier easing curve (smooth cubic bezier deceleration)
 */
export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const defaultTransition: Transition = {
  duration: 0.35,
  ease: LUXURY_EASE,
};

export const quickTransition: Transition = {
  duration: 0.2,
  ease: LUXURY_EASE,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

/**
 * Fade in with subtle upward translation
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: LUXURY_EASE,
      delay: custom * 0.05,
    },
  }),
};

/**
 * Simple opacity fade with luxury ease
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/**
 * Editorial page transition (smooth fade + subtle upward glide)
 */
export const pageTransitionVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

/**
 * Staggered container for grids and lists
 */
export const staggerContainer = (staggerChildren = 0.05, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Dropdown panel animation (fade & subtle vertical translation)
 */
export const dropdownMenuVariant: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.99,
    transition: {
      duration: 0.22,
      ease: "easeIn",
    },
  },
};

/**
 * Modal dialog variant (backdrop + centered zoom)
 */
export const modalDialogVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: {
      duration: 0.24,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

/**
 * Slide-over drawer variant (from right)
 */
export const drawerRightVariant: Variants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.38,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.28,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

/**
 * Accordion collapse/expand variant
 */
export const accordionVariant: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    overflow: "hidden",
    transition: {
      height: { duration: 0.28, ease: LUXURY_EASE },
      opacity: { duration: 0.18 },
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    overflow: "hidden",
    transition: {
      height: { duration: 0.35, ease: LUXURY_EASE },
      opacity: { duration: 0.25, delay: 0.05 },
    },
  },
};

/**
 * Micro-scale bounce for buttons (e.g. wishlist heartbeat)
 */
export const microBounce = {
  scale: [1, 1.25, 0.95, 1.05, 1],
  transition: {
    duration: 0.4,
    ease: LUXURY_EASE,
  },
};

/**
 * Scroll reveal variants for sections and cards
 */
export const scrollFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: LUXURY_EASE,
      delay: custom * 0.08,
    },
  }),
};

export const scrollScaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 16,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: LUXURY_EASE,
      delay: custom * 0.08,
    },
  }),
};

export const scrollSlideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: LUXURY_EASE,
      delay: custom * 0.08,
    },
  }),
};

export const scrollSlideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: LUXURY_EASE,
      delay: custom * 0.08,
    },
  }),
};

/**
 * Elegant staggered line/word text reveals
 */
export const textContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: custom * 0.1,
    },
  }),
};

export const textChildVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: LUXURY_EASE,
    },
  },
};

