import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/products';
import { validateAffiliateUrl } from '@/lib/affiliate';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. Rate limiting check (up to 60 requests/minute per client IP)
  const clientIp = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`outbound:${clientIp}`, {
    windowMs: 60 * 1000,
    maxRequests: 60,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many outbound requests. Please try again shortly.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimit.resetMs / 1000)),
        },
      }
    );
  }

  const rawId = params?.id;
  if (!rawId || typeof rawId !== 'string') {
    return NextResponse.json(
      { error: 'Product identifier is required.' },
      { status: 400 }
    );
  }

  const cleanId = decodeURIComponent(rawId).trim();

  // 2. Resolve product strictly from trusted server storage
  const product = await getProductById(cleanId);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found or inactive in our directory.' },
      { status: 404 }
    );
  }

  // 3. Validate destination URL against safety rules & domain whitelist
  const validation = validateAffiliateUrl(product.affiliateUrl);

  if (!validation.isValid || !validation.sanitizedUrl) {
    console.error(`[Affiliate Security Warning] Invalid outbound URL for product ${cleanId}: ${validation.error}`);
    return NextResponse.json(
      {
        error: 'Outbound affiliate destination failed security validation.',
      },
      { status: 400 }
    );
  }

  // 4. Issue HTTP 307 Temporary Redirect with secure Referrer Policy & Cache headers
  const response = NextResponse.redirect(validation.sanitizedUrl, { status: 307 });
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  return response;
}
