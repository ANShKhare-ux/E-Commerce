"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LUXURY_EASE } from "@/lib/motion";

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  align?: "left" | "center";
  className?: string;
  badgeColorClass?: string;
  linkColorClass?: string;
}

export function SectionHeading({
  badge,
  badgeIcon,
  title,
  subtitle,
  linkText,
  linkHref,
  align = "left",
  className = "",
  badgeColorClass = "text-gold-600",
  linkColorClass = "text-noir-700 hover:text-gold-600",
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: LUXURY_EASE,
      },
    },
  };

  if (align === "center") {
    return (
      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className={`text-center max-w-2xl mx-auto space-y-2 ${className}`}
      >
        {badge && (
          <motion.div variants={itemVariants}>
            <span className={`text-[10px] font-bold tracking-[0.3em] uppercase inline-flex items-center gap-1.5 ${badgeColorClass}`}>
              {badgeIcon}
              <span>{badge}</span>
            </span>
          </motion.div>
        )}
        <motion.h2
          variants={itemVariants}
          className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium tracking-wide"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm text-noir-500 font-light leading-relaxed max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`flex flex-col sm:flex-row sm:items-end justify-between border-b border-canvas-border pb-4 gap-3 ${className}`}
    >
      <div className="space-y-1">
        {badge && (
          <motion.div variants={itemVariants}>
            <span className={`text-[10px] font-bold tracking-[0.3em] uppercase inline-flex items-center gap-1.5 ${badgeColorClass}`}>
              {badgeIcon}
              <span>{badge}</span>
            </span>
          </motion.div>
        )}
        <motion.h2
          variants={itemVariants}
          className="font-serif text-2xl sm:text-3xl text-noir-900 font-medium tracking-wide"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="text-xs text-noir-500 font-light"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {linkHref && linkText && (
        <motion.div variants={itemVariants}>
          <Link
            href={linkHref}
            className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 group transition-colors ${linkColorClass}`}
          >
            <span>{linkText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SectionHeading;
