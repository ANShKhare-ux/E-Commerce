import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WelcomeAnnouncementModal } from "@/components/WelcomeAnnouncementModal";
import { PageTransition } from "@/components/PageTransition";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans bg-canvas-light text-noir-900 min-h-screen flex flex-col selection:bg-gold-500 selection:text-white antialiased">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-1 flex flex-col">
              <PageTransition>{children}</PageTransition>
            </main>
            <CartDrawer />
            <WelcomeAnnouncementModal />
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
