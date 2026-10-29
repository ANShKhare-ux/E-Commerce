import React from "react";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const lowStock = await db.inventory.getLowStock();
  const queue = await db.affiliate.getQueue();
  const pendingAffiliates = queue.filter((i) => i.review_status === "pending");

  return (
    <div className="flex min-h-screen bg-canvas-subtle">
      <AdminSidebar
        lowStockCount={lowStock.length}
        pendingAffiliateCount={pendingAffiliates.length}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-10 space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
