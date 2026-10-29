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

    // Enforce identity isolation:
    // If user is authenticated, they can only access their own orders!
    let customerEmail = queryEmail;
    if (user && user.email) {
      customerEmail = user.email;
    }

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
