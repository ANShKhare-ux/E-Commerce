import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { CheckCircle2, Truck, Package, ArrowRight, ShieldCheck } from "lucide-react";

interface OrderConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = await params;
  const order = await db.orders.getById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* 1. Header Hero Card */}
      <div className="bg-white border border-canvas-border p-8 rounded-sm text-center space-y-4 shadow-subtle">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block">
          Order Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Thank you, {order.customer_name}
        </h1>

        <p className="text-xs sm:text-sm text-noir-600 max-w-lg mx-auto font-light leading-relaxed">
          Your order has been secured and registered in our atelier system. A confirmation receipt has been sent to <strong>{order.customer_email}</strong>.
        </p>

        <div className="inline-flex items-center gap-3 bg-canvas-subtle border border-canvas-border px-5 py-2.5 rounded-sm text-xs">
          <span className="text-noir-500">Order Reference:</span>
          <span className="font-mono font-bold text-noir-900 text-sm">{order.order_number}</span>
        </div>
      </div>

      {/* 2. Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping & Courier */}
        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-canvas-border pb-2 text-noir-900 font-bold uppercase tracking-wider">
            <Truck className="w-4 h-4 text-gold-600" />
            <span>Shipping & Courier Information</span>
          </div>

          <div className="space-y-1.5 text-noir-600">
            <p className="font-bold text-noir-900">{order.customer_name}</p>
            <p>{order.shipping_address.address_line1}</p>
            {order.shipping_address.address_line2 && <p>{order.shipping_address.address_line2}</p>}
            <p>{order.shipping_address.city}, {order.shipping_address.state} — {order.shipping_address.pincode}</p>
            <p className="pt-1 text-noir-800">Phone: +91 {order.customer_phone}</p>
          </div>

          <div className="bg-canvas-subtle p-3 rounded-sm space-y-1">
            <p className="font-semibold text-noir-900">Courier Partner: Delhivery Express (Surface)</p>
            <p className="text-[11px] text-noir-500">Estimated TAT: 2–4 business days with live SMS tracking.</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-canvas-border pb-2 text-noir-900 font-bold uppercase tracking-wider">
            <Package className="w-4 h-4 text-gold-600" />
            <span>Payment Summary</span>
          </div>

          <div className="space-y-2 text-noir-600">
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="font-bold uppercase text-noir-900">
                {order.payment_method === "cod" ? "Cash on Delivery (COD)" : "UPI / Netbanking (Razorpay)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status:</span>
              <span className={`font-bold uppercase ${order.payment_status === "captured" ? "text-emerald-700" : "text-amber-700"}`}>
                {order.payment_status === "captured" ? "Verified & Paid" : "Pay at Doorstep"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Courier Delivery Fee:</span>
              <span>{order.shipping_fee === 0 ? "Complimentary" : "₹150"}</span>
            </div>
            <div className="border-t border-canvas-border pt-2 flex justify-between font-bold text-sm text-noir-900">
              <span>Total Amount:</span>
              <span>₹{order.total_amount.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Items Ordered */}
      <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-noir-900 border-b border-canvas-border pb-3">
          Enclosed Pieces ({order.items.length})
        </h3>
        <div className="divide-y divide-canvas-subtle">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex justify-between items-center text-xs">
              <div>
                <p className="font-serif font-medium text-noir-900">{item.product_name}</p>
                <p className="text-[11px] text-noir-500">{item.variant_title} • SKU: {item.sku}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-noir-900">
                  ₹{item.total_price.toLocaleString("en-IN")}
                </span>
                <p className="text-[10px] text-noir-400">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href={`/track-order?orderId=${order.order_number}`}
          className="bg-gold-600 hover:bg-gold-500 text-noir-900 px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-luxury flex items-center gap-2 transition-colors shadow-subtle"
        >
          <span>Track via Delhivery</span>
          <Truck className="w-4 h-4" />
        </Link>
        <Link
          href="/products"
          className="bg-noir-900 hover:bg-noir-800 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-luxury flex items-center gap-2 transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
