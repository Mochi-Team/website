import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { HiOutlineExternalLink } from 'react-icons/hi';

export function Footer() {
  return (
    <footer className="w-full flex-initial p-8 text-xs">
      <div className="flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center font-semibold text-neutral-400 md:flex-row">
        <p className="flex gap-1">
          Designed and developed by{' '}
          <a
            className="flex items-center gap-1 md:ml-auto"
            href="https://errorerrorerror.dev"
          >
            errorerrorerror <HiOutlineExternalLink />
          </a>
        </p>
        <p className="flex items-center gap-2 md:ml-auto">
          Made With ❤️ &nbsp;Using <SiNextdotjs /> and <SiTailwindcss />
        </p>
      </div>
    </footer>
  );
}
