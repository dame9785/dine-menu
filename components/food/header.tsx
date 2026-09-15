import Image from 'next/image';
import { Utensils } from 'lucide-react';

import AddFoodButton from './add-food-button';
import { CategoryViewModel } from '@/types/category';

type Props = {
  categories: CategoryViewModel[];
};

export default function Header({ categories }: Props) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Background image */}
      <div className="absolute inset-y-0 right-0 w-1/2">
        <Image fill src="/img/foods/header.jpg" alt="Maträtt" priority className="object-cover" sizes="50vw" />
        <div className="absolute to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-65 items-center justify-between px-8 py-8 md:px-10">
        <div>
          {/* Small label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5">
            <Utensils size={14} className="text-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Dine Menu</span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Menu</h1>
            <Utensils size={30} strokeWidth={2} className="text-indigo-600" />
          </div>

          <p className="mt-2 text-sm text-slate-500">Manage your restaurant menu</p>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
            Add, edit and organize your dishes. Keep your menu fresh and delicious for your customers.
          </p>
        </div>
      </div>
    </div>
  );
}
