import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { PageTransition } from "@/components/PageTransition";
import { IntroEntranceAnimation } from "@/components/IntroEntranceAnimation";
import { ScrollProgress } from "@/components/ScrollProgress";

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Zero-latency intro execution shield:
            Executes synchronously before First Contentful Paint.
            - If returning patron, refreshing (F5), or on excluded auth/admin routes in the current tab: immediately dismisses intro curtain before any pixel paints.
            - If first-time entry or opening in another tab: ensures the luxury veil remains active from frame 0 so the underlying storefront NEVER flashes. */}
        <script
          id="lumiere-intro-shield"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var p = window.location.pathname || '';
                var isExcluded = /^\\/(admin|login|signup|forgot-password|reset-password|auth)/.test(p);
                var q = window.location.search || '';
                var forceReplay = /(?:[?&])(intro=true|replay=1)/i.test(q);
                var isDone = false;
                try {
                  if (!forceReplay) {
                    if (window.__lumiere_intro_completed === true) isDone = true;
                    var sessWorked = false;
                    if (!isDone && window.sessionStorage) {
                      try {
                        var s = window.sessionStorage.getItem('lumiere_intro_completed');
                        sessWorked = true;
                        if (s === 'true') isDone = true;
                      } catch(e) {}
                    }
                    if (!isDone && !sessWorked && window.localStorage) {
                      try {
                        if (window.localStorage.getItem('lumiere_intro_completed') === 'true') isDone = true;
                      } catch(e) {}
                    }
                  }
                } catch(e) {}
                if (isExcluded || isDone) {
                  document.documentElement.classList.add('lumiere-intro-dismissed');
                  window.__lumiere_intro_completed = true;
                } else {
                  document.documentElement.classList.add('lumiere-intro-active');
                }
              } catch(e) {}
            })();`,
          }}
        />
        {/* Critical zero-latency display controller: prevents FOUC before external CSS bundles load */}
        <style
          id="lumiere-intro-critical-css"
          dangerouslySetInnerHTML={{
            __html: `
              html.lumiere-intro-dismissed #lumiere-intro-backdrop,
              html.lumiere-intro-dismissed #lumiere-intro-overlay {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
              }
              html.lumiere-intro-active #lumiere-intro-backdrop {
                display: block !important;
              }
            `,
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                #lumiere-intro-backdrop, #lumiere-intro-overlay {
                  display: none !important;
                }
              `,
            }}
          />
        </noscript>
      </head>
      <body className="font-sans bg-canvas-light text-noir-900 min-h-screen flex flex-col selection:bg-gold-500 selection:text-white antialiased overflow-x-hidden">
        {/* Zero-latency frame-0 presentation backdrop:
            Paints deep atelier noir (#08080a) on frame 0 of tab entry with ZERO static image or text,
            shielding the underlying storefront from flashing before React mounts. */}
        <div
          id="lumiere-intro-backdrop"
          className="fixed inset-0 z-[99998] bg-[#08080a] select-none pointer-events-auto hidden"
          aria-hidden="true"
        />
        <ScrollProgress />
        <IntroEntranceAnimation />
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-1 flex flex-col overflow-x-hidden">
              <PageTransition>{children}</PageTransition>
            </main>
            <CartDrawer />
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
