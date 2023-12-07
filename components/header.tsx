'use client';

import styles from './header.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useContext } from 'react';
import MochiLogo from '../public/mochi-logo.png';
import { BodyContext } from './body';

export function Header() {
  const pathname = usePathname() || '/';

  const { isShowingNav: isShowing, setShowingNav: setShowing } =
    useContext(BodyContext) ?? {};

  type Tab = {
    title: string;
    href: string;
    isSelected: (link: string) => boolean;
  };

  const tabs: Tab[] = [
    {
      title: 'Home',
      href: '/',
      isSelected: (v) => v == '/',
    },
    {
      title: 'Docs',
      href: '/docs',
      isSelected: (v) => /\/\bdocs\b\/?/.test(v),
    },
  ];

  return (
    <header className="z-50">
      <nav className="relative z-20 flex flex-row p-8 backdrop-blur-lg">
        <a
          href="/"
          className="flex shrink items-center gap-3 text-lg font-bold"
        >
          <Image width={28} src={MochiLogo} alt={'mochi logo'} />
          Mochi
        </a>

        <div className="foreground-colo ml-auto flex flex-shrink space-x-2 self-center text-sm font-medium">
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              className={`hidden self-center rounded-lg px-2 py-1 transition-colors hover:bg-neutral-500/25 sm:block ${
                tab.isSelected(pathname) ? '' : 'text-neutral-500'
              }`}
              href={tab.href}
            >
              {tab.title}
            </Link>
          ))}

          <button
            onClick={() => setShowing?.(!isShowing)}
            className="ml-auto rounded-md p-1 text-xl transition duration-200 ease-in-out hover:bg-neutral-500/20 sm:hidden"
          >
            {isShowing ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <div
        className={`${isShowing ? styles.showNav : styles.hideNav} ${
          styles.nav
        } bg-initial-color absolute left-0 z-10 w-full gap-2 border-t-[0.12rem] border-neutral-500/20 p-8 text-neutral-400 sm:hidden`}
      >
        {tabs.map((tab) => (
          <Link
            onClick={() => setShowing?.(!isShowing)}
            key={tab.title}
            className={`${
              tab.isSelected(pathname)
                ? 'foreground-color bg-neutral-500/20'
                : ''
            } rounded-lg p-3 px-4 font-medium hover:text-neutral-600`}
            href={tab.href}
          >
            {tab.title}
          </Link>
        ))}
      </div>
    </header>
  );
}
