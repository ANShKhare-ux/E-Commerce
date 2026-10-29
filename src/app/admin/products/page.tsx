import React from "react";
import { db } from "@/lib/db";
import { ProductsClient } from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await db.products.getAll();

  return <ProductsClient initialProducts={products} />;
}
