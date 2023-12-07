import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import createMDX from '@next/mdx';
import { h } from 'hastscript';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          headingProperties: { class: 'group flex gap-2' },
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            class: 'no-underline not-prose',
          },
          content: [
            h(
              'span.invisible.group-hover:visible.not-prose.text-neutral-300/50',
              '#'
            ),
          ],
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
