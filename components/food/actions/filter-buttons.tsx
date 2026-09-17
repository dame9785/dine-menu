import FilterFavoriteAction from '@/components/food/actions/filter-favorite-action';
import ResetFilteringButton from '@/components/food/actions/reset-filter-action';
import { getSession } from '@/lib/auth-guard';
type Props = {
  currentPage: number;
  searchParam: string;
  sortByParam: string;
  categoryParam: string;
};

export default async function FilterActions({ currentPage, searchParam, sortByParam, categoryParam }: Props) {
  const session = await getSession();
  const isLoggedIn = session?.user ? true : false;

  return (
    <div className="flex items-center gap-2">
      {isLoggedIn && (
        <FilterFavoriteAction
          currentPage={currentPage}
          searchParam={searchParam}
          sortByParam={sortByParam}
          categoryParam={categoryParam}
        />
      )}

      <ResetFilteringButton />
    </div>
  );
}
