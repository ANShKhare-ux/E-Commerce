'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), honeypot: '' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setMsg(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error || 'Please enter a valid email address.');
      }
    } catch {
      setStatus('error');
      setMsg('Network error. Please try again.');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#141414] text-[#FAF9F6] p-8 sm:p-12 border border-[#2A2A2A] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-lg space-y-2 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono flex items-center justify-center md:justify-start gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            The LUMIÈRE Dispatch
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light">
            Curated Edits Delivered Weekly
          </h2>
          <p className="text-xs text-[#A8A49A] leading-relaxed font-light">
            Receive our curated selections of new arrivals, verified discount finds, and editorial fabric spotlights directly in your inbox. No spam, zero markups.
          </p>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="homepage-newsletter-email" className="sr-only">
              Email Address
            </label>
            <input
              id="homepage-newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 bg-[#1F1F1F] border border-[#333333] px-4 py-3 text-xs text-white placeholder:text-[#666666] focus:outline-none focus:border-[#D4AF37] rounded-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-[#FAF9F6] text-[#141414] text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </button>
          </form>

          {status === 'success' && (
            <p className="text-xs text-emerald-400 mt-2.5 flex items-center gap-1.5 justify-center md:justify-start">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{msg}</span>
            </p>
          )}

          {status === 'error' && (
            <p className="text-xs text-rose-400 mt-2.5 flex items-center gap-1.5 justify-center md:justify-start">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{msg}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
