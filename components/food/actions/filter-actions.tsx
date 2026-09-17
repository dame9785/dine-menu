import FilterFavoriteButton from '@/components/food/actions/filter-favorites-action';
import ResetFilteringButton from '@/components/food/actions/reset-filter-action';

type Props = {
  currentPage: number;
  searchParam: string;
  sortByParam: string;
  categoryParam: string;
};

export default function FilterActions({ currentPage, searchParam, sortByParam, categoryParam }: Props) {
  return (
    <div className="flex items-center gap-2">
      <FilterFavoriteButton
        currentPage={currentPage}
        searchParam={searchParam}
        sortByParam={sortByParam}
        categoryParam={categoryParam}
      />

      <ResetFilteringButton />
    </div>
  );
}
