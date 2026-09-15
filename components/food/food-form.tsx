import { addFood, updateFood } from '@/actions/food';
import { addFoodSchema } from '@/schemas/food';
import { CategoryViewModel } from '@/types/category';
import { FoodViewModel } from '@/types/food';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Revoke previous object URL if there is one
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
      const validate = addFoodSchema.safeParse({
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

      toast.success(response.message);
      handleClose();
    });
  };

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

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      {/* Name */}
      <div className="form-group">
        <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>

        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError('name');
          }}
          type="text"
          placeholder="e.g. Margherita Pizza"
          className="w-full rounded-lg border border-slate-800 bg-[#05070d] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />

        {errors.name?.[0] && (
          <p id="name-error" className="text-red-500" role="alert">
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="mb-2 block text-sm font-medium text-slate-300">Description</label>

        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearError('description');
          }}
          placeholder="Describe the dish..."
          rows={3}
          className="w-full resize-none rounded-lg border border-slate-800 bg-[#05070d] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />

        {errors.description?.[0] && (
          <p id="description-error" className="text-red-500" role="alert">
            {errors.description[0]}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="form-group">
        <label
          htmlFor={`image-${foodItem?.id ?? 'new'}`}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#05070d] p-6 transition hover:border-blue-500 hover:bg-blue-500/5"
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Food preview" className="h-48 w-full rounded-lg object-cover" />
          ) : (
            <>
              <div className="mb-3 rounded-full bg-blue-500/10 p-3 text-blue-400">📷</div>

              <p className="text-sm font-medium text-white">Upload food image</p>

              <p className="mt-1 text-xs text-slate-500">PNG, JPG or WEBP</p>
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
          <p id="image-error" className="text-red-500" role="alert">
            {errors.image[0]}
          </p>
        )}
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Price</label>

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
            className="w-full rounded-lg border border-slate-800 bg-[#05070d] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />

          {errors.price?.[0] && (
            <p id="price-error" className="text-red-500" role="alert">
              {errors.price[0]}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Category</label>

          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              clearError('categoryId');
            }}
            className="w-full rounded-lg border border-slate-800 bg-[#05070d] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="">Select</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId?.[0] && (
            <p id="categoryId-error" className="text-red-500" role="alert">
              {errors.categoryId[0]}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
        <button
          type="button"
          onClick={handleClose}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (isEditMode ? 'Updating...' : 'Adding...') : isEditMode ? 'Update food' : 'Add food'}
        </button>
      </div>
    </form>
  );
}
