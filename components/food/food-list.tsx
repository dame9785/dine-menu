import { Search } from 'lucide-react';

import { FoodService } from '@/services/food';
import FoodCard from '@/components/food/food-card';
import Pagination from '@/components/food/pagination';
import FavoriteFilterButton from '@/components/food/favorite-filter-button';
import ResetFilteringButton from '@/components/food/reset-filter-button';

const foodService = new FoodService();

type Props = {
  currentPage: number;
  searchParam: string;
  categoryParam: string;
  filterParam: string;
  sortByParam: string;
  categories: {
    id: number;
    name: string;
  }[];
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
      {/* Food count */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#0b1120] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="font-medium text-slate-300">{totalFoodsCount}</span>
          <span className="text-slate-500">{totalFoodsCount === 1 ? 'Food' : 'Foods'}</span>
        </div>

        <FavoriteFilterButton
          currentPage={currentPage}
          searchParam={searchParam}
          sortByParam={sortByParam}
          categoryParam={categoryParam}
        />

        <ResetFilteringButton />
      </div>

      {/* Foods */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {foods.length === 0 ? (
          <div className="col-span-full flex min-h-60 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-[#0b1120]">
            <Search className="mb-3 text-slate-600" size={32} />

            <h2 className="text-lg font-semibold text-indigo-300">No food items found</h2>

            <span className="mt-1 text-sm text-slate-500">No food items match your filter</span>
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
