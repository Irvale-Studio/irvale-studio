'use client';

import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import { cn } from '@/lib/utils';

const tierLabels = ['TIER ONE', 'TIER TWO', 'TIER THREE'];

export default function ServiceCards({
  eyebrow,
  title,
  subtitle,
  tiers,
  disclaimer,
  variant = 'dark', // 'dark' or 'light'
}) {
  const isLight = variant === 'light';

  // Section-level colors
  const sectionBg = isLight ? 'bg-cream' : 'bg-dark';
  const textHeading = isLight ? 'text-text-dark' : 'text-text-light';
  const textMuted = isLight ? 'text-text-muted-dark' : 'text-text-muted-light';
  const disclaimerMuted = isLight ? 'text-text-muted-dark' : 'text-text-muted-light';

  // Card-level colors
  const cardDefault = isLight
    ? 'border border-[var(--border-light)] bg-white'
    : 'border border-[var(--border-dark)] bg-dark-2';
  const cardHighlighted = isLight
    ? 'border border-gold/40 border-t-0 bg-white'
    : 'border border-gold/40 border-t-0 bg-[rgba(201,169,110,0.03)]';
  const cardText = isLight ? 'text-text-dark' : 'text-text-light';
  const cardTextMuted = isLight ? 'text-text-muted-dark' : 'text-text-muted-light';
  const featureText = isLight ? 'text-text-dark/80' : 'text-text-light/80';

  return (
    <section className={cn(sectionBg, 'py-[var(--section-gap)]')}>
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
                  textHeading
                )}
              >
                {title}
              </RevealText>
            )}
            {subtitle && (
              <p className={cn('font-body text-[length:var(--type-body)] font-light max-w-xl', textMuted)}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Tier cards */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-6 md:gap-[var(--grid-gap)]">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className="relative flex flex-col"
            >
              {/* Badge */}
              {tier.badge && (
                <div className="flex justify-center">
                  <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] bg-gold text-dark px-5 py-1.5 whitespace-nowrap">
                    ✶ {tier.badge} ✶
                  </span>
                </div>
              )}

              {/* Spacer for non-badge cards */}
              {!tier.badge && <div className="hidden md:block h-[29px]" />}

              {/* Card */}
              <div
                className={cn(
                  'relative flex flex-col flex-1 p-8 md:p-10',
                  tier.highlighted ? cardHighlighted : cardDefault
                )}
              >
                {/* Gold top accent on highlighted */}
                {tier.highlighted && (
                  <div className="absolute top-0 left-[-1px] right-[-1px] h-[2px] bg-gold" />
                )}

                {/* Tier label */}
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-gold/60 mb-3">
                  {tierLabels[index] || `TIER ${index + 1}`}
                </span>

                {/* Tier name */}
                <h3 className={cn(
                  'font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] mb-4',
                  cardText
                )}>
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className={cn(
                    'font-display text-[clamp(32px,3.5vw,48px)] leading-none',
                    isLight ? 'text-gold-muted' : 'text-gold'
                  )}>
                    {tier.price}
                  </span>
                  <p className={cn('font-body text-xs mt-1.5', cardTextMuted)}>
                    {tier.priceNote}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className={cn('font-body text-sm font-light flex gap-2.5', featureText)}
                    >
                      <span className="text-gold shrink-0 text-xs mt-[3px]">✓</span>
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </SectionReveal>

        {/* Disclaimer */}
        {disclaimer && (
          <p className={cn('font-body text-xs text-center mt-10 max-w-md mx-auto', disclaimerMuted)}>
            {disclaimer}{' '}
            <Link
              href="/contact"
              className="text-gold-muted hover:text-gold transition-colors"
            >
              Need something bespoke?
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
