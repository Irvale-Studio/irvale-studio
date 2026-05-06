import { notFound } from 'next/navigation';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts, getAllCategories } from '@/lib/content/blog';
import { absUrl } from '@/lib/seo/site';

// TODO: wire JSON-LD when src/lib/seo/jsonld.js lands (CollectionPage)

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const human = humanLabel(category);
  return {
    title: `${human} — Field Notebook · Irvale Studio`,
    description: `Field notes from Irvale Studio in the ${human} category. Tactical, sourced writing for UK SMBs.`,
    alternates: { canonical: absUrl(`/blog/category/${category}`) },
  };
}

function humanLabel(s) {
  return (s || '')
    .split('-')
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(' ');
}

export default async function BlogCategoryPage({ params }) {
  const { category } = await params;
  const posts = getAllPosts({ category });
  if (!posts.length) notFound();

  return (
    <main>
      <section className="relative bg-dark pt-32 pb-[calc(var(--section-gap)/2)] noise-overlay overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%)]" />
        <div className="relative mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <Eyebrow className="mb-4 block">Category</Eyebrow>
          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] mb-4">
            {humanLabel(category)}
          </h1>
          <Link href="/blog" className="font-body text-[length:var(--type-body-sm)] text-gold/80 hover:text-gold">
            ← All field notes
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
        </div>
      </section>
    </main>
  );
}
