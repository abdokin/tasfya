import { Metadata } from "next";
import { getBookById } from "@/lib/services/books-service";
import { Suspense } from "react";
import BookDetailSkeleton from "@/components/skeletons/book-detail-skeleton";
import BookContent from "./book-content";
import BookJsonLd from "@/components/json-ld/book-json-ld";
import { formatDate, resourceUrl } from "@/lib/utils";

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
    <>
      <BookJsonLdWrapper id={params.id} />
      <Suspense fallback={<BookDetailSkeleton />}>
        <BookContent id={params.id} />
      </Suspense>
    </>
  );
}

// Separate component for JSON-LD to avoid issues with suspense
function BookJsonLdWrapper({ id }: { id: string }) {
  const book = getBookById(id);
  // Using Promise to handle async data
  return book.then(bookData => {
    if (!bookData) return null;
    
    return (
      <BookJsonLd
        title={bookData.title}
        author={bookData.author?.first_name + ' ' + bookData.author?.last_name || "الشيخ محمد بن رمزان الهاجري"}
        datePublished={new Date().toISOString()}
        description={bookData.description || `كتاب ${bookData.title} من مؤلفات فضيلة الشيخ محمد بن رمزان الهاجري`}
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/books/${bookData.id}`}
        imageUrl={bookData.cover_image_url ? resourceUrl(bookData.cover_image_url) : undefined}
        publisher={bookData.author.first_name + ' ' + bookData.author.last_name || "الشيخ محمد بن رمزان الهاجري"}
      />
    );
  });
}
