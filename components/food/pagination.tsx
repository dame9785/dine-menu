import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
  searchParam: string;
  sortByParam: string;
  filterParam: string;
  categoryParam: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  searchParam,
  sortByParam,
  filterParam,
  categoryParam,
}: Props) {
  return (
    <nav aria-label="Category pagination" className="flex items-center justify-center py-6">
      <div className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 p-1.5 shadow-lg">
        {/* Previous */}
        {currentPage > 1 ? (
          <Link
            scroll={false}
            aria-label="Previous page"
            href={`/?page=${currentPage - 1}&search=${searchParam}&category=${categoryParam}&sortBy=${sortByParam}&filter=${filterParam}`}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-neutral-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <ChevronLeft size={18} />
          </Link>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-700" aria-hidden="true">
            <ChevronLeft size={18} />
          </span>
        )}

        {/* First page */}
        {currentPage > 2 && (
          <>
            <Link
              scroll={false}
              aria-label="Page 1"
              href={`/?page=1&search=${searchParam}&category=${categoryParam}&sortBy=${sortByParam}&filter=${filterParam}`}
              className="flex h-9 min-w-9 items-center justify-center rounded-md border border-transparent px-2 text-sm text-neutral-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
            >
              1
            </Link>

            {currentPage > 3 && <span className="px-1 text-sm text-neutral-600">...</span>}
          </>
        )}

        {/* Current page */}
        <span
          aria-current="page"
          className="flex h-9 min-w-9 items-center justify-center rounded-md border border-blue-500/50 bg-blue-600 px-2 text-sm font-semibold text-white shadow-md shadow-blue-500/10"
        >
          {currentPage}
        </span>

        {/* Next page */}
        {currentPage < totalPages && (
          <Link
            scroll={false}
            aria-label={`Page ${currentPage + 1}`}
            href={`/?page=${currentPage + 1}&search=${searchParam}&category=${categoryParam}&sortBy=${sortByParam}&filter=${filterParam}`}
            className="flex h-9 min-w-9 items-center justify-center rounded-md border border-transparent px-2 text-sm text-neutral-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
          >
            {currentPage + 1}
          </Link>
        )}

        {/* Page +2 */}
        {currentPage + 1 < totalPages && (
          <Link
            scroll={false}
            aria-label={`Page ${currentPage + 2}`}
            href={`/?page=${currentPage + 2}&search=${searchParam}&category=${categoryParam}&sortBy=${sortByParam}&filter=${filterParam}`}
            className="flex h-9 min-w-9 items-center justify-center rounded-md border border-transparent px-2 text-sm text-neutral-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
          >
            {currentPage + 2}
          </Link>
        )}

        {/* Last page */}
        {currentPage + 2 < totalPages && (
          <>
            {currentPage + 3 < totalPages && <span className="px-1 text-sm text-neutral-600">...</span>}

            <Link
              scroll={false}
              aria-label={`Page ${totalPages}`}
              href={`/?page=${totalPages}&search=${searchParam}&category=${categoryParam}&sortBy=${sortByParam}&filter=${filterParam}`}
              className="flex h-9 min-w-9 items-center justify-center rounded-md border border-transparent px-2 text-sm text-neutral-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
            >
              {totalPages}
            </Link>
          </>
        )}

        {/* Next */}
        {currentPage < totalPages ? (
          <Link
            scroll={false}
            aria-label="Next page"
            href={`/?page=${currentPage + 1}&search=${searchParam}&category=${categoryParam}&sortBy=${sortByParam}&filter=${filterParam}`}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-neutral-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <ChevronRight size={18} />
          </Link>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-700" aria-hidden="true">
            <ChevronRight size={18} />
          </span>
        )}
      </div>
    </nav>
  );
}
