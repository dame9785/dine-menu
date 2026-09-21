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

  const pageLinkClass = `
  flex h-11 min-w-11 shrink-0
  items-center justify-center
  rounded-xl
  border border-[#C09721]/25
  bg-[#181714]
  px-3
  text-sm font-semibold
  text-[#A6A39A]
  outline-none
  transition-all duration-300

  hover:-translate-y-0.5
  hover:border-[#C09721]/70
  hover:bg-[#2A2414]
  hover:text-[#E5C76B]
  hover:shadow-[0_0_18px_rgba(192,151,33,0.12)]

  active:scale-95

  focus-visible:ring-2
  focus-visible:ring-[#C09721]/50
`;

  const disabledClass = `
    flex h-10 w-10
    items-center justify-center
    rounded-lg
    border border-[#332D1F]
    text-[#49453B]
    opacity-60
  `;

  return (
    <nav aria-label={ariaLabel} className="flex items-center justify-center py-7">
      <div className="flex items-center gap-1.5 rounded-2xl border border-[#332D1F] bg-gradient-to-br from-[#1B1811] to-[#12110D] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
        {/* Previous */}
        {currentPage > 1 ? (
          <Link scroll={false} href={getPageUrl(currentPage - 1)} aria-label="Previous page" className={pageLinkClass}>
            <ChevronLeft size={17} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        ) : (
          <span aria-hidden="true" className={disabledClass}>
            <ChevronLeft size={17} strokeWidth={1.7} />
          </span>
        )}

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) =>
          page === currentPage ? (
            <span
              key={page}
              aria-current="page"
              aria-label={`Page ${page}`}
              className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-[#C09721]/70 bg-gradient-to-br from-[#C09721] to-[#8B6914] px-2.5 text-sm font-semibold text-[#17130A] shadow-[0_0_18px_rgba(192,151,33,0.12)]"
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
            <ChevronRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        ) : (
          <span aria-hidden="true" className={disabledClass}>
            <ChevronRight size={17} strokeWidth={1.7} />
          </span>
        )}
      </div>
    </nav>
  );
}
