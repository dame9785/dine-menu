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
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-800 bg-[#0b1120] p-2 text-slate-500 hover:border-slate-700 hover:text-white"
    >
      {isFavorite ? (
        <>
          <LayoutList />
          <p>Visa alla</p>
        </>
      ) : (
        <>
          <Heart className="fill-current text-red-600" />
          <p>Visa alla favoriter</p>
        </>
      )}
    </button>
  );
}
