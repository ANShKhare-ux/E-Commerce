"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomerSummary } from "@/app/api/admin/customers/route";
import {
  Users,
  Search,
  Download,
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Calendar,
  X,
  ExternalLink,
  ShieldCheck,
  Award,
  TrendingUp,
} from "lucide-react";

interface CustomersClientProps {
  initialCustomers: CustomerSummary[];
  initialMetrics: {
    totalCustomers: number;
    repeatCustomerRate: number;
    averageOrderValue: number;
    totalGrossRevenue: number;
    vipCount: number;
  };
}

export function CustomersClient({ initialCustomers, initialMetrics }: CustomersClientProps) {
  const [customers] = useState<CustomerSummary[]>(initialCustomers);
  const [metrics] = useState(initialMetrics);
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<"all" | "vip" | "repeat" | "new">("all");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null);

  const filteredCustomers = customers.filter((c) => {
    if (tierFilter !== "all" && c.tier !== tierFilter) return false;
    if (!searchTerm.trim()) return true;

    const query = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      c.locations.some((loc) => loc.toLowerCase().includes(query))
    );
  });

  const handleExportCsv = () => {
    if (filteredCustomers.length === 0) {
      alert("No customer records available to export.");
      return;
    }

    const headers = [
      "Customer Name",
      "Email Address",
      "Mobile Phone",
      "Customer Tier",
      "Total Orders",
      "Total Lifetime Spend (INR)",
      "First Order Date",
      "Last Order Date",
      "Delivery Locations",
    ];

    const rows = filteredCustomers.map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${c.phone.replace(/"/g, '""')}"`,
      `"${c.tier.toUpperCase()}"`,
      c.totalOrders,
      c.totalSpent,
      `"${c.firstOrderDate ? new Date(c.firstOrderDate).toLocaleDateString("en-IN") : ""}"`,
      `"${c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString("en-IN") : ""}"`,
      `"${c.locations.join("; ").replace(/"/g, '""')}"`,
    ]);

    const csvString = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `lumiere_customers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Atelier Directory
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Customer Directory & Lifetime Value
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Inspect customer purchase frequency, lifetime spend, and repeat buyer relationships.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 bg-noir-900 hover:bg-gold-600 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Customers CSV</span>
        </button>
      </div>

      {/* 2. KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-1">
          <div className="flex items-center justify-between text-noir-500 text-xs">
            <span>Total Customers</span>
            <Users className="w-4 h-4 text-gold-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-noir-900">
            {metrics.totalCustomers.toLocaleString("en-IN")}
          </div>
          <p className="text-[10px] text-noir-400">Unique purchasing patrons</p>
        </div>

        <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-1">
          <div className="flex items-center justify-between text-noir-500 text-xs">
            <span>Repeat Patron Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-800">
            {metrics.repeatCustomerRate}%
          </div>
          <p className="text-[10px] text-noir-400">Patrons with 2+ completed orders</p>
        </div>

        <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-1">
          <div className="flex items-center justify-between text-noir-500 text-xs">
            <span>Average Order Value</span>
            <ShoppingBag className="w-4 h-4 text-gold-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-noir-900">
            ₹{metrics.averageOrderValue.toLocaleString("en-IN")}
          </div>
          <p className="text-[10px] text-noir-400">Calculated across all orders</p>
        </div>

        <div className="bg-white border border-canvas-border p-5 rounded-sm shadow-xs space-y-1">
          <div className="flex items-center justify-between text-noir-500 text-xs">
            <span>VIP Patrons</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-noir-900">
            {metrics.vipCount}
          </div>
          <p className="text-[10px] text-noir-400">Spend ₹50k+ or 3+ orders</p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 border border-canvas-border rounded-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-noir-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone, city..."
            className="w-full bg-canvas-subtle border border-canvas-border pl-9 pr-4 py-2 text-xs rounded-sm text-noir-900 focus:outline-none focus:border-noir-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { label: "All Patrons", value: "all" },
            { label: "VIP Patrons", value: "vip" },
            { label: "Repeat Buyers", value: "repeat" },
            { label: "First-time", value: "new" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setTierFilter(tab.value as any)}
              className={`px-3 py-1.5 rounded-sm border transition-colors ${
                tierFilter === tab.value
                  ? "bg-noir-900 text-white border-noir-900 font-bold"
                  : "bg-white text-noir-700 border-canvas-border hover:border-noir-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Customers Table */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-canvas-border text-noir-600 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4 text-center">Orders</th>
                <th className="py-3 px-4 text-right">Lifetime Spend</th>
                <th className="py-3 px-4">Last Order</th>
                <th className="py-3 px-4">Delivery Regions</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas-subtle">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-noir-500">
                    No customer records matching the active filters.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.email} className="hover:bg-canvas-light transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-serif font-bold text-noir-900 text-sm">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-noir-500 font-mono flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-noir-400" />
                        <span>{c.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-noir-700">
                      {c.phone ? (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-noir-400" />
                          <span>+91 {c.phone}</span>
                        </div>
                      ) : (
                        <span className="text-noir-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {c.tier === "vip" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-bold uppercase rounded">
                          <Award className="w-3 h-3 text-amber-600" /> VIP Patron
                        </span>
                      ) : c.tier === "repeat" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold uppercase rounded">
                          Repeat Buyer
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 bg-canvas-subtle border border-canvas-border text-noir-600 text-[10px] font-medium uppercase rounded">
                          First-time
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-noir-900">
                      {c.totalOrders}
                    </td>

                    <td className="py-3.5 px-4 text-right font-serif font-bold text-noir-900 text-sm">
                      ₹{c.totalSpent.toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4 text-noir-600 text-[11px]">
                      {c.lastOrderDate ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-noir-400" />
                          <span>
                            {new Date(c.lastOrderDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-noir-600 text-[11px] max-w-xs truncate">
                      {c.locations.length > 0 ? (
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-noir-400 shrink-0" />
                          <span className="truncate">{c.locations.join(", ")}</span>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="text-noir-900 hover:text-gold-600 font-semibold text-xs underline"
                      >
                        Inspect Orders ({c.orders.length})
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Customer Orders Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-noir-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-canvas-border rounded-sm max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-canvas-border flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-noir-900">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-50 border border-gold-200 text-gold-800 uppercase font-bold">
                    {selectedCustomer.tier} Patron
                  </span>
                </div>
                <p className="text-xs text-noir-500 font-mono mt-0.5">
                  {selectedCustomer.email} • Mobile: {selectedCustomer.phone || "N/A"}
                </p>
                <p className="text-xs text-noir-700 font-semibold mt-1">
                  Total Lifetime Spend: ₹{selectedCustomer.totalSpent.toLocaleString("en-IN")} across {selectedCustomer.totalOrders} order(s)
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-noir-400 hover:text-noir-900 p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Orders List */}
            <div className="p-5 overflow-y-auto divide-y divide-canvas-subtle space-y-4">
              {selectedCustomer.orders.map((ord) => (
                <div key={ord.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-noir-900">
                        {ord.orderNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        ord.orderStatus === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : ord.orderStatus === "cancelled"
                          ? "bg-rose-100 text-rose-800"
                          : ord.orderStatus === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </div>
                    <div className="text-[11px] text-noir-500">
                      Date: {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })} • Method: {ord.paymentMethod.toUpperCase()} • {ord.itemCount} item(s)
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-serif font-bold text-noir-900 text-sm">
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </div>
                    <Link
                      href="/admin/orders"
                      className="text-[11px] text-gold-600 hover:text-gold-700 underline font-medium inline-flex items-center gap-0.5 mt-0.5"
                    >
                      <span>Manage Order</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-canvas-border bg-canvas-subtle flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="bg-noir-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold-600 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

