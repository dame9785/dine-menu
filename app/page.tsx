import { Suspense } from 'react';

import { CategoryService } from '@/services/category';
import Filtering from '@/components/food/filtering';
import FoodList from '@/components/food/food-list';
import LoadingSpinner from '@/components/loading-spinner';
import Header from '@/components/food/header';

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
      {/* Header */}
      <Header categories={categories ?? []} />

      {/* Filter */}
      <Filtering
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
