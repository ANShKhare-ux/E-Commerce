import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { AccountClient } from "./AccountClient";

export const metadata: Metadata = {
  title: "Patron Account & Orders | LUMIÈRE Atelier",
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
            email: "patron@lumiere.in",
            fullName: "Atelier Patron (Sandbox)",
            phone: "+91 98200 12345",
            role: "customer",
          }}
          initialAddresses={[
            {
              id: "addr-sandbox-1",
              full_name: "Atelier Patron",
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

    // Authenticated user exists: fetch profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, full_name, phone, role")
      .eq("id", user.id)
      .single();

    // Fetch addresses
    const { data: addresses } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false });

    // Fetch customer orders
    const orders = await db.orders.getAll({ customerEmail: user.email });

    return (
      <AccountClient
        initialUser={{
          id: user.id,
          email: user.email,
          fullName:
            profile?.full_name ||
            user.user_metadata?.full_name ||
            user.email.split("@")[0],
          phone: profile?.phone || "",
          role: profile?.role || "customer",
        }}
        initialAddresses={addresses || []}
        initialOrders={orders}
      />
    );
  } catch (error) {
    if (isSupabaseConfigured) {
      redirect("/login?redirect=/account");
    }
    // Fallback in dev sandbox
    const orders = await db.orders.getAll();
    return (
      <AccountClient
        initialUser={{
          id: "dev-sandbox-user",
          email: "patron@lumiere.in",
          fullName: "Atelier Patron",
          phone: "+91 98200 12345",
          role: "customer",
        }}
        initialAddresses={[]}
        initialOrders={orders}
      />
    );
  }
}
