import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, subtotal } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, error: "Please provide a valid coupon code." },
        { status: 400 }
      );
    }

    if (subtotal === undefined || typeof subtotal !== "number" || subtotal <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid subtotal amount." },
        { status: 400 }
      );
    }

    const validation = await db.coupons.validate(code, subtotal);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      coupon: validation.coupon,
      discountAmount: validation.discountAmount,
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to validate coupon code." },
      { status: 500 }
    );
  }
}
