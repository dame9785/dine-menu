import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: Record<string, string>;
  ariaLabel?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  queryParams = {},
  ariaLabel = 'Pagination',
}: Props) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', String(page));

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== '') {
        params.set(key, value);
      }
    });

    return `${basePath}?${params.toString()}`;
  };

  const pageLinkClass =
    'flex h-9 min-w-9 items-center justify-center rounded-md border border-[#A77F18]/30 px-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-sm hover:shadow-[#C09721]/15 active:translate-y-0 active:scale-[0.97]';

  return (
    <nav aria-label={ariaLabel} className="flex items-center justify-center py-6">
      <div className="flex items-center gap-1.5 rounded-xl border border-[#A77F18]/30 bg-white p-1.5 shadow-lg">
        {/* Previous */}
        {currentPage > 1 ? (
          <Link scroll={false} href={getPageUrl(currentPage - 1)} aria-label="Previous page" className={pageLinkClass}>
            <ChevronLeft size={18} aria-hidden="true" />
          </Link>
        ) : (
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-md text-slate-300">
            <ChevronLeft size={18} />
          </span>
        )}

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) =>
          page === currentPage ? (
            <span
              key={page}
              aria-current="page"
              aria-label={`Page ${page}`}
              className="flex h-9 min-w-9 items-center justify-center rounded-md border border-[#A77F18] bg-[#C09721] px-2 text-sm font-semibold text-white shadow-md shadow-[#C09721]/20"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              scroll={false}
              href={getPageUrl(page)}
              aria-label={`Page ${page}`}
              className={pageLinkClass}
            >
              {page}
            </Link>
          ),
        )}

        {/* Next */}
        {currentPage < totalPages ? (
          <Link scroll={false} href={getPageUrl(currentPage + 1)} aria-label="Next page" className={pageLinkClass}>
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        ) : (
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-md text-slate-300">
            <ChevronRight size={18} />
          </span>
        )}
      </div>
    </nav>
  );
}
