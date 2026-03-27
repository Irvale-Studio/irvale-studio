import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import Marquee from '@/components/ui/Marquee';
import ServiceCards from '@/components/services/ServiceCards';
import AddOnsGrid from '@/components/services/AddOnsGrid';
import FAQAccordion from '@/components/services/FAQAccordion';
import ServicesHero from '@/components/services/ServicesHero';
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

      {/* Hero — dark with animated constellation */}
      <ServicesHero />

      {/* Website Build Tiers — cream for contrast */}
      <ServiceCards
        eyebrow="SERVICE ONE"
        title="Website Build"
        subtitle="A one-time project fee to design, build, and launch your new site. All tiers include responsive design, speed optimisation, security certificates, and domain hosting."
        tiers={websiteBuildTiers}
        disclaimer="All prices in Thai Baht (THB) and exclude VAT where applicable. Website builds invoiced 50% upfront, 50% on launch."
        variant="light"
      />

      {/* Marquee */}
      <div className="bg-dark py-4 border-y border-[var(--border-dark)]">
        <Marquee
          items={marqueeItems}
          separator="·"
          className="font-display text-lg text-gold/40 tracking-[0.12em]"
          speed={90}
        />
      </div>

      {/* Hosting & Maintenance Tiers — dark */}
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
