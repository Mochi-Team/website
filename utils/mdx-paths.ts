import { readFile, readdir } from 'fs/promises';
import path, { join } from 'path';
import capitalize from 'title';

type MDXMetadata = {
  [fileName in string]: string;
};

export type MDXItem = MDXFile | MDXDir;

export type MDXFile = {
  slug: string[];
  title: string;
  href: string;
};

export type MDXDir = {
  slug: string[];
  title: string;
  href?: string;
  items: MDXItem[];
};

export const allValidMDXDirectories = async (): Promise<MDXDir> => {
  const parentDir = path.join(process.cwd(), 'app/docs');

  const recursiveDir = async (
    prevDir: string,
    dir: string
  ): Promise<MDXDir> => {
    let meta: MDXMetadata | undefined = await readFile(
      path.join(dir, '_meta.json'),
      { encoding: 'utf8' }
    )
      .then((o) => JSON.parse(o))
      .catch((_) => undefined);

    const value: MDXDir = {
      slug: path
        .relative(parentDir, dir)
        .split('/')
        .filter((o) => o.length > 0),
      title: capitalize(path.relative(prevDir, dir).replaceAll('-', ' ')),
      items: [],
    };

    const dirs = await readdir(dir, { withFileTypes: true });

    for (const n of dirs) {
      const somePath = path.join(n.path, n.name);
      if (somePath.includes('...slug')) {
        continue;
      }

      const slug = n.name.replace('.mdx', '');
      let title = meta?.[slug];

      if (!title || title.length == 0) {
        title = capitalize(slug.replaceAll('-', ' '));
      }

      if (n.name === 'index.mdx') {
        value.title = title;
        value.href = path.resolve('/docs', value.slug.join('/'));
      } else if (n.name.includes('.mdx')) {
        value.items.push({
          slug: value.slug.concat(slug),
          title: title,
          href: path.resolve('/docs', value.slug.join('/'), slug),
        });
      } else if (n.isDirectory()) {
        const docDir = await recursiveDir(dir, somePath);
        docDir.title = title;
        value.items.push(docDir);
      }
    }

    if (meta) {
      const keys = Object.keys(meta);
      value.items.sort((a, b) => {
        // Get indexes from meta, if available
        const aSlug = a.slug[a.slug.length - 1];
        const bSlug = b.slug[a.slug.length - 1];

        const aMetaIndex = keys.indexOf(aSlug);
        const bMetaIndex = keys.indexOf(bSlug);

        if (aMetaIndex !== -1 && bMetaIndex !== -1) {
          return aMetaIndex - bMetaIndex;
        } else if (aMetaIndex !== -1) {
          // a is defined, so prioritize a
          return -1;
        } else if (bMetaIndex !== -1) {
          // b is defined, so prioritize b
          return 1;
        } else {
          // Both are undefines, sort based on alphabetical order
          return aSlug < bSlug ? -1 : aSlug > bSlug ? 1 : 0;
        }
      });
    } else {
      // Sort by title
      value.items.sort((a, b) =>
        a.title < b.title ? -1 : a.title > b.title ? 1 : 0
      );
    }

    return value;
  };

  return await recursiveDir(parentDir, parentDir);
};
