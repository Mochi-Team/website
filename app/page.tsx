import Image from 'next/image'

type CardInfo = {
  title: string,
  description?: string,
};

const cards: CardInfo[] = [
  {
    title: "Open Source",
    description: "Available on GitHub",
  }
];

export default function Home() {
  return (
    <main className="flex flex-col gap-12 items-center justify-between">
      {/* Hero */}
      <section className='flex flex-col gap-6 w-full'>
        {/* Hero Title */}
        <div className='flex flex-col gap-1 text-center flex-1'>
          <p className='text-2xl font-bold'>A FOSS Content Viewer for Apple Devices</p>
          <p>View and manage your media all in one place.</p>
          {/* Hero Title Buttons */}
        </div>

        {/* <ul className='grid grid-cols-2 w-full'>
          { cards.map(c => <InfoCard info={c} />) }
        </ul> */}
      </section>
    </main>
  )
}

const InfoCard = ({ info }: { info: CardInfo }) => {
  return (
    <div key={info.title} className="w-full transition ease-in-out duration-300 aspect-[8/5] p-6 flex flex-col rounded-3xl bg-neutral-500/40 border border-white/10">
      <div className='text-white text-left'>
        <p className="text-lg font-semibold">{info.title}</p>
        <p className="text-sm font-normal">{info.description}</p>
      </div>
    </div>
  );
}