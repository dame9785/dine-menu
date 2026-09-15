import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Utensils } from 'lucide-react';

import AddFavoritFoodButton from '@/components/food/favorite-button';
import EditFoodButton from '@/components/food/edit-food-button';

import { FoodService } from '@/services/food';
import { CategoryService } from '@/services/category';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FoodDetail({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const foodService = new FoodService();
  const categoryService = new CategoryService();

  const [foodResponse, categoryResponse] = await Promise.all([foodService.getById(id), categoryService.getAll(1)]);

  if (!foodResponse.data) {
    return notFound();
  }

  const foodItem = foodResponse.data;
  const categories = categoryResponse.data ?? [];

  return (
    <section className="mx-auto max-w-6xl">
      {/* Back */}
      <div className="mb-6">
        <Link
          href="/"
          className="
            group inline-flex items-center gap-2
            rounded-lg px-2 py-1.5
            text-sm font-medium text-slate-500
            transition-all duration-200
            hover:bg-white
            hover:text-indigo-600
            hover:shadow-sm
          "
        >
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back to menu
        </Link>
      </div>

      {/* Main card */}
      <div
        className="
          relative overflow-hidden rounded-3xl
          border border-slate-200
          bg-white
          shadow-xl shadow-slate-200/60
        "
      >
        {/* Edit */}
        <div className="absolute right-5 top-5 z-30">
          <EditFoodButton foodItem={foodItem} categories={categories} />
        </div>

        <div className="grid md:grid-cols-2">
          {/* IMAGE */}
          <div className="relative min-h-[360px] md:min-h-[620px]">
            {foodItem.imageUrl ? (
              <Image
                fill
                src={foodItem.imageUrl}
                alt={foodItem.name}
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-100">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Utensils size={24} className="text-slate-400" />
                  </div>

                  <p className="text-sm font-medium text-slate-500">No image available</p>
                </div>
              </div>
            )}

            {/* Image overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

            {/* Category */}
            <div className="absolute left-6 top-6">
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                 border-indigo-100 bg-indigo-50
                  px-4 py-2
                  shadow-lg
                  backdrop-blur-md
                "
              >
                <Utensils size={15} className="text-indigo-600" />

                <span className="font-semibold uppercase tracking-wider text-sm text-indigo-600">
                  {foodItem.category}
                </span>
              </div>
            </div>

            {/* Image bottom label */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Dine Menu</p>

              <p className="mt-1 text-sm font-medium text-white/90">Fresh from our kitchen</p>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="flex flex-col justify-center p-7 md:p-12">
            {/* Label */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />

              <span
                className="
                  text-xs font-bold uppercase
                  tracking-[0.2em] text-indigo-600
                "
              >
                Our menu
              </span>
            </div>

            {/* Title */}
            <h1
              className="
                max-w-xl
                text-4xl font-bold
                tracking-tight text-slate-900
                md:text-5xl
              "
            >
              {foodItem.name}
            </h1>

            {/* Description */}
            <p
              className="
                mt-5 max-w-xl
                text-base leading-7
                text-slate-500
                md:text-lg
              "
            >
              {foodItem.description}
            </p>

            {/* Divider */}
            <div className="my-8 h-px bg-slate-100" />

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div
                className="
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  p-5
                "
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Utensils size={17} className="text-indigo-600" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category</p>

                <p className="mt-1 text-base font-semibold text-slate-900">{foodItem.category}</p>
              </div>

              {/* Price */}
              <div
                className="
                  rounded-2xl
                  border border-indigo-100
                  bg-indigo-50/60
                  p-5
                "
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Price</p>

                <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  {Number(foodItem.price).toFixed(2)} €
                </p>
              </div>
            </div>

            {/* Favorite */}
            <div className="mt-8">
              <div
                className="
                  flex items-center justify-between
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                "
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                    <Heart size={19} className="fill-red-500 text-red-500" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">Add to favorites</p>

                    <p className="text-xs text-slate-400">Save this dish for later</p>
                  </div>
                </div>

                <AddFavoritFoodButton foodId={foodItem.id} isDetail={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
