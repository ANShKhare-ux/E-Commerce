import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuthorization } from "@/lib/auth/admin";

export async function GET() {
  try {
    const coupons = await db.coupons.getAll();
    return NextResponse.json({ success: true, coupons });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuthorization(req.headers);
    if (!auth.authorized && process.env.NODE_ENV === "production") {
      return NextResponse.json({ success: false, error: auth.error || "Unauthorized admin access." }, { status: 401 });
    }
    const adminEmail = auth.email || process.env.ADMIN_EMAIL || "admin@lumiere.in";

    const body = await req.json();
    const {
      code,
      description,
      discount_type,
      discount_value,
      min_order_value,
      max_discount,
      usage_limit,
      is_active,
      expires_at,
    } = body;

    if (!code || !discount_type || discount_value === undefined || min_order_value === undefined) {
      return NextResponse.json(
        { success: false, error: "Code, discount type, value, and minimum order value are required." },
        { status: 400 }
      );
    }

    if (discount_value <= 0) {
      return NextResponse.json(
        { success: false, error: "Discount value must be greater than 0." },
        { status: 400 }
      );
    }

    if (discount_type === "percentage" && discount_value > 90) {
      return NextResponse.json(
        { success: false, error: "Percentage discount cannot exceed 90%." },
        { status: 400 }
      );
    }

    const coupon = await db.coupons.create({
      code: code.trim().toUpperCase(),
      description: description || `${discount_type === 'percentage' ? `${discount_value}%` : `₹${discount_value}`} off orders above ₹${min_order_value}`,
      discount_type,
      discount_value: Number(discount_value),
      min_order_value: Number(min_order_value),
      max_discount: max_discount ? Number(max_discount) : undefined,
      usage_limit: usage_limit ? Number(usage_limit) : undefined,
      is_active: is_active ?? true,
      expires_at: expires_at || undefined,
    });

    return NextResponse.json({ success: true, coupon });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuthorization(req.headers);
    if (!auth.authorized && process.env.NODE_ENV === "production") {
      return NextResponse.json({ success: false, error: auth.error || "Unauthorized admin access." }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code") || searchParams.get("id");

    if (!code) {
      return NextResponse.json({ success: false, error: "Coupon code or ID is required." }, { status: 400 });
    }

    const res = await db.coupons.delete(code);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Coupon deleted successfully." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
