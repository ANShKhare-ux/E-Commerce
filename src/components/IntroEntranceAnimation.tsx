"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

export const SESSION_STORAGE_KEY = "lumiere_intro_completed";

export function safeCheckIntroCompleted(): boolean {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return false;
    return window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function safeMarkIntroCompleted(): void {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    }
  } catch {
    // Gracefully handle privacy mode / quota exceeded errors
  }
}

export function IntroEntranceAnimation() {
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);
  const [stage, setStage] = useState<"centered" | "morphing" | "done">("centered");
  const [targetOffset, setTargetOffset] = useState<{ x: number | string; y: number | string }>({
    x: "-38vw",
    y: "-44vh",
  });

  const handleSkip = useCallback(() => {
    setStage("done");
    safeMarkIntroCompleted();
  }, []);

  const calculateTargetPosition = useCallback(() => {
    if (typeof window === "undefined") return;
    const logoEl = document.getElementById("main-brand-logo");
    if (logoEl) {
      const rect = logoEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const targetX = Math.round(centerX - window.innerWidth / 2);
      const targetY = Math.round(centerY - window.innerHeight / 2);
      setTargetOffset({ x: targetX, y: targetY });
    } else {
      // Fallback relative position
      const fallbackY = Math.round(-window.innerHeight * 0.44);
      const fallbackX = Math.round(-window.innerWidth * 0.38);
      setTargetOffset({ x: fallbackX, y: fallbackY });
    }
  }, []);

  useEffect(() => {
    // 1. Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. Check sessionStorage safely
    const hasCompleted = safeCheckIntroCompleted();

    if (prefersReducedMotion || hasCompleted) {
      setShouldAnimate(false);
      return;
    }

    // Otherwise, initiate intro entrance animation
    setShouldAnimate(true);

    // Sequence timer: Centered radiance -> Morph to logo -> Complete
    const morphTimer = setTimeout(() => {
      calculateTargetPosition();
      setStage("morphing");
    }, 1100);

    const finishTimer = setTimeout(() => {
      setStage("done");
      safeMarkIntroCompleted();
    }, 2000);

    return () => {
      clearTimeout(morphTimer);
      clearTimeout(finishTimer);
    };
  }, [calculateTargetPosition]);

  // Keyboard accessibility: Escape key dismisses intro
  useEffect(() => {
    if (shouldAnimate === false || stage === "done") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shouldAnimate, stage, handleSkip]);

  // If already seen or disabled, don't render anything
  if (shouldAnimate === false || shouldAnimate === null) {
    return null;
  }

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="lumiere-intro-splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "morphing" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: LUXURY_EASE, delay: stage === "morphing" ? 0.35 : 0 }}
          className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center bg-[#0c0d10]"
          style={{ willChange: "opacity" }}
        >
          {/* Subtle Ambient Radial Gold Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,72,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Skip Button for Accessibility */}
          <button
            type="button"
            onClick={handleSkip}
            className="pointer-events-auto absolute bottom-8 right-8 text-[10px] uppercase font-mono tracking-widest text-[#a1a1aa] hover:text-[#C59B48] bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded transition-all focus:outline-hidden focus:ring-1 focus:ring-[#C59B48]"
            aria-label="Skip introduction animation"
          >
            Skip Intro [Esc]
          </button>

          {/* Morphing Logo Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 12 }}
            animate={
              stage === "centered"
                ? {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    x: 0,
                    transition: { duration: 0.8, ease: LUXURY_EASE },
                  }
                : {
                    scale: 0.55,
                    opacity: 0,
                    x: targetOffset.x,
                    y: targetOffset.y,
                    transition: { duration: 0.75, ease: LUXURY_EASE },
                  }
            }
            className="flex flex-col items-center justify-center text-center select-none"
          >
            {/* Sovereign Geometric Diamond Monogram Draw-in */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: LUXURY_EASE }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center"
            >
              <Image
                src="/brand/lumiere-symbol-master.svg"
                alt="LUMIÈRE Emblem"
                width={80}
                height={80}
                priority
                unoptimized
                className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(197,155,72,0.4)]"
              />
            </motion.div>

            {/* Wordmark with Haute Couture Letter Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: LUXURY_EASE, delay: 0.2 }}
              className="space-y-1.5"
            >
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[0.35em] text-white font-bold uppercase block">
                LUMIÈRE
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.45em] text-[#C59B48] uppercase font-mono block">
                Haute Horlogerie & Fashion Atelier
              </span>
            </motion.div>

            {/* Subtle Atelier Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: LUXURY_EASE, delay: 0.35 }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C59B48] to-transparent mt-3"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
