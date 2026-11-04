import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { isConfiguredAdminEmail } from "@/lib/auth/admin";
import { AccountClient } from "./AccountClient";

export const metadata: Metadata = {
  title: "My Account & Orders | LUMIÈRE",
  description: "View your order history, Delhivery tracking, shipping coordinates, and account preferences.",
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder-project");

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If Supabase is configured and there's no authenticated user, redirect to login
    if (!user || !user.email) {
      if (isSupabaseConfigured) {
        redirect("/login?redirect=/account");
      }

      // In local development sandbox without Supabase keys yet:
      const orders = await db.orders.getAll();
      return (
        <AccountClient
          initialUser={{
            id: "dev-sandbox-user",
            email: "member@lumiere.in",
            fullName: "Account Member (Sandbox)",
            phone: "+91 98200 12345",
            role: "customer",
          }}
          initialAddresses={[
            {
              id: "addr-sandbox-1",
              full_name: "Account Member",
              phone: "9820012345",
              address_line1: "Sea Green Apartments, Worli",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400018",
              is_default: true,
            },
          ]}
          initialOrders={orders}
        />
      );
    }

    // Authenticated user exists: fetch profile, addresses, and orders in parallel
    const [profileRes, addressesRes, orders] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, email, full_name, phone, role")
        .eq("id", user.id)
        .single(),
      supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false }),
      db.orders.getAll({ customerEmail: user.email }),
    ]);

    const profile = profileRes.data;
    const addresses = addressesRes.data;

    return (
      <AccountClient
        initialUser={{
          id: user.id,
          email: user.email,
          fullName:
            profile?.full_name ||
            user.user_metadata?.full_name ||
            user.email.split("@")[0],
          phone: profile?.phone || user.user_metadata?.phone || "",
          role: isConfiguredAdminEmail(user.email) ? "super_admin" : (profile?.role || "customer"),
        }}
        initialAddresses={addresses || []}
        initialOrders={orders}
      />
    );
  } catch (error: any) {
    if (error?.digest?.startsWith?.("NEXT_REDIRECT")) {
      throw error;
    }
    if (isSupabaseConfigured) {
      redirect("/login?redirect=/account");
    }
    // Fallback in dev sandbox
    const orders = await db.orders.getAll();
    return (
      <AccountClient
        initialUser={{
          id: "dev-sandbox-user",
          email: "member@lumiere.in",
          fullName: "Account Member",
          phone: "+91 98200 12345",
          role: "customer",
        }}
        initialAddresses={[]}
        initialOrders={orders}
      />
    );
  }
}
