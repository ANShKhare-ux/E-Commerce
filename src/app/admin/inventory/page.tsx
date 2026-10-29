import React from "react";
import { db } from "@/lib/db";
import { InventoryClient } from "./InventoryClient";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const inventory = await db.inventory.getAll();
  const movements = await db.inventory.getMovements();

  return <InventoryClient initialInventory={inventory} initialMovements={movements} />;
}
