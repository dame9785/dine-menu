'use client';

import { Heart, LayoutList, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { useFilterLoading } from '@/components/food/food-list-loading-wrapper';
import { getFavoriteIds } from '@/actions/food';
import { toast } from 'sonner';

type Props = {
  currentPage: number;
  searchParam: string;
  sortByParam: string;
  categoryParam: string;
};

export default function FavoriteFilterButton({ searchParam, sortByParam, categoryParam }: Props) {
  const { navigateWithLoading, startLoading, stopLoading } = useFilterLoading();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createParams = (filter?: string) => {
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

    if (filter) {
      params.set('favorites', filter);
    }

    return params;
  };

  const showAllFavorites = () => {
    setIsFavorite(false);

    const params = new URLSearchParams();

    params.set('page', '1');

    navigateWithLoading(`/?${params.toString()}`);
  };

  const showFavorites = async () => {
    if (isFavorite) {
      showAllFavorites();
      return;
    }

    try {
      setIsLoading(true);

      // Starta content-loading direkt
      startLoading();

      const result = await getFavoriteIds();

      if (!result.success || !result.data || result.data.length === 0) {
        stopLoading();

        toast.warning(result.message);
        return;
      }

      setIsFavorite(true);

      const params = createParams(result.data.join(','));

      navigateWithLoading(`/?${params.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={showFavorites}
      type="button"
      disabled={isLoading}
      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 font-medium text-slate-600 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <>
          <Loader2 size={19} className="animate-spin" />
          <p>Laddar...</p>
        </>
      ) : isFavorite ? (
        <>
          <LayoutList size={19} className="transition-transform duration-200 group-hover:scale-110" />
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
