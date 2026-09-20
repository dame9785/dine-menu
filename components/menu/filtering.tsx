import { CategoryViewModel } from '@/types/category';
import { Search } from 'lucide-react';
import CustomSelect from '@/components/ui/custom-select';
import Input from '../ui/input';

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
            <CustomSelect
              name="category"
              value={categoryParam}
              placeholder="All Categories"
              className="md:w-44"
              options={[
                { label: 'All Categories', value: '' },
                ...categories.map((category) => ({
                  label: category.name,
                  value: category.name,
                })),
              ]}
            />
          </div>
        )}

        {/* Sort */}
        <div>
          <label htmlFor="sortBy" className="sr-only">
            Sort menu
          </label>
          <CustomSelect
            name="sortBy"
            value={sortByParam}
            placeholder="Sort by"
            className="md:w-44"
            options={[
              { label: 'Sort by', value: '' },
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' },
              { label: 'Lowest first', value: 'lowest' },
              { label: 'Highest first', value: 'highest' },
            ]}
          />
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
