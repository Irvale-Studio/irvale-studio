'use client';

import SectionReveal from '@/components/ui/SectionReveal';
import Eyebrow from '@/components/ui/Eyebrow';

const credentials = [
  {
    title: 'Certified Web Design',
    body: 'Google UX Design Professional Certificate',
    icon: '◆',
  },
  {
    title: 'SEO Specialist',
    body: 'Advanced Search Engine Optimisation & Analytics',
    icon: '◆',
  },
  {
    title: 'AI Search Pioneer',
    body: 'Early adopter of AI visibility strategies for luxury brands',
    icon: '◆',
  },
  {
    title: 'Full-Stack Development',
    body: 'React, Next.js & modern JavaScript architecture',
    icon: '◆',
  },
  {
    title: 'Conversion Optimisation',
    body: 'Data-driven UX design focused on revenue outcomes',
    icon: '◆',
  },
  {
    title: 'Digital Strategy',
    body: 'Integrated brand, content & performance marketing',
    icon: '◆',
  },
];

export default function Accredited() {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-4 block">Accredited & Proven</Eyebrow>
        <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-12 max-w-[600px]">
          Expertise you can trust
        </h2>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
          {credentials.map((cred, i) => (
            <div
              key={i}
              className="border border-[var(--border-dark)] p-6 md:p-8 bg-dark-2/50"
            >
              <span className="text-gold text-lg block mb-3">{cred.icon}</span>
              <h3 className="font-body text-sm font-medium text-text-light mb-2">
                {cred.title}
              </h3>
              <p className="font-body text-xs text-text-muted-light font-light leading-relaxed">
                {cred.body}
              </p>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
