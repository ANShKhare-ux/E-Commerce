"use client";

import React, { useState, Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
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
  Check,
  X,
} from "lucide-react";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

interface PasswordStrength {
  score: number; // 0 to 4
  label: "Very Weak" | "Weak" | "Fair" | "Good" | "Strong";
  color: string;
  hasMinLength: boolean;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

function calculatePasswordStrength(pass: string): PasswordStrength {
  const hasMinLength = pass.length >= 8;
  const hasLower = /[a-z]/.test(pass);
  const hasUpper = /[A-Z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pass);

  let score = 0;
  if (hasMinLength) score++;
  if (hasLower && hasUpper) score++;
  if (hasNumber) score++;
  if (hasSpecial) score++;

  let label: PasswordStrength["label"] = "Very Weak";
  let color = "bg-rose-500";

  if (score === 1) {
    label = "Weak";
    color = "bg-rose-500";
  } else if (score === 2) {
    label = "Fair";
    color = "bg-amber-500";
  } else if (score === 3) {
    label = "Good";
    color = "bg-[#C59B48]";
  } else if (score === 4) {
    label = "Strong";
    color = "bg-emerald-600";
  }

  return {
    score,
    label,
    color,
    hasMinLength,
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
  };
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || searchParams.get("next") || "/account";
  const redirectUrl = getSafeRedirectUrl(rawRedirect);
  const urlError = searchParams.get("error_description") || searchParams.get("error");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(urlError || "");
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Field touched state for real-time validation
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const strength = useMemo(() => calculatePasswordStrength(password), [password]);

  const fullNameError =
    touched.fullName && !fullName.trim()
      ? "Full legal name is required."
      : touched.fullName && fullName.trim().length < 2
      ? "Full legal name must be at least 2 characters."
      : "";

  const emailError =
    touched.email && !email.trim()
      ? "Email address is required."
      : touched.email && !EMAIL_REGEX.test(email.trim())
      ? "Please enter a valid email address."
      : "";

  const passwordError =
    touched.password && !password
      ? "Password is required."
      : touched.password && password.length < 8
      ? "Password must be at least 8 characters."
      : "";

  const confirmPasswordError =
    touched.confirmPassword && !confirmPassword
      ? "Please re-enter your password to confirm."
      : touched.confirmPassword && confirmPassword !== password
      ? "Passwords do not match."
      : "";

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (loading || googleLoading) return;
    setErrorMsg("");

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg("Please enter your full legal name.");
      return;
    }

    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg("Please accept the Terms of Service and Privacy Policy to proceed.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";

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

      // Check if user already exists
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setErrorMsg("An account with this email already exists. Please sign in instead.");
        setLoading(false);
        return;
      }

      // Auto-confirmed session
      if (data.session) {
        router.push(redirectUrl);
        router.refresh();
      } else {
        // Verification email sent
        setRegisteredSuccess(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected registration error occurred.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  if (registeredSuccess) {
    return (
      <div className="w-full max-w-md bg-white border border-[#eaeaec] rounded-sm p-6 sm:p-8 shadow-xs text-center space-y-5 animate-in fade-in duration-300">
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
        <div className="bg-[#faf9f5] border border-[#f0e3cc] p-3.5 rounded-sm text-left text-xs text-noir-700 space-y-1.5">
          <p className="font-semibold text-noir-900">Next Steps:</p>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-noir-600">
            <li>Open your inbox and look for the LUMIÈRE verification email.</li>
            <li>Click the secure link to activate your account.</li>
            <li>You will be seamlessly redirected to your wardrobe dashboard.</li>
          </ol>
        </div>
        <p className="text-[11px] text-noir-500">
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
        <Link href="/" className="inline-block group" aria-label="LUMIÈRE Atelier Home">
          <span className="font-serif text-3xl tracking-[0.25em] font-bold text-noir-900 uppercase block group-hover:text-gold-600 transition-colors">
            LUMIÈRE
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gold-600 uppercase font-mono block mt-0.5">
            Atelier • India
          </span>
        </Link>
        <h1 className="font-serif text-xl text-noir-800 font-medium pt-2">
          Create Your Account
        </h1>
        <p className="text-xs text-noir-500 font-light">
          Join LUMIÈRE for curated Indian luxury, concierge fulfillment, and private drops.
        </p>
      </div>

      {/* Global Error Alert */}
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

      {/* Registration Card */}
      <div className="bg-white border border-[#eaeaec] rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        {/* Google OAuth */}
        <GoogleSignInButton
          redirectUrl={redirectUrl}
          onStart={() => setErrorMsg("")}
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
              Or register with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSignup} noValidate className="space-y-4">
          {/* Full Legal Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="signup-name"
              className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block"
            >
              Full Legal Name *
            </label>
            <div className="relative">
              <input
                id="signup-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => handleBlur("fullName")}
                aria-invalid={!!fullNameError}
                aria-describedby={fullNameError ? "name-error" : undefined}
                placeholder="e.g. Radhika Sharma"
                className={`w-full bg-white border ${
                  fullNameError ? "border-rose-500 focus:border-rose-500" : "border-[#eaeaec] focus:border-noir-900"
                } rounded-sm pl-10 pr-4 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-hidden focus:ring-1 ${
                  fullNameError ? "focus:ring-rose-500" : "focus:ring-noir-900"
                } transition-colors`}
              />
              <User className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" aria-hidden="true" />
            </div>
            {fullNameError && (
              <p id="name-error" role="alert" className="text-[11px] text-rose-600 font-medium mt-1">
                {fullNameError}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="signup-email"
              className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block"
            >
              Email Address *
            </label>
            <div className="relative">
              <input
                id="signup-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
                placeholder="radhika@example.com"
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
            <label
              htmlFor="signup-password"
              className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block"
            >
              Master Password * (Min 8 Characters)
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                aria-invalid={!!passwordError}
                aria-describedby="password-rules"
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

            {/* Password Strength Meter */}
            {password.length > 0 && (
              <div id="password-rules" className="space-y-2 pt-1 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-noir-500">Security Strength:</span>
                  <span className="font-semibold text-noir-800">{strength.label}</span>
                </div>
                {/* 4-segment strength bar */}
                <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full rounded-full transition-colors duration-300 ${
                        step <= strength.score ? strength.color : "bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                {/* Requirements Checklist */}
                <div className="grid grid-cols-2 gap-1 text-[10px] text-noir-500 pt-1">
                  <div className={`flex items-center gap-1 ${strength.hasMinLength ? "text-emerald-700 font-medium" : ""}`}>
                    {strength.hasMinLength ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-noir-400" />}
                    <span>8+ characters</span>
                  </div>
                  <div className={`flex items-center gap-1 ${strength.hasUpper && strength.hasLower ? "text-emerald-700 font-medium" : ""}`}>
                    {strength.hasUpper && strength.hasLower ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-noir-400" />}
                    <span>Upper & lowercase</span>
                  </div>
                  <div className={`flex items-center gap-1 ${strength.hasNumber ? "text-emerald-700 font-medium" : ""}`}>
                    {strength.hasNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-noir-400" />}
                    <span>At least 1 number</span>
                  </div>
                  <div className={`flex items-center gap-1 ${strength.hasSpecial ? "text-emerald-700 font-medium" : ""}`}>
                    {strength.hasSpecial ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-noir-400" />}
                    <span>Special character</span>
                  </div>
                </div>
              </div>
            )}
            {passwordError && (
              <p role="alert" className="text-[11px] text-rose-600 font-medium mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="signup-confirm-password"
              className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block"
            >
              Confirm Master Password *
            </label>
            <div className="relative">
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                aria-invalid={!!confirmPasswordError}
                aria-describedby={confirmPasswordError ? "confirm-error" : undefined}
                placeholder="••••••••••••"
                className={`w-full bg-white border ${
                  confirmPasswordError ? "border-rose-500 focus:border-rose-500" : "border-[#eaeaec] focus:border-noir-900"
                } rounded-sm pl-10 pr-10 py-2.5 text-xs text-noir-900 placeholder-noir-400 focus:outline-hidden focus:ring-1 ${
                  confirmPasswordError ? "focus:ring-rose-500" : "focus:ring-noir-900"
                } transition-colors`}
              />
              <Lock className="w-4 h-4 text-noir-400 absolute left-3.5 top-3" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-3 text-noir-400 hover:text-noir-600 transition-colors focus:outline-hidden"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {confirmPasswordError && (
              <p id="confirm-error" role="alert" className="text-[11px] text-rose-600 font-medium mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {/* Statutory Terms & Privacy Consent */}
          <div className="pt-2 space-y-3">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-noir-600 select-none">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-[#eaeaec] text-gold-600 focus:ring-gold-500 h-4 w-4"
              />
              <span className="text-[11px] leading-relaxed">
                I agree to LUMIÈRE&apos;s{" "}
                <Link href="/terms" className="text-noir-900 font-semibold underline hover:text-gold-600" target="_blank">
                  Terms of Service
                </Link>{" "}
                and acknowledge the{" "}
                <Link href="/privacy" className="text-noir-900 font-semibold underline hover:text-gold-600" target="_blank">
                  Privacy Policy
                </Link>{" "}
                in accordance with DPDP Act, 2023.
              </span>
            </label>

            <div className="flex items-start gap-2 text-[11px] text-noir-500 bg-[#faf9f5] border border-[#f0e3cc] p-2.5 rounded-sm">
              <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Your profile is protected by PostgreSQL Row Level Security (RLS). We never sell or broker your personal information.
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading || !agreedToTerms}
            className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="border-t border-[#eaeaec] pt-4 text-center">
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
          className="text-xs text-noir-500 hover:text-noir-900 transition-colors inline-block"
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
