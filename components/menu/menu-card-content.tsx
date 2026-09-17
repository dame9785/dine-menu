import { MenuItemViewModel } from '@/types/menu';

type Props = {
  menuItem: MenuItemViewModel;
};

export default function MenuCardContent({ menuItem }: Props) {
  return (
    <div className="p-5">
      {/* Title */}
      <div className="mb-3">
        <h2 className="text-xl font-bold tracking-wide text-[#765315]">{menuItem.name}</h2>
        <p className="mt-1 text-xs font-semibold tracking-wider text-slate-600 uppercase">{menuItem.category}</p>
      </div>

      {/* Description */}
      <p className="text-m mb-5 line-clamp-2 min-h-10 leading-5 tracking-wide text-slate-600">{menuItem.description}</p>

      {/* Price */}
      <div className="border-t border-slate-100 pt-4">
        <p className="mb-0.5 text-sm font-semibold tracking-wider text-slate-600 uppercase">Price</p>
        <p className="text-xl font-bold text-[#765315]">{Number(menuItem.price).toFixed(2)} €</p>
      </div>
    </div>
  );
}
