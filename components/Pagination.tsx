'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Meetings pagination"
      className="flex items-center justify-center gap-4 mt-8 text-sm"
    >
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-3 py-1 border border-[var(--color-line)] hover:border-[var(--color-gold)]"
        >
          Previous
        </Link>
      ) : (
        <span className="px-3 py-1 border border-[var(--color-line)] text-[var(--color-muted)] opacity-50">
          Previous
        </span>
      )}

      <span className="text-[var(--color-muted)]">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-3 py-1 border border-[var(--color-line)] hover:border-[var(--color-gold)]"
        >
          Next
        </Link>
      ) : (
        <span className="px-3 py-1 border border-[var(--color-line)] text-[var(--color-muted)] opacity-50">
          Next
        </span>
      )}
    </nav>
  );
}
