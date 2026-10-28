import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting: 5 contact submissions per 10 minutes per IP
  const clientIp = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`contact:${clientIp}`, {
    windowMs: 10 * 60 * 1000,
    maxRequests: 5,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many submissions. Please wait a few moments before trying again.',
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
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Check honeypot for bot submissions
    if (result.data.honeypot) {
      // Silently discard spam bots
      return NextResponse.json({ success: true });
    }

    // In local demonstration mode, we validate and acknowledge without sending real emails
    return NextResponse.json({
      success: true,
      message:
        'Your message has been received by LUMIÈRE Concierge. (Note: Demonstration environment active; no live email was dispatched).',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Malformed request body' },
      { status: 400 }
    );
  }
}
