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
    const { csvData, defaultReason, adminEmail } = body;

    if (!csvData) {
      return NextResponse.json({ error: "csvData is required." }, { status: 400 });
    }

    const lines = csvData.trim().split("\n");
    const rows = [];

    // Skip header line if present
    const startIndex = lines[0].toLowerCase().includes("sku") ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [sku, stockStr, reasonStr] = line.split(",").map((s: string) => s?.trim());
      if (sku && stockStr !== undefined) {
        const physical_stock = parseInt(stockStr, 10);
        const reason = reasonStr || defaultReason || "Bulk stock upload via CSV";
        if (!isNaN(physical_stock) && physical_stock >= 0) {
          rows.push({
            sku,
            physical_stock,
            reason,
          });
        }
      }
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: "No valid SKU rows parsed from CSV." }, { status: 400 });
    }

    const email = auth.email || adminEmail || getPrimaryAdminEmail();
    const result = await db.inventory.importCsvStock(rows, email);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to import CSV stock" }, { status: 500 });
  }
}
