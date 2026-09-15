'use client';

import { Heart, LayoutList } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

type Props = {
  currentPage: number;
  searchParam: string;
  sortByParam: string;
  categoryParam: string;
};

export default function FavoriteFilterButton({ currentPage, searchParam, sortByParam, categoryParam }: Props) {
  const router = useRouter();
  const [isFavorite, setIsFavorit] = useState(false);

  const showAllFavorites = () => {
    setIsFavorit(false);
    router.push('/');
  };

  const showFavorites = () => {
    if (isFavorite) {
      showAllFavorites();
      return;
    }

    const favoriteIds: number[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key?.startsWith('food-')) {
        const foodId = Number(key.replace('food-', ''));

        if (!Number.isNaN(foodId)) {
          favoriteIds.push(foodId);
        }
      }
    }

    if (favoriteIds.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No favorites yet',
        text: 'You have not added any foods to your favorites yet.',
        background: '#0b1120',
        color: '#ffffff',
        confirmButtonColor: '#2563eb',
      });

      return;
    }

    setIsFavorit(true);

    const filter = favoriteIds.join(',');

    router.push(
      `/?filter=${filter}&page=${currentPage}&search=${searchParam}&category=${categoryParam}&sortBy=${sortByParam}`,
    );
  };

  return (
    <button
      onClick={showFavorites}
      type="button"
      className="
    group
    flex cursor-pointer items-center gap-3
    rounded-xl
    border border-[#C09721]/30
    bg-white
    p-3
    text-sm font-medium text-slate-900
    shadow-sm
    outline-none

    transition-all duration-200 ease-out

    hover:-translate-y-0.5
    hover:border-[#C09721]
    hover:bg-[#FFFCF5]
    hover:text-[#A77F18]
    hover:shadow-md
    hover:shadow-[#C09721]/15

    focus:border-[#C09721]
    focus:ring-4
    focus:ring-[#C09721]/10

    active:translate-y-0
    active:scale-[0.98]
  "
    >
      {isFavorite ? (
        <>
          <LayoutList
            size={19}
            className="
          transition-transform
          duration-200
          group-hover:scale-110
        "
          />

          <p>Visa alla</p>
        </>
      ) : (
        <>
          <Heart
            size={19}
            className="
          fill-current
          text-red-600
          transition-all
          duration-200
          group-hover:scale-110
          group-hover:text-red-500
        "
          />

          <p>Visa alla favoriter</p>
        </>
      )}
    </button>
  );
}
