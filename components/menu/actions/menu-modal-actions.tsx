'use client';

import { useState } from 'react';

import AddModalAction from '@/components/menu/actions/menu-modal-add-action';
import EditModalAction from '@/components/menu/actions/edit-modal-action';
import Modal from '@/components/modals/menu-modal';

import { CategoryViewModel } from '@/types/category';
import { MenuItemViewModel } from '@/types/menu';

type Props = {
  categories: CategoryViewModel[];
  menuItemId?: MenuItemViewModel;
};

export default function MenuActions({ categories, menuItemId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const isEditing = Boolean(menuItemId);

  return (
    <>
      {isEditing ? (
        <EditModalAction onClick={() => setIsOpen(true)} />
      ) : (
        <AddModalAction onClick={() => setIsOpen(true)} />
      )}

      <Modal menuItemId={menuItemId} categories={categories} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
