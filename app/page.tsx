import { Search, Utensils } from 'lucide-react';
import { CategoryService } from '@/services/category';
import { FoodService } from '@/services/food';
import FoodCard from '@/components/food/food-card';
import FoodModal from '@/components/food/add-food-modal';
import Pagination from '@/components/food/pagination';
import FavoriteFilterButton from '@/components/food/favorite-filter-button';
import FoodFilter from '@/components/food/filter-foods';

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

  //Set default current page to 1 if params.page is undefined.
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

      {/* Filter on fooods */}
      <FoodFilter categories={categories} />

      {/* Food count */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#0b1120] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-l font-medium text-slate-300">{totalFoodsCount}</span>
          <span className="text-l text-slate-500">{totalFoodsCount === 1 ? 'Food' : 'Foods'}</span>
        </div>
        <FavoriteFilterButton />
      </div>

      {/* Foods */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {foods.length === 0 ? (
          <div className="col-span-full flex min-h-60 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-[#0b1120]">
            <Search className="mb-3 text-slate-600" size={32} />

            <h2 className="text-lg font-semibold text-indigo-300">Inga maträtter hittades</h2>

            <span className="mt-1 text-sm text-slate-500">Ingen maträtt matchar din filtrering.</span>
          </div>
        ) : (
          foods.map((item) => <FoodCard key={item.id} foodItem={item} />)
        )}
      </div>

      {/* Pagination */}
      {foods.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={foodResponse.pagination?.totalPages ?? 1} />
      )}
    </main>
  );
}
