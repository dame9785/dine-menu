'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { House, Folder, Menu, X, Utensils } from 'lucide-react';

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
  companyName?: string | null;
  isCompany: boolean;
};

export default function Sidebar({ isAdmin, companyName, isCompany }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const navigation = (
    <nav aria-label="Main navigation" className="flex-1 px-4 py-6">
      <p className="mb-4 px-3 text-[10px] font-bold tracking-[0.18em] text-[#777267] uppercase">Menu</p>

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
                  className={`group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition-all duration-200 outline-none ${
                    isActive
                      ? 'border-[#C09721]/30 bg-[#2A2414] text-[#D4AF37] shadow-[0_0_20px_rgba(192,151,33,0.05)]'
                      : 'border-transparent text-[#A6A39A] hover:border-[#C09721]/20 hover:bg-[#1F1C15] hover:text-[#E5C76B]'
                  }`}
                >
                  <Icon
                    size={18}
                    aria-hidden="true"
                    className={
                      isActive ? 'text-[#D4AF37]' : 'text-[#777267] transition-colors group-hover:text-[#C09721]'
                    }
                  />

                  <span>{item.label}</span>

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                    />
                  )}
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
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#3A3628] bg-[#0F0E0B] px-4 shadow-lg md:hidden">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-serif text-lg font-semibold tracking-[0.08em] text-[#D4AF37]"
        >
          Dine Menu
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="rounded-lg p-2 text-[#A6A39A] transition hover:bg-[#1F1C15] hover:text-[#D4AF37]"
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#3A3628] bg-[#0F0E0B] shadow-[4px_0_30px_rgba(0,0,0,0.3)] transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo & Company */}
        <header className="border-b border-[#3A3628] px-6 py-5">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C09721]/30 bg-[#2A2414]">
              <Utensils size={20} className="text-[#D4AF37]" />
            </div>

            <div>
              <h1 className="font-serif text-xl font-semibold tracking-tight text-[#E5C76B]">Dine Menu</h1>

              <p className="text-[9px] tracking-[0.2em] text-[#777267] uppercase">Culinary Experience</p>
            </div>
          </Link>

          {isCompany && companyName && (
            <div className="mt-5 border-t border-[#3A3628] pt-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C09721] shadow-[0_0_8px_rgba(192,151,33,0.5)]" />

                <p className="text-[10px] font-semibold tracking-[0.16em] text-[#C09721] uppercase">Your Restaurant</p>
              </div>

              <p className="truncate text-lg font-bold tracking-tight text-[#E5C76B]" title={companyName}>
                {companyName}
              </p>

              <p className="mt-0.5 text-xs text-[#777267]">Company account</p>
            </div>
          )}
        </header>

        {/* Navigation */}
        {navigation}

        {/* Footer */}
        <footer className="space-y-3 border-t border-[#3A3628] p-4">
          <UserActions />
        </footer>
      </aside>
    </>
  );
}
