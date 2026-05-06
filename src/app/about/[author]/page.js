import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import Eyebrow from '@/components/ui/Eyebrow';
import PostCard from '@/components/blog/PostCard';
import JsonLd from '@/components/seo/JsonLd';
import { getAllPosts, getAuthor } from '@/lib/content/blog';
import { absUrl } from '@/lib/seo/site';
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from '@/lib/seo/jsonld';
import {
  profilePageJsonLd,
  personJsonLd,
} from '@/lib/blog/jsonld';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'authors');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => ({ author: path.basename(f, '.json') }));
}

function firstSentence(text = '') {
  const m = String(text).match(/^[^.!?]*[.!?]/);
  return (m ? m[0] : String(text)).trim();
}

export async function generateMetadata({ params }) {
  const { author: slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  const desc = firstSentence(author.bio);
  return {
    title: `${author.name} — ${author.role} · Irvale Studio`,
    description: desc,
    alternates: { canonical: absUrl(`/about/${slug}`) },
    openGraph: {
      title: `${author.name} — ${author.role}`,
      description: desc,
      url: absUrl(`/about/${slug}`),
      type: 'profile',
      images: author.avatar ? [{ url: absUrl(author.avatar), alt: author.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} — ${author.role}`,
      description: desc,
    },
  };
}

export default async function AuthorPage({ params }) {
  const { author: slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const posts = getAllPosts({ author: slug });

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'About', url: `/about/${slug}` },
    { name: author.name, url: `/about/${slug}` },
  ];

  const collection = collectionPageJsonLd({
    name: `${author.name} — Field notes`,
    description: `Field notes authored by ${author.name} on Irvale Studio.`,
    url: `/about/${slug}`,
    items: posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` })),
  });

  const ldData = [
    breadcrumbJsonLd(crumbs),
    profilePageJsonLd(author),
    personJsonLd(author),
    collection,
  ];

  return (
    <main className="bg-[var(--color-cream)]">
      <JsonLd data={ldData} />

      {/* Dark hero */}
      <header className="bg-dark pt-32 pb-16 md:pb-24 noise-overlay relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%)]" />
        <div className="relative mx-auto px-[var(--gutter)] flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-14" style={{ maxWidth: 'var(--max-width)' }}>
          {author.avatar ? (
            <div className="flex-none rounded-full overflow-hidden border border-gold/30 bg-[var(--color-dark-2)]" style={{ width: 240, height: 240 }}>
              <Image
                src={author.avatar}
                alt={`${author.name}, ${author.role}`}
                width={240}
                height={240}
                quality={85}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex-none rounded-full bg-gold/15 border border-gold/30" style={{ width: 240, height: 240 }} aria-hidden="true" />
          )}

          <div className="max-w-[60ch]">
            <Eyebrow className="mb-4 block">Author</Eyebrow>
            <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] mb-4">
              {author.name}
            </h1>
            <div className="font-body text-[length:var(--type-label)] tracking-[var(--type-label-ls)] uppercase text-gold mb-6">
              {author.role}
            </div>
            <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light">
              {author.bio}
            </p>
          </div>
        </div>
      </header>

      {/* Recent field notes */}
      {posts.length > 0 ? (
        <section className="py-[var(--section-gap)]">
          <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
            <Eyebrow className="mb-4 block">Recent field notes</Eyebrow>
            <h2 className="font-display font-normal text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-[var(--color-text-dark)] mb-10">
              Writing by {author.givenName || author.name}.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Knows about */}
      {Array.isArray(author.knowsAbout) && author.knowsAbout.length > 0 ? (
        <section className="bg-[var(--color-cream-2)]/60 border-t border-[var(--border-light)] py-[var(--section-gap)]">
          <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
            <Eyebrow className="mb-4 block">Knows about</Eyebrow>
            <h2 className="font-display font-normal text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-[var(--color-text-dark)] mb-8">
              Topic areas.
            </h2>
            <ul className="flex flex-wrap gap-2">
              {author.knowsAbout.map((topic) => (
                <li
                  key={topic}
                  className="font-body text-[length:var(--type-body-sm)] border border-[var(--border-light)] px-3 py-1.5 rounded-full text-[var(--color-text-dark)]"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Connect */}
      {Array.isArray(author.sameAs) && author.sameAs.length > 0 ? (
        <section className="py-[var(--section-gap)] border-t border-[var(--border-light)]">
          <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
            <Eyebrow className="mb-4 block">Connect</Eyebrow>
            <h2 className="font-display font-normal text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-[var(--color-text-dark)] mb-8">
              Find {author.givenName || author.name} elsewhere.
            </h2>
            <ul className="flex flex-col gap-2">
              {author.sameAs.map((href) => {
                let label = href;
                try {
                  const u = new URL(href);
                  label = u.hostname.replace(/^www\./, '') + u.pathname.replace(/\/$/, '');
                } catch {
                  // leave as is
                }
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="font-body text-[length:var(--type-body)] text-[var(--color-text-dark)] underline decoration-[var(--color-gold)]/50 underline-offset-4 hover:decoration-[var(--color-gold)] transition"
                    >
                      {label}
                      <span aria-hidden="true" className="inline-block ml-1 text-[0.85em] text-[var(--color-gold-muted)]">↗</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
