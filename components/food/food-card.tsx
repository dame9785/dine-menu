'use client';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

import { FoodViewModel } from '@/types/food';
import { CategoryViewModel } from '@/types/category';

import DeleteAction from '@/components/food/actions/delete-food-action';
import FavoriteAction from '@/components/food/actions/favorite-menu-action';
import ModalAction from '@/components/food/actions/food-modal-actions';

import { deleteFood } from '@/actions/food';
import FoodCardContent from './food-card-content';
import FoodImage from '@/components/food/food-image';

type Props = {
  foodItem: FoodViewModel;
  categories: CategoryViewModel[];
  isAdmin: boolean;
  isLoggedIn: boolean;
};

export default function FoodCard({ foodItem, categories, isAdmin, isLoggedIn }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#C09721]/30 bg-[#FFFCF5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C09721] hover:shadow-md hover:shadow-[#C09721]/15">
      <Link
        href={`/foods/${foodItem.id}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C09721]/20"
      >
        <div className="relative h-70 overflow-hidden bg-slate-100">
          <FoodImage src={foodItem.imageUrl || '/img/food-placeholder.png'} alt={foodItem.name} />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
          />

          <div className="absolute top-3 left-3">
            <span
              aria-hidden="true"
              className="rounded-full border border-[#C09721]/30 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-md"
            >
              {foodItem.category}
            </span>
          </div>
        </div>

        <FoodCardContent foodItem={foodItem} />
      </Link>

      {isLoggedIn && (
        <div className="absolute top-2 right-2 z-30">
          <FavoriteAction foodId={foodItem.id} isFavorite={foodItem.isFavorite} />
        </div>
      )}

      {isAdmin && (
        <div className="absolute right-5 bottom-5 z-40">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#C09721]/30 bg-white shadow-sm transition hover:bg-[#FFFCF5] hover:text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C09721]/20"
            aria-label={`Open actions for ${foodItem.name}`}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-controls={`food-actions-${foodItem.id}`}
          >
            <MoreVertical size={17} aria-hidden="true" />
          </button>

          {isMenuOpen && (
            <div
              id={`food-actions-${foodItem.id}`}
              role="menu"
              aria-label={`Actions for ${foodItem.name}`}
              className="absolute right-0 bottom-10 z-50 flex w-36 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40"
            >
              <ModalAction categories={categories} foodItem={foodItem} />

              <DeleteAction foodId={foodItem.id} deleteFoodAction={deleteFood} onDeleted={() => setIsMenuOpen(false)} />
            </div>
          )}
        </div>
      )}
    </article>
  );
}
