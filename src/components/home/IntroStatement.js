'use client';

import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Counter from '@/components/ui/Counter';

const stats = [
  { value: 12, suffix: '', label: 'Projects / Year' },
  { value: 100, suffix: '%', label: 'Bespoke' },
  { value: 3, suffix: '', label: 'Disciplines' },
];

export default function IntroStatement() {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-8 block">Who We Are</Eyebrow>

        <RevealText
          as="h2"
          className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[800px] mb-12"
        >
          A studio built for brands that refuse to blend in
        </RevealText>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light">
            We design and build digital experiences for luxury and premium brands
            in hospitality, wellness, and private membership. Every project is
            treated as a one-of-one.
          </p>
          <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-light font-light">
            From strategy to launch, we handle everything in-house — design,
            development, SEO, and AI visibility. No templates. No shortcuts. Just
            considered work that performs.
          </p>
        </SectionReveal>

        {/* Stats */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--border-dark)]">
          {stats.map((stat, i) => (
            <div key={i} className="relative pl-6 border-l border-gold/30">
              <div className="font-display text-[clamp(36px,5vw,64px)] text-text-light leading-none mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-body text-xs text-text-muted-light uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
