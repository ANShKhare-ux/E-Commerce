"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full legal name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters with letters and numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const origin = window.location.origin;

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(redirectUrl)}`,
        },
      });

      if (error) {
        setErrorMsg(error.message || "Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      // Check if email confirmation is required by Supabase
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setErrorMsg("An account with this email already exists. Please sign in instead.");
        setLoading(false);
        return;
      }

      // If email confirmation email was sent or auto-confirmed
      if (data.session) {
        // Auto-confirmed, direct to intended destination
        router.push(redirectUrl);
        router.refresh();
      } else {
        // Confirmation email sent
        setRegisteredSuccess(true);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected registration error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (registeredSuccess) {
    return (
      <div className="w-full max-w-md bg-white border border-canvas-border rounded-sm p-6 sm:p-8 shadow-xs text-center space-y-5">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-xl font-bold text-noir-900">
          Verify Your Atelier Account
        </h2>
        <p className="text-xs text-noir-600 leading-relaxed">
          We have dispatched a verification email to{" "}
          <strong className="text-noir-900 font-semibold">{email}</strong>.
        </p>
        <div className="bg-canvas-subtle border border-canvas-border p-3.5 rounded-sm text-left text-xs text-noir-600 space-y-1.5">
          <p className="font-semibold text-noir-900">Next Steps:</p>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-noir-500">
            <li>Open your inbox and look for the LUMIÈRE verification link.</li>
            <li>Click the link to activate your patron profile.</li>
            <li>You will be automatically redirected to your wardrobe dashboard.</li>
          </ol>
        </div>
        <p className="text-[11px] text-noir-400">
          Didn&apos;t receive it? Check your spam/junk folder or{" "}
          <Link href="/login" className="text-gold-600 font-bold hover:underline">
            return to Sign In
          </Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Atelier Header */}
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
          Create Patron Account
        </h1>
        <p className="text-xs text-noir-500 font-light">
          Join LUMIÈRE for curated Indian luxury, concierge fulfillment, and private drops.
        </p>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-sm flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Registration Form */}
      <div className="bg-white border border-canvas-border rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block">
              Full Legal Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Radhika Sharma"
                className="w-full bg-white border border-canvas-border rounded-sm pl-10 pr-4 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
              />
              <User className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="radhika@example.com"
                className="w-full bg-white border border-canvas-border rounded-sm pl-10 pr-4 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
              />
              <Mail className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block">
              Master Password * (Min 8 Characters)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-canvas-border rounded-sm pl-10 pr-10 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
              />
              <Lock className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-noir-400 hover:text-noir-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block">
              Confirm Master Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-canvas-border rounded-sm pl-10 pr-4 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
              />
              <Lock className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-[11px] text-noir-500">
            <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
            <span>
              Your profile is secured by PostgreSQL Row Level Security (RLS). We never sell your personal information.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            {loading ? (
              <span>Creating Patron Account...</span>
            ) : (
              <>
                <span>Register Patron Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="border-t border-canvas-border pt-4 text-center">
          <p className="text-xs text-noir-500">
            Already registered with LUMIÈRE?{" "}
            <Link
              href={`/login${redirectUrl !== "/account" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="text-noir-900 font-bold hover:text-gold-600 transition-colors underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="text-xs text-noir-500 hover:text-noir-900 transition-colors"
        >
          ← Return to LUMIÈRE Storefront
        </Link>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-canvas-subtle flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-xs text-noir-500 font-mono">Loading registration...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}

