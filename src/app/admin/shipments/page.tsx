import React from "react";
import { db } from "@/lib/db";
import { Truck, ExternalLink, Printer, PackageCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminShipmentsPage() {
  const orders = await db.orders.getAll();
  const shippedOrders = orders.filter((o) => o.shipment || o.order_status === "shipped");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Logistics Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Delhivery Shipments & Manifest History
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Monitor surface line-haul dispatches, official waybills, and print packing slips.
          </p>
        </div>
      </div>

      <div className="bg-white border border-canvas-border rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-canvas-border text-noir-600 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Waybill Number</th>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">Pickup Hub</th>
                <th className="py-3 px-4">Courier Status</th>
                <th className="py-3 px-4 text-right">Packing Slip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas-subtle">
              {shippedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-noir-500">
                    No shipments manifested yet. Generate waybills from the Orders control room.
                  </td>
                </tr>
              ) : (
                shippedOrders.map((order) => {
                  const shp = order.shipment;
                  const waybill = shp?.waybill || `DEL-${order.order_number.replace(/[^0-9]/g, "")}`;

                  return (
                    <tr key={order.id} className="hover:bg-canvas-light transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-noir-900">
                        {waybill}
                      </td>
                      <td className="py-3 px-4 font-mono text-noir-700">
                        {order.order_number}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-noir-900">{order.customer_name}</p>
                        <p className="text-[11px] text-noir-500">
                          {order.shipping_address.city}, {order.shipping_address.state} ({order.shipping_address.pincode})
                        </p>
                      </td>
                      <td className="py-3 px-4 text-noir-600">
                        {shp?.pickup_location || "LUMIERE_MUMBAI_HUB"}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <PackageCheck className="w-3 h-3 text-emerald-600" />
                          <span>{shp?.status || "Manifested"}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`/track-order?waybill=${waybill}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-white border border-canvas-border hover:border-noir-900 text-noir-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 text-gold-600" />
                          <span>Track Courier</span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
