import { Suspense } from 'react';

import { CategoryService } from '@/services/category';
import { MenuService } from '@/server/services/menu';

import Filtering from '@/components/menu/filtering';
import MenuItemList from '@/components/menu/menu-list';
import LoadingSpinner from '@/components/loading-spinner';
import Header from '@/components/menu/header';
import { Utensils } from 'lucide-react';
import FilterButtons from '@/components/menu/actions/filter-buttons';
import Pagination from '@/components/pagination/pagination';

const categoryService = new CategoryService();
const menuService = new MenuService();

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    favorites?: string;
    sortBy?: string;
  }>;
};

export default async function MenuPage({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params.page ?? '1');

  const searchParam = params.search ?? '';

  const categoryParam = params.category ?? '';

  // Behåll strängen för URL och komponenter
  const favoritesParam = params.favorites ?? '';

  // Konvertera till boolean för Service och Repository
  const favorites = favoritesParam === 'true';

  const sortByParam = params.sortBy ?? '';

  const [categoryResponse, menuResponse] = await Promise.all([
    categoryService.getAll(1),

    menuService.getAll(currentPage, searchParam, categoryParam, favorites, sortByParam),
  ]);

  const categories = categoryResponse.data ?? [];

  const menuItemList = menuResponse.data ?? [];
  console.log(menuItemList);

  const totalPages = menuResponse.pagination?.totalPages ?? 0;

  const totalMenuItemsCount = menuResponse.pagination?.totalItems ?? 0;

  return (
    <div className="container mx-auto max-w-7xl">
      {/* Header */}
      <Header categories={categories} />

      {/* Filtering */}
      <Filtering
        categories={categories}
        searchParam={searchParam}
        categoryParam={categoryParam}
        sortByParam={sortByParam}
        favoritesParam={favoritesParam}
      />

      {/* Menu controls */}
      <section
        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        aria-label="Menu controls"
      >
        <div className="group flex items-center gap-3 rounded-xl border border-[#C09721]/30 bg-white p-3 font-medium text-slate-600 shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98]">
          <Utensils size={16} aria-hidden="true" />

          <span className="tracking-wider">{totalMenuItemsCount} items</span>
        </div>

        {/* Filter actions */}
        <FilterButtons
          currentPage={currentPage}
          searchParam={searchParam}
          categoryParam={categoryParam}
          sortByParam={sortByParam}
        />
      </section>

      {/* Menu list */}
      <Suspense fallback={<LoadingSpinner />}>
        <MenuItemList menuItems={menuItemList} categories={categories} />
      </Suspense>

      {/* Pagination */}
      {menuItemList.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/"
          ariaLabel="Menu items pagination"
          queryParams={{
            search: searchParam,
            category: categoryParam,
            sortBy: sortByParam,
            favorites: favoritesParam,
          }}
        />
      )}
    </div>
  );
}
