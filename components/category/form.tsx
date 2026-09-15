import { createCategory, updateCategory } from '@/actions/category';
import { CategoryDto, createCategorySchema } from '@/schemas/category';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { CategoryViewModel } from '@/types/category';

type Props = {
  onClose: () => void;
  category: CategoryViewModel | undefined;
};

export default function AddCategoryForm({ onClose, category }: Props) {
  const [name, setName] = useState(category?.name ?? '');
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const isEdit = !!category;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      if (isEdit) {
        const dto: CategoryDto = {
          id: category.id,
          name,
        };

        const validate = createCategorySchema.safeParse(dto);

        if (!validate.success) {
          setErrors(validate.error.flatten().fieldErrors);
          return;
        }

        const response = await updateCategory(validate.data);

        if (!response?.success) {
          toast.error(response?.message);
          return;
        }

        toast.success(response.message);

        onClose();
      } else {
        const dto: CategoryDto = {
          name,
        };

        const validate = createCategorySchema.safeParse(dto);

        if (!validate.success) {
          setErrors(validate.error.flatten().fieldErrors);
          return;
        }

        const response = await createCategory(validate.data);

        if (!response.success) {
          toast.error(response.message);
          return;
        }

        toast.success(response.message);

        setName('');
        onClose();
      }
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
          className="w-full
            cursor-text
            rounded-xl
            border border-slate-200
            bg-slate-50
            px-4 py-3
            text-sm
            text-slate-900
            shadow-sm
            outline-none
            transition-all duration-200

            placeholder:text-base
            placeholder:text-slate-700

            hover:border-slate-300
            hover:bg-white

            focus:border-indigo-500
            focus:bg-white
            focus:ring-4
            focus:ring-indigo-500/10"
        ></input>

        {errors.name?.[0] && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Actions */}
      {/* Buttons */}
      <div
        className="
          flex
          gap-3
          border-t
          border-slate-100
          pt-5
        "
      >
        {/* Cancel */}
        <button
          type="button"
          onClick={onClose}
          className="
            w-full
            cursor-pointer
            rounded-xl
            border border-slate-200
            bg-white
            px-4 py-3
            text-sm
            font-semibold
            text-slate-600
            shadow-sm
            transition-all duration-200

            hover:border-slate-300
            hover:bg-slate-50
            hover:text-slate-900

            active:scale-[0.98]
          "
        >
          Cancel
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="
            w-full
            cursor-pointer
            rounded-xl
            border border-indigo-600
            bg-indigo-600
            px-4 py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all duration-200

            hover:-translate-y-0.5
            hover:border-indigo-700
            hover:bg-indigo-700
            hover:shadow-lg
            hover:shadow-indigo-500/20

            disabled:cursor-not-allowed
            disabled:opacity-60

            active:translate-y-0
            active:scale-[0.98]
          "
        >
          {isPending ? (isEdit ? 'Updating...' : 'Adding...') : isEdit ? 'Update food' : 'Add food'}
        </button>
      </div>
    </form>
  );
}
