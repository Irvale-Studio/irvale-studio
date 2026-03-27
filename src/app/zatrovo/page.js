import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import ServiceCards from '@/components/services/ServiceCards';
import { zatrovoTiers } from '@/lib/data/services';

export const metadata = {
  title: 'Zatrovo Booking Software — Irvale Studio',
  description:
    'A proprietary booking and scheduling platform built for professional service businesses in Southeast Asia. Online bookings, CRM, payments, and AI assistant — fully managed.',
};

const valueProps = [
  {
    number: '01',
    title: 'Built for Southeast Asia',
    description:
      'LINE, WhatsApp, PromptPay, and multi-language support as standard — not afterthoughts. Zatrovo speaks the way your clients do.',
  },
  {
    number: '02',
    title: 'We set it up for you',
    description:
      'No DIY onboarding. We configure everything, embed it into your website, train your team, and stay with you throughout.',
  },
  {
    number: '03',
    title: 'One platform, everything included',
    description:
      'Bookings, calendar sync, CRM, payments, reminders, and an AI assistant — all in a single admin panel your team can use from day one.',
  },
];

const features = [
  { name: 'Online Booking', description: 'Clients book 24/7 from your website or a branded booking page' },
  { name: 'Calendar Sync', description: 'Google, Outlook, and multi-platform sync for every staff member' },
  { name: 'Client CRM', description: 'Member lists, intake forms, booking history, and client profiles' },
  { name: 'Payment Processing', description: 'Cash, card, PromptPay, credit packs, and instalment plans' },
  { name: 'Automated Reminders', description: 'Email, WhatsApp, phone, and LINE — reduce no-shows by up to 80%' },
  { name: 'AI Assistant', description: 'Built-in AI that helps manage enquiries and streamline admin tasks' },
  { name: 'Analytics Dashboard', description: 'Track bookings, revenue, and client engagement in real time' },
  { name: 'Multi-Location', description: 'Manage multiple venues, teams, and calendars from one dashboard' },
];

const faqs = [
  {
    question: 'Is Zatrovo a third-party tool?',
    answer:
      'No. Zatrovo is our proprietary platform, built and maintained by Irvale Studio. That means direct support from the people who built it — no ticket queues or outsourced help desks.',
  },
  {
    question: 'Can I use Zatrovo without an Irvale website?',
    answer:
      'Yes. Zatrovo works as a standalone booking platform with its own branded booking page. It works best when embedded into an Irvale-built website, but it is not a requirement.',
  },
  {
    question: 'What payment methods does Zatrovo support?',
    answer:
      'Cash, card, PromptPay (Thailand), credit packs, session packs, and instalment plans. Payment methods vary by tier — the Growth and Studio tiers unlock the full range.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'We typically have your system live within 5–7 business days. That includes full configuration, website embedding, and team training.',
  },
  {
    question: 'Can I switch tiers later?',
    answer:
      'Absolutely. Upgrading or downgrading takes effect on your next billing cycle. No migration fees, no disruption.',
  },
];

export default function ZatrovoPage() {
  return (
    <main>
      {/* Hero — dark with subtle gradient */}
      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden">
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.12),transparent_60%),radial-gradient(ellipse_at_70%_60%,rgba(201,169,110,0.08),transparent_60%)]" />

        <div
          className="relative mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Zatrovo Booking Software</Eyebrow>
          <RevealText
            as="h1"
            className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[800px] mb-6"
          >
            The booking platform built for professional services
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-lg mb-8">
            A monthly subscription to our proprietary appointment and booking
            system — built for professional service businesses in Southeast
            Asia. We set it up, embed it into your site, and support you
            throughout.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              <span>Get Started →</span>
            </Link>
            <Link href="#pricing" className="btn-outline">
              <span>View Pricing →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Value propositions */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-12 block">Why Zatrovo</Eyebrow>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
            {valueProps.map((prop) => (
              <div key={prop.number} className="flex flex-col">
                <span className="font-display text-gold/40 text-lg mb-4">
                  {prop.number}
                </span>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-3">
                  {prop.title}
                </h3>
                <p className="font-body text-sm text-text-muted-dark font-light leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-6 block">Platform Features</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px]"
            >
              Everything your business needs to manage bookings.
            </RevealText>
          </div>
          <SectionReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative bg-dark-2 border border-[var(--border-dark)] p-6 md:p-8 group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold/30 group-hover:bg-gold transition-colors duration-300" />
                <h4 className="font-body text-sm font-medium text-text-light mb-2">
                  {feature.name}
                </h4>
                <p className="font-body text-xs text-text-muted-light font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Pricing tiers */}
      <div id="pricing">
        <ServiceCards
          eyebrow="Pricing"
          title="Choose your plan."
          subtitle="All tiers include a dedicated admin panel, full setup and onboarding by Irvale Studio, and ongoing support."
          tiers={zatrovoTiers}
        />
      </div>

      {/* FAQ */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">Frequently Asked Questions</Eyebrow>
          <SectionReveal className="max-w-2xl">
            {faqs.map((faq, i) => (
              <ZatrovoFAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </SectionReveal>
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
            className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px] mx-auto justify-center mb-4"
          >
            Ready to take bookings online?
          </RevealText>
          <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light max-w-md mx-auto mb-8">
            Book a free 30-minute call and we&rsquo;ll walk you through the
            platform.
          </p>
          <Link href="/contact" className="btn-primary px-10">
            <span>Get Started →</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function ZatrovoFAQItem({ question, answer }) {
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
          <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
            {answer}
          </p>
        </div>
      </details>
    </div>
  );
}
