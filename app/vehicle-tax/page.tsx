import type { Metadata } from 'next';
import { CalendarClock, Receipt, ShieldAlert } from 'lucide-react';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Vehicle Tax Check – Is This Car Taxed?',
  description:
    'Check if a UK vehicle is taxed or SORN and when its vehicle tax is due. Free vehicle tax check by registration number.',
  alternates: { canonical: '/vehicle-tax' },
};

export default function VehicleTaxPage() {
  return (
    <ServicePage
      eyebrow="Vehicle Tax Check"
      title="Is This Vehicle Taxed?"
      subtitle="Check tax status, SORN declarations and when vehicle tax is due — using just the registration."
      checkType="tax"
      buttonLabel="Check Tax"
      introTitle="Check vehicle tax before you drive away"
      intro={[
        'Vehicle tax does not transfer with the car when it is sold. As the new keeper, you must tax the vehicle before you drive it — even straight from the seller’s driveway.',
        'Our tax check shows the current tax status and the date tax is due, plus emissions details that affect how much road tax the vehicle will cost.',
      ]}
      checklist={[
        'Tax status: Taxed, Untaxed or SORN',
        'Tax due date',
        'CO₂ emissions figure',
        'Fuel type and engine capacity',
        'Year of manufacture',
      ]}
      points={[
        { icon: Receipt, title: 'Tax status at a glance', text: 'Instantly see if the vehicle is taxed, untaxed or declared off the road.' },
        { icon: CalendarClock, title: 'Know the due date', text: 'Plan ahead and avoid fines by knowing exactly when tax runs out.' },
        { icon: ShieldAlert, title: 'Avoid penalties', text: 'Driving an untaxed vehicle can result in fines and the vehicle being clamped.' },
      ]}
      faqs={[
        { q: 'Does vehicle tax transfer to the new owner?', a: 'No. When a vehicle is sold any remaining tax is refunded to the seller, and the buyer must tax it before driving.' },
        { q: 'What does SORN mean?', a: 'A Statutory Off Road Notification (SORN) means the keeper has declared the vehicle is being kept off public roads. It cannot be driven or parked on a public road.' },
        { q: 'How do I tax a vehicle?', a: 'You can tax a vehicle online through GOV.UK using the reference number from the V5C logbook or the new keeper slip.' },
        { q: 'Can AutoCheck Pro tax my vehicle?', a: 'No. We only show tax information. To tax a vehicle, use the official GOV.UK service.' },
      ]}
    />
  );
}
