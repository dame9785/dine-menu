'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import { FoodViewModel } from '@/types/food';
import FoodForm from '@/components/food/form/food-form';
import { CategoryViewModel } from '@/types/category';

type Props = {
  categories: CategoryViewModel[];
  foodItem?: FoodViewModel;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function FoodModal({ categories, foodItem, open, onOpenChange }: Props) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isEditMode = !!foodItem;

  const isOpen = open ?? internalIsOpen;

  const handleOpen = () => {
    setInternalIsOpen(true);
    onOpenChange?.(true);
  };

  const handleClose = () => {
    setInternalIsOpen(false);
    onOpenChange?.(false);
  };

  return (
    <>
      {/* Add food button */}
      {!isEditMode && (
        <button
          type="button"
          onClick={handleOpen}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <span>+</span>
          Add food
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0b1120] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{isEditMode ? 'Edit food' : 'Add food'}</h2>

                <p className="mt-1 text-sm text-slate-400">
                  {isEditMode ? 'Update the information for this dish.' : 'Add a new dish to your menu.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <FoodForm foodItem={foodItem} onOpenChange={handleClose} categories={categories} />
          </div>
        </div>
      )}
    </>
  );
}
