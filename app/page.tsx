import { Suspense } from 'react';

import { CategoryService } from '@/services/category';
import { FoodService } from '@/services/food';

import Filtering from '@/components/food/filtering';
import FoodList from '@/components/food/food-list';
import LoadingSpinner from '@/components/loading-spinner';
import Header from '@/components/food/header';
import { Utensils } from 'lucide-react';
import FilterActions from '@/components/food/actions/filter-actions';
import Pagination from '@/components/pagination/pagination';

import { FilterLoadingProvider, FoodListLoadingOverlay } from '@/components/food/food-list-loading-wrapper';
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

      {/* Loading provider */}
      <FilterLoadingProvider>
        {/* Menu controls */}
        <section
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Menu controls"
        >
          <div className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 font-medium text-slate-600 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98]">
            <Utensils size={16} aria-hidden="true" />
            <span className="tracking-wider">{totalFoodsCount} items</span>
          </div>

          {/* Filter actions */}
          <FilterActions
            currentPage={currentPage}
            searchParam={searchParam}
            categoryParam={categoryParam}
            sortByParam={sortByParam}
          />
        </section>

        {/* Foods with loading overlay */}
        <FoodListLoadingOverlay>
          <Suspense fallback={<LoadingSpinner />}>
            <FoodList foods={foodList} categories={categories ?? []} />
          </Suspense>
        </FoodListLoadingOverlay>
      </FilterLoadingProvider>

      {/* Pagination */}
      {foodList.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/"
          ariaLabel="Food pagination"
          queryParams={{
            search: searchParam,
            category: categoryParam,
            sortBy: sortByParam,
            filter: filterParam,
          }}
        />
      )}
    </div>
  );
}
