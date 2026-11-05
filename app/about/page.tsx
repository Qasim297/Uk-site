import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Eye, HeartHandshake, Lock, Scale, Target, UserRound } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'AutoCheck Pro is an independent UK vehicle checking platform created and owned by Muhammad Qasim, helping car buyers check MOT history, mileage, tax and ULEZ before they buy.',
  alternates: { canonical: '/about' },
};

const values = [
  { icon: Eye, title: 'Transparency', text: 'Clear information, clearly labelled. We never present sample data as real vehicle information.' },
  { icon: Scale, title: 'Independence', text: 'We are not tied to any dealer or manufacturer, so our reports are impartial.' },
  { icon: Lock, title: 'Privacy & security', text: 'Searches are encrypted and we collect only the data needed to provide our service.' },
  { icon: HeartHandshake, title: 'Customer first', text: 'Friendly UK-based support to help you understand your report.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AutoCheck Pro"
        title="Helping UK Drivers Buy With Confidence"
        subtitle="We make vehicle information simple, accessible and easy to understand — for everyone."
      />

      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="section-title">Why we built AutoCheck Pro</h2>
            <p className="lead-text">
              Buying a used car is one of the biggest purchases most people make — yet the important facts are often
              hidden in hard-to-read records. AutoCheck Pro was created to change that.
            </p>
            <p className="lead-text">
              We bring together MOT history, recorded mileage, tax status and ULEZ information into a single, beautifully
              clear report. Whether you are buying privately, from a dealer or checking your own vehicle, we help you
              spot problems before they become yours.
            </p>
          </Reveal>
          <Reveal delay={120} className="mission-card">
            <span className="feature-icon"><Target size={24} /></span>
            <h3>Our mission</h3>
            <p>
              To give every UK motorist free, instant access to the vehicle information they need — and to make premium
              vehicle history reports affordable for everyone.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Our values</p>
            <h2 className="section-title">What we stand for</h2>
          </div>
          <div className="card-grid card-grid-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 80} className="feature-card">
                  <span className="feature-icon"><Icon size={24} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <Reveal className="owner-card">
            <span className="owner-avatar" aria-hidden="true"><UserRound size={40} /></span>
            <div>
              <p className="eyebrow">Founder &amp; Owner</p>
              <h2>{site.owner}</h2>
              <p>
                AutoCheck Pro is created and owned by {site.owner}. Built with a passion for cars and technology, the
                platform is designed to give UK buyers a fast, trustworthy and transparent way to check any vehicle.
              </p>
              <Link href="/contact" className="btn btn-outline">
                Get in touch <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <p className="muted small center mt">
            AutoCheck Pro is an independent business and is not affiliated with, endorsed by or connected to the DVLA,
            DVSA, TfL or any UK government body.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
