"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Order } from "@/types";
import {
  User,
  ShoppingBag,
  MapPin,
  Bell,
  LogOut,
  PackageCheck,
  Truck,
  RotateCcw,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface AccountClientProps {
  initialEmail?: string;
}

export function AccountClient({ initialEmail = "" }: AccountClientProps) {
  const [email, setEmail] = useState(initialEmail);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "notifications">("orders");

  // Profile Form state
  const [fullName, setFullName] = useState("Aanya Sharma");
  const [phone, setPhone] = useState("+91 98200 12345");
  const [addressLine, setAddressLine] = useState("Flat 402, Sea Green Apartments, Worli Sea Face");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("400030");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notification prefs
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [returnSubmitting, setReturnSubmitting] = useState(false);
  const [returnMessage, setReturnMessage] = useState<string | null>(null);

  // Login form state
  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Load orders when email is available
  useEffect(() => {
    // Check localStorage for saved session
    const savedEmail = localStorage.getItem("lumiere_customer_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsLoggedIn(true);
      fetchOrders(savedEmail);
    } else if (initialEmail) {
      setEmail(initialEmail);
      setIsLoggedIn(true);
      fetchOrders(initialEmail);
    }
  }, [initialEmail]);

  const fetchOrders = async (customerEmail: string) => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`/api/account/orders?email=${encodeURIComponent(customerEmail)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch {
      // Handled silently
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmailInput || !loginEmailInput.includes("@")) {
      setLoginError("Please provide a valid Indian email address.");
      return;
    }
    setLoginError("");
    setEmail(loginEmailInput);
    setIsLoggedIn(true);
    localStorage.setItem("lumiere_customer_email", loginEmailInput);
    fetchOrders(loginEmailInput);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setOrders([]);
    localStorage.removeItem("lumiere_customer_email");
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleInitiateReturn = async (orderId: string, itemId: string) => {
    if (!returnReason.trim()) return;
    setReturnSubmitting(true);
    setReturnMessage(null);
    try {
      // In Lumiere backend, returns require inspection
      const res = await fetch("/api/admin/returns/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request",
          orderId,
          itemId,
          reason: returnReason,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReturnMessage("Return pickup scheduled. A Delhivery agent will verify tags and condition.");
        setReturnOrderId(null);
        setReturnReason("");
        if (email) fetchOrders(email);
      } else {
        setReturnMessage(data.error || "Unable to request return. Please verify order state.");
      }
    } catch {
      setReturnMessage("Network error. Please try again or contact atelier concierge.");
    } finally {
      setReturnSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-noir-500 uppercase tracking-widest mb-6">
        <Link href="/" className="hover:text-gold-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-noir-900 font-bold">Customer Atelier Account</span>
      </div>

      {!isLoggedIn ? (
        /* Sign In / Verification Section */
        <div className="max-w-md mx-auto bg-white border border-canvas-border p-8 rounded-sm shadow-subtle space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold tracking-[0.25em] text-gold-600 uppercase block">
              Atelier Client Access
            </span>
            <h1 className="font-serif text-2xl font-light text-noir-900">
              Sign In to Your LUMIÈRE Account
            </h1>
            <p className="text-xs text-noir-500 font-light">
              Track Delhivery parcels, view order receipts, and manage your private fitting addresses.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-sm">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmailInput}
                onChange={(e) => setLoginEmailInput(e.target.value)}
                placeholder="client@lumiere.in"
                className="w-full px-3.5 py-2.5 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                Password or Client OTP
              </label>
              <input
                type="password"
                required
                value={loginPasswordInput}
                onChange={(e) => setLoginPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-noir-900 hover:bg-gold-600 text-white font-bold py-3 text-xs uppercase tracking-widest transition-colors rounded-luxury"
            >
              Sign In to Account
            </button>
          </form>

          <div className="pt-4 border-t border-canvas-border text-center space-y-2">
            <p className="text-[11px] text-noir-500">
              Placed a guest order? Enter the email address used during checkout to view its progress.
            </p>
            <div className="text-[11px] text-gold-700 font-semibold">
              <Link href="/track-order" className="hover:underline">
                Quick Track by Delhivery Waybill / Order # →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Customer Control Room */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
              <div className="w-12 h-12 bg-gold-600/10 rounded-full flex items-center justify-center text-gold-600">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-noir-900">{fullName}</h2>
                <p className="text-xs text-noir-500 truncate">{email}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-canvas-subtle border border-canvas-border text-[10px] font-semibold uppercase text-gold-700 rounded">
                  Verified Patron
                </span>
              </div>
            </div>

            <div className="bg-white border border-canvas-border rounded-sm overflow-hidden">
              <nav className="divide-y divide-canvas-subtle text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                    activeTab === "orders" ? "bg-noir-900 text-white" : "text-noir-800 hover:bg-canvas-subtle"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order History ({orders.length})</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                    activeTab === "profile" ? "bg-noir-900 text-white" : "text-noir-800 hover:bg-canvas-subtle"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4" />
                    <span>Delivery Address & Profile</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                    activeTab === "notifications" ? "bg-noir-900 text-white" : "text-noir-800 hover:bg-canvas-subtle"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4" />
                    <span>Notification Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* TAB 1: ORDER HISTORY */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-noir-900">Your Orders & Deliveries</h2>
                    <p className="text-xs text-noir-500 font-light mt-0.5">
                      View status, Delhivery waybills, and initiate 7-day verified returns.
                    </p>
                  </div>
                  <button
                    onClick={() => fetchOrders(email)}
                    className="mt-2 sm:mt-0 text-xs font-bold text-gold-700 hover:underline"
                  >
                    Refresh Orders ⟳
                  </button>
                </div>

                {returnMessage && (
                  <div className="p-4 bg-gold-50 border border-gold-300 text-gold-900 text-xs rounded-sm">
                    {returnMessage}
                  </div>
                )}

                {loadingOrders ? (
                  <div className="py-16 text-center text-xs text-noir-500">
                    Loading your atelier purchases...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white border border-canvas-border p-12 text-center rounded-sm space-y-4">
                    <PackageCheck className="w-12 h-12 text-noir-400 mx-auto stroke-1" />
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-medium text-noir-900">No Orders Recorded Yet</h3>
                      <p className="text-xs text-noir-500 max-w-sm mx-auto">
                        Your bespoke handloom and streetwear acquisitions will appear here once placed.
                      </p>
                    </div>
                    <Link
                      href="/products"
                      className="inline-block bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors rounded-luxury"
                    >
                      Discover the Collection
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white border border-canvas-border rounded-sm overflow-hidden shadow-xs space-y-4 p-5"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-canvas-border pb-3">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600 block">
                              Order #{order.order_number}
                            </span>
                            <span className="text-xs text-noir-500">
                              Placed on {new Date(order.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Payment Status badge */}
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                                order.payment_status === "captured"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : order.payment_status === "pending"
                                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                                  : "bg-red-50 text-red-800 border border-red-200"
                              }`}
                            >
                              Payment: {order.payment_status} ({order.payment_method.toUpperCase()})
                            </span>

                            {/* Order Status badge */}
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                                order.order_status === "delivered"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : order.order_status === "cancelled"
                                  ? "bg-rose-50 text-rose-800 border border-rose-200"
                                  : "bg-blue-50 text-blue-800 border border-blue-200"
                              }`}
                            >
                              Status: {order.order_status}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-canvas-subtle">
                          {order.items.map((item) => (
                            <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                              <div className="space-y-0.5">
                                <p className="font-bold text-noir-900">{item.product_name}</p>
                                <p className="text-[11px] text-noir-500">
                                  {item.variant_title} • Qty: {item.quantity} • SKU: {item.sku}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-sans font-bold text-noir-900">
                                  ₹{(item.unit_price * item.quantity).toLocaleString("en-IN")}
                                </p>
                                {order.order_status === "delivered" && (
                                  <button
                                    onClick={() => setReturnOrderId(order.id)}
                                    className="text-[10px] text-gold-700 font-bold hover:underline flex items-center gap-1 mt-1 justify-end"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>Request Return</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer & Delhivery Tracking */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-canvas-border text-xs bg-canvas-subtle/50 -mx-5 -mb-5 p-4">
                          <div className="flex items-center gap-2 text-noir-600">
                            <Truck className="w-4 h-4 text-gold-600 shrink-0" />
                            <span>
                              {order.shipment?.waybill ? (
                                <>
                                  Waybill: <strong className="font-mono text-noir-900">{order.shipment.waybill}</strong> ({order.shipment.status})
                                </>
                              ) : (
                                "Awaiting Delhivery Waybill Assignment"
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-bold text-sm text-noir-900 font-sans">
                              Total: ₹{order.total_amount.toLocaleString("en-IN")}
                            </span>
                            {order.shipment?.waybill && (
                              <Link
                                href={`/track-order?waybill=${order.shipment.waybill}`}
                                className="bg-noir-900 hover:bg-gold-600 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-1"
                              >
                                <span>Track Delhivery</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Modal/Inline form for Return */}
                        {returnOrderId === order.id && (
                          <div className="p-4 bg-gold-50 border border-gold-200 rounded-sm space-y-3 mt-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-gold-900 uppercase tracking-wider">
                                Return & Inspection Request
                              </h4>
                              <button
                                onClick={() => setReturnOrderId(null)}
                                className="text-xs text-noir-500 hover:text-noir-900"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[11px] text-noir-600">
                              LUMIÈRE processes returns strictly after physical quality inspection. Items must be unworn with original tags attached.
                            </p>
                            <input
                              type="text"
                              value={returnReason}
                              onChange={(e) => setReturnReason(e.target.value)}
                              placeholder="Reason for return (e.g., Size slightly small, need exchange)"
                              className="w-full text-xs px-3 py-2 bg-white border border-gold-300 rounded-sm focus:outline-none"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setReturnOrderId(null)}
                                className="px-3 py-1.5 text-[11px] border border-noir-300 rounded-sm text-noir-700"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                disabled={returnSubmitting || !returnReason.trim()}
                                onClick={() => handleInitiateReturn(order.id, order.items[0]?.id)}
                                className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-gold-600 text-white rounded-sm hover:bg-gold-500 disabled:opacity-50"
                              >
                                {returnSubmitting ? "Submitting..." : "Confirm Return Pickup"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PROFILE & ADDRESSES */}
            {activeTab === "profile" && (
              <div className="bg-white border border-canvas-border p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-noir-900">Fitting & Delivery Address</h2>
                  <p className="text-xs text-noir-500 font-light mt-0.5">
                    Your shipping details are encrypted and securely utilized for Delhivery express dispatches.
                  </p>
                </div>

                {saveSuccess && (
                  <div className="p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Your patron profile and delivery coordinates have been updated.</span>
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                        Phone Number (+91)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                      Registered Email (Read Only)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full px-3.5 py-2 text-xs bg-canvas-light border border-canvas-border rounded-sm text-noir-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                      Street Address & Building / Residence
                    </label>
                    <input
                      type="text"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
                        PIN Code (6 digits)
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-noir-900 hover:bg-gold-600 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-luxury transition-colors"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="bg-white border border-canvas-border p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-noir-900">Communication & Dispatch Alerts</h2>
                  <p className="text-xs text-noir-500 font-light mt-0.5">
                    Select how you wish to receive milestone updates regarding your order progress.
                  </p>
                </div>

                <div className="space-y-4 divide-y divide-canvas-subtle">
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-noir-900">Transactional Order Emails</h4>
                      <p className="text-[11px] text-noir-500">
                        Receive instant digital tax invoice, order confirmation, and payment receipts.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailUpdates}
                      onChange={(e) => setEmailUpdates(e.target.checked)}
                      className="w-4 h-4 accent-gold-600"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-noir-900">Delhivery WhatsApp & SMS Dispatch Alerts</h4>
                      <p className="text-[11px] text-noir-500">
                        Receive live tracking notifications when parcel leaves Mumbai hub and is out for delivery.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={whatsappAlerts}
                      onChange={(e) => setWhatsappAlerts(e.target.checked)}
                      className="w-4 h-4 accent-gold-600"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-noir-900">Atelier Private Collection Previews</h4>
                      <p className="text-[11px] text-noir-500">
                        First access to strictly limited-run handcrafted silk drops and seasonal festive edits.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="w-4 h-4 accent-gold-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
