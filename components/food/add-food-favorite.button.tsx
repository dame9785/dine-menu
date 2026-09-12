'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  foodId: number;
};

export default function FavoriteButton({ foodId }: Props) {
  const [isActive, setIsActive] = useState(false);

  const keyName = `food-${foodId}`;

  const checkExistingFood = (): boolean => {
    const item = localStorage.getItem(keyName);
    if (!item) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const isExsisting = checkExistingFood();
    if (isExsisting) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsActive(true);
    }
  }, [keyName]);

  const addFavorite = () => {
    const isExisting = checkExistingFood();

    if (isExisting) {
      setIsActive(false);
      localStorage.removeItem(keyName);
      return;
    }

    setIsActive(true);
    localStorage.setItem(keyName, foodId.toString());
  };

  return (
    <button
      onClick={addFavorite}
      type="button"
      className={`${isActive ? 'fill-red-500 text-red-500' : 'text-white'} cursor-pointer absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-red-500 backdrop-blur-sm transition hover:bg-black/60 hover:text-red-400`}
    >
      <Heart size={22} />
    </button>
  );
}
