import dynamic from 'next/dynamic';
import Marquee from '@/components/ui/Marquee';
import HeroSection from '@/components/home/HeroSection';

const IntroStatement = dynamic(() => import('@/components/home/IntroStatement'));
const TrustLogos = dynamic(() => import('@/components/home/TrustLogos'));
const FeaturedWork = dynamic(() => import('@/components/home/FeaturedWork'));
const WhatWeOffer = dynamic(() => import('@/components/home/WhatWeOffer'));
const Accredited = dynamic(() => import('@/components/home/Accredited'));
const TechStack = dynamic(() => import('@/components/home/TechStack'));
const Process = dynamic(() => import('@/components/home/Process'));
const Testimonial = dynamic(() => import('@/components/home/Testimonial'));
const CTASection = dynamic(() => import('@/components/home/CTASection'));

const marqueeItems = [
  'Bespoke Design', 'Strategic SEO', 'AI Visibility',
  'Digital Marketing', 'Refined Experiences', 'Measurable Growth',
  'Premium Brands', 'Considered Code',
];

export default function Home() {
  return (
    <main>
      {/* Hero — full-bleed golf course image, centered text */}
      <HeroSection />

      {/* Premium positioning marquee */}
      <div className="bg-dark-2 py-5 border-y border-[var(--border-dark)]">
        <Marquee
          items={marqueeItems}
          separator="·"
          className="font-display text-[length:var(--type-body)] text-text-light/20 tracking-[0.12em]"
          speed={90}
        />
      </div>

      {/* Problem statement + client outcome stats */}
      <IntroStatement />

      {/* Scrolling client logos */}
      <TrustLogos />

      {/* Client results — horizontal scroll */}
      <FeaturedWork />

      {/* What we offer — 4 alternating sections */}
      <WhatWeOffer />

      {/* Tech stack carousel */}
      <TechStack />

      {/* Accredited & Proven credentials */}
      <Accredited />

      {/* Sticky process section */}
      <Process />

      {/* Client testimonials */}
      <Testimonial />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
