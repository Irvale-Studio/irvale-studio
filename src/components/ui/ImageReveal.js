'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal({ children, className = '' }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const img = ref.current.querySelector('img') || ref.current.firstChild;

    gsap.set(ref.current, { clipPath: 'inset(100% 0 0 0)' });
    if (img) gsap.set(img, { scale: 1.2 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    });

    tl.to(ref.current, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.1,
      ease: 'power3.inOut',
    });

    if (img) {
      tl.to(img, {
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
      }, 0);
    }
  }, { scope: ref });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
