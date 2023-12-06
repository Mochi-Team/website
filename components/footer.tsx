import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { HiOutlineExternalLink } from 'react-icons/hi';

export function Footer() {
    return (
        <footer className="flex-initial w-full text-xs">
            <div className="font-semibold gap-2 border-t pt-8 border-white/10 text-center text-neutral-400 flex flex-col md:flex-row items-center">
                <p className='flex gap-1'>Designed and developed by <a className='gap-1 items-center flex md:ml-auto' href='https://errorerrorerror.dev'>errorerrorerror <HiOutlineExternalLink /></a></p>
                <p className='gap-2 items-center flex md:ml-auto'>Made With ❤️ &nbsp;Using <SiNextdotjs /> and <SiTailwindcss /></p>
            </div>
        </footer>
    )
}