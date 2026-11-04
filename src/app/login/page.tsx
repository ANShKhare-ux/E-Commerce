"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, Key } from "lucide-react";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || searchParams.get("next") || "/account";
  const redirectUrl = getSafeRedirectUrl(rawRedirect);
  const urlError = searchParams.get("error_description") || searchParams.get("error");
  const urlMessage = searchParams.get("message");

  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder-project") &&
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    !(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.includes("placeholder")
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(urlError || "");
  const [successMsg, setSuccessMsg] = useState(urlMessage || "");

  // Sync incoming URL errors or success notices
  useEffect(() => {
    if (urlError) setErrorMsg(urlError);
  }, [urlError]);

  useEffect(() => {
    if (urlMessage) setSuccessMsg(urlMessage);
  }, [urlMessage]);

  // If already authenticated on client, seamlessly forward to destination
  useEffect(() => {
    let isMounted = true;
    try {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (isMounted && session?.user) {
          router.replace(redirectUrl);
        }
      });
    } catch {
      // non-blocking
    }
    return () => {
      isMounted = false;
    };
  }, [redirectUrl, router]);

  // Field-level touched & validation state for real-time validation
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError =
    touched.email && !email.trim()
      ? "Email address is required."
      : touched.email && !EMAIL_REGEX.test(email.trim())
      ? "Please enter a valid email address."
      : "";

  const passwordError =
    touched.password && !password
      ? "Password is required."
      : touched.password && password.length < 6
      ? "Password must be at least 6 characters."
      : "";

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (loading || googleLoading) return;
    setErrorMsg("");
    setSuccessMsg("");

    if (!isSupabaseConfigured) {
      setErrorMsg(
        "Supabase authentication is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local to enable live sign-in."
      );
      return;
    }

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
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Atelier Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block group" aria-label="LUMIÈRE Atelier Home">
          <span className="font-serif text-3xl tracking-[0.25em] font-bold text-noir-900 uppercase block group-hover:text-gold-600 transition-colors">
            LUMIÈRE
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gold-600 uppercase font-mono block mt-0.5">
            Atelier • India
          </span>
        </Link>
        <h1 className="font-serif text-xl text-noir-800 font-medium pt-2">
          Sign In to LUMIÈRE
        </h1>
        <p className="text-xs text-noir-500 font-light">
          Access your wardrobe dashboard, order tracking, and private drops.
        </p>
      </div>

      {/* Supabase Connection Notice if keys not set */}
      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-sm text-xs text-amber-800 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-amber-900">
            <Key className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Development Mode: Supabase Connection Pending</span>
          </div>
          <p className="text-[11px] text-amber-700 leading-relaxed font-light">
            Live authentication requires your <code className="bg-amber-100/80 px-1 py-0.5 rounded text-amber-900 font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-amber-100/80 px-1 py-0.5 rounded text-amber-900 font-mono">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> in <code className="bg-amber-100/80 px-1 py-0.5 rounded text-amber-900 font-mono">.env.local</code>.
          </p>
        </div>
      )}

      {/* Global Alerts */}
      {errorMsg && (
        <div
          role="alert"
          aria-live="polite"
          className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-sm flex items-start gap-2.5 text-xs animate-in fade-in duration-200"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p>{errorMsg}</p>
        </div>
      )}

      {successMsg && (
        <div
          role="status"
          aria-live="polite"
          className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-sm flex items-start gap-2.5 text-xs animate-in fade-in duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p>{successMsg}</p>
        </div>
      )}

      {/* Login Card */}
      <div className="bg-white border border-[#eaeaec] rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        {/* Google OAuth Button */}
        <GoogleSignInButton
          redirectUrl={redirectUrl}
          onStart={() => {
            setErrorMsg("");
            setSuccessMsg("");
          }}
          onError={setErrorMsg}
          onLoadingChange={setGoogleLoading}
          disabled={loading || googleLoading}
        />

        {/* Atelier Divider */}
        <div className="relative" aria-hidden="true">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#eaeaec]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest text-noir-400">
            <span className="bg-white px-3 text-noir-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleLogin} noValidate className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="login-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
                placeholder="your.email@example.com"
                className={`w-full bg-white border ${
                  emailError ? "border-rose-500 focus:border-rose-500" : "border-[#eaeaec] focus:border-noir-900"
                } rounded-sm pl-10 pr-4 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-hidden focus:ring-1 ${
                  emailError ? "focus:ring-rose-500" : "focus:ring-noir-900"
                } transition-colors`}
              />
              <Mail className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" aria-hidden="true" />
            </div>
            {emailError && (
              <p id="email-error" role="alert" className="text-[11px] text-rose-600 font-medium mt-1">
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block"
              >
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
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "password-error" : undefined}
                placeholder="••••••••••••"
                className={`w-full bg-white border ${
                  passwordError ? "border-rose-500 focus:border-rose-500" : "border-[#eaeaec] focus:border-noir-900"
                } rounded-sm pl-10 pr-10 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-hidden focus:ring-1 ${
                  passwordError ? "focus:ring-rose-500" : "focus:ring-noir-900"
                } transition-colors`}
              />
              <Lock className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-noir-400 hover:text-noir-600 transition-colors focus:outline-hidden"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {passwordError && (
              <p id="password-error" role="alert" className="text-[11px] text-rose-600 font-medium mt-1">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="border-t border-[#eaeaec] pt-4 text-center">
          <p className="text-xs text-noir-500">
            Don&apos;t have a LUMIÈRE account?{" "}
            <Link
              href={`/signup${redirectUrl !== "/account" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="text-noir-900 font-bold hover:text-gold-600 transition-colors underline"
            >
              Create your account
            </Link>
          </p>
        </div>
      </div>

      {/* Atelier Security and Privacy notice */}
      <div className="text-center space-y-2">
        <p className="text-[11px] text-noir-500">
          By signing in, you acknowledge LUMIÈRE&apos;s{" "}
          <Link href="/privacy" className="text-gold-600 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-gold-600 hover:underline">
            Terms of Service
          </Link>
          .
        </p>
        <div>
          <Link
            href="/"
            className="text-xs text-noir-500 hover:text-noir-900 transition-colors inline-block"
          >
            ← Return to LUMIÈRE Storefront
          </Link>
        </div>
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
