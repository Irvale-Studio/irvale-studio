'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import SectionReveal from '@/components/ui/SectionReveal';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn your brand, audience, and goals. No assumptions — just deep understanding.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'A clear plan covering design direction, site architecture, SEO, and content structure.',
  },
  {
    number: '03',
    title: 'Design & Build',
    description: 'Pixel-perfect design, then clean, performant development. You see progress weekly.',
  },
  {
    number: '04',
    title: 'Launch & Grow',
    description: 'We launch, monitor, and optimise. Your site keeps performing long after day one.',
  },
];

export default function Process() {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-12 block">How We Work</Eyebrow>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-[var(--grid-gap)] relative">
          {/* Gold connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px border-t border-dashed border-gold/30" />

          {steps.map((step) => (
            <div key={step.number} className="relative">
              {/* Dot on the timeline */}
              <div className="hidden md:block absolute top-[29px] left-0 w-2 h-2 rounded-full bg-gold -translate-y-1/2" />

              <span className="font-display text-gold text-sm tracking-wider block mb-3 md:mt-12">
                {step.number}
              </span>
              <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </SectionReveal>

        <p className="font-body text-xs text-text-muted-light mt-12">
          Typical timeline: 5–16 weeks depending on scope.
        </p>
      </div>
    </section>
  );
}
