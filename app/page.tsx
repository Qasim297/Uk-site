import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Car,
  CircleCheck,
  ClipboardCheck,
  FileText,
  Gauge,
  History,
  Keyboard,
  Leaf,
  Lock,
  Receipt,
  ScanSearch,
  ShieldCheck,
  Zap,
  CircleX,
} from 'lucide-react';
import RegSearch from '@/components/RegSearch';
import Reveal from '@/components/Reveal';
import FAQ, { type FaqItem } from '@/components/FAQ';
import PricingCards from '@/components/PricingCards';
import CtaBand from '@/components/CtaBand';

const features = [
  { icon: ClipboardCheck, title: 'Free MOT History Check', text: 'See every MOT test result on record for any UK vehicle — completely free.', href: '/mot-history' },
  { icon: CalendarClock, title: 'MOT Expiry Date', text: 'Know exactly when the current MOT runs out so you never get caught out.', href: '/mot-check' },
  { icon: Car, title: 'Vehicle Make & Model', text: 'Confirm the make, model, colour, fuel type and engine size match the advert.', href: '/mot-check' },
  { icon: Gauge, title: 'Mileage History', text: 'Track recorded odometer readings and spot signs of possible clocking.', href: '/mileage-check' },
  { icon: History, title: 'MOT Pass & Fail Records', text: 'Review failures, defects and advisories to reveal how the car has been maintained.', href: '/mot-history' },
  { icon: Receipt, title: 'Vehicle Tax Information', text: 'Check whether the vehicle is taxed or SORN and when the tax is due.', href: '/vehicle-tax' },
  { icon: Leaf, title: 'ULEZ Compliance', text: 'Find out if the vehicle is likely to meet London ULEZ emissions standards.', href: '/ulez-check' },
  { icon: FileText, title: 'Vehicle History Report', text: 'Upgrade to a premium report with finance, write-off and stolen checks.', href: '/pricing' },
];

const trust = [
  { icon: ShieldCheck, title: 'Official MOT data source', text: 'Built on the DVSA MOT History API' },
  { icon: Zap, title: 'Instant results', text: 'Reports in seconds, 24/7' },
  { icon: Lock, title: 'Secure & private', text: 'Encrypted, no sign-up needed' },
  { icon: BadgeCheck, title: 'Free core checks', text: 'MOT, mileage, tax & ULEZ' },
];

const steps = [
  { icon: Keyboard, title: 'Enter the registration', text: 'Type the number plate of any UK-registered car, van or motorbike.' },
  { icon: ScanSearch, title: 'We check the records', text: 'We securely query vehicle data sources and analyse the results.' },
  { icon: FileText, title: 'Get your report', text: 'Review MOT history, mileage, tax and ULEZ in one clear report.' },
];

const faqs: FaqItem[] = [
  { q: 'Is the AutoCheck Pro MOT check really free?', a: 'Yes. Our core vehicle check — including MOT status, MOT history, recorded mileage, tax status and a ULEZ estimate — is free with no sign-up. Premium reports with finance, write-off and stolen checks are available for a one-off fee.' },
  { q: 'Where does the vehicle information come from?', a: 'MOT data comes from the DVSA MOT History API and tax data from the DVLA Vehicle Enquiry Service. AutoCheck Pro is an independent service and is not affiliated with or endorsed by the DVLA or DVSA.' },
  { q: 'What do I need to run a check?', a: 'Just the vehicle registration number. You do not need the V5C logbook, VIN or an account to run a free check.' },
  { q: 'Can a mileage check detect clocking?', a: 'We compare the odometer readings recorded at each MOT test and flag any drops in mileage. This can indicate clocking or a recording error, so always ask the seller for service history to back it up.' },
  { q: 'Is the ULEZ result guaranteed?', a: 'No. Our ULEZ result is an estimate based on fuel type, Euro emissions standard and registration date. Always confirm compliance using the official TfL vehicle checker before driving in a clean air zone.' },
  { q: 'What does a Premium Report include?', a: 'Premium Reports add outstanding finance, insurance write-off, stolen vehicle, plate change and keeper checks supplied by licensed third-party data providers, plus a downloadable PDF.' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
          <span className="grid-lines" />
        </div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-dark fade-up">
              <span className="pulse-dot" /> UK vehicle checks · Instant results
            </p>
            <h1 className="hero-title fade-up d1">
              Know Your Car <span className="gradient-text">Before You Buy</span>
            </h1>
            <p className="hero-sub fade-up d2">Check UK vehicle history, MOT records, mileage and more.</p>
            <div id="vehicle-search" className="hero-search fade-up d3">
              <RegSearch />
            </div>
            <ul className="hero-checks fade-up d4">
              <li><CircleCheck size={18} /> Free MOT history</li>
              <li><CircleCheck size={18} /> No sign-up</li>
              <li><CircleCheck size={18} /> Results in seconds</li>
            </ul>
          </div>

          <div className="hero-visual fade-in d2" aria-hidden="true">
            <div className="preview-card">
              <div className="preview-head">
                <span className="plate plate-display sm">
                  <span className="plate-band">UK</span>
                  <span className="plate-text">AB12 CDE</span>
                </span>
                <span className="preview-tag">Illustrative example</span>
              </div>
              <div className="preview-row">
                <span><ShieldCheck size={18} /> MOT status</span>
                <span className="pill pill-success"><CircleCheck size={14} /> Valid</span>
              </div>
              <div className="preview-row">
                <span><Receipt size={18} /> Vehicle tax</span>
                <span className="pill pill-success"><CircleCheck size={14} /> Taxed</span>
              </div>
              <div className="preview-row">
                <span><Leaf size={18} /> ULEZ</span>
                <span className="pill pill-success"><CircleCheck size={14} /> Compliant</span>
              </div>
              <div className="preview-row">
                <span><History size={18} /> MOT tests</span>
                <span className="preview-stat"><b>6</b> pass · <b>1</b> fail <CircleX size={14} className="tiny-fail" /></span>
              </div>
              <div className="preview-chart">
                {[28, 40, 52, 61, 70, 82, 92].map((h, i) => (
                  <span key={i} style={{ height: `${h}%`, animationDelay: `${0.6 + i * 0.08}s` }} />
                ))}
              </div>
              <p className="preview-foot"><Gauge size={14} /> Mileage history</p>
            </div>
            <div className="float-badge badge-a"><Zap size={16} /> Instant report</div>
            <div className="float-badge badge-b"><Lock size={16} /> Secure check</div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="container trust-grid">
          {trust.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={i * 80} className="trust-item">
                <span className="trust-icon"><Icon size={22} /></span>
                <span>
                  <strong>{t.title}</strong>
                  <small>{t.text}</small>
                </span>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Vehicle checks</p>
            <h2 className="section-title">Everything you need to check a used car</h2>
            <p className="section-sub">From MOT history to ULEZ compliance, get the facts that matter before you hand over your money.</p>
          </div>
          <div className="card-grid card-grid-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 4) * 80}>
                  <Link href={f.href} className="feature-card linked">
                    <span className="feature-icon"><Icon size={24} /></span>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                    <span className="feature-more">Learn more <ArrowRight size={15} /></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-dark">
        <div className="hero-bg" aria-hidden="true"><span className="orb orb-2" /><span className="grid-lines" /></div>
        <div className="container rel">
          <div className="section-head">
            <p className="eyebrow eyebrow-dark">How it works</p>
            <h2 className="section-title light">Your vehicle report in three simple steps</h2>
          </div>
          <div className="steps">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 120} className="step">
                  <span className="step-num">0{i + 1}</span>
                  <span className="step-icon"><Icon size={26} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Why check?</p>
            <h2 className="section-title">Don’t let a bad car become your problem</h2>
            <p className="lead-text">
              A vehicle’s MOT record tells a story the advert won’t. Repeated failures, recurring advisories and
              inconsistent mileage readings can reveal neglect, hidden faults or even clocking.
            </p>
            <p className="lead-text">
              AutoCheck Pro puts that history in one clear, easy-to-read report — so you can negotiate with confidence or
              walk away from a bad deal.
            </p>
            <Link href="/mot-history" className="btn btn-primary">
              Check MOT History <ArrowRight size={18} />
            </Link>
          </Reveal>
          <Reveal delay={120} className="checklist-card">
            <h3>Before you buy, make sure you know:</h3>
            <ul className="checklist">
              {[
                'The vehicle matches its official description',
                'The MOT is valid and when it expires',
                'Which faults have been flagged at past tests',
                'Whether the mileage history is consistent',
                'If the car is taxed and when tax is due',
                'Whether it can drive in London’s ULEZ',
              ].map((c) => (
                <li key={c}><CircleCheck size={20} /> {c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="section section-alt" id="pricing">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Pricing</p>
            <h2 className="section-title">Free checks. Premium peace of mind.</h2>
            <p className="section-sub">Start with a free check, then upgrade to a full history report when you’re serious about buying.</p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Frequently asked questions</h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
