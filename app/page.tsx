import { Suspense } from 'react';

import { CategoryService } from '@/services/category';
import FoodFilter from '@/components/food/food-filter';
import FoodList from '@/components/food/food-list';

import LoadingSpinner from '@/components/loading-spinner';
import Header from '@/components/food/header';
import FoodModal from '@/components/food/modal';
import AddFoodButton from '@/components/food/add-food-button';

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
    <div className="mx-auto max-w-7xl">
      {/* Add button */}
      <div className="relative z-20 pb-5 self-start">
        <AddFoodButton categories={categories} />
      </div>

      {/* Header */}
      <Header categories={categories} />

      {/* Filter */}
      <FoodFilter
        categories={categories ?? []}
        searchParam={searchParam}
        categoryParam={categoryParam}
        sortByParam={sortByParam}
        filterParam={filterParam}
      />

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
    </div>
  );
}
