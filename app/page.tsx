import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiChevronRight } from 'react-icons/fi';

type CardInfo = {
  title: string;
  description?: string;
  link?: {
    external: boolean;
    href: string;
    title: string;
  };
};

const cards: CardInfo[] = [
  {
    title: 'Open Source',
    description: 'Fully open-source and ad-free, forever.',
    link: {
      external: true,
      href: 'https://github.com/Mochi-Team/mochi',
      title: 'Available on GitHub',
    },
  },
  {
    title: 'External Modules',
    description:
      'Take control of your media by building and importing modules.',
    link: {
      external: false,
      href: '/docs',
      title: 'Learn more',
    },
  },
];

export default function Home() {
  return (
    <div className="max-w-center-layout flex flex-col items-center justify-between gap-12">
      {/* Hero */}
      <section className="flex w-full flex-col gap-8">
        {/* Hero Title */}
        <div className="flex flex-1 flex-col gap-1 text-center">
          <p className="text-2xl font-bold">
            A FOSS Content Viewer for Apple Devices
          </p>
          <p>View and manage your media all in one place.</p>
          {/* Hero Title Buttons */}
        </div>

        {/* Display app screenshots */}

        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <InfoCard key={c.title} info={c} />
          ))}
        </ul>
      </section>
    </div>
  );
}

const InfoCard = ({ info }: { info: CardInfo }) => {
  return (
    <li
      key={info.title}
      className="flex w-full flex-col rounded-2xl border border-neutral-500/30 bg-neutral-500/10 p-6 transition duration-300 ease-in-out"
    >
      <p className="text-md font-bold">{info.title}</p>
      <p className="text-sm font-normal">{info.description}</p>
      {info.link ? (
        <Link
          className="mt-4 flex flex-row items-center gap-2 self-start rounded-full border border-neutral-500/30 bg-neutral-500/30 px-4 py-2 text-xs"
          target={info.link.external ? '_blank' : ''}
          rel={info.link.external ? 'noopener noreferrer' : ''}
          href={info.link.href}
        >
          {info.link.title}
          {info.link.external ? <FiExternalLink /> : <FiChevronRight />}
        </Link>
      ) : (
        <></>
      )}
    </li>
  );
};
