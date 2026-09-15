'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { addFood, updateFood } from '@/actions/food';
import { updateFoodDataSchema, addFoodSchema } from '@/schemas/food';

import { CategoryViewModel } from '@/types/category';
import { FoodViewModel } from '@/types/food';

type Props = {
  categories: CategoryViewModel[];
  foodItem: FoodViewModel | undefined;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function FoodForm({ foodItem, onOpenChange, categories }: Props) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(foodItem?.name ?? '');
  const [description, setDescription] = useState(foodItem?.description ?? '');
  const [price, setPrice] = useState(foodItem ? String(foodItem.price) : '');
  const [categoryId, setCategoryId] = useState(foodItem ? String(foodItem.categoryId) : '');

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(foodItem?.imageUrl ?? null);

  const isEditMode = !!foodItem;

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };

      delete newErrors[field];

      return newErrors;
    });
  };

  const resetForm = () => {
    if (foodItem) {
      setName(foodItem.name);
      setDescription(foodItem.description);
      setPrice(String(foodItem.price));
      setCategoryId(String(foodItem.categoryId));
      setImage(null);
      setImagePreview(foodItem.imageUrl);
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

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);

    if (image) {
      formData.append('image', image);
    }

    startTransition(async () => {
      const validate = isEditMode
        ? updateFoodDataSchema.safeParse({
            name,
            description,
            price: Number(price),
            categoryId: Number(categoryId),
            ...(image ? { image } : {}),
          })
        : addFoodSchema.safeParse({
            name,
            description,
            price: Number(price),
            categoryId: Number(categoryId),
            image,
          });

      if (!validate.success) {
        setErrors(validate.error.flatten().fieldErrors);
        return;
      }

      const response = isEditMode ? await updateFood(foodItem.id, formData) : await addFood(formData);
      console.log(response);

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
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>

        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError('name');
          }}
          type="text"
          placeholder="e.g. Margherita Pizza"
          className="
           w-full cursor-text rounded-xl
              border border-slate-200 bg-white
              px-4 py-2.5 text-sm text-slate-900
              shadow-sm outline-none transition-all duration-200
           
              hover:border-indigo-50
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-500/10
                placeholder:text-base

          "
        />

        {errors.name?.[0] && (
          <p id="name-error" className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>

        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearError('description');
          }}
          placeholder="Describe the dish..."
          rows={3}
          className="
            w-full cursor-text rounded-xl
              border border-slate-200 bg-white
              px-4 py-2.5 text-sm text-slate-900
              shadow-sm outline-none transition-all duration-200
              placeholder:text-slate-400
              hover:border-indigo-50
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-500/10
                placeholder:text-base
  placeholder:text-slate-400
          "
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
          htmlFor={`image-${foodItem?.id ?? 'new'}`}
          className="
            flex min-h-48 cursor-pointer flex-col
            items-center justify-center
            overflow-hidden rounded-xl
              border
            border border-dashed border-indigo-200
            bg-slate-50
            p-4
            transition-all duration-200
            
             hover:border-indigo-50
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-500/10
                placeholder:text-base
  placeholder:text-slate-400
          "
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Food preview" className="h-48 w-full rounded-lg object-cover" />
          ) : (
            <>
              <div className="mb-3 rounded-full bg-indigo-50 p-3 text-indigo-600">📷</div>
              <p className="text-sm font-medium text-slate-700">Upload food image</p>
              <p className="mt-1 text-xs text-slate-400">PNG, JPG or WEBP</p>
            </>
          )}
        </label>

        <input
          id={`image-${foodItem?.id ?? 'new'}`}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          className="hidden"
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
          <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>

          <input
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              clearError('price');
            }}
            type="number"
            min="0"
            step="0.01"
            placeholder="129"
            className="
              w-full cursor-text rounded-xl
              border border-slate-200 bg-white
              px-4 py-2.5 text-sm text-slate-900
              shadow-sm outline-none transition-all duration-200
              placeholder:text-slate-400
              hover:border-indigo-50
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-500/10
                placeholder:text-base
  placeholder:text-slate-400
            "
          />

          {errors.price?.[0] && (
            <p id="price-error" className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.price[0]}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>

          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              clearError('categoryId');
            }}
            className="
              w-full cursor-pointer rounded-xl
              border border-slate-200 bg-white
              px-4 py-2.5 text-sm text-slate-900
              shadow-sm outline-none transition-all duration-200
              hover:border-slate-300
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-500/10
                placeholder:text-base
  placeholder:text-slate-400
            "
          >
            <option value="">Select</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId?.[0] && (
            <p id="categoryId-error" className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.categoryId[0]}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 border-t border-slate-100 pt-5">
        {/* Cancel */}
        <button
          type="button"
          onClick={handleClose}
          className="
            w-full cursor-pointer rounded-xl
            border border-slate-200 bg-white
            px-4 py-2.5
            text-sm font-medium text-slate-600
            shadow-sm transition-all duration-200
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
            w-full cursor-pointer rounded-xl
            border border-indigo-600
            bg-indigo-600
            px-4 py-2.5
            text-sm font-medium text-white
            shadow-sm transition-all duration-200
            hover:border-indigo-700
            hover:bg-indigo-700
            hover:shadow-lg
            hover:shadow-indigo-500/20
            disabled:cursor-not-allowed
            disabled:opacity-60
            active:scale-[0.98]
          "
        >
          {isPending ? (isEditMode ? 'Updating...' : 'Adding...') : isEditMode ? 'Update food' : 'Add food'}
        </button>
      </div>
    </form>
  );
}
