import { CategoryViewModel } from '@/types/category';
import { Search } from 'lucide-react';
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
        className="flex flex-col gap-3 rounded-2xl border border-[#C09721]/25 bg-[#121210]/80 p-4 shadow-[0_8px_35px_rgba(0,0,0,0.25)] backdrop-blur-xl md:flex-row md:items-center"
      >
        {/* Search */}
        <div className="group relative flex-1">
          <label htmlFor="search" className="sr-only">
            Search menu
          </label>

          <Input id="search" type="search" name="search" defaultValue={searchParam} placeholder="Search menu..." />

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
            <Select name="category" id="category" defaultValue={categoryParam} className="md:w-44">
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
          <Select id="sortBy" name="sortBy" defaultValue={sortByParam} className="md:w-44">
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
          className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C09721]/70 bg-gradient-to-r from-[#8B6914] via-[#C09721] to-[#8B6914] px-5 text-sm font-semibold tracking-wide text-[#171207] shadow-[0_4px_18px_rgba(192,151,33,0.12)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#E5C76B] hover:shadow-[0_0_25px_rgba(192,151,33,0.25)] active:translate-y-0 active:scale-[0.98] md:w-auto"
        >
          <Search size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110" />

          <span>Search</span>
        </button>
      </form>
    </section>
  );
}
