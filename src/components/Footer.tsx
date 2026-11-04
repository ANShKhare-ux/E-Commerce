"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Truck,
  Lock,
  Sparkles,
} from "lucide-react";
import { LUXURY_EASE, useSafeReducedMotion } from "@/lib/motion";

export function Footer() {
  const pathname = usePathname();
  const shouldReduceMotion = useSafeReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (pathname?.startsWith("/admin") || isAuthRoute) {
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing to LUMIÈRE.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to subscribe.");
      }
    } catch {
      setStatus("error");
      setMessage("Service unavailable. Please try again later.");
    }
  };

  return (
    <motion.footer
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: LUXURY_EASE }}
      className="bg-noir-900 text-canvas-light border-t border-noir-800 relative z-20 overflow-hidden"
    >
      {/* Subtle Background Ambience Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Newsletter & Private Patron Club Bar */}
      <div className="border-b border-noir-800/80 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-gold-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                The LUMIÈRE Gazette
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-wide">
              Private Previews & Handloom Stories
            </h3>
            <p className="text-noir-400 text-xs sm:text-sm font-light leading-relaxed">
              Receive confidential lookbooks, festive drop schedules, and artisanal craft dispatches from our Mumbai ateliers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            <div className="flex bg-noir-800/90 border border-noir-700/80 p-1.5 rounded-sm focus-within:border-gold-500/80 transition-all shadow-inner">
              <div className="pl-2.5 flex items-center pointer-events-none text-noir-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-transparent text-xs sm:text-sm px-3 py-2 flex-1 text-white placeholder-noir-500 focus:outline-none"
                disabled={status === "loading" || status === "success"}
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-gold-600 hover:bg-gold-500 text-noir-900 px-5 py-2.5 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 transition-all duration-200 active:scale-95 disabled:opacity-50 rounded-xs"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {status === "success" && (
              <p className="text-emerald-400 text-xs mt-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </p>
            )}
            {status === "error" && (
              <p className="text-rose-400 text-xs mt-2.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </p>
            )}
          </form>
        </div>
      </div>

      {/* 2. Primary Navigation Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Section 1: Brand Identity & Distinctive Hover Texture */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group focus:outline-none">
              <div className="relative inline-block select-none py-1">
                {/* Golden Ambient Glow Aura on Hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/20 blur-xl transition-all duration-700 rounded-full pointer-events-none"
                />

                {/* Base Layer: Crisp high-contrast Didone capitals with graceful fallback transition */}
                <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-white font-bold uppercase block transition-colors duration-500 group-hover:text-gold-300">
                  LUMIÈRE
                </span>

                {/* Texture Layer: Woven Zari Silk & Micro-Textile clipped inside letters */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 font-serif text-3xl sm:text-4xl tracking-[0.25em] font-bold uppercase lumiere-woven-texture lumiere-text-clipped opacity-0 group-hover:opacity-100 lumiere-touch-ambient transition-opacity duration-700 ease-out group-hover:animate-silk-shimmer pointer-events-none"
                >
                  LUMIÈRE
                </span>
              </div>
              <span className="text-[9px] tracking-[0.35em] text-gold-400 uppercase block font-sans mt-1">
                Atelier & Haute Horlogerie • Mumbai
              </span>
            </Link>

            <p className="text-noir-400 text-xs leading-relaxed max-w-sm font-light">
              LUMIÈRE curates and manufactures modern Indian luxury apparel. We pair timeless indigenous handlooms (Chanderi silk, Banarasi brocades) with contemporary architectural tailoring and verified luxury affiliate curations.
            </p>

            <div className="text-xs text-noir-400 space-y-1.5 pt-2 border-t border-noir-800/80 font-light">
              <p className="text-white font-medium">LUMIÈRE Central Atelier & Hub</p>
              <p>Royal Opera House District, Girgaon, Mumbai 400004</p>
              <p>
                Concierge:{" "}
                <a href="mailto:concierge@lumiere.in" className="text-gold-400 hover:text-gold-300 underline-offset-2 hover:underline">
                  concierge@lumiere.in
                </a>
              </p>
              <p>
                Helpline:{" "}
                <span className="text-noir-300 font-medium">+91 22 4900 8800</span> (Mon–Sat, 10 AM – 7 PM IST)
              </p>
            </div>
          </div>

          {/* Section 2: Shop Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400 pb-1 border-b border-noir-800 inline-block">
              Shop Atelier
            </h4>
            <ul className="space-y-2 text-xs text-noir-400 font-light pt-2">
              <li>
                <Link href="/category/mens-clothing" className="hover:text-gold-300 transition-colors">
                  Men&apos;s Tailoring
                </Link>
              </li>
              <li>
                <Link href="/category/womens-clothing" className="hover:text-gold-300 transition-colors">
                  Women&apos;s Silks & Sets
                </Link>
              </li>
              <li>
                <Link href="/category/streetwear" className="hover:text-gold-300 transition-colors">
                  District Zero Streetwear
                </Link>
              </li>
              <li>
                <Link href="/category/ethnic-wear" className="hover:text-gold-300 transition-colors">
                  Artisanal Handlooms
                </Link>
              </li>
              <li>
                <Link href="/category/premium-luxury" className="hover:text-gold-300 transition-colors">
                  Haute Horlogerie
                </Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="hover:text-gold-300 transition-colors flex items-center gap-1">
                  <span>New Arrivals</span>
                  <span className="text-[9px] text-gold-400 uppercase font-bold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-gold-300 transition-colors text-red-400">
                  Private Archive Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Customer Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400 pb-1 border-b border-noir-800 inline-block">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-noir-400 font-light pt-2">
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold-300 transition-colors">
                  Client FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-gold-300 transition-colors">
                  Shipping & PIN Codes
                </Link>
              </li>
              <li>
                <Link href="/returns-policy" className="hover:text-gold-300 transition-colors">
                  7-Day Inspected Returns
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-gold-300 transition-colors">
                  Order Cancellation
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-gold-300 transition-colors text-gold-400 font-medium">
                  Track Delhivery Parcel
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-gold-300 transition-colors">
                  Size & Fit Guide
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-gold-300 transition-colors">
                  My Account & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: About the Brand */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400 pb-1 border-b border-noir-800 inline-block">
              About LUMIÈRE
            </h4>
            <ul className="space-y-2 text-xs text-noir-400 font-light pt-2">
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  Artisanal Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/authenticity" className="hover:text-gold-300 transition-colors">
                  Authenticity & GI Tags
                </Link>
              </li>
              <li>
                <Link href="/outfits" className="hover:text-gold-300 transition-colors">
                  Editorial Lookbooks
                </Link>
              </li>
              <li>
                <Link href="/grievance-redressal" className="hover:text-gold-300 transition-colors">
                  Grievance Redressal
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-gold-300 transition-colors">
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-gold-300 transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold-300 transition-colors text-noir-500">
                  Staff Control Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 5: Social Media & Legal Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400 pb-1 border-b border-noir-800 inline-block">
              Connect & Legal
            </h4>

            {/* Social Links with Elegant Hover */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-noir-500 block">Social Channels</span>
              <div className="flex flex-col space-y-1.5 text-xs text-noir-400 font-light">
                <a
                  href="https://instagram.com/lumiere.atelier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-3.5 h-3.5 text-gold-500/80 group-hover:text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://x.com/lumiere_india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-3.5 h-3.5 text-gold-500/80 group-hover:text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X (Twitter)</span>
                </a>
                <a
                  href="https://pinterest.com/lumiere_luxury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-3.5 h-3.5 text-gold-500/80 group-hover:text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                  <span>Pinterest</span>
                </a>
                <a
                  href="https://youtube.com/@lumiere_atelier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-3.5 h-3.5 text-gold-500/80 group-hover:text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            {/* Core Legal Routes */}
            <div className="space-y-1 pt-2 border-t border-noir-800/80">
              <span className="text-[10px] uppercase tracking-wider text-noir-500 block">Policies</span>
              <ul className="space-y-1 text-xs text-noir-400 font-light">
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-white transition-colors">
                    Store Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/intellectual-property" className="hover:text-white transition-colors">
                    IP Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Statutory Trust Badges & Compliance Bar */}
      <div className="border-t border-noir-800/90 py-6 px-4 sm:px-6 lg:px-8 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-noir-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-noir-300">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
              <span>RBI 2FA / PCI-DSS Secured</span>
            </span>
            <span className="text-noir-700">•</span>
            <span className="flex items-center gap-1.5 text-noir-300">
              <Truck className="w-3.5 h-3.5 text-gold-500" />
              <span>Delhivery Express Logistics (19,000+ PINs)</span>
            </span>
            <span className="text-noir-700">•</span>
            <span className="flex items-center gap-1.5 text-noir-300">
              <Lock className="w-3.5 h-3.5 text-gold-500" />
              <span>DPDP Act 2023 Compliant</span>
            </span>
          </div>

          <div className="text-[11px] text-noir-400 text-center sm:text-right">
            <span>Market: Republic of India Only</span>
            <span className="mx-2 text-noir-700">•</span>
            <span>GSTIN: 27AABCL9841K1Z3</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Legal Copyright Bar */}
      <div className="border-t border-noir-800/60 py-6 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-noir-500 font-light bg-black/60">
        <div className="max-w-7xl mx-auto space-y-1">
          <p>
            © {new Date().getFullYear()} LUMIÈRE Luxury Retail Private Limited. All rights reserved. Registered under the Companies Act, 2013 (CIN: U18109MH2025PTC000000).
          </p>
          <p>
            All retail prices authoritatively calculated in Indian Rupees (₹) inclusive of 12% Goods and Services Tax (GST) applicable to luxury apparel and handcrafted textiles.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
