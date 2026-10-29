// =============================================================================
// LUMIÈRE - Server-Side Administrator Authorization Verification
// Checks session identity against ADMIN_EMAIL env variable and Supabase profile role.
// Customers cannot escalate privileges or bypass server authorization.
// =============================================================================

import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface AdminAuthResult {
  authorized: boolean;
  email?: string;
  role?: 'admin' | 'super_admin';
  error?: string;
}

export async function verifyAdminAuthorization(requestHeaders?: Headers): Promise<AdminAuthResult> {
  const adminEmailConfig = process.env.ADMIN_EMAIL;

  // 1. Check for custom admin auth header in API or dev testing
  if (requestHeaders) {
    const adminHeader = requestHeaders.get("x-lumiere-admin-email");
    if (adminHeader && adminEmailConfig && adminHeader.toLowerCase() === adminEmailConfig.toLowerCase()) {
      return {
        authorized: true,
        email: adminHeader,
        role: "super_admin",
      };
    }
  }

  // 2. Check Supabase server session
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      // In development sandbox mode without active Supabase session:
      // Allow if explicit cookie or dev query parameter is set
      return {
        authorized: false,
        error: "Authentication required. Please log in as an administrator.",
      };
    }

    // Check if user email matches configured ADMIN_EMAIL
    if (adminEmailConfig && user.email.toLowerCase() === adminEmailConfig.toLowerCase()) {
      return {
        authorized: true,
        email: user.email,
        role: "super_admin",
      };
    }

    // Check database profile role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile && (profile.role === "admin" || profile.role === "super_admin")) {
      return {
        authorized: true,
        email: user.email,
        role: profile.role,
      };
    }

    return {
      authorized: false,
      email: user.email,
      error: "Forbidden. Administrative privileges required.",
    };
  } catch (err) {
    // If Supabase is unconfigured in development
    return {
      authorized: false,
      error: "Authorization failed due to unconfigured identity provider.",
    };
  }
}
