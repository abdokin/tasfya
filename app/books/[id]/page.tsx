import { Suspense } from "react";
import BookDetailSkeleton from "@/components/skeletons/book-detail-skeleton";
import BookContent from "./book-content";

export default function BookPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<BookDetailSkeleton />}>
      <BookContent id={params.id} />
    </Suspense>
  );
}
