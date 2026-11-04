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
            - If returning patron, refreshing (F5), or on excluded auth/admin routes: immediately dismisses intro curtain before any pixel paints.
            - If first-time entry: ensures the luxury curtain remains active from frame 0 so the underlying storefront NEVER flashes. */}
        <script
          id="lumiere-intro-shield"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var p = window.location.pathname || '';
                var isExcluded = /^\\/(admin|login|signup|forgot-password|reset-password|auth)/.test(p);
                var isDone = false;
                try {
                  if (window.__lumiere_intro_completed === true) isDone = true;
                  if (!isDone && window.sessionStorage && window.sessionStorage.getItem('lumiere_intro_completed') === 'true') isDone = true;
                  if (!isDone && window.localStorage && window.localStorage.getItem('lumiere_intro_completed') === 'true') isDone = true;
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
              html.lumiere-intro-dismissed #lumiere-intro-curtain,
              html.lumiere-intro-dismissed #lumiere-intro-overlay {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
              }
              html:not(.lumiere-intro-dismissed) #lumiere-intro-curtain {
                display: flex !important;
              }
            `,
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                #lumiere-intro-curtain, #lumiere-intro-overlay {
                  display: none !important;
                }
              `,
            }}
          />
        </noscript>
      </head>
      <body className="font-sans bg-canvas-light text-noir-900 min-h-screen flex flex-col selection:bg-gold-500 selection:text-white antialiased overflow-x-hidden">
        {/* Initial zero-latency frame-0 presentation curtain:
            Paints deep atelier noir with authentic brand insignia on frame 0 of first entry, completely shielding the underlying page before hydration. */}
        <div
          id="lumiere-intro-curtain"
          className="fixed inset-0 z-[99998] bg-[#08080a] items-center justify-center flex flex-col select-none pointer-events-auto"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,72,0.14)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <svg viewBox="0 0 256 256" width="76" height="76" className="filter drop-shadow-[0_0_16px_rgba(197,155,72,0.45)]" role="img" aria-label="LUMIÈRE Emblem">
                <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z" fill="#C59B48"/>
                <polygon points="144,80 174,110 144,140 114,110" fill="#C59B48"/>
              </svg>
            </div>
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.42em] text-white font-light uppercase pl-2">
              LUMIÈRE
            </span>
            <span className="text-[10px] tracking-[0.45em] text-[#C59B48] uppercase font-mono mt-2 opacity-80">
              Haute Horlogerie & Fashion Atelier
            </span>
          </div>
        </div>
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
