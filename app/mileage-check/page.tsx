import type { Metadata } from 'next';
import { Gauge, TrendingUp, TriangleAlert } from 'lucide-react';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Mileage Check – Spot Clocked Cars',
  description:
    'Free UK mileage check. See the odometer readings recorded at every MOT test and spot possible mileage discrepancies or clocking.',
  alternates: { canonical: '/mileage-check' },
};

export default function MileageCheckPage() {
  return (
    <ServicePage
      eyebrow="Mileage Check"
      title="Check a Car’s Mileage History"
      subtitle="See recorded odometer readings from every MOT test and spot signs of possible clocking."
      checkType="mileage"
      buttonLabel="Check Mileage"
      introTitle="Is the mileage genuine?"
      intro={[
        'Mileage clocking — winding back the odometer to make a car look less used — is illegal, but it still happens. A lower mileage can add thousands to a car’s price.',
        'Every MOT test records the odometer reading. We plot these readings on a timeline and flag any point where the recorded mileage goes down, so you can investigate before you buy.',
      ]}
      checklist={[
        'Mileage recorded at every MOT test',
        'Visual mileage timeline chart',
        'Automatic mileage drop detection',
        'Average annual mileage',
        'Latest recorded mileage and date',
      ]}
      points={[
        { icon: TrendingUp, title: 'Clear mileage chart', text: 'See how the mileage has grown year by year in a simple, visual chart.' },
        { icon: TriangleAlert, title: 'Discrepancy alerts', text: 'We highlight any reading lower than a previous one so nothing slips past you.' },
        { icon: Gauge, title: 'Compare with the dashboard', text: 'Check the current odometer reading is consistent with the last recorded MOT.' },
      ]}
      faqs={[
        { q: 'Does a mileage drop always mean the car is clocked?', a: 'Not always. A drop can be caused by a typing error at the MOT test or an instrument cluster replacement. Ask the seller for evidence such as service records.' },
        { q: 'What is a typical annual mileage in the UK?', a: 'Around 7,000 miles a year is typical for UK cars, but usage varies widely depending on the driver.' },
        { q: 'Can this check show the mileage between MOT tests?', a: 'No. Mileage is only recorded at MOT tests. Service history can help fill in the gaps.' },
        { q: 'Why are there no readings for my car?', a: 'Cars under three years old usually have not had an MOT yet, so there are no recorded MOT mileage readings.' },
      ]}
    />
  );
}
