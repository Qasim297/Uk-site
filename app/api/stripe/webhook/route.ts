import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const TOLERANCE_SECONDS = 300;

/** Verifies the Stripe-Signature header (HMAC-SHA256) without the Stripe SDK. */
function verifySignature(payload: string, header: string, secret: string): boolean {
  const parts = header.split(',').map((p) => p.split('='));
  const timestamp = parts.find(([k]) => k === 't')?.[1];
  const signatures = parts.filter(([k]) => k === 'v1').map(([, v]) => v);
  if (!timestamp || signatures.length === 0) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > TOLERANCE_SECONDS) return false;

  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex');
  const expectedBuf = Buffer.from(expected, 'utf8');
  return signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, 'utf8');
    return sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);
  });
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });

  const signature = req.headers.get('stripe-signature');
  const payload = await req.text();
  if (!signature || !verifySignature(payload, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(payload) as { type: string; data: { object: Record<string, unknown> } };

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as { id?: string; metadata?: Record<string, string>; customer_details?: { email?: string } };
    // TODO: fulfil the order - generate the premium report via your licensed data
    // provider and email it to session.customer_details?.email.
    console.info('[stripe] Payment completed', {
      session: session.id,
      plan: session.metadata?.plan,
      registration: session.metadata?.registration,
    });
  }

  return NextResponse.json({ received: true });
}
