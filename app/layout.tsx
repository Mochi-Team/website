import '@/css/tailwind.css';
import '@/css/prism.css';
import AppLogo from '@/public/mochi-logo.png';

import type { Metadata } from 'next';
import { Body } from '@/components/body';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Mochi | Your media, all in one place.',
  description: 'Built by @erikbdev',
  icons: ['/mochi-logo.png'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-pt-[var(--navbar-height)]">
      <Body>
        <Header />
        {children}
        <Footer />
      </Body>
    </html>
  );
}
