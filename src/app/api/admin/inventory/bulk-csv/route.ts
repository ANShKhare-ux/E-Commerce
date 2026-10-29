import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { csvData, adminEmail } = body;

    if (!csvData || typeof csvData !== "string") {
      return NextResponse.json({ error: "CSV string content is required." }, { status: 400 });
    }

    // Parse CSV lines
    // Expected format: SKU,PhysicalStock,LowStockThreshold,Reason
    const lines = csvData.trim().split("\n");
    const rows: Array<{ sku: string; physical_stock: number; low_stock_threshold?: number; reason: string }> = [];

    let startIndex = 0;
    // Check if header exists
    if (lines[0].toLowerCase().includes("sku")) {
      startIndex = 1;
    }

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = line.split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));

      if (parts.length >= 2) {
        const sku = parts[0];
        const stock = parseInt(parts[1], 10);
        const threshold = parts[2] ? parseInt(parts[2], 10) : undefined;
        const reason = parts[3] || "Bulk CSV Import";

        if (sku && !isNaN(stock)) {
          rows.push({
            sku,
            physical_stock: stock,
            low_stock_threshold: isNaN(threshold as number) ? undefined : threshold,
            reason,
          });
        }
      }
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: "No valid SKU rows parsed from CSV." }, { status: 400 });
    }

    const email = adminEmail || process.env.ADMIN_EMAIL || "owner@lumiere.in";
    const result = await db.inventory.importCsvStock(rows, email);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to import CSV stock" }, { status: 500 });
  }
}
