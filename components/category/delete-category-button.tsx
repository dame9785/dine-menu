'use client';

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  categoryId: number;
  deleteCategory: (categoryId: number) => Promise<{
    success: boolean;
    message: string;
  }>;
};

export default function deleteCategoryButton({ categoryId, deleteCategory }: Props) {
  const handleDelete = async () => {
    toast('Are you sure you want to delete the category?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          const response = await deleteCategory(categoryId);

          if (response.success) {
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 backdrop-blur transition hover:border-red-500/50 hover:bg-orange-500/20"
    >
      <Trash2 size={16} />
      Delete
    </button>
  );
}
