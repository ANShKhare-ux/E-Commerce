"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  Boxes,
  ShoppingBag,
  Truck,
  RotateCcw,
  Sparkles,
  ClipboardList,
  ArrowLeft,
  Zap,
  Sliders,
  Users,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminSidebarProps {
  lowStockCount?: number;
  pendingAffiliateCount?: number;
}

interface NavSection {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[];
}

export function AdminSidebar({ lowStockCount = 0, pendingAffiliateCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setAdminEmail(session.user.email);
      }
    });
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navSections: NavSection[] = [
    {
      title: "Core Operations",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Products & SKUs", href: "/admin/products", icon: Shirt },
        {
          label: "Inventory & Stock",
          href: "/admin/inventory",
          icon: Boxes,
          badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined,
          badgeColor: "bg-amber-500",
        },
        { label: "Orders & COD", href: "/admin/orders", icon: ShoppingBag },
        { label: "Delhivery Logistics", href: "/admin/shipments", icon: Truck },
        { label: "Returns & Restock", href: "/admin/returns", icon: RotateCcw },
      ],
    },
    {
      title: "Merchandising & Studio",
      items: [
        {
          label: "Affiliate Curations",
          href: "/admin/affiliate",
          icon: Sparkles,
          badge: pendingAffiliateCount > 0 ? `${pendingAffiliateCount} New` : undefined,
          badgeColor: "bg-gold-500",
        },
        { label: "Promotions & Coupons", href: "/admin/promotions", icon: Zap },
        { label: "Homepage Studio", href: "/admin/homepage", icon: Sliders },
      ],
    },
    {
      title: "System & Governance",
      items: [
        { label: "Automations & Health", href: "/admin/automations", icon: Zap },
        { label: "Shipping Policies", href: "/admin/policies", icon: Sliders },
        { label: "Administrators", href: "/admin/administrators", icon: Users },
        { label: "Audit & Concurrency", href: "/admin/audit-logs", icon: ClipboardList },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-noir-900 text-canvas-light flex flex-col shrink-0 border-r border-noir-800 min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-noir-800">
        <Link href="/" className="inline-block group">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-500" />
            <span className="font-serif text-xl tracking-[0.2em] font-bold text-white block group-hover:text-gold-400 transition-colors">
              LUMIÈRE
            </span>
          </div>
          <span className="text-[9px] tracking-[0.25em] text-gold-400 uppercase font-mono block mt-1">
            Control Room • SuperAdmin
          </span>
        </Link>
      </div>

      {/* Nav List with Sections */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold tracking-[0.15em] uppercase text-noir-400 mb-2">
              {section.title}
            </h4>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-sm text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? "bg-gold-600 text-noir-900 font-bold shadow-xs"
                      : "text-noir-300 hover:bg-noir-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-noir-900" : "text-gold-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-bold rounded text-white ${item.badgeColor || "bg-noir-700"}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer / Storefront Link */}
      <div className="p-4 border-t border-noir-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-noir-400 hover:text-white px-3 py-2 rounded-sm transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Storefront</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 px-3 py-2 rounded-sm transition-colors text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Admin</span>
        </button>
        <div className="px-3 text-[10px] text-noir-500 font-mono truncate" title={adminEmail || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "owner@lumiere.in"}>
          Admin: {adminEmail || "Authenticated"}
        </div>
      </div>
    </aside>
  );
}
