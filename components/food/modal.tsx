'use client';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useSyncExternalStore } from 'react';

import { FoodViewModel } from '@/types/food';
import { CategoryViewModel } from '@/types/category';

import FoodForm from '@/components/food/food-form';

type Props = {
  categories: CategoryViewModel[];
  foodItem?: FoodViewModel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FoodModal({ categories, foodItem, open, onOpenChange }: Props) {
  const isEditMode = !!foodItem;

  // Detect client-side rendering without useEffect/setState
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-md"
      onMouseDown={handleClose}
    >
      {/* Modal */}
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                {isEditMode ? 'Update food' : 'Add food'}
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                {isEditMode ? 'Update the information for this dish.' : 'Add a new dish to your menu.'}
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              className="
                flex h-9 w-9 shrink-0 cursor-pointer
                items-center justify-center
                rounded-lg
                text-slate-400
                transition-all duration-200
                hover:bg-slate-100
                hover:text-slate-700
                active:scale-95
              "
              aria-label="Close modal"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-y-auto">
          <FoodForm foodItem={foodItem} categories={categories} onOpenChange={handleClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
