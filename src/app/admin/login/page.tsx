"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Key } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder-project");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid administrative credentials.");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Successful login, refresh router and enter admin control room
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-noir-900 flex flex-col items-center justify-center p-4 selection:bg-gold-500 selection:text-white">
      <div className="w-full max-w-md space-y-8">
        {/* Atelier Security Header */}
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl tracking-[0.25em] font-bold text-white uppercase block">
            LUMIÈRE
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-mono block">
            Atelier • India
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-noir-800 border border-noir-700 rounded-full text-noir-300 text-[11px] font-medium mt-3">
            <Lock className="w-3.5 h-3.5 text-gold-500" />
            <span>Private Administrative Control Room</span>
          </div>
        </div>

        {/* Configuration Notice if Supabase keys not set */}
        {!isSupabaseConfigured && (
          <div className="bg-amber-950/60 border border-amber-800/80 p-4 rounded-sm text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Key className="w-4 h-4 text-amber-400" />
              <span>Supabase Connection Required</span>
            </div>
            <p className="text-[11px] text-amber-300/80 leading-relaxed font-light">
              Your Supabase credentials are currently unconfigured. Add your <code className="bg-black/40 px-1 py-0.5 rounded text-amber-200">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-black/40 px-1 py-0.5 rounded text-amber-200">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to <code className="bg-black/40 px-1 py-0.5 rounded text-amber-200">.env.local</code> to activate live Supabase Authentication.
            </p>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-noir-800 border border-noir-700 rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="bg-rose-950/50 border border-rose-800 p-3 rounded-sm flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-300 block">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@lumiere.in"
                  required
                  className="w-full bg-noir-900 border border-noir-700 rounded-sm pl-10 pr-4 py-2.5 text-xs text-white placeholder-noir-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
                <Mail className="w-4 h-4 text-noir-500 absolute left-3.5 top-3" />
              </div>
              <p className="text-[10px] text-noir-500">
                Must match the server-configured <code className="text-gold-400">ADMIN_EMAIL</code> identity.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-noir-300 block">
                Master Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-noir-900 border border-noir-700 rounded-sm pl-10 pr-4 py-2.5 text-xs text-white placeholder-noir-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-noir-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-600 hover:bg-gold-500 text-noir-900 py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying Authorization...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="border-t border-noir-700/80 pt-4 text-center">
            <p className="text-[10px] text-noir-400 font-light">
              Server-side RBAC & Row Level Security (RLS) active. All administrative actions are recorded in immutable audit logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
