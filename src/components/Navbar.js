'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/work', label: 'Our Work' },
  { href: '/services', label: 'Services' },
  { href: '/zatrovo', label: 'Zatrovo Booking', highlight: true },
  { href: '/ai-visibility', label: 'AI Visibility', highlight: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);
  const pathname = usePathname();
  const alwaysSolid = pathname === '/contact';

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: reducedMotion ? 0 : 0.3,
      });
      if (!reducedMotion) {
        gsap.from(linksRef.current.filter(Boolean), {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.15,
        });
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: reducedMotion ? 0 : 0.3,
      });
    }
  }, { dependencies: [mobileOpen] });

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-colors duration-300',
          scrolled || alwaysSolid
            ? 'bg-dark border-b border-gold/20'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex items-center justify-between px-[var(--gutter)] py-5"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          {/* Logo */}
          <Link href="/" className="font-display text-text-light tracking-[0.25em] text-[length:var(--type-body-sm)] uppercase">
            Irvale Studio
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
               
                className={cn(
                  'relative font-body text-[length:var(--type-body-sm)] font-medium text-text-light/80 hover:text-text-light transition-colors group',
                  pathname === link.href && 'text-text-light',
                  link.highlight && 'font-semibold'
                )}
              >
                {link.label}
                {link.highlight && (
                  <span className="inline-block w-1 h-1 rounded-full bg-gold ml-0.5 -translate-y-2" />
                )}
                {/* Gold underline on hover */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/contact" className="btn-outline py-2.5 px-5">
              <span>Start a Project →</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 min-w-[44px] min-h-[44px] items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={cn(
              'block w-6 h-px bg-text-light transition-transform duration-300',
              mobileOpen && 'rotate-45 translate-y-[3.5px]'
            )} />
            <span className={cn(
              'block w-6 h-px bg-text-light transition-opacity duration-300',
              mobileOpen && 'opacity-0'
            )} />
            <span className={cn(
              'block w-6 h-px bg-text-light transition-transform duration-300',
              mobileOpen && '-rotate-45 -translate-y-[3.5px]'
            )} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[99] bg-dark flex flex-col items-center justify-center gap-8 opacity-0 pointer-events-none md:hidden pb-[env(safe-area-inset-bottom)]"
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => { linksRef.current[i] = el; }}
            onClick={() => setMobileOpen(false)}
            className="font-display text-[clamp(32px,6vw,48px)] text-text-light"
          >
            {link.label}
            {link.highlight && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold ml-1 -translate-y-4" />
            )}
          </Link>
        ))}
        <Link
          href="/contact"
          ref={(el) => { linksRef.current[navLinks.length] = el; }}
          onClick={() => setMobileOpen(false)}
          className="btn-outline px-8 py-3 mt-4"
        >
          Start a Project →
        </Link>
      </div>
    </>
  );
}
