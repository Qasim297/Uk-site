'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  CalendarClock,
  Car,
  CircleCheck,
  CircleX,
  ClipboardList,
  FlaskConical,
  Gauge,
  Leaf,
  Loader2,
  Receipt,
  ShieldCheck,
  TriangleAlert,
  CircleHelp,
} from 'lucide-react';
import RegSearch from './RegSearch';
import MileageChart from './MileageChart';
import Disclaimer from './Disclaimer';
import { formatReg, isValidReg, normaliseReg } from '@/lib/registration';
import { daysUntil, formatDate, formatNumber, titleCase } from '@/lib/format';
import type { DataSource, MotTest, VehicleReport } from '@/lib/types';
import type { CheckType } from '@/lib/site';

const SECTION_FOR_TYPE: Record<string, string> = {
  mot: 'mot-status',
  'mot-history': 'mot-history',
  tax: 'tax',
  ulez: 'ulez',
  mileage: 'mileage',
};

type State =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'error'; message: string }
  | { phase: 'done'; report: VehicleReport };

export default function CheckResults() {
  const params = useSearchParams();
  const reg = normaliseReg(params.get('reg') || '');
  const type = (params.get('type') || 'full') as CheckType;
  const [state, setState] = useState<State>({ phase: 'idle' });

  useEffect(() => {
    if (!reg) {
      setState({ phase: 'idle' });
      return;
    }
    if (!isValidReg(reg)) {
      setState({ phase: 'error', message: 'Please enter a valid UK vehicle registration number.' });
      return;
    }
    const ctrl = new AbortController();
    setState({ phase: 'loading' });
    fetch(`/api/vehicle?reg=${encodeURIComponent(reg)}`, { signal: ctrl.signal })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
        setState({ phase: 'done', report: data as VehicleReport });
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setState({ phase: 'error', message: err.message });
      });
    return () => ctrl.abort();
  }, [reg]);

  useEffect(() => {
    if (state.phase !== 'done') return;
    const id = SECTION_FOR_TYPE[type];
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
    return () => window.clearTimeout(t);
  }, [state.phase, type]);

  return (
    <>
      <section className="page-hero compact">
        <div className="hero-bg" aria-hidden="true">
          <span className="orb orb-1" />
          <span className="grid-lines" />
        </div>
        <div className="container page-hero-inner">
          <p className="eyebrow eyebrow-dark">Vehicle Check</p>
          <h1 className="page-hero-title">{reg ? `Results for ${formatReg(reg)}` : 'Check a vehicle'}</h1>
          <div className="page-hero-search">
            <RegSearch key={reg} size="md" checkType={type} defaultValue={reg ? formatReg(reg) : ''} buttonLabel="Check" />
          </div>
        </div>
      </section>

      <section className="section results-section">
        <div className="container">
          {state.phase === 'idle' && (
            <div className="empty-state">
              <Car size={48} />
              <h2>Enter a registration to get started</h2>
              <p>Use the search box above to check any UK-registered vehicle.</p>
            </div>
          )}
          {state.phase === 'loading' && <LoadingState reg={reg} />}
          {state.phase === 'error' && (
            <div className="empty-state error">
              <TriangleAlert size={48} />
              <h2>We couldn’t complete that check</h2>
              <p>{state.message}</p>
            </div>
          )}
          {state.phase === 'done' && <Report report={state.report} highlight={SECTION_FOR_TYPE[type]} />}
        </div>
      </section>
    </>
  );
}

function LoadingState({ reg }: { reg: string }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <Loader2 size={44} className="spin" />
      <h2>Checking {formatReg(reg)}…</h2>
      <p>Retrieving MOT history, mileage, tax and ULEZ information.</p>
      <div className="skeleton-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton" />
        ))}
      </div>
    </div>
  );
}

function DemoChip({ show }: { show: boolean }) {
  return show ? <span className="demo-chip">DEMO DATA</span> : null;
}

function SourceNote({ source, label }: { source: DataSource; label: string }) {
  if (source === 'not-configured') return <p className="muted small">{label} is not available on this service yet.</p>;
  if (source === 'unavailable') return <p className="muted small">{label} is temporarily unavailable. Please try again later.</p>;
  return null;
}

function Report({ report, highlight }: { report: VehicleReport; highlight?: string }) {
  const v = report.vehicle;
  const demo = report.isDemo;
  const motDays = daysUntil(report.mot.expiryDate);
  const sectionClass = (id: string) => `report-card${highlight === id ? ' highlighted' : ''}${demo ? ' is-demo' : ''}`;

  return (
    <div className="report">
      {demo && (
        <div className="demo-banner" role="alert">
          <FlaskConical size={26} aria-hidden="true" />
          <div>
            <strong>DEMO DATA — not real vehicle information</strong>
            <p>
              Official API credentials are not configured on this website, so the results below are{' '}
              <strong>sample data for demonstration only</strong>. They do not relate to the registration{' '}
              {formatReg(report.registration)} and must not be relied upon.
            </p>
          </div>
        </div>
      )}

      {report.warnings.map((w) => (
        <p key={w} className="notice notice-info">
          {w}
        </p>
      ))}

      {/* Summary */}
      <div className={`report-summary${demo ? ' is-demo' : ''}`}>
        <div className="report-summary-main">
          <span className="plate plate-display" aria-label={`Registration ${formatReg(report.registration)}`}>
            <span className="plate-band" aria-hidden="true">UK</span>
            <span className="plate-text">{formatReg(report.registration)}</span>
          </span>
          <div>
            <h2 className="report-vehicle">
              {titleCase(v.make)} {v.model ? titleCase(v.model) : ''} <DemoChip show={demo} />
            </h2>
            <p className="report-meta">
              {[v.colour && titleCase(v.colour), v.fuelType && titleCase(v.fuelType), v.engineSize && `${v.engineSize}cc`, v.firstUsedDate && `First registered ${formatDate(v.firstUsedDate)}`]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </div>
        <div className="status-pills">
          <MotPill status={report.mot.status} />
          {report.tax?.status && <StatusPill ok={report.tax.status.toLowerCase() === 'taxed'} label={`Tax: ${report.tax.status}`} />}
          <UlezPill status={report.ulez.status} />
        </div>
      </div>

      {/* Key stats */}
      <div className="stat-grid">
        <StatCard icon={<CalendarClock size={22} />} label="MOT expiry" value={formatDate(report.mot.expiryDate || report.mot.dueDate)} sub={motDays !== null ? (motDays >= 0 ? `${motDays} days remaining` : `Expired ${Math.abs(motDays)} days ago`) : report.mot.status === 'not-due' ? 'First MOT due' : undefined} demo={demo} />
        <StatCard icon={<Gauge size={22} />} label="Last recorded mileage" value={report.mileage.latest ? `${formatNumber(report.mileage.latest.miles)} mi` : '—'} sub={report.mileage.latest ? `on ${formatDate(report.mileage.latest.date)}` : undefined} demo={demo} />
        <StatCard icon={<ClipboardList size={22} />} label="MOT tests" value={String(report.mot.totalTests)} sub={`${report.mot.passes} passed · ${report.mot.fails} failed`} demo={demo} />
        <StatCard icon={<Receipt size={22} />} label="Tax due" value={formatDate(report.tax?.dueDate)} sub={report.tax?.status} demo={demo} />
      </div>

      <div className="report-layout">
        <div className="report-main">
          {/* MOT status */}
          <section id="mot-status" className={sectionClass('mot-status')}>
            <header className="report-card-head">
              <h3><ShieldCheck size={20} /> MOT Status</h3>
              <DemoChip show={demo} />
            </header>
            <SourceNote source={report.sources.mot} label="MOT data" />
            <dl className="data-list">
              <div><dt>Status</dt><dd><MotPill status={report.mot.status} /></dd></div>
              <div><dt>Expiry date</dt><dd>{formatDate(report.mot.expiryDate)}</dd></div>
              {report.mot.dueDate && <div><dt>First MOT due</dt><dd>{formatDate(report.mot.dueDate)}</dd></div>}
              <div><dt>Last test</dt><dd>{report.mot.tests[0] ? `${formatDate(report.mot.tests[0].completedDate)} (${report.mot.tests[0].result === 'PASSED' ? 'Pass' : 'Fail'})` : '—'}</dd></div>
            </dl>
          </section>

          {/* MOT history */}
          <section id="mot-history" className={sectionClass('mot-history')}>
            <header className="report-card-head">
              <h3><ClipboardList size={20} /> MOT History</h3>
              <DemoChip show={demo} />
            </header>
            {report.mot.tests.length === 0 ? (
              <p className="muted">No MOT tests recorded. New vehicles need their first MOT three years after registration.</p>
            ) : (
              <ol className="timeline">
                {report.mot.tests.map((t, i) => (
                  <MotTestItem key={`${t.completedDate}-${i}`} test={t} />
                ))}
              </ol>
            )}
          </section>

          {/* Mileage */}
          <section id="mileage" className={sectionClass('mileage')}>
            <header className="report-card-head">
              <h3><Gauge size={20} /> Mileage History</h3>
              <DemoChip show={demo} />
            </header>
            {report.mileage.anomalies.length > 0 ? (
              <div className="notice notice-warning">
                <TriangleAlert size={18} />
                <div>
                  <strong>Possible mileage discrepancy</strong>
                  {report.mileage.anomalies.map((a) => <p key={a}>{a}</p>)}
                </div>
              </div>
            ) : report.mileage.readings.length > 1 ? (
              <p className="notice notice-success"><CircleCheck size={18} /> No mileage drops found between recorded MOT readings.</p>
            ) : null}
            <MileageChart readings={report.mileage.readings} />
            {report.mileage.averagePerYear !== undefined && (
              <p className="muted small">Average of approximately {formatNumber(report.mileage.averagePerYear)} miles per year between recorded tests (UK average is around 7,000).</p>
            )}
          </section>
        </div>

        <aside className="report-side">
          {/* Vehicle details */}
          <section id="details" className={sectionClass('details')}>
            <header className="report-card-head">
              <h3><Car size={20} /> Vehicle Details</h3>
              <DemoChip show={demo} />
            </header>
            <dl className="data-list">
              <div><dt>Make</dt><dd>{titleCase(v.make)}</dd></div>
              <div><dt>Model</dt><dd>{titleCase(v.model)}</dd></div>
              <div><dt>Colour</dt><dd>{titleCase(v.colour)}</dd></div>
              <div><dt>Fuel type</dt><dd>{titleCase(v.fuelType)}</dd></div>
              <div><dt>Engine size</dt><dd>{v.engineSize ? `${v.engineSize}cc` : '—'}</dd></div>
              <div><dt>Year of manufacture</dt><dd>{v.yearOfManufacture ?? '—'}</dd></div>
              <div><dt>First registered</dt><dd>{formatDate(v.firstUsedDate)}</dd></div>
              <div><dt>CO₂ emissions</dt><dd>{v.co2Emissions ? `${v.co2Emissions} g/km` : '—'}</dd></div>
              <div><dt>Euro status</dt><dd>{v.euroStatus || '—'}</dd></div>
            </dl>
          </section>

          {/* Tax */}
          <section id="tax" className={sectionClass('tax')}>
            <header className="report-card-head">
              <h3><Receipt size={20} /> Vehicle Tax</h3>
              <DemoChip show={demo} />
            </header>
            <SourceNote source={report.sources.tax} label="Vehicle tax information" />
            {report.tax && (
              <dl className="data-list">
                <div><dt>Tax status</dt><dd>{report.tax.status ? <StatusPill ok={report.tax.status.toLowerCase() === 'taxed'} label={report.tax.status} /> : '—'}</dd></div>
                <div><dt>Tax due</dt><dd>{formatDate(report.tax.dueDate)}</dd></div>
              </dl>
            )}
            <a className="text-link" href="https://www.gov.uk/vehicle-tax" target="_blank" rel="noopener noreferrer">
              Tax a vehicle on GOV.UK <ArrowRight size={14} />
            </a>
          </section>

          {/* ULEZ */}
          <section id="ulez" className={sectionClass('ulez')}>
            <header className="report-card-head">
              <h3><Leaf size={20} /> ULEZ Compliance</h3>
              <DemoChip show={demo} />
            </header>
            <UlezPill status={report.ulez.status} />
            <p className="small">{report.ulez.summary}</p>
            <p className="muted small">
              This is an estimate. Always confirm with TfL before driving in a clean air zone.
            </p>
            <a className="text-link" href="https://tfl.gov.uk/modes/driving/check-your-vehicle/" target="_blank" rel="noopener noreferrer">
              Confirm with TfL’s vehicle checker <ArrowRight size={14} />
            </a>
          </section>

          {/* Upsell */}
          <section className="upsell-card">
            <h3>Need the full picture?</h3>
            <p>Check for outstanding finance, insurance write-offs, stolen markers and previous keepers.</p>
            <Link href="/pricing" className="btn btn-primary btn-block">
              View Premium Report <ArrowRight size={16} />
            </Link>
          </section>
        </aside>
      </div>

      <Disclaimer>
        {demo ? (
          <>
            <strong>These are demo results.</strong> Connect official DVSA and DVLA API credentials on the server to show
            real vehicle data. AutoCheck Pro is not affiliated with the DVLA, DVSA or TfL.
          </>
        ) : (
          <>
            MOT data provided by the DVSA MOT History API and vehicle tax data by the DVLA Vehicle Enquiry Service, where
            available. Contains public sector information licensed under the Open Government Licence v3.0. AutoCheck Pro is
            an independent service and is not affiliated with the DVLA, DVSA or TfL. Information is for guidance only.
          </>
        )}
      </Disclaimer>
    </div>
  );
}

function StatCard({ icon, label, value, sub, demo }: { icon: ReactNode; label: string; value: string; sub?: string; demo: boolean }) {
  return (
    <div className={`stat-card${demo ? ' is-demo' : ''}`}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  );
}

function StatusPill({ ok, label }: { ok: boolean | null; label: string }) {
  const cls = ok === null ? 'pill-neutral' : ok ? 'pill-success' : 'pill-danger';
  const Icon = ok === null ? CircleHelp : ok ? CircleCheck : CircleX;
  return (
    <span className={`pill ${cls}`}>
      <Icon size={15} /> {label}
    </span>
  );
}

function MotPill({ status }: { status: VehicleReport['mot']['status'] }) {
  const map: Record<VehicleReport['mot']['status'], [boolean | null, string]> = {
    valid: [true, 'MOT valid'],
    expired: [false, 'MOT expired'],
    'not-due': [true, 'MOT not yet due'],
    'no-record': [null, 'No MOT record'],
    unknown: [null, 'MOT unknown'],
  };
  const [ok, label] = map[status];
  return <StatusPill ok={ok} label={label} />;
}

function UlezPill({ status }: { status: VehicleReport['ulez']['status'] }) {
  const map: Record<VehicleReport['ulez']['status'], [boolean | null, string]> = {
    compliant: [true, 'ULEZ compliant'],
    'likely-compliant': [true, 'Likely ULEZ compliant'],
    'non-compliant': [false, 'Not ULEZ compliant'],
    'likely-non-compliant': [false, 'Likely not ULEZ compliant'],
    unknown: [null, 'ULEZ unknown'],
  };
  const [ok, label] = map[status];
  return <StatusPill ok={ok} label={label} />;
}

const DEFECT_LABEL: Record<string, string> = {
  ADVISORY: 'Advisory',
  MINOR: 'Minor',
  MAJOR: 'Major',
  DANGEROUS: 'Dangerous',
  FAIL: 'Fail',
  PRS: 'Repaired at test',
  'USER ENTERED': 'Note',
};

function MotTestItem({ test }: { test: MotTest }) {
  const passed = test.result === 'PASSED';
  return (
    <li className={`timeline-item ${passed ? 'pass' : 'fail'}`}>
      <span className="timeline-dot" aria-hidden="true">
        {passed ? <CircleCheck size={18} /> : <CircleX size={18} />}
      </span>
      <div className="timeline-body">
        <div className="timeline-head">
          <strong>{formatDate(test.completedDate)}</strong>
          <span className={`pill ${passed ? 'pill-success' : 'pill-danger'}`}>{passed ? 'Pass' : 'Fail'}</span>
        </div>
        <p className="timeline-meta">
          {test.odometerValue !== undefined && (
            <span>
              Mileage: {formatNumber(test.odometerValue)} {test.odometerUnit?.toUpperCase() === 'KM' ? 'km' : 'mi'}
            </span>
          )}
          {test.expiryDate && <span>Expiry: {formatDate(test.expiryDate)}</span>}
          {test.testNumber && <span>Test no: {test.testNumber}</span>}
        </p>
        {test.defects.length > 0 && (
          <ul className="defects">
            {test.defects.map((d, i) => (
              <li key={`${d.text}-${i}`} className={`defect defect-${(d.dangerous ? 'DANGEROUS' : d.type).toLowerCase().replace(/\s+/g, '-')}`}>
                <span className="defect-type">{d.dangerous ? 'Dangerous' : DEFECT_LABEL[d.type] || titleCase(d.type)}</span>
                {d.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
