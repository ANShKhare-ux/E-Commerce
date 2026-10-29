"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const origin = window.location.origin;

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        // Log error internally if needed, but do not leak account existence
        console.error("Password reset error:", error);
      }

      // Always show safe user-friendly confirmation without disclosing account existence
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-subtle flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group">
            <span className="font-serif text-3xl tracking-[0.25em] font-bold text-noir-900 uppercase block group-hover:text-gold-600 transition-colors">
              LUMIÈRE
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gold-600 uppercase font-mono block mt-0.5">
              Atelier • India
            </span>
          </Link>
          <h1 className="font-serif text-xl text-noir-800 font-medium pt-2">
            Reset Password
          </h1>
          <p className="text-xs text-noir-500 font-light">
            Enter your patron email address to receive password recovery instructions.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-sm flex items-start gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {submitted ? (
          <div className="bg-white border border-canvas-border rounded-sm p-6 sm:p-8 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-lg font-bold text-noir-900">
              Instructions Dispatched
            </h2>
            <p className="text-xs text-noir-600 leading-relaxed">
              If an account is associated with{" "}
              <strong className="text-noir-900 font-semibold">{email}</strong>, you will receive a secure password recovery link shortly.
            </p>
            <p className="text-[11px] text-noir-400">
              Please check your spam or junk folder if the email does not arrive within a few minutes.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-noir-900 hover:text-gold-600 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-canvas-border rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block">
                  Registered Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@lumiere.in"
                    className="w-full bg-white border border-canvas-border rounded-sm pl-10 pr-4 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
                  />
                  <Mail className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending Recovery Link...</span>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="border-t border-canvas-border pt-4 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-noir-600 hover:text-noir-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
