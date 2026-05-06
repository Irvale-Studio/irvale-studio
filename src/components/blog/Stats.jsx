// <Stats> — sourced metric grid. AI engines extract `value` + `source` as
// citable stats; the `source` line is structurally required (italicised below).

export default function Stats({ items = [] }) {
  if (!items.length) return null;
  const cols = items.length >= 3 ? 'md:grid-cols-3' : items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <div className={`my-10 grid grid-cols-1 ${cols} gap-4`}>
      {items.map((it, i) => (
        <figure
          key={i}
          className="rounded-sm border border-[var(--border-light)] bg-[var(--color-cream-2)]/60 p-6 flex flex-col"
        >
          <span className="font-display font-light text-[length:var(--type-h2)] leading-none text-[var(--color-text-dark)]">
            {it.value}
          </span>
          <span className="mt-3 font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-[var(--color-text-dark)]">
            {it.label}
          </span>
          {it.source ? (
            <figcaption className="mt-4 pt-3 border-t border-[var(--border-light)] font-body text-[length:var(--type-caption)] italic text-[var(--color-text-muted-dark)]">
              Source: {it.source}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
