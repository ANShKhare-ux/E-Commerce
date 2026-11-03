"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * ScrollProgress Component
 * Fixed, ultra-thin gold progress bar reflecting real user scroll position across LUMIÈRE.
 * Positioned above the sticky navigation bar without obstructing interaction.
 */
export function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
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

  if (!mounted || shouldReduceMotion) {
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
