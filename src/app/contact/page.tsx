"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { Mail, Phone, MapPin, CheckCircle2, Loader2, Clock, ShieldCheck } from "lucide-react";

const tableOfContents = [
  { id: "concierge-channels", label: "Concierge Channels" },
  { id: "inquiry-form", label: "Direct Inquiry Form" },
  { id: "business-hours", label: "Atelier Operating Hours" },
];

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
    <LegalPageLayout
      title="Contact Us & Client Concierge"
      subtitle="Our Mumbai styling concierge, order support, and artisan desks are at your service."
      lastUpdated="October 31, 2025"
      effectiveDate="November 1, 2025"
      category="service"
      tableOfContents={tableOfContents}
    >
      <div className="space-y-8">
        {/* Contact Info Grid */}
        <section id="concierge-channels" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#C59B48]">
              <MapPin className="w-4 h-4" />
              <strong className="text-noir-900 font-serif">Mumbai Atelier</strong>
            </div>
            <p className="text-noir-600">
              [LUMIÈRE Luxury Retail Private Limited]<br />
              Royal Opera House District, Girgaon,<br />
              Mumbai, Maharashtra 400004
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#C59B48]">
              <Mail className="w-4 h-4" />
              <strong className="text-noir-900 font-serif">Email Desks</strong>
            </div>
            <p className="text-noir-600">
              Orders: <a href="mailto:concierge@lumiere.in" className="text-[#C59B48] underline">concierge@lumiere.in</a><br />
              Privacy: <a href="mailto:privacy@lumiere.in" className="text-[#C59B48] underline">privacy@lumiere.in</a><br />
              Grievance: <a href="mailto:grievance@lumiere.in" className="text-[#C59B48] underline">grievance@lumiere.in</a>
            </p>
          </div>

          <div className="bg-white border border-[#eaeaec] p-4 rounded-sm space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#C59B48]">
              <Phone className="w-4 h-4" />
              <strong className="text-noir-900 font-serif">Telephone Helpline</strong>
            </div>
            <p className="text-noir-600">
              +91 22 4900 8800<br />
              <span className="text-[11px] text-noir-400">Monday–Saturday: 10:00 AM – 7:00 PM IST</span><br />
              WhatsApp styling concierge available for VIP patrons
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="inquiry-form" className="bg-white border border-[#eaeaec] p-6 sm:p-8 rounded-sm">
          <h2 className="font-serif text-lg font-bold text-noir-900 mb-2">Send an Atelier Inquiry</h2>
          <p className="text-xs text-noir-500 mb-6">
            Please fill in your details below. For order inquiries, including your Order ID expedites response times.
          </p>

          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-medium text-noir-900">Message Received</h3>
              <p className="text-xs text-noir-500 max-w-sm mx-auto">
                Thank you for reaching out. A senior concierge officer will contact you within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-semibold text-noir-800 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anandita Bose"
                  className="w-full bg-white border border-[#eaeaec] px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-noir-800 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="anandita@example.com"
                  className="w-full bg-white border border-[#eaeaec] px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-noir-800 mb-1">Order Number (if applicable)</label>
                <input
                  type="text"
                  placeholder="LUM-2025-XXXXXX"
                  className="w-full bg-white border border-[#eaeaec] px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-noir-800 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How may our concierge assist your wardrobe or order requirements?"
                  className="w-full bg-white border border-[#eaeaec] px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-noir-900 hover:bg-[#C59B48] text-white py-3 px-8 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Message"}
              </button>
            </form>
          )}
        </section>

        {/* Operating Hours Note */}
        <section id="business-hours" className="bg-[#f9f9fb] border border-[#eaeaec] p-4 rounded-sm flex items-start gap-3 text-xs text-noir-600">
          <Clock className="w-4 h-4 text-[#C59B48] shrink-0 mt-0.5" />
          <div>
            <strong className="text-noir-900 block font-serif">Operating Hours & Response Commitment</strong>
            <p>
              Monday through Saturday, 10:00 AM – 7:00 PM IST (excluding Indian national gazetted holidays). Inquiries submitted after hours are addressed at the start of the following business day.
            </p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
