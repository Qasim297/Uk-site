import type { Metadata } from 'next';
import { Suspense } from 'react';
import CheckResults from '@/components/CheckResults';

export const metadata: Metadata = {
  title: 'Vehicle Check Results',
  description: 'Your AutoCheck Pro vehicle check results: MOT status, MOT history, mileage, tax and ULEZ compliance.',
  robots: { index: false, follow: true },
};

export default function CheckPage() {
  return (
    <Suspense fallback={<div className="section container"><p className="muted">Loading…</p></div>}>
      <CheckResults />
    </Suspense>
  );
}
