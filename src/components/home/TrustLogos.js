'use client';

import Eyebrow from '@/components/ui/Eyebrow';

const clients = [
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
          className="marquee-track"
          style={{ '--marquee-speed': '20s' }}
        >
          {/* First set */}
          <div className="flex items-center gap-16 md:gap-24 shrink-0">
            {clients.map((name, i) => (
              <span
                key={i}
                className="font-display text-xl md:text-2xl text-text-dark/30 tracking-[0.15em] uppercase shrink-0 px-4"
              >
                {name}
              </span>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-16 md:gap-24 shrink-0">
            {clients.map((name, i) => (
              <span
                key={`dup-${i}`}
                className="font-display text-xl md:text-2xl text-text-dark/30 tracking-[0.15em] uppercase shrink-0 px-4"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
