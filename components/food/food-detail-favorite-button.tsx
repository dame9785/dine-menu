'use client';

import { Heart } from 'lucide-react';
import { useCallback, useSyncExternalStore } from 'react';
import { toast } from 'sonner';

type Props = {
  foodId: number;
};

export default function FavoriteDetailButton({ foodId }: Props) {
  const key = `food-${foodId}`;

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('favorite-change', callback);

    return () => {
      window.removeEventListener('favorite-change', callback);
    };
  }, []);

  const getSnapshot = useCallback(() => {
    return localStorage.getItem(key) !== null;
  }, [key]);

  const getServerSnapshot = useCallback(() => {
    return false;
  }, []);

  const isFavorite = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleFavorite = () => {
    if (isFavorite) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, String(foodId));
      toast.success('Tillgad som favorit');
    }

    window.dispatchEvent(new Event('favorite-change'));
  };

  return (
    <button
      type="button"
      onClick={handleFavorite}
      className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-xl transition hover:border-indigo-400/40 hover:bg-indigo-500/10"
      aria-label={isFavorite ? 'Ta bort favorit' : 'Lägg till favorit'}
    >
      {isFavorite ? (
        <Heart size={22} className="cursor-pointer fill-current text-red-500" />
      ) : (
        <Heart className="text-white-600 cursor-pointer" />
      )}
    </button>
  );
}
