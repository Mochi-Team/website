'use client';

import { Inter } from 'next/font/google';
import { createContext, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export type BodyContextType = {
  isShowingNav: boolean;
  setShowingNav: (value: boolean) => void;
};

export const BodyContext = createContext<BodyContextType | null>(null);

export const Body = ({ children }: { children: JSX.Element }) => {
  const [isShowingNav, setShowingNav] = useState(false);
  return (
    <BodyContext.Provider value={{ isShowingNav, setShowingNav }}>
      <body
        className={`${inter.className} min-h-screen antialiased ${
          isShowingNav ? 'overflow-hidden sm:overflow-auto' : 'overflow-auto'
        }`}
      >
        {children}
      </body>
    </BodyContext.Provider>
  );
};
