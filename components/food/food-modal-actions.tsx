'use client';

import { useState } from 'react';

import AddModalAction from '@/components/food/food-modal-add-action';
import EditModalAction from '@/components/food/edit-modal-action';
import Modal from '@/components/modals/food-modal';

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
        <EditModalAction onClick={() => setIsOpen(true)} />
      ) : (
        <AddModalAction onClick={() => setIsOpen(true)} />
      )}

      <Modal foodItem={foodItem} categories={categories} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
