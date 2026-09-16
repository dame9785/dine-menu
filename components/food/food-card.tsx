'use client';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { FoodViewModel } from '@/types/food';
import { CategoryViewModel } from '@/types/category';

import DeleteFoodButton from '@/components/food/delete-food-button';
import FavoriteAction from '@/components/food/add-favorite-action';
import ModalAction from '@/components/food/food-modal-edit-actions';

import { deleteFood } from '@/actions/food';
import FoodCardContent from './food-card-content';

type Props = {
  foodItem: FoodViewModel;
  categories: CategoryViewModel[];
};

export default function FoodCard({ foodItem, categories }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#C09721]/30 bg-[#FFFCF5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C09721] hover:shadow-md hover:shadow-[#C09721]/15">
      {/* Detail link */}
      <Link
        href={`/foods/${foodItem.id}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C09721]/20"
      >
        {/* Image */}
        <div className="relative h-70 overflow-hidden bg-slate-100">
          <Image
            fill
            src={foodItem.imageUrl}
            alt={foodItem.name}
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              aria-hidden="true"
              className="rounded-full border border-[#C09721]/30 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-md"
            >
              {foodItem.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <FoodCardContent foodItem={foodItem} />
      </Link>

      {/* Favorite action */}
      <div className="absolute top-2 right-2 z-30">
        <FavoriteAction foodId={foodItem.id} />
      </div>

      {/* More actions */}
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
            role="menu"
            aria-label={`Actions for ${foodItem.name}`}
            className="absolute right-0 bottom-10 z-50 flex w-36 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40"
          >
            <ModalAction categories={categories} foodItem={foodItem} />
            <DeleteFoodButton foodId={foodItem.id} deleteFoodAction={deleteFood} />
          </div>
        )}
      </div>
    </article>
  );
}
