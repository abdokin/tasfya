import { Metadata } from "next";
import { getBookById } from "@/lib/services/books-service";
import { Suspense } from "react";
import BookDetailSkeleton from "@/components/skeletons/book-detail-skeleton";
import BookContent from "./book-content";

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the book data
  const book = await getBookById(params.id);
  
  // If no book is found, return default metadata
  if (!book) {
    return {
      title: "الكتاب غير موجود | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
      description: "الكتاب المطلوب غير موجود في الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري"
    };
  }
  
  return {
    title: `${book.title} | مكتبة الشيخ محمد بن رمزان الهاجري`,
    description: book.description || `كتاب ${book.title} من مؤلفات فضيلة الشيخ محمد بن رمزان الهاجري`,
    openGraph: {
      title: book.title,
      description: book.description || `كتاب ${book.title} من مؤلفات فضيلة الشيخ محمد بن رمزان الهاجري`,
      type: 'article',
      images: book.cover_image_url ? [{ url: book.cover_image_url }] : [],
    },
  };
}

export default function BookPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<BookDetailSkeleton />}>
      <BookContent id={params.id} />
    </Suspense>
  );
}
