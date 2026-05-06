// <KeywordTable> — compact 2-column matrix for in-content glossaries.

export default function KeywordTable({ rows = [], headers }) {
  return (
    <figure className="my-8">
      <table className="w-full border-collapse text-left font-body text-[length:var(--type-body-sm)]">
        {headers && headers.length ? (
          <thead>
            <tr className="border-b border-[var(--color-gold)]/40">
              {headers.slice(0, 2).map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className="py-2 pr-4 font-body font-semibold text-[length:var(--type-caption)] uppercase tracking-[0.06em] text-[var(--color-gold-muted)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[var(--border-light)] last:border-b-0">
              <th
                scope="row"
                className="py-3 pr-6 align-top font-body font-medium text-[var(--color-text-dark)] whitespace-nowrap"
              >
                {row[0]}
              </th>
              <td className="py-3 align-top font-light text-[var(--color-text-dark)]">
                {row[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
