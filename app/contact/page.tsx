import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageSquareText } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the AutoCheck Pro team about vehicle checks, premium reports, payments or trade accounts.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We’re Here to Help"
        subtitle="Questions about a report, a payment or a trade account? Send us a message and we’ll get back to you."
      />

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info">
            <div className="info-card">
              <span className="feature-icon sm"><Mail size={20} /></span>
              <div>
                <h3>Email</h3>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
            <div className="info-card">
              <span className="feature-icon sm"><Clock size={20} /></span>
              <div>
                <h3>Support hours</h3>
                <p>{site.supportHours}</p>
              </div>
            </div>
            <div className="info-card">
              <span className="feature-icon sm"><MessageSquareText size={20} /></span>
              <div>
                <h3>Response time</h3>
                <p>We aim to reply within one working day.</p>
              </div>
            </div>
            <div className="info-card">
              <span className="feature-icon sm"><MapPin size={20} /></span>
              <div>
                <h3>Location</h3>
                <p>{site.location}</p>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h2>Send us a message</h2>
            <p className="muted">Fields marked * are required.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">Support FAQ</p>
            <h2 className="section-title">Before you get in touch</h2>
          </div>
          <FAQ
            items={[
              { q: 'The vehicle details look wrong. What should I do?', a: 'Vehicle records come from official sources. If DVLA details are wrong, contact the DVLA. If an MOT record is wrong, contact the MOT testing station or DVSA.' },
              { q: 'Why did my search say “vehicle not found”?', a: 'Double-check the registration. Very new vehicles, Northern Ireland MOTs and some older or specialist vehicles may not have records available.' },
              { q: 'How do I request a refund?', a: 'Use the form above and choose “Payments & refunds”, including your payment email and the registration you checked.' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
