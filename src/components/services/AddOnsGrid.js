'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import { addOnServices } from '@/lib/data/services';

export default function AddOnsGrid() {
  // Split into rows of 2 so each row gets its own scroll trigger
  const row1 = addOnServices.slice(0, 2);
  const row2 = addOnServices.slice(2, 4);

  return (
    <section className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <Eyebrow className="mb-6 block">Add-On Services</Eyebrow>
          <RevealText
            as="h2"
            className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px] mb-4"
          >
            Enhance your package.
          </RevealText>
          <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light max-w-lg">
            These standalone services can be added to any plan at any time.
            Priced as monthly retainers unless stated otherwise.
          </p>
        </div>

        {/* Row 1 */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[var(--grid-gap)] mb-6 md:mb-[var(--grid-gap)]">
          {row1.map((addon) => (
            <AddOnCard key={addon.name} addon={addon} />
          ))}
        </SectionReveal>

        {/* Row 2 — separate SectionReveal so it triggers when scrolled into view */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[var(--grid-gap)]">
          {row2.map((addon) => (
            <AddOnCard key={addon.name} addon={addon} />
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}

function AddOnCard({ addon }) {
  return (
    <div className="relative bg-dark border border-white/10 p-8 md:p-10 flex flex-col group">
      {/* Gold left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold/40 group-hover:bg-gold transition-colors duration-300" />

      {/* Category eyebrow */}
      <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-gold mb-4">
        {addon.category}
      </span>

      {/* Name + price */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
        <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light">
          {addon.name}
        </h3>
        <div className="shrink-0">
          <span className="font-display text-[clamp(20px,2vw,28px)] text-gold leading-none">
            {addon.price}
          </span>
          <span className="font-body text-xs text-text-muted-light ml-2">
            {addon.priceNote}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-text-muted-light font-light leading-relaxed mb-6">
        {addon.description}
      </p>

      {/* Divider */}
      <div className="h-px bg-white/10 mb-6" />

      {/* Features checklist */}
      <ul className="space-y-2.5">
        {addon.features.map((feature, i) => (
          <li
            key={i}
            className="font-body text-sm text-text-light/90 font-light flex gap-2.5"
          >
            <span className="text-gold shrink-0 text-xs mt-[3px]">✓</span>
            <span className="flex-1">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
