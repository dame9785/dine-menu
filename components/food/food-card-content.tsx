import { FoodViewModel } from '@/types/food';

type Props = {
  foodItem: FoodViewModel;
};

export default function FoodCardContent({ foodItem }: Props) {
  return (
    <div className="p-5">
      {/* Title */}
      <div className="mb-3">
        <h2 className="text-xl font-bold tracking-wide text-[#765315]">{foodItem.name}</h2>
        <p className="mt-1 text-xs font-semibold tracking-wider text-slate-600 uppercase">{foodItem.category}</p>
      </div>

      {/* Description */}
      <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 tracking-wide text-slate-600">
        {foodItem.description}
      </p>

      {/* Price */}
      <div className="border-t border-slate-100 pt-4">
        <p className="mb-0.5 text-sm font-semibold tracking-wider text-slate-600 uppercase">Price</p>
        <p className="text-xl font-bold text-[#765315]">{Number(foodItem.price).toFixed(2)} €</p>
      </div>
    </div>
  );
}
