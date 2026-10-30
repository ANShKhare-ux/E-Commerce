"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
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
  Plus,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface CustomerAddress {
  id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

interface AccountClientProps {
  initialUser: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    role: string;
  };
  initialAddresses?: CustomerAddress[];
  initialOrders?: Order[];
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Puducherry"
];

export function AccountClient({
  initialUser,
  initialAddresses = [],
  initialOrders = [],
}: AccountClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses" | "notifications">("orders");

  // Profile Form state
  const [fullName, setFullName] = useState(initialUser.fullName || "");
  const [phone, setPhone] = useState(initialUser.phone || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Addresses state
  const [addresses, setAddresses] = useState<CustomerAddress[]>(initialAddresses);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [newAddrName, setNewAddrName] = useState(initialUser.fullName || "");
  const [newAddrPhone, setNewAddrPhone] = useState(initialUser.phone || "");
  const [newAddrLine1, setNewAddrLine1] = useState("");
  const [newAddrLine2, setNewAddrLine2] = useState("");
  const [newAddrCity, setNewAddrCity] = useState("Mumbai");
  const [newAddrState, setNewAddrState] = useState("Maharashtra");
  const [newAddrPincode, setNewAddrPincode] = useState("");
  const [newAddrDefault, setNewAddrDefault] = useState(false);

  // Notification prefs
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [returnSubmitting, setReturnSubmitting] = useState(false);
  const [returnMessage, setReturnMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const emailParam = initialUser?.email ? `?email=${encodeURIComponent(initialUser.email)}` : "";
      const res = await fetch(`/api/account/orders${emailParam}`);
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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileError("");
    setProfileSuccess(false);

    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err: any) {
      setProfileError(err.message || "Failed to update profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressLoading(true);
    setAddressError("");

    try {
      const res = await fetch("/api/account/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: newAddrName,
          phone: newAddrPhone,
          address_line1: newAddrLine1,
          address_line2: newAddrLine2,
          city: newAddrCity,
          state: newAddrState,
          pincode: newAddrPincode,
          is_default: newAddrDefault,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.address) {
        setAddresses((prev) => [data.address, ...prev]);
      }
      setShowAddAddress(false);
      // Reset form
      setNewAddrLine1("");
      setNewAddrLine2("");
      setNewAddrPincode("");
      setNewAddrDefault(false);
    } catch (err: any) {
      setAddressError(err.message || "Failed to save address.");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to remove this delivery address?")) return;
    try {
      const res = await fetch(`/api/account/addresses?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      // Handled silently
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  const handleRequestReturn = async (orderId: string, orderItemId: string) => {
    if (!returnReason.trim()) {
      alert("Please provide a reason for the return request.");
      return;
    }
    setReturnSubmitting(true);
    setReturnMessage(null);
    try {
      const res = await fetch("/api/account/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          orderItemId,
          reason: returnReason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setReturnMessage(
        "Return request received! A Delhivery reverse-pickup waybill will be generated once verified."
      );
      setReturnOrderId(null);
      setReturnReason("");
      fetchOrders();
    } catch (err: any) {
      alert(`Return initiation failed: ${err.message}`);
    } finally {
      setReturnSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="border-b border-canvas-border pb-4">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Client Concierge & Wardrobe
        </span>
        <h1 className="font-serif text-3xl font-medium text-noir-900">
          Patron Account Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-3">
            <div className="w-12 h-12 bg-gold-600/10 rounded-full flex items-center justify-center text-gold-600">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-noir-900">{fullName || "Atelier Patron"}</h2>
              <p className="text-xs text-noir-500 truncate">{initialUser.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2 py-0.5 bg-canvas-subtle border border-canvas-border text-[10px] font-semibold uppercase text-gold-700 rounded">
                  {initialUser.role === "super_admin" || initialUser.role === "admin"
                    ? "Store Administrator"
                    : "Verified Patron"}
                </span>
                {initialUser.role !== "customer" && (
                  <Link
                    href="/admin"
                    className="text-[10px] text-noir-900 hover:text-gold-600 underline font-bold"
                  >
                    Control Room →
                  </Link>
                )}
              </div>
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
                  <User className="w-4 h-4" />
                  <span>Profile Information</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                  activeTab === "addresses" ? "bg-noir-900 text-white" : "text-noir-800 hover:bg-canvas-subtle"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Shipping Coordinates ({addresses.length})</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <Link
                href="/wishlist"
                className="w-full flex items-center justify-between px-4 py-3.5 text-noir-800 hover:bg-canvas-subtle transition-colors"
              >
                <div className="flex items-center gap-3">
                  <PackageCheck className="w-4 h-4" />
                  <span>Saved Wishlist</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>

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
                className="w-full flex items-center gap-3 px-4 py-3.5 text-rose-600 hover:bg-rose-50 transition-colors"
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
                  onClick={fetchOrders}
                  disabled={loadingOrders}
                  className="mt-2 sm:mt-0 text-xs font-bold text-gold-700 hover:underline flex items-center gap-1"
                >
                  {loadingOrders ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Refresh Orders ⟳</span>
                </button>
              </div>

              {returnMessage && (
                <div className="p-4 bg-gold-50 border border-gold-300 text-gold-900 text-xs rounded-sm">
                  {returnMessage}
                </div>
              )}

              {orders.length === 0 ? (
                <div className="bg-white border border-canvas-border p-12 text-center rounded-sm space-y-4">
                  <ShoppingBag className="w-12 h-12 text-noir-300 mx-auto" />
                  <h3 className="font-serif text-lg font-bold text-noir-800">No Orders Placed Yet</h3>
                  <p className="text-xs text-noir-500 max-w-sm mx-auto">
                    Your luxury wardrobe is awaiting its first selection. Explore our handcrafted GI-certified collections.
                  </p>
                  <Link
                    href="/products"
                    className="inline-block bg-noir-900 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-luxury hover:bg-gold-600 transition-colors"
                  >
                    Explore Atelier Catalog
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-canvas-border rounded-sm overflow-hidden shadow-xs"
                    >
                      {/* Order Header */}
                      <div className="bg-canvas-subtle border-b border-canvas-border p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="font-mono text-noir-500 text-[11px] block">
                            ORDER NUMBER
                          </span>
                          <span className="font-serif font-bold text-noir-900 text-sm">
                            {order.order_number}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-noir-500 text-[11px] block">
                            DATE PLACED
                          </span>
                          <span className="text-noir-800">
                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-noir-500 text-[11px] block">
                            TOTAL AMOUNT
                          </span>
                          <span className="font-sans font-bold text-noir-900">
                            ₹{order.total_amount.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-noir-500 text-[11px] block">
                            PAYMENT
                          </span>
                          <span className="font-semibold uppercase text-noir-800 text-[11px]">
                            {order.payment_method === "cod"
                              ? "COD"
                              : order.payment_method === "gpay"
                              ? "GPay UPI"
                              : "PhonePe UPI"}
                          </span>
                          <span className={`block text-[10px] font-bold ${order.payment_status === "captured" ? "text-emerald-700" : "text-amber-700"}`}>
                            {order.payment_status === "captured" ? "Captured" : "Pending COD"}
                          </span>
                        </div>
                        <div>
                          <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                            order.order_status === "delivered"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.order_status === "cancelled"
                              ? "bg-rose-100 text-rose-800"
                              : order.order_status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {order.order_status}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="p-4 divide-y divide-canvas-subtle">
                        {order.items.map((item) => (
                          <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                            <div>
                              <h4 className="font-serif font-medium text-noir-900 text-sm">
                                {item.product_name}
                              </h4>
                              <p className="text-[11px] text-noir-500">
                                Variant: {item.variant_title || "Standard"} • Qty: {item.quantity} • SKU: {item.sku}
                              </p>
                            </div>
                            <span className="font-sans font-bold text-noir-900">
                              ₹{item.total_price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Shipping and Actions */}
                      <div className="bg-canvas-subtle border-t border-canvas-border p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="text-noir-600">
                          <span className="font-medium text-noir-900">Delivery Address: </span>
                          {order.shipping_address.address_line1}, {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
                        </div>
                        <div className="flex items-center gap-3">
                          {order.shipment?.waybill && (
                            <Link
                              href={`/track-order?waybill=${order.shipment.waybill}`}
                              className="text-gold-700 hover:text-gold-800 font-bold flex items-center gap-1"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>Track Delhivery parcel</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFILE INFORMATION */}
          {activeTab === "profile" && (
            <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-6 shadow-xs">
              <div className="border-b border-canvas-border pb-3">
                <h2 className="font-serif text-xl font-medium text-noir-900">Personal Information</h2>
                <p className="text-xs text-noir-500 font-light">
                  Manage your patron identity and communication preferences.
                </p>
              </div>

              {profileSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Profile updated successfully in PostgreSQL database.</span>
                </div>
              )}

              {profileError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold text-noir-700 mb-1">
                    Email Address (Account Identity)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={initialUser.email}
                    className="w-full bg-canvas-subtle border border-canvas-border px-3 py-2 text-xs text-noir-500 rounded-sm cursor-not-allowed"
                  />
                  <p className="text-[10px] text-noir-400 mt-1">
                    Managed by Supabase Auth security.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-noir-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Radhika Sharma"
                    className="w-full bg-white border border-canvas-border px-3 py-2 text-xs text-noir-900 rounded-sm focus:outline-none focus:border-noir-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-noir-700 mb-1">
                    Indian Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 12345"
                    className="w-full bg-white border border-canvas-border px-3 py-2 text-xs text-noir-900 rounded-sm focus:outline-none focus:border-noir-900"
                  />
                  <p className="text-[10px] text-noir-400 mt-1">
                    Used for Delhivery delivery OTP and dispatch notifications.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={profileSaving}
                  className="bg-noir-900 hover:bg-gold-600 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {profileSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Profile Changes</span>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SHIPPING ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border">
                <div>
                  <h2 className="font-serif text-xl font-medium text-noir-900">
                    Saved Delivery Addresses
                  </h2>
                  <p className="text-xs text-noir-500 font-light mt-0.5">
                    Saved destinations for rapid checkout and Delhivery dispatch.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="mt-2 sm:mt-0 bg-noir-900 text-white hover:bg-gold-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Add Address Form Modal / Expansion */}
              {showAddAddress && (
                <div className="bg-white border border-noir-900 p-6 rounded-sm shadow-md space-y-4">
                  <h3 className="font-serif text-base font-bold text-noir-900">
                    Add New Delivery Address
                  </h3>

                  {addressError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm">
                      {addressError}
                    </div>
                  )}

                  <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-noir-700 mb-1">
                          Recipient Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddrName}
                          onChange={(e) => setNewAddrName(e.target.value)}
                          className="w-full border border-canvas-border px-3 py-2 rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-noir-700 mb-1">
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={newAddrPhone}
                          onChange={(e) => setNewAddrPhone(e.target.value)}
                          className="w-full border border-canvas-border px-3 py-2 rounded-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-noir-700 mb-1">
                        Address Line 1 (Flat, House No., Building) *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddrLine1}
                        onChange={(e) => setNewAddrLine1(e.target.value)}
                        placeholder="e.g. Flat 12A, Samudra Mahal, Worli"
                        className="w-full border border-canvas-border px-3 py-2 rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-noir-700 mb-1">
                        Address Line 2 (Area, Landmark) - Optional
                      </label>
                      <input
                        type="text"
                        value={newAddrLine2}
                        onChange={(e) => setNewAddrLine2(e.target.value)}
                        className="w-full border border-canvas-border px-3 py-2 rounded-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-noir-700 mb-1">
                          PIN Code (6 Digits) *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newAddrPincode}
                          onChange={(e) => setNewAddrPincode(e.target.value.replace(/[^0-9]/g, ""))}
                          placeholder="400018"
                          className="w-full border border-canvas-border px-3 py-2 rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-noir-700 mb-1">
                          City / District *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          className="w-full border border-canvas-border px-3 py-2 rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-noir-700 mb-1">
                          State / UT *
                        </label>
                        <select
                          value={newAddrState}
                          onChange={(e) => setNewAddrState(e.target.value)}
                          className="w-full border border-canvas-border px-3 py-2 rounded-sm bg-white"
                        >
                          {INDIAN_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="is_default"
                        checked={newAddrDefault}
                        onChange={(e) => setNewAddrDefault(e.target.checked)}
                      />
                      <label htmlFor="is_default" className="text-noir-700">
                        Set as primary delivery address for checkout
                      </label>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={addressLoading}
                        className="bg-noir-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold-600 disabled:opacity-50"
                      >
                        {addressLoading ? "Saving Address..." : "Save Address"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="border border-canvas-border px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-canvas-subtle"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Address List */}
              {addresses.length === 0 ? (
                <div className="bg-white border border-canvas-border p-8 text-center rounded-sm text-xs text-noir-500">
                  No saved addresses found. Add a destination above for swift checkout.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-2 relative text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-noir-900">{addr.full_name}</span>
                        {addr.is_default && (
                          <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-noir-600 leading-relaxed">
                        {addr.address_line1}
                        {addr.address_line2 && <><br />{addr.address_line2}</>}
                        <br />
                        {addr.city}, {addr.state} - <strong className="font-mono">{addr.pincode}</strong>
                      </p>
                      <p className="text-noir-500 font-mono text-[11px]">Phone: {addr.phone}</p>
                      <div className="pt-2 border-t border-canvas-subtle flex justify-end">
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-rose-600 hover:text-rose-800 flex items-center gap-1 text-[11px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-6 shadow-xs">
              <div className="border-b border-canvas-border pb-3">
                <h2 className="font-serif text-xl font-medium text-noir-900">
                  Notification Preferences
                </h2>
                <p className="text-xs text-noir-500 font-light">
                  Control how LUMIÈRE communicates order tracking and luxury drops.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailUpdates}
                    onChange={(e) => setEmailUpdates(e.target.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-noir-900 block">Email Dispatch & Invoicing</span>
                    <span className="text-noir-500 text-[11px]">
                      Receive automated order confirmations, GST invoices, and Delhivery tracking numbers.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-noir-900 block">WhatsApp Courier Updates</span>
                    <span className="text-noir-500 text-[11px]">
                      Receive out-for-delivery alerts and courier associate contact directly on WhatsApp.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-noir-900 block">Atelier Private Drops & Curations</span>
                    <span className="text-noir-500 text-[11px]">
                      Weekly editorial on handloom heritage, festive collections, and limited edition releases.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
