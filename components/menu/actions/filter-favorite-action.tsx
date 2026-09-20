'use client';

import { Heart, LayoutList, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  isFavorite: boolean;
  searchParam: string;
  sortByParam: string;
  categoryParam: string;
};

export default function FavoriteFilterButton({ searchParam, sortByParam, categoryParam }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  // Läs favoritstatus direkt från URL
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
      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 font-medium text-slate-600 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? (
        <>
          <Loader2 size={19} className="animate-spin text-[#C09721]" />
          <p>Filtrerar...</p>
        </>
      ) : isFavorite ? (
        <>
          <LayoutList size={19} />
          <p>Visa alla</p>
        </>
      ) : (
        <>
          <Heart
            size={19}
            className="fill-current text-red-600 transition-all duration-200 group-hover:scale-110 group-hover:text-red-500"
          />
          <p>Visa alla favoriter</p>
        </>
      )}
    </button>
  );
}
