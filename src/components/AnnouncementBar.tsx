"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Truck, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { AnnouncementBarMessage } from "@/types";

const DEFAULT_ANNOUNCEMENTS: AnnouncementBarMessage[] = [
  {
    id: "ann-1",
    badge: "Festive Edit",
    message: "Autumn / Winter 2025 Handloom & Streetwear Drops Live",
    link: "/products",
    is_active: true,
  },
  {
    id: "ann-2",
    badge: "Complimentary Delivery",
    message: "Complimentary Delhivery Express Shipping Across India Above ₹2,999",
    link: "/shipping-policy",
    is_active: true,
  },
  {
    id: "ann-3",
    badge: "Special Code",
    message: "Use code FIRSTBUY for ₹300 off on your first order above ₹1,499",
    link: "/products",
    is_active: true,
  },
];

export function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState<AnnouncementBarMessage[]>(DEFAULT_ANNOUNCEMENTS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Attempt fetching live admin-configured announcements
    fetch("/api/admin/homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config?.announcements?.length > 0) {
          const active = data.config.announcements.filter((a: AnnouncementBarMessage) => a.is_active);
          if (active.length > 0) {
            setAnnouncements(active);
          }
        }
      })
      .catch(() => {
        // Fallback to default
      });
  }, []);

  // Auto rotate every 4.5 seconds
  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  const current = announcements[currentIndex] || announcements[0];

  return (
    <div className="bg-noir-900 text-canvas-light text-[11px] font-medium tracking-wider uppercase border-b border-noir-800 h-9 flex items-center justify-between px-3 sm:px-6 relative overflow-hidden">
      {/* Prev arrow (desktop) */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1))}
        className="hidden sm:flex text-noir-400 hover:text-white p-1 transition-colors"
        aria-label="Previous announcement"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Main message */}
      <div className="flex-1 flex items-center justify-center text-center gap-2 truncate px-2">
        <span className="inline-flex items-center gap-1 text-gold-400 font-bold shrink-0">
          <Sparkles className="w-3 h-3 text-gold-400" />
          <span>{current.badge}</span>
        </span>
        <span className="text-noir-500 hidden sm:inline">•</span>
        {current.link ? (
          <Link
            href={current.link}
            className="truncate hover:text-gold-300 hover:underline transition-colors text-noir-200"
          >
            {current.message}
          </Link>
        ) : (
          <span className="truncate text-noir-200">{current.message}</span>
        )}
      </div>

      {/* Next arrow (desktop) */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
        className="hidden sm:flex text-noir-400 hover:text-white p-1 transition-colors"
        aria-label="Next announcement"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
