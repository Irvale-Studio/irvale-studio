// Server component: compiles raw MDX strings to React using next-mdx-remote/rsc.
// Plugins:
//   remark-gfm                  — tables, strikethrough, task lists
//   rehype-slug                 — heading IDs
//   rehype-autolink-headings    — wrap heading content in an anchor
//   rehype-pretty-code          — Shiki-powered code blocks (github-dark-dimmed)

import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

import { mdxComponents } from './MDXComponents';

const prettyCodeOptions = {
  theme: 'github-dark-dimmed',
  keepBackground: false,
};

const autolinkOptions = {
  behavior: 'wrap',
  properties: {
    className: ['heading-anchor'],
  },
};

export default function MDXRenderer({ source }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, autolinkOptions],
            [rehypePrettyCode, prettyCodeOptions],
          ],
          format: 'mdx',
        },
      }}
    />
  );
}
