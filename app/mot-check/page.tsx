import type { Metadata } from 'next';
import { BellRing, CalendarClock, Car } from 'lucide-react';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Free MOT Check – MOT Status & Expiry Date',
  description:
    'Free UK MOT check. Enter a registration to see MOT status, MOT expiry date, vehicle make and model, and the result of the latest MOT test.',
  alternates: { canonical: '/mot-check' },
};

export default function MotCheckPage() {
  return (
    <ServicePage
      eyebrow="Free MOT Check"
      title="Check Any Vehicle’s MOT Status"
      subtitle="See whether a car’s MOT is valid, when it expires, and the result of its most recent test."
      checkType="mot"
      buttonLabel="Check MOT"
      introTitle="Is the MOT valid? Find out in seconds"
      intro={[
        'Most vehicles in Great Britain need an MOT test every year once they are three years old. Driving without a valid MOT can lead to a fine of up to £1,000 and may invalidate your insurance.',
        'Our free MOT check shows the current MOT status and expiry date, plus the make, model, colour and fuel type, so you can confirm a vehicle matches its description before you buy.',
      ]}
      checklist={[
        'Current MOT status (valid or expired)',
        'MOT expiry date and days remaining',
        'Date and result of the last MOT test',
        'Make, model, colour and fuel type',
        'Engine size and first registration date',
      ]}
      points={[
        { icon: CalendarClock, title: 'Never miss an expiry', text: 'See exactly how many days are left on the current MOT certificate.' },
        { icon: Car, title: 'Confirm the details', text: 'Make sure the make, model and colour match the seller’s advert and logbook.' },
        { icon: BellRing, title: 'Spot red flags', text: 'An expired or soon-to-expire MOT is a great negotiating point — or a reason to walk away.' },
      ]}
      faqs={[
        { q: 'When does a car need its first MOT?', a: 'In England, Scotland and Wales a car normally needs its first MOT by the third anniversary of its registration, then every year after that.' },
        { q: 'Can I get an MOT early?', a: 'Yes. You can have an MOT up to a month (minus a day) before it expires and keep the same renewal date.' },
        { q: 'Is it illegal to drive without an MOT?', a: 'Yes, unless you are driving to a pre-booked MOT test or to a garage for repairs required to pass. You could be fined up to £1,000.' },
        { q: 'Does this check cover Northern Ireland?', a: 'Northern Ireland MOTs are carried out by the DVA, and their records may not be available through this service.' },
      ]}
    />
  );
}
