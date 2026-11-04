"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/motion";

/**
 * ScrollProgress Component
 * Fixed, ultra-thin gold progress bar reflecting real user scroll position across LUMIÈRE.
 * Positioned above the sticky navigation bar without obstructing interaction.
 */
export function ScrollProgress() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useSafeReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth luxury spring damping to prevent jagged scroll rendering
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isExcluded =
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (!mounted || shouldReduceMotion || isExcluded) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none overflow-hidden"
    >
      <motion.div
        className="w-full h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 shadow-[0_0_8px_rgba(197,155,72,0.45)]"
        style={{
          scaleX,
          transformOrigin: "0% 50%",
        }}
      />
    </div>
  );
}

export default ScrollProgress;
