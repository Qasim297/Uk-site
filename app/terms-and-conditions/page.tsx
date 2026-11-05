import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'The terms and conditions for using AutoCheck Pro vehicle checks and Premium Reports.',
  alternates: { canonical: '/terms-and-conditions' },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms and Conditions" subtitle="Last updated: 1 January 2026" compact />
      <section className="section">
        <article className="container prose">
          <h2>1. About these terms</h2>
          <p>
            These terms apply to your use of the AutoCheck Pro website and services, owned and operated by {site.owner}.
            By using our website you agree to these terms. If you do not agree, please do not use our services.
          </p>

          <h2>2. Independence</h2>
          <p>
            AutoCheck Pro is an independent service. We are <strong>not affiliated with, endorsed by or connected to</strong>{' '}
            the Driver and Vehicle Licensing Agency (DVLA), the Driver and Vehicle Standards Agency (DVSA), Transport for
            London (TfL) or any other government body.
          </p>

          <h2>3. Our services</h2>
          <p>
            We provide free vehicle checks (including MOT status, MOT history, recorded mileage, tax status and an ULEZ
            estimate) and paid Premium Reports. Information is obtained from official and third-party data sources and
            is presented as received. Where our service is running without live data credentials, sample results are
            clearly labelled as <strong>DEMO DATA</strong> and must not be relied upon.
          </p>

          <h2>4. Accuracy of information</h2>
          <p>
            We work hard to present accurate information, but we cannot guarantee that data supplied by third parties is
            complete, accurate or up to date. Our reports are for guidance only and should not replace a physical
            inspection, a review of the vehicle’s documents or independent professional advice. ULEZ results are
            estimates; always confirm with TfL.
          </p>

          <h2>5. Acceptable use</h2>
          <ul>
            <li>You must not use automated tools to scrape or bulk-query our service.</li>
            <li>You must not use our service for any unlawful purpose.</li>
            <li>You must not attempt to interfere with the security or operation of the website.</li>
          </ul>

          <h2>6. Payments</h2>
          <p>
            Prices for Premium Reports are shown on our <a href="/pricing">Pricing</a> page and include VAT where
            applicable. Payments are processed securely by our payment provider. Bundle credits must be used within 12
            months of purchase.
          </p>

          <h2>7. Cancellations and refunds</h2>
          <p>
            Premium Reports are digital content supplied immediately. By purchasing, you agree that the report is
            delivered straight away and you acknowledge that you lose your 14-day cancellation right once delivery has
            begun. If we are unable to produce a report for your vehicle, or the report is materially faulty, we will
            provide a full refund. Your statutory rights under the Consumer Rights Act 2015 are not affected.
          </p>

          <h2>8. Liability</h2>
          <p>
            Nothing in these terms limits our liability for death or personal injury caused by negligence, fraud, or any
            liability that cannot be excluded by law. Otherwise, our total liability to you for any claim relating to a
            report is limited to the amount you paid for that report. We are not liable for any decision to buy or not
            buy a vehicle.
          </p>

          <h2>9. Intellectual property</h2>
          <p>
            The AutoCheck Pro name, logo, website design and content are owned by {site.owner}. Public sector
            information is used under the Open Government Licence v3.0.
          </p>

          <h2>10. Governing law</h2>
          <p>These terms are governed by the laws of England and Wales, and the courts of England and Wales have jurisdiction.</p>

          <h2>11. Contact</h2>
          <p>
            Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </article>
      </section>
    </>
  );
}
