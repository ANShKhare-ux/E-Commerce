import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  DollarSign,
  ShoppingBag,
  Boxes,
  Truck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const orders = await db.orders.getAll();
  const lowStock = await db.inventory.getLowStock();
  const queue = await db.affiliate.getQueue();
  const pendingAffiliates = queue.filter((i) => i.review_status === "pending");

  const totalRevenue = orders.reduce((sum, o) => sum + (o.payment_status === "captured" ? o.total_amount : 0), 0);
  const pendingOrders = orders.filter((o) => o.order_status === "pending" || o.order_status === "confirmed");
  const inTransitCount = orders.filter((o) => o.order_status === "shipped").length;

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Executive Overview
          </span>
          <h1 className="font-serif text-3xl text-noir-900 font-medium">
            LUMIÈRE Store Operations Control Room
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Real-time telemetry across Indian logistics, automatic inventory, and affiliate feeds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/inventory"
            className="bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors"
          >
            Adjust Stock
          </Link>
          <Link
            href="/admin/affiliate"
            className="bg-white border border-canvas-border hover:border-noir-900 text-noir-800 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors"
          >
            Review Feeds ({pendingAffiliates.length})
          </Link>
        </div>
      </div>

      {/* 2. Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-2">
          <div className="flex items-center justify-between text-noir-500 text-xs">
            <span className="font-medium uppercase tracking-wider">Net Captured Revenue</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-sm font-bold">₹ INR</span>
          </div>
          <div className="text-2xl font-bold font-sans text-noir-900">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
          <p className="text-[11px] text-noir-400">Captured via Razorpay UPI & Cards</p>
        </div>

        <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-2">
          <div className="flex items-center justify-between text-noir-500 text-xs">
            <span className="font-medium uppercase tracking-wider">Total Customer Orders</span>
            <ShoppingBag className="w-4 h-4 text-gold-600" />
          </div>
          <div className="text-2xl font-bold font-sans text-noir-900">
            {orders.length}
          </div>
          <p className="text-[11px] text-amber-700 font-medium">
            {pendingOrders.length} pending fulfillment
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-2">
          <div className="flex items-center justify-between text-noir-500 text-xs">
            <span className="font-medium uppercase tracking-wider">Low Stock Warnings</span>
            <AlertTriangle className={`w-4 h-4 ${lowStock.length > 0 ? "text-amber-600" : "text-noir-400"}`} />
          </div>
          <div className="text-2xl font-bold font-sans text-noir-900">
            {lowStock.length}
          </div>
          <p className="text-[11px] text-noir-400">
            {lowStock.length > 0 ? "Requires restock action" : "All SKUs above threshold"}
          </p>
        </div>

        <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-2">
          <div className="flex items-center justify-between text-noir-500 text-xs">
            <span className="font-medium uppercase tracking-wider">Delhivery In-Transit</span>
            <Truck className="w-4 h-4 text-gold-600" />
          </div>
          <div className="text-2xl font-bold font-sans text-noir-900">
            {inTransitCount}
          </div>
          <p className="text-[11px] text-noir-400">Active parcels out for courier delivery</p>
        </div>
      </div>

      {/* 3. Low-Stock Alerts Banner */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Critical Low-Stock Alerts ({lowStock.length} SKUs below minimum threshold)</span>
            </div>
            <Link
              href="/admin/inventory"
              className="text-xs text-amber-900 font-bold hover:underline flex items-center gap-1"
            >
              <span>Manage Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStock.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 border border-amber-200 rounded-sm text-xs flex justify-between items-center"
              >
                <div>
                  <p className="font-serif font-bold text-noir-900 line-clamp-1">{item.productName}</p>
                  <p className="text-[10px] text-noir-500 font-mono">
                    {item.sku} ({item.variantTitle})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-amber-700 font-bold text-sm block">
                    {item.available_stock} left
                  </span>
                  <span className="text-[9px] text-noir-400">Threshold: {item.low_stock_threshold}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Recent Customer Orders */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-canvas-border pb-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-noir-900">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-noir-500 font-light">
              Orders placed across India via UPI and Cash on Delivery
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-gold-900 flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-10 text-xs text-noir-500">
            No orders recorded in system yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-canvas-border text-noir-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5">Order Ref</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">City & State</th>
                  <th className="py-2.5">Payment</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-canvas-subtle">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-canvas-light transition-colors">
                    <td className="py-3 font-mono font-bold text-noir-900">
                      <Link href={`/admin/orders`} className="hover:text-gold-600">
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-noir-800">{order.customer_name}</p>
                      <p className="text-[10px] text-noir-400">{order.customer_email}</p>
                    </td>
                    <td className="py-3 text-noir-600">
                      {order.shipping_address.city}, {order.shipping_address.state}
                    </td>
                    <td className="py-3">
                      <span className="uppercase font-semibold text-[11px] text-noir-700">
                        {order.payment_method}
                      </span>
                      <span className={`block text-[10px] ${order.payment_status === "captured" ? "text-emerald-700 font-bold" : "text-amber-700"}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-canvas-subtle text-noir-800 border border-canvas-border">
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-bold font-sans text-noir-900">
                      ₹{order.total_amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
