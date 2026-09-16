import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { FoodService } from '@/services/food';
import { CategoryService } from '@/services/category';

import DetailCard from '@/components/food/detail-card';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FoodDetailPage({ params }: Props) {
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
      <div className="mb-6 w-40">
        <Link
          href="/"
          className="group text-l flex cursor-pointer items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 font-medium text-slate-600 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98]"
        >
          <ArrowLeft size={16} />
          Back to menu
        </Link>
      </div>

      {/* Main card */}
      <DetailCard foodItem={foodItem} categories={categories} />
    </section>
  );
}
