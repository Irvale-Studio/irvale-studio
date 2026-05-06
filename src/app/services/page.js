import { Fragment } from 'react';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Marquee from '@/components/ui/Marquee';
import { capabilities, techStack, servicesFaqs } from '@/lib/data/capabilities';

export const metadata = {
  title: 'Services & Capabilities · Irvale Studio',
  description:
    'Websites, booking software, SEO, AI search, automations, paid media, mobile apps, email marketing, analytics, brand, and infrastructure. The full capability stack for modern businesses.',
};

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.15),transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(201,169,110,0.10),transparent_60%)]" />

        <div
          className="relative mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">What We Build</Eyebrow>
          <RevealText
            as="h1"
            className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6"
          >
            Most businesses run fourteen vendors. We run all fourteen as one studio.
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-2xl mb-10">
            Websites, booking software, SEO, AI search, paid media, mobile apps, reviews, automations — every layer modern businesses depend on, owned end to end. Hire a single capability or hand us the whole funnel.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/revenue-engineering" className="btn-primary">
              <span>See Revenue Engineering →</span>
            </Link>
            <Link href="/contact" className="btn-outline">
              <span>Start a Single Project →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick-jump nav */}
      <section className="bg-dark-2 py-8 border-y border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <p className="font-body text-[length:var(--type-caption)] text-gold/60 uppercase tracking-[var(--type-label-ls)] mb-5 text-center">
            Jump to a capability
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {capabilities.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="font-body text-xs text-text-light/70 border border-white/10 hover:border-gold/40 hover:text-gold bg-dark/40 px-3 py-1.5 rounded-full transition-colors"
              >
                <span className="text-gold/60 mr-1.5">{c.number}</span>
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Capability pillars — alternating dark/cream rhythm */}
      {capabilities.map((c, i) => (
        <Fragment key={c.slug}>
          <CapabilityBlock capability={c} index={i} />
          {i === Math.floor(capabilities.length / 2) - 1 && <FlagshipBand />}
        </Fragment>
      ))}

      {/* Tech & integration ecosystem */}
      <section className="bg-dark py-[var(--section-gap)] border-y border-[var(--border-dark)] noise-overlay">
        <div className="mx-auto px-[var(--gutter)] mb-12 text-center" style={{ maxWidth: 'var(--max-width)' }}>
          <Eyebrow className="mb-6 block">Tools We Build With</Eyebrow>
          <RevealText
            as="h2"
            className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mx-auto justify-center"
          >
            The stack behind every Irvale build.
          </RevealText>
        </div>
        <div className="space-y-3">
          <div className="relative overflow-hidden">
            <Marquee
              items={techStack.slice(0, Math.ceil(techStack.length / 2))}
              separator="·"
              className="font-display text-2xl text-text-light/40 tracking-[0.1em]"
              speed={80}
            />
          </div>
          <div className="relative overflow-hidden">
            <Marquee
              items={techStack.slice(Math.ceil(techStack.length / 2))}
              separator="·"
              className="font-display text-2xl text-gold/40 tracking-[0.1em]"
              speed={100}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">Frequently Asked</Eyebrow>
          <RevealText
            as="h2"
            className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mb-12"
          >
            The questions every founder asks first.
          </RevealText>
          <SectionReveal className="max-w-3xl">
            {servicesFaqs.map((faq, i) => (
              <ServicesFAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Capability pillar pages — hub-and-spoke entry */}
      <section className="bg-[var(--color-cream-2)] py-[var(--section-gap)] border-y border-[var(--border-light)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="max-w-2xl mb-12">
            <Eyebrow className="mb-4 block">Capability pillars</Eyebrow>
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
              Each capability also lives as its own page.
            </h2>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light mt-4 max-w-2xl">
              Deeper detail, FAQs, and field notes on each. Built for buyers researching a single discipline before they bundle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { slug: 'local-seo', title: 'Local SEO + Google Maps' },
              { slug: 'reviews', title: 'Reviews + Reputation' },
              { slug: 'cro', title: 'Conversion Rate Optimisation' },
              { slug: 'paid-media', title: 'Paid Media' },
              { slug: 'email-crm', title: 'Email + CRM' },
              { slug: 'web', title: 'Web Design + Build' },
            ].map((p) => (
              <Link
                key={p.slug}
                href={`/services/${p.slug}`}
                className="group bg-white border border-[var(--border-light)] rounded-sm p-6 flex items-center justify-between hover:border-gold/40 transition-colors"
              >
                <span className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark">
                  {p.title}
                </span>
                <span className="font-body text-sm text-gold-muted group-hover:text-gold transition-colors shrink-0 ml-4">
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ai-visibility"
              className="font-body text-[length:var(--type-body-sm)] text-gold-muted hover:text-gold underline underline-offset-4 decoration-gold/40"
            >
              AI Visibility →
            </Link>
            <span className="text-text-muted-dark/40">·</span>
            <Link
              href="/local"
              className="font-body text-[length:var(--type-body-sm)] text-gold-muted hover:text-gold underline underline-offset-4 decoration-gold/40"
            >
              Local SEO by city →
            </Link>
            <span className="text-text-muted-dark/40">·</span>
            <Link
              href="/for"
              className="font-body text-[length:var(--type-body-sm)] text-gold-muted hover:text-gold underline underline-offset-4 decoration-gold/40"
            >
              Industry playbooks →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <RevealText
            as="h2"
            className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mx-auto justify-center mb-6"
          >
            Want all fourteen run as one system?
          </RevealText>
          <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light max-w-md mx-auto mb-8">
            Revenue Engineering bundles the full stack — website, booking, SEO, AI search, reviews — under one accountable team. Or hire a single pillar for a fixed scope.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/revenue-engineering" className="btn-primary px-10">
              <span>See Revenue Engineering →</span>
            </Link>
            <Link href="/contact" className="btn-outline">
              <span>Start a Single Project →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CapabilityBlock({ capability, index }) {
  const isLight = index % 2 === 1;
  const sectionBg = isLight ? 'bg-cream' : 'bg-dark';
  const sectionBorder = isLight ? 'border-[var(--border-light)]' : 'border-[var(--border-dark)]';
  const headingColor = isLight ? 'text-text-dark' : 'text-text-light';
  const bodyColor = isLight ? 'text-text-muted-dark' : 'text-text-muted-light';
  const cardBg = isLight ? 'bg-white' : 'bg-dark-2/60';
  const cardBorder = isLight ? 'border-[var(--border-light)]' : 'border-white/10';
  const checkColor = isLight ? 'text-gold-muted' : 'text-gold';
  const tagColor = isLight ? 'text-gold-muted/60' : 'text-gold/60';

  return (
    <section
      id={capability.slug}
      className={`${sectionBg} py-[var(--section-gap)] border-b ${sectionBorder} scroll-mt-24`}
    >
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left — title + summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <span className={`font-display text-[clamp(48px,5vw,72px)] ${tagColor} leading-none block mb-4`}>
                {capability.number}
              </span>
              <Eyebrow className="mb-5 block">{capability.tagline}</Eyebrow>
              <h2 className={`font-display font-normal ${headingColor} text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-6`}>
                {capability.name}
              </h2>
              <p className={`font-body text-[length:var(--type-body)] ${bodyColor} font-light leading-relaxed mb-8 max-w-md`}>
                {capability.summary}
              </p>
              {capability.caseStudy && (
                <Link
                  href={`/work/${capability.caseStudy.slug}`}
                  className="inline-flex items-center gap-3 font-body text-sm text-gold hover:text-gold-light transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                      <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                  </span>
                  See {capability.caseStudy.name} →
                </Link>
              )}

            </div>
          </div>

          {/* Right — deliverables */}
          <div className="lg:col-span-7">
            <p className={`font-body text-[length:var(--type-caption)] ${tagColor} uppercase tracking-[var(--type-label-ls)] mb-6`}>
              What&apos;s included
            </p>
            <SectionReveal className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capability.deliverables.map((d, i) => (
                <div
                  key={i}
                  className={`${cardBg} border ${cardBorder} px-4 py-3 flex items-start gap-3 hover:border-gold/30 transition-colors duration-300`}
                >
                  <span className={`${checkColor} shrink-0 text-xs mt-1`}>✓</span>
                  <span className={`font-body text-sm font-light ${headingColor}`}>{d}</span>
                </div>
              ))}
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlagshipBand() {
  return (
    <section className="relative bg-dark py-20 border-y border-gold/30 overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,169,110,0.18),transparent_70%)]" />
      <div
        className="relative mx-auto px-[var(--gutter)] flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <div className="max-w-2xl">
          <p className="font-body text-[11px] uppercase tracking-[0.22em] text-gold mb-3">
            The flagship engagement
          </p>
          <h2 className="font-display font-normal italic text-text-light text-[clamp(28px,3.2vw,42px)] leading-tight">
            Want all fourteen run as one accountable system?
          </h2>
          <p className="font-body text-sm text-text-muted-light font-light mt-4 max-w-xl">
            Revenue Engineering bundles the full funnel — site, booking, SEO, AI search, reviews, multilingual content — under one team. From $1,450/mo, three month minimum.
          </p>
        </div>
        <Link href="/revenue-engineering" className="btn-primary shrink-0">
          <span>See Revenue Engineering →</span>
        </Link>
      </div>
    </section>
  );
}

function ServicesFAQItem({ question, answer }) {
  return (
    <div className="border-b border-[var(--border-dark)]">
      <details className="group">
        <summary className="w-full py-6 flex items-center justify-between text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span className="font-body text-[length:var(--type-body)] text-text-light font-light pr-8">
            {question}
          </span>
          <span className="text-gold text-xl shrink-0 transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="pb-6">
          <p className="font-body text-sm text-text-muted-light font-light leading-relaxed max-w-2xl">
            {answer}
          </p>
        </div>
      </details>
    </div>
  );
}
