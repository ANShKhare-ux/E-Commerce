import React from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { HomepageClient } from "./HomepageClient";

export const metadata: Metadata = {
  title: "Homepage Studio | LUMIÈRE Admin Control Room",
};

export default async function AdminHomepagePage() {
  const config = await db.homepage.get();
  return <HomepageClient initialConfig={config} />;
}
