"use client";

import styles from "./mdx.module.css";
import { DocChild, DocDir, DocFile } from "@/utils/docs-paths";
import Link from "next/link";
import "../utils/array";
import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

const MDXGroup = ({
  child,
  selected,
}: {
  child: DocDir;
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
      <ul className={`${styles["docs-group"]} ${isExpanded ? "" : "hidden"}`}>
        <MDXGroupComponents children={child.children} selected={selected} />
      </ul>
    </MDXTitleComponent>
  );
};

export const MDXGroupComponents = ({
  children,
  selected,
}: {
  children: (DocDir | DocFile)[];
  selected: string[];
}) => {
  return children.map((c) =>
    "children" in c ? (
      <MDXGroup child={c} selected={selected} />
    ) : (
      <MDXTitleComponent child={c} selected={selected} />
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
  child: DocChild;
  children?: JSX.Element;
  expanded?: boolean;
  selected: string[];
  tapped?: () => void;
}) => {
  const titleDiv = () => {
    return (
      <div className="flex flex-row gap-2 items-center">
        {child.title}
        <div className="flex-grow"></div>
        {children !== undefined ? (
          <button onClick={tapped}>
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
        className={`${styles["docs-title"]} ${
          selected.isEqual(child.slug) ? styles["docs-title-sel"] : ""
        }`}
      >
        {child.href ? <Link href={child.href}>{titleDiv()}</Link> : titleDiv()}
      </div>
      {children ? children : <></>}
    </li>
  );
};
