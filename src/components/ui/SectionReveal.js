'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

export default function SectionReveal({ children, className = '', stagger = 0.06, delay = 0 }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = ref.current.children;
    const cappedStagger = Math.min(stagger, 0.6 / Math.max(targets.length, 1));

    gsap.from(targets, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power2.out',
      stagger: cappedStagger,
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 92%',
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
