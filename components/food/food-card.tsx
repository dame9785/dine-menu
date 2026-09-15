'use client';

import { useState } from 'react';
import { MoreVertical, Pen, Pencil } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { FoodViewModel } from '@/types/food';

import DeleteFoodButton from '@/components/food/delete-food-button';
import FavoriteButton from '@/components/food/add-food-favorite.button';
import FoodModal from '@/components/food/food-modal';

import { deleteFood } from '@/actions/food';

type Props = {
  foodItem: FoodViewModel;
  categories: {
    id: number;
    name: string;
  }[];
};

export default function FoodCard({ foodItem, categories }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      {/* Food card */}
      <div className="group relative overflow-visible rounded-2xl border border-slate-800/80 bg-[#0b1120] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl hover:shadow-black/40">
        {/* Detail link */}
        <Link href={`/foods/${foodItem.id}`}>
          {/* Image */}
          <div className="relative h-40 overflow-hidden rounded-t-2xl bg-slate-900">
            <Image
              fill
              src={foodItem.imageUrl}
              alt={foodItem.name}
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

            {/* Category */}
            <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {foodItem.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-2">
              <h2 className="font-semibold text-white">{foodItem.name}</h2>

              <p className="mt-1 text-xs text-slate-500">{foodItem.category}</p>
            </div>

            {/* Description */}
            <p className="mb-4 line-clamp-2 text-sm leading-5 text-slate-400">{foodItem.description}</p>

            {/* Price */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
              <span className="text-lg font-semibold text-white">{Number(foodItem.price)} kr</span>

              <span className="text-xs text-slate-500">Visa detaljer →</span>
            </div>
          </div>
        </Link>

        {/* Favorite */}
        <FavoriteButton foodId={foodItem.id} />

        {/* More menu */}
        <div className="absolute right-4 top-46.25 z-20">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white"
            aria-label="Öppna meny"
          >
            <MoreVertical size={18} />
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-0 top-8 z-50 flex w-32 flex-col overflow-hidden rounded-lg border border-slate-800 bg-[#0b1120] shadow-xl">
              {/* Edit */}

              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(true);
                  setIsMenuOpen(false);
                }}
                className="cursor-pointer flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-orange-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                <Pencil size={16} />
                edit
              </button>

              {/* Delete */}
              <DeleteFoodButton foodId={foodItem.id} deleteFoodAction={deleteFood} />
            </div>
          )}
        </div>
      </div>

      {/* Edit food modal */}
      <FoodModal categories={categories} foodItem={foodItem} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </>
  );
}
