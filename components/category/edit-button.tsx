'use client';

import { useState } from 'react';

import { CategoryViewModel } from '@/types/category';

type Props = {
  category: CategoryViewModel;
};

export default function EditButton({ category }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-2 border border-[#A77F18] bg-[#C09721] text-white hover:-translate-y-0.5 hover:bg-[#A77F18] hover:shadow-lg hover:shadow-[#C09721]/20 active:translate-y-0 active:scale-[0.98]"
      >
        Edit
      </button>
    </>
  );
}
