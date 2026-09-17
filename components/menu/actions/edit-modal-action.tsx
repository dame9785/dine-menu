'use client';

import { Pencil } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export default function OpenModalEditMenuAction({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-600 transition hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18]"
    >
      <Pencil size={16} aria-hidden="true" />
      Update item
    </button>
  );
}
