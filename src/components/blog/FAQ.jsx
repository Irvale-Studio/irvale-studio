// <FAQ> — native <details> accordions over items={[{q, a}]}.
// Built native for accessibility + AI extractability (LLM crawlers parse <details>).

export default function FAQ({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="my-10 not-prose">
      {items.map((it, i) => (
        <details
          key={i}
          className="group border-b border-[var(--border-light)] py-5 [&[open]_svg]:rotate-45"
        >
          <summary className="flex cursor-pointer items-start justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[length:var(--type-h3)] leading-[1.25] text-[var(--color-text-dark)] font-normal pr-2">
              {it.q}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mt-2 h-5 w-5 flex-none text-[var(--color-gold)] transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-4 font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-[var(--color-text-dark)] [&>p]:mb-3 [&>p:last-child]:mb-0">
            <p>{it.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
