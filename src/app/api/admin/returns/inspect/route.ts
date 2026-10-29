import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { returnId, notes, adminEmail } = body;

    if (!returnId || !notes) {
      return NextResponse.json(
        { error: "returnId and physical inspection notes are required." },
        { status: 400 }
      );
    }

    const email = adminEmail || process.env.ADMIN_EMAIL || "owner@lumiere.in";
    const result = await db.returns.inspectAndRestock(returnId, notes, email);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Return inspected successfully. Garment restocked into physical inventory.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to inspect return" }, { status: 500 });
  }
}
