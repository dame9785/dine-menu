'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ImagePlus } from 'lucide-react';

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
      {/* Name */}
      <div>
        <label htmlFor="food-name" className="mb-2 block text-sm font-semibold text-slate-700">
          Name
        </label>

        <input
          id="food-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError('name');
          }}
          type="text"
          placeholder="e.g. Margherita Pizza"
          className="
            w-full
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
            placeholder:text-slate-400

            hover:border-slate-300
            hover:bg-white

            focus:border-indigo-500
            focus:bg-white
            focus:ring-4
            focus:ring-indigo-500/10
          "
        />

        {errors.name?.[0] && (
          <p className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="food-description" className="mb-2 block text-sm font-semibold text-slate-700">
          Description
        </label>

        <textarea
          id="food-description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearError('description');
          }}
          placeholder="Describe the dish..."
          rows={4}
          className="
            w-full
            resize-none
            cursor-text
            rounded-xl
            border border-slate-200
            bg-slate-50
            px-4 py-3
            text-sm
            leading-6
            text-slate-900
            shadow-sm
            outline-none
            transition-all duration-200

            placeholder:text-base
            placeholder:text-slate-400

            hover:border-slate-300
            hover:bg-white

            focus:border-indigo-500
            focus:bg-white
            focus:ring-4
            focus:ring-indigo-500/10
          "
        />

        {errors.description?.[0] && (
          <p className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.description[0]}
          </p>
        )}
      </div>

      {/* Image */}
      <div>
        <label
          htmlFor={`image-${foodItem?.id ?? 'new'}`}
          className="
            group
            flex
            min-h-52
            cursor-pointer
            flex-col
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            border
            border-dashed
            border-slate-300
            bg-slate-50
            p-4
            transition-all duration-200

            hover:border-indigo-300
            hover:bg-indigo-50/30
          "
        >
          {imagePreview ? (
            <div className="relative w-full">
              <img
                src={imagePreview}
                alt="Food preview"
                className="
                  h-52
                  w-full
                  rounded-lg
                  object-cover
                  shadow-sm
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-slate-900/40
                  opacity-0
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                "
              >
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-lg">
                  Change image
                </span>
              </div>
            </div>
          ) : (
            <>
              <div
                className="
                  mb-3
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-50
                  text-indigo-600
                  transition-transform
                  duration-200
                  group-hover:scale-105
                "
              >
                <ImagePlus size={22} />
              </div>

              <p className="text-sm font-semibold text-slate-700">Upload food image</p>

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
          <p className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.image[0]}
          </p>
        )}
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Price */}
        <div>
          <label htmlFor="food-price" className="mb-2 block text-sm font-semibold text-slate-700">
            Price
          </label>

          <div className="relative">
            <input
              id="food-price"
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
                w-full
                cursor-text
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                pr-12
                text-sm
                text-slate-900
                shadow-sm
                outline-none
                transition-all duration-200

                placeholder:text-base
                placeholder:text-slate-400

                hover:border-slate-300
                hover:bg-white

                focus:border-indigo-500
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-500/10
              "
            />

            <span
              className="
                pointer-events-none
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sm
                font-medium
                text-slate-400
              "
            >
              €
            </span>
          </div>

          {errors.price?.[0] && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.price[0]}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="food-category" className="mb-2 block text-sm font-semibold text-slate-700">
            Category
          </label>

          <select
            id="food-category"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              clearError('categoryId');
            }}
            className="
              w-full
              cursor-pointer
              rounded-xl
              border border-slate-200
              bg-slate-50
              px-4 py-3
              text-sm
              font-medium
              text-slate-700
              shadow-sm
              outline-none
              transition-all duration-200

              hover:border-slate-300
              hover:bg-white

              focus:border-indigo-500
              focus:bg-white
              focus:ring-4
              focus:ring-indigo-500/10
            "
          >
            <option value="">Select category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId?.[0] && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.categoryId[0]}
            </p>
          )}
        </div>
      </div>

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
          onClick={handleClose}
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
          {isPending ? (isEditMode ? 'Updating...' : 'Adding...') : isEditMode ? 'Update food' : 'Add food'}
        </button>
      </div>
    </form>
  );
}
