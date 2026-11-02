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
import { IntroEntranceAnimation } from "@/components/IntroEntranceAnimation";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://lumiere.in"),
  title: {
    default: "LUMIÈRE | Haute Horlogerie & Fashion Atelier — India",
    template: "%s | LUMIÈRE Atelier",
  },
  description: "Handcrafted Indian Chanderi silks, bespoke tailoring, heavyweight streetwear, and curated luxury fashion. Express Delhivery shipping across India.",
  keywords: ["LUMIÈRE", "Indian luxury fashion", "Chanderi silk", "Bandhani lehenga", "District Zero streetwear", "Delhivery express shipping", "haute couture India"],
  authors: [{ name: "LUMIÈRE Atelier", url: "https://lumiere.in" }],
  creator: "LUMIÈRE Atelier",
  publisher: "LUMIÈRE Luxury Retail Private Limited",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LUMIÈRE | Modern Indian Luxury Fashion",
    description: "Handcrafted Indian luxury textiles, bespoke tailoring, and curated fashion discoveries.",
    url: "https://lumiere.in",
    siteName: "LUMIÈRE",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/lumiere-lockup-horizontal-black-1024.png",
        width: 1024,
        height: 320,
        alt: "LUMIÈRE Haute Horlogerie & Fashion Atelier India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMIÈRE | Modern Indian Luxury Fashion",
    description: "Handcrafted Indian luxury textiles, bespoke tailoring, and curated fashion discoveries.",
    creator: "@lumiere_india",
    site: "@lumiere_india",
    images: ["/brand/lumiere-lockup-horizontal-black-1024.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans bg-canvas-light text-noir-900 min-h-screen flex flex-col selection:bg-gold-500 selection:text-white antialiased">
        <IntroEntranceAnimation />
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
