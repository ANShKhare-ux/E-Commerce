"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, CheckCircle2, ShieldAlert, ArrowRight, ShieldCheck, Truck, Lock } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (pathname?.startsWith("/admin")) {
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
    <footer className="bg-noir-900 text-canvas-light border-t border-noir-800">
      {/* 1. Newsletter & Privilege Club Bar */}
      <div className="border-b border-noir-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-400 block mb-2">
              The LUMIÈRE Gazette
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl tracking-wide font-normal text-white">
              Private Previews & Handloom Stories
            </h3>
            <p className="text-noir-400 text-sm mt-2 font-light">
              Receive confidential lookbooks, festive drop schedules, and artisanal craft dispatches.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            <div className="flex bg-noir-800 border border-noir-700 p-1 rounded-sm focus-within:border-gold-500 transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-transparent text-sm px-3 py-2 flex-1 text-white placeholder-noir-500 focus:outline-none"
                disabled={status === "loading" || status === "success"}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-gold-600 hover:bg-gold-500 text-noir-900 px-5 py-2 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {status === "success" && (
              <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{message}</span>
              </p>
            )}
            {status === "error" && (
              <p className="text-rose-400 text-xs mt-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>{message}</span>
              </p>
            )}
          </form>
        </div>
      </div>

      {/* 2. Primary Navigation Columns */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Profile (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl tracking-[0.25em] text-white font-bold uppercase block">
              LUMIÈRE
            </span>
            <span className="text-[9px] tracking-[0.35em] text-gold-400 uppercase block font-sans">
              Atelier & Horlogerie • India
            </span>
          </Link>
          <p className="text-noir-400 text-xs leading-relaxed max-w-sm">
            LUMIÈRE curates and manufactures modern Indian luxury apparel. We pair timeless indigenous handlooms with
            contemporary architectural tailoring, alongside verified global luxury partner discoveries.
          </p>
          <div className="text-xs text-noir-400 space-y-1 pt-2">
            <p className="text-white font-medium">LUMIÈRE Central Atelier & Hub</p>
            <p>Royal Opera House District, Girgaon, Mumbai 400004</p>
            <p>Concierge: <a href="mailto:concierge@lumiere.in" className="text-gold-400 hover:underline">concierge@lumiere.in</a></p>
            <p>Helpline: <span className="text-noir-300 font-medium">+91 22 4900 8800</span> (Mon–Sat, 10 AM – 7 PM IST)</p>
          </div>
          {/* Social Links */}
          <div className="pt-2 flex items-center gap-4 text-xs">
            <a
              href="https://instagram.com/lumiere.atelier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-noir-400 hover:text-gold-400 font-medium transition-colors"
            >
              Instagram
            </a>
            <span className="text-noir-700">•</span>
            <a
              href="https://x.com/lumiere_india"
              target="_blank"
              rel="noopener noreferrer"
              className="text-noir-400 hover:text-gold-400 font-medium transition-colors"
            >
              X (Twitter)
            </a>
            <span className="text-noir-700">•</span>
            <a
              href="https://pinterest.com/lumiere_luxury"
              target="_blank"
              rel="noopener noreferrer"
              className="text-noir-400 hover:text-gold-400 font-medium transition-colors"
            >
              Pinterest
            </a>
            <span className="text-noir-700">•</span>
            <a
              href="https://youtube.com/@lumiere_atelier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-noir-400 hover:text-gold-400 font-medium transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Group A: CUSTOMER SERVICE */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Customer Service
          </h4>
          <ul className="space-y-2 text-xs text-noir-400 font-light">
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:text-white transition-colors">
                Shipping Information
              </Link>
            </li>
            <li>
              <Link href="/returns-policy" className="hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/cancellation-policy" className="hover:text-white transition-colors">
                Order Cancellation
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-gold-400 transition-colors font-medium">
                Track Delhivery Parcel
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-white transition-colors">
                Patron Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Group B: LEGAL */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Legal
          </h4>
          <ul className="space-y-2 text-xs text-noir-400 font-light">
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
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
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/intellectual-property" className="hover:text-white transition-colors">
                Intellectual Property Policy
              </Link>
            </li>
            <li>
              <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">
                Affiliate Disclosure
              </Link>
            </li>
          </ul>
        </div>

        {/* Group C: INFORMATION */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Information
          </h4>
          <ul className="space-y-2 text-xs text-noir-400 font-light">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/payment-policy" className="hover:text-white transition-colors">
                Payment Policy
              </Link>
            </li>
            <li>
              <Link href="/grievance-redressal" className="hover:text-white transition-colors font-medium text-gold-300">
                Grievance Redressal
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility Statement
              </Link>
            </li>
            <li>
              <Link href="/authenticity" className="hover:text-white transition-colors">
                Product Authenticity
              </Link>
            </li>
            <li>
              <Link href="/size-guide" className="hover:text-white transition-colors">
                Size & Fit Guide
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-white transition-colors text-noir-600">
                Staff Control Room
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Statutory Trust Badges & Compliance Bar */}
      <div className="border-t border-noir-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-noir-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-noir-300">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
              <span>RBI 2FA / PCI-DSS Secured</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-noir-300">
              <Truck className="w-3.5 h-3.5 text-gold-500" />
              <span>Delhivery Express Logistics (19,000+ PINs)</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-noir-300">
              <Lock className="w-3.5 h-3.5 text-gold-500" />
              <span>DPDP Act 2023 Compliant</span>
            </span>
          </div>

          <div className="text-[11px] text-noir-400 text-center sm:text-right">
            <span>Market: Republic of India Only</span>
            <span className="mx-2">•</span>
            <span>GSTIN: 27AABCL9841K1Z3</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Legal Copyright Bar */}
      <div className="border-t border-noir-800/60 py-6 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-noir-500 font-light">
        <p>
          © {new Date().getFullYear()} [LUMIÈRE Luxury Retail Private Limited]. All rights reserved. Registered under the Companies Act, 2013 (CIN: [U18109MH2025PTC000000]).
        </p>
        <p className="mt-1">
          All retail prices authoritatively displayed in Indian Rupees (₹) inclusive of 12% Goods and Services Tax (GST) applicable to apparel and textiles.
        </p>
      </div>
    </footer>
  );
}
