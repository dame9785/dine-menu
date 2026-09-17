'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { addFavorite, deleteFavorite } from '@/actions/food';
import { toast } from 'sonner';

type Props = {
  foodId: number;
  isFavorite: boolean;
};

export default function FavoriteButton({ foodId, isFavorite }: Props) {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const [isPending, setIsPending] = useState(false);

  const handleFavorite = async () => {
    if (isPending) return;

    const previousState = isFavoriteState;
    const newState = !previousState;

    // Uppdatera hjärtat direkt
    setIsFavoriteState(newState);
    setIsPending(true);

    try {
      const result = previousState ? await deleteFavorite(foodId) : await addFavorite(foodId);

      if (!result || !result.success) {
        // Återställ om serveranropet misslyckas
        setIsFavoriteState(previousState);

        toast.error(result?.message ?? 'Something went wrong');
        return;
      }

      toast.success(result.message, {
        duration: 1000,
      });
    } catch (error) {
      console.error('FAVORITE ERROR:', error);

      // Återställ vid fel
      setIsFavoriteState(previousState);

      toast.error('Something went wrong');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFavorite}
      disabled={isPending}
      className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#C09721]/30 bg-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      aria-label={isFavoriteState ? 'Ta bort från favoriter' : 'Lägg till favorit'}
    >
      {isPending ? (
        <Loader2 size={20} className="animate-spin text-red-600" />
      ) : (
        <Heart size={22} className={isFavoriteState ? 'fill-current text-red-600' : 'text-red-600'} />
      )}
    </button>
  );
}
