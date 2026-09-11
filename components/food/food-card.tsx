import { MoreVertical } from 'lucide-react';

export default function FoodCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800bg-[#0b1120] transition hover:border-slate-700 hover:shadow-lg">
      {/* Image placeholder */}
      <div className="flex h-44 items-center justify-center bg-linear-to-br from-slate-800to-slate-950">
        <span className="text-sm text-slate-500">Food image</span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Caprisosa</h2>
            <p className="mt-1 text-xs text-slate-500">Pizza</p>
          </div>

          <button className="text-slate-500 hover:text-white">
            <MoreVertical size={18} />
          </button>
        </div>

        <p className="mb-5 text-sm leading-6 text-slate-400">God pizza</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">100 kr</span>
          <span className={`flex items-center gap-2 text-xs ${true ? 'text-green-400' : 'text-red-400'}`}>
            <span className={` h-2 w-2 rounded-full ${true ? 'bg-green-400' : 'bg-red-400'}`} />
            {true ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
}
