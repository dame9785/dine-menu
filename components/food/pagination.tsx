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
  const getPageUrl = (page: number) =>
    `/?page=${page}&search=${searchParam}&category=${categoryParam}&sortBy=${sortByParam}&filter=${filterParam}`;

  const pageButton = `
    flex h-9 min-w-9 items-center justify-center
    rounded-md
    border border-[#A77F18]/30
    px-2
    text-sm font-medium
    text-slate-700
    transition-all duration-200 ease-out

    hover:-translate-y-0.5
    hover:border-[#C09721]
    hover:bg-[#FFFCF5]
    hover:text-[#A77F18]
    hover:shadow-sm
    hover:shadow-[#C09721]/15

    active:translate-y-0
    active:scale-[0.97]
  `;

  return (
    <nav aria-label="Category pagination" className="flex items-center justify-center py-6">
      <div
        className="
          flex items-center gap-1.5
          rounded-xl
          border border-[#A77F18]/30
          bg-white
          p-1.5
          shadow-lg
        "
      >
        {/* Previous */}
        {currentPage > 1 ? (
          <Link scroll={false} aria-label="Previous page" href={getPageUrl(currentPage - 1)} className={pageButton}>
            <ChevronLeft size={18} />
          </Link>
        ) : (
          <span
            className="
              flex h-9 w-9 items-center justify-center
              rounded-md
              text-slate-300
            "
            aria-hidden="true"
          >
            <ChevronLeft size={18} />
          </span>
        )}

        {/* First page */}
        {currentPage > 2 && (
          <>
            <Link scroll={false} aria-label="Page 1" href={getPageUrl(1)} className={pageButton}>
              1
            </Link>

            {currentPage > 3 && <span className="px-1 text-sm text-slate-400">...</span>}
          </>
        )}

        {/* Current page */}
        <span
          aria-current="page"
          className="
            flex h-9 min-w-9 items-center justify-center
            rounded-md
            border border-[#A77F18]
            bg-[#C09721]
            px-2
            text-sm font-semibold
            text-white
            shadow-md
            shadow-[#C09721]/20
          "
        >
          {currentPage}
        </span>

        {/* Next page */}
        {currentPage < totalPages && (
          <Link
            scroll={false}
            aria-label={`Page ${currentPage + 1}`}
            href={getPageUrl(currentPage + 1)}
            className={pageButton}
          >
            {currentPage + 1}
          </Link>
        )}

        {/* Page +2 */}
        {currentPage + 1 < totalPages && (
          <Link
            scroll={false}
            aria-label={`Page ${currentPage + 2}`}
            href={getPageUrl(currentPage + 2)}
            className={pageButton}
          >
            {currentPage + 2}
          </Link>
        )}

        {/* Last page */}
        {currentPage + 2 < totalPages && (
          <>
            {currentPage + 3 < totalPages && <span className="px-1 text-sm text-slate-400">...</span>}

            <Link scroll={false} aria-label={`Page ${totalPages}`} href={getPageUrl(totalPages)} className={pageButton}>
              {totalPages}
            </Link>
          </>
        )}

        {/* Next */}
        {currentPage < totalPages ? (
          <Link scroll={false} aria-label="Next page" href={getPageUrl(currentPage + 1)} className={pageButton}>
            <ChevronRight size={18} />
          </Link>
        ) : (
          <span
            className="
              flex h-9 w-9 items-center justify-center
              rounded-md
              text-slate-300
            "
            aria-hidden="true"
          >
            <ChevronRight size={18} />
          </span>
        )}
      </div>
    </nav>
  );
}
