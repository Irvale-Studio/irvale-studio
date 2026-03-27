import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import Marquee from '@/components/ui/Marquee';
import ServiceCards from '@/components/services/ServiceCards';
import AddOnsGrid from '@/components/services/AddOnsGrid';
import FAQAccordion from '@/components/services/FAQAccordion';
import { ServiceSchema, FAQPageSchema } from '@/components/SchemaMarkup';
import { websiteBuildTiers, hostingTiers } from '@/lib/data/services';

export const metadata = {
  title: 'Services & Pricing — Irvale Studio',
  description:
    'Transparent pricing for bespoke websites, managed hosting, and add-on services. From clean brochure sites to fully custom multi-page platforms — all priced in THB.',
};

const marqueeItems = [
  'Bespoke Design',
  'Speed Optimised',
  'SSL Secured',
  'SEO Built In',
  'Fully Managed Hosting',
  'Ongoing Support',
  'Admin Dashboards',
  'AI Search Ready',
  'Multi-Language',
  'Cancel Anytime',
];

export default function ServicesPage() {
  return (
    <main>
      <ServiceSchema />
      <FAQPageSchema />

      {/* Hero — dark */}
      <section className="bg-dark pt-32 pb-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Services & Pricing</Eyebrow>
          <RevealText
            as="h1"
            className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[800px] mb-6"
          >
            Transparent pricing. No surprises.
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-lg">
            See the full picture before you commit. From a clean brochure site
            to a fully custom platform with admin tools, SEO, and AI search
            optimisation.
          </p>
        </div>
      </section>

      {/* Website Build Tiers — dark-2 to separate from hero */}
      <ServiceCards
        eyebrow="SERVICE ONE"
        title="Website Build"
        subtitle="A one-time project fee to design, build, and launch your new site. All tiers include responsive design, speed optimisation, security certificates, and domain hosting."
        tiers={websiteBuildTiers}
        disclaimer="All prices in Thai Baht (THB) and exclude VAT where applicable. Website builds invoiced 50% upfront, 50% on launch."
        sectionBg="bg-dark-2"
      />

      {/* Marquee — benefits, not tier names */}
      <div className="bg-dark-2 py-4 border-y border-[var(--border-dark)]">
        <Marquee
          items={marqueeItems}
          separator="·"
          className="font-display text-lg text-gold/40 tracking-[0.12em]"
          speed={30}
        />
      </div>

      {/* Hosting & Maintenance Tiers */}
      <ServiceCards
        eyebrow="SERVICE TWO"
        title="Hosting & Maintenance"
        subtitle="A monthly retainer that keeps your website fast, secure, and up to date. Your site is a professional asset — it deserves professional upkeep."
        tiers={hostingTiers}
        disclaimer="Monthly subscriptions can be cancelled at any time and continue until the end of the billing month. All prices in Thai Baht (THB) and exclude VAT."
      />

      {/* Add-On Services */}
      <AddOnsGrid />

      {/* FAQ */}
      <FAQAccordion />
    </main>
  );
}
