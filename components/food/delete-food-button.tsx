import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  foodId: number;
  deleteFoodAction: (foodId: number) => Promise<{
    success: boolean;
    message: string;
  }>;
};

export default function DeleteFoodButton({ foodId, deleteFoodAction }: Props) {
  const handleDelete = () => {
    toast('Are you sure you want to delete the food?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          const response = await deleteFoodAction(foodId);

          if (response.success) {
            toast.success(response.message, {
              duration: 1000,
            });
          } else {
            toast.error(response.message, {
              duration: 1000,
            });
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
      className="cursor-pointer flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
    >
      <Trash2 size={16} />
      Delete
    </button>
  );
}
