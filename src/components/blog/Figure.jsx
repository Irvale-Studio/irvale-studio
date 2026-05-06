import Image from 'next/image';

// <Figure> — captioned image with credit. Uses next/image for optimisation.
// width/height are required by Next so the image doesn't shift layout.
export default function Figure({
  src,
  alt,
  caption,
  credit,
  creditUrl,
  width = 1600,
  height = 900,
}) {
  if (!alt) {
    throw new Error(`<Figure> missing alt text for src="${src}"`);
  }

  return (
    <figure className="my-10">
      <div className="relative overflow-hidden rounded-sm border border-[var(--border-light)] bg-[var(--color-cream-2)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={80}
          sizes="(min-width:1024px) 960px, 100vw"
          className="w-full h-auto"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-[var(--color-text-muted-dark)]">
          {caption ? <span className="block">{caption}</span> : null}
          {credit ? (
            <span className="mt-1 block text-[length:var(--type-caption)] italic">
              {creditUrl ? (
                <a
                  href={creditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[var(--color-gold)]/40 underline-offset-4 hover:text-[var(--color-text-dark)]"
                >
                  {credit}
                </a>
              ) : (
                credit
              )}
            </span>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
