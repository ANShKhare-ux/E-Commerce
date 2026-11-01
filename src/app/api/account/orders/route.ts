import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { searchParams } = new URL(req.url);
    const queryEmail = searchParams.get("email");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isSupabaseConfigured =
      supabaseUrl &&
      !supabaseUrl.includes("placeholder-project");
    const isTest = process.env.NODE_ENV === "test" || process.env.VITEST === "true";

    // Enforce identity isolation:
    // When Supabase is configured or in production, caller MUST be authenticated.
    if (!user || !user.email) {
      if (isSupabaseConfigured || (!isTest && process.env.NODE_ENV === "production")) {
        return NextResponse.json(
          { error: "Authentication required to retrieve customer orders." },
          { status: 401 }
        );
      }
    }

    // An authenticated user is strictly pinned to their own verified email.
    const customerEmail = user?.email || queryEmail;

    if (!customerEmail) {
      return NextResponse.json(
        { error: "Authentication required to retrieve customer orders." },
        { status: 401 }
      );
    }

    const orders = await db.orders.getAll({ customerEmail });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
