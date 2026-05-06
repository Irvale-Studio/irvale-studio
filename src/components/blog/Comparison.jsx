// <Comparison> — bordered comparison table with a sticky first column on mobile.

export default function Comparison({ caption, headers = [], rows = [] }) {
  return (
    <figure className="my-10">
      <div className="overflow-x-auto -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:px-0 [scrollbar-width:thin]">
        <table className="w-full min-w-[640px] border-collapse text-left font-body text-[length:var(--type-body-sm)]">
          {caption ? (
            <caption className="caption-top mb-4 font-body text-[length:var(--type-label)] tracking-[var(--type-label-ls)] uppercase text-[var(--color-gold-muted)] text-left">
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr className="border-b-2 border-[var(--color-gold)]/40">
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={
                    'py-3 pr-4 align-bottom font-body font-semibold text-[var(--color-text-dark)] uppercase tracking-[0.06em] text-[length:var(--type-caption)] ' +
                    (i === 0
                      ? 'sticky left-0 bg-[var(--color-cream)] z-[1] md:static md:bg-transparent pl-0 md:pl-0 pr-4'
                      : 'pr-4')
                  }
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-[var(--border-light)] last:border-b-0"
              >
                {row.map((cell, ci) => {
                  const Tag = ci === 0 ? 'th' : 'td';
                  return (
                    <Tag
                      key={ci}
                      scope={ci === 0 ? 'row' : undefined}
                      className={
                        'py-3 pr-4 align-top text-[var(--color-text-dark)] font-light leading-relaxed ' +
                        (ci === 0
                          ? 'sticky left-0 bg-[var(--color-cream)] z-[1] md:static md:bg-transparent font-medium'
                          : '')
                      }
                    >
                      {cell}
                    </Tag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
