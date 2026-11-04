import React from "react";
import { db } from "@/lib/db";
import { InventoryClient } from "./InventoryClient";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const [inventory, movements] = await Promise.all([
    db.inventory.getAll(),
    db.inventory.getMovements(),
  ]);

  return <InventoryClient initialInventory={inventory} initialMovements={movements} />;
}
