'use client';

import { useState } from 'react';

import AddModalAction from '@/components/category/add-category-button';
import EditModalAction from '@/components/category/edit-category-button';
import Modal from '@/components/modals/category-modal';

import { CategoryViewModel } from '@/types/category';

type Props = {
  category?: CategoryViewModel;
};

export default function CategoryAction({ category }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditing = Boolean(category);

  return (
    <>
      {isEditing ? (
        <EditModalAction onClick={() => setIsOpen(true)} />
      ) : (
        <AddModalAction onClick={() => setIsOpen(true)} />
      )}

      <Modal category={category} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
