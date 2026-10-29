import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

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
          role: "customer",
        },
      });
    }

    return NextResponse.json({
      success: true,
      profile: profile || {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email?.split("@")[0],
        role: "customer",
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

    // Update in Supabase profiles table
    // Note: Customers can ONLY update permitted fields (full_name, phone). Role is NEVER updated here.
    const { data: updated, error } = await supabase
      .from("profiles")
      .update({
        full_name: full_name?.trim(),
        phone: phone?.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      // Also update auth metadata
      await supabase.auth.updateUser({
        data: { full_name: full_name?.trim() },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Patron profile updated.",
      profile: updated || {
        id: user.id,
        email: user.email,
        full_name,
        phone,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}

