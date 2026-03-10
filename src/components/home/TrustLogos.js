'use client';

import Eyebrow from '@/components/ui/Eyebrow';

const clients = [
  'BOXX',
  'Hang Dong Golf Club',
  'Chiang Mai Go Tours',
  'BOXX',
  'Hang Dong Golf Club',
  'Chiang Mai Go Tours',
];

export default function TrustLogos() {
  return (
    <section className="bg-cream py-16 overflow-hidden">
      <div
        className="mx-auto px-[var(--gutter)] mb-8"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="block text-center">Brands That Grew With Us</Eyebrow>
      </div>

      {/* Scrolling logo carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex animate-marquee items-center gap-16 md:gap-24 whitespace-nowrap"
          style={{ '--marquee-speed': '20s' }}
        >
          {[...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="font-display text-xl md:text-2xl text-text-dark/30 tracking-[0.15em] uppercase shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
