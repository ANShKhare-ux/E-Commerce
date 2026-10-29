import React from "react";
import { db } from "@/lib/db";
import { ReturnsClient } from "./ReturnsClient";

export const dynamic = "force-dynamic";

export default async function AdminReturnsPage() {
  const returns = await db.returns.getAll();
  return <ReturnsClient initialReturns={returns} />;
}
