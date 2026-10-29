import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuthorization } from "@/lib/auth/admin";

export async function GET() {
  try {
    const config = await db.homepage.get();
    return NextResponse.json({ success: true, config });
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
    const body = await req.json();

    const updated = await db.homepage.update(body);
    return NextResponse.json({ success: true, config: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
