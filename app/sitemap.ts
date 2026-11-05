import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const routes = [
  { path: '', priority: 1 },
  { path: '/mot-check', priority: 0.9 },
  { path: '/mot-history', priority: 0.9 },
  { path: '/vehicle-tax', priority: 0.8 },
  { path: '/ulez-check', priority: 0.8 },
  { path: '/mileage-check', priority: 0.8 },
  { path: '/pricing', priority: 0.8 },
  { path: '/about', priority: 0.6 },
  { path: '/contact', priority: 0.6 },
  { path: '/privacy-policy', priority: 0.3 },
  { path: '/terms-and-conditions', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
