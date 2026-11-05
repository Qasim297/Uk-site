export interface Plan {
  id: 'free' | 'premium' | 'bundle';
  name: string;
  price: number;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

// Edit prices here. Stripe price IDs are configured server-side in .env.local.
export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free Check',
    price: 0,
    priceNote: 'No sign-up needed',
    description: 'Essential checks every buyer should run before viewing a car.',
    features: [
      'Vehicle make, model & colour',
      'MOT status & expiry date',
      'Full MOT pass & fail history',
      'Advisories & defects',
      'Recorded mileage history',
      'Vehicle tax status',
      'ULEZ compliance estimate',
    ],
    cta: 'Start Free Check',
  },
  {
    id: 'premium',
    name: 'Premium Report',
    price: 9.99,
    priceNote: 'One vehicle, one-off payment',
    description: 'A complete vehicle history report for total peace of mind.',
    features: [
      'Everything in Free Check',
      'Outstanding finance check',
      'Insurance write-off check',
      'Stolen vehicle check',
      'Plate & colour change history',
      'Number of previous keepers',
      'Mileage anomaly analysis',
      'Downloadable PDF report',
    ],
    cta: 'Get Premium Report',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'bundle',
    name: 'Buyer Bundle',
    price: 24.99,
    priceNote: '3 premium reports · save 17%',
    description: 'Comparing several cars? Check them all and save.',
    features: [
      '3 Premium Reports',
      'Use within 12 months',
      'Compare vehicles side by side',
      'Priority email support',
      'All Premium Report features',
    ],
    cta: 'Get Buyer Bundle',
  },
];

export function formatPrice(price: number): string {
  return price === 0 ? 'Free' : `£${price.toFixed(2)}`;
}
