import { Store } from 'lucide-react';

import { MenuItemViewModel } from '@/types/menu';

type Props = {
  menuItem: MenuItemViewModel;
  hasCompany: boolean;
};

export default function MenuCardContent({ menuItem, hasCompany }: Props) {
  return (
    <div className="flex min-h-60 flex-col bg-[#121210] p-6">
      {/* Category */}
      <div className="mb-3 flex items-center gap-2">
        <span className="h-px w-5 bg-[#C09721]/60" />

        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#A77F18] uppercase">{menuItem.category}</p>
      </div>

      {/* Title */}
      <h2 className="text-xl leading-snug font-semibold tracking-wide text-[#E5C76B]">{menuItem.name}</h2>

      {/* Description */}
      <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-[#B5B0A3]">{menuItem.description}</p>

      {/* Bottom content */}
      <div className="mt-auto pt-5">
        <div className="mb-4 h-px bg-[#C09721]/15" />

        {/* Company */}
        {hasCompany && (
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C09721]/25 bg-[#C09721]/10">
              <Store className="h-4 w-4 text-[#C09721]" strokeWidth={1.5} />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold tracking-[0.18em] text-[#777267] uppercase">Restaurant</p>

              <p className="truncate text-sm font-medium tracking-wide text-[#D4AF37]">{menuItem.company?.name}</p>
            </div>
          </div>
        )}

        {/* Price and details */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-[#777267] uppercase">Price</p>

            <p className="text-xl font-semibold tracking-wide text-[#E5C76B]">{Number(menuItem.price).toFixed(2)} €</p>
          </div>

          <span className="text-xs tracking-wider text-[#C09721] transition-colors duration-200 group-hover:text-[#F0D98A]">
            View details →
          </span>
        </div>
      </div>
    </div>
  );
}
