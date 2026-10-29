import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, variantId, quantity } = body;

    if (!sessionId || !variantId || !quantity) {
      return NextResponse.json(
        { error: "sessionId, variantId, and quantity are required" },
        { status: 400 }
      );
    }

    const result = await db.inventory.reserveStock(sessionId, variantId, Number(quantity), 15);

    if (!result.success) {
      return NextResponse.json(result, { status: 409 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to reserve stock" }, { status: 500 });
  }
}
