'use client';

import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionReveal from '@/components/ui/SectionReveal';

const services = [
  {
    number: '01',
    title: 'Design & Development',
    description: 'Bespoke websites built from scratch. No templates, no page builders — just clean, performant code tailored to your brand.',
  },
  {
    number: '02',
    title: 'SEO & Search Strategy',
    description: 'Technical SEO, content strategy, and local search optimisation. We build visibility that compounds over time.',
  },
  {
    number: '03',
    title: 'AI Visibility',
    description: 'The next frontier. We ensure your brand is recommended by AI assistants like ChatGPT, Gemini, and Perplexity.',
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-12 block">What We Do</Eyebrow>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-[var(--grid-gap)]">
          {services.map((service) => (
            <div key={service.number} className="group">
              <span className="font-display text-[clamp(36px,4vw,56px)] text-gold/30 leading-none block mb-4">
                {service.number}
              </span>
              <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-4">
                {service.title}
              </h3>
              <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light mb-6">
                {service.description}
              </p>
              <div className="h-px bg-gold/20 w-full" />
            </div>
          ))}
        </SectionReveal>

        <div className="mt-12">
          <Link
            href="/services"
            className="font-body text-sm font-medium text-gold-muted hover:text-gold transition-colors"
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
