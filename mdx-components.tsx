import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => {
    //   return titleProperties("text-3xl", "font-bold", children)
    // },
    ...components,
  };
}

const titleProperties = (size: string, style: string, children: any) => {
  return <div className={`flex flex-row items-center ${size} ${style} pb-4`}>
    <a href="#lol" className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity absolute -translate-x-[150%] text-neutral-400 text-xl">
      #
    </a>
    <p>{children}</p>
  </div>;
};
