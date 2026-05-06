import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts, getAllCategories } from '@/lib/content/blog';
import { absUrl } from '@/lib/seo/site';

// TODO: wire JSON-LD when src/lib/seo/jsonld.js lands

export const revalidate = 3600;

const PAGE_SIZE = 20;

export const metadata = {
  title: 'The Field Notebook — Irvale Studio',
  description:
    'Field notes from Irvale Studio on local SEO, AI search, conversion engineering, and the practical end of running a UK SMB website.',
  alternates: { canonical: absUrl('/blog') },
  openGraph: {
    title: 'The Field Notebook — Irvale Studio',
    description:
      'Field notes from Irvale Studio on local SEO, AI search, conversion engineering, and the practical end of running a UK SMB website.',
    url: absUrl('/blog'),
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default async function BlogIndexPage() {
  const allPosts = getAllPosts();
  const featured = allPosts.find((p) => p.featured) || allPosts[0] || null;
  const rest = allPosts.filter((p) => !featured || p.slug !== featured.slug).slice(0, PAGE_SIZE);
  const categories = getAllCategories();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden noise-overlay">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(201,169,110,0.10),transparent_60%)]" />
        <div className="relative mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <Eyebrow className="mb-6 block">The Field Notebook</Eyebrow>
          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6">
            Field notes from a working studio.
          </h1>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-2xl">
            Tactical writing on local SEO, AI search, conversion engineering, and the parts of running a UK SMB website that agencies tend to skip. Researched, sourced, and dated.
          </p>
        </div>
      </section>

      {/* Featured + categories */}
      <section className="bg-[var(--color-cream)] py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          {featured ? (
            <div className="mb-16 md:mb-20">
              <Eyebrow className="mb-6 block">Featured</Eyebrow>
              <PostCard post={featured} featured />
            </div>
          ) : null}

          {categories.length > 0 ? (
            <div className="mb-12 flex flex-wrap items-center gap-2">
              <span className="font-body text-[length:var(--type-label)] tracking-[var(--type-label-ls)] uppercase text-[var(--color-gold-muted)] mr-2">
                Filter by topic
              </span>
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/blog/category/${c}`}
                  className="font-body text-[length:var(--type-body-sm)] border border-[var(--border-light)] hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold-muted)] px-3 py-1.5 rounded-full transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="mt-16 flex items-center justify-center gap-3">
              <Link
                href="/blog/page/2"
                className="font-body text-[length:var(--type-body-sm)] border border-[var(--border-light)] hover:border-[var(--color-gold)]/60 px-4 py-2 rounded-full"
              >
                Older posts →
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
