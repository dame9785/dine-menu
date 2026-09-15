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
            className="
    w-full
    rounded-xl
    border border-slate-200
    bg-indigo-100
    py-2.5
    pl-10
    pr-4
    text-sm
    text-slate-900
    outline-none
    shadow-sm
    transition-all duration-200
    placeholder:text-slate-400
    hover:border-slate-300
    focus:border-indigo-500
    focus:ring-4
    focus:ring-indigo-500/10
  "
          />

          {/* Category */}
          <select
            name="category"
            defaultValue={categoryParam}
            className="
    cursor-pointer
    rounded-xl
    border border-slate-200
  bg-indigo-100
    px-4
    py-2.5
    text-sm
    text-slate-700
    outline-none
    shadow-sm
    transition-all duration-200
    hover:border-slate-300
    focus:border-indigo-500
    focus:ring-4
    focus:ring-indigo-500/10
  "
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
            className="  cursor-pointer
    rounded-xl
    border border-slate-100
   bg-indigo-100
    px-4
    py-2.5
    text-sm
    text-slate-700
    outline-none
    shadow-sm
    transition-all duration-200
    hover:border-slate-300
    focus:border-indigo-500
    focus:ring-4
    focus:ring-indigo-500/10"
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
            className="
    cursor-pointer
    rounded-lg
    border border-indigo-200
   bg-indigo-100
    px-4 py-2
    text-sm font-medium
    text-black
    shadow-sm
    transition-all duration-200
    hover:bg-indigo-700
    hover:border-indigo-700
    hover:shadow-md
    hover:shadow-indigo-500/20
    active:scale-95
  "
          >
            Sök
          </button>
        </form>
      </div>
    </div>
  );
}
