import { Search } from 'lucide-react';

import { FoodService } from '@/services/food';
import FoodCard from '@/components/food/food-card';
import Pagination from '@/components/food/pagination';
import ShowFavoriteButton from '@/components/food/show-favorit-button';
import ResetFilteringButton from '@/components/food/reset-filter-button';
import { CategoryViewModel } from '@/types/category';

const foodService = new FoodService();

type Props = {
  currentPage: number;
  searchParam: string;
  categoryParam: string;
  filterParam: string;
  sortByParam: string;
  categories: CategoryViewModel[];
};

export default async function FoodList({
  currentPage,
  searchParam,
  categoryParam,
  filterParam,
  sortByParam,
  categories,
}: Props) {
  const foodResponse = await foodService.getAll(currentPage, searchParam, categoryParam, filterParam, sortByParam);

  const foods = foodResponse.data ?? [];
  const totalFoodsCount = foodResponse.pagination?.totalItems ?? 0;

  return (
    <>
      {/* Food count + actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Food count */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900">{totalFoodsCount}</span>

            <span className="text-sm font-medium text-slate-500">
              {totalFoodsCount === 1 ? 'Food item' : 'Food items'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ShowFavoriteButton
            currentPage={currentPage}
            searchParam={searchParam}
            sortByParam={sortByParam}
            categoryParam={categoryParam}
          />

          <ResetFilteringButton />
        </div>
      </div>

      {/* Foods */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {foods.length === 0 ? (
          <div className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
              <Search className="text-slate-400" size={26} />
            </div>

            <h2 className="text-lg font-semibold text-slate-900">No food items found</h2>

            <span className="mt-1 text-sm text-slate-500">No food items match your current filter</span>
          </div>
        ) : (
          foods.map((item) => <FoodCard key={item.id} foodItem={item} categories={categories} />)
        )}
      </div>

      {/* Pagination */}
      {foods.length > 0 && (
        <Pagination
          currentPage={currentPage}
          searchParam={searchParam}
          sortByParam={sortByParam}
          filterParam={filterParam}
          categoryParam={categoryParam}
          totalPages={foodResponse.pagination?.totalPages ?? 1}
        />
      )}
    </>
  );
}
