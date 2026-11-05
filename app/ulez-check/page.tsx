import type { Metadata } from 'next';
import { Fuel, Leaf, MapPinned } from 'lucide-react';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'ULEZ Check – Is My Car ULEZ Compliant?',
  description:
    'Free ULEZ check for UK vehicles. Find out if a car is likely to meet London Ultra Low Emission Zone standards based on fuel type and Euro emissions standard.',
  alternates: { canonical: '/ulez-check' },
};

export default function UlezCheckPage() {
  return (
    <ServicePage
      eyebrow="ULEZ Check"
      title="Is This Car ULEZ Compliant?"
      subtitle="Estimate whether a vehicle meets London’s Ultra Low Emission Zone standards before you buy."
      checkType="ulez"
      buttonLabel="Check ULEZ"
      introTitle="Avoid the daily ULEZ charge"
      intro={[
        'London’s Ultra Low Emission Zone covers all London boroughs. Vehicles that do not meet the emissions standards must pay a daily charge to drive within the zone.',
        'Our ULEZ check estimates compliance using the vehicle’s fuel type, Euro emissions standard and first registration date. Because exemptions and individual vehicle data can vary, always confirm with TfL’s official checker.',
      ]}
      checklist={[
        'Estimated ULEZ compliance status',
        'Euro emissions standard (where available)',
        'Fuel type and registration date',
        'Explanation of how the result was reached',
        'Link to the official TfL vehicle checker',
      ]}
      points={[
        { icon: Fuel, title: 'Petrol: Euro 4', text: 'Most petrol cars registered from January 2006 meet the standard, and some from 2001.' },
        { icon: Leaf, title: 'Diesel: Euro 6', text: 'Most diesel cars registered from September 2015 meet the ULEZ standard.' },
        { icon: MapPinned, title: 'Other clean air zones', text: 'Cities including Birmingham, Bristol and Glasgow run their own clean air zones with different rules.' },
      ]}
      faqs={[
        { q: 'How accurate is the ULEZ check?', a: 'It is an estimate based on published TfL standards. Some vehicles meet the standard earlier or later than typical dates, so always confirm with TfL before driving in the zone.' },
        { q: 'Are electric cars ULEZ compliant?', a: 'Yes. Fully electric and hydrogen vehicles produce zero exhaust emissions and meet ULEZ standards.' },
        { q: 'What are the ULEZ standards?', a: 'Petrol vehicles must meet Euro 4 and diesel vehicles must meet Euro 6 standards. Vehicles that do not meet them must pay a daily charge.' },
        { q: 'Is AutoCheck Pro connected to TfL?', a: 'No. AutoCheck Pro is independent and not affiliated with Transport for London.' },
      ]}
    />
  );
}
