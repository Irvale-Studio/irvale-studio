'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';
import MagneticButton from '@/components/ui/MagneticButton';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Parallax on the background
    gsap.to(overlayRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-end overflow-hidden bg-dark"
    >
      {/* Background — placeholder gradient until real images */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-dark via-dark-2 to-dark"
      />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,17,17,0.7)_70%,rgba(17,17,17,0.95)_100%)]" />

      {/* Content */}
      <div
        className="relative z-10 px-[var(--gutter)] pb-16 md:pb-24 w-full"
        style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
      >
        {/* Editorial counter */}
        <div className="mb-8 font-display text-text-muted-light text-sm tracking-wider">
          01 / 01
        </div>

        <RevealText
          as="h1"
          className="font-display italic font-normal text-text-light text-[length:var(--type-display)] leading-[var(--type-display-lh)] max-w-[900px]"
        >
          Where luxury brands meet their digital moment
        </RevealText>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-block font-body text-sm font-medium bg-gold text-dark px-8 py-3.5 hover:bg-gold-light transition-colors"
            >
              Start a Project →
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/work"
              className="inline-block font-body text-sm font-medium text-text-light border border-white/20 px-8 py-3.5 hover:border-white/40 transition-colors"
            >
              View Our Work
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
