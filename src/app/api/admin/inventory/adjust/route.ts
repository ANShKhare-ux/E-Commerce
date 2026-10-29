import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { variantId, newPhysicalStock, reason, adminEmail } = body;

    if (!variantId || newPhysicalStock === undefined || !reason) {
      return NextResponse.json(
        { error: "variantId, newPhysicalStock, and an explicit adjustment reason are strictly required." },
        { status: 400 }
      );
    }

    const email = adminEmail || process.env.ADMIN_EMAIL || "owner@lumiere.in";
    const result = await db.inventory.adjustStock(variantId, Number(newPhysicalStock), reason, email);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Inventory successfully updated with audit movement." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to adjust stock" }, { status: 500 });
  }
}
