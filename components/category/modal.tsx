'use client';

import type { CategoryViewModel } from '@/types/category';

import { X } from 'lucide-react';
import AddCategoryForm from '@/components/category/form';

type Props = {
  category?: CategoryViewModel;
  isOpen: boolean;
  onClose: () => void;
};

export default function CategoryModal({ category, isOpen, onClose }: Props) {
  const isEdit = !!category;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-md">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-center justify-center">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              {isEdit ? 'Update category' : 'Add category'}
            </h2>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              {isEdit ? 'Update the information for this category.' : 'Add a new category.'}
            </p>
          </div>
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
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

        {/* Form */}
        <AddCategoryForm onClose={onClose} category={category ?? undefined} />
      </div>
    </div>
  );
}
