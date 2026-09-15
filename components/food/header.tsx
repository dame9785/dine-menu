import { Utensils } from 'lucide-react';

import AddFoodButton from './add-food-button';
import { CategoryViewModel } from '@/types/category';
import Image from 'next/image';

type Props = {
  categories: CategoryViewModel[];
};

export default function Header({ categories }: Props) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header image */}
      <div className="absolute inset-y-0 right-0 w-1/2">
        <Image
          fill
          src="/img/foods/header.jpg"
          alt="Image on food"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        {/* Fade image into background */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-65 items-center justify-between px-8 py-8 md:px-10">
        {/* Text */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Dine menu</h1>

            <Utensils size={30} strokeWidth={2} className="text-indigo-600" />
          </div>

          <p className="mt-2 text-l text-slate-500">Manage your restaurant menu</p>

          <p className="mt-4 max-w-md text-l leading-6 text-slate-500">
            Add, edit and organize your dishes. Keep your menu fresh and delicious for your customers.
          </p>
        </div>

        {/* Add food */}
        <div className="relative z-20 self-start">
          <AddFoodButton categories={categories} />
        </div>
      </div>
    </div>
  );
}
