'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim(), honeypot: '' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNewsletterStatus('success');
        setNewsletterMsg(data.message);
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterMsg(data.error || 'Please enter a valid email address.');
      }
    } catch {
      setNewsletterStatus('error');
      setNewsletterMsg('Network error. Please try again.');
    }
  };

  return (
    <footer className="bg-[#141414] text-[#FAF9F6] border-t border-[#2A2A2A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2A2A2A]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.2em] font-light text-white">
                LUMIÈRE
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-[#8C887F] font-sans">
                Atelier Fashion Discovery
              </span>
            </Link>
            <p className="text-xs text-[#A8A49A] max-w-sm leading-relaxed font-light">
              An independent, editorial-first contemporary fashion curation platform for India.
              Discover exceptional garments from top retailers including Myntra, Ajio, Tata CLiQ,
              and Amazon.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-widest font-medium text-white mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                Join The Fashion Journal
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="bg-[#1F1F1F] border border-[#333333] px-3.5 py-2 text-xs text-white placeholder:text-[#666666] focus:outline-none focus:border-[#D4AF37] flex-1 rounded-none"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="bg-[#FAF9F6] text-[#141414] px-4 py-2 text-xs uppercase tracking-widest font-medium hover:bg-[#EAE8E2] transition-colors disabled:opacity-60"
                >
                  {newsletterStatus === 'loading' ? '...' : 'Join'}
                </button>
              </form>
              {newsletterStatus === 'success' && (
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {newsletterMsg}
                </p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-xs text-rose-400 mt-2">{newsletterMsg}</p>
              )}
            </div>
          </div>

          {/* Wardrobe Discovery */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
              Wardrobe
            </h3>
            <ul className="space-y-2 text-xs text-[#A8A49A]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?audience=men" className="hover:text-white transition-colors">
                  Men’s Fashion
                </Link>
              </li>
              <li>
                <Link href="/shop?audience=women" className="hover:text-white transition-colors">
                  Women’s Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/shirts" className="hover:text-white transition-colors">
                  Linen & Oxford Shirts
                </Link>
              </li>
              <li>
                <Link href="/categories/dresses" className="hover:text-white transition-colors">
                  Silk & Contemporary Dresses
                </Link>
              </li>
              <li>
                <Link href="/categories/jeans" className="hover:text-white transition-colors">
                  Selvedge & Wide Denim
                </Link>
              </li>
              <li>
                <Link href="/categories/ethnic-wear" className="hover:text-white transition-colors">
                  Handcrafted Ethnic Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Curated Edits */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
              Curated Edits
            </h3>
            <ul className="space-y-2 text-xs text-[#A8A49A]">
              <li>
                <Link href="/collections/trending-now" className="hover:text-white transition-colors">
                  Trending Now
                </Link>
              </li>
              <li>
                <Link href="/collections/under-999" className="hover:text-white transition-colors">
                  Under ₹999 Finds
                </Link>
              </li>
              <li>
                <Link href="/collections/everyday-essentials" className="hover:text-white transition-colors">
                  Everyday Essentials
                </Link>
              </li>
              <li>
                <Link href="/collections/premium-picks" className="hover:text-white transition-colors">
                  Premium & Designer Picks
                </Link>
              </li>
              <li>
                <Link href="/collections/seasonal-style" className="hover:text-white transition-colors">
                  Seasonal Style Edit
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Company */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-xs text-[#A8A49A]">
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-white transition-colors flex items-center gap-1">
                  Affiliate Disclosure
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Platform
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Concierge & Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Paragraph */}
        <div className="py-8 border-b border-[#2A2A2A] text-[11px] text-[#8C887F] leading-relaxed">
          <div className="flex items-start gap-2.5 max-w-4xl">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <p>
              <strong>Affiliate Disclosure:</strong> LUMIÈRE is an independent fashion discovery and affiliate marketing website.
              We curate clothing from authorized third-party fashion retailers including Myntra, AJIO, Tata CLiQ, Amazon India, and Nykaa Fashion.
              When you click on &ldquo;Shop Now&rdquo; links and complete a qualifying purchase on the merchant’s website, we may earn an affiliate commission at no additional cost to you.
              We do not stock, pack, ship, or process customer payments directly. All prices, sizing availability, delivery terms, and order handling are governed solely by the respective merchant.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C887F]">
          <p>© {new Date().getFullYear()} LUMIÈRE Atelier Fashion. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Primary Market: India (INR ₹)</span>
            <Link href="/affiliate-disclosure" className="hover:text-white underline underline-offset-2">
              FTC / ASCI Advertising Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
