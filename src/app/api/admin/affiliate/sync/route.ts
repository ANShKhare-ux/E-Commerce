import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const result = await db.affiliate.syncSources();
    return NextResponse.json({
      success: true,
      message: `Feeds synchronized: ${result.itemsChecked} checked, ${result.staleCount} flagged out-of-stock.`,
      result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to sync feeds" }, { status: 500 });
  }
}
