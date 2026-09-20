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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {menuItems.length === 0 ? (
          <div className="col-span-full flex min-h-80 flex-col items-center justify-center rounded-3xl border border-[#C09721]/20 bg-white/60 px-6 text-center shadow-sm">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C09721]/20 bg-[#E8DAB8]/40">
              <Search className="text-[#765315]" size={26} strokeWidth={1.5} />
            </div>

            <h2 className="text-xl font-semibold tracking-wide text-[#765315]">No menu items found</h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldt find any dishes matching your current selection. Try adjusting your filters.
            </p>
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
