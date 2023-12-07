'use client';

import styles from './mdx.module.css';
import { MDXItem, MDXDir, MDXFile } from '@/utils/mdx-paths';
import Link from 'next/link';
import '../utils/array';
import { MouseEvent, MouseEventHandler, useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi';

const MDXGroup = ({
  child,
  selected,
}: {
  child: MDXDir;
  selected: string[];
}) => {
  const [isExpanded, setExpanded] = useState(
    child.slug.every((item) => selected.includes(item))
  );

  return (
    <MDXTitleComponent
      child={child}
      expanded={isExpanded}
      tapped={() => setExpanded(!isExpanded)}
      selected={selected}
    >
      <ul className={`${styles['docs-group']} ${isExpanded ? '' : 'hidden'}`}>
        <MDXGroupComponents items={child.items} selected={selected} />
      </ul>
    </MDXTitleComponent>
  );
};

export const MDXGroupComponents = ({
  items,
  selected,
}: {
  items: (MDXDir | MDXFile)[];
  selected: string[];
}) => {
  return items.map((c) =>
    'items' in c ? (
      <MDXGroup key={c.title} child={c} selected={selected} />
    ) : (
      <MDXTitleComponent key={c.title} child={c} selected={selected} />
    )
  );
};

export const MDXTitleComponent = ({
  child,
  children,
  expanded,
  selected,
  tapped,
}: {
  child: MDXItem;
  children?: JSX.Element;
  expanded?: boolean;
  selected: string[];
  tapped?: () => void;
}) => {
  const titleDiv = () => {
    return (
      <div
        onClick={(e) => {
          if (!child.href && children) {
            e.stopPropagation();
            e.preventDefault();
            tapped?.();
          }
        }}
        className="flex flex-row items-center gap-2"
      >
        {child.title}
        <div className="flex-grow"></div>
        {children ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              tapped?.();
            }}
          >
            <div className="p-1">
              {expanded ? <HiOutlineChevronDown /> : <HiOutlineChevronRight />}
            </div>
          </button>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <li key={child.title}>
      <div
        className={`${styles['docs-title']} ${
          selected.isEqual(child.slug) ? styles['docs-title-sel'] : ''
        }`}
      >
        {child.href ? (
          <Link key={child.title} href={child.href}>
            {titleDiv()}
          </Link>
        ) : (
          titleDiv()
        )}
      </div>
      {children ? children : <></>}
    </li>
  );
};
