"use client";

import React, { useState } from "react";
import { Order, OrderStatus } from "@/types";
import { 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  Ban, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  X, 
  Loader2, 
  Filter 
} from "lucide-react";

interface OrdersClientProps {
  initialOrders: Order[];
}

export function OrdersClient({ initialOrders }: OrdersClientProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Cancel order modal
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "phonepe") return o.payment_method === "phonepe";
    if (statusFilter === "gpay") return o.payment_method === "gpay";
    if (statusFilter === "cod") return o.payment_method === "cod";
    return o.order_status === statusFilter;
  });

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setLoading(true);
    setActionMessage(null);
    try {
      const res = await fetch("/api/admin/orders/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action: "update_status", status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, order_status: newStatus });
      }
      setActionMessage(`Order marked as ${newStatus}.`);
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDelhiveryShipment = async (orderId: string) => {
    setLoading(true);
    setActionMessage(null);
    try {
      const res = await fetch("/api/delhivery/create-shipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, order_status: "shipped", shipment: data.shipment } : o))
      );
      setActionMessage(`Delhivery waybill generated: ${data.waybill}. Parcel marked as Shipped.`);
    } catch (err: any) {
      setActionMessage(`Courier error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCodPaid = async (orderId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action: "mark_cod_paid" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, payment_status: "captured" } : o))
      );
      setActionMessage("COD cash collection verified and recorded.");
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelModalOrder || !cancelReason.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: cancelModalOrder.id,
          action: "cancel",
          reason: cancelReason.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setOrders((prev) =>
        prev.map((o) =>
          o.id === cancelModalOrder.id ? { ...o, order_status: "cancelled" } : o
        )
      );
      setCancelModalOrder(null);
      setCancelReason("");
      setActionMessage("Order cancelled and inventory physical stock safely restored.");
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Fulfillment & Settlement
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Orders & Cash on Delivery Management
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Manage customer orders, verify COD collections, and dispatch Delhivery courier parcels.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            { label: "All Orders", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "PhonePe", value: "phonepe" },
            { label: "GPay", value: "gpay" },
            { label: "COD Only", value: "cod" },
          ].map((pill) => (
            <button
              key={pill.value}
              onClick={() => setStatusFilter(pill.value)}
              className={`px-3 py-1.5 rounded-sm border transition-colors ${
                statusFilter === pill.value
                  ? "bg-noir-900 text-white border-noir-900 font-bold"
                  : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-canvas-light border border-canvas-border text-xs rounded-sm font-medium text-noir-800">
          {actionMessage}
        </div>
      )}

      {/* 2. Orders Table */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-canvas-border text-noir-600 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas-subtle">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-noir-500">
                    No orders matching selected criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-canvas-light transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-noir-900">
                      {order.order_number}
                    </td>
                    <td className="py-3.5 px-4 text-noir-500">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-noir-900">{order.customer_name}</p>
                      <p className="text-[11px] text-noir-500">+91 {order.customer_phone}</p>
                    </td>
                    <td className="py-3.5 px-4 text-noir-700">
                      {order.shipping_address.city}, {order.shipping_address.state}
                      <span className="block text-[10px] text-noir-400 font-mono">
                        PIN: {order.shipping_address.pincode}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold uppercase text-noir-800">
                        {order.payment_method}
                      </span>
                      <span className={`block text-[10px] font-bold uppercase ${
                        order.payment_status === "captured" ? "text-emerald-700" : "text-amber-700"
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-canvas-subtle border border-canvas-border text-noir-800">
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold font-sans text-noir-900">
                      ₹{order.total_amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-noir-600 hover:text-noir-900 border border-canvas-border hover:border-noir-900 rounded-sm transition-colors"
                          title="View order details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {order.order_status !== "cancelled" && order.order_status !== "delivered" && (
                          <button
                            onClick={() => setCancelModalOrder(order)}
                            className="p-1.5 text-rose-600 hover:text-rose-800 border border-rose-200 hover:border-rose-400 rounded-sm transition-colors"
                            title="Cancel order and restore stock"
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detailed Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-canvas-border rounded-sm max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-canvas-border pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-noir-900">
                  Order {selectedOrder.order_number}
                </h3>
                <p className="text-xs text-noir-500 font-mono">
                  Created: {new Date(selectedOrder.created_at).toLocaleString("en-IN")}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-noir-400 hover:text-noir-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="p-3 bg-canvas-subtle border border-canvas-border rounded-sm flex flex-wrap gap-2 text-xs">
              {selectedOrder.order_status === "confirmed" && (
                <button
                  onClick={() => handleCreateDelhiveryShipment(selectedOrder.id)}
                  disabled={loading}
                  className="bg-gold-600 hover:bg-gold-500 text-noir-900 font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Manifest Delhivery Dispatch</span>
                </button>
              )}

              {selectedOrder.payment_method === "cod" && selectedOrder.payment_status === "pending" && (
                <button
                  onClick={() => handleMarkCodPaid(selectedOrder.id)}
                  disabled={loading}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark COD Cash Collected</span>
                </button>
              )}

              {selectedOrder.order_status === "shipped" && (
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "delivered")}
                  disabled={loading}
                  className="bg-noir-900 text-white font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider"
                >
                  Mark as Delivered
                </button>
              )}
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-noir-800 border-b border-canvas-subtle pb-1">
                Order Items ({selectedOrder.items.length})
              </h4>
              <div className="divide-y divide-canvas-subtle text-xs">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-serif font-medium text-noir-900">{item.product_name}</p>
                      <p className="text-[11px] text-noir-500">{item.variant_title} • SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-noir-900">₹{item.total_price.toLocaleString("en-IN")}</span>
                      <p className="text-[10px] text-noir-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-canvas-border">
              <div>
                <p className="font-bold text-noir-900 uppercase tracking-wider mb-1">Customer & Address</p>
                <p className="text-noir-800">{selectedOrder.customer_name}</p>
                <p className="text-noir-600">{selectedOrder.customer_email}</p>
                <p className="text-noir-600">+91 {selectedOrder.customer_phone}</p>
                <p className="text-noir-500 mt-1">
                  {selectedOrder.shipping_address.address_line1}, {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} — {selectedOrder.shipping_address.pincode}
                </p>
              </div>

              <div>
                <p className="font-bold text-noir-900 uppercase tracking-wider mb-1">Logistics & Tracking</p>
                <p className="text-noir-700">Courier: <strong>Delhivery Surface</strong></p>
                {selectedOrder.shipment ? (
                  <div className="space-y-1 mt-1">
                    <p className="font-mono text-emerald-800 font-bold">Waybill: {selectedOrder.shipment.waybill}</p>
                    <p className="text-[11px] text-noir-500">{selectedOrder.shipment.status_details}</p>
                  </div>
                ) : (
                  <p className="text-amber-700 font-medium mt-1">Awaiting waybill generation</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Cancel Order & Restore Stock Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-canvas-border rounded-sm max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-canvas-border pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-noir-900">
                  Cancel Order & Restore Stock
                </h3>
                <p className="text-xs text-noir-500 font-mono mt-0.5">
                  Order: {cancelModalOrder.order_number}
                </p>
              </div>
              <button
                onClick={() => setCancelModalOrder(null)}
                className="text-noir-400 hover:text-noir-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCancelSubmit} className="space-y-4 text-xs">
              <p className="text-noir-600 leading-relaxed">
                Cancelling this order will automatically restore <strong>{cancelModalOrder.items.reduce((s, i) => s + i.quantity, 0)} items</strong> back to physical sellable inventory with an immutable cancellation movement entry.
              </p>

              <div>
                <label className="block font-semibold text-noir-800 mb-1">
                  Cancellation Reason (Required for Audit Trail) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g., Client requested cancellation before dispatch, Failed address verification, etc."
                  className="w-full bg-white border border-canvas-border px-3 py-2 text-xs focus:outline-none focus:border-noir-900 rounded-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-canvas-border">
                <button
                  type="button"
                  onClick={() => setCancelModalOrder(null)}
                  className="px-4 py-2 text-xs text-noir-600 hover:text-noir-900"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading || !cancelReason.trim()}
                  className="bg-rose-700 hover:bg-rose-800 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirm Cancellation & Restore</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
