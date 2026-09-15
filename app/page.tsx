import { Utensils } from 'lucide-react';
import { Suspense } from 'react';

import { CategoryService } from '@/services/category';
import FoodModal from '@/components/food/food-modal';
import FoodFilter from '@/components/food/food-filter';
import FoodList from '@/components/food/food-list';

import LoadingSpinner from '@/components/loading-spinner';

const categoryService = new CategoryService();

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    filter?: string;
    sortBy?: string;
  }>;
};

export default async function MenuPage({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params.page ?? '1');
  const searchParam = params.search ?? '';
  const categoryParam = params.category ?? '';
  const filterParam = params.filter ?? '';
  const sortByParam = params.sortBy ?? '';

  const categoryResponse = await categoryService.getAll(1);
  const categories = categoryResponse.data;

  return (
    <main className="min-h-screen bg-[#05070d] p-8 text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Menu</h1>
            <Utensils />
          </div>

          <p className="mt-1 text-sm text-slate-400">Manage your dishes, categories and availability.</p>
        </div>

        {/* Add food */}
        <FoodModal categories={categories ?? []} />
      </div>

      {/* Filter foods */}
      <FoodFilter categories={categories} />

      {/* Foods */}
      <Suspense fallback={<LoadingSpinner />}>
        <FoodList
          currentPage={currentPage}
          searchParam={searchParam}
          sortByParam={sortByParam}
          filterParam={filterParam}
          categoryParam={categoryParam}
          categories={categories ?? []}
        />
      </Suspense>
    </main>
  );
}
