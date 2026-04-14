import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const neueHaas = localFont({
  src: [
    {
      path: '../fonts/neuehaasgrotdispround-35thin-trial.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/neuehaasgrotdispround-45light-trial.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/neuehaasgrotdispround-65medium-trial.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/neuehaasgrotdispround-75bold-trial.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/neuehaasgrotdispround-95black-trial.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-neue-haas'
});

export const metadata: Metadata = {
  title: "Product Dept.",
  description: "Where Great Ideas Become Exceptional Products. Full-Stack Product Creation.",
};

import { Navigation } from "@/components/Navigation";
import { Cursor } from "@/components/Cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${neueHaas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground tracking-tight">
        <Cursor />
        <Navigation />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
