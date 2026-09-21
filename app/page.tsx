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

  const totalPages = menuResponse.pagination?.totalPages ?? 0;

  const totalMenuItemsCount = menuResponse.pagination?.totalItems ?? 0;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <Header categories={categories} />

        {/* Filtering */}
        <div className="mt-10">
          <Filtering
            categories={categories}
            searchParam={searchParam}
            categoryParam={categoryParam}
            sortByParam={sortByParam}
            favoritesParam={favoritesParam}
          />
        </div>

        {/* Menu controls */}
        <section
          className="mt-8 mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Menu controls"
        >
          {/* Item count */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C09721]/25 bg-[#181714] text-[#765315]">
              <Utensils size={17} strokeWidth={1.6} aria-hidden="true" className="text-[#c09721]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#d4af37]">Our Menu</p>
              <p className="text-xs tracking-wide text-[#b5b0a3]">{totalMenuItemsCount} culinary selections</p>
            </div>
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
          <div className="mt-10">
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
          </div>
        )}
      </div>
    </main>
  );
}
