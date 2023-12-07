import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import createMDX from '@next/mdx'
import { h } from 'hastscript'
/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug,
            [rehypeAutolinkHeadings, {
                behavior: 'prepend',
                headingProperties: { class: "group" },
                properties: { ariaHidden: true, tabIndex: -1, class: 'no-underline not-prose text-sm font-semibold' },
                content: [h("span.invisible.group-hover:visible.absolute.-translate-x-full.not-prose.pr-2", "#")]
            }]
        ]
    }
});

export default withMDX(nextConfig);
