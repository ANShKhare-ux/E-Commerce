import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    let user = null;
    try {
      const supabase = await createServerSupabaseClient();
      const userRes = await supabase.auth.getUser();
      user = userRes.data?.user;
    } catch {
      // Cookies not available or in test runner
    }

    const body = await req.json();
    const { orderId, orderItemId, reason } = body;

    if (!orderId || !orderItemId || !reason?.trim()) {
      return NextResponse.json(
        { error: "Order ID, item reference, and return reason are required." },
        { status: 400 }
      );
    }

    const order = await db.orders.getById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Security check: If authenticated with Supabase, ensure the order belongs to this customer
    if (user?.email && order.customer_email.toLowerCase() !== user.email.toLowerCase()) {
      return NextResponse.json(
        { error: "Unauthorized. You may only request returns for your own orders." },
        { status: 403 }
      );
    }

    const result = await db.returns.create(orderId, orderItemId, reason.trim());

    if (!result.success || !result.returnRequest) {
      return NextResponse.json(
        { error: result.error || "Failed to create return request." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      returnRequest: result.returnRequest,
      message: "Return request submitted successfully. Awaiting physical inspection.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process return request." },
      { status: 500 }
    );
  }
}
