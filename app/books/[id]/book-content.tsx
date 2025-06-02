import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Download } from "lucide-react";
import { formatDate, resourceUrl } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageSidebar from "@/components/page-sidebar";
import { getBookById } from "@/lib/services/books-service";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export default async function BookContent({ id }: { id: string }) {
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/books">المكتبة</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/books/${book.id}`}>{book.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="relative aspect-[3/4] max-w-[250px] mx-auto mb-4">
              {book.cover_image_url ? (
                <Image
                  src={resourceUrl(book.cover_image_url)}
                  alt={book.title}
                  fill
                  className="rounded object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400">لا توجد صورة</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {book.file_url && (
                <Button asChild>
                  <Link href={resourceUrl(book.file_url)} target="_blank" download>
                    تحميل الكتاب
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{book.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-4">
                {book.author && (
                  <span className="text-gray-700">
                    <strong>المؤلف:</strong> {book.author.first_name} {book.author.last_name}
                  </span>
                )}
                {book.year && (
                  <span className="text-gray-700">
                    <strong>تاريخ النشر:</strong> {book.year}
                  </span>
                )}
              </div>
              
              
              <h2 className="text-xl font-semibold mb-3">نبذة عن الكتاب</h2>
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{book.description}</p>
              </div>
              
              {/* Book reviews could go here */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">تقييمات القراء</h3>
                {/* Placeholder for reviews */}
                <div className="text-gray-500">لا توجد تقييمات بعد</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
