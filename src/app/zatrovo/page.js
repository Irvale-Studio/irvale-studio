import Link from 'next/link';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import ServiceCards from '@/components/services/ServiceCards';
import { zatrovoTiers } from '@/lib/data/services';

export const metadata = {
  title: 'Zatrovo Booking Software — Irvale Studio',
  description:
    'A proprietary booking and scheduling platform built for professional service businesses. Online bookings, CRM, payments, and AI assistant — fully managed.',
};

const valueProps = [
  {
    number: '01',
    title: 'Built for Service Businesses',
    description:
      'LINE, WhatsApp, Stripe, and multi-language support as standard — not afterthoughts. Zatrovo speaks the way your clients do.',
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
  { name: 'Payment Processing', description: 'Card, Apple Pay, credit packs, and instalment plans' },
  { name: 'Automated Reminders', description: 'Email, WhatsApp, LINE, phone, and SMS — reduce no-shows by up to 80%' },
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
      'Card, Apple Pay, credit packs, session packs, and instalment plans. Payment methods vary by tier — the Growth and Studio tiers unlock the full range.',
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
            system — built for professional service businesses. We set it up, embed it into your site, and support you
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <div
                key={feature.name}
                className="group relative bg-dark-2/80 border border-white/[0.06] p-6 md:p-7 overflow-hidden transition-all duration-500 hover:border-gold/25 hover:bg-dark-2"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/40 transition-all duration-500" />

                {/* Number */}
                <span className="font-display text-[clamp(36px,4vw,48px)] text-white/[0.04] leading-none block mb-3 group-hover:text-gold/10 transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <h4 className="font-display text-[clamp(20px,2vw,26px)] leading-tight font-normal text-text-light mb-3 group-hover:text-gold transition-colors duration-300">
                  {feature.name}
                </h4>

                {/* Description */}
                <p className="font-body text-sm text-text-muted-light/70 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zatrovo in action — BOXX screenshots */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Zatrovo in Action</Eyebrow>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px]">
              See how BOXX Thailand runs their entire studio on Zatrovo.
            </h2>
            <Link
              href="/work/boxx-thailand"
              className="font-body text-sm text-gold hover:text-gold-light transition-colors shrink-0"
            >
              Read the case study →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admin — Products */}
            <div className="border border-[var(--border-light)] overflow-hidden bg-white">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-cream border-b border-[var(--border-light)]">
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="ml-3 flex-1 text-center font-body text-[10px] text-text-muted-dark/50 truncate">
                  Admin — Class Packs & Memberships
                </span>
              </div>
              <div className="relative aspect-video">
                <Image
                  src="/images/projects/boxx-zatrovo-admin.webp"
                  alt="Zatrovo admin panel showing BOXX class pack products"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>

            {/* Client Booking */}
            <div className="border border-[var(--border-light)] overflow-hidden bg-white">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-cream border-b border-[var(--border-light)]">
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="ml-3 flex-1 text-center font-body text-[10px] text-text-muted-dark/50 truncate">
                  Client — Class Schedule & Booking
                </span>
              </div>
              <div className="relative aspect-video">
                <Image
                  src="/images/projects/boxx-zatrovo-booking.webp"
                  alt="Zatrovo booking interface showing BOXX class schedule"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>

            {/* Services */}
            <div className="md:col-span-2 border border-[var(--border-light)] overflow-hidden bg-white">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-cream border-b border-[var(--border-light)]">
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-text-dark/10" />
                <span className="ml-3 flex-1 text-center font-body text-[10px] text-text-muted-dark/50 truncate">
                  Client — Service Selection & Time Slots
                </span>
              </div>
              <div className="relative aspect-[21/9]">
                <Image
                  src="/images/projects/boxx-zatrovo-services.webp"
                  alt="Zatrovo service booking with coach selection and time slots"
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
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
