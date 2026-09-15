'use client';

import { X } from 'lucide-react';

import { FoodViewModel } from '@/types/food';
import FoodForm from '@/components/food/food-form';
import { CategoryViewModel } from '@/types/category';

type Props = {
  categories: CategoryViewModel[];
  foodItem?: FoodViewModel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FoodModal({ categories, foodItem, open, onOpenChange }: Props) {
  const isEditMode = !!foodItem;

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="shrink-0 border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{isEditMode ? 'Update food' : 'Add food'}</h2>

              <p className="mt-1 text-sm text-slate-500">
                {isEditMode ? 'Update the information for this dish.' : 'Add a new dish to your menu.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-y-auto">
          <FoodForm foodItem={foodItem} onOpenChange={handleClose} categories={categories} />
        </div>
      </div>
    </div>
  );
}
