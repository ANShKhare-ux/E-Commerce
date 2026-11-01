import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuthorization } from "@/lib/auth/admin";

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuthorization(req.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error || "Unauthorized administrative access." },
        { status: 401 }
      );
    }

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
