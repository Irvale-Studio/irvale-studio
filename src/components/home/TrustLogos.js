'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  'Boxx Fitness Studio',
  'Hang Dong Golf Club',
  'Chiang Mai Go Tours',
];

export default function TrustLogos() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const cards = cardsRef.current.filter(Boolean);

      // Each card after the first starts below and scrolls up to stack
      cards.forEach((card, i) => {
        if (i === 0) return; // First card is already in place

        gsap.fromTo(
          card,
          { yPercent: 80, scale: 0.95, opacity: 0.4 },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-cream py-16 md:py-20">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="block text-center mb-10">Brands That Grew With Us</Eyebrow>

        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {clients.map((name, i) => (
            <div
              key={name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group sticky top-[30vh] relative flex items-center justify-center py-10 md:py-14 border border-[var(--border-light)] bg-cream transition-all duration-500 hover:border-gold/25 hover:shadow-[0_4px_20px_rgba(201,169,110,0.08)]"
              style={{
                zIndex: i + 1,
                boxShadow: '0 -4px 20px rgba(0,0,0,0.04)',
              }}
            >
              {/* Corner accents on hover */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/0 transition-all duration-500 group-hover:border-gold/30 group-hover:w-5 group-hover:h-5" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/0 transition-all duration-500 group-hover:border-gold/30 group-hover:w-5 group-hover:h-5" />

              <span className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark/40 tracking-[0.1em] uppercase transition-colors duration-500 group-hover:text-text-dark/70">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
