import Link from 'next/link';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';

export const metadata = {
  title: 'AI Visibility — Irvale Studio',
  description: 'Be the brand AI recommends. Entity optimisation, citation building, and content architecture for the AI search era.',
};

const stats = [
  { value: '60%', label: 'of search queries will be answered by AI by 2026' },
  { value: '1 in 3', label: 'consumers now trust AI recommendations over traditional search' },
  { value: '<5%', label: 'of luxury brands are optimised for AI discovery' },
];

const pillars = [
  {
    title: 'Entity & Knowledge Graph',
    description: 'We build your brand\'s identity across knowledge graphs so AI systems understand who you are, what you do, and why you\'re the best at it.',
  },
  {
    title: 'Citation & Authority',
    description: 'We generate and optimise the citations, reviews, and third-party mentions that AI models use to determine trustworthiness and relevance.',
  },
  {
    title: 'Content Architecture for AI',
    description: 'We structure your content so AI systems can parse, comprehend, and confidently recommend your brand in natural language responses.',
  },
];

export default function AIVisibilityPage() {
  return (
    <main className="bg-navy">
      {/* Hero */}
      <section className="relative pt-32 pb-[var(--section-gap)] overflow-hidden">
        {/* Subtle animated gradient mesh bg */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_20%_50%,rgba(201,169,110,0.15),transparent_70%),radial-gradient(ellipse_at_80%_50%,rgba(201,169,110,0.1),transparent_70%)]" />

        <div
          className="relative mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">The Next Era of Search</Eyebrow>
          <RevealText
            as="h1"
            className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[800px] mb-6"
          >
            Be the brand AI recommends
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-lg mb-8">
            When someone asks ChatGPT for the best spa in your city — we make sure they hear your name.
          </p>
          <Link href="/contact" className="btn-primary">
            <span>Book an AI Audit →</span>
          </Link>
        </div>
      </section>

      {/* Problem Stats */}
      <section className="py-[var(--component-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-[clamp(36px,5vw,64px)] text-gold leading-none mb-3">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-text-muted-light font-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-12 block">Our Approach</Eyebrow>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="border border-gold/20 p-8 md:p-10 bg-[rgba(255,255,255,0.02)]"
              >
                <span className="font-display text-gold/40 text-lg block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light mb-4">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Case Study Highlight — Zatrovo */}
      <section className="py-[var(--component-gap)] border-y border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow className="mb-4 block">Live Case Study</Eyebrow>
              <h3 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-4">
                Zatrovo
              </h3>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light mb-4">
                Our flagship SaaS product reaches 13,000+ members across multiple studios. AI-discoverable architecture, structured data, and content built for the way modern search actually works.
              </p>
              <Link
                href="/work/zatrovo"
                className="font-body text-sm text-gold hover:text-gold-light transition-colors"
              >
                Read the Zatrovo case study →
              </Link>
            </div>
            <Link
              href="/work/zatrovo"
              className="block relative aspect-[4/3] overflow-hidden rounded border border-gold/15 group"
            >
              <Image
                src="/images/projects/zatrovo-hero.webp"
                alt="Zatrovo — Built for studios"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[var(--section-gap)] border-t border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <RevealText
            as="h2"
            className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px] mx-auto justify-center mb-6"
          >
            The future of search is here. Is your brand ready?
          </RevealText>
          <Link href="/contact" className="btn-primary px-10">
            <span>Start with an AI Audit →</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
