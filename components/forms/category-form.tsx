import { createCategory, updateCategory } from '@/actions/category';
import { createCategorySchema, updateCategorySchema } from '@/schemas/category';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { CategoryViewModel } from '@/types/category';
import Input from '../ui/input';
import SubmitButton from '../ui/submit-button';

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

      console.log(response);

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
        <label htmlFor="category-name" className="mb-2 block text-sm font-medium text-slate-700">
          Name
        </label>

        <Input
          id="category-name"
          type="text"
          name="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Breakfast"
        />

        {errors.name?.[0] && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-3 border-t border-slate-100 pt-5">
        <SubmitButton>
          {isPending ? (isEditMode ? 'Updating...' : 'Adding...') : isEditMode ? 'Update' : 'Add'}
        </SubmitButton>
      </div>
    </form>
  );
}
