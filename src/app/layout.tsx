import type { Metadata } from 'next';
import './globals.css';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'LUMIÈRE — Premium Fashion Affiliate Discovery & Curated Wardrobe',
    template: '%s | LUMIÈRE Fashion',
  },
  description:
    'Discover curated contemporary clothing, artisanal Indian handlooms, French linens, and raw Japanese denim across Myntra, Ajio, Tata CLiQ, and Amazon. Verified prices in INR (₹).',
  keywords: [
    'fashion affiliate',
    'curated clothing India',
    'linen shirts',
    'selvedge denim',
    'designer dresses',
    'under 999 fashion',
    'chanderi silk saree',
    'menswear India',
    'womenswear India',
    'Myntra affiliate',
    'Ajio Luxe',
    'Tata CLiQ Luxury',
  ],
  authors: [{ name: 'LUMIÈRE Atelier Fashion' }],
  creator: 'LUMIÈRE Fashion',
  publisher: 'LUMIÈRE Fashion Discovery',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'LUMIÈRE Fashion Discovery',
    title: 'LUMIÈRE — Premium Fashion Affiliate Discovery',
    description:
      'Curated fashion discovery across top Indian retailers with verified INR pricing and transparent affiliate recommendations.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format',
        width: 1200,
        height: 630,
        alt: 'LUMIÈRE Fashion Editorial Discovery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUMIÈRE — Premium Fashion Affiliate Discovery',
    description: 'Curated fashion discovery across top Indian retailers.',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#141414] antialiased selection:bg-black selection:text-white">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-white text-xs uppercase tracking-widest font-semibold focus:outline-none"
        >
          Skip to main content
        </a>

        <AnnouncementBar />
        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
