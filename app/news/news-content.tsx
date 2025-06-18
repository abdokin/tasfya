"use server";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { ar } from "date-fns/locale";
import Pagination from "@/components/pagination";
import { getNews, News } from "@/lib/services/news-service";
import { resourceUrl } from "@/lib/utils";
import { SearchBar } from "@/components/search-bar";

interface ContentProps {
  query?: string;
  page?: string;
  category?: string;
  sort?: string;
}

export default async function NewsContent({
  query = '',
  page = '1',
  category = '',
  sort = 'created_at'
}: ContentProps) {
  const currentPage = Number(page) || 1;
  const searchQuery = query;
  const response = await getNews(currentPage, 9, searchQuery);
  const news = response.data;
  const totalPages = response.meta.total_pages;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">الأخبار والإعلانات</h1>

      {/* Search component */}
      <div className="mb-8">
        <SearchBar placeholder="ابحث عن الكتب..." />
      </div>

      {news.length === 0 ? (
        <div className="py-12 text-center">
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-4">
            لا توجد أخبار {searchQuery && "تطابق بحثك"}
          </h2>
          {searchQuery && (
            <p className="text-gray-500 dark:text-gray-400">
              جرب استخدام كلمات بحث أخرى أو تصفح جميع الأخبار
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item: News) => (
            <Link
              href={`/news/${item.slug}`}
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div>
                {item.thumbnail_url ? (
                  <img
                    src={resourceUrl(item.thumbnail_url)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">لا توجد صورة</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  );
}
