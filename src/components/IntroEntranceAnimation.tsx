"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

export const SESSION_STORAGE_KEY = "lumiere_intro_completed";
export const LOCAL_STORAGE_KEY = "lumiere_intro_completed";

export function safeCheckIntroCompleted(): boolean {
  try {
    if (typeof window === "undefined") return false;

    // Check if query parameter requests replay: ?intro=true or ?replay=1
    try {
      if (window.location && window.location.search) {
        const search = window.location.search;
        if (search.includes("intro=true") || search.includes("replay=1")) {
          return false;
        }
      }
    } catch {}

    // 1. In-memory window execution guard
    try {
      if ((window as any).__lumiere_intro_completed === true) return true;
    } catch {}

    // 2. Tab session storage (persists across page reloads/refresh in the same tab)
    try {
      if (typeof window.sessionStorage !== "undefined" && window.sessionStorage) {
        if (window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "true") {
          return true;
        }
      }
    } catch {}

    // 3. Persistent local storage (persists across hard refreshes, navigation, and re-entry)
    try {
      if (typeof window.localStorage !== "undefined" && window.localStorage) {
        if (window.localStorage.getItem(LOCAL_STORAGE_KEY) === "true") {
          return true;
        }
      }
    } catch {}

    return false;
  } catch {
    return false;
  }
}

export function safeMarkIntroCompleted(): void {
  try {
    if (typeof window === "undefined") return;

    // Set in-memory execution guard
    try {
      (window as any).__lumiere_intro_completed = true;
    } catch {}

    // Set sessionStorage for current tab session
    try {
      if (typeof window.sessionStorage !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      }
    } catch {}

    // Set localStorage for persistent shield across refreshes/re-entries
    try {
      if (typeof window.localStorage !== "undefined" && window.localStorage) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      }
    } catch {}
  } catch {
    // Gracefully handle privacy mode / quota exceeded errors
  }
}

export function isExcludedIntroRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return (
    clean.startsWith("/admin") ||
    clean === "/login" ||
    clean.startsWith("/login/") ||
    clean === "/signup" ||
    clean.startsWith("/signup/") ||
    clean === "/forgot-password" ||
    clean.startsWith("/forgot-password/") ||
    clean === "/reset-password" ||
    clean.startsWith("/reset-password/") ||
    clean === "/auth" ||
    clean.startsWith("/auth/")
  );
}

const WORDMARK_CHARS = ["L", "U", "M", "I", "È", "R", "E"];

export function IntroEntranceAnimation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isParting, setIsParting] = useState(false);

  const initialPathRef = useRef<string | null>(null);
  const isIntroActiveRef = useRef<boolean>(false);
  const skipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Safely dismiss and remove the initial zero-latency paint curtain
  const removeStaticCurtain = useCallback(() => {
    if (typeof document === "undefined") return;
    try {
      const staticCurtain = document.getElementById("lumiere-intro-curtain");
      if (staticCurtain) {
        staticCurtain.style.display = "none";
      }
      document.documentElement.classList.add("lumiere-intro-dismissed");
      document.documentElement.classList.remove("lumiere-intro-active");
    } catch {
      // Ignored in non-browser testing
    }
  }, []);

  // Immediate skip / dismiss handler (accessible via Skip button, Escape key, or route transition)
  const handleSkip = useCallback(() => {
    safeMarkIntroCompleted();
    setIsParting(true);
    removeStaticCurtain();

    if (skipTimerRef.current) {
      clearTimeout(skipTimerRef.current);
    }
    skipTimerRef.current = setTimeout(() => {
      setMounted(false);
      isIntroActiveRef.current = false;
    }, 280);
  }, [removeStaticCurtain]);

  // Main Orchestration
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Accessibility: Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. Check excluded routes (auth/admin)
    const isExcluded = isExcludedIntroRoute(pathname);

    // 3. Check persistent storage (sessionStorage + localStorage + in-memory)
    const hasCompleted = safeCheckIntroCompleted();

    // If already completed and not currently active, or if excluded route / reduced motion, dismiss immediately
    if (prefersReducedMotion || (hasCompleted && !isIntroActiveRef.current) || isExcluded) {
      safeMarkIntroCompleted();
      removeStaticCurtain();
      setMounted(false);
      isIntroActiveRef.current = false;
      return;
    }

    // FIRST ENTRY OR STRICTMODE REMOUNT:
    // Synchronously shield all storages so any instantaneous refresh or navigation will never replay
    safeMarkIntroCompleted();
    isIntroActiveRef.current = true;
    setMounted(true);

    // Remove static HTML curtain once animated React overlay is mounted
    const curtainTimer = setTimeout(() => {
      const staticCurtain = document.getElementById("lumiere-intro-curtain");
      if (staticCurtain) {
        staticCurtain.style.display = "none";
      }
    }, 40);

    // 0.76s (Frame 23): Initiate smooth curtain swipe (left to -102%, right to 102%) & stage fade-out
    const partingTimer = setTimeout(() => {
      setIsParting(true);
    }, 760);

    // 1.16s (Frame 35): Full animation cycle completes strictly at 1.16 seconds (1160ms)
    // Curtains have swiped fully open, revealing the live website
    const completionTimer = setTimeout(() => {
      removeStaticCurtain();
      setMounted(false);
      isIntroActiveRef.current = false;
    }, 1160);

    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(partingTimer);
      clearTimeout(completionTimer);
      if (skipTimerRef.current) {
        clearTimeout(skipTimerRef.current);
      }
    };
  }, [pathname, removeStaticCurtain]);

  // Route Navigation Interceptor:
  // If the user navigates while the intro is playing, immediately dismiss it so they see their destination
  useEffect(() => {
    if (initialPathRef.current === null) {
      initialPathRef.current = pathname;
      return;
    }

    if (initialPathRef.current !== pathname) {
      initialPathRef.current = pathname;
      if (mounted) {
        handleSkip();
      }
    }
  }, [pathname, mounted, handleSkip]);

  // Keyboard accessibility: Escape key dismisses intro instantly
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted, handleSkip]);

  // In SSR environments or when intro is dismissed/completed, return null cleanly
  if (typeof window === "undefined" || !mounted) {
    return null;
  }

  return (
    <div
      id="lumiere-intro-overlay"
      className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-auto bg-transparent"
      aria-label="LUMIÈRE Atelier Prologue"
      role="dialog"
      aria-modal="true"
    >
      {/* Dual Couture Silk Curtain Panels */}
      {/* Left Silk Curtain Panel: Swipes to left */}
      <motion.div
        id="curtain-panel-left"
        className="absolute inset-y-0 left-0 w-1/2 bg-[#08080a] border-r border-[#C59B48]/25 shadow-[20px_0_50px_rgba(0,0,0,0.9)] will-change-transform z-30"
        initial={{ x: "0%" }}
        animate={{ x: isParting ? "-102%" : "0%" }}
        transition={{ duration: 0.4, ease: LUXURY_EASE }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(197,155,72,0.08)_0%,transparent_70%)] pointer-events-none" />
      </motion.div>

      {/* Right Silk Curtain Panel: Swipes to right */}
      <motion.div
        id="curtain-panel-right"
        className="absolute inset-y-0 right-0 w-1/2 bg-[#08080a] border-l border-[#C59B48]/25 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] will-change-transform z-30"
        initial={{ x: "0%" }}
        animate={{ x: isParting ? "102%" : "0%" }}
        transition={{ duration: 0.4, ease: LUXURY_EASE }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(197,155,72,0.08)_0%,transparent_70%)] pointer-events-none" />
      </motion.div>

      {/* Skip Button for Accessibility */}
      <button
        type="button"
        onClick={handleSkip}
        className="pointer-events-auto absolute bottom-8 right-8 z-40 text-[10px] uppercase font-mono tracking-[0.25em] text-[#a1a1aa] hover:text-[#C59B48] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C59B48]/40 px-4 py-2 rounded-full transition-all focus:outline-hidden focus:ring-1 focus:ring-[#C59B48]"
        aria-label="Skip prologue animation"
      >
        Skip Prologue [Esc]
      </button>

      {/* Central Haute Atelier Stage: Fades out before curtain swipe */}
      <motion.div
        className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isParting ? 0 : 1, y: isParting ? -14 : 0 }}
        transition={{ duration: 0.28, ease: LUXURY_EASE }}
      >
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(197,155,72,0.16)_0%,transparent_70%)] pointer-events-none" />

        {/* 1. The Sovereign Monogram (Master Vector Stroke Draw & Gold Fill) */}
        <svg
          viewBox="0 0 256 256"
          width="92"
          height="92"
          className="mb-5 filter drop-shadow-[0_0_24px_rgba(197,155,72,0.5)] will-change-transform"
          role="img"
          aria-label="LUMIÈRE Sovereign Monogram"
        >
          {/* Sovereign "L" Vector Path */}
          <motion.path
            d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"
            stroke="#C59B48"
            strokeWidth="1.8"
            strokeDasharray="560"
            initial={{ pathLength: 0, fill: "rgba(197, 155, 72, 0)" }}
            animate={{ pathLength: 1, fill: "rgba(197, 155, 72, 0.95)" }}
            transition={{
              pathLength: { duration: 0.5, ease: LUXURY_EASE },
              fill: { duration: 0.25, delay: 0.35, ease: "easeInOut" },
            }}
          />
          {/* Sovereign Diamond Gemstone / Star */}
          <motion.polygon
            points="144,80 174,110 144,140 114,110"
            fill="#C59B48"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: "144px 110px" }}
            transition={{
              type: "spring",
              damping: 14,
              stiffness: 140,
              mass: 0.8,
              delay: 0.25,
            }}
          />
        </svg>

        {/* 2. Haute Couture Didone Wordmark (Letter-by-Letter Awakening) */}
        <div
          className="flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.45em] uppercase select-none mb-2 pl-3"
          style={{ letterSpacing: "0.45em" }}
        >
          {WORDMARK_CHARS.map((char, index) => (
            <motion.span
              key={index}
              className="lumiere-didone-char inline-block will-change-transform"
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.35,
                delay: 0.36 + index * 0.035,
                ease: LUXURY_EASE,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* 3. Haute Atelier Heritage Badge */}
        <motion.div
          className="space-y-1.5 will-change-transform"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.55, ease: LUXURY_EASE }}
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.55em] text-[#C59B48] uppercase font-mono block">
            Haute Horlogerie & Fashion Atelier
          </span>
          <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.42em] text-[#a1a1aa] uppercase font-sans block opacity-75">
            New Delhi • Paris • Geneva • Tokyo
          </span>
        </motion.div>

        {/* 4. Fine 1px Expanding Golden Divider */}
        <motion.div
          className="w-36 h-[1px] bg-gradient-to-r from-transparent via-[#C59B48] to-transparent my-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: "center center" }}
          transition={{ duration: 0.28, delay: 0.65, ease: LUXURY_EASE }}
        />

        {/* 5. Authentic Indian Craft Provenance */}
        <motion.div
          className="flex flex-col items-center gap-1.5 will-change-transform"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.24, delay: 0.72, ease: LUXURY_EASE }}
        >
          <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.38em] text-[#d4d4d8] uppercase font-sans opacity-85">
            Hand-Loomed Chanderi • Bespoke Tailoring • Luxury Curations
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
