import { notFound } from 'next/navigation';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts } from '@/lib/content/blog';
import { absUrl } from '@/lib/seo/site';

// TODO: wire JSON-LD when src/lib/seo/jsonld.js lands (CollectionPage)

export const revalidate = 3600;
export const dynamicParams = false;

const PAGE_SIZE = 20;

function totalPages() {
  return Math.max(1, Math.ceil(getAllPosts().length / PAGE_SIZE));
}

export function generateStaticParams() {
  const pages = totalPages();
  // Page 1 lives at /blog; only generate /blog/page/2..N
  const params = [];
  for (let i = 2; i <= pages; i++) params.push({ page: String(i) });
  return params;
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  return {
    title: `Field Notebook — Page ${page} · Irvale Studio`,
    description: 'Field notes from Irvale Studio on local SEO, AI search, and conversion engineering.',
    alternates: { canonical: absUrl(`/blog/page/${page}`) },
  };
}

export default async function BlogPaginatedPage({ params }) {
  const { page } = await params;
  const pageNum = Number.parseInt(page, 10);
  if (!Number.isFinite(pageNum) || pageNum < 2) notFound();
  const totals = totalPages();
  if (pageNum > totals) notFound();

  const offset = (pageNum - 1) * PAGE_SIZE;
  const posts = getAllPosts({ offset, limit: PAGE_SIZE });

  const prev = pageNum === 2 ? '/blog' : `/blog/page/${pageNum - 1}`;
  const next = pageNum < totals ? `/blog/page/${pageNum + 1}` : null;

  return (
    <main>
      <section className="relative bg-dark pt-32 pb-[calc(var(--section-gap)/2)] noise-overlay overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%)]" />
        <div className="relative mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <Eyebrow className="mb-4 block">The Field Notebook</Eyebrow>
          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] mb-4">
            Page {pageNum}
          </h1>
          <Link href="/blog" className="font-body text-[length:var(--type-body-sm)] text-gold/80 hover:text-gold">
            ← Back to first page
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>

          <div className="mt-16 flex items-center justify-between gap-3">
            <Link
              href={prev}
              className="font-body text-[length:var(--type-body-sm)] border border-[var(--border-light)] hover:border-[var(--color-gold)]/60 px-4 py-2 rounded-full"
            >
              ← Newer
            </Link>
            {next ? (
              <Link
                href={next}
                className="font-body text-[length:var(--type-body-sm)] border border-[var(--border-light)] hover:border-[var(--color-gold)]/60 px-4 py-2 rounded-full"
              >
                Older →
              </Link>
            ) : <span />}
          </div>
        </div>
      </section>
    </main>
  );
}
