'use client';

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
      onClick={handleDelete}
      className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/10 cursor-pointer"
    >
      Delete
    </button>
  );
}
