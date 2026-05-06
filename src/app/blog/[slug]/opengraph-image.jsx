// src/app/blog/[slug]/opengraph-image.jsx
//
// Per-post dynamic Open Graph card (1200×630).
// Spec: docs/seo-research/image-pipeline.md §7
//
// Fonts (TTF) are stored in ./_fonts/. They were sourced from Google Fonts:
//   - Cormorant Garamond SemiBold (600)
//     https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_iE9GnM.ttf
//   - Raleway Regular (400)
//     https://fonts.gstatic.com/s/raleway/v37/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCP.ttf
// (Resolved by curl-ing the css2 endpoint with a real UA.)

import { ImageResponse } from 'next/og';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export const alt = 'Irvale Studio article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GOLD = '#C9A96E';
const CREAM = '#f4f1ea';
const BG = '#0b0b0b';

async function loadPostTitle(slug) {
  // Prefer the loader from src/lib/content/blog.js if it exists at runtime
  // (built by another agent in parallel). Fall back to direct MDX read.
  try {
    // Dynamic import so the route compiles even when the loader isn't there yet.
    const mod = await import('@/lib/content/blog.js').catch(() => null);
    if (mod) {
      const fn = mod.getPost || mod.getPostBySlug || mod.default;
      if (typeof fn === 'function') {
        const post = await fn(slug);
        if (post?.title) return post.title;
        if (post?.frontmatter?.title) return post.frontmatter.title;
        if (post?.data?.title) return post.data.title;
      }
    }
  } catch {
    // fall through
  }

  // Direct read from content/blog/<slug>.mdx
  try {
    const file = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
    const raw = await fs.readFile(file, 'utf8');
    const { data } = matter(raw);
    return data?.ogTitle || data?.title || 'Irvale Studio';
  } catch {
    return 'Irvale Studio';
  }
}

export default async function OG({ params }) {
  const { slug } = await params;

  const [title, cormorantBuf, ralewayBuf] = await Promise.all([
    loadPostTitle(slug),
    fs.readFile(path.join(process.cwd(), 'src/app/blog/[slug]/_fonts/CormorantGaramond-SemiBold.ttf')),
    fs.readFile(path.join(process.cwd(), 'src/app/blog/[slug]/_fonts/Raleway-Regular.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          background: BG,
          color: CREAM,
          padding: '72px 80px',
          justifyContent: 'space-between',
          fontFamily: 'Raleway',
        }}
      >
        {/* Top row: brand wordmark */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: GOLD,
            fontFamily: 'Raleway',
          }}
        >
          Irvale
        </div>

        {/* Center: gold rule + title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            maxWidth: 1040,
          }}
        >
          <div
            style={{
              width: 96,
              height: 1,
              background: GOLD,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              fontFamily: 'Cormorant',
              fontSize: 84,
              lineHeight: 1.05,
              color: CREAM,
              letterSpacing: -0.5,
              display: 'flex',
              // soft 4-line cap; ImageResponse uses Yoga, so we let flex wrap and
              // rely on the natural line-height + font-size combo to stay in frame
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom-right: site / section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: 22,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: CREAM,
            opacity: 0.7,
            fontFamily: 'Raleway',
          }}
        >
          irvale.com / journal
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant', data: cormorantBuf, weight: 600, style: 'normal' },
        { name: 'Raleway', data: ralewayBuf, weight: 400, style: 'normal' },
      ],
    }
  );
}
