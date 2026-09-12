import { Search, Utensils, Heart } from 'lucide-react';
import { CategoryService } from '@/services/category';
import { FoodService } from '@/services/food';
import FoodCard from '@/components/food/food-card';
import FoodModal from '@/components/food/add-food-modal';
import Pagination from '@/components/food/pagination';

const categoryService = new CategoryService();
const foodService = new FoodService();

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
};

export default async function MenuPage({ searchParams }: Props) {
  const params = await searchParams;

  //Set default current page to 1 if params.page is undefined.
  const currentPage = Number(params.page ?? '1');

  const searchParam = params.search ?? '';

  const categoryParam = params.category ?? '';

  const [categoryResponse, foodResponse] = await Promise.all([
    categoryService.getAll(1),
    foodService.getAll(currentPage, searchParam, categoryParam),
  ]);

  const categories = categoryResponse.data;
  const foods = foodResponse.data;

  const totalFoodsCount = foodResponse.pagination?.totalItems;

  return (
    <main className="min-h-screen bg-[#05070d] p-8 text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-semibold">Menu</h1>
            <Utensils />
          </div>
          <p className="mt-1 text-sm text-slate-400">Manage your dishes, categories and availability.</p>
        </div>
        <FoodModal categories={categories ?? []} />
      </div>

      {/* Search / Filter */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <form action="/" method="GET" className="flex gap-2">
            <input
              type="search"
              name="search"
              placeholder="Search pasta..."
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
            <select
              name="category"
              id="category"
              className="
    cursor-pointer
    rounded-lg
    border border-slate-800
    bg-[#0b1120]
    px-4
    py-2.5
    text-sm
    text-slate-300
    outline-none
    transition
    hover:border-slate-700
    focus:border-blue-500
    focus:ring-1
    focus:ring-blue-500/30
  "
            >
              <option value="">All Categories</option>

              {categories?.map((category) => (
                <option value={category.name} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="cursor-pointer rounded-lg border border-slate-800  bg-blue-600  px-4 py-2 text-sm  transition hover:text-white"
            >
              Sök
            </button>
          </form>
        </div>
      </div>

      {/* Food count */}
      <div className="mb-6 flex items-center">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#0b1120] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-l font-medium text-slate-300">{totalFoodsCount}</span>
          <span className="text-l text-slate-500">{totalFoodsCount === 1 ? 'Food' : 'Foods'}</span>
        </div>
      </div>

      {/* Foods */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {foods?.map((item) => {
          return <FoodCard key={item.id} foodItem={item} />;
        })}
      </div>
      <Pagination currentPage={currentPage} totalPages={foodResponse.pagination?.totalPages ?? 1} />
    </main>
  );
}
