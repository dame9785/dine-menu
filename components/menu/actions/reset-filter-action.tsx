'use client';

import { RotateCcw, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function ResetFilteringButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(() => {
      router.replace('/');
    });
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={isPending}
      aria-label="Reset all filters"
      className="group inline-flex h-12 w-55 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-[#C09721]/35 bg-white px-4 text-sm font-semibold tracking-wide text-slate-600 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-lg hover:shadow-[#C09721]/10 focus-visible:ring-4 focus-visible:ring-[#C09721]/15 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? (
        <Loader2 size={17} aria-hidden="true" className="animate-spin text-[#C09721]" />
      ) : (
        <RotateCcw
          size={17}
          aria-hidden="true"
          className="text-[#C09721] transition-transform duration-300 group-hover:-rotate-90"
        />
      )}

      <span>{isPending ? 'Resetting...' : 'Reset filters'}</span>
    </button>
  );
}
