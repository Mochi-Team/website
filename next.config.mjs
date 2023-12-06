import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    compiler: {
        removeConsole: false
    }
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkGfm],
    }
});

export default withMDX(nextConfig);
