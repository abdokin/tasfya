'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages, resourceType }: { totalPages: number, resourceType?: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const paramName = resourceType ? `${resourceType}_page` : 'page';
    const currentPage = Number(searchParams.get(paramName)) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set(paramName, pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
            <div className="flex flex-wrap items-center gap-2">
                {currentPage > 1 && (
                    <Link href={createPageURL(currentPage - 1)} scroll={false}>
                        <Button variant="outline">السابق</Button>
                    </Link>
                )}

                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    return (
                        <Link href={createPageURL(page)} key={page} scroll={false}>
                            <Button variant={currentPage === page ? 'default' : 'outline'}>
                                {page}
                            </Button>
                        </Link>
                    );
                })}

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
