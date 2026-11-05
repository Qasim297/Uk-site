import { NextRequest, NextResponse } from 'next/server';
import { isValidReg, normaliseReg } from '@/lib/registration';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Plan id -> env var holding the Stripe Price ID. Prices are set in the Stripe dashboard,
// never trusted from the browser.
const PRICE_ENV: Record<string, string> = {
  premium: 'STRIPE_PRICE_PREMIUM',
  bundle: 'STRIPE_PRICE_BUNDLE',
};

export async function POST(req: NextRequest) {
  if (!rateLimit(`checkout:${clientIp(req)}`, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  let body: { plan?: string; registration?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const plan = body.plan || '';
  if (!PRICE_ENV[plan]) return NextResponse.json({ error: 'Unknown plan.' }, { status: 400 });

  const registration = normaliseReg(body.registration || '');
  if (plan === 'premium' && !isValidReg(registration)) {
    return NextResponse.json({ error: 'Please enter a valid registration for your report.' }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const price = process.env[PRICE_ENV[plan]];
  if (!secret || !price) {
    return NextResponse.json(
      { error: 'Online payments are not enabled yet. Please contact us to order a premium report.' },
      { status: 503 },
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const params = new URLSearchParams({
    mode: 'payment',
    'line_items[0][price]': price,
    'line_items[0][quantity]': '1',
    success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/payment/cancelled`,
    'metadata[plan]': plan,
    'metadata[registration]': registration,
    billing_address_collection: 'auto',
    locale: 'en-GB',
  });

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
      cache: 'no-store',
    });
    const data = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !data.url) {
      console.error('[api/checkout] Stripe error', data.error?.message);
      return NextResponse.json({ error: 'Payment could not be started. Please try again.' }, { status: 502 });
    }
    return NextResponse.json({ url: data.url });
  } catch (err) {
    console.error('[api/checkout] failed', err);
    return NextResponse.json({ error: 'Payment could not be started. Please try again.' }, { status: 502 });
  }
}
