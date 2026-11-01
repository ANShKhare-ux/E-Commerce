import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isConfiguredAdminEmail } from "@/lib/auth/admin";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, phone, role, created_at, updated_at")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      // Fallback to auth metadata if profile table query fails in development
      return NextResponse.json({
        success: true,
        profile: {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0],
          phone: user.user_metadata?.phone || "",
          role: isConfiguredAdminEmail(user.email) ? "super_admin" : "customer",
        },
      });
    }

    return NextResponse.json({
      success: true,
      profile: profile || {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email?.split("@")[0],
        phone: user.user_metadata?.phone || "",
        role: isConfiguredAdminEmail(user.email) ? "super_admin" : "customer",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { full_name, phone } = body;

    // Validate phone number if provided
    if (phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, "");
      if (cleanPhone.length < 10) {
        return NextResponse.json(
          { error: "Please enter a valid 10-digit Indian phone number." },
          { status: 400 }
        );
      }
    }

    const userEmail = user.email || "";
    const isSuperAdmin = isConfiguredAdminEmail(userEmail);

    // Upsert in Supabase profiles table so missing rows are safely initialized
    const { data: updated, error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: userEmail,
        full_name: full_name?.trim() || null,
        phone: phone?.trim() || null,
        role: isSuperAdmin ? "super_admin" : "customer",
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" })
      .select()
      .single();

    // Also update auth user metadata
    try {
      await supabase.auth.updateUser({
        data: {
          full_name: full_name?.trim(),
          phone: phone?.trim(),
        },
      });
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      profile: updated || {
        id: user.id,
        email: userEmail,
        full_name: full_name?.trim(),
        phone: phone?.trim(),
        role: isSuperAdmin ? "super_admin" : "customer",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}
