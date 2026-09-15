'use client';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { FoodViewModel } from '@/types/food';
import { CategoryViewModel } from '@/types/category';

import DeleteFoodButton from '@/components/food/delete-food-button';
import FavoriteButton from '@/components/food/favorite-button';
import FoodModal from '@/components/food/modal';

import { deleteFood } from '@/actions/food';
import UpdateFoodButton from './update-food-button';

type Props = {
  foodItem: FoodViewModel;
  categories: CategoryViewModel[];
};

export default function FoodCard({ foodItem, categories }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const isDetail = false;

  return (
    <>
      {/* Food card */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60">
        {/* Detail link */}
        <Link href={`/foods/${foodItem.id}`} className="block">
          {/* Image */}
          <div className="relative h-70 overflow-hidden bg-slate-100">
            <Image
              fill
              src={foodItem.imageUrl}
              alt={foodItem.name}
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

            {/* Category */}
            <div className="absolute left-3 top-3">
              <span className="rounded-full border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur-md">
                {foodItem.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <div className="mb-3">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">{foodItem.name}</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{foodItem.category}</p>
            </div>

            {/* Description */}
            <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">{foodItem.description}</p>

            {/* Price */}
            <div className="flex items-end justify-between border-t border-slate-100 pt-4">
              <div>
                <p className="mb-0.5 text-[10px] text-l uppercase tracking-wider text-slate-400">Price</p>
                <span className="text-xl font-bold text-slate-900">{Number(foodItem.price).toFixed(2)} €</span>
              </div>

              <div className="absolute bottom-5 right-5 z-40">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen((prev) => !prev);
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-slate-900"
                  aria-label="Öppna meny"
                >
                  <MoreVertical size={17} />
                </button>

                {isMenuOpen && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute bottom-10 right-0 z-50 flex w-36 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40"
                  >
                    <UpdateFoodButton
                      onEdit={() => {
                        setIsEditOpen(true);
                        setIsMenuOpen(false);
                      }}
                      onCloseMenu={() => setIsMenuOpen(false)}
                    />

                    <DeleteFoodButton foodId={foodItem.id} deleteFoodAction={deleteFood} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>

        <div className="absolute top-2 right-2">
          <FavoriteButton foodId={foodItem.id} isDetail={isDetail} />
        </div>

        {/* More menu */}
      </div>

      {/* Edit food modal */}
      <FoodModal categories={categories} foodItem={foodItem} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </>
  );
}
