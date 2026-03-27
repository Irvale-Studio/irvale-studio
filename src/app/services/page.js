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

export default function ServicesPage() {
  return (
    <main>
      <ServiceSchema />
      <FAQPageSchema />

      {/* Hero */}
      <section className="bg-dark pt-32 pb-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Services & Pricing</Eyebrow>
          <RevealText
            as="h1"
            className="font-display italic font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[800px] mb-6"
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

      {/* Website Build Tiers */}
      <ServiceCards
        eyebrow="SERVICE ONE"
        title="Website Build"
        subtitle="A one-time project fee to design, build, and launch your new site. All tiers include responsive design, speed optimisation, security certificates, and domain hosting."
        tiers={websiteBuildTiers}
      />

      {/* Hosting & Maintenance Tiers */}
      <ServiceCards
        eyebrow="SERVICE TWO"
        title="Hosting & Maintenance"
        subtitle="A monthly retainer that keeps your website fast, secure, and up to date. Your site is a professional asset — it deserves professional upkeep."
        tiers={hostingTiers}
        dark
      />

      {/* Marquee */}
      <div className="bg-cream py-4 border-y border-[var(--border-light)]">
        <Marquee
          items={['ESSENTIAL', 'PROFESSIONAL', 'PREMIUM', 'MANAGED', 'GROWTH']}
          className="font-display text-lg text-gold-muted/60 tracking-[0.2em]"
          speed={20}
        />
      </div>

      {/* Add-On Services */}
      <AddOnsGrid />

      {/* FAQ */}
      <FAQAccordion />
    </main>
  );
}
