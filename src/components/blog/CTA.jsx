import Link from 'next/link';

// Brand gradient card — gold/cream — usually links to /revenue-engineering.
export default function CTA({ href, label, sublabel }) {
  const isExternal = /^https?:/.test(href);
  const Comp = isExternal ? 'a' : Link;
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Comp
      href={href}
      {...externalProps}
      className="group not-prose my-12 block rounded-sm border border-[var(--color-gold)]/40 bg-gradient-to-br from-[var(--color-gold)]/15 via-[var(--color-cream-2)] to-[var(--color-cream)] p-8 md:p-10 transition-shadow hover:shadow-[0_8px_32px_rgba(201,169,110,0.2)]"
    >
      <span className="block font-body text-[length:var(--type-label)] tracking-[var(--type-label-ls)] uppercase text-[var(--color-gold-muted)] mb-3">
        Next step
      </span>
      <span className="block font-display font-normal text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-[var(--color-text-dark)]">
        {label}
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
      {sublabel ? (
        <span className="mt-3 block font-body text-[length:var(--type-body-sm)] text-[var(--color-text-muted-dark)]">
          {sublabel}
        </span>
      ) : null}
    </Comp>
  );
}
