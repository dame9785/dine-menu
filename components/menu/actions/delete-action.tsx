'use client';

import { useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  menuItemId: number;
  deleteMenuAction: (menuItemId: number) => Promise<{
    success: boolean;
    message: string;
  }>;
  onDeleted: () => void;
};

export default function DeleteMenuButton({ menuItemId, deleteMenuAction, onDeleted }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    toast('Are you sure you want to delete the menu?', {
      action: {
        label: 'Delete',
        onClick: () => {
          startTransition(async () => {
            await deleteAction();
          });
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const deleteAction = async () => {
    try {
      const response = await deleteMenuAction(menuItemId);
      console.log('RESP', response);
      if (response.success) {
        console.log('SUCCESS');
      } else {
        console.log('ERROR');
      }
      if (response.success) {
        onDeleted();
        toast.success(response.message, {
          duration: 1000,
        });
      } else {
        toast.error(response.message, {
          duration: 1000,
        });
      }
    } catch (error) {
      console.error('DELETE MENU ERROR:', error);
      toast.error('Something went wrong while deleting the menu.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}

      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
