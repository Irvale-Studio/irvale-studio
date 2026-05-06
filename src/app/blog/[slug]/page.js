import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPost, getAllSlugs, getRelatedPosts, getAuthor } from '@/lib/content/blog';
import MDXRenderer from '@/components/blog/MDXRenderer';
import PostCard from '@/components/blog/PostCard';
import FAQ from '@/components/blog/FAQ';
import CTA from '@/components/blog/CTA';
import Eyebrow from '@/components/ui/Eyebrow';
import { absUrl } from '@/lib/seo/site';

// TODO: wire JSON-LD when src/lib/seo/jsonld.js lands (blogPostingJsonLd + FAQ + Speakable)

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = absUrl(`/blog/${post.slug}`);
  const heroUrl = absUrl(`/images/blog/${post.slug}/hero.jpg`);
  const ogTitle = post.ogTitle || post.title;
  const ogDescription = post.ogDescription || post.description;
  const canonical = post.seo?.canonical || `/blog/${post.slug}`;

  return {
    title: `${post.title} — Irvale Studio`,
    description: post.description,
    alternates: { canonical: absUrl(canonical) },
    robots: post.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: [{ url: heroUrl, alt: post.hero?.alt || post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [heroUrl],
    },
  };
}

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

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const related = getRelatedPosts(post, 3);
  const heroSrc = `/images/blog/${post.slug}/hero.jpg`;
  const focal = post.hero?.focalPoint?.replace(/\s+/g, ' ') || '50% 50%';

  return (
    <main className="bg-[var(--color-cream)]">
      {/* Article header */}
      <header className="bg-dark pt-32 pb-16 md:pb-24 noise-overlay relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%)]" />
        <div className="relative mx-auto px-[var(--gutter)]" style={{ maxWidth: '880px' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 font-body text-[length:var(--type-caption)] uppercase tracking-[0.1em] text-text-muted-light">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-gold">Home</Link>
              </li>
              <li aria-hidden="true" className="text-gold/50">/</li>
              <li>
                <Link href="/blog" className="hover:text-gold">Field Notebook</Link>
              </li>
              <li aria-hidden="true" className="text-gold/50">/</li>
              <li className="text-text-light/80 line-clamp-1">{post.title}</li>
            </ol>
          </nav>

          <div className="font-body text-[length:var(--type-label)] tracking-[var(--type-label-ls)] uppercase text-gold mb-4">
            {post.category} · {post.readingTime} · {fmtDate(post.publishedAt)}
          </div>

          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] mb-6">
            {post.title}
          </h1>

          <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light max-w-[60ch]">
            {post.description}
          </p>

          {author ? (
            <div className="mt-10 flex items-center gap-4">
              {author.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={author.avatar}
                  alt={`${author.name}, ${author.role}`}
                  width={48}
                  height={48}
                  className="rounded-full w-12 h-12 object-cover border border-gold/30"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30" aria-hidden="true" />
              )}
              <div className="font-body text-[length:var(--type-body-sm)] text-text-light/90">
                <div className="font-medium">{author.name}</div>
                <div className="text-text-muted-light">{author.role}</div>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {/* Hero image */}
      <div className="relative -mt-8 md:-mt-16 mb-12 md:mb-16 mx-auto px-[var(--gutter)]" style={{ maxWidth: '1080px' }}>
        <div
          className="relative w-full overflow-hidden rounded-sm border border-[var(--border-light)] bg-[var(--color-cream-2)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]"
          style={{ aspectRatio: '16 / 9' }}
        >
          <Image
            src={heroSrc}
            alt={post.hero?.alt || post.title}
            fill
            sizes="(min-width:1024px) 1080px, 100vw"
            quality={80}
            priority
            className="object-cover"
            style={{ objectPosition: focal }}
          />
        </div>
      </div>

      {/* Body */}
      <article className="mx-auto px-[var(--gutter)] pb-[var(--section-gap)]" style={{ maxWidth: '760px' }}>
        <div className="mdx-prose">
          <MDXRenderer source={post.content} />
        </div>

        {/* FAQ — render natively from frontmatter (mirrors any inline <FAQ /> in MDX) */}
        {Array.isArray(post.faq) && post.faq.length > 0 ? (
          <section className="mt-16">
            <Eyebrow className="mb-4 block">Common Questions</Eyebrow>
            <h2 className="font-display font-normal text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-[var(--color-text-dark)] mb-6">
              {post.title.split(/[:—–-]/)[0].trim()} — FAQ
            </h2>
            <FAQ items={post.faq} />
          </section>
        ) : null}

        {/* CTA card */}
        <CTA
          href="/revenue-engineering"
          label="Get this engineered for you"
          sublabel="$1,450 / $3,450 / $5,500 per month — website + Zatrovo bundled"
        />
      </article>

      {/* Related posts */}
      {related.length > 0 ? (
        <section className="bg-[var(--color-cream-2)]/60 border-t border-[var(--border-light)] py-[var(--section-gap)]">
          <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
            <Eyebrow className="mb-4 block">Keep reading</Eyebrow>
            <h2 className="font-display font-normal text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-[var(--color-text-dark)] mb-10">
              Related field notes.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
