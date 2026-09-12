'use client';

import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function FavoriteFilterButton() {
  const router = useRouter();

  const showFavorites = () => {
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

    const filter = favoriteIds.join(',');
    if (favoriteIds.length <= 0) {
      Swal.fire({
        icon: 'info',
        title: 'No favorites yet',
        text: 'You have not added any foods to your favorites yet.',
        background: '#0b1120',
        color: '#ffffff',
        confirmButtonColor: '#2563eb',
      });
    }

    router.push(`/?filter=${filter}`);
  };

  return (
    <button
      onClick={showFavorites}
      type="button"
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-800 bg-[#0b1120] p-2 text-slate-500 hover:border-slate-700 hover:text-white"
    >
      <Heart className="text-red-600" />
      Show all favorites
    </button>
  );
}
