import { CategoryViewModel } from '@/types/category';
import { Search } from 'lucide-react';

type Props = {
  categories: CategoryViewModel[];
  searchParam: string;
  categoryParam: string;
  sortByParam: string;
  filterParam: string;
};

export default function FoodFilter({ categories, searchParam, categoryParam, sortByParam, filterParam }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

        <form
          key={`${searchParam}-${categoryParam}-${sortByParam}-${filterParam}`}
          action="/"
          method="GET"
          className="flex gap-2"
        >
          {/* Search */}
          <input
            type="search"
            name="search"
            defaultValue={searchParam}
            placeholder="Search pasta..."
            className="w-full rounded-lg border border-slate-800 bg-[#0b1120] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />

          {/* Category */}
          <select
            name="category"
            defaultValue={categoryParam}
            className="cursor-pointer rounded-lg border border-slate-800 bg-[#0b1120] px-4 py-2.5 text-sm text-slate-300 outline-none transition hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            name="sortBy"
            defaultValue={sortByParam}
            className="cursor-pointer rounded-lg border border-slate-800 bg-[#0b1120] px-4 py-2.5 text-sm text-slate-300 outline-none transition hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          >
            <option value="">Sort by</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            <option value="lowest">Lowest first</option>
            <option value="highest">Highest first</option>
          </select>

          {/* Keep favorite filter */}
          <input type="hidden" name="filter" value={filterParam} />

          <button
            type="submit"
            className="cursor-pointer rounded-lg border border-slate-800 bg-blue-600 px-4 py-2 text-sm transition hover:bg-blue-500 hover:text-white"
          >
            Sök
          </button>
        </form>
      </div>
    </div>
  );
}
