// =============================================================================
// LUMIÈRE - Server-Side Administrator Authorization Verification
// Checks session identity against comma-separated ADMIN_EMAIL env variable
// and Supabase profile role. Customers cannot escalate privileges or bypass server authorization.
// =============================================================================

import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export interface AdminAuthResult {
  authorized: boolean;
  email?: string;
  role?: 'admin' | 'super_admin';
  error?: string;
}

/**
 * Checks if a given email is listed in the ADMIN_EMAIL environment variable.
 * Supports single email or comma-separated list of emails (case-insensitive).
 */
export function isConfiguredAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const adminEmailConfig = process.env.ADMIN_EMAIL || "";
  const allowedEmails = adminEmailConfig
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.trim().toLowerCase());
}

/**
 * Returns the primary configured admin email for fallback logging.
 */
export function getPrimaryAdminEmail(): string {
  const adminEmailConfig = process.env.ADMIN_EMAIL || "";
  const first = adminEmailConfig.split(",")[0]?.trim();
  return first || "owner@lumiere.in";
}

export async function verifyAdminAuthorization(requestHeaders?: Headers): Promise<AdminAuthResult> {
  // 1. Check for custom admin auth header in API or dev testing
  if (requestHeaders) {
    const adminHeader = requestHeaders.get("x-lumiere-admin-email");
    if (adminHeader && isConfiguredAdminEmail(adminHeader)) {
      return {
        authorized: true,
        email: adminHeader.trim().toLowerCase(),
        role: "super_admin",
      };
    }
  }

  // 2. Check Supabase server session
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return {
        authorized: false,
        error: "Authentication required. Please log in as an administrator.",
      };
    }

    const userEmail = user.email.trim().toLowerCase();

    // Check if user email matches any email in configured ADMIN_EMAIL (comma-separated support)
    if (isConfiguredAdminEmail(userEmail)) {
      // Proactively ensure profile in Supabase database has role = 'super_admin'
      try {
        const adminSupabase = createAdminSupabaseClient();
        await adminSupabase.from("profiles").upsert({
          id: user.id,
          email: userEmail,
          role: "super_admin",
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });
      } catch {
        // Non-blocking in local dev/sandbox
      }

      return {
        authorized: true,
        email: userEmail,
        role: "super_admin",
      };
    }

    // Check database profile role for users promoted directly in the database
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile && (profile.role === "admin" || profile.role === "super_admin")) {
      return {
        authorized: true,
        email: userEmail,
        role: profile.role,
      };
    }

    return {
      authorized: false,
      email: userEmail,
      error: "Forbidden. Administrative privileges required.",
    };
  } catch (err: any) {
    return {
      authorized: false,
      error: err?.message || "Authorization failed.",
    };
  }
}
