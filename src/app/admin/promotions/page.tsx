import React from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { PromotionsClient } from "./PromotionsClient";

export const metadata: Metadata = {
  title: "Promotions & Coupons | LUMIÈRE Admin Control Room",
};

export default async function AdminPromotionsPage() {
  const coupons = await db.coupons.getAll();
  return <PromotionsClient initialCoupons={coupons} />;
}
