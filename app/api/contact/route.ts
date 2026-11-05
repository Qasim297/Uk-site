import { NextRequest, NextResponse } from 'next/server';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot field - bots fill it in, humans never see it.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const message = {
    name: clean(body.name, 100),
    email: clean(body.email, 200),
    subject: clean(body.subject, 100),
    registration: clean(body.registration, 10).toUpperCase(),
    message: clean(body.message, 5000),
    receivedAt: new Date().toISOString(),
  };

  const errors: Record<string, string> = {};
  if (message.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(message.email)) errors.email = 'Please enter a valid email address.';
  if (message.message.length < 10) errors.message = 'Please enter a message of at least 10 characters.';
  if (Object.keys(errors).length) return NextResponse.json({ error: 'Please check the form.', errors }, { status: 422 });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'AutoCheck Pro contact form', ...message }),
      });
      if (!res.ok) throw new Error(`Webhook status ${res.status}`);
    } catch (err) {
      console.error('[api/contact] delivery failed', err);
      return NextResponse.json(
        { error: 'We could not send your message right now. Please email us directly.' },
        { status: 502 },
      );
    }
  } else {
    console.info('[api/contact] New message (configure CONTACT_WEBHOOK_URL to forward):', message);
  }

  return NextResponse.json({ ok: true });
}
