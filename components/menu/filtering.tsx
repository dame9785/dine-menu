import { CategoryViewModel } from '@/types/category';
import { Search } from 'lucide-react';
import CustomSelect from '@/components/ui/custom-select';
import Input from '../ui/input';
import Select from '../ui/select';

type Props = {
  categories: CategoryViewModel[];
  searchParam: string;
  categoryParam: string;
  sortByParam: string;
  favoritesParam: string;
};

export default function Filtering({ categories, searchParam, categoryParam, sortByParam, favoritesParam }: Props) {
  return (
    <section aria-label="Menu filters" className="mb-8" id="Menu-filters">
      <form
        key={`${searchParam}-${categoryParam}-${sortByParam}-${favoritesParam}`}
        action="/#Menu-filters"
        method="GET"
        className="flex flex-col gap-3 rounded-2xl border border-[#C09721]/30 bg-[#FBF8F0] p-4 shadow-sm md:flex-row md:items-center"
      >
        {/* Search */}
        <div className="group relative flex-1">
          <label htmlFor="search" className="sr-only">
            Search menu
          </label>

          <Input
            id="search"
            type="search"
            name="search"
            defaultValue={searchParam}
            placeholder="Search menu..."
            className="text-sm"
          />

          {/* Search icon – höger */}
          <Search
            size={18}
            strokeWidth={1.7}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#C09721]/70 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-[#A77F18] group-hover:scale-110 group-hover:text-[#C09721]"
          />
        </div>

        {/* Category */}
        {categories.length > 0 && (
          <div>
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <Select
              name="category"
              id="category"
              defaultValue={categoryParam}
              className="w-full cursor-pointer rounded-xl border border-[#C09721]/30 bg-white px-4 py-2.5 text-base font-semibold text-slate-600 shadow-sm transition-all duration-200 outline-none hover:border-[#C09721]/60 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 md:w-44"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option value={category.name} key={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
        )}

        {/* Sort */}
        <div>
          <label htmlFor="sortBy" className="sr-only">
            Sort menu
          </label>
          <Select
            id="sortBy"
            name="sortBy"
            defaultValue={sortByParam}
            className="w-full cursor-pointer rounded-xl border border-[#C09721]/30 bg-white px-4 py-2.5 text-base font-semibold text-slate-600 shadow-sm transition-all duration-200 outline-none hover:border-[#C09721]/60 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 md:w-44"
          >
            <option value="">Sort by</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            <option value="lowest">Lowest first</option>
            <option value="highest">Highest first</option>
          </Select>
        </div>

        {/* Preserve favorite filter when active */}
        {favoritesParam !== '' && <input type="hidden" name="filter" value={favoritesParam} />}

        {/* Submit button */}
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#A77F18] bg-[#C09721] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#A77F18] hover:shadow-lg hover:shadow-[#C09721]/20 active:translate-y-0 active:scale-[0.98] md:w-auto"
        >
          <Search size={16} aria-hidden="true" />
          <span>Search</span>
        </button>
      </form>
    </section>
  );
}
