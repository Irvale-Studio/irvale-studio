'use client';

import { useState } from 'react';
import QuizFlow from '@/components/ui/QuizFlow';
import { QUIZ_CONFIG } from '@/lib/data/quiz-config';

export default function ContactForm() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left — Info (dark) */}
        <div className="bg-dark flex flex-col justify-center px-[var(--gutter)] pt-32 pb-16 md:py-0 relative">
          <div className="max-w-md">
            <h1 className="font-display text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] text-text-light mb-6">
              Let&rsquo;s talk
            </h1>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light mb-8">
              Tell us about your project, or book a free consultation call to discuss your goals in person.
            </p>

            <a
              href="mailto:jacobmhorgan@gmail.com"
              className="font-body text-sm text-gold hover:text-gold-light transition-colors block"
            >
              jacobmhorgan@gmail.com
            </a>
          </div>

          <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gold/20" />
        </div>

        {/* Right — Actions (cream) */}
        <div className="bg-cream flex flex-col px-[var(--gutter)] pt-16 pb-16 md:py-0 md:justify-center">
          <div className="max-w-md w-full mx-auto grid grid-rows-2 gap-6">
            {/* Get your free technical plan — first */}
            <button
              type="button"
              onClick={() => setQuizOpen(true)}
              className="bg-white border border-text-dark/10 shadow-sm hover:shadow-md hover:border-gold/50 transition-all px-6 py-6 rounded text-left group flex flex-col"
            >
              <span className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark group-hover:text-gold transition-colors block mb-2">
                Get Your Free Technical Plan
              </span>
              <span className="font-body text-sm text-text-muted-dark block flex-1">
                Answer a few questions and we&rsquo;ll map out your project with pricing
              </span>
              <span className="font-body text-sm text-gold group-hover:text-gold-light transition-colors mt-4">
                Start now →
              </span>
            </button>

            {/* Book a call */}
            <a
              href="https://irvale-studio.zatrovo.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-text-dark/10 shadow-sm hover:shadow-md hover:border-gold/50 transition-all px-6 py-6 rounded group flex flex-col"
            >
              <span className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark group-hover:text-gold transition-colors block mb-2">
                Book a Call
              </span>
              <span className="font-body text-sm text-text-muted-dark block flex-1">
                Free 30 minute consultation — no obligations
              </span>
              <span className="font-body text-sm text-gold group-hover:text-gold-light transition-colors mt-4">
                Choose a time →
              </span>
            </a>
          </div>
        </div>
      </div>

      <QuizFlow
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        config={QUIZ_CONFIG}
        apiEndpoint="/api/quiz"
      />
    </>
  );
}
