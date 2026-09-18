'use client';

import { useState, useTransition, useEffect } from 'react';
import { toast } from 'sonner';

import { addMenuItem, updateMenuItem } from '@/actions/menu';
import { updateMenuSchema, addMenuSchema } from '@/schemas/menu';

import { CategoryViewModel } from '@/types/category';
import { MenuItemViewModel } from '@/types/menu';
import Image from 'next/image';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import Select from '@/components/ui/select';

import SubmitButton from '@/components/ui/submit-button';

type Props = {
  categories: CategoryViewModel[];
  menuItem: MenuItemViewModel | undefined;
  onOpenChange?: (open: boolean) => void;
};

type FormErrors = Record<string, string[]>;

export default function MenuForm({ menuItem, onOpenChange, categories }: Props) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(menuItem?.name ?? '');
  const [description, setDescription] = useState(menuItem?.description ?? '');
  const [price, setPrice] = useState(menuItem ? String(menuItem.price) : '');
  const [categoryId, setCategoryId] = useState(menuItem ? String(menuItem.categoryId) : '');

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(menuItem?.imageUrl ?? null);

  const isEditMode = !!menuItem;

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const resetForm = () => {
    if (menuItem) {
      setName(menuItem.name);
      setDescription(menuItem.description);
      setPrice(String(menuItem.price));
      setCategoryId(String(menuItem.categoryId));
      setImage(null);
      setImagePreview(menuItem.imageUrl);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setImage(null);
      setImagePreview(null);
    }

    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onOpenChange?.(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Revoke previous object URL
    if (imagePreview?.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    clearError('image');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValues = {
      name: name.trim(),
      description: description.trim(),
      price,
      categoryId,
      image,
    };

    const validate = isEditMode ? updateMenuSchema.safeParse(formValues) : addMenuSchema.safeParse(formValues);

    if (!validate.success) {
      setErrors(validate.error.flatten().fieldErrors);
      return;
    }

    // Skapa FormData först efter valideringen
    const formData = new FormData();

    formData.append('name', name.trim());
    formData.append('description', description.trim());
    formData.append('price', price);
    formData.append('categoryId', categoryId);

    if (image) {
      formData.append('image', image);
    }

    startTransition(async () => {
      try {
        const response = isEditMode ? await updateMenuItem(menuItem.id, formData) : await addMenuItem(formData);

        if (!response.success) {
          if (response.errors) {
            setErrors(response.errors);
          }

          toast.error(response.message);
          return;
        }

        toast.success(response.message, {
          duration: 1000,
        });

        handleClose();
      } catch (error) {
        console.error('Error on update or add menu item action', error);
        toast.error('Something went wrong..');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
          Name
        </label>

        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError('name');
          }}
          type="text"
          name="name"
          id="name"
          placeholder="e.g. Margherita Pizza"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />

        {errors.name?.[0] && (
          <p id="name-error" className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>

        <TextArea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearError('description');
          }}
          placeholder="Describe the dish..."
          rows={5}
          id="description"
          name="description"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />

        {errors.description?.[0] && (
          <p id="description-error" className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.description[0]}
          </p>
        )}
      </div>

      {/* Image */}
      <div>
        <label
          htmlFor={`image-${menuItem?.id ?? 'new'}`}
          className="relative flex h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-indigo-200 bg-slate-50 p-4 transition-all duration-200 focus-within:border-[#C09721] focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-[#C09721]"
        >
          {imagePreview ? (
            <Image
              fill
              src={imagePreview}
              alt="Preview of uploaded image"
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          ) : (
            <>
              <div className="mb-3 rounded-full bg-indigo-50 p-3 text-indigo-600">📷</div>
              <p className="text-sm font-medium text-slate-700">Upload image</p>
              <p className="mt-1 text-xs text-slate-400">PNG, JPG or WEBP</p>
            </>
          )}
        </label>

        <Input
          id={`image-${menuItem?.id ?? 'new'}`}
          type="file"
          name="image"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          className="hidden"
          aria-invalid={!!errors.image}
          aria-describedby={errors.image ? 'image-error' : undefined}
        />

        {errors.image?.[0] && (
          <p id="image-error" className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.image[0]}
          </p>
        )}
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-medium text-slate-700">
            Price (€)
          </label>
          <Input
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              clearError('price');
            }}
            id="price"
            type="number"
            name="price"
            min="0"
            step="0.01"
            placeholder="129"
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />

          {errors.price?.[0] && (
            <p id="price-error" className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.price[0]}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="categoryId" className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>

          <Select
            id="categoryId"
            value={categoryId}
            name="categoryId"
            aria-invalid={!!errors.categoryId}
            aria-describedby={errors.categoryId ? 'categoryId-error' : undefined}
            onChange={(e) => {
              setCategoryId(e.target.value);
              clearError('categoryId');
            }}
          >
            <option value="">Select</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          {errors.categoryId?.[0] && (
            <p id="categoryId-error" className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.categoryId[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 border-t border-slate-100 pt-5">
        <SubmitButton isLoading={isPending}>{isEditMode ? 'Update menu' : 'Save menu'}</SubmitButton>
      </div>
    </form>
  );
}
