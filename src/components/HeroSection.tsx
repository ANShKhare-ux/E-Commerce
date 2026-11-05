"use client";

import React from "react";
import { SafeImage as Image } from "@/components/SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { HomepageConfig } from "@/types";
import { LUXURY_EASE, useSafeReducedMotion } from "@/lib/motion";

interface HeroSectionProps {
  hero: HomepageConfig["hero"];
}

export function HeroSection({ hero }: HeroSectionProps) {
  const shouldReduceMotion = useSafeReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: LUXURY_EASE,
      },
    },
  };

  return (
    <section className="relative h-[85vh] min-h-[580px] w-full bg-noir-900 overflow-hidden flex items-center">
      {/* Background Hero Image with Slow Cinematic Scale */}
      <motion.div
        initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.02, opacity: 0.45 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.6, ease: LUXURY_EASE }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={hero.image_url || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=85"}
          alt="LUMIÈRE Campaign Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-noir-900/40 to-transparent" />

      {/* Animated Hero Typography & CTAs */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white">
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="max-w-2xl space-y-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-600/30 border border-gold-500/40 backdrop-blur-md rounded-full text-gold-300 text-[11px] font-semibold tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{hero.badge_text}</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] font-light text-canvas-light"
          >
            {hero.headline_line1} <br />
            <span className="italic font-normal text-gold-300">{hero.headline_line2}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-noir-300 max-w-lg font-light leading-relaxed"
          >
            {hero.subheading}
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="pt-2 flex flex-wrap gap-4">
            <Link
              href={hero.primary_button_link || "/category/ethnic-wear"}
              className="bg-gold-600 hover:bg-gold-500 text-noir-900 px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-luxury flex items-center gap-2 shadow-subtle hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{hero.primary_button_text || "Explore Collection"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={hero.secondary_button_link || "/outfits"}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-luxury backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              {hero.secondary_button_text || "Curated Looks"}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
