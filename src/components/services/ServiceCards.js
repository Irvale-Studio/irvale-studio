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
}) {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
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
                className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mb-4"
              >
                {title}
              </RevealText>
            )}
            {subtitle && (
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Tier cards */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[var(--grid-gap)]">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={cn(
                'relative flex flex-col',
                tier.highlighted && 'md:-mt-3'
              )}
            >
              {/* Badge — sits above card */}
              {tier.badge && (
                <div className="flex justify-center mb-0">
                  <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] bg-gold text-dark px-5 py-1.5 whitespace-nowrap">
                    ✶ {tier.badge} ✶
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={cn(
                  'relative flex flex-col flex-1 p-8 md:p-10',
                  tier.highlighted
                    ? 'border border-gold/40 bg-[rgba(201,169,110,0.03)]'
                    : 'border border-[var(--border-dark)] bg-dark-2'
                )}
              >
                {/* Gold top accent on highlighted */}
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
                )}

                {/* Tier label */}
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-gold/60 mb-3">
                  {tierLabels[index] || `TIER ${index + 1}`}
                </span>

                {/* Tier name */}
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light mb-4">
                  {tier.name}
                </h3>

                {/* Price — always gold */}
                <div className="mb-6">
                  <span className="font-display text-[clamp(32px,3.5vw,48px)] text-gold leading-none">
                    {tier.price}
                  </span>
                  <p className="font-body text-xs text-text-muted-light mt-1.5">
                    {tier.priceNote}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="font-body text-sm text-text-light/80 font-light flex gap-2.5"
                    >
                      <span className="text-gold shrink-0 text-xs mt-[3px]">
                        ✓
                      </span>
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </SectionReveal>

        {/* Disclaimer */}
        <p className="font-body text-xs text-text-muted-light text-center mt-10 max-w-md mx-auto">
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
