'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { addFavorite, deleteFavorite } from '@/actions/menu';

type Props = {
  menuItemId: number;
  isFavorite: boolean;
};

export default function FavoriteButton({ menuItemId, isFavorite }: Props) {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const [isPending, setIsPending] = useState(false);

  const handleFavorite = async () => {
    if (isPending) return;

    const previousState = isFavoriteState;
    const newState = !previousState;

    // Optimistic update
    setIsFavoriteState(newState);
    setIsPending(true);

    try {
      const result = previousState ? await deleteFavorite(menuItemId) : await addFavorite(menuItemId);

      if (!result || !result.success) {
        setIsFavoriteState(previousState);

        toast.error(result?.message ?? 'Something went wrong');
        return;
      }

      toast.success(result.message, {
        duration: 1000,
      });
    } catch (error) {
      console.error('FAVORITE ERROR:', error);

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
      aria-label={isFavoriteState ? 'Ta bort från favoriter' : 'Lägg till favorit'}
      aria-pressed={isFavoriteState}
      title={isFavoriteState ? 'Remove from favorites' : 'Add to favorites'}
      className={`group relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ease-out ${
        isFavoriteState
          ? `border-[#C09721]/60 bg-[#2A2414]/95 shadow-[0_0_18px_rgba(192,151,33,0.12)]`
          : `border-[#C09721]/25 bg-[#181714]/90 hover:border-[#C09721]/70 hover:bg-[#2A2414] hover:shadow-[0_0_18px_rgba(192,151,33,0.12)]`
      } hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#C09721]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0E0B] focus-visible:outline-none active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {/* Subtle gold glow */}
      {isFavoriteState && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[#C09721]/5" />
      )}

      {/* Icon */}
      {isPending ? (
        <Loader2 size={18} strokeWidth={1.7} aria-hidden="true" className="animate-spin text-[#C09721]" />
      ) : (
        <Heart
          size={19}
          strokeWidth={1.7}
          aria-hidden="true"
          className={`relative transition-all duration-300 group-hover:scale-110 ${
            isFavoriteState ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#C09721]/80 group-hover:text-[#E5C76B]'
          } `}
        />
      )}
    </button>
  );
}
