"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

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
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={variantsMap[variant]}
      transition={{
        duration,
        ease: LUXURY_EASE,
        delay,
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
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      variants={itemVariantsMap[variant] || itemVariantsMap["fade-up"]}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export default ScrollReveal;
