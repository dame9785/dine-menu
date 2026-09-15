import { CategoryViewModel } from '@/types/category';
import { Search } from 'lucide-react';

type Props = {
  categories: CategoryViewModel[];
};

export default function FilterFoods({ categories }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <form action="/" method="GET" className="flex gap-2">
          <input
            type="search"
            name="search"
            placeholder="Search pasta..."
            className="w-full rounded-lg border border-slate-800 bg-[#0b1120] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
          <select
            name="category"
            id="category"
            className="cursor-pointer rounded-lg  border border-slate-800 bg-[#0b1120] px-4 py-2.5 ntext-sm  text-slate-300 outline-none transition hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          >
            <option value="">All Categories</option>

            {categories?.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="sortBy"
            id="sortBy"
            className="cursor-pointer rounded-lg border border-slate-800 bg-[#0b1120] px-4 py-2.5 text-sm text-slate-300 outline-none transition hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          >
            <option value="">Sort by</option>
            <option value={'asc'}>Ascending</option>
            <option value={'desc'}>Decending</option>
            <option value={'lowest'}>Lowest first</option>
            <option value={'highest'}>Highest first</option>
          </select>

          <button
            type="submit"
            className="cursor-pointer rounded-lg border border-slate-800  bg-blue-600  px-4 py-2 text-sm  transition hover:text-white"
          >
            Sök
          </button>
        </form>
      </div>
    </div>
  );
}
