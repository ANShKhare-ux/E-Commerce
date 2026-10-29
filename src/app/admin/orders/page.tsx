import React from "react";
import { db } from "@/lib/db";
import { OrdersClient } from "./OrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await db.orders.getAll();

  return <OrdersClient initialOrders={orders} />;
}
