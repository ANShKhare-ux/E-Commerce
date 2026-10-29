"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";
  const urlError = searchParams.get("error");
  const urlMessage = searchParams.get("message");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(urlError || "");
  const [successMsg, setSuccessMsg] = useState(urlMessage || "");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Safe relative redirect
        const safeDestination =
          redirectUrl.startsWith("/") && !redirectUrl.startsWith("//")
            ? redirectUrl
            : "/account";

        router.push(safeDestination);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          Patron Sign In
        </h1>
        <p className="text-xs text-noir-500 font-light">
          Access your curated wardrobe, Delhivery tracking, and saved measurements.
        </p>
      </div>

      {/* Messages */}
      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-sm flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-sm flex items-start gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>{successMsg}</p>
        </div>
      )}

      {/* Login Card */}
      <div className="bg-white border border-canvas-border rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block">
              Email Address
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-gold-600 hover:text-gold-700 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Atelier</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="border-t border-canvas-border pt-4 text-center">
          <p className="text-xs text-noir-500">
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup${redirectUrl !== "/account" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="text-noir-900 font-bold hover:text-gold-600 transition-colors underline"
            >
              Create Patron Account
            </Link>
          </p>
        </div>
      </div>

      {/* Back to store */}
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

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-canvas-subtle flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-xs text-noir-500 font-mono">Loading authentication...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

