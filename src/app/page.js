import Marquee from '@/components/ui/Marquee';
import HeroSection from '@/components/home/HeroSection';
import TrustLogos from '@/components/home/TrustLogos';
import IntroStatement from '@/components/home/IntroStatement';
import FeaturedWork from '@/components/home/FeaturedWork';
import ServicesOverview from '@/components/home/ServicesOverview';
import Accredited from '@/components/home/Accredited';
import TechStack from '@/components/home/TechStack';
import Process from '@/components/home/Process';
import Testimonial from '@/components/home/Testimonial';
import CTASection from '@/components/home/CTASection';

const marqueeItems = [
  '+340% ENQUIRIES', '+180% DIRECT BOOKINGS', 'SOLD OUT IN 72HRS',
  '+210% CLASS BOOKINGS', '400+ WAITLIST', '#1 LOCAL RANKINGS',
];

export default function Home() {
  return (
    <main>
      {/* Hero — full-bleed golf course image, centered text */}
      <HeroSection />

      {/* Results marquee */}
      <div className="bg-dark-2 py-4 border-y border-[var(--border-dark)]">
        <Marquee
          items={marqueeItems}
          className="font-body text-sm font-medium text-gold/60 tracking-[0.15em] uppercase"
          speed={25}
        />
      </div>

      {/* Scrolling client logos */}
      <TrustLogos />

      {/* Problem statement + client outcome stats */}
      <IntroStatement />

      {/* Client results — horizontal scroll */}
      <FeaturedWork />

      {/* Services — Get Found / Get Chosen / Get Recommended */}
      <ServicesOverview />

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
