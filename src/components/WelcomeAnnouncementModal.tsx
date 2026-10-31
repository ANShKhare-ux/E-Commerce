"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Sparkles, Truck, Copy, Check, ArrowRight } from "lucide-react";

// Module-level flags persisting across client-side page transitions in this window
let initialEntryCompleted = false;

export function WelcomeAnnouncementModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do not show on admin routes
    if (pathname?.startsWith("/admin")) return;

    // Clear stale keys from previous buggy iterations to unblock immediate display
    try {
      localStorage.removeItem("lumiere_welcome_popup_shown");
      sessionStorage.removeItem("lumiere_welcome_popup_shown");
      sessionStorage.removeItem("lumiere_session_active");
    } catch {}

    // 1. If previously dismissed in this browser session, do not show
    const isDismissed = sessionStorage.getItem("lumiere_popup_dismissed") === "true";
    if (isDismissed) return;

    // 2. Rule: "not show that window when user enter the main page from the website itself"
    // If the user has already navigated within the site and is now entering the main page ('/'), DO NOT show
    const isMainPage = pathname === "/" || pathname === "";
    if (initialEntryCompleted && isMainPage) {
      return;
    }

    // 3. Prevent duplicate trigger in current mount cycle
    if (hasTriggeredRef.current) return;

    // 4. Show on initial entry to the website with a quick, smooth 400ms delay
    const timer = setTimeout(() => {
      hasTriggeredRef.current = true;
      initialEntryCompleted = true;
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle closing modal
  const handleClose = () => {
    setIsOpen(false);
    initialEntryCompleted = true;
    try {
      sessionStorage.setItem("lumiere_popup_dismissed", "true");
    } catch {}
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText("FIRSTBUY");
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-md shadow-2xl border border-[#eaeaec] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#b38636] via-[#C59B48] to-[#e6ca85]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-noir-400 hover:text-noir-900 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close welcome announcement"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Brand Identity */}
        <div className="pt-7 pb-4 px-6 sm:px-8 text-center">
          <div className="flex justify-center mb-3">
            <Image
              src="/brand/lumiere-lockup-horizontal.svg"
              alt="LUMIÈRE Atelier"
              width={160}
              height={50}
              unoptimized
              priority
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>

          <span className="text-[10px] font-bold tracking-[0.25em] text-[#C59B48] uppercase block">
            Exclusive Patron Privilege
          </span>

          <h3
            id="welcome-modal-title"
            className="font-serif text-2xl font-bold text-noir-900 mt-1"
          >
            Welcome to LUMIÈRE
          </h3>

          <p className="text-xs text-noir-600 mt-2 max-w-sm mx-auto leading-relaxed">
            Discover artisanal Indian handloom silks, 450 GSM heavyweight
            streetwear, and bespoke atelier tailoring.
          </p>
        </div>

        {/* First Buy Voucher Card */}
        <div className="mx-6 sm:mx-8 p-4 bg-[#faf9f5] border border-dashed border-[#C59B48]/70 rounded-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B48] block">
                Inaugural Order Privilege
              </span>
              <span className="font-mono text-lg font-extrabold tracking-wider text-noir-900">
                FIRSTBUY
              </span>
              <p className="text-[11px] text-noir-600 mt-0.5">
                Save ₹300 on your first purchase above ₹1,499
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="shrink-0 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 bg-[#C59B48] hover:bg-gold-600 text-white shadow-sm"
              aria-label="Copy voucher code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Highlights & Logistics Features */}
        <div className="mt-4 mx-6 sm:mx-8 space-y-2.5">
          <div className="flex items-center gap-3 p-2.5 rounded bg-gray-50/70 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gold-50 text-[#C59B48] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-noir-900 block">
                Complimentary Delhivery Express Delivery
              </span>
              <span className="text-[11px] text-noir-500 block">
                Free tracked shipping across all Indian PIN codes above ₹2,999
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded bg-gray-50/70 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gold-50 text-[#C59B48] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-noir-900 block">
                Autumn / Winter 2025 Drops Live
              </span>
              <span className="text-[11px] text-noir-500 block">
                Chanderi silk lehengas & 450 GSM boxy hoodies ready to dispatch
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 p-6 pt-2 flex flex-col sm:flex-row gap-2.5 bg-white">
          <Link
            href="/products"
            onClick={handleClose}
            className="flex-1 py-3 px-4 bg-noir-900 hover:bg-noir-800 text-white text-xs font-bold uppercase tracking-widest text-center rounded transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleClose}
            className="py-3 px-5 border border-[#d4d5d9] hover:border-noir-900 text-noir-700 hover:text-noir-900 text-xs font-bold uppercase tracking-wider rounded transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
