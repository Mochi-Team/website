import path from "path";
import {
  DocChild,
  DocDir,
  DocFile,
  allValidDocsDirectories,
} from "@/utils/docs-paths";
import {
  MDXGroupComponents,
  MDXTitleComponent,
} from "@/components/mdx-components";
import "@/utils/array";
import styles from "./page.module.css";
import title from "title";
import Link from "next/link";

// Throw error if a dynamicParam was not found
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const allSlugs = (child: DocFile | DocDir) => {
    const slugs: { slug: string[] }[] = [];

    if (child.href) {
      slugs.push({ slug: child.slug });
    }

    if ("children" in child) {
      child.children.forEach((c) => slugs.push(...allSlugs(c)));
    }

    return slugs;
  };

  return allSlugs(await allValidDocsDirectories());
};

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slug = params.slug ?? [];
  const allDirs = await allValidDocsDirectories();
  const { mdx: mdxMeta, prev, next } = getMetaFromSlug(slug, allDirs);

  if (!mdxMeta) throw Error(`mdx file not found for ${slug.join("")}`);

  const filePath = path.normalize(
    path.join(...slug, "children" in mdxMeta ? "index" : "") + ".mdx"
  );

  const Content: (props: any) => JSX.Element = await import(
    `../${filePath}`
  ).then((p) => p.default);

  const titlesPath = retrieveTitlesForSlug(slug, allDirs);

  return (
    <div className="flex flex-col">
      {/* Sidebar */}
      <div className="lg:absolute lg:-translate-x-[120%] w-fit lg:min-w-[140px]">
        <ul className={styles["docs-main-group"]}>
          <MDXTitleComponent child={allDirs} selected={slug} />
          <MDXGroupComponents children={allDirs.children} selected={slug} />
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
              {o}
            </p>
          </>
        ))}
      </div>
      <div>
        <p className="text-4xl font-bold pb-6">{mdxMeta.title}</p>
        <Content />
        {/* Pages */}
        <div className="flex w-full pt-10 pb-2 text-lg font-medium">
          {prev?.href ? (
            <Link href={prev.href}>
              {"<"} {prev.title}
            </Link>
          ) : (
            <></>
          )}
          <p className="flex-grow"></p>
          {next?.href ? (
            <Link href={next.href}>
              {next.title} {">"}
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

const getMetaFromSlug = (
  slug: string[],
  child: DocDir | DocFile,
  prev: { value?: DocChild } = {},
  next: { value?: DocChild } = {}
): { mdx?: DocChild; prev?: DocChild; next?: DocChild } => {
  if (slug.isEqual(child.slug)) {
    // if (!next.value && "children" in child) {
    //   next.value = child.children.find(c => c.href !== undefined && !c.slug.isEqual(child.slug));
    // }
    return { mdx: child, prev: prev.value, next: next.value };
  } else if ("children" in child) {
    if (child.href) prev.value = child;
    // next.value = child.children.find((v) =>  v.href != undefined && !v.slug.isEqual(child.slug));
    for (let i = 0; i < child.children.length; i++) {
      const c = child.children[i];
      // next.value = child.children.find((v, idx) =>  i < idx && v.href != undefined);
      const nested = getMetaFromSlug(slug, c, prev, next);

      if (nested.mdx) {
        return nested;
      } else if (!("children" in c) && c.href) {
        prev.value = c;
      }
    }
  }

  return {};
};

const retrieveTitlesForSlug = (
  slug: string[],
  child: DocDir | DocFile,
  slugIndex: number | undefined = undefined
): string[] => {
  const titles: string[] = [];
  slugIndex = slugIndex ?? 0;

  if (child.slug.isEqual(slug)) {
    titles.push(child.title);
  } else {
    const expectedSubSlug = slug[slugIndex];
    const actualSubSlug = child.slug[slugIndex];

    if (!expectedSubSlug) return titles;

    if (expectedSubSlug === actualSubSlug) {
      titles.push(child.title);
      slugIndex++;
      titles.push(...retrieveTitlesForSlug(slug, child, slugIndex));
    } else if (!actualSubSlug) {
      if ("children" in child) {
        for (let i = 0; i < child.children.length; i++) {
          titles.push(
            ...retrieveTitlesForSlug(slug, child.children[i], slugIndex)
          );
        }
      }
    }
  }

  return titles;
};
