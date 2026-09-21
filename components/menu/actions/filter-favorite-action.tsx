'use client';

import { Heart, LayoutList, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  searchParam: string;
  sortByParam: string;
  categoryParam: string;
};

export default function FavoriteFilterButton({ searchParam, sortByParam, categoryParam }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const isFavorite = searchParams.get('favorites') === 'true';

  const createParams = (favorites: boolean) => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (searchParam) {
      params.set('search', searchParam);
    }

    if (categoryParam) {
      params.set('category', categoryParam);
    }

    if (sortByParam) {
      params.set('sortBy', sortByParam);
    }

    if (favorites) {
      params.set('favorites', 'true');
    }

    return params;
  };

  const handleClick = () => {
    const params = createParams(!isFavorite);

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={isPending}
      aria-pressed={isFavorite}
      className={`group relative flex h-12 w-[220px] cursor-pointer items-center justify-center gap-3 rounded-xl border px-4 text-sm font-semibold tracking-wide transition-all duration-300 ease-out outline-none ${
        isFavorite
          ? 'border-[#C09721] bg-[#2A2414] text-[#E5C76B] shadow-[0_0_20px_rgba(192,151,33,0.10)]'
          : 'border-[#C09721]/30 bg-[#181714] text-[#B5B0A3] shadow-sm'
      } hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#24200F] hover:text-[#E5C76B] hover:shadow-[0_0_25px_rgba(192,151,33,0.14)] focus-visible:ring-2 focus-visible:ring-[#C09721]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A09] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {/* Icon container */}
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C09721]/20 transition-all duration-300 ${
          isFavorite ? 'bg-[#C09721]/15' : 'bg-[#24200F] group-hover:bg-[#3A2D12]'
        }`}
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin text-[#C09721]" aria-hidden="true" />
        ) : isFavorite ? (
          <LayoutList
            size={16}
            strokeWidth={1.8}
            className="text-[#A77F18] transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
        ) : (
          <Heart
            size={16}
            strokeWidth={1.8}
            className="text-[#D4AF37] transition-all duration-300 group-hover:scale-110 group-hover:text-[#F0D98A]"
            aria-hidden="true"
          />
        )}
      </span>

      {/* Text */}
      <span>{isPending ? 'Filtrerar...' : isFavorite ? 'Visa alla' : 'Visa alla favoriter'}</span>
    </button>
  );
}
