'use client';

import { Pencil } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export default function EditFoodButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex items-center gap-2
        rounded-lg
        border border-orange-500/30
        bg-orange-500/10
        px-4 py-2
        text-sm font-medium
        backdrop-blur
        transition

        hover:border-orange-500/50
        hover:bg-orange-500/20

        focus:outline-none
        focus:ring-4
        focus:ring-orange-500/10
      "
    >
      <Pencil size={16} aria-hidden="true" />

      <span>Update food item</span>
    </button>
  );
}
