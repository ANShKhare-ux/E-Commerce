import React from "react";
import { Metadata } from "next";
import { AccountClient } from "./AccountClient";

export const metadata: Metadata = {
  title: "Patron Account & Orders | LUMIÈRE Atelier",
  description: "View your order history, Delhivery tracking, shipping coordinates, and account preferences.",
};

export default function AccountPage() {
  return <AccountClient />;
}
