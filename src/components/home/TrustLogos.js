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
  const itemsRef = useRef([]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const items = itemsRef.current.filter(Boolean);

      items.forEach((item, i) => {
        gsap.set(item, { opacity: 0, y: 20, filter: 'grayscale(100%)' });
        gsap.to(item, {
          opacity: 1,
          y: 0,
          filter: 'grayscale(0%)',
          duration: 0.8,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {clients.map((name, i) => (
            <div
              key={name}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group relative flex items-center justify-center py-8 md:py-10 border border-[var(--border-light)] bg-cream-2/50 transition-all duration-500 hover:border-gold/25 hover:shadow-[0_4px_20px_rgba(201,169,110,0.08)]"
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
