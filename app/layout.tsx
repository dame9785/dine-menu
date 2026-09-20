import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import { Toaster } from 'sonner';

import SidebarWrapper from '@/components/sidebar/sidebar-wrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dine Menu',
  description: 'Discover delicious dishes and restaurant menus.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={` ${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full bg-[#FBF8F0] font-sans text-base leading-relaxed text-gray-800 antialiased">
        <SidebarWrapper />

        <main className="min-h-screen p-4 pt-20 md:ml-64 md:p-8">{children}</main>

        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            classNames: {
              toast: 'text-base',
              title: 'font-medium',
              description: 'text-sm',
            },
          }}
        />
      </body>
    </html>
  );
}
