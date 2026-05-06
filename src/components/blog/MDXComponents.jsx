// MDX whitelist — single source of truth for what `.mdx` files can render.
// Imported by `MDXRenderer.jsx`. See docs/mdx-components.md.

import Link from 'next/link';
import Image from 'next/image';
import Speakable from './Speakable';
import Callout from './Callout';
import Comparison from './Comparison';
import Stats from './Stats';
import CTA from './CTA';
import FAQ from './FAQ';
import Figure from './Figure';
import KeywordTable from './KeywordTable';

function MDXAnchor({ href = '', children, ...rest }) {
  const isExternal = /^https?:/.test(href);
  const isHash = href.startsWith('#');
  // rehype-autolink-headings injects { className: ['heading-anchor'] }; that's
  // the canonical signal that this anchor is wrapping an <hN>. Render a plain
  // <a> for both heading-anchor wrappers and other hash-only links — Next/Link
  // adds nothing for fragment hrefs and its client-side runtime can introduce
  // attribute mismatches that fire React #418 during hydration.
  const isHeadingAnchor =
    Array.isArray(rest.className)
      ? rest.className.includes('heading-anchor')
      : typeof rest.className === 'string' && rest.className.includes('heading-anchor');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-text-dark)] underline decoration-[var(--color-gold)]/50 underline-offset-4 decoration-[1.5px] hover:decoration-[var(--color-gold)] transition"
        {...rest}
      >
        {children}
        <span aria-hidden="true" className="inline-block ml-0.5 text-[0.85em] text-[var(--color-gold-muted)]">↗</span>
      </a>
    );
  }

  if (isHash || isHeadingAnchor) {
    // Plain <a> — no Next/Link, no extra wrapper styles. Lets the heading text
    // render exactly as the rehype tree intended on both server and client.
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      prefetch={true}
      className="text-[var(--color-text-dark)] underline decoration-[var(--color-gold)]/50 underline-offset-4 decoration-[1.5px] hover:decoration-[var(--color-gold)] transition"
    >
      {children}
    </Link>
  );
}

function MDXImage({ src, alt, width, height, ...rest }) {
  if (!alt) {
    throw new Error(`<img> missing alt: ${src}`);
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1600}
      height={height || 900}
      quality={80}
      sizes="(min-width:1024px) 960px, 100vw"
      className="my-8 w-full h-auto rounded-sm border border-[var(--border-light)]"
      {...rest}
    />
  );
}

export const mdxComponents = {
  // Whitelisted custom components
  Speakable,
  Callout,
  Comparison,
  Stats,
  CTA,
  FAQ,
  Figure,
  KeywordTable,

  // Native overrides
  a: MDXAnchor,
  img: MDXImage,
};
