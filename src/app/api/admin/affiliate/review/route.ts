import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, reviewStatus, isPublished, adminEmail } = body;

    if (!id || !reviewStatus) {
      return NextResponse.json({ error: "id and reviewStatus are required." }, { status: 400 });
    }

    const email = adminEmail || process.env.ADMIN_EMAIL || "owner@lumiere.in";
    const result = await db.affiliate.updateReview(id, reviewStatus, isPublished ?? false, email);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: `Affiliate product updated to ${reviewStatus}.` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update affiliate product" }, { status: 500 });
  }
}
