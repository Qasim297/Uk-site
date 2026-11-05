import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  compact?: boolean;
}

export default function PageHero({ eyebrow, title, subtitle, children, compact = false }: Props) {
  return (
    <section className={`page-hero${compact ? ' compact' : ''}`}>
      <div className="hero-bg" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="grid-lines" />
      </div>
      <div className="container page-hero-inner">
        {eyebrow && <p className="eyebrow eyebrow-dark">{eyebrow}</p>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
