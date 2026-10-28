'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Mail, Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[e.target.name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFieldErrors({});
    setMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Submission failed. Please check form inputs.');
        if (data.issues) {
          setFieldErrors(data.issues);
        }
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Contact Concierge' }]} />

      <div className="border-b border-border pb-6 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-accent" />
          Customer Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-primary">
          Inquiries & Partnership
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed font-light">
          Have questions regarding our curations, retailer links, or wish to suggest a merchant for indexing? Connect with our team.
        </p>
      </div>

      {/* Demonstration Banner */}
      <div className="p-4 bg-[#F4F3EF] border-l-2 border-primary text-xs text-muted flex items-start gap-3">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-primary">Demonstration Environment Notice</p>
          <p className="leading-relaxed">
            This contact form performs real-time client and server validation via Zod schemas and tests honeypot bot defense. In this local/demo deployment, messages are verified and logged in memory without dispatching live emails.
          </p>
        </div>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 bg-surface p-6 sm:p-8 border border-border-subtle shadow-subtle">
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-honeypot">Leave blank</label>
          <input
            id="contact-honeypot"
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-primary font-medium mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Priya Sharma"
              className="w-full px-3.5 py-2.5 bg-surface border border-border text-xs text-primary focus:outline-none focus:border-primary rounded-none"
            />
            {fieldErrors.name && (
              <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-primary font-medium mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. priya@example.com"
              className="w-full px-3.5 py-2.5 bg-surface border border-border text-xs text-primary focus:outline-none focus:border-primary rounded-none"
            />
            {fieldErrors.email && (
              <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.email[0]}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wider text-primary font-medium mb-1.5">
            Subject <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Inquiring about linen shirts curation"
            className="w-full px-3.5 py-2.5 bg-surface border border-border text-xs text-primary focus:outline-none focus:border-primary rounded-none"
          />
          {fieldErrors.subject && (
            <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.subject[0]}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-primary font-medium mb-1.5">
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail your feedback, merchant suggestion, or discovery question..."
            className="w-full px-3.5 py-2.5 bg-surface border border-border text-xs text-primary focus:outline-none focus:border-primary rounded-none"
          />
          {fieldErrors.message && (
            <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.message[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors disabled:opacity-60"
        >
          <span>{status === 'loading' ? 'Verifying...' : 'Submit Message'}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
