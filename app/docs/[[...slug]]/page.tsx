import path from "path";
import {
  MDXItem,
  MDXDir,
  MDXFile,
  allValidMDXDirectories,
} from "@/utils/mdx-paths";
import {
  MDXGroupComponents,
  MDXTitleComponent,
} from "@/components/mdx-elements";
import "@/utils/array";
import styles from "./page.module.css";
import Link from "next/link";

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

    if ("items" in child) {
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
    path.join(...slug, "items" in mdxMeta ? "index" : "") + ".mdx"
  );

  const Content: (props: any) => JSX.Element = await import(
    `../${filePath}`
  ).then((p) => p.default);

  return (
    <div className="flex flex-col">
      {/* Sidebar */}
      <div className="lg:absolute lg:-translate-x-[120%] w-fit lg:min-w-[140px]">
        <ul className={styles["docs-main-group"]}>
          <MDXTitleComponent child={allDirs} selected={slug} />
          <MDXGroupComponents items={allDirs.items} selected={slug} />
        </ul>
      </div>
      {/* Path */}
      <div className="my-2 py-1 flex flex-row gap-2 text-sm">
        <p className="text-neutral-500">Documentation</p>
        {titlesPath.map((o, idx, arr) => (
          <>
            <p className="font-semibold text-neutral-500">&rsaquo;</p>
            <p
              className={
                idx === arr.length - 1 ? "text-inherit" : "text-neutral-500"
              }
            >
              {o.href ? <Link href={o.href}>{o.title}</Link> : o.title}
            </p>
          </>
        ))}
      </div>
      <div className="w-full prose prose-neutral dark:prose-invert">
        <h1>{mdxMeta.title}</h1>
        <Content />
      </div>
      <hr className="opacity-10 my-8" />
      <div className="w-full flex flex-col sm:flex-row font-medium text-neutral-50">
        {prev?.href ? (
          <Link className="flex flex-grow flex-col" href={prev.href}>
            <p className="text-sm">Previous Page</p>
            <div className="flex flex-row gap-1 text-lg font-extrabold">
              <p>&laquo;</p>
              <p>{prev.title}</p>
            </div>
          </Link>
        ) : (
          <></>
        )}
        {next?.href ? (
          <Link className="flex flex-grow flex-col items-end" href={next.href}>
            <p className="text-sm">Next Page</p>
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

      if (!_ref.next) {
        _ref.next = findNextItemWithLink(item);
      }
      return _ref;
    }
  }

  if (item.href) {
    _ref.prev = item;
  }

  if ("items" in item) {
    for (let i = 0; i < item.items.length; i++) {
      const found = retrieveMDXItemMetadata(
        slug,
        item.items[i],
        _slugIndex,
        _ref
      );
      if (found) {
        if (!_ref.next) {
          _ref.next = item.items.find((c, idx) => idx > i && c.href);
        }
        return found;
      }
    }
  }

  return undefined;
}

const findNextItemWithLink = (item: MDXItem): MDXItem | undefined => {
  if ("items" in item) {
    for (const c of item.items) {
      if (c.href) {
        return c;
      } else {
        const nested = findNextItemWithLink(c);
        if (nested) {
          return nested;
        }
      }
    }
  }

  return undefined;
};
