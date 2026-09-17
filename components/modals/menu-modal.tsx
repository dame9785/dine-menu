'use client';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useSyncExternalStore } from 'react';

import { MenuItemViewModel } from '@/types/menu';
import { CategoryViewModel } from '@/types/category';

import MenuForm from '@/components/forms/menu-form';

type Props = {
  categories: CategoryViewModel[];
  menuItem?: MenuItemViewModel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MenuModal({ categories, menuItem, open, onOpenChange }: Props) {
  const isEditMode = !!menuItem;

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
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-modal-title"
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="menu-modal-title" className="text-lg font-semibold tracking-tight text-slate-900">
                {isEditMode ? 'Update menu' : 'Add menu'}
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                {isEditMode ? 'Update the information for this dish.' : 'Add a new dish to your menu.'}
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-black transition-all duration-200 hover:bg-[#C09721] hover:text-white active:scale-95"
              aria-label="Close modal"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-y-auto">
          <MenuForm menuItem={menuItem} categories={categories} onOpenChange={handleClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
