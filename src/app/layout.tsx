import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "LUMIÈRE | Haute Horlogerie & Fashion Atelier — India",
  description: "Handcrafted Indian Chanderi silks, bespoke tailoring, heavyweight streetwear, and curated luxury fashion. Express Delhivery shipping across India.",
  keywords: ["LUMIÈRE", "Indian luxury fashion", "Chanderi silk", "Bandhani lehenga", "District Zero streetwear", "Delhivery express shipping"],
  authors: [{ name: "LUMIÈRE Atelier" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "LUMIÈRE | Modern Indian Luxury Fashion",
    description: "Handcrafted Indian luxury textiles, bespoke tailoring, and curated fashion discoveries.",
    url: "https://lumiere.in",
    siteName: "LUMIÈRE",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas-light text-noir-900 min-h-screen flex flex-col selection:bg-gold-500 selection:text-white">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
