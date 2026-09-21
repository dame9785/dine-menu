'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { House, Folder, Menu, X, Utensils, ChevronRight, Sparkles } from 'lucide-react';

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
    <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-4 py-7">
      {/* Section label */}
      <div className="mb-5 flex items-center gap-3 px-3">
        <span className="h-px w-5 bg-[#C09721]/40" />

        <p className="text-[10px] font-semibold tracking-[0.22em] text-[#777267] uppercase">Workspace</p>
      </div>

      {/* Navigation items */}
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
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-3.5 text-sm font-medium transition-all duration-300 outline-none ${
                    isActive
                      ? `border-[#C09721]/30 bg-gradient-to-r from-[#2A2414] to-[#1D1A12] text-[#E5C76B] shadow-[0_4px_20px_rgba(192,151,33,0.04)]`
                      : `border-transparent text-[#99958A] hover:border-[#C09721]/15 hover:bg-[#191711] hover:text-[#E5C76B]`
                  } focus-visible:ring-2 focus-visible:ring-[#C09721]/50`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute top-2 bottom-2 left-0 w-0.5 rounded-r-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    />
                  )}

                  {/* Icon container */}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                      isActive
                        ? 'border-[#C09721]/20 bg-[#C09721]/10'
                        : 'border-transparent bg-[#181714] group-hover:border-[#C09721]/15'
                    } `}
                  >
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2 : 1.7}
                      aria-hidden="true"
                      className={
                        isActive ? 'text-[#D4AF37]' : 'text-[#777267] transition-colors group-hover:text-[#C09721]'
                      }
                    />
                  </span>

                  <span className="flex-1">{item.label}</span>

                  {/* Active arrow */}
                  {isActive && <ChevronRight size={15} strokeWidth={1.8} className="text-[#C09721]/70" />}
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
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#332D1F] bg-[#0F0E0B]/95 px-4 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl md:hidden">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
          <Utensils size={19} strokeWidth={1.5} className="text-[#C09721]" />

          <span className="font-serif text-lg font-semibold tracking-tight text-[#E5C76B]">Dine Menu</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="rounded-xl border border-[#3A3628] bg-[#181714] p-2.5 text-[#A6A39A] transition-all duration-300 hover:border-[#C09721]/40 hover:bg-[#2A2414] hover:text-[#D4AF37]"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#332D1F] bg-[#0F0E0B] shadow-[8px_0_50px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}
      >
        {/* Logo & Company */}
        <header className="relative border-b border-[#332D1F] px-6 py-6">
          {/* Subtle glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-0 h-40 w-40 rounded-full bg-[#C09721]/5 blur-3xl"
          />

          <Link href="/" onClick={closeMenu} className="relative flex items-center gap-3">
            {/* Logo */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C09721]/30 bg-gradient-to-br from-[#2A2414] to-[#17150F] shadow-[0_4px_20px_rgba(192,151,33,0.06)]">
              <Utensils size={21} strokeWidth={1.5} className="text-[#D4AF37]" />
            </div>

            <div className="min-w-0">
              <h1 className="font-serif text-xl font-semibold tracking-tight text-[#E5C76B]">Dine Menu</h1>

              <p className="mt-0.5 text-[9px] font-medium tracking-[0.22em] text-[#777267] uppercase">
                Culinary Experience
              </p>
            </div>
          </Link>

          {/* Decorative line */}
          <div className="mt-6 flex items-center gap-2">
            <span className="h-px flex-1 bg-gradient-to-r from-[#C09721]/40 to-transparent" />

            <Sparkles size={12} strokeWidth={1.5} className="text-[#C09721]/60" />

            <span className="h-px flex-1 bg-gradient-to-l from-[#C09721]/40 to-transparent" />
          </div>

          {/* Company info */}
          {isCompany && companyName && (
            <div className="mt-5 rounded-xl border border-[#C09721]/20 bg-gradient-to-br from-[#211C10] to-[#15130E] p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C09721] shadow-[0_0_8px_rgba(192,151,33,0.6)]" />

                <p className="text-[9px] font-bold tracking-[0.18em] text-[#C09721] uppercase">Your Restaurant</p>
              </div>

              <p className="truncate text-base font-semibold tracking-tight text-[#E5C76B]" title={companyName}>
                {companyName}
              </p>

              <p className="mt-1 text-[11px] text-[#777267]">Company account</p>

              <div className="mt-4 h-px bg-[#C09721]/10" />

              <p className="mt-3 text-[10px] tracking-wide text-[#8E887A]">Manage your culinary menu</p>
            </div>
          )}
        </header>

        {/* Navigation */}
        {navigation}

        {/* Footer */}
        <footer className="border-t border-[#332D1F] p-4">
          <UserActions />
        </footer>
      </aside>
    </>
  );
}
