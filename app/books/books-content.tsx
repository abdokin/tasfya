import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Book, FileText, Download, Bookmark, Star, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PageSidebar from "@/components/page-sidebar";
import { getAllBooks } from "@/lib/services/books-service";
import { resourceUrl } from "@/lib/utils";
import Pagination from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";

interface BooksContentProps {
  query?: string;
  page?: string;
  category?: string;
  sort?: string;
}

export default async function BooksContent({
  query = '',
  page = '1',
  category = '',
  sort = 'created_at'
}: BooksContentProps) {
  const currentPage = Number(page) || 1;
  const { meta, books } = await getAllBooks(currentPage, query, category);
  const totalPages = meta.total_pages;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/books">المكتبة</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">الكتب والمؤلفات</h1>
              <SearchBar placeholder="ابحث عن الكتب..." />
            </div>

            {books.length === 0 ? (
              <div className="text-center py-12">
                <Book className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">لا توجد كتب متاحة</h3>
                <p className="text-gray-500">جرب البحث باستخدام كلمات مفتاحية مختلفة</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <Card key={book.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                    <Link href={`/books/${book.id}`} className="block no-underline">
                      <div className="aspect-[3/4] relative bg-gray-200">
                        {book.cover_image_url ? (
                          <Image
                            src={resourceUrl(book.cover_image_url)}
                            alt={book.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-bold truncate mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {book.author.first_name} {book.author.last_name}
                        </p>

                        {book.file_url && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full flex items-center justify-center"
                            asChild
                          >
                            <Link href={resourceUrl(book.file_url)} download>
                              <Download className="size-4" />
                              تحميل
                            </Link>
                          </Button>
                        )}
                      </CardContent>
                    </Link>
                  </Card>

                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <PageSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
