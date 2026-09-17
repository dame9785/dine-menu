import { Search } from 'lucide-react';

import MenuItemCard from '@/components/menu/menu-card';

import { CategoryViewModel } from '@/types/category';
import { MenuItemViewModel } from '@/types/menu';
import { checkAdmin, getSession } from '@/lib/auth-guard';

type Props = {
  categories: CategoryViewModel[];
  menuItems: MenuItemViewModel[];
};

export default async function MenuItemList({ categories, menuItems }: Props) {
  const isAdmin = (await checkAdmin()).authorized;
  const session = await getSession();
  const isLoggedIn = session?.user ? true : false;

  return (
    <>
      {/* Menu items */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {menuItems.length === 0 ? (
          <div className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8DAB8]">
              <Search className="text-slate-600" size={26} />
            </div>

            <h2 className="text-lg font-semibold text-slate-600">No menu items found</h2>
            <span className="text-l mt-1 text-slate-600">No menu items match your current filter</span>
          </div>
        ) : (
          menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              isAdmin={isAdmin}
              isLoggedIn={isLoggedIn}
              menuItem={item}
              categories={categories}
            />
          ))
        )}
      </div>
    </>
  );
}
