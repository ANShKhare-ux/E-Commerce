"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-canvas-border pb-6 max-w-xl">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Client Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Contact LUMIÈRE
        </h1>
        <p className="text-xs text-noir-500 font-light mt-1">
          Our Mumbai styling concierge and orders team is at your disposal Monday through Saturday, 10:00 AM – 7:00 PM IST.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 space-y-6 text-xs text-noir-600">
          <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-noir-900 block mb-0.5">Mumbai Central Atelier & Hub</strong>
                <p>Royal Opera House District, Girgaon, Mumbai, Maharashtra 400004</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-noir-900 block mb-0.5">Email Inquiries</strong>
                <p><a href="mailto:concierge@lumiere.in" className="text-gold-700 hover:underline">concierge@lumiere.in</a></p>
                <p className="text-[11px] text-noir-400">Response within 4 business hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-noir-900 block mb-0.5">Direct Helpline</strong>
                <p>+91 22 4900 8800</p>
                <p className="text-[11px] text-noir-400">Mon–Sat, 10 AM to 7 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 bg-white border border-canvas-border p-6 sm:p-8 rounded-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-medium text-noir-900">Message Received</h3>
              <p className="text-xs text-noir-500 max-w-sm mx-auto">
                Thank you for reaching out. A senior concierge officer will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-noir-800 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anandita Bose"
                  className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-noir-800 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="anandita@example.com"
                  className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-noir-800 mb-1">Order Number (if applicable)</label>
                <input
                  type="text"
                  placeholder="LUM-2025-XXXXXX"
                  className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-noir-800 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How may our concierge assist your wardrobe requirements?"
                  className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3 px-6 text-xs font-bold uppercase tracking-widest rounded-luxury transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
