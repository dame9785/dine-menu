import { MoreVertical } from 'lucide-react';
import { FoodViewModel } from '@/types/food';

type Props = {
  foodItem: FoodViewModel;
};

export default function FoodCard({ foodItem }: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0b1120] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl hover:shadow-black/40">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img src="/img/pizza.jpg" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {/* Category badge */}
        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {foodItem.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">{foodItem.name}</h2>
            <p className="mt-1 text-xs text-slate-500">{foodItem.category}</p>
          </div>

          <button className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white">
            <MoreVertical size={18} />
          </button>
        </div>

        <p className="mb-6 line-clamp-2 text-sm leading-6 text-slate-400">{foodItem.description}</p>
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          <span className="text-lg font-semibold text-white">{Number(foodItem.price)} kr</span>
        </div>
      </div>
    </div>
  );
}
