import { Suspense } from "react";
import BookSkeleton from "@/components/skeletons/book-skeleton";
import BooksContent from "./books-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المكتبة | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "استعرض جميع الكتب والمنشورات العلمية لفضيلة الشيخ محمد بن رمزان الهاجري",
  openGraph: {
    title: "المكتبة | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    description: "استعرض جميع الكتب والمنشورات العلمية لفضيلة الشيخ محمد بن رمزان الهاجري",
    type: "website",
  },
};

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
