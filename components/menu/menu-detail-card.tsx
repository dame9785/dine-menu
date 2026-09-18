import Image from 'next/image';
import FavoriteAction from '@/components/menu/actions/favorite-menu-action';
import { Heart, Utensils, Euro } from 'lucide-react';
import { MenuItemViewModel } from '@/types/menu';
import { CategoryViewModel } from '@/types/category';
import ModalAction from '@/components/menu/actions/menu-modal-actions';
import { checkAdmin } from '@/lib/auth-guard';

type Props = {
  menuItem: MenuItemViewModel;
  categories: CategoryViewModel[];
};

export default async function DetailCard({ menuItem, categories }: Props) {
  const isAdmin = (await checkAdmin()).authorized;
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#C09721]/30 bg-[#FFFCF5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C09721] hover:shadow-md hover:shadow-[#C09721]/15">
      {isAdmin && (
        <div className="absolute top-5 right-5 z-30 rounded-2xl border border-[#C09721]/30 bg-[#FFFCF5]">
          <ModalAction menuItem={menuItem} categories={categories} />
        </div>
      )}

      <div className="grid md:grid-cols-2">
        {/* IMAGE */}
        <div className="relative min-h-98 md:min-h-155">
          {menuItem.imageUrl ? (
            <Image
              fill
              src={menuItem.imageUrl}
              alt={menuItem.name}
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Utensils size={24} className="text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-500">No image available</p>
              </div>
            </div>
          )}

          {/* Image overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

          {/* Category */}
          <div className="absolute top-3 left-3">
            <span
              aria-hidden="true"
              className="rounded-full border border-[#C09721]/30 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-md"
            >
              {menuItem.category}
            </span>
          </div>

          {/* Image bottom label */}
          <div className="absolute right-6 bottom-6 left-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">Dine Menu</p>
            <p className="mt-1 text-sm font-medium text-white/90">Fresh from our kitchen</p>
          </div>
        </div>

        {/* INFORMATION */}
        <div className="flex flex-col justify-center p-7 md:p-12">
          {/* Label */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#C09721]" />

            <span className="text-xs font-bold tracking-[0.2em] text-[#C09721] uppercase">Our menu</span>
          </div>

          {/* Title */}
          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{menuItem.name}</h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 md:text-lg">{menuItem.description}</p>

          {/* Divider */}
          <div className="my-8 h-px bg-slate-100" />

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="rounded-2xl border border-[#C09721]/30 bg-[#FFFCF5] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C09721] hover:shadow-md hover:shadow-[#C09721]/15">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                <Utensils size={17} className="text-[#C09721]" />
              </div>

              <p className="text-xs font-semibold tracking-wider text-[#C09721] uppercase">Category</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-[#C09721]">{menuItem.category}</p>
            </div>

            {/* Price */}
            <div className="rounded-2xl border border-[#C09721]/30 bg-[#FFFCF5] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C09721] hover:shadow-md hover:shadow-[#C09721]/15">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                <Euro size={17} className="text-[#C09721]" />
              </div>
              <p className="text-xs font-semibold tracking-wider text-[#C09721] uppercase">Price</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-[#C09721]">
                {Number(menuItem.price).toFixed(2)} €
              </p>
            </div>
          </div>

          {/* Favorite */}
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#C09721]/30 bg-[#FFFCF5] p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C09721] hover:shadow-md hover:shadow-[#C09721]/15">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl">
                <Heart size={19} className="fill-red-500 text-red-500" />
              </div>

              <div>
                <p className="text-m font-semibold text-slate-600">Add to favorites</p>
                <p className="text-xs text-slate-600">Save this dish for later</p>
              </div>
            </div>

            <FavoriteAction menuItemId={menuItem.id} isFavorite={menuItem.isFavorite} />
          </div>
        </div>
      </div>
    </article>
  );
}
