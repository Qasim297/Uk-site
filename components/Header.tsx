'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import Logo from './Logo';
import { checkLinks, legalLinks, mainLinks } from '@/lib/site';

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const checksActive = checkLinks.some((l) => isActive(l.href));

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="AutoCheck Pro - home">
          <Logo />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/" className={`nav-link${isActive('/') ? ' active' : ''}`}>
            Home
          </Link>
          <div className="nav-dropdown">
            <button type="button" className={`nav-link${checksActive ? ' active' : ''}`} aria-haspopup="true">
              Vehicle Checks <ChevronDown size={15} className="chev" />
            </button>
            <div className="dropdown-panel" role="menu">
              {checkLinks.map((l) => {
                const Icon = l.icon;
                return (
                  <Link key={l.href} href={l.href} className="dropdown-item" role="menuitem">
                    <span className="dropdown-icon">
                      <Icon size={18} />
                    </span>
                    <span>
                      <strong>{l.label}</strong>
                      <small>{l.description}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          {mainLinks.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link${isActive(l.href) ? ' active' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/#vehicle-search" className="btn btn-primary btn-sm header-cta">
            <Search size={16} /> Check a Vehicle
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        <nav className="container mobile-nav" aria-label="Mobile navigation">
          <Link href="/" className={`mobile-link${isActive('/') ? ' active' : ''}`}>
            Home
          </Link>
          <p className="mobile-label">Vehicle Checks</p>
          {checkLinks.map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.href} href={l.href} className={`mobile-link sub${isActive(l.href) ? ' active' : ''}`}>
                <Icon size={18} /> {l.label}
              </Link>
            );
          })}
          <p className="mobile-label">Company</p>
          {[...mainLinks, ...legalLinks].map((l) => (
            <Link key={l.href} href={l.href} className={`mobile-link${isActive(l.href) ? ' active' : ''}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/#vehicle-search" className="btn btn-primary btn-block mobile-cta">
            <Search size={18} /> Check a Vehicle
          </Link>
        </nav>
      </div>
    </header>
  );
}
