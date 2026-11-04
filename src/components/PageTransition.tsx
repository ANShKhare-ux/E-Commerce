"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { LUXURY_EASE, useSafeReducedMotion } from "@/lib/motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.38,
            ease: LUXURY_EASE,
          }}
          className="w-full flex-1 flex flex-col animate-page-entrance"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
