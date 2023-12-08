import path from 'path';
import {
  allValidMDXDirectories,
  MDXDir,
  MDXFile,
  MDXItem,
} from '@/utils/mdx-paths';

import {
  MDXGroupComponents,
  MDXTitleComponent,
} from '@/components/mdx-elements';

import '@/utils/array';

import Link from 'next/link';

// Throw error if a dynamicParam was not found
export const dynamicParams = false;

type MDXMetaItem = {
  mdx: MDXItem;
  path: MDXItem[];
  prev?: MDXItem;
  next?: MDXItem;
};

export const generateStaticParams = async () => {
  const allSlugs = (child: MDXFile | MDXDir) => {
    const slugs: { slug: string[] }[] = [];

    if (child.href) {
      slugs.push({ slug: child.slug });
    }

    if ('items' in child) {
      child.items.forEach((c) => slugs.push(...allSlugs(c)));
    }

    return slugs;
  };

  return allSlugs(await allValidMDXDirectories());
};

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slug = params.slug ?? [];
  const allDirs = await allValidMDXDirectories();
  const meta = retrieveMDXItemMetadata(slug, allDirs);
  if (!meta) throw Error(`mdx file not found for ${path.join(...slug)}`);
  const { mdx: mdxMeta, path: titlesPath, prev, next } = meta;

  const filePath = path.normalize(
    path.join(...slug, 'items' in mdxMeta ? 'index' : '') + '.mdx'
  );

  const Content: (props: any) => JSX.Element = await import(
    `../${filePath}`
  ).then((p) => p.default);

  return (
    <div className="flex w-full flex-col justify-center sm:flex-row">
      {/* Left Sidebar */}
      <div className="w-fill sm:h-content sm:[&:not(:hover)]:invisible-scrollbar flex-shrink-0 flex-grow-0 pl-8 pr-8 sm:sticky sm:right-0 sm:top-[var(--navbar-height)] sm:w-[12rem] sm:self-start sm:overflow-y-scroll sm:pr-0">
        <p className="px-2 py-3 text-sm font-bold">Documentation</p>
        <ul className={`list-none text-sm`}>
          <MDXTitleComponent child={allDirs} selected={slug} />
          <MDXGroupComponents items={allDirs.items} selected={slug} />
        </ul>
      </div>
      {/* Center Items */}
      <div className="max-w-layout flex w-full flex-col">
        {/* Path */}
        <div className="my-2 flex flex-row gap-2 py-1 text-sm">
          <p className="text-neutral-500">Documentation</p>
          {titlesPath.map((o, idx, arr) => (
            <>
              <p className="font-semibold text-neutral-500">/</p>
              <p
                className={
                  idx === arr.length - 1 ? 'text-inherit' : 'text-neutral-500'
                }
              >
                {o.href ? (
                  <Link key={o.title} href={o.href}>
                    {o.title}
                  </Link>
                ) : (
                  o.title
                )}
              </p>
            </>
          ))}
        </div>
        {/* Content */}
        <div className="prose prose-neutral w-full dark:prose-invert">
          <h1>{mdxMeta.title}</h1>
          <Content />
        </div>
        <div className="my-8 h-[1px] w-full bg-neutral-500/20"></div>
        <div className="mb-8 flex w-full flex-row font-medium">
          {prev?.href ? (
            <Link className="flex flex-grow flex-col" href={prev.href}>
              <p className="text-sm text-neutral-500">Previous Page</p>
              <div className="flex flex-row gap-1 text-lg font-extrabold">
                <p>&laquo;</p>
                <p>{prev.title}</p>
              </div>
            </Link>
          ) : (
            <></>
          )}
          {next?.href ? (
            <Link
              className="flex flex-grow flex-col items-end"
              href={next.href}
            >
              <p className="text-sm text-neutral-500">Next Page</p>
              <div className="flex flex-row gap-1 text-lg font-extrabold">
                <p>{next.title}</p>
                <p>&raquo;</p>
              </div>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* Right Sidebar */}
      <div className="hidden w-[12rem] pr-8 lg:block"></div>
    </div>
  );
}

function retrieveMDXItemMetadata(
  slug: string[],
  item: MDXItem,
  slugIndex?: number,
  ref?: MDXMetaItem
): MDXMetaItem | undefined {
  const _ref = ref ?? { mdx: item, path: [] };
  let _slugIndex = slugIndex ?? 0;

  const expectedSubSlug = slug[_slugIndex];
  const actualSubSlug = item.slug[_slugIndex];

  if (!expectedSubSlug && _slugIndex > 0) return undefined;

  if (expectedSubSlug == actualSubSlug) {
    _ref.path.push(item);

    if (_slugIndex + 1 < slug.length) {
      _slugIndex++;
    } else {
      _ref.mdx = item;

      if (!_ref.next && 'items' in item) {
        _ref.next = findNextItemWithLink(item.items);
      }
      return _ref;
    }
  }

  if (item.href) {
    _ref.prev = item;
  }

  if ('items' in item) {
    for (let i = 0; i < item.items.length; i++) {
      const found = retrieveMDXItemMetadata(
        slug,
        item.items[i],
        _slugIndex,
        _ref
      );

      if (found) {
        if (!_ref.next) {
          _ref.next = findNextItemWithLink(item.items.slice(i + 1));
        }

        return found;
      }
    }
  }

  return undefined;
}

const findNextItemWithLink = (items: MDXItem[]): MDXItem | undefined => {
  for (const item of items) {
    const found = findItemWithLink(item);
    if (found) return found;
  }
  return undefined;
};

const findItemWithLink = (item: MDXItem): MDXItem | undefined => {
  if (item.href) {
    return item;
  } else if ('items' in item) {
    for (const c of item.items) {
      const found = findItemWithLink(c);
      if (found) return found;
    }
  }

  return undefined;
};
