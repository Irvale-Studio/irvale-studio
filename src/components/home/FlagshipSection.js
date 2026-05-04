'use client';

import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';

const components = [
  'Website',
  'Booking',
  'Local SEO',
  'Programmatic SEO',
  'AI Search',
  'Reviews',
  'Email',
  'Paid Media',
  'APAC Expansion',
  'Reporting',
];

export default function FlagshipSection() {
  return (
    <section className="relative bg-dark-2 py-[var(--section-gap)] border-y border-[var(--border-dark)] overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,169,110,0.15),transparent_60%),radial-gradient(ellipse_at_80%_70%,rgba(201,169,110,0.10),transparent_60%)]" />

      <div
        className="relative mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <SectionReveal className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <Eyebrow className="mb-6 block">The Flagship Engagement</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal italic text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-6"
            >
              Revenue Engineering.
            </RevealText>
            <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light leading-relaxed mb-8">
              One accountable team for your entire digital funnel. Website, booking, search, AI visibility, reviews, paid media — owned end-to-end. Bespoke website rebuild and Zatrovo booking included free.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/revenue-engineering" className="btn-primary">
                <span>See the Engagement →</span>
              </Link>
              <Link href="/contact" className="btn-outline">
                <span>Book a Discovery Call →</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="font-body text-[length:var(--type-caption)] text-gold/60 uppercase tracking-[var(--type-label-ls)] mb-6">
              What we take over
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--border-dark)] border border-[var(--border-dark)]">
              {components.map((c) => (
                <div
                  key={c}
                  className="bg-dark px-4 py-5 flex items-center gap-3"
                >
                  <span className="text-gold/60 text-xs">✓</span>
                  <span className="font-body text-sm font-light text-text-light/90">
                    {c}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-text-muted-light/60 font-light mt-5">
              From $1,450/month. 6-month minimum. Website rebuild and Zatrovo included at every tier.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
