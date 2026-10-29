import React from "react";
import { db } from "@/lib/db";
import { AffiliateClient } from "./AffiliateClient";

export const dynamic = "force-dynamic";

export default async function AdminAffiliatePage() {
  const queue = await db.affiliate.getQueue();
  return <AffiliateClient initialQueue={queue} />;
}
