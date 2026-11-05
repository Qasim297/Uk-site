import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, CircleCheck, type LucideIcon } from 'lucide-react';
import PageHero from './PageHero';
import RegSearch from './RegSearch';
import Reveal from './Reveal';
import FAQ, { type FaqItem } from './FAQ';
import CtaBand from './CtaBand';
import Disclaimer from './Disclaimer';
import { checkLinks, type CheckType } from '@/lib/site';

export interface ServicePoint {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface Props {
  eyebrow: string;
  title: string;
  subtitle: string;
  checkType: CheckType;
  buttonLabel?: string;
  introTitle: string;
  intro: string[];
  checklist: string[];
  points: ServicePoint[];
  faqs: FaqItem[];
  extra?: ReactNode;
}

export default function ServicePage(props: Props) {
  const related = checkLinks.filter((l) => l.type !== props.checkType);

  return (
    <>
      <PageHero eyebrow={props.eyebrow} title={props.title} subtitle={props.subtitle}>
        <div className="page-hero-search">
          <RegSearch checkType={props.checkType} buttonLabel={props.buttonLabel} />
          <p className="hero-note">Free to use · No sign-up · Results in seconds</p>
        </div>
      </PageHero>

      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="section-title">{props.introTitle}</h2>
            {props.intro.map((p) => (
              <p key={p.slice(0, 32)} className="lead-text">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120} className="checklist-card">
            <h3>What this check shows</h3>
            <ul className="checklist">
              {props.checklist.map((c) => (
                <li key={c}>
                  <CircleCheck size={20} aria-hidden="true" /> {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="card-grid card-grid-3">
            {props.points.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 90} className="feature-card">
                  <span className="feature-icon">
                    <Icon size={24} />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {props.extra}

      <section className="section">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Frequently asked questions</h2>
          </div>
          <FAQ items={props.faqs} />
          <Disclaimer />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">More checks</p>
            <h2 className="section-title">Explore other vehicle checks</h2>
          </div>
          <div className="related-grid">
            {related.map((l) => {
              const Icon = l.icon;
              return (
                <Link key={l.href} href={l.href} className="related-card">
                  <span className="feature-icon sm">
                    <Icon size={20} />
                  </span>
                  <span>
                    <strong>{l.label}</strong>
                    <small>{l.description}</small>
                  </span>
                  <ArrowRight size={18} className="related-arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
