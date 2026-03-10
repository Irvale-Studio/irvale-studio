'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function TransitionLayout({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);
  const curtainRef = useRef(null);
  const prevPath = useRef(pathname);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (prevPath.current === pathname) {
      // Initial page load — just fade in
      gsap.from(contentRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
      return;
    }

    prevPath.current = pathname;

    // Enter animation
    const tl = gsap.timeline();
    tl.set(curtainRef.current, { yPercent: 0 })
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.inOut',
      })
      .from(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.1');
  }, { dependencies: [pathname] });

  return (
    <>
      {/* Page transition curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[200] bg-dark pointer-events-none"
        style={{ transform: 'translateY(-100%)' }}
      />
      <div ref={contentRef}>
        {children}
      </div>
    </>
  );
}
