'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';

type Props = {
  onEdit: () => void;
  onCloseMenu: () => void;
};

export default function UpdateFoodButton({ onEdit, onCloseMenu }: Props) {
  const handleEdit = () => {
    onEdit();
    onCloseMenu();
  };

  return (
    <button
      type="button"
      onClick={handleEdit}
      className="
        flex w-full cursor-pointer items-center gap-2
        px-4 py-3
        text-left text-sm font-medium
        text-black
        transition
        hover:bg-indigo-50
      "
    >
      <Pencil size={16} />
      Edit
    </button>
  );
}
