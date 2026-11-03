"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { LUXURY_EASE, useSafeReducedMotion } from "@/lib/motion";

export type ScrollRevealVariant = "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right" | "stagger";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  margin?: string;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer";
}

const variantsMap: Record<ScrollRevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.95, y: 16 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.55,
  className = "",
  margin = "-50px",
  as = "div",
}: ScrollRevealProps) {
  const shouldReduceMotion = useSafeReducedMotion();

  const MotionComponent = (motion[as as keyof typeof motion] as React.ElementType) || motion.div;

  const reducedVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
        delay: 0,
        staggerChildren: 0,
        delayChildren: 0,
      },
    },
  };

  return (
    <MotionComponent
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={shouldReduceMotion ? reducedVariant : variantsMap[variant]}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        ease: LUXURY_EASE,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

const itemVariantsMap: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: LUXURY_EASE },
    },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: LUXURY_EASE },
    },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.45, ease: LUXURY_EASE },
    },
  },
};

interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "scale-up" | "fade-in";
  as?: "div" | "article" | "li" | "span";
}

export function ScrollRevealItem({
  children,
  className = "",
  variant = "fade-up",
  as = "div",
}: ScrollRevealItemProps) {
  const shouldReduceMotion = useSafeReducedMotion();

  const MotionComponent = (motion[as as keyof typeof motion] as React.ElementType) || motion.div;

  const reducedItemVariant: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0, delay: 0 },
    },
  };

  return (
    <MotionComponent
      variants={shouldReduceMotion ? reducedItemVariant : (itemVariantsMap[variant] || itemVariantsMap["fade-up"])}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export default ScrollReveal;
