"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ruler, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<"mens" | "womens" | "streetwear" | "ethnic">("streetwear");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block">
          Measurement Architecture
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-noir-900 font-medium">
          LUMIÈRE Size & Fit Guide
        </h1>
        <p className="text-xs sm:text-sm text-noir-500 font-light leading-relaxed">
          Standardized measurements for Indian physiques across our atelier handloom cuts, tailored menswear, and boxy streetwear drops.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-canvas-border">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          {[
            { id: "streetwear", label: "Streetwear & Oversized" },
            { id: "mens", label: "Men's Tailoring" },
            { id: "womens", label: "Women's Collection" },
            { id: "ethnic", label: "Royal Ethnic Wear" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-noir-900 text-noir-900 font-extrabold"
                  : "border-transparent text-noir-500 hover:text-noir-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tables based on activeTab */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-subtle overflow-hidden p-6 sm:p-8 space-y-6">
        {activeTab === "streetwear" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-medium text-noir-900">
                District Zero Oversized Fits (Hoodies & Boxy T-Shirts)
              </h3>
              <span className="text-[11px] text-gold-700 bg-gold-50 px-2.5 py-1 rounded font-mono">
                Measurements in Inches
              </span>
            </div>
            <p className="text-xs text-noir-500 font-light leading-relaxed">
              Cut with dropped shoulders and a wider chest for a contemporary boxy drape. Buy your regular size for an authentic oversized silhouette.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-canvas-border">
                <thead className="bg-canvas-subtle text-noir-600 text-[11px] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest (To Fit)</th>
                    <th className="py-3 px-4">Garment Chest Width</th>
                    <th className="py-3 px-4">Length</th>
                    <th className="py-3 px-4">Shoulder Drop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-canvas-border font-medium text-noir-800">
                  <tr><td className="py-3 px-4 font-bold">XS</td><td className="py-3 px-4">34" - 36"</td><td className="py-3 px-4">42"</td><td className="py-3 px-4">27.5"</td><td className="py-3 px-4">20.5"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">S</td><td className="py-3 px-4">36" - 38"</td><td className="py-3 px-4">44"</td><td className="py-3 px-4">28.5"</td><td className="py-3 px-4">21.5"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">M</td><td className="py-3 px-4">38" - 40"</td><td className="py-3 px-4">46"</td><td className="py-3 px-4">29.5"</td><td className="py-3 px-4">22.5"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">L</td><td className="py-3 px-4">40" - 42"</td><td className="py-3 px-4">48"</td><td className="py-3 px-4">30.5"</td><td className="py-3 px-4">23.5"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">XL</td><td className="py-3 px-4">42" - 44"</td><td className="py-3 px-4">50"</td><td className="py-3 px-4">31.5"</td><td className="py-3 px-4">24.5"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">XXL</td><td className="py-3 px-4">44" - 46"</td><td className="py-3 px-4">52"</td><td className="py-3 px-4">32.5"</td><td className="py-3 px-4">25.5"</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "mens" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-medium text-noir-900">
                Men's Sartorial Tailoring (Shirts & Trousers)
              </h3>
              <span className="text-[11px] text-gold-700 bg-gold-50 px-2.5 py-1 rounded font-mono">
                Measurements in Inches
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-canvas-border">
                <thead className="bg-canvas-subtle text-noir-600 text-[11px] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Waist</th>
                    <th className="py-3 px-4">Trouser Inseam</th>
                    <th className="py-3 px-4">Collar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-canvas-border font-medium text-noir-800">
                  <tr><td className="py-3 px-4 font-bold">S (38)</td><td className="py-3 px-4">38"</td><td className="py-3 px-4">30" - 31"</td><td className="py-3 px-4">30"</td><td className="py-3 px-4">15"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">M (40)</td><td className="py-3 px-4">40"</td><td className="py-3 px-4">32" - 33"</td><td className="py-3 px-4">31"</td><td className="py-3 px-4">15.5"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">L (42)</td><td className="py-3 px-4">42"</td><td className="py-3 px-4">34" - 35"</td><td className="py-3 px-4">32"</td><td className="py-3 px-4">16"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">XL (44)</td><td className="py-3 px-4">44"</td><td className="py-3 px-4">36" - 37"</td><td className="py-3 px-4">32.5"</td><td className="py-3 px-4">16.5"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">XXL (46)</td><td className="py-3 px-4">46"</td><td className="py-3 px-4">38" - 39"</td><td className="py-3 px-4">33"</td><td className="py-3 px-4">17"</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "womens" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-medium text-noir-900">
                Women's Silks & Contemporary Linens
              </h3>
              <span className="text-[11px] text-gold-700 bg-gold-50 px-2.5 py-1 rounded font-mono">
                Measurements in Inches
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-canvas-border">
                <thead className="bg-canvas-subtle text-noir-600 text-[11px] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Bust</th>
                    <th className="py-3 px-4">Waist</th>
                    <th className="py-3 px-4">Hip</th>
                    <th className="py-3 px-4">Kurta / Dress Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-canvas-border font-medium text-noir-800">
                  <tr><td className="py-3 px-4 font-bold">XS (32)</td><td className="py-3 px-4">32"</td><td className="py-3 px-4">26"</td><td className="py-3 px-4">36"</td><td className="py-3 px-4">46"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">S (34)</td><td className="py-3 px-4">34"</td><td className="py-3 px-4">28"</td><td className="py-3 px-4">38"</td><td className="py-3 px-4">47"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">M (36)</td><td className="py-3 px-4">36"</td><td className="py-3 px-4">30"</td><td className="py-3 px-4">40"</td><td className="py-3 px-4">48"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">L (38)</td><td className="py-3 px-4">38"</td><td className="py-3 px-4">32"</td><td className="py-3 px-4">42"</td><td className="py-3 px-4">48.5"</td></tr>
                  <tr><td className="py-3 px-4 font-bold">XL (40)</td><td className="py-3 px-4">40"</td><td className="py-3 px-4">34"</td><td className="py-3 px-4">44"</td><td className="py-3 px-4">49"</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "ethnic" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-medium text-noir-900">
                Royal Rajasthan & Varanasi Handloom Heirloom Sets
              </h3>
              <span className="text-[11px] text-gold-700 bg-gold-50 px-2.5 py-1 rounded font-mono">
                Measurements in Inches
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-canvas-border">
                <thead className="bg-canvas-subtle text-noir-600 text-[11px] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Standard Size</th>
                    <th className="py-3 px-4">Chest / Bust</th>
                    <th className="py-3 px-4">Kurta Length</th>
                    <th className="py-3 px-4">Pajama / Trouser Waist</th>
                    <th className="py-3 px-4">Dupatta Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-canvas-border font-medium text-noir-800">
                  <tr><td className="py-3 px-4 font-bold">S</td><td className="py-3 px-4">36"</td><td className="py-3 px-4">44"</td><td className="py-3 px-4">Elasticated (28"-32")</td><td className="py-3 px-4">2.5 meters</td></tr>
                  <tr><td className="py-3 px-4 font-bold">M</td><td className="py-3 px-4">38"</td><td className="py-3 px-4">45"</td><td className="py-3 px-4">Elasticated (30"-34")</td><td className="py-3 px-4">2.5 meters</td></tr>
                  <tr><td className="py-3 px-4 font-bold">L</td><td className="py-3 px-4">40"</td><td className="py-3 px-4">46"</td><td className="py-3 px-4">Elasticated (32"-36")</td><td className="py-3 px-4">2.5 meters</td></tr>
                  <tr><td className="py-3 px-4 font-bold">XL</td><td className="py-3 px-4">42"</td><td className="py-3 px-4">46.5"</td><td className="py-3 px-4">Elasticated (34"-38")</td><td className="py-3 px-4">2.5 meters</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Measuring Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 bg-canvas-subtle border border-canvas-border rounded-sm text-xs space-y-4 md:space-y-0">
        <div className="space-y-1">
          <h4 className="font-bold text-noir-900 uppercase tracking-wider">1. Chest & Bust</h4>
          <p className="text-noir-600 leading-relaxed font-light">
            Measure around the fullest part of your chest, keeping the measuring tape parallel to the floor under your arms.
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-noir-900 uppercase tracking-wider">2. Waist</h4>
          <p className="text-noir-600 leading-relaxed font-light">
            Measure around your natural waistline, typically situated right above your hip bones and navel.
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-noir-900 uppercase tracking-wider">3. Inseam</h4>
          <p className="text-noir-600 leading-relaxed font-light">
            Measure from the crotch point down along the inner leg to the top of the shoe ankle.
          </p>
        </div>
      </div>

      {/* Support CTA */}
      <div className="text-center p-8 bg-white border border-canvas-border rounded-sm space-y-3">
        <h3 className="font-serif text-xl font-medium text-noir-900">
          Unsure About Sizing?
        </h3>
        <p className="text-xs text-noir-500 max-w-md mx-auto">
          Our Mumbai atelier stylists are available Monday through Saturday to provide tailored sizing advice before you place an order.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
          >
            <span>Consult Atelier Stylist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
