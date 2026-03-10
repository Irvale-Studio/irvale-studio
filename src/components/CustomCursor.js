'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = cursorRef.current;
    const text = textRef.current;

    // Show cursor
    cursor.style.display = 'flex';
    document.body.style.cursor = 'none';

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(201, 169, 110, 0.15)',
        borderColor: '#C9A96E',
        duration: 0.3,
      });
    };

    const onMouseEnterPortfolio = () => {
      gsap.to(cursor, {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(201, 169, 110, 0.15)',
        borderColor: '#C9A96E',
        duration: 0.3,
      });
      gsap.to(text, { opacity: 1, duration: 0.2 });
    };

    const onMouseEnterNav = () => {
      gsap.to(cursor, {
        width: 8,
        height: 8,
        backgroundColor: '#C9A96E',
        borderColor: '#C9A96E',
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        backgroundColor: 'transparent',
        borderColor: '#C9A96E',
        duration: 0.3,
      });
      gsap.to(text, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Delegate hover states
    const links = document.querySelectorAll('a, button');
    const portfolioItems = document.querySelectorAll('[data-cursor="portfolio"]');
    const navItems = document.querySelectorAll('[data-cursor="nav"]');

    links.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeave);
    });
    portfolioItems.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterPortfolio);
      el.addEventListener('mouseleave', onMouseLeave);
    });
    navItems.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterNav);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    // Re-bind on DOM changes for SPA navigation
    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll('a, button');
      newLinks.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeave);
      });
      const newPortfolio = document.querySelectorAll('[data-cursor="portfolio"]');
      newPortfolio.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterPortfolio);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnterPortfolio);
        el.addEventListener('mouseleave', onMouseLeave);
      });
      const newNav = document.querySelectorAll('[data-cursor="nav"]');
      newNav.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterNav);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnterNav);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = '';
      observer.disconnect();
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      portfolioItems.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterPortfolio);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      navItems.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterNav);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9998] pointer-events-none items-center justify-center rounded-full border border-gold"
      style={{
        width: 12,
        height: 12,
        display: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span
        ref={textRef}
        className="font-body text-[10px] font-medium tracking-[0.15em] text-gold opacity-0 uppercase"
      >
        VIEW
      </span>
    </div>
  );
}
