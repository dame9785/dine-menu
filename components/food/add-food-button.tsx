'use client';

import { useState } from 'react';

import FoodModal from '@/components/food/modal';
import { CategoryViewModel } from '@/types/category';

type Props = {
  categories: CategoryViewModel[];
};

export default function AddFoodButton({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          flex cursor-pointer items-center gap-2
          rounded-xl
          border border-indigo-600
          bg-indigo-600
          px-4 py-2.5
          text-sm font-medium
          text-white
          shadow-sm
          transition-all duration-200
          hover:-translate-y-0.5
          hover:border-indigo-700
          hover:bg-indigo-700
          hover:shadow-lg
          hover:shadow-indigo-500/25
          active:translate-y-0
          active:scale-[0.98]
        "
      >
        <span className="text-lg leading-none">+</span>
        <span>Add food</span>
      </button>

      <FoodModal categories={categories} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
