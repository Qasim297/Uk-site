import type { Metadata } from 'next';
import Link from 'next/link';
import { CircleCheck } from 'lucide-react';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = { title: 'Payment Successful', robots: { index: false, follow: false } };

export default function PaymentSuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const ref = searchParams.session_id ? searchParams.session_id.slice(-10).toUpperCase() : null;
  return (
    <PageHero eyebrow="Payment" title="Thank you for your order" subtitle="Your payment was successful. A receipt will be sent to the email address you used at checkout.">
      <div className="hero-result">
        <CircleCheck size={48} />
        {ref && <p>Order reference: <strong>{ref}</strong></p>}
        <p>If you have any questions about your report, please contact us quoting your order reference.</p>
        <div className="hero-actions">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/contact" className="btn btn-ghost">Contact Support</Link>
        </div>
      </div>
    </PageHero>
  );
}
