import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/AdminSidebar";
import { verifyAdminAuthorization } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const adminRoute = headerList.get("x-admin-route");

  // If on the administrative login gateway, render full-screen without sidebar
  if (adminRoute === "login") {
    return <>{children}</>;
  }

  // Authoritative server-side verification:
  // Requires authenticated Supabase session with ADMIN_EMAIL match or profile.role IN ('admin', 'super_admin')
  const auth = await verifyAdminAuthorization(headerList);

  if (!auth.authorized) {
    redirect("/admin/login");
  }

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
