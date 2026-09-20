'use client';

import { useState } from 'react';
import { MoreVertical, Store } from 'lucide-react';
import Link from 'next/link';

import { MenuItemViewModel } from '@/types/menu';
import { CategoryViewModel } from '@/types/category';

import DeleteAction from '@/components/menu/actions/delete-action';
import FavoriteAction from '@/components/menu/actions/favorite-action';
import ModalAction from '@/components/menu/actions/menu-modal-actions';
import MenuCardContent from './menu-card-content';
import MenuImage from '@/components/menu/menu-image';

import { deleteMenuItem } from '@/actions/menu';

type Props = {
  menuItem: MenuItemViewModel;
  categories: CategoryViewModel[];
  isAdmin: boolean;
  isLoggedIn: boolean;
};

export default function MenuCard({ menuItem, categories, isAdmin, isLoggedIn }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hasCompany = Boolean(menuItem.company?.name);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#C09721]/20 bg-[#FFFCF5] shadow-[0_4px_20px_rgba(118,83,21,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#C09721]/60 hover:shadow-[0_14px_35px_rgba(118,83,21,0.12)]">
      {/* Menu item link */}
      <Link
        href={`/menu/${menuItem.id}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C09721]/30"
      >
        {/* Image */}
        <div className="relative h-72 overflow-hidden bg-[#E8DAB8]/20">
          <MenuImage src={menuItem.imageUrl || '/img/menu/menu-placeholder.png'} alt={menuItem.name} />

          {/* Image overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent"
          />

          {/* Restaurant ownership */}
          {hasCompany && (
            <div className="absolute right-4 bottom-4 left-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 px-3 py-3 text-white shadow-lg backdrop-blur-xl">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                  <Store size={15} strokeWidth={1.5} />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-medium tracking-[0.18em] text-white/60 uppercase">Presented by</p>

                  <p className="truncate text-sm font-medium tracking-wide">{menuItem.company?.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <MenuCardContent menuItem={menuItem} />
      </Link>

      {/* Favorite */}
      {isLoggedIn && (
        <div className="absolute top-4 right-4 z-20">
          <FavoriteAction menuItemId={menuItem.id} isFavorite={menuItem.isFavorite} />
        </div>
      )}

      {/* Admin actions */}
      {isAdmin && <div className="absolute right-4 bottom-4 z-40">{/* Behåll din befintliga adminmeny här */}</div>}
    </article>
  );
}
