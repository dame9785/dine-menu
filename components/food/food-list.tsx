import { Search } from 'lucide-react';

import FoodCard from '@/components/food/food-card';

import { CategoryViewModel } from '@/types/category';
import { FoodViewModel } from '@/types/food';
import { checkAdmin } from '@/lib/auth-guard';

type Props = {
  categories: CategoryViewModel[];
  foods: FoodViewModel[];
};

export default async function FoodList({ categories, foods }: Props) {
  const isAdmin = (await checkAdmin()).authorized;
  console.log('IS ADMIN', isAdmin);
  return (
    <>
      {/* Foods */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {foods.length === 0 ? (
          <div className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8DAB8]">
              <Search className="text-slate-600" size={26} />
            </div>

            <h2 className="text-lg font-semibold text-slate-600">No food items found</h2>
            <span className="text-l mt-1 text-slate-600">No food items match your current filter</span>
          </div>
        ) : (
          foods.map((item) => <FoodCard key={item.id} isAdmin={isAdmin} foodItem={item} categories={categories} />)
        )}
      </div>
    </>
  );
}
