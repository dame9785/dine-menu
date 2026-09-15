'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';

import FoodModal from '@/components/food/modal';
import { FoodViewModel } from '@/types/food';
import { CategoryViewModel } from '@/types/category';

type Props = {
  foodItem: FoodViewModel;
  categories: CategoryViewModel[];
};

export default function EditFoodButton({ foodItem, categories }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsEditOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium  backdrop-blur transition hover:border-orange-500/50 hover:bg-orange-500/20"
      >
        <Pencil size={16} />
        Update food item
      </button>

      <FoodModal foodItem={foodItem} categories={categories} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </>
  );
}
