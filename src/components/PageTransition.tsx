"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount (SSR and initial hydration), force initial={false} to ensure
  // 100% attribute parity between server HTML and client DOM without opacity:0 styles.
  // After mount, respect user motion preferences for route transitions.
  const isReduced = Boolean(mounted && shouldReduceMotion);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        key={pathname}
        initial={mounted && !isReduced ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{
          duration: isReduced ? 0 : 0.15,
          ease: "easeOut",
        }}
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
