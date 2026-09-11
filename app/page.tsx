import { Search } from 'lucide-react';
import { CategoryService } from '@/services/category';
import { FoodService } from '@/services/food';
import FoodCard from '@/components/food/food-card';
import FoodModal from '@/components/food/add-food-modal';

const categoryService = new CategoryService();
const foodService = new FoodService();

export default async function MenuPage() {
  const [categoryResponse, productgResponse] = await Promise.all([categoryService.getAll(1), foodService.getAll()]);

  const categories = categoryResponse.data;
  const foods = productgResponse.data;
  console.log(foods);

  return (
    <main className="min-h-screen bg-[#05070d] p-8 text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Menu</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your dishes, categories and availability.</p>
        </div>
        <FoodModal categories={categories ?? []} />
      </div>

      {/* Search / Filter */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search dishes..."
            className="w-full rounded-lg border border-slate-800
              bg-[#0b1120]
              py-2.5
              pl-10
              pr-4
              text-sm
              text-white
              outline-none
              placeholder:text-slate-500
              focus:border-blue-500
            "
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium">All</button>
        {categories?.map((item) => {
          return (
            <button
              key={item.id}
              className="cursor-pointer rounded-lg border border-slate-800 bg-[#0b1120] px-4 py-2 text-sm text-slate-400 transition hover:text-white"
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Foods */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {foods?.map((item) => {
          return <FoodCard key={item.categoryId} foodItem={item} />;
        })}
      </div>
    </main>
  );
}
