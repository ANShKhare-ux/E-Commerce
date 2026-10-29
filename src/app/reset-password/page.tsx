"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [sessionChecking, setSessionChecking] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setHasValidSession(true);
      } else {
        setErrorMsg("Your password reset link is invalid, expired, or has already been used.");
      }
      setSessionChecking(false);
    };

    checkSession();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Failed to update password.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/account");
      }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
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
            Create New Password
          </h1>
          <p className="text-xs text-noir-500 font-light">
            Set a new secure master password for your patron account.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-sm flex items-start gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {success ? (
          <div className="bg-white border border-canvas-border rounded-sm p-6 sm:p-8 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-lg font-bold text-noir-900">
              Password Successfully Updated
            </h2>
            <p className="text-xs text-noir-600">
              Your patron credentials have been updated. Redirecting you to your wardrobe dashboard...
            </p>
            <div className="pt-2">
              <Link
                href="/account"
                className="inline-block bg-noir-900 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold-600 transition-colors"
              >
                Go to Account
              </Link>
            </div>
          </div>
        ) : sessionChecking ? (
          <div className="bg-white border border-canvas-border rounded-sm p-8 text-center text-xs text-noir-500">
            Verifying recovery session security...
          </div>
        ) : !hasValidSession ? (
          <div className="bg-white border border-canvas-border rounded-sm p-6 sm:p-8 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-lg font-bold text-noir-900">
              Session Link Expired
            </h2>
            <p className="text-xs text-noir-600">
              This recovery link is invalid or has expired. Please request a fresh password recovery email.
            </p>
            <div className="pt-2">
              <Link
                href="/forgot-password"
                className="inline-block bg-noir-900 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold-600 transition-colors"
              >
                Request New Link
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-canvas-border rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-700 block">
                  New Password * (Min 8 Characters)
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
                  Confirm New Password *
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
                  Passwords are cryptographically salted and hashed by Supabase Auth engine.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-noir-900 hover:bg-gold-600 text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
              >
                {loading ? (
                  <span>Saving New Password...</span>
                ) : (
                  <>
                    <span>Update Password & Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

