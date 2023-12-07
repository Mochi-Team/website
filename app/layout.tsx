import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "../components/footer";
import { Header, HeaderContext } from "../components/header";
import { useContext, useState } from "react";
import { Body } from "@/components/body";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mochi | Your media, all in one place.",
  description: "Built by @errorerrorerror",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Body>
        <div className="h-full flex flex-col max-w-2xl mx-auto gap-8">
          <Header />
          <main className="h-full flex-auto">{children}</main>
          <Footer />
        </div>
      </Body>
    </html>
  );
}
