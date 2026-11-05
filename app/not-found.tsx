import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function NotFound() {
  return (
    <PageHero eyebrow="Error 404" title="Page not found" subtitle="Sorry, the page you were looking for has moved or doesn’t exist.">
      <div className="hero-actions">
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Contact Us
        </Link>
      </div>
    </PageHero>
  );
}
