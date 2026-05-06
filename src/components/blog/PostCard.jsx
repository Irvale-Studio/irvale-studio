import Link from 'next/link';
import Image from 'next/image';

function fmtDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function PostCard({ post, featured = false }) {
  if (!post) return null;
  const href = `/blog/${post.slug}`;
  const heroSrc = `/images/blog/${post.slug}/hero.jpg`;

  if (featured) {
    return (
      <Link
        href={href}
        prefetch
        className="group not-prose grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-[var(--color-cream-2)] border border-[var(--border-light)] rounded-sm overflow-hidden p-6 md:p-10"
      >
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-[var(--color-dark-2)]/10">
          <Image
            src={heroSrc}
            alt={post.hero?.alt || post.title}
            fill
            sizes="(min-width:1024px) 600px, 100vw"
            quality={80}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ objectPosition: post.hero?.focalPoint?.replace(/\s+/g, ' ') || '50% 50%' }}
          />
        </div>
        <div>
          <span className="font-body text-[length:var(--type-label)] tracking-[var(--type-label-ls)] uppercase text-[var(--color-gold)]">
            Featured · {post.category}
          </span>
          <h2 className="mt-4 font-display font-normal text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-[var(--color-text-dark)]">
            {post.title}
          </h2>
          <p className="mt-4 font-body text-[length:var(--type-body)] text-[var(--color-text-dark)] font-light max-w-[60ch]">
            {post.description}
          </p>
          <div className="mt-6 font-body text-[length:var(--type-body-sm)] text-[var(--color-text-muted-dark)]">
            {fmtDate(post.publishedAt)} · {post.readingTime}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      prefetch
      className="group not-prose flex flex-col bg-[var(--color-cream-2)]/40 border border-[var(--border-light)] rounded-sm overflow-hidden hover:border-[var(--color-gold)]/40 transition"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-dark-2)]/10">
        <Image
          src={heroSrc}
          alt={post.hero?.alt || post.title}
          fill
          sizes="(min-width:1024px) 380px, 100vw"
          quality={80}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ objectPosition: post.hero?.focalPoint?.replace(/\s+/g, ' ') || '50% 50%' }}
        />
      </div>
      <div className="flex flex-col p-6 md:p-7 flex-1">
        <span className="font-body text-[length:var(--type-label)] tracking-[var(--type-label-ls)] uppercase text-[var(--color-gold-muted)]">
          {post.category}
        </span>
        <h3 className="mt-3 font-display font-normal text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-[var(--color-text-dark)]">
          {post.title}
        </h3>
        <p className="mt-3 font-body text-[length:var(--type-body-sm)] text-[var(--color-text-dark)] font-light line-clamp-3">
          {post.description}
        </p>
        <div className="mt-5 pt-4 border-t border-[var(--border-light)] font-body text-[length:var(--type-caption)] uppercase tracking-[0.08em] text-[var(--color-text-muted-dark)]">
          {fmtDate(post.publishedAt)} · {post.readingTime}
        </div>
      </div>
    </Link>
  );
}
