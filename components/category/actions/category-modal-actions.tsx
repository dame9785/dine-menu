'use client';

import { useState } from 'react';

import AddAction from '@/components/category/actions/add-category-action';
import EditAction from '@/components/category/actions/edit-category-action';
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
      {isEditing ? <EditAction onClick={() => setIsOpen(true)} /> : <AddAction onClick={() => setIsOpen(true)} />}

      <Modal category={category} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
