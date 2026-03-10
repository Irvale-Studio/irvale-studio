import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';

const footerLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/ai-visibility', label: 'AI Visibility' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-[var(--border-dark)]">
      <div
        className="mx-auto px-[var(--gutter)] py-16 md:py-24"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-text-light tracking-[0.25em] text-sm uppercase">
              Irvale Studio
            </Link>
            <p className="mt-4 font-body text-sm text-text-muted-light leading-relaxed max-w-xs">
              Where luxury brands meet their digital moment.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <Eyebrow className="mb-4 block">Navigation</Eyebrow>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-text-muted-light hover:text-text-light transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <Eyebrow className="mb-4 block">Get in Touch</Eyebrow>
            <a
              href="mailto:hello@irvale.studio"
              className="font-body text-sm text-gold hover:text-gold-light transition-colors"
            >
              hello@irvale.studio
            </a>
            <p className="mt-4 font-body text-xs text-text-muted-light">
              We respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border-dark)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-text-muted-light">
            &copy; {new Date().getFullYear()} Irvale Studio. All rights reserved.
          </p>
          <p className="font-body text-xs text-text-muted-light">
            London, United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
