'use client';

import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import { cn } from '@/lib/utils';

export default function ServiceCards({
  eyebrow,
  title,
  subtitle,
  tiers,
  dark = false,
}) {
  const bg = dark ? 'bg-dark' : 'bg-cream';
  const cardBg = dark ? 'bg-dark-2' : 'bg-white';
  const textPrimary = dark ? 'text-text-light' : 'text-text-dark';
  const textMuted = dark ? 'text-text-muted-light' : 'text-text-muted-dark';
  const borderDefault = dark
    ? 'border-[var(--border-dark)]'
    : 'border-[var(--border-light)]';
  const dividerColor = dark
    ? 'bg-[var(--border-dark)]'
    : 'bg-[var(--border-light)]';

  return (
    <section className={cn(bg, 'py-[var(--section-gap)]')}>
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        {/* Section header */}
        {(eyebrow || title) && (
          <div className="mb-12 md:mb-16">
            {eyebrow && (
              <Eyebrow className="mb-6 block">{eyebrow}</Eyebrow>
            )}
            {title && (
              <RevealText
                as="h2"
                className={cn(
                  'font-display font-normal text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mb-4',
                  textPrimary
                )}
              >
                {title}
              </RevealText>
            )}
            {subtitle && (
              <p
                className={cn(
                  'font-body text-[length:var(--type-body)] font-light max-w-xl',
                  textMuted
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Tier cards */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[var(--grid-gap)]">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative flex flex-col p-8 md:p-10 border transition-transform duration-300 hover:-translate-y-1',
                cardBg,
                tier.highlighted
                  ? 'border-gold md:-mt-3 md:pb-[calc(2.5rem+12px)]'
                  : borderDefault
              )}
            >
              {/* Badge */}
              {tier.badge && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-body text-[10px] font-medium uppercase tracking-[0.2em] bg-gold text-dark px-4 py-1 whitespace-nowrap">
                  {tier.badge}
                </span>
              )}

              {/* Tier name */}
              <h3
                className={cn(
                  'font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] mb-1',
                  textPrimary
                )}
              >
                {tier.name}
              </h3>

              {/* Pricing */}
              <div className="mb-6 mt-3">
                <span
                  className={cn(
                    'font-display text-[clamp(32px,3.5vw,48px)] leading-none',
                    tier.highlighted ? 'text-gold' : textPrimary
                  )}
                >
                  {tier.price}
                </span>
                <p className={cn('font-body text-xs mt-1.5', textMuted)}>
                  {tier.priceNote}
                </p>
              </div>

              {/* Divider */}
              <div className={cn('h-px mb-6', dividerColor)} />

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li
                    key={i}
                    className={cn(
                      'font-body text-sm font-light flex gap-2.5',
                      textPrimary
                    )}
                  >
                    <span className="text-gold shrink-0 text-xs mt-[3px]">
                      ✓
                    </span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.ctaHref}
                className={cn(
                  'block text-center py-3',
                  tier.highlighted ? 'btn-primary' : 'btn-outline'
                )}
              >
                <span>{tier.cta} →</span>
              </Link>
            </div>
          ))}
        </SectionReveal>

        {/* Disclaimer */}
        <p
          className={cn(
            'font-body text-xs text-center mt-10 max-w-md mx-auto',
            textMuted
          )}
        >
          All prices in Thai Baht (THB) and exclude VAT where applicable. Website
          builds invoiced 50% upfront, 50% on launch.{' '}
          <Link
            href="/contact"
            className="text-gold-muted hover:text-gold transition-colors"
          >
            Need something bespoke?
          </Link>
        </p>
      </div>
    </section>
  );
}
