import { Suspense } from "react";
import BookSkeleton from "@/components/skeletons/book-skeleton";
import BooksContent from "./books-content";

export default function BooksPage({ searchParams }: {
  searchParams: {
    query?: string;
    page?: string;
    category?: string;
    sort?: string;
  };
}) {
  return (
    <Suspense fallback={<BookSkeleton />}>
      <BooksContent 
        query={searchParams.query}
        page={searchParams.page}
        category={searchParams.category}
        sort={searchParams.sort}
      />
    </Suspense>
  );
}
