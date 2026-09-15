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
        border-indigo-100 bg-indigo-50 px-3 py-1.5
           shadow-sm
          transition-all duration-200
          hover:-translate-y-0.5
     
          active:translate-y-0
          active:scale-[0.98]
          text-xs font-semibold uppercase tracking-wider text-indigo-600
        "
      >
        <span className="text-lg leading-none">+</span>
        <span>Add food</span>
      </button>

      <FoodModal categories={categories} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
