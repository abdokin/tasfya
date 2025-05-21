'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages, resourceType }: { totalPages: number; resourceType?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramName = resourceType ? `${resourceType}_page` : 'page';
  const currentPage = Number(searchParams.get(paramName)) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pageWindow = 2;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > pageWindow + 2) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - pageWindow);
      const end = Math.min(totalPages - 1, currentPage + pageWindow);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - pageWindow - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {currentPage > 1 && (
          <Link href={createPageURL(currentPage - 1)} scroll={false}>
            <Button variant="outline">السابق</Button>
          </Link>
        )}

        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <Link href={createPageURL(page)} key={page} scroll={false}>
              <Button variant={currentPage === page ? 'default' : 'outline'}>{page}</Button>
            </Link>
          ) : (
            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
              ...
            </span>
          )
        )}

        {currentPage < totalPages && (
          <Link href={createPageURL(currentPage + 1)} scroll={false}>
            <Button variant="outline">التالي</Button>
          </Link>
        )}
      </div>
      <div className="text-sm text-muted-foreground">
        صفحة {currentPage} من {totalPages}
      </div>
    </div>
  );
}
