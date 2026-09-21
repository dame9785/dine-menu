'use client';

import { useState, useTransition, useEffect } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

import { addMenuItem, updateMenuItem } from '@/actions/menu';
import { updateMenuSchema, addMenuSchema } from '@/schemas/menu';

import { CategoryViewModel } from '@/types/category';
import { MenuItemViewModel } from '@/types/menu';

import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import Select from '@/components/ui/select';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '../ui/form-field';

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
    setErrors((previous) => {
      const next = { ...previous };
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (imagePreview?.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    clearError('image');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});

    const formValues = {
      name: name.trim(),
      description: description.trim(),
      price,
      categoryId,
      image,
    };

    const validation = isEditMode ? updateMenuSchema.safeParse(formValues) : addMenuSchema.safeParse(formValues);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    const validatedData = validation.data;

    const formData = new FormData();

    formData.append('name', validatedData.name);
    formData.append('description', validatedData.description);
    formData.append('price', String(validatedData.price));
    formData.append('categoryId', String(validatedData.categoryId));

    if (validatedData.image instanceof File) {
      formData.append('image', validatedData.image);
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
        console.error('Error adding or updating menu item:', error);

        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      {/* Name */}
      <FormField label="name" htmlFor="name" error={errors.name?.[0]}>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearError('name');
          }}
          placeholder="Enter name"
          autoComplete="name"
          disabled={isPending}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
      </FormField>

      {/* Description */}
      <FormField label="description" htmlFor="description" error={errors.description?.[0]}>
        <TextArea
          id="description"
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            clearError('description');
          }}
          placeholder="Enter description"
          disabled={isPending}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
      </FormField>

      {/* Image */}
      <FormField label="Image" htmlFor={`image-${menuItem?.id ?? 'new'}`} error={errors.image?.[0]}>
        <div className="group relative h-56 overflow-hidden rounded-xl border border-dashed border-[#C09721]/30 bg-[#181714] shadow-[inset_0_0_25px_rgba(0,0,0,0.18)] transition-all duration-300 focus-within:border-[#C09721] focus-within:shadow-[0_0_0_3px_rgba(192,151,33,0.12)] hover:border-[#C09721]/80 hover:bg-[#24200F] hover:shadow-[0_0_22px_rgba(192,151,33,0.08)]">
          <label
            htmlFor={`image-${menuItem?.id ?? 'new'}`}
            className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center p-4"
          >
            {imagePreview ? (
              <>
                <Image
                  fill
                  src={imagePreview}
                  alt="Preview of uploaded image"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 448px"
                />

                {/* Preview overlay */}
                <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/50" />

                {/* Preview text */}
                <div className="relative z-10 rounded-xl border border-white/20 bg-black/50 px-4 py-2 text-center backdrop-blur-md">
                  <p className="text-xs font-semibold tracking-wide text-white">Change image</p>

                  <p className="mt-1 text-[10px] tracking-wide text-white/60">Click to select another file</p>
                </div>
              </>
            ) : (
              <>
                {/* Upload icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#C09721]/30 bg-[#24200F] text-[#C09721] shadow-[0_0_18px_rgba(192,151,33,0.08)] transition-all duration-300 group-hover:border-[#C09721]/70 group-hover:bg-[#302710] group-hover:shadow-[0_0_24px_rgba(192,151,33,0.15)]">
                  <span className="text-lg">📷</span>
                </div>

                {/* Upload title */}
                <p className="text-sm font-semibold tracking-wide text-[#E8E4D8]">Upload image</p>

                {/* Supported formats */}
                <p className="mt-1 text-xs tracking-wide text-[#777267]">PNG, JPG or WEBP</p>

                {/* Browse hint */}
                <p className="mt-3 text-[10px] tracking-[0.16em] text-[#C09721]/70 uppercase">Click to browse</p>
              </>
            )}
          </label>

          {/* File input */}
          <Input
            id={`image-${menuItem?.id ?? 'new'}`}
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImageChange}
            className="hidden"
            disabled={isPending}
            aria-invalid={!!errors.image}
            aria-describedby={errors.image ? 'image-error' : undefined}
          />
        </div>

        {imagePreview && (
          <p className="mt-2 text-xs tracking-wide text-[#777267]">Click the image to select another file.</p>
        )}
      </FormField>

      {/* Price and Category */}
      <div className="grid grid-cols-2 gap-4">
        {/* Price */}
        <FormField label="price" htmlFor="price" error={errors.price?.[0]}>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
              clearError('price');
            }}
            placeholder="Enter price"
            disabled={isPending}
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />
        </FormField>

        {/* Category */}
        <FormField label="Category" htmlFor="categoryId" error={errors.categoryId?.[0]}>
          <Select
            id="categoryId"
            name="categoryId"
            value={categoryId}
            disabled={isPending}
            onChange={(event) => {
              setCategoryId(event.target.value);
              clearError('categoryId');
            }}
            aria-invalid={!!errors.categoryId}
            aria-describedby={errors.categoryId ? 'categoryId-error' : undefined}
          >
            <option value="">Select category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      {/* Submit */}
      <div className="border-slate-100 pt-5">
        <SubmitButton isLoading={isPending}>{isEditMode ? 'Update menu' : 'Save menu'}</SubmitButton>
      </div>
    </form>
  );
}
