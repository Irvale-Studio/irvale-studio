'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'floating-cta',
        'fixed bottom-6 right-6 z-90',
        'flex items-center justify-center',
        'bg-gold text-dark font-body font-semibold',
        'rounded-full shadow-lg cursor-pointer',
        'no-underline',
        'h-[48px] w-[48px] md:h-[56px] md:w-[56px]',
        'transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
        'hover:shadow-xl',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none',
        hovered && 'w-[220px] md:w-[240px]',
        'motion-reduce:transition-none'
      )}
      aria-label="Get Your Growth Plan"
    >
      <span
        className={cn(
          'whitespace-nowrap text-sm md:text-base tracking-wide overflow-hidden',
          'transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          'motion-reduce:transition-none',
          hovered
            ? 'max-w-[200px] opacity-100 px-2'
            : 'max-w-0 opacity-0 px-0'
        )}
      >
        Get Your Growth Plan
      </span>
      <span
        className={cn(
          'text-lg md:text-xl leading-none shrink-0',
          'transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          'motion-reduce:transition-none',
          hovered && 'translate-x-0.5'
        )}
        aria-hidden="true"
      >
        &rarr;
      </span>
    </Link>
  );
}
