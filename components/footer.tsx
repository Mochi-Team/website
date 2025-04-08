import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { HiOutlineExternalLink } from 'react-icons/hi';

export function Footer() {
  return (
    <footer className="max-w-center-layout mt-auto w-full flex-initial px-8 pb-8 text-xs">
      <div className="flex flex-col items-center gap-4 border-t border-neutral-500/20 pt-8 text-center font-semibold text-neutral-400 md:flex-row">
        <p className="flex flex-wrap justify-center gap-1">
          Designed and developed by
          <a
            className="flex items-center gap-1 font-bold text-white md:ml-auto"
            href="https://erikb.dev"
          >
            @erikbdev <HiOutlineExternalLink />
          </a>
          &
          <a
            className="flex items-center gap-1 md:ml-auto"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Mochi-Team/website/graphs/contributors"
          >
            contributors <HiOutlineExternalLink />
          </a>
        </p>
        <p className="flex flex-wrap items-center  justify-center gap-2 md:ml-auto">
          Made With ❤️ &nbsp;Using{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://nextjs.org/"
          >
            <SiNextdotjs />
          </a>
          and
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://tailwindcss.com/"
          >
            <SiTailwindcss />
          </a>
        </p>
      </div>
    </footer>
  );
}
