'use client';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

import { FoodViewModel } from '@/types/food';

import DeleteFoodButton from '@/components/food/delete-food-button';
import FavoriteButton from '@/components/food/add-food-favorite.button';

import { deleteFood } from '@/actions/food';

type Props = {
  foodItem: FoodViewModel;
};

export default function FoodCard({ foodItem }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="group relative overflow-visible rounded-2xl border border-slate-800/80 bg-[#0b1120] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl hover:shadow-black/40">
      {/* Detail link */}
      <Link href={`/foods/${foodItem.id}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-slate-900">
          <img
            src={foodItem.imageUrl}
            alt={foodItem.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Category */}
          <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {foodItem.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <div className="mb-3">
            <h2 className="font-semibold text-white">{foodItem.name}</h2>

            <p className="mt-1 text-xs text-slate-500">{foodItem.category}</p>
          </div>

          {/* Description */}
          <p className="mb-6 line-clamp-2 text-sm leading-6 text-slate-400">{foodItem.description}</p>

          {/* Price */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
            <span className="text-lg font-semibold text-white">{Number(foodItem.price)} kr</span>

            <span className="text-xs text-slate-500">Visa detaljer →</span>
          </div>
        </div>
      </Link>

      {/* Favorite */}
      <FavoriteButton foodId={foodItem.id} />

      {/* More menu */}
      <div className="absolute right-4 top-[215px] z-20">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white"
          aria-label="Öppna meny"
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown */}
        {isMenuOpen && <DeleteFoodButton foodId={foodItem.id} deleteFoodAction={deleteFood} />}
      </div>
    </div>
  );
}
