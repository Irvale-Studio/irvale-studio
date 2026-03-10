'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Counter({ target, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ref.current.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
      },
    });
  }, { scope: ref });

  return <span ref={ref} className={className}>0</span>;
}
