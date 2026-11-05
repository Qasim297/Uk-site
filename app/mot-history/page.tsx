import type { Metadata } from 'next';
import { ClipboardList, SearchCheck, Wrench } from 'lucide-react';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Free MOT History Check – Passes, Fails & Advisories',
  description:
    'View the full MOT history of any UK vehicle for free, including MOT passes, failures, defects, advisories and recorded mileage at every test.',
  alternates: { canonical: '/mot-history' },
};

export default function MotHistoryPage() {
  return (
    <ServicePage
      eyebrow="Free MOT History"
      title="Full MOT History for Any UK Vehicle"
      subtitle="Every MOT pass and fail on record, with defects, advisories and mileage at each test."
      checkType="mot-history"
      buttonLabel="Check MOT History"
      introTitle="What the MOT history reveals"
      intro={[
        'The MOT history is one of the most valuable free tools for used car buyers. Each test records whether the vehicle passed or failed, the defects found, any advisories and the mileage at the time.',
        'Patterns matter: repeated advisories for corrosion, brakes or suspension can point to future repair bills, while a long list of failures may indicate a car that has not been well maintained.',
      ]}
      checklist={[
        'Every MOT pass and fail on record',
        'Dangerous, major and minor defects',
        'Advisory notes from the tester',
        'Odometer reading at each test',
        'MOT test numbers and expiry dates',
      ]}
      points={[
        { icon: ClipboardList, title: 'Complete timeline', text: 'See each test in date order, with clear pass and fail labels.' },
        { icon: Wrench, title: 'Understand defects', text: 'Defects are grouped by severity so you can judge how serious each issue was.' },
        { icon: SearchCheck, title: 'Read between the lines', text: 'Recurring advisories help you ask the seller the right questions.' },
      ]}
      faqs={[
        { q: 'How far back does MOT history go?', a: 'Computerised MOT records are generally available from 2005 onwards for vehicles tested in Great Britain.' },
        { q: 'What is the difference between a defect and an advisory?', a: 'Defects (dangerous, major or minor) are faults found at the test. Dangerous and major defects cause a fail. Advisories are items the tester thinks may need attention in future.' },
        { q: 'Why is a test listed as failed and then passed?', a: 'If a vehicle fails, it is usually repaired and retested. Both the failed test and the retest appear in the history.' },
        { q: 'Can the MOT history be wrong?', a: 'Records are entered by MOT testers and occasionally contain errors, such as a mistyped mileage. If you spot a mistake, contact the testing station or DVSA.' },
      ]}
    />
  );
}
