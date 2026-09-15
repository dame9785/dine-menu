'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  foodId: number;
  isDetail: boolean;
};

export default function FavoriteButton({ foodId, isDetail }: Props) {
  const [isActive, setIsActive] = useState(false);

  const keyName = `food-${foodId}`;

  const checkExistingFood = (): boolean => {
    return localStorage.getItem(keyName) !== null;
  };

  useEffect(() => {
    const isExisting = checkExistingFood();

    if (isExisting) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsActive(true);
    }
  }, [keyName]);

  const addFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Extra protection in case the button is ever placed inside a link
    event.preventDefault();
    event.stopPropagation();

    const isExisting = checkExistingFood();

    if (isExisting) {
      localStorage.removeItem(keyName);
      setIsActive(false);
      return;
    }

    localStorage.setItem(keyName, foodId.toString());
    setIsActive(true);
    toast.success('Tillagd bland favoriterna', { duration: 5000 });
  };

  return (
    <button
      type="button"
      onClick={addFavorite}
      className={
        isDetail
          ? 'cursor-pointer text-red-500 gap-2'
          : ` z-10 flex h-10 w-10 cursor-pointer items-center gap-2 justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition hover:bg-black/60 ${
              isActive ? 'text-red-500' : 'text-white hover:text-red-400'
            }`
      }
      aria-label={isActive ? 'Ta bort från favoriter' : 'Lägg till favorit'}
    >
      <Heart size={22} className={isActive ? 'fill-current' : ''} />
    </button>
  );
}
