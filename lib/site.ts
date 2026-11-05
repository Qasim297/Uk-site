import {
  ClipboardCheck,
  History,
  Receipt,
  Leaf,
  Gauge,
  type LucideIcon,
} from 'lucide-react';

export const site = {
  name: 'AutoCheck Pro',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.autocheckpro.co.uk',
  tagline: 'Know Your Car Before You Buy',
  description:
    'Check UK vehicle history, MOT records, mileage, tax status and ULEZ compliance instantly. Free MOT history checks and premium vehicle history reports from AutoCheck Pro.',
  owner: 'Muhammad Qasim',
  email: 'support@autocheckpro.co.uk',
  location: 'United Kingdom',
  supportHours: 'Mon – Fri, 9:00am – 6:00pm (UK time)',
  year: 2026,
};

export interface CheckLink {
  href: string;
  label: string;
  description: string;
  type: CheckType;
  icon: LucideIcon;
}

export type CheckType = 'full' | 'mot' | 'mot-history' | 'tax' | 'ulez' | 'mileage';

export const checkLinks: CheckLink[] = [
  { href: '/mot-check', label: 'MOT Check', description: 'MOT status & expiry date', type: 'mot', icon: ClipboardCheck },
  { href: '/mot-history', label: 'MOT History', description: 'Every pass, fail & advisory', type: 'mot-history', icon: History },
  { href: '/vehicle-tax', label: 'Vehicle Tax', description: 'Tax status & due date', type: 'tax', icon: Receipt },
  { href: '/ulez-check', label: 'ULEZ Check', description: 'London clean air compliance', type: 'ulez', icon: Leaf },
  { href: '/mileage-check', label: 'Mileage Check', description: 'Recorded odometer history', type: 'mileage', icon: Gauge },
];

export const mainLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms and Conditions' },
];
