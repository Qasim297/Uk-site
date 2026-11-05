import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'AutoCheck Pro | Free UK MOT History & Vehicle Check',
    template: '%s | AutoCheck Pro',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'car check',
    'vehicle check UK',
    'MOT history check',
    'MOT check',
    'free MOT check',
    'mileage check',
    'vehicle tax check',
    'ULEZ check',
    'car history check',
    'reg check',
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: site.name,
    title: 'AutoCheck Pro | Know Your Car Before You Buy',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoCheck Pro | Know Your Car Before You Buy',
    description: site.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#071027',
  width: 'device-width',
  initialScale: 1,
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  founder: { '@type': 'Person', name: site.owner },
  areaServed: 'GB',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </body>
    </html>
  );
}
