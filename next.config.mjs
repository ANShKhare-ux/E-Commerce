/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30-day cache for transformed images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "supabase.co",
      },
      {
        protocol: "https",
        hostname: "share.google",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "*.google.com",
      },
      {
        protocol: "https",
        hostname: "google.com",
      },
      {
        protocol: "https",
        hostname: "*.phonepe.com",
      },
      {
        protocol: "https",
        hostname: "phonepe.com",
      },
    ],
  },
  experimental: {
    // CRITICAL: Do NOT add "framer-motion" to optimizePackageImports.
    // In Next.js 15 App Router with Webpack, framer-motion uses dynamic proxies, shared animation
    // contexts, and non-modular internal state. AST barrel splitting causes Webpack runtime chunks
    // to fail with `Runtime TypeError: __webpack_modules__[moduleId] is not a function`.
    // Only verified, purely modular barrel packages like "lucide-react" belong here.
    optimizePackageImports: [
      "lucide-react",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co https://supabase.co https://mercury-uat.phonepe.com https://mercury.phonepe.com https://*.phonepe.com https://phonepe.com https://*.googleusercontent.com https://googleusercontent.com https://share.google https://drive.google.com https://*.google.com https://google.com",
              "connect-src 'self' https://*.supabase.co https://api.phonepe.com https://api-preprod.phonepe.com https://mercury-uat.phonepe.com https://mercury.phonepe.com https://track.delhivery.com https://staging-express.delhivery.com https://express.delhivery.com",
              "frame-src 'self' https://mercury-uat.phonepe.com https://mercury.phonepe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://accounts.google.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "production"
                ? "public, max-age=31536000, immutable"
                : "no-store, no-cache, must-revalidate",
          },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(svg|png|jpg|jpeg|webp|avif|ico|webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
  webpack(config) {
    // Silence big string serialization cache warnings from PackFileCacheStrategy
    config.infrastructureLogging = {
      ...config.infrastructureLogging,
      level: "error",
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
