"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { spring, interpolate } from "remotion";

export const SESSION_STORAGE_KEY = "lumiere_intro_completed";
export const LOCAL_STORAGE_KEY = "lumiere_intro_completed";

export function safeCheckIntroCompleted(): boolean {
  try {
    if (typeof window === "undefined") return false;

    // 1. In-memory window execution guard
    if ((window as any).__lumiere_intro_completed === true) return true;

    // 2. Tab session storage (persists across page reloads/refresh in the same tab)
    if (typeof window.sessionStorage !== "undefined" && window.sessionStorage) {
      if (window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "true") {
        return true;
      }
    }

    // 3. Persistent local storage (persists across hard refreshes, navigation, and re-entry)
    if (typeof window.localStorage !== "undefined" && window.localStorage) {
      if (window.localStorage.getItem(LOCAL_STORAGE_KEY) === "true") {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

export function safeMarkIntroCompleted(): void {
  try {
    if (typeof window === "undefined") return;

    // Set in-memory execution guard
    (window as any).__lumiere_intro_completed = true;

    // Set sessionStorage for current tab session
    if (typeof window.sessionStorage !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    }

    // Set localStorage for persistent shield across refreshes/re-entries
    if (typeof window.localStorage !== "undefined" && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    }
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

  // DOM Refs for GSAP & Remotion orchestration
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const stageCenterRef = useRef<HTMLDivElement>(null);
  const monogramSvgRef = useRef<SVGSVGElement>(null);
  const monogramPathRef = useRef<SVGPathElement>(null);
  const diamondGemRef = useRef<SVGPolygonElement>(null);
  const wordmarkContainerRef = useRef<HTMLDivElement>(null);
  const atelierBadgeRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const provenanceRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  // State refs to prevent memory leaks and handle route navigation
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasInitializedRef = useRef<boolean>(false);
  const initialPathRef = useRef<string | null>(null);

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

  // Calculate target logo coordinates for the final emblem elevation
  const calculateTargetPosition = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return { x: 0, y: 0 };
    }
    const logoEl = document.getElementById("main-brand-logo");
    if (logoEl) {
      const rect = logoEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const targetX = Math.round(centerX - window.innerWidth / 2);
      const targetY = Math.round(centerY - window.innerHeight / 2);
      return { x: targetX, y: targetY };
    }
    // Fallback relative position towards top-left header
    return {
      x: Math.round(-window.innerWidth * 0.38),
      y: Math.round(-window.innerHeight * 0.44),
    };
  }, []);

  // Immediate skip / dismiss handler (accessible via Skip button, Escape key, or completion)
  const handleSkip = useCallback(() => {
    safeMarkIntroCompleted();

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (leftCurtainRef.current && rightCurtainRef.current && overlayRef.current) {
      // Fast bespoke parting of curtains upon skip
      gsap.to(
        [
          wordmarkContainerRef.current,
          atelierBadgeRef.current,
          dividerLineRef.current,
          provenanceRef.current,
          skipBtnRef.current,
          monogramSvgRef.current,
        ],
        {
          opacity: 0,
          duration: 0.15,
          ease: "power2.out",
        }
      );
      gsap.to(leftCurtainRef.current, {
        xPercent: -102,
        duration: 0.35,
        ease: "power3.inOut",
      });
      gsap.to(rightCurtainRef.current, {
        xPercent: 102,
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => {
          removeStaticCurtain();
          setMounted(false);
        },
      });
    } else {
      removeStaticCurtain();
      setMounted(false);
    }
  }, [removeStaticCurtain]);

  // Main GSAP & Remotion Timeline Execution
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    initialPathRef.current = pathname;

    // 1. Accessibility: Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. Check excluded routes (auth/admin)
    const isExcluded = isExcludedIntroRoute(pathname);

    // 3. Check persistent storage (sessionStorage + localStorage + in-memory)
    const hasCompleted = safeCheckIntroCompleted();

    if (prefersReducedMotion || hasCompleted || isExcluded) {
      safeMarkIntroCompleted();
      removeStaticCurtain();
      setMounted(false);
      return;
    }

    // FIRST ENTRY:
    // Synchronously shield all storages so any instantaneous refresh or navigation will never replay
    safeMarkIntroCompleted();
    setMounted(true);

    // Remotion physics spring calculation for tactile diamond star bloom
    // Using Remotion spring equation for authentic physical spring dampening
    const springConfig = { damping: 14, stiffness: 120, mass: 0.8 };
    const gemScale = spring({ frame: 20, fps: 30, config: springConfig });
    const trackingSpread = interpolate(
      spring({ frame: 16, fps: 30, config: { damping: 18, stiffness: 90 } }),
      [0, 1],
      [0.32, 0.44],
      { extrapolateRight: "clamp" }
    );

    // Give DOM a micro-tick to attach refs and begin bespoke choreography
    const timer = setTimeout(() => {
      // The overlay with dual silk curtains is now firmly attached at z-[99999]
      // We can safely remove the static curtain from layout
      const staticCurtain = document.getElementById("lumiere-intro-curtain");
      if (staticCurtain) {
        staticCurtain.style.display = "none";
      }

      if (!monogramPathRef.current || !diamondGemRef.current || !leftCurtainRef.current || !rightCurtainRef.current) {
        return;
      }

      // Initial element setups via GSAP
      gsap.set(monogramPathRef.current, {
        strokeDasharray: 560,
        strokeDashoffset: 560,
        stroke: "#C59B48",
        strokeWidth: 1.75,
        fill: "transparent",
      });

      gsap.set(diamondGemRef.current, {
        scale: 0,
        transformOrigin: "center center",
        opacity: 0,
        fill: "#C59B48",
      });

      if (wordmarkContainerRef.current) {
        gsap.set(wordmarkContainerRef.current, {
          letterSpacing: `${trackingSpread}em`,
        });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          handleSkip();
        },
      });
      tlRef.current = tl;

      // Prologue: Monogram Golden Thread Draw (Artisanal Zari Thread Embroidery)
      tl.to(monogramPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.65,
        ease: "power2.out",
      })
      .to(
        monogramPathRef.current,
        {
          fill: "rgba(197, 155, 72, 0.95)",
          duration: 0.3,
          ease: "power1.inOut",
        },
        "-=0.15"
      )
      .to(
        diamondGemRef.current,
        {
          scale: gemScale,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.8)",
        },
        "-=0.25"
      )

      // Act 1: Editorial Typographic Awakening (Didone Letter-by-Letter Reveal with Soft Optical Blur)
      .to(
        ".lumiere-didone-char",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.15"
      )

      // Act 2: Atelier Provenance & Golden Hairline Divider
      .to(
        atelierBadgeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.15"
      )
      .to(
        dividerLineRef.current,
        {
          scaleX: 1,
          duration: 0.45,
          ease: "expo.out",
        },
        "-=0.2"
      )
      .to(
        provenanceRef.current,
        {
          opacity: 0.85,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.2"
      )

      // Act 3: The Parting Silk Curtains & Elevating Monogram Reveal
      .to({}, { duration: 0.4 })
      .add(() => {
        const target = calculateTargetPosition();
        if (monogramSvgRef.current) {
          gsap.to(monogramSvgRef.current, {
            x: target.x,
            y: target.y,
            scale: 0.45,
            opacity: 0,
            duration: 0.65,
            ease: "power3.inOut",
          });
        }
      })
      .to(
        [
          wordmarkContainerRef.current,
          atelierBadgeRef.current,
          dividerLineRef.current,
          provenanceRef.current,
          skipBtnRef.current,
        ],
        {
          opacity: 0,
          y: -8,
          duration: 0.25,
          ease: "power2.in",
        },
        "<"
      )
      // Left Silk Curtain Panel parts off to the left
      .to(
        leftCurtainRef.current,
        {
          xPercent: -102,
          duration: 0.65,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      // Right Silk Curtain Panel parts off to the right
      .to(
        rightCurtainRef.current,
        {
          xPercent: 102,
          duration: 0.65,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        },
        "-=0.2"
      );
    }, 40);

    return () => {
      clearTimeout(timer);
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [calculateTargetPosition, handleSkip, pathname, removeStaticCurtain]);

  // Route Navigation Interceptor:
  // If the user navigates while the intro is playing, immediately dismiss it so they see their destination!
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
      ref={overlayRef}
      id="lumiere-intro-overlay"
      className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-auto bg-transparent"
      aria-label="LUMIÈRE Atelier Prologue"
      role="dialog"
      aria-modal="true"
    >
      {/* Dual Couture Silk Curtain Panels */}
      {/* Left Silk Curtain Panel */}
      <div
        ref={leftCurtainRef}
        id="curtain-panel-left"
        className="absolute inset-y-0 left-0 w-1/2 bg-[#08080a] border-r border-[#C59B48]/15 shadow-[10px_0_30px_rgba(0,0,0,0.8)] will-change-transform"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(197,155,72,0.06)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* Right Silk Curtain Panel */}
      <div
        ref={rightCurtainRef}
        id="curtain-panel-right"
        className="absolute inset-y-0 right-0 w-1/2 bg-[#08080a] border-l border-[#C59B48]/15 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] will-change-transform"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(197,155,72,0.06)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* Skip Button for Accessibility */}
      <button
        ref={skipBtnRef}
        type="button"
        onClick={handleSkip}
        className="pointer-events-auto absolute bottom-8 right-8 z-30 text-[10px] uppercase font-mono tracking-[0.25em] text-[#a1a1aa] hover:text-[#C59B48] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C59B48]/40 px-4 py-2 rounded-full transition-all focus:outline-hidden focus:ring-1 focus:ring-[#C59B48]"
        aria-label="Skip prologue animation"
      >
        Skip Prologue [Esc]
      </button>

      {/* Central Haute Atelier Stage */}
      <div
        ref={stageCenterRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
      >
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(197,155,72,0.14)_0%,transparent_70%)] pointer-events-none" />

        {/* 1. The Sovereign Monogram (Master Vector Stroke Draw) */}
        <svg
          ref={monogramSvgRef}
          viewBox="0 0 256 256"
          width="84"
          height="84"
          className="mb-5 filter drop-shadow-[0_0_20px_rgba(197,155,72,0.45)] will-change-transform"
          role="img"
          aria-label="LUMIÈRE Sovereign Monogram"
        >
          {/* Sovereign "L" Vector Path */}
          <path
            ref={monogramPathRef}
            d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"
            stroke="#C59B48"
            strokeWidth="1.75"
            strokeDasharray="560"
            strokeDashoffset="560"
            fill="transparent"
          />
          {/* Sovereign Diamond Gemstone / Star */}
          <polygon
            ref={diamondGemRef}
            points="144,80 174,110 144,140 114,110"
            fill="#C59B48"
            style={{ transform: "scale(0)", opacity: 0, transformOrigin: "center center" }}
          />
        </svg>

        {/* 2. Haute Couture Didone Wordmark (Letter-by-Letter Awakening) */}
        <div
          ref={wordmarkContainerRef}
          className="flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.42em] uppercase select-none mb-2 pl-2"
        >
          {WORDMARK_CHARS.map((char, index) => (
            <span
              key={index}
              className="lumiere-didone-char inline-block will-change-transform"
              style={{ opacity: 0, transform: "translateY(12px)", filter: "blur(6px)" }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* 3. Haute Atelier Heritage Badge */}
        <div
          ref={atelierBadgeRef}
          className="space-y-1.5 will-change-transform"
          style={{ opacity: 0, transform: "translateY(8px)" }}
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.55em] text-[#C59B48] uppercase font-mono block">
            Haute Horlogerie & Fashion Atelier
          </span>
          <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.4em] text-[#a1a1aa] uppercase font-sans block opacity-75">
            New Delhi • Paris • Geneva • Tokyo
          </span>
        </div>

        {/* 4. Fine 1px Expanding Golden Divider */}
        <div
          ref={dividerLineRef}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C59B48] to-transparent my-3.5"
          style={{ transform: "scaleX(0)", transformOrigin: "center center" }}
        />

        {/* 5. Authentic Indian Craft Provenance */}
        <div
          ref={provenanceRef}
          className="flex flex-col items-center gap-1.5 will-change-transform"
          style={{ opacity: 0, transform: "translateY(6px)" }}
        >
          <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.35em] text-[#d4d4d8] uppercase font-sans opacity-80">
            Hand-Loomed Chanderi • Bespoke Tailoring • Luxury Curations
          </span>
        </div>
      </div>
    </div>
  );
}
