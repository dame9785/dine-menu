'use client';

import { Plus } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export default function AddFoodAction({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 text-sm font-medium text-slate-900 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98]"
    >
      <Plus size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-45" />

      <span>Add category</span>
    </button>
  );
}
