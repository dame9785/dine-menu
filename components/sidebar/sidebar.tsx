'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { House, Folder, Menu, X } from 'lucide-react';
import UserActions from '@/components/sidebar/user-actions';

const navigationItems = [
  {
    label: 'Home',
    href: '/',
    icon: House,
    requiresAdmin: false,
  },
  {
    label: 'Categories',
    href: '/category',
    icon: Folder,
    requiresAdmin: true,
  },
];

type Props = {
  isAdmin: boolean;
};

export default function Sidebar({ isAdmin }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const navigation = (
    <nav aria-label="Main navigation" className="flex-1 px-4 py-6">
      <p className="mb-4 px-3 text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">Menu</p>

      <ul className="space-y-2">
        {navigationItems
          .filter((item) => !item.requiresAdmin || isAdmin)
          .map((item) => {
            const Icon = item.icon;

            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 outline-none ${
                    isActive
                      ? 'border border-[#C09721]/20 bg-[#E8DAB8] text-slate-900 shadow-sm'
                      : 'border border-transparent text-slate-500 hover:border-[#C09721]/30 hover:bg-[#FFFCF5] hover:text-[#A77F18]'
                  }`}
                >
                  <Icon size={18} aria-hidden="true" className={isActive ? 'text-[#765315]' : 'text-slate-500'} />

                  <span>{item.label}</span>

                  {isActive && <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-[#A77F18]" />}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#C09721]/20 bg-white px-4 shadow-sm md:hidden">
        <Link href="/" onClick={closeMenu} className="font-semibold tracking-[0.08em] text-[#A77F18] uppercase">
          Dine Menu
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-[#FFFCF5]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-slate-900/30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#C09721]/20 bg-white shadow-[4px_0_24px_rgba(15,23,42,0.04)] transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <header className="border-b border-[#C09721]/20 px-6 py-5">
          <Link href="/" onClick={closeMenu} aria-label="Go to Dine Menu home" className="flex items-center gap-3">
            <div className="flex">
              <h2 className="font-semibold tracking-[0.08em] text-[#A77F18] uppercase">Dine Menu</h2>

              <div className="ml-3 border-l border-[#C09721]/20 pl-3">
                <p className="font-semibold tracking-[0.08em] text-[#A77F18] uppercase">Restaurant</p>

                <p className="font-medium tracking-[0.04em] text-slate-400">Essentials</p>
              </div>
            </div>
          </Link>
        </header>

        {/* Navigation */}
        {navigation}

        {/* Footer */}
        <footer className="space-y-3 border-t border-slate-100 p-4">
          <UserActions />
        </footer>
      </aside>
    </>
  );
}
