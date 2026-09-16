import { createCategory, updateCategory } from '@/actions/category';
import { createCategorySchema, updateCategorySchema } from '@/schemas/category';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { CategoryViewModel } from '@/types/category';

type Props = {
  category?: CategoryViewModel;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function AddCategoryForm({ category, onOpenChange }: Props) {
  const [name, setName] = useState(category?.name ?? '');
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const isEditMode = !!category;

  const resetForm = () => {
    if (category) {
      setName(category.name);
    } else {
      setName('');
    }

    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onOpenChange?.(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const validate = isEditMode
        ? updateCategorySchema.safeParse({
            name,
          })
        : createCategorySchema.safeParse({
            name,
          });

      if (!validate.success) {
        setErrors(validate.error.flatten().fieldErrors);
        return;
      }

      const response = isEditMode
        ? await updateCategory(validate.data, category.id)
        : await createCategory(validate.data);

      if (!response) {
        toast.error('Något gick fel');
        return;
      }

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message, {
        duration: 1000,
      });

      handleClose();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6">
      <div>
        <label htmlFor="category-name" className="mb-2 block text-sm font-semibold text-slate-700">
          Name
        </label>

        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Breakfast"
          className="w-full cursor-text rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm transition-all duration-200 outline-none placeholder:text-base placeholder:text-slate-700 hover:border-slate-300 hover:bg-white focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        ></input>

        {errors.name?.[0] && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-3 border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer rounded-xl border border-[#C09721]/30 bg-white p-3 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98]"
        >
          {isPending ? (isEditMode ? 'Updating...' : 'Adding...') : isEditMode ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}
