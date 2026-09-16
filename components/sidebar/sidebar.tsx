'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { House, Folder } from 'lucide-react';

const navigationItems = [
  {
    label: 'Home',
    href: '/',
    icon: House,
  },
  {
    label: 'Categories',
    href: '/category',
    icon: Folder,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#C09721]/20 bg-white shadow-[4px_0_24px_rgba(15,23,42,0.04)]">
      {/* Logo */}

      <header className="border-b border-[#C09721]/20 px-6 py-5">
        <Link
          href="/"
          aria-label="Go to Dine Menu home"
          className="group flex items-center gap-3 rounded-xl transition-opacity outline-none hover:opacity-80 focus-visible:ring-4 focus-visible:ring-[#C09721]/20"
        >
          <div className="flex">
            <h2 className="text-l font-semibold tracking-[0.08em] text-[#A77F18] uppercase">Dine menu</h2>
            <div className="text-m border-l border-[#C09721]/20 pl-3">
              <p className="font-semibold tracking-[0.08em] text-[#A77F18] uppercase">Restaurant</p>
              <p className="font-medium tracking-[0.04em] text-slate-400">Essentials</p>
            </div>
          </div>
        </Link>
      </header>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="flex-1 px-4 py-6">
        <p className="mb-4 px-3 text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">Menu</p>

        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ease-out outline-none focus-visible:ring-4 focus-visible:ring-[#C09721]/20 ${
                    isActive
                      ? 'border border-[#C09721]/20 bg-[#E8DAB8] text-slate-900 shadow-sm'
                      : 'border border-transparent text-slate-500 hover:-translate-y-0.5 hover:border-[#C09721]/30 hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-sm'
                  }`}
                >
                  <Icon
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? 'text-[#765315]' : 'text-slate-500 group-hover:text-[#A77F18]'
                    }`}
                  />

                  <span>{item.label}</span>

                  {isActive && <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-[#A77F18]" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <footer className="border-t border-slate-100 p-4">
        <div className="rounded-2xl border border-[#C09721]/15 bg-[#FFFCF5] px-4 py-4">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8DAB8] text-sm font-bold text-[#765315]">
            D
          </div>

          <p className="text-xs font-bold text-slate-700">Dine Menu</p>

          <p className="mt-1 text-[11px] leading-4 text-slate-400">Restaurant management</p>
        </div>
      </footer>
    </aside>
  );
}
