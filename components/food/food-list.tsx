import { Search } from 'lucide-react';

import FoodCard from '@/components/food/food-card';
import Pagination from '@/components/food/pagination';

import { CategoryViewModel } from '@/types/category';
import { FoodViewModel } from '@/types/food';

type Props = {
  currentPage: number;
  searchParam: string;
  categoryParam: string;
  filterParam: string;
  sortByParam: string;
  categories: CategoryViewModel[];
  foods: FoodViewModel[];
  totalPages: number;
};

export default async function FoodList({
  currentPage,
  searchParam,
  categoryParam,
  filterParam,
  sortByParam,
  categories,
  foods,
  totalPages,
}: Props) {
  return (
    <>
      {/* Foods */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {foods.length === 0 ? (
          <div className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500">
              <Search className="text-white" size={26} />
            </div>

            <h2 className="text-lg font-semibold text-black">No food items found</h2>
            <span className="text-l mt-1 text-black">No food items match your current filter</span>
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
          totalPages={totalPages}
        />
      )}
    </>
  );
}
