import { Search, Utensils } from 'lucide-react';

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
          <div
            className="   group
        flex cursor-pointer items-center gap-3
        rounded-xl
        border border-[#C09721]/30
        bg-white
        p-3
        text-sm font-medium text-slate-900
        shadow-sm
        outline-none

        transition-all duration-200 ease-out

        hover:-translate-y-0.5
        hover:border-[#C09721]
        hover:bg-[#FFFCF5]
        hover:text-[#A77F18]
        hover:shadow-md
        hover:shadow-[#C09721]/15

        focus:border-[#C09721]
        focus:ring-4
        focus:ring-[#C09721]/10

        active:translate-y-0
        active:scale-[0.98]"
          >
            <Utensils size={14} />
            <span className="text-l font-bold tracking-wider  text-black "> {totalFoodsCount} items</span>
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
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500">
              <Search className="text-white" size={26} />
            </div>

            <h2 className="text-lg font-semibold text-black">No food items found</h2>
            <span className="mt-1 text-l text-black">No food items match your current filter</span>
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
