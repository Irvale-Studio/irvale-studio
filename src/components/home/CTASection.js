'use client';

import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CTASection() {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)] text-center"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <RevealText
          as="h2"
          className="font-display italic font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[700px] mx-auto justify-center mb-6"
        >
          Ready to elevate your digital presence?
        </RevealText>

        <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light mb-10 max-w-md mx-auto">
          Tell us about your brand. We&rsquo;ll tell you how we&rsquo;d build it.
        </p>

        <MagneticButton className="inline-block">
          <Link
            href="/contact"
            className="inline-block font-body text-sm font-medium bg-gold text-dark px-10 py-4 hover:bg-gold-light transition-colors"
          >
            Start a Project →
          </Link>
        </MagneticButton>

        <p className="font-body text-xs text-text-muted-light mt-6">
          We respond within 24 hours.
        </p>
      </div>
    </section>
  );
}
