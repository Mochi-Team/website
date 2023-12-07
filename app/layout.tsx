import './globals.css';
import type { Metadata } from 'next';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Body } from '@/components/body';

export const metadata: Metadata = {
  title: 'Mochi | Your media, all in one place.',
  description: 'Built by @errorerrorerror',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Body>
        <div className="mx-auto flex h-full max-w-2xl flex-col">
          <Header />
          <main className="h-full flex-auto px-8">{children}</main>
          <Footer />
        </div>
      </Body>
    </html>
  );
}
