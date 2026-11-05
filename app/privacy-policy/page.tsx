import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How AutoCheck Pro collects, uses and protects your personal data under UK GDPR and the Data Protection Act 2018.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: 1 January 2026" compact />
      <section className="section">
        <article className="container prose">
          <h2>1. Who we are</h2>
          <p>
            AutoCheck Pro (“we”, “us”, “our”) is an independent UK vehicle checking service owned and operated by{' '}
            {site.owner}. We are the data controller for the personal data described in this policy. You can contact us
            at <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>2. Information we collect</h2>
          <ul>
            <li><strong>Vehicle searches:</strong> the registration numbers you enter. A registration number on its own does not identify you.</li>
            <li><strong>Contact details:</strong> your name, email address and message when you use our contact form.</li>
            <li><strong>Purchase information:</strong> your email address, billing details and the vehicle checked when you buy a Premium Report. Card payments are processed by our payment provider; we never see or store your full card details.</li>
            <li><strong>Technical data:</strong> IP address, browser type and usage information used to keep the service secure and prevent abuse.</li>
          </ul>

          <h2>3. How we use your information</h2>
          <ul>
            <li>To provide vehicle check results and Premium Reports you request (performance of a contract).</li>
            <li>To respond to your enquiries (legitimate interests).</li>
            <li>To process payments and keep financial records (legal obligation).</li>
            <li>To protect our service from fraud, abuse and excessive automated requests (legitimate interests).</li>
            <li>To improve our website and services (legitimate interests).</li>
          </ul>

          <h2>4. Sharing your information</h2>
          <p>
            We share data only where necessary with trusted processors, including our hosting provider, payment provider
            and licensed vehicle data providers. Registration numbers are sent to vehicle data sources such as the DVSA
            MOT History API and the DVLA Vehicle Enquiry Service to retrieve results. We never sell your personal data.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use only essential cookies needed for the website to function and to keep it secure. If we introduce
            analytics or marketing cookies in future, we will ask for your consent first.
          </p>

          <h2>6. How long we keep data</h2>
          <p>
            Contact enquiries are kept for up to 24 months. Purchase records are kept for six years to meet UK tax
            requirements. Technical logs are kept for a short period for security purposes.
          </p>

          <h2>7. Your rights</h2>
          <p>Under UK GDPR you have the right to:</p>
          <ul>
            <li>access the personal data we hold about you;</li>
            <li>ask us to correct inaccurate data;</li>
            <li>ask us to delete your data;</li>
            <li>object to or restrict certain processing;</li>
            <li>data portability.</li>
          </ul>
          <p>
            To exercise any of these rights, email <a href={`mailto:${site.email}`}>{site.email}</a>. If you are unhappy
            with how we handle your data, you can complain to the Information Commissioner’s Office (ICO) at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
          </p>

          <h2>8. Security</h2>
          <p>
            All traffic to our website is encrypted using HTTPS. API credentials are stored securely on our servers and
            are never exposed to your browser.
          </p>

          <h2>9. Changes to this policy</h2>
          <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
        </article>
      </section>
    </>
  );
}
