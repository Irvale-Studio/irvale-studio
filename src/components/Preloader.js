'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('irvale_visited')) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('irvale_visited', 'true');
          setShow(false);
        },
      });

      tl.to(wordmarkRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
        .to(wordmarkRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          delay: 0.2,
        })
        .to(
          [leftPanelRef.current, rightPanelRef.current],
          {
            xPercent: (i) => (i === 0 ? -100 : 100),
            duration: 0.5,
            ease: 'power3.inOut',
          },
        );
    }, containerRef);

    return () => ctx.revert();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto"
    >
      {/* Left curtain panel */}
      <div
        ref={leftPanelRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-dark"
      />
      {/* Right curtain panel */}
      <div
        ref={rightPanelRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-dark"
      />
      {/* Wordmark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          ref={wordmarkRef}
          className="font-display text-gold text-[clamp(24px,4vw,48px)] tracking-[0.25em] opacity-0"
        >
          IRVALE
        </span>
      </div>
    </div>
  );
}
