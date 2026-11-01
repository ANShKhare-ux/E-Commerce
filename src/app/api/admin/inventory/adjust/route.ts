import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuthorization, getPrimaryAdminEmail } from "@/lib/auth/admin";

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuthorization(req.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error || "Unauthorized administrative access." },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { variantId, newPhysicalStock, reason, adminEmail } = body;

    if (!variantId || newPhysicalStock === undefined || !reason) {
      return NextResponse.json(
        { error: "variantId, newPhysicalStock, and an explicit adjustment reason are strictly required." },
        { status: 400 }
      );
    }

    const email = auth.email || adminEmail || getPrimaryAdminEmail();
    const result = await db.inventory.adjustStock(variantId, Number(newPhysicalStock), reason, email);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Inventory successfully updated with audit movement." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to adjust stock" }, { status: 500 });
  }
}
