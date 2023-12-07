import Image from 'next/image';

type CardInfo = {
  title: string;
  description?: string;
};

const cards: CardInfo[] = [
  {
    title: 'Open Source',
    description: 'Available on GitHub',
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-12">
      {/* Hero */}
      <section className="flex w-full flex-col gap-6">
        {/* Hero Title */}
        <div className="flex flex-1 flex-col gap-1 text-center">
          <p className="text-2xl font-bold">
            A FOSS Content Viewer for Apple Devices
          </p>
          <p>View and manage your media all in one place.</p>
          {/* Hero Title Buttons */}
        </div>

        {/* <ul className='grid grid-cols-2 w-full'>
          { cards.map(c => <InfoCard info={c} />) }
        </ul> */}
      </section>
    </main>
  );
}

const InfoCard = ({ info }: { info: CardInfo }) => {
  return (
    <div
      key={info.title}
      className="flex aspect-[8/5] w-full flex-col rounded-3xl border border-white/10 bg-neutral-500/40 p-6 transition duration-300 ease-in-out"
    >
      <div className="text-left text-white">
        <p className="text-lg font-semibold">{info.title}</p>
        <p className="text-sm font-normal">{info.description}</p>
      </div>
    </div>
  );
};
