import { MenuItemViewModel } from '@/types/menu';

type Props = {
  menuItem: MenuItemViewModel;
};

export default function MenuCardContent({ menuItem }: Props) {
  return (
    <div className="flex min-h-56 flex-col p-6">
      {/* Category */}
      <div className="mb-3 flex items-center gap-2">
        <span className="h-px w-5 bg-[#C09721]/60" />

        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#A77F18] uppercase">{menuItem.category}</p>
      </div>

      {/* Title */}
      <h2 className="text-xl leading-snug font-semibold tracking-wide text-[#765315]">{menuItem.name}</h2>

      {/* Description */}
      <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">{menuItem.description}</p>

      {/* Price */}
      <div className="mt-auto pt-5">
        <div className="mb-4 h-px bg-[#C09721]/15" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">Price</p>

            <p className="text-xl font-semibold tracking-wide text-[#765315]">{Number(menuItem.price).toFixed(2)} €</p>
          </div>

          <span className="text-xs tracking-wider text-[#C09721]">View details →</span>
        </div>
      </div>
    </div>
  );
}
