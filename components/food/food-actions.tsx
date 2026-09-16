'use client';

import { useState } from 'react';

import AddFoodButton from './add-food-button';
import EditFoodButton from './edit-food-button';
import FoodModal from './food-modal';

import { CategoryViewModel } from '@/types/category';
import { FoodViewModel } from '@/types/food';

type Props = {
  categories: CategoryViewModel[];
  foodItem?: FoodViewModel;
};

export default function FoodActions({ categories, foodItem }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const isEditing = Boolean(foodItem);

  return (
    <>
      {isEditing ? (
        <EditFoodButton onClick={() => setIsOpen(true)} />
      ) : (
        <AddFoodButton onClick={() => setIsOpen(true)} />
      )}

      <FoodModal foodItem={foodItem} categories={categories} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
