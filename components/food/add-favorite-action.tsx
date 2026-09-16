'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  foodId: number;
};

export default function FavoriteButton({ foodId }: Props) {
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
      className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#C09721]/30 bg-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98]"

      aria-label={isActive ? 'Ta bort från favoriter' : 'Lägg till favorit'}
    >
      <Heart size={22} className={isActive ? 'fill-current text-red-600' : 'text-red-600'} />
    </button>
  );
}
