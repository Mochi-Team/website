import createMDX from '@next/mdx';
import { h } from 'hastscript';

import remarkGfm from 'remark-gfm';
import {
  remarkDefinitionList,
  defListHastHandlers,
} from 'remark-definition-list';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkDefinitionList],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          headingProperties: { class: 'group' },
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            class: 'no-underline not-prose px-2',
          },
          content: [
            h(
              'span.opacity-0.group-hover:opacity-100.not-prose.text-neutral-500 transition-all',
              '#'
            ),
          ],
        },
      ],
      rehypePrismPlus,
    ],
    remarkRehypeOptions: {
      handlers: {
        ...defListHastHandlers,
      },
    },
  },
});

export default withMDX(nextConfig);
