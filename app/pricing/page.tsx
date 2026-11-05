import type { Metadata } from 'next';
import { CircleCheck, CircleMinus } from 'lucide-react';
import PageHero from '@/components/PageHero';
import PricingCards from '@/components/PricingCards';
import FAQ from '@/components/FAQ';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Pricing – Free & Premium Vehicle Reports',
  description:
    'Free UK vehicle checks plus premium vehicle history reports with finance, write-off, stolen and keeper checks. Simple, one-off pricing with no subscription.',
  alternates: { canonical: '/pricing' },
};

const comparison: [string, boolean, boolean][] = [
  ['Make, model, colour & fuel type', true, true],
  ['MOT status & expiry date', true, true],
  ['Full MOT pass & fail history', true, true],
  ['Recorded mileage history', true, true],
  ['Vehicle tax status', true, true],
  ['ULEZ compliance estimate', true, true],
  ['Outstanding finance check', false, true],
  ['Insurance write-off check', false, true],
  ['Stolen vehicle check', false, true],
  ['Plate & colour change history', false, true],
  ['Number of previous keepers', false, true],
  ['Downloadable PDF report', false, true],
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, Transparent Pricing"
        subtitle="Start with a free check. Upgrade to a Premium Report when you’re ready to buy. No subscriptions, no hidden fees."
      />

      <section className="section section-alt">
        <div className="container">
          <PricingCards showRegInput />
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">Compare</p>
            <h2 className="section-title">Free vs Premium</h2>
          </div>
          <div className="table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Free</th>
                  <th scope="col">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, free, premium]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{free ? <CircleCheck className="yes" size={20} aria-label="Included" /> : <CircleMinus className="no" size={20} aria-label="Not included" />}</td>
                    <td>{premium ? <CircleCheck className="yes" size={20} aria-label="Included" /> : <CircleMinus className="no" size={20} aria-label="Not included" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Pricing questions</h2>
          </div>
          <FAQ
            items={[
              { q: 'Is there a subscription?', a: 'No. Free checks are always free, and Premium Reports and Bundles are one-off payments.' },
              { q: 'How do I pay?', a: 'Payments are handled by our secure payment provider. We accept major debit and credit cards. We never see or store your card details.' },
              { q: 'Can I get a refund?', a: 'If a Premium Report cannot be produced for your vehicle, we will refund you in full. See our Terms and Conditions for details.' },
              { q: 'Do you offer trade accounts?', a: 'Yes — dealers and traders who need regular checks can contact us to discuss volume pricing.' },
            ]}
          />
        </div>
      </section>

      <CtaBand title="Try a free check first" />
    </>
  );
}
