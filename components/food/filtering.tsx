import { CategoryViewModel } from '@/types/category';
import { Search } from 'lucide-react';

type Props = {
  categories: CategoryViewModel[];
  searchParam: string;
  categoryParam: string;
  sortByParam: string;
  filterParam: string;
};

export default function Filtering({ categories, searchParam, categoryParam, sortByParam, filterParam }: Props) {
  return (
    <div className="mb-8">
      <form
        key={`${searchParam}-${categoryParam}-${sortByParam}-${filterParam}`}
        action="/"
        method="GET"
        className="
          flex flex-col gap-3
          rounded-2xl
          border border-[#C09721]/30
          bg-[#FBF8F0]
          p-4
          shadow-sm
          md:flex-row
          md:items-center
        "
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="
              pointer-events-none
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-[#C09721]
            "
          />

          <input
            type="search"
            name="search"
            defaultValue={searchParam}
            placeholder="Search food..."
            className="
              w-full
              cursor-text
              rounded-xl
              border border-[#C09721]/30
              bg-white
              py-2.5
              pl-10
              pr-4
              text-sm
              text-slate-900
              shadow-sm
              outline-none
              transition-all duration-200

              placeholder:text-slate-400

              hover:border-[#C09721]/60

              focus:border-[#C09721]
              focus:ring-4
              focus:ring-[#C09721]/10
            "
          />
        </div>

        {/* Category */}
        <select
          name="category"
          defaultValue={categoryParam}
          className="
            w-full
            cursor-pointer
            rounded-xl
            border border-[#C09721]/30
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-700
            shadow-sm
            outline-none
            transition-all duration-200

            hover:border-[#C09721]/60

            focus:border-[#C09721]
            focus:ring-4
            focus:ring-[#C09721]/10

            md:w-48
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
          className="
            w-full
            cursor-pointer
            rounded-xl
            border border-[#C09721]/30
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-700
            shadow-sm
            outline-none
            transition-all duration-200

            hover:border-[#C09721]/60

            focus:border-[#C09721]
            focus:ring-4
            focus:ring-[#C09721]/10

            md:w-44
          "
        >
          <option value="">Sort by</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
          <option value="lowest">Lowest first</option>
          <option value="highest">Highest first</option>
        </select>

        {/* Favorite filter */}
        <input type="hidden" name="filter" value={filterParam} />

        {/* Search button */}
        <button
          type="submit"
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            border border-[#A77F18]
            bg-[#C09721]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all duration-200

            hover:-translate-y-0.5
            hover:bg-[#A77F18]
            hover:shadow-lg
            hover:shadow-[#C09721]/20

            active:translate-y-0
            active:scale-[0.98]

            md:w-auto
          "
        >
          <Search size={16} />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
