'use client';

import { RotateCcw, Loader2 } from 'lucide-react';

import { useFilterLoading } from '@/components/food/food-list-loading-wrapper';

export default function ResetFilteringButton() {
  const { navigateWithLoading, isPending } = useFilterLoading();

  const handleReset = () => {
    navigateWithLoading('/');
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={isPending}
      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 font-medium text-slate-600 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? (
        <Loader2 size={17} className="animate-spin" />
      ) : (
        <RotateCcw size={17} className="transition-transform duration-300 group-hover:-rotate-45" />
      )}

      <span>{isPending ? 'Resetting...' : 'Reset filtering'}</span>
    </button>
  );
}
