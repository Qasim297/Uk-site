import Link from 'next/link';
import { Lock, Mail, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';
import { checkLinks, legalLinks, mainLinks, site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="AutoCheck Pro - home">
            <Logo />
          </Link>
          <p>
            Independent UK vehicle checks. MOT history, mileage, tax and ULEZ information so you can buy your next car
            with confidence.
          </p>
          <p className="footer-secure">
            <Lock size={15} /> Secure, encrypted searches
          </p>
        </div>

        <div>
          <h3 className="footer-title">Vehicle Checks</h3>
          <ul className="footer-links">
            {checkLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Company</h3>
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            {mainLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <Mail size={16} /> <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <Clock size={16} /> {site.supportHours}
            </li>
            <li>
              <MapPin size={16} /> {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-disclaimer">
        <p>
          AutoCheck Pro is an independent service and is not affiliated with, endorsed by or connected to the DVLA,
          DVSA, Transport for London or any UK government body. Where official data sources are used, results contain
          public sector information licensed under the Open Government Licence v3.0. Information is provided for
          guidance only and should be verified before making a purchase.
        </p>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {site.year} AutoCheck Pro. All Rights Reserved.</p>
          <p>
            Website Created &amp; Owned by <strong>{site.owner}</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
}
