import { NextRequest, NextResponse } from 'next/server';
import { newsletterFormSchema } from '@/lib/validation';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting: 5 newsletter subscriptions per 10 minutes per IP
  const clientIp = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`newsletter:${clientIp}`, {
    windowMs: 10 * 60 * 1000,
    maxRequests: 5,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many subscription attempts. Please wait a few moments before trying again.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimit.resetMs / 1000)),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const result = newsletterFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid email address.',
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    if (result.data.honeypot) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({
      success: true,
      message:
        'Thank you for joining the LUMIÈRE Fashion Journal. You will receive our weekly curation edits.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Malformed request body' },
      { status: 400 }
    );
  }
}
