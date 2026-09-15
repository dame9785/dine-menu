'use client';

import { useState } from 'react';

import { CategoryViewModel } from '@/types/category';
import Modal from '@/components/category/modal';

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
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400 backdrop-blur transition hover:border-orange-500/50 hover:bg-orange-500/20"
      >
        Edit
      </button>

      <Modal category={category} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
