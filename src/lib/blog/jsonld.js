// Schema spec version: 2026-05-06

import { SITE_URL, absUrl } from '@/lib/seo/site';
import { speakableSelector } from '@/lib/seo/jsonld';

export function blogPostingJsonLd(post, author) {
  const node = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absUrl(`/blog/${post.slug}`)}#article`,
    mainEntityOfPage: { '@id': absUrl(`/blog/${post.slug}`) },
    headline: post.title,
    description: post.description,
    image: [
      {
        '@type': 'ImageObject',
        url: absUrl(`/images/blog/${post.slug}/hero.jpg`),
        width: 1600,
        height: 900,
        caption: post.hero?.alt,
        creditText: post.hero?.credit?.photographer,
        license: 'https://unsplash.com/license',
      },
    ],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      '@id': `${absUrl(`/about/${author.slug}`)}#person`,
    },
    publisher: { '@id': `${SITE_URL}#organization` },
    articleSection: post.category,
    keywords: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags,
    wordCount: post.wordCount,
    inLanguage: 'en-GB',
  };

  if (post.schema?.speakable) {
    Object.assign(node, speakableSelector());
  }

  return node;
}

export function personJsonLd(author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${absUrl(`/about/${author.slug}`)}#person`,
    name: author.name,
    givenName: author.givenName,
    familyName: author.familyName,
    url: absUrl(`/about/${author.slug}`),
    image: absUrl(author.avatar),
    jobTitle: author.role,
    worksFor: { '@id': `${SITE_URL}#organization` },
    sameAs: author.sameAs,
    knowsAbout: author.knowsAbout,
    alumniOf: author.alumniOf || undefined,
    hasCredential: (author.credentials || []).map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: c.category,
      name: c.name,
      recognizedBy: c.body
        ? { '@type': 'Organization', name: c.body }
        : undefined,
    })),
  };
}

export function profilePageJsonLd(author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absUrl(`/about/${author.slug}`),
    mainEntity: personJsonLd(author),
  };
}
