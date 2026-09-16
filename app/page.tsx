import { Suspense } from 'react';

import { CategoryService } from '@/services/category';
import { FoodService } from '@/services/food';

import Filtering from '@/components/food/filtering';
import FoodList from '@/components/food/food-list';
import LoadingSpinner from '@/components/loading-spinner';
import Header from '@/components/food/header';
import { Utensils } from 'lucide-react';
import FilterActions from '@/components/food/filter-actions';

const categoryService = new CategoryService();

const foodService = new FoodService();

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

  const [categoryResponse, foodResponse] = await Promise.all([
    categoryService.getAll(1),
    foodService.getAll(currentPage, searchParam, categoryParam, filterParam, sortByParam),
  ]);

  const categories = categoryResponse.data;

  const foodList = foodResponse.data ?? [];

  const totalPages = foodResponse.pagination?.totalPages ?? 0;
  const totalFoodsCount = foodResponse.pagination?.totalItems ?? 0;

  return (
    <div className="container mx-auto max-w-7xl">
      {/* Header */}
      <Header categories={categories ?? []} />

      {/* Filtering on search, categories, order by */}
      <Filtering
        categories={categories ?? []}
        searchParam={searchParam}
        categoryParam={categoryParam}
        sortByParam={sortByParam}
        filterParam={filterParam}
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 text-base font-bold text-slate-900 shadow-sm">
            <Utensils size={14} aria-hidden="true" />
            <span className="tracking-wider">{totalFoodsCount} items</span>
          </div>
        </div>

        {/* Filter  actions for reset filtering and filter on favorites */}
        <FilterActions
          currentPage={currentPage}
          searchParam={searchParam}
          categoryParam={categoryParam}
          sortByParam={sortByParam}
        />
      </div>

      {/* Foods */}
      <Suspense fallback={<LoadingSpinner />}>
        <FoodList
          foods={foodList}
          currentPage={currentPage}
          searchParam={searchParam}
          sortByParam={sortByParam}
          filterParam={filterParam}
          categoryParam={categoryParam}
          totalPages={totalPages}
          categories={categories ?? []}
        />
      </Suspense>
    </div>
  );
}
