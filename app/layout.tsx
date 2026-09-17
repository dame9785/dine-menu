import './globals.css';
import { Toaster } from 'sonner';
import SidebarWrapper from '@/components/sidebar/sidebar-wrapper';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className={` ${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
        <SidebarWrapper />
        <main className="min-h-screen p-4 pt-20 md:ml-64 md:p-8">{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
