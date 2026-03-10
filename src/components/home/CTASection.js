'use client';

import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';
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

        <Link href="/contact" className="btn-primary px-10">
          <span>Start a Project →</span>
        </Link>

        <p className="font-body text-xs text-text-muted-light mt-6">
          We respond within 24 hours.
        </p>
      </div>
    </section>
  );
}
