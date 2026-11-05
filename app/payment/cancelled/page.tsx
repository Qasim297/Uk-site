import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = { title: 'Payment Cancelled', robots: { index: false, follow: false } };

export default function PaymentCancelledPage() {
  return (
    <PageHero eyebrow="Payment" title="Payment cancelled" subtitle="No payment was taken. You can return to pricing whenever you’re ready.">
      <div className="hero-actions">
        <Link href="/pricing" className="btn btn-primary">Back to Pricing</Link>
        <Link href="/" className="btn btn-ghost">Run a Free Check</Link>
      </div>
    </PageHero>
  );
}
