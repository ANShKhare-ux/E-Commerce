import { NextRequest, NextResponse } from "next/server";
import { DelhiveryService } from "@/lib/services/delhivery";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pincode = searchParams.get("pincode");

    if (!pincode) {
      return NextResponse.json({ error: "Query parameter 'pincode' is required." }, { status: 400 });
    }

    const result = await DelhiveryService.checkServiceability(pincode);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to check serviceability." }, { status: 500 });
  }
}
