import { createCategory, updateCategory } from '@/actions/category';
import { createCategorySchema, updateCategorySchema } from '@/schemas/category';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { CategoryViewModel } from '@/types/category';
import Input from '../ui/input';
import SubmitButton from '../ui/submit-button';
import FormField from '../ui/form-field';

type Props = {
  category?: CategoryViewModel;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type FormErrors = Record<string, string[]>;

export default function AddCategoryForm({ category, onOpenChange }: Props) {
  const [name, setName] = useState(category?.name ?? '');
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({});

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

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };

      delete next[field];

      return next;
    });
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
        toast.error('Something went wrong...');
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
      <FormField label="Category name" htmlFor="name" error={errors.name?.[0]}>
        <Input
          id="name"
          name="name"
          type="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearError('name');
          }}
          placeholder="Enter category name"
          autoComplete="name"
          disabled={isPending}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
      </FormField>

      {/* Submit */}
      <div className="flex gap-3 border-t border-slate-100 pt-5">
        <SubmitButton disabled={isPending}>{isPending ? 'Updating...' : 'Adding'}</SubmitButton>
      </div>
    </form>
  );
}
