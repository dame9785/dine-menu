import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { FoodService } from '@/services/food';
import { CategoryService } from '@/services/category';

import DetailCard from '@/components/category/detail-card';

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
      <div className="mb-6">
        <Link
          href="/"
          className="
            group inline-flex items-center gap-2
            rounded-lg px-2 py-1.5
            
            border border-[#A77F18]

            bg-[#C09721]
            text-sm font-medium text-white
            transition-all duration-200
                  hover:-translate-y-0.5
            hover:bg-[#A77F18]
            hover:shadow-lg
            hover:shadow-[#C09721]/20

            active:translate-y-0
            active:scale-[0.98]

          "
        >
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back to menu
        </Link>
      </div>

      {/* Main card */}
      <DetailCard foodItem={foodItem} categories={categories} />
    </section>
  );
}
