import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';

export const metadata = {
  title: 'Digital & Social Media Marketing — Irvale Studio',
  description: 'Comprehensive digital and social media marketing for premium brands. Social management, paid advertising, content strategy, PPC, email marketing, and analytics.',
};

const stats = [
  { value: '3.5B+', label: 'daily social media users worldwide' },
  { value: '68%', label: 'of consumers follow brands for product updates' },
  { value: '2x', label: 'higher engagement for social-first brands' },
];

const services = [
  {
    title: 'Social Media Management',
    description: 'Instagram, Facebook, TikTok, LinkedIn content creation and scheduling. We craft a consistent, on-brand presence that keeps your audience engaged.',
  },
  {
    title: 'Paid Social Advertising',
    description: 'Targeted campaigns on Meta, TikTok, and Google to reach your ideal audience. Precision targeting that puts your brand in front of the people who matter.',
  },
  {
    title: 'Content Strategy & Creation',
    description: 'Photography direction, video, reels, stories — content that converts. Every piece designed to stop the scroll and drive action.',
  },
  {
    title: 'Google Ads & PPC',
    description: 'Search, display, and remarketing campaigns that drive qualified traffic. We maximise every pound of ad spend for measurable returns.',
  },
  {
    title: 'Email Marketing',
    description: 'Automated sequences, newsletters, and campaigns that nurture and convert. Build lasting relationships that turn subscribers into loyal customers.',
  },
  {
    title: 'Analytics & Reporting',
    description: 'Monthly reports showing exactly what\'s working and where your ROI is. Data-driven insights that inform smarter decisions.',
  },
];

const whyPoints = [
  {
    title: 'Your competitors are already there',
    description: 'The brands competing for your customers are building audiences, running ads, and creating content daily. Every day without a strategy is ground lost.',
  },
  {
    title: 'Your customers expect it',
    description: 'Today\'s consumers research brands on social before they buy. Your presence — or absence — shapes their perception before they ever visit your website.',
  },
  {
    title: 'It compounds with SEO',
    description: 'A strong social presence amplifies your search visibility. Social signals, brand mentions, and content distribution feed directly into your organic rankings.',
  },
];

export default function MarketingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden">
        {/* Subtle gradient bg */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.12),transparent_70%),radial-gradient(ellipse_at_70%_60%,rgba(201,169,110,0.08),transparent_70%)]" />

        <div
          className="relative mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Digital & Social Media Marketing</Eyebrow>
          <RevealText
            as="h1"
            className="font-display italic font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6"
          >
            Put your brand in front of the right people, everywhere they look
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-lg mb-8">
            Comprehensive digital marketing that builds awareness, drives engagement, and turns attention into revenue — across every platform that matters.
          </p>
          <Link href="/contact" className="btn-primary">
            <span>Get Started →</span>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark py-[var(--component-gap)]">
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

      {/* Services Grid */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-4 block text-text-muted-dark">What We Deliver</Eyebrow>
          <h2 className="font-display italic text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-dark max-w-[700px] mb-12">
            Everything your brand needs to own digital
          </h2>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--grid-gap)]">
            {services.map((service, i) => (
              <div
                key={i}
                className="border border-[var(--border-light)] p-8 md:p-10 bg-white/50"
              >
                <span className="font-display text-gold-muted/40 text-lg block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-4">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-text-muted-dark font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-4 block">The Case for Social</Eyebrow>
          <h2 className="font-display italic text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light max-w-[700px] mb-12">
            Why premium brands need a social presence
          </h2>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
            {whyPoints.map((point, i) => (
              <div
                key={i}
                className="border border-gold/20 p-8 md:p-10 bg-[rgba(255,255,255,0.02)]"
              >
                <span className="font-display text-gold/40 text-lg block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light mb-4">
                  {point.title}
                </h3>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-[var(--section-gap)] border-t border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <RevealText
            as="h2"
            className="font-display italic font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px] mx-auto justify-center mb-6"
          >
            Ready to own your audience?
          </RevealText>
          <Link href="/contact" className="btn-primary px-10">
            <span>Let&apos;s Talk →</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
