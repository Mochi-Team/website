"use client";

import styles from "./header.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useContext } from "react";
import MochiLogo from "../public/mochi-logo.png";
import { BodyContext } from "./body";

export function Header() {
  const pathname = usePathname() || "/";

  const { isShowingNav: isShowing, setShowingNav: setShowing } =
    useContext(BodyContext) ?? {};

  type Tab = {
    title: string;
    href: string;
    isSelected: (link: string) => boolean;
  };

  const tabs: Tab[] = [
    {
      title: "Home",
      href: "/",
      isSelected: (v) => v == "/",
    },
    {
      title: "Docs",
      href: "/docs",
      isSelected: (v) => /\/\bdocs\b\/?/.test(v),
    },
  ];

  return (
    <header className="z-50">
      <nav className="flex flex-row relative z-20">
        <a
          href="/"
          className="flex gap-3 font-bold text-lg shrink items-center"
        >
          <Image width={28} src={MochiLogo} alt={"mochi logo"} />
          Mochi
        </a>

        <div className="flex text-sm font-medium flex-shrink ml-auto self-center space-x-2 foreground-colo">
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              className={`hidden sm:block self-center hover:bg-neutral-500/25 rounded-lg transition-colors px-2 py-1 ${
                tab.isSelected(pathname) ? "" : "text-neutral-500"
              }`}
              href={tab.href}
            >
              {tab.title}
            </Link>
          ))}

          <button
            onClick={() => setShowing?.(!isShowing)}
            className="sm:hidden ml-auto text-xl p-1 rounded-md transition ease-in-out duration-200 hover:bg-neutral-500/20"
          >
            {isShowing ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <div
        className={`${isShowing ? styles.showNav : styles.hideNav} ${
          styles.nav
        } absolute z-10 left-0 w-full sm:hidden mt-8 gap-2 p-8 bg-initial-color text-neutral-400 border-t-[0.12rem] border-neutral-500/20`}
      >
        {tabs.map((tab) => (
          <Link
            onClick={() => setShowing?.(!isShowing)}
            key={tab.title}
            className={`${
              tab.isSelected(pathname)
                ? "bg-neutral-500/20 foreground-color"
                : ""
            } hover:text-neutral-600 font-medium px-4 p-3 rounded-lg`}
            href={tab.href}
          >
            {tab.title}
          </Link>
        ))}
      </div>
    </header>
  );
}
