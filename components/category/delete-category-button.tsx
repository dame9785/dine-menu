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
      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98]"
    >
      <Trash2 size={16} className="text-red-600" />
      Delete
    </button>
  );
}
