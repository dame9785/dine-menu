'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import type { CategoryViewModel } from '@/types/category';
import { createCategory, updateCategory } from '@/actions/category';
import { CategoryDto, createCategorySchema } from '@/schemas/category';

type Props = {
  category?: CategoryViewModel;
};

export default function CategoryModal({ category }: Props) {
  const [isOpen, setIsOpen] = useState(false);
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
          name: name,
        };

        //Validation with zod
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
        setIsOpen(false);
      } else {
        const dto: CategoryDto = {
          name: name,
        };

        const validate = createCategorySchema.safeParse(dto);
        if (!validate.success) {
          setErrors(validate.error.flatten().fieldErrors);
          return;
        }

        const response = await createCategory(validate.data);
        if (!response.success) {
          toast.error(response?.message);
          return;
        }

        toast.success(response.message);
        setName('');
        setIsOpen(false);
      }
    });
  };

  const handleOpen = () => {
    setName(category?.name ?? '');
    setIsOpen(true);
  };

  return (
    <>
      {/* Displays depending on whether it is editing or creating. */}
      {isEdit ? (
        <button
          type="button"
          onClick={handleOpen}
          className="cursor-pointer rounded-lg border border-blue-500/30 px-3 py-1.5 text-sm text-blue-400 transition hover:bg-blue-500/10"
        >
          Edit
        </button>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          + Create category
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{isEdit ? 'Edit category' : 'Create category'}</h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-xl text-zinc-400 transition hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category-name" className="mb-2 block text-sm font-medium text-zinc-300">
                  Category name
                </label>

                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Breakfast"
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500"
                />
                {errors.name?.[0] && (
                  <p id="name-error" className="text-red-500" role="alert">
                    {errors.name[0]}
                  </p>
                )}
              </div>

              {/* Buttons actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? 'Saving...' : isEdit ? 'Save changes' : 'Create category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
