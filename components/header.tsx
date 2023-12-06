"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import MochiLogo from "../public/mochi-logo.png";

export function Header() {
  const pathname = usePathname() || "/";
  const [showingMenu, setShowingMenu] = useState(false);
  const [firstInstance, setInitialInstance] = useState(true);

  const eventHandler = () => {
    setInitialInstance(false);
    setShowingMenu(!showingMenu);
  };

  type Tab = {
    title: string,
    href: string,
    isSelected: (link: string) => boolean
  }

  const tabs: Tab[] = [
    { 
      title: "Home", 
      href: "/",
      isSelected: (v) => v == "/"
    },
    { 
      title: "Docs", 
      href: "/docs",
      isSelected: (v) => /\/\bdocs\b\/?/.test(v)
    },
  ];

  return (
    <header className="z-50">
      <nav className="flex flex-row">
        <a
          href="/"
          className="flex gap-3 font-bold text-lg shrink items-center"
        >
          <Image width={28} src={MochiLogo} alt={"mochi logo"} />
          Mochi
        </a>

        <div className="flex flex-col ml-auto sm:hidden">
          <button
            onClick={eventHandler}
            className="ml-auto text-xl p-1 rounded-md transition ease-in-out duration-200 hover:bg-neutral-500/20"
          >
            {showingMenu ? <FiX /> : <FiMenu />}
          </button>

          <div
            className={`${
              firstInstance
                ? "hidden"
                : showingMenu
                ? "header-menu-reveal"
                : "header-menu-dismiss"
            } absolute top-[92px] left-0 w-full h-full`}
          >
            <div className="header-reveal flex flex-col gap-2 p-8 bg-initial-color text-neutral-400 border-t-[0.12rem] border-neutral-500/20 h-full">
              {tabs.map((tab) => (
                <Link
                  onClick={eventHandler}
                  key={tab.title}
                  className={`${
                    tab.isSelected(pathname) ? "bg-neutral-500/20 foreground-color" : ""
                  } hover:text-neutral-600 font-medium px-4 p-3 rounded-lg`}
                  href={tab.href}
                >
                  {tab.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden sm:flex text-sm font-medium flex-shrink ml-auto self-center space-x-4 foreground-color">
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              className={tab.isSelected(pathname) ? "" : "text-neutral-500"}
              href={tab.href}
            >
              {tab.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
